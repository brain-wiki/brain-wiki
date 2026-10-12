"""`brain hook <host> <event>`: one entry point for every host's lifecycle hooks (design doc 08 §5).

Rules: never break the host (errors are logged, output stays valid), stay fast, print only protocol
JSON, never put payload text on a command line, and exit at once inside brain-wiki's own runs.
"""

from __future__ import annotations

import json
import logging
import os
from pathlib import Path
from typing import Any

from brainwiki.hosts.detect import detect_host

log = logging.getLogger("brainwiki.hooks")

EVENTS: dict[str, str] = {
    "SessionStart": "session_start",
    "UserPromptSubmit": "prompt",
    "PostToolUse": "tool_used",
    "Stop": "stop",
    "PreCompact": "pre_compact",
    "SessionEnd": "session_end",
    "PreInvocation": "session_start",
    "agent:bootstrap": "session_start",
    "session:compact:before": "pre_compact",
    "command:reset": "session_end",
}
NORMALIZED = {"session_start", "prompt", "tool_used", "stop", "pre_compact", "session_end"}
HOSTS_WITH_END_EVENTS = {"claude-code", "codex", "openclaw"}
ORIENT_MAX_CHARS = 8000
RECALL_MAX_CHARS = 2400
SETUP_HINT_SESSIONS = 3
OPEN, CLOSE = "<brain-wiki-context>", "</brain-wiki-context>"


def _get(payload: dict[str, Any], *keys: str) -> Any:
    for key in keys:
        if payload.get(key) not in (None, ""):
            return payload[key]
    return None


def _cwd(payload: dict[str, Any]) -> Any:
    """The session's working directory. Antigravity sends `workspacePaths` and runs hooks from the
    plugin folder, so the process cwd is never the project there."""
    cwd = _get(payload, "cwd", "workspace", "working_directory")
    paths = payload.get("workspacePaths")
    if cwd is None and isinstance(paths, list) and paths:
        cwd = paths[0]
    return cwd


def wrap(text: str) -> str:
    return f"{OPEN}\n{text}\n{CLOSE}"


def _context_output(host: str, event: str, text: str) -> str:
    if host == "antigravity":
        return json.dumps({"injectSteps": [{"ephemeralMessage": wrap(text)}]})
    return json.dumps(
        {"hookSpecificOutput": {"hookEventName": event, "additionalContext": wrap(text)}}
    )


def _empty(host: str) -> str:
    return "{}" if host == "antigravity" else ""


def handle(host_arg: str, event_arg: str, stdin_text: str) -> str:
    """Return what the hook prints on stdout. Never raises."""
    if os.environ.get("BRAIN_WIKI_INTERNAL") == "1":
        return ""
    try:
        payload = json.loads(stdin_text) if stdin_text.strip() else {}
        if not isinstance(payload, dict):
            payload = {}
    except ValueError:
        payload = {}
    host = detect_host(host_arg, payload)
    event = event_arg if event_arg in NORMALIZED else EVENTS.get(event_arg)
    if event is None:
        return _empty(host)
    try:
        return _dispatch(host, event_arg, event, payload) or _empty(host)
    except Exception:  # noqa: BLE001 - a hook must never break its host
        from brainwiki.logs import setup_logging

        setup_logging()
        log.exception("hook %s %s failed", host, event_arg)
        return _empty(host)


def _dispatch(host: str, raw_event: str, event: str, payload: dict[str, Any]) -> str:
    from brainwiki.config.user import load_user_config

    user = load_user_config()
    session = str(
        _get(payload, "session_id", "sessionId", "conversation_id", "conversationId") or ""
    )
    cwd = _cwd(payload)
    if event == "session_start":
        invocation = _get(payload, "invocationNum", "invocation_num")
        if raw_event == "PreInvocation" and invocation not in (None, 0, "0"):
            return ""
        return _session_start(host, raw_event, cwd, user)
    if event == "tool_used":
        return _tool_used(host, session, payload, user)
    if event == "prompt":
        return _recall(host, cwd, str(_get(payload, "prompt", "user_prompt") or ""), user)
    if not user.capture_enabled(host) or not session:
        return ""
    transcript = _get(payload, "transcript_path", "transcriptPath")
    mode = str(user.capture.get("mode") or "prompted")
    if event == "stop":
        if payload.get("stop_hook_active"):
            return ""
        out = ""
        if mode in ("prompted", "both"):
            out = _prompted(host, session, transcript, user)
        if not out and mode in ("raw", "both") and host not in HOSTS_WITH_END_EVENTS:
            capture_raw(host, session, transcript, cwd)
        return out
    if event in ("pre_compact", "session_end") and mode in ("raw", "both"):
        capture_raw(host, session, transcript, cwd)
    return ""


def _engine(host: str, cwd: Any):
    from brainwiki.engine import open_engine

    return open_engine(None, host=host, cwd=Path(str(cwd)) if cwd else None)


def _session_start(host: str, raw_event: str, cwd: Any, user: Any) -> str:
    from brainwiki.errors import BrainError
    from brainwiki.index.orient import orient

    try:
        engine = _engine(host, cwd)
    except BrainError:
        if not user.brains:
            from brainwiki.hosts import session_state

            seen = session_state.load(host, "__setup_hint__").get("count", 0)
            if seen < SETUP_HINT_SESSIONS:
                session_state.update(host, "__setup_hint__", count=seen + 1)
                return _context_output(
                    host, raw_event, "brain-wiki is installed but not set up; ask me to set it up."
                )
        return ""
    with engine:
        text = orient(engine)["text"]
    return _context_output(host, raw_event, text[:ORIENT_MAX_CHARS])


