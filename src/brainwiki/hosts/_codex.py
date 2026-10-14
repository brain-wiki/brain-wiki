"""Codex session reader: `$CODEX_HOME/sessions/**/rollout-*.jsonl` (schema to confirm, T-6)."""

from __future__ import annotations

import contextlib
import glob
import json
import os
from pathlib import Path
from typing import Any

from brainwiki.hosts._sessions import (
    MAX_TRANSCRIPT_BYTES,
    SessionInfo,
    Transcript,
    Turn,
    is_untrusted,
    strip_injected,
    summarize_args,
)

_HOST = "codex"


def _default_roots() -> list[Path]:
    base = Path(os.environ.get("CODEX_HOME") or Path.home() / ".codex").expanduser()
    return [base / "sessions", base / "archived_sessions"]


def _meta(path: Path) -> dict[str, Any]:
    try:
        with path.open(encoding="utf-8", errors="replace") as fh:
            for _ in range(20):
                line = fh.readline()
                if not line:
                    break
                try:
                    entry = json.loads(line)
                except ValueError:
                    continue
                if isinstance(entry, dict) and entry.get("type") == "session_meta":
                    payload = entry.get("payload") or {}
                    return payload.get("meta", payload) if isinstance(payload, dict) else {}
    except OSError:
        pass
    return {}


def _message_text(content: Any) -> str:
    if isinstance(content, str):
        return content
    parts = []
    for item in content or []:
        if isinstance(item, dict) and isinstance(item.get("text"), str):
            parts.append(item["text"])
    return "\n".join(parts)


class CodexReader:
    host = _HOST

    def __init__(self, roots: list[Path] | None = None):
        self._roots = roots

    def roots(self) -> list[Path]:
        return self._roots or _default_roots()

    def _info(self, path: Path) -> SessionInfo:
        st = path.stat()
        meta = _meta(path)
        source = str(meta.get("source") or "")
        return SessionInfo(
            host=_HOST,
            id=str(meta.get("id") or path.stem),
            path=path,
            cwd=meta.get("cwd"),
            started=meta.get("timestamp"),
            modified=st.st_mtime,
            size=st.st_size,
            subagent=bool(meta.get("parent_thread_id")) or "subagent" in source.lower(),
            headless=source == "exec",
        )

    def list_sessions(self) -> list[SessionInfo]:
        out = []
        for root in self.roots():
            if root.is_dir():
                out += [self._info(p) for p in root.rglob("rollout-*.jsonl")]
        return sorted(out, key=lambda s: s.modified)

    def find(self, session_id: str) -> SessionInfo | None:
        for root in self.roots():
            for path in (
                root.rglob(f"rollout-*{glob.escape(session_id)}*.jsonl") if root.is_dir() else []
            ):
                return self._info(path)
        return next((s for s in self.list_sessions() if s.id == session_id), None)

    def read(self, info: SessionInfo) -> Transcript:
        turns: list[Turn] = []
        untrusted: list[str] = []
        unparsed = total = 0
        if info.size > MAX_TRANSCRIPT_BYTES:
            return Transcript(info, [], unparsed=1, total_lines=1)
        with info.path.open(encoding="utf-8", errors="replace") as fh:
            for line in fh:
                if not line.strip():
                    continue
                total += 1
                try:
                    entry = json.loads(line)
                except ValueError:
                    unparsed += 1
                    continue
                if not isinstance(entry, dict) or entry.get("type") != "response_item":
                    continue
                item = entry.get("payload") or {}
                kind = item.get("type")
                if kind == "message" and item.get("role") in ("user", "assistant"):
                    text = strip_injected(_message_text(item.get("content")))
                    if not text or text.startswith("<environment_context>"):
                        continue
                    role = item["role"]
                    if turns and turns[-1].role == role == "assistant":
                        turns[-1].text = "\n".join(t for t in (turns[-1].text, text) if t)
                        continue
                    turns.append(Turn(len(turns) + 1, role, text, [], entry.get("timestamp")))
                elif kind in (
                    "function_call",
                    "custom_tool_call",
                    "local_shell_call",
                    "web_search_call",
                ):
                    name = str(item.get("name") or kind.replace("_call", ""))
                    raw = item.get("arguments") or item.get("input") or item.get("action")
                    if isinstance(raw, str):
                        with contextlib.suppress(ValueError):
                            raw = json.loads(raw)
                    summary = summarize_args(raw)
                    if is_untrusted(_HOST, name, summary) or kind == "web_search_call":
                        untrusted.append(name)
                    label = f"{name}: {summary}" if summary else name
                    if turns and turns[-1].role == "assistant":
                        turns[-1].tools.append(label)
                    else:
                        turns.append(
                            Turn(len(turns) + 1, "assistant", "", [label], entry.get("timestamp"))
                        )
        return Transcript(info, turns, unparsed, total, untrusted)
