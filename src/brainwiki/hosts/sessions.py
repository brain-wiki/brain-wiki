"""Session readers: one per host, all yielding normalized turns (design doc 08 §6.4).

Raw capture, harvest, origin lookup, and taint detection all read sessions through these.
Readers are defensive: a line they cannot parse is skipped and counted, never fatal, and they
never write to a host's files.
"""

from __future__ import annotations

import re
from collections.abc import Iterable
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any, Protocol

MARKER_RE = re.compile(r"<brain-wiki-context>.*?</brain-wiki-context>", re.S)
_HOST_INJECTED = re.compile(
    r"<(system-reminder|command-name|command-message|local-command-stdout)>.*?</\1>", re.S
)
_NETWORK_SHELL = re.compile(r"\b(curl|wget|http|https)\b|https?://", re.I)
UNREADABLE_RATIO = 0.5
MAX_TRANSCRIPT_BYTES = 20 * 1024 * 1024

# Tool names (or prefixes ending in "*") that bring outside content into a session.
UNTRUSTED_TOOLS: dict[str, tuple[str, ...]] = {
    "claude-code": ("WebFetch", "WebSearch", "mcp__*"),
    "codex": ("web_search", "web_fetch", "mcp__*"),
    "antigravity": ("search_web", "read_url_content", "read_browser_page", "browser_*", "mcp_*"),
}
SHELL_TOOLS = {"Bash", "shell", "local_shell", "exec_command", "run_command"}


@dataclass
class Turn:
    index: int  # 1-based, counting user and assistant turns only
    role: str  # "user" | "assistant"
    text: str
    tools: list[str] = field(default_factory=list)  # "Name: short argument summary"
    timestamp: str | None = None

    def to_json(self) -> dict[str, Any]:
        out: dict[str, Any] = {"turn": self.index, "role": self.role, "text": self.text}
        if self.tools:
            out["tools"] = self.tools
        return out


@dataclass
class SessionInfo:
    host: str
    id: str
    path: Path
    cwd: str | None
    started: str | None
    modified: float
    size: int
    subagent: bool = False
    headless: bool = False


@dataclass
class Transcript:
    info: SessionInfo
    turns: list[Turn]
    unparsed: int = 0
    total_lines: int = 0
    untrusted_tools: list[str] = field(default_factory=list)

    @property
    def readable(self) -> bool:
        return not self.total_lines or self.unparsed / self.total_lines < UNREADABLE_RATIO

    @property
    def taint(self) -> str:
        if not self.readable:
            return "unknown"
        return "true" if self.untrusted_tools else "false"

    def user_turns(self) -> int:
        return sum(1 for t in self.turns if t.role == "user")


class Reader(Protocol):
    host: str

    def roots(self) -> list[Path]: ...

    def list_sessions(self) -> list[SessionInfo]: ...

    def read(self, info: SessionInfo) -> Transcript: ...

    def find(self, session_id: str) -> SessionInfo | None: ...


def strip_injected(text: str) -> str:
    """Remove brain-wiki's own injected context and host-injected wrappers before capture."""
    return _HOST_INJECTED.sub("", MARKER_RE.sub("", text)).strip()


def summarize_args(args: Any, limit: int = 80) -> str:
    if isinstance(args, str):
        text = args
    elif isinstance(args, dict):
        preferred = next(
            (
                args[k]
                for k in (
                    "command",
                    "cmd",
                    "query",
                    "url",
                    "file_path",
                    "path",
                    "pattern",
                    "description",
                )
                if k in args
            ),
            None,
        )
        if isinstance(preferred, list):
            preferred = " ".join(str(p) for p in preferred)
        text = (
            str(preferred) if preferred is not None else ", ".join(f"{k}=…" for k in list(args)[:3])
        )
    else:
        text = ""
    text = " ".join(text.split())
    return text if len(text) <= limit else text[: limit - 1] + "…"


def is_untrusted(
    host: str,
    tool: str,
    args_summary: str = "",
    *,
    extra: Iterable[str] = (),
    trusted_mcp_servers: Iterable[str] = ("brain-wiki",),
) -> bool:
    """Does this tool call bring outside content into the session (05 §3.2, 08 §6.3)?"""
    trusted = tuple(trusted_mcp_servers)
    if tool.startswith(("mcp__", "mcp_")) and any(server in tool for server in trusted):
        return False
    patterns = UNTRUSTED_TOOLS.get(host, ()) + tuple(extra)
    for pattern in patterns:
        if pattern.endswith("*") and tool.startswith(pattern[:-1]):
            return True
        if tool == pattern:
            return True
    return tool in SHELL_TOOLS and bool(_NETWORK_SHELL.search(args_summary))


def readers() -> dict[str, Reader]:
    from brainwiki.hosts.antigravity import AntigravityReader
    from brainwiki.hosts.claude_code import ClaudeCodeReader
    from brainwiki.hosts.codex import CodexReader

    return {r.host: r for r in (ClaudeCodeReader(), CodexReader(), AntigravityReader())}


def reader_for(host: str) -> Reader | None:
    return readers().get(host)
