"""Unattended agent runs for scheduled consolidation (agent-integrations.md §7).

brain-wiki calls no model itself (D8): a scheduled run starts the host's own CLI, the way a
person would, with tools on, file access limited to the brain, and brain-wiki's MCP server
attached. Exact flags live here, not in the docs, because CLIs change faster than documents.
"""

from __future__ import annotations

import json
import shutil
import subprocess
import tempfile
from collections.abc import Callable
from dataclasses import dataclass
from pathlib import Path

from brainwiki.config import state_dir
from brainwiki.errors import NotAvailable, UsageError

# File tools only: no shell, no web. The brain-wiki MCP server is the only other tool source.
_CLAUDE_TOOLS = "Read,Edit,Write,Glob,Grep"


@dataclass
class _Call:
    brain_root: Path
    mcp_config: str  # JSON: {"mcpServers": {"brain-wiki": {...}}}
    workdir: Path


@dataclass
class _Mode:
    host: str
    binary: str
    argv: Callable[[_Call], list[str]]
    result: Callable[[str], tuple[bool, str]]  # stdout -> (ok, final text)


def _claude(call: _Call) -> list[str]:
    return [
        "claude",
        "-p",
        "--output-format",
        "json",
        # Not saved, so harvest never reads brain-wiki's own run back into the brain.
        "--no-session-persistence",
        "--mcp-config",
        call.mcp_config,
        "--strict-mcp-config",
        "--tools",
        _CLAUDE_TOOLS,
        "--allowedTools",
        f"{_CLAUDE_TOOLS},mcp__brain-wiki",
        # Anything not allowed above is denied instead of waiting for a person.
        "--permission-mode",
        "dontAsk",
        "--add-dir",
        str(call.brain_root),
    ]


def _claude_result(stdout: str) -> tuple[bool, str]:
    try:
        data = json.loads(stdout)
    except ValueError:
        return False, stdout.strip()[-2000:]
    if not isinstance(data, dict):
        return False, stdout.strip()[-2000:]
    text = str(data.get("result") or "")
    return not data.get("is_error") and data.get("subtype", "success") == "success", text


_MODES: dict[str, _Mode] = {
    "claude-code": _Mode("claude-code", "claude", _claude, _claude_result),
}


def check_unattended(host: str) -> str:
    """The host CLI's path, or why a scheduled run cannot start it."""
    mode = _MODES.get(host)
    if mode is None:
        raise UsageError(
            f"{host} has no unattended mode brain-wiki can start yet (supported: "
            f"{', '.join(_MODES)}); it consolidates in sessions"
        )
    found = shutil.which(mode.binary)
    if found is None:
        raise NotAvailable(f"{host} needs `{mode.binary}` on PATH, installed and signed in")
    return found


def run_unattended(
    host: str,
    prompt: str,
    *,
    brain_root: Path,
    mcp_entry: dict[str, object],
    timeout: int = 3600,
) -> str:
    """Run the host's agent once with `prompt` on stdin and return its final text. The working
    directory is a fresh folder under the state directory, which harvest skips."""
    check_unattended(host)
    mode = _MODES[host]
    runs = state_dir() / "runs"
    runs.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory(prefix=f"consolidate-{host}-", dir=runs) as tmp:
        call = _Call(brain_root, json.dumps({"mcpServers": {"brain-wiki": mcp_entry}}), Path(tmp))
        argv = mode.argv(call)
        try:
            done = subprocess.run(
                argv,
                input=prompt,
                capture_output=True,
                text=True,
                cwd=tmp,
                timeout=timeout,
                check=False,
            )
        except subprocess.TimeoutExpired as exc:
            raise NotAvailable(f"{host} timed out after {timeout} s") from exc
        except OSError as exc:
            raise NotAvailable(f"could not start {mode.binary}: {exc}") from exc
        ok, text = mode.result(done.stdout)
        if done.returncode != 0 or not ok:
            tail = (done.stderr or text or done.stdout).strip().splitlines()[-5:]
            raise NotAvailable(f"{host} exited with {done.returncode}: " + " | ".join(tail))
        return text
