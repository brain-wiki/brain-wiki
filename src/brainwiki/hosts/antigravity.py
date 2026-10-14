"""Antigravity session reader: `<app dir>/brain/<id>/.system_generated/logs/` (T-3).

The logs folder holds `transcript.jsonl`, which cuts long steps to about 4 KB, and
`transcript_full.jsonl` (same steps, kept up to about 49 KB); the full one is read when present.
Transcripts carry no working directory; it comes from the app's `conversation_summaries.db`
(`workspace_uris`), read-only, when that file exists.
"""

from __future__ import annotations

import json
import sqlite3
from pathlib import Path
from typing import Any
from urllib.parse import unquote, urlparse

from brainwiki.hosts.sessions import (
    MAX_TRANSCRIPT_BYTES,
    SessionInfo,
    Transcript,
    Turn,
    is_untrusted,
    normalize_call,
    strip_injected,
    summarize_args,
)

_HOST = "antigravity"
_LOGS = Path(".system_generated") / "logs"
_TRANSCRIPTS = ("transcript_full.jsonl", "transcript.jsonl")
_USER_STEPS = {"USER_INPUT"}
_MODEL_STEPS = {"PLANNER_RESPONSE"}
_UNTRUSTED_STEPS = {"SEARCH_WEB", "READ_URL_CONTENT", "BROWSER_ACTION"}


def _default_app_dirs() -> list[Path]:
    base = Path.home() / ".gemini"
    return sorted(p for p in base.glob("antigravity*") if p.is_dir()) if base.is_dir() else []


def _summaries(app_dir: Path) -> dict[str, dict[str, Any]]:
    db = app_dir / "conversation_summaries.db"
    if not db.is_file():
        return {}
    try:
        conn = sqlite3.connect(f"file:{db}?mode=ro", uri=True, timeout=1.0)
        conn.row_factory = sqlite3.Row
        rows = conn.execute(
            "SELECT conversation_id, workspace_uris, parent_conversation_id, source FROM conversation_summaries"
        ).fetchall()
        conn.close()
    except sqlite3.Error:
        return {}
    out = {}
    for row in rows:
        cwd = None
        try:
            uris = json.loads(row["workspace_uris"] or "[]")
        except ValueError:
            uris = []
        for uri in uris if isinstance(uris, list) else []:
            parsed = urlparse(str(uri))
            if parsed.scheme == "file":
                cwd = unquote(parsed.path)
                break
        out[str(row["conversation_id"])] = {
            "cwd": cwd,
            "subagent": bool(row["parent_conversation_id"]),
            "source": row["source"] or "",
        }
    return out


class AntigravityReader:
    host = _HOST

    def __init__(self, app_dirs: list[Path] | None = None):
        self._app_dirs = app_dirs

    def roots(self) -> list[Path]:
        return self._app_dirs or _default_app_dirs()

    def list_sessions(self) -> list[SessionInfo]:
        out = []
        for app_dir in self.roots():
            summaries = _summaries(app_dir)
            for logs in (
                (app_dir / "brain").glob(f"*/{_LOGS.as_posix()}")
                if (app_dir / "brain").is_dir()
                else []
            ):
                path = next((logs / n for n in _TRANSCRIPTS if (logs / n).is_file()), None)
                if path is None:
                    continue
                conversation = logs.parents[1].name
                meta = summaries.get(conversation, {})
                st = path.stat()
                out.append(
                    SessionInfo(
                        host=_HOST,
                        id=conversation,
                        path=path,
                        cwd=meta.get("cwd"),
                        started=None,
                        modified=st.st_mtime,
                        size=st.st_size,
                        subagent=bool(meta.get("subagent")),
                    )
                )
        return sorted(out, key=lambda s: s.modified)

    def find(self, session_id: str) -> SessionInfo | None:
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
                    step = json.loads(line)
                except ValueError:
                    unparsed += 1
                    continue
                if not isinstance(step, dict):
                    unparsed += 1
                    continue
                kind = str(step.get("type") or "")
                if kind in _UNTRUSTED_STEPS:
                    untrusted.append(kind.lower())
                if kind in _USER_STEPS:
                    text = strip_injected(str(step.get("content") or ""))
                    if text:
                        turns.append(Turn(len(turns) + 1, "user", text, [], step.get("created_at")))
                elif kind in _MODEL_STEPS:
                    text = strip_injected(str(step.get("content") or ""))
                    labels = []
                    for call in step.get("tool_calls") or []:
                        if not isinstance(call, dict):
                            continue
                        name, args = normalize_call(
                            _HOST, str(call.get("name") or "tool"), call.get("args")
                        )
                        summary = summarize_args(args)
                        if is_untrusted(_HOST, name, summary):
                            untrusted.append(name)
                        labels.append(f"{name}: {summary}" if summary else name)
                    if not text and not labels:
                        continue
                    if turns and turns[-1].role == "assistant":
                        turns[-1].text = "\n".join(t for t in (turns[-1].text, text) if t)
                        turns[-1].tools += labels
                    else:
                        turns.append(
                            Turn(len(turns) + 1, "assistant", text, labels, step.get("created_at"))
                        )
        return Transcript(info, turns, unparsed, total, untrusted)
