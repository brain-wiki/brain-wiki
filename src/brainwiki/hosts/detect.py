"""Which agent host is calling (design doc 08 §2). Kept import-light: hooks use it on every turn."""

from __future__ import annotations

import os
from collections.abc import Mapping
from typing import Any

HOSTS = ("claude-code", "codex", "antigravity", "openclaw", "cursor", "generic")
_CLIENT_NAMES = (
    ("claude", "claude-code"),
    ("codex", "codex"),
    ("antigravity", "antigravity"),
    ("agy", "antigravity"),
    ("openclaw", "openclaw"),
    ("cursor", "cursor"),
)


def detect_host(
    explicit: str | None = None,
    payload: Mapping[str, Any] | None = None,
    env: Mapping[str, str] | None = None,
) -> str:
    """Resolve `auto` (or nothing) to a host id; an undetectable host is `generic`."""
    env = os.environ if env is None else env
    if explicit and explicit != "auto":
        return explicit
    from_env = env.get("BRAIN_WIKI_HOST")
    if from_env and from_env != "auto":
        return from_env
    transcript = str((payload or {}).get("transcript_path") or "")
    session = str((payload or {}).get("session_id") or "")
    if "/.claude/" in transcript or "\\.claude\\" in transcript:
        return "claude-code"
    if "/.codex/" in transcript or "\\.codex\\" in transcript or session.startswith("thr_"):
        return "codex"
    if "/.gemini/" in transcript and "antigravity" in transcript:
        return "antigravity"
    if env.get("PLUGIN_ROOT") and env.get("CLAUDE_PLUGIN_ROOT"):
        return "codex"  # Codex sets both for compatibility; Claude Code sets only its own
    if env.get("CLAUDE_PLUGIN_ROOT") or env.get("CLAUDECODE") == "1":
        return "claude-code"
    return "generic"


def host_from_client_name(name: str | None) -> str | None:
    """Map an MCP client's self-reported name to a host id, when the name is recognizable."""
    lowered = (name or "").lower()
    for needle, host in _CLIENT_NAMES:
        if needle in lowered:
            return host
    return None
