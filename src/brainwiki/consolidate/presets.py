"""Headless presets for the command backend (design doc 08 §7).

Each preset runs a host CLI once, prompt on stdin, in an empty temporary directory, with
`BRAIN_WIKI_INTERNAL=1` so brain-wiki's own hooks ignore the session. Exact flags live here,
not in the docs, because CLIs change faster than documents.
"""

from __future__ import annotations

import json
import os
import shutil
import subprocess
import tempfile
from collections.abc import Callable
from dataclasses import dataclass
from pathlib import Path
from typing import Any

from brainwiki.errors import NotAvailable, UsageError

# Headless runs cannot approve tools; Antigravity ends the turn with no output after a denied
# tool call, and its custom agents cannot drop tools (T-5), so the prompt has to say it.
_HEADLESS_PREAMBLE = (
    "You are running headless: everything you need is in this message. Do not call tools, "
    "load skills, or read files; reply directly.\n\n"
)


@dataclass
class _Call:
    model: str | None
    schema: str | None  # JSON Schema as a string, for CLIs that constrain output
    workdir: Path


def _plain(prompt: str) -> str:
    return prompt


@dataclass
class _Preset:
    name: str
    binary: str
    argv: Callable[[_Call], list[str]]
    extract: Callable[[str, _Call], str]
    uses_schema: bool = False
    stdin: Callable[[str], str] = _plain


def _pick(data: dict[str, Any], keys: tuple[str, ...], fallback: str) -> str:
    for key in keys:
        value = data.get(key)
        if isinstance(value, (dict, list)):
            return json.dumps(value)
        if isinstance(value, str) and value.strip():
            return value
    return fallback


def _json_field(stdout: str, *keys: str) -> str:
    try:
        data = json.loads(stdout)
    except ValueError:
        return stdout
    return _pick(data, keys, stdout) if isinstance(data, dict) else stdout


def _claude(call: _Call) -> list[str]:
    argv = ["claude", "--bare", "-p", "--output-format", "json"]
    if call.schema:
        argv += ["--json-schema", call.schema]
    return argv + (["--model", call.model] if call.model else [])


def _codex(call: _Call) -> list[str]:
    argv = [
        "codex",
        "exec",
        "-",
        "--json",
        "--ephemeral",
        "--skip-git-repo-check",
        "--sandbox",
        "read-only",
    ]
    argv += ["-o", str(call.workdir / "last-message.txt")]
    return argv + (["-m", call.model] if call.model else [])


def _codex_extract(stdout: str, call: _Call) -> str:
    last = call.workdir / "last-message.txt"
    if last.is_file() and last.read_text(encoding="utf-8").strip():
        return last.read_text(encoding="utf-8")
    message = ""
    for line in stdout.splitlines():
        try:
            event = json.loads(line)
        except ValueError:
            continue
        item = event.get("item") if isinstance(event, dict) else None
        if isinstance(item, dict) and item.get("type") == "agent_message" and item.get("text"):
            message = item["text"]
    return message or stdout


def _agy(call: _Call) -> list[str]:
    # `agy -p` takes the prompt as its value; stream-json input keeps it on stdin and off argv.
    # No --json-schema: agy drops fields the schema does not declare and forces an extra turn.
    # The default (high) effort spent five minutes thinking on a one-episode packet.
    argv = ["agy", "--input-format", "stream-json", "--output-format", "stream-json"]
    argv += ["--effort", "medium"]
    return argv + (["--model", call.model] if call.model else [])


def _agy_stdin(prompt: str) -> str:
    return json.dumps({"event": "user", "message": {"content": prompt}}) + "\n"


def _agy_extract(stdout: str, call: _Call) -> str:
    result: dict[str, Any] | None = None
    for line in stdout.splitlines():
        try:
            event = json.loads(line)
        except ValueError:
            continue
        if isinstance(event, dict) and event.get("event") == "result":
            result = event.get("result") if isinstance(event.get("result"), dict) else None
    return _pick(result, ("response",), stdout) if result else stdout


PRESETS: dict[str, _Preset] = {
    "claude-code": _Preset(
        "claude-code",
        "claude",
        _claude,
        lambda out, _: _json_field(out, "structured_output", "result"),
        True,
    ),
    "codex": _Preset("codex", "codex", _codex, _codex_extract),
    "antigravity": _Preset("antigravity", "agy", _agy, _agy_extract, stdin=_agy_stdin),
    "cursor": _Preset(
        "cursor",
        "agent",
        lambda c: (
            ["agent", "-p", "--output-format", "json"] + (["--model", c.model] if c.model else [])
        ),
        lambda out, _: _json_field(out, "result"),
    ),
    "ollama": _Preset(
        "ollama", "ollama", lambda c: ["ollama", "run", c.model or "llama3.1"], lambda out, _: out
    ),
}


def run_command(
    command: str | list[str],
    prompt: str,
    *,
    model: str | None = None,
    timeout: int = 600,
    schema: dict[str, Any] | None = None,
) -> str:
    """Run a preset (or a custom argv) once and return the model's final text."""
    with tempfile.TemporaryDirectory(prefix="brain-wiki-") as tmp:
        call = _Call(model or None, None, Path(tmp))
        prompt = _HEADLESS_PREAMBLE + prompt
        stdin = prompt
        if isinstance(command, list):
            if not command:
                raise UsageError("the custom command is empty")
            argv, extract, binary, name = (
                list(command),
                (lambda out, _: out),
                command[0],
                command[0],
            )
        else:
            preset = PRESETS.get(command)
            if preset is None:
                raise UsageError(
                    f"unknown preset {command!r}; use one of {', '.join(PRESETS)} or an argv list"
                )
            if preset.uses_schema and schema is not None:
                call.schema = json.dumps(schema, separators=(",", ":"))
            argv, extract, binary, name = (
                preset.argv(call),
                preset.extract,
                preset.binary,
                preset.name,
            )
            stdin = preset.stdin(prompt)
        if shutil.which(binary) is None:
            raise NotAvailable(f"preset {name!r} needs `{binary}` on PATH")
        env = {**os.environ, "BRAIN_WIKI_INTERNAL": "1"}
        try:
            done = subprocess.run(
                argv,
                input=stdin,
                capture_output=True,
                text=True,
                cwd=tmp,
                env=env,
                timeout=timeout,
                check=False,
            )
        except subprocess.TimeoutExpired as exc:
            raise NotAvailable(
                f"{name} timed out after {timeout} s ({' '.join(argv[:3])} …)"
            ) from exc
        if done.returncode != 0:
            tail = (done.stderr or done.stdout).strip().splitlines()[-5:]
            raise NotAvailable(f"{name} exited with {done.returncode}: " + " | ".join(tail))
        return extract(done.stdout, call)


def extract_ops(text: str) -> dict[str, Any] | None:
    """The first JSON object with an `ops` array in a model reply (code fences allowed)."""
    decoder = json.JSONDecoder()
    stripped = text.strip()
    for start in [i for i, ch in enumerate(stripped) if ch == "{"]:
        try:
            value, _ = decoder.raw_decode(stripped[start:])
        except ValueError:
            continue
        if isinstance(value, dict) and isinstance(value.get("ops"), list):
            return value
    return None
