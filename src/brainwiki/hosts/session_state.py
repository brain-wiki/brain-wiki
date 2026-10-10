"""Per-session taint markers written by post-tool-use hooks (design doc 05 §3.2)."""

from __future__ import annotations

import hashlib
import json
from pathlib import Path

from brainwiki.config.dirs import state_dir


def _marker(host: str, session: str) -> Path:
    digest = hashlib.sha256(session.encode("utf-8")).hexdigest()[:32]
    return state_dir() / "sessions" / host / f"{digest}.json"


def mark_tainted(host: str, session: str, tool: str) -> None:
    path = _marker(host, session)
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps({"tainted": True, "tool": tool}), encoding="utf-8")


def session_taint(host: str, session: str | None) -> str:
    """`true` when a hook saw an untrusted tool in this session; otherwise `unknown`, never `false`.

    The MCP protocol does not tell a server what else happened in a session, and the model's own
    account of it is not evidence, so an MCP write can never be marked untainted.
    """
    if not session:
        return "unknown"
    try:
        data = json.loads(_marker(host, session).read_text(encoding="utf-8"))
    except (OSError, ValueError):
        return "unknown"
    return "true" if data.get("tainted") else "unknown"