def _tool_used(host: str, session: str, payload: dict[str, Any], user: Any) -> str:
    from brainwiki.hosts import session_state
    from brainwiki.hosts.sessions import is_untrusted, normalize_call, summarize_args

    call = payload.get("toolCall")
    if not isinstance(call, dict):
        call = {}
    tool, args = normalize_call(
        host,
        str(_get(payload, "tool_name", "toolName", "name") or call.get("name") or ""),
        _get(payload, "tool_input", "toolInput", "args", "input") or call.get("args"),
    )
    if (
        session
        and tool
        and is_untrusted(
            host,
            tool,
            summarize_args(args),
            extra=user.capture.get("untrusted_tools", []),
            trusted_mcp_servers=user.capture.get("trusted_mcp_servers", ["brain-wiki"]),
        )
    ):
        session_state.mark_tainted(host, session, tool)
    return ""


def _recall(host: str, cwd: Any, prompt: str, user: Any) -> str:
    if not user.recall.get("on_prompt") or len(prompt.split()) < 3:
        return ""
    from brainwiki.index.search import search

    with _engine(host, cwd) as engine:
        result = search(engine, prompt, limit=3, include_episodes=False)
    threshold = float(user.recall.get("min_score", 0.3))
    hits = [r for r in result["results"] if r["score"] is not None and r["score"] >= threshold]
    if not hits:
        return ""
    lines = [
        "Possibly relevant notes from the user's brain (read with brain_read before relying on them):"
    ]
    for hit in hits:
        lines.append(f"- {hit['title']} ({hit['path']})")
        for guard in hit.get("guards", [])[:3]:
            lines.append(f"  - ⚠ {guard['label']}: {guard.get('title') or 'a hidden note'}")
    return _context_output(host, "UserPromptSubmit", "\n".join(lines)[:RECALL_MAX_CHARS])


def _prompted(host: str, session: str, transcript: Any, user: Any) -> str:
    from brainwiki.hosts import session_state
    from brainwiki.hosts.sessions import SessionInfo, reader_for

    state = session_state.load(host, session)
    if state.get("prompted"):
        return ""
    min_turns = int(user.capture.get("min_turns", 5))
    reader = reader_for(host)
    if reader is None or not transcript or not Path(str(transcript)).is_file():
        return ""
    path = Path(str(transcript))
    st = path.stat()
    turns = reader.read(
        SessionInfo(host, session, path, None, None, st.st_mtime, st.st_size)
    ).user_turns()
    if turns < min_turns:
        return ""
    session_state.update(host, session, prompted=True)
    reason = (
        "Before finishing: if this session produced durable learnings (decisions with reasons, facts, "
        "outcomes, approaches that failed, open questions), record them now with one brain_log_episode "
        f'call, passing session="{session}" and dedupe_key="{host}:{session}:prompted". If nothing '
        'durable happened, reply "nothing to record" and stop.'
    )
    return json.dumps(
        {"decision": "continue" if host == "antigravity" else "block", "reason": reason}
    )


def render_turns(turns: list[Any], per_turn: int = 1500) -> str:
    lines = []
    for turn in turns:
        who = "User" if turn.role == "user" else "Assistant"
        text = " ".join(turn.text.split())
        if len(text) > per_turn:
            text = text[: per_turn - 1] + "…"
        tools = f" [tools: {'; '.join(turn.tools[:6])}]" if turn.tools else ""
        lines.append(f"- **{who} (turn {turn.index})**: {text}{tools}")
    return "\n".join(lines)


def capture_raw(host: str, session: str, transcript: Any, cwd: Any) -> str | None:
    """Write the turns since the last capture point as one raw episode. Returns its path."""
    from brainwiki.format.episode import EpisodeContent
    from brainwiki.hosts import session_state
    from brainwiki.hosts.sessions import SessionInfo, reader_for
    from brainwiki.write.episode import write_episode

    reader = reader_for(host)
    if reader is None or not transcript or not Path(str(transcript)).is_file():
        return None
    path = Path(str(transcript))
    st = path.stat()
    read = reader.read(
        SessionInfo(host, session, path, str(cwd) if cwd else None, None, st.st_mtime, st.st_size)
    )
    state = session_state.load(host, session)
    start = int(state.get("last_turn", 0)) + 1
    turns = [t for t in read.turns if t.index >= start]
    if len(turns) < 2 or not any(t.role == "user" for t in turns):
        return None
    first, last = turns[0].index, turns[-1].index
    taint = "true" if state.get("tainted") else read.taint
    summary = (
        f"Raw capture of a {host} session (turns {first}-{last}); not yet distilled.\n\n"
        + render_turns(turns)
    )
    with _engine(host, cwd) as engine:
        if not engine.profile.can("episodes"):
            return None
        result = write_episode(
            engine,
            EpisodeContent(summary=summary),
            origin="agent",
            taint=taint,
            captured="hook",
            agent=host,
            session=session,
            origin_turns=f"{first}-{last}",
            dedupe=f"{host}:{session}:{first}-{last}",
        )
    session_state.update(host, session, last_turn=last)
    return result.path
