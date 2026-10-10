"""Claude Code session reader: `~/.claude/projects/<slug>/<session>.jsonl` (an internal format)."""

from __future__ import annotations

import json
import os
from datetime import UTC, datetime
from pathlib import Path
from typing import Any

from brainwiki.hosts.sessions import (
    MAX_TRANSCRIPT_BYTES,
    SessionInfo,
    Transcript,
    Turn,
    is_untrusted,
    strip_injected,
    summarize_args,
)

HOST = "claude-code"


def default_root() -> Path:
    base = os.environ.get("CLAUDE_CONFIG_DIR")
    return (Path(base).expanduser() if base else Path.home() / ".claude") / "projects"


def _text_and_tools(content: Any) -> tuple[str, list[tuple[str, str]], bool]:
    """(text, [(tool, args summary)], only tool results)."""
    if isinstance(content, str):
        return content, [], False
    texts: list[str] = []
    tools: list[tuple[str, str]] = []
    results = 0
    if isinstance(content, list):
        for block in content:
            if not isinstance(block, dict):
                continue
            kind = block.get("type")
            if kind == "text" and isinstance(block.get("text"), str):
                texts.append(block["text"])
            elif kind == "tool_use":
                tools.append((str(block.get("name") or "tool"), summarize_args(block.get("input"))))
            elif kind == "tool_result":
                results += 1
    return "\n".join(texts), tools, results > 0 and not texts and not tools


class ClaudeCodeReader:
    host = HOST

    def __init__(self, root: Path | None = None):
        self.root = root

    def roots(self) -> list[Path]:
        return [self.root or default_root()]

    def _head(self, path: Path) -> dict[str, Any]:
        meta: dict[str, Any] = {}
        try:
            with path.open(encoding="utf-8", errors="replace") as fh:
                for _ in range(50):
                    line = fh.readline()
                    if not line:
                        break
                    try:
                        entry = json.loads(line)
                    except ValueError:
                        continue
                    if not isinstance(entry, dict):
                        continue
                    meta.setdefault("sessionId", entry.get("sessionId"))
                    if entry.get("cwd") and "cwd" not in meta:
                        meta["cwd"] = entry["cwd"]
                    if entry.get("timestamp") and "timestamp" not in meta:
                        meta["timestamp"] = entry["timestamp"]
                    if entry.get("type") == "user" and "entrypoint" not in meta:
                        meta["entrypoint"] = entry.get("entrypoint")
                        meta["isSidechain"] = entry.get("isSidechain")
        except OSError:
            pass
        return meta

    def list_sessions(self) -> list[SessionInfo]:
        out = []
        for root in self.roots():
            if not root.is_dir():
                continue
            for path in root.glob("*/*.jsonl"):
                st = path.stat()
                meta = self._head(path)
                out.append(
                    SessionInfo(
                        host=HOST,
                        id=str(meta.get("sessionId") or path.stem),
                        path=path,
                        cwd=meta.get("cwd"),
                        started=meta.get("timestamp"),
                        modified=st.st_mtime,
                        size=st.st_size,
                        subagent=bool(meta.get("isSidechain")) or "subagents" in path.parts,
                        headless=meta.get("entrypoint") in ("sdk-cli", "sdk-py", "sdk-ts"),
                    )
                )
        return sorted(out, key=lambda s: s.modified)

    def find(self, session_id: str) -> SessionInfo | None:
        for root in self.roots():
            for path in root.glob(f"*/{session_id}.jsonl") if root.is_dir() else []:
                st = path.stat()
                meta = self._head(path)
                return SessionInfo(
                    HOST,
                    session_id,
                    path,
                    meta.get("cwd"),
                    meta.get("timestamp"),
                    st.st_mtime,
                    st.st_size,
                )
        return None

    def read(self, info: SessionInfo) -> Transcript:
        return read_transcript(info)

    @staticmethod
    def info_for_path(path: Path, session_id: str | None = None) -> SessionInfo:
        st = path.stat()
        return SessionInfo(HOST, session_id or path.stem, path, None, None, st.st_mtime, st.st_size)


def read_transcript(info: SessionInfo) -> Transcript:
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
            if not isinstance(entry, dict) or entry.get("isSidechain"):
                continue
            kind = entry.get("type")
            if kind not in ("user", "assistant"):
                continue
            message = entry.get("message") or {}
            text, tools, only_results = _text_and_tools(message.get("content"))
            if only_results:
                continue
            for name, summary in tools:
                if is_untrusted(HOST, name, summary):
                    untrusted.append(name)
            text = strip_injected(text)
            labels = [f"{name}: {summary}" if summary else name for name, summary in tools]
            if not text and not labels:
                continue
            role = "user" if kind == "user" else "assistant"
            if turns and turns[-1].role == role == "assistant":
                last = turns[-1]
                last.text = "\n".join(t for t in (last.text, text) if t)
                last.tools += labels
                continue
            turns.append(Turn(len(turns) + 1, role, text, labels, entry.get("timestamp")))
    return Transcript(info, turns, unparsed, total, untrusted)


def iso(ts: float) -> str:
    return (
        datetime.fromtimestamp(ts, tz=UTC).replace(microsecond=0).isoformat().replace("+00:00", "Z")
    )
