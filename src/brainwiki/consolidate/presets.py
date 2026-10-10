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


@dataclass
class Call:
    model: str | None
    schema: str | None  # JSON Schema as a string, for CLIs that constrain output
    workdir: Path


@dataclass
class Preset:
    name: str
    binary: str
    argv: Callable[[Call], list[str]]
    extract: Callable[[str, Call], str]
    uses_schema: bool = False


def _json_field(stdout: str, *keys: str) -> str:
    try:
        data = json.loads(stdout)
    except ValueError:
        return stdout
    if not isinstance(data, dict):
        return stdout
    for key in keys:
        value = data.get(key)
        if isinstance(value, (dict, list)):
            return json.dumps(value)
        if isinstance(value, str) and value.strip():
            return value
    return stdout


def _claude(call: Call) -> list[str]:
    argv = ["claude", "--bare", "-p", "--output-format", "json"]
    if call.schema:
        argv += ["--json-schema", call.schema]
    return argv + (["--model", call.model] if call.model else [])


def _codex(call: Call) -> list[str]:
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


def _codex_extract(stdout: str, call: Call) -> str:
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


def _agy(call: Call) -> list[str]:
    argv = ["agy", "-p", "--output-format", "json"]
    if call.schema:
        argv += ["--json-schema", call.schema]
    return argv + (["--model", call.model] if call.model else [])


PRESETS: dict[str, Preset] = {
    "claude-code": Preset(
        "claude-code",
        "claude",
        _claude,
        lambda out, _: _json_field(out, "structured_output", "result"),
        True,
    ),
    "codex": Preset("codex", "codex", _codex, _codex_extract),
    "antigravity": Preset(
        "antigravity",
        "agy",
        _agy,
        lambda out, _: _json_field(out, "structured_output", "response", "result"),
        True,
    ),
    "cursor": Preset(
        "cursor",
        "agent",
        lambda c: (
            ["agent", "-p", "--output-format", "json"] + (["--model", c.model] if c.model else [])
        ),
        lambda out, _: _json_field(out, "result"),
    ),
    "ollama": Preset(
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
        call = Call(model or None, None, Path(tmp))
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
        if shutil.which(binary) is None:
            raise NotAvailable(f"preset {name!r} needs `{binary}` on PATH")
        env = {**os.environ, "BRAIN_WIKI_INTERNAL": "1"}
        try:
            done = subprocess.run(
                argv,
                input=prompt,
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
