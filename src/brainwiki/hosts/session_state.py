"""Per-session state in `<state>/sessions/<host>/` (design doc 08 §6.2): taint, capture points."""

from __future__ import annotations

import hashlib
import json
import os
from pathlib import Path
from typing import Any

from brainwiki.config.dirs import state_dir


def _marker(host: str, session: str) -> Path:
    digest = hashlib.sha256(session.encode("utf-8")).hexdigest()[:32]
    return state_dir() / "sessions" / host / f"{digest}.json"


def load(host: str, session: str) -> dict[str, Any]:
    try:
        data = json.loads(_marker(host, session).read_text(encoding="utf-8"))
        return data if isinstance(data, dict) else {}
    except (OSError, ValueError):
        return {}


def save(host: str, session: str, data: dict[str, Any]) -> None:
    path = _marker(host, session)
    path.parent.mkdir(parents=True, exist_ok=True)
    tmp = path.with_suffix(f".{os.getpid()}.tmp")
    tmp.write_text(json.dumps(data), encoding="utf-8")
    tmp.replace(path)


def update(host: str, session: str, **values: Any) -> dict[str, Any]:
    data = load(host, session)
    data.update(values)
    save(host, session, data)
    return data


def mark_tainted(host: str, session: str, tool: str) -> None:
    data = load(host, session)
    if not data.get("tainted"):
        data.update(tainted=True, tool=tool)
        save(host, session, data)


def session_taint(host: str, session: str | None) -> str:
    """`true` when a hook saw an untrusted tool in this session; otherwise `unknown`, never `false`.

    The MCP protocol does not tell a server what else happened in a session, and the model's own
    account of it is not evidence, so an MCP write can never be marked untainted.
    """
    if not session:
        return "unknown"
    return "true" if load(host, session).get("tainted") else "unknown"
