"""Harvest: an agent files its own finished sessions into notes (write-path.md §2.2).

discover ─► filter ─► route ─► extract ─► (the agent files notes) ─► done ─► advance watermark

Everything except filing is deterministic and lives here. Provenance (host, session, turn
range, inputs) always comes from brain-wiki's own parse of the session, never from the model:
notes cite the session URL the packet gives, and `done` checks those citations.
"""

from __future__ import annotations

import hashlib
import json
import re
import time
from dataclasses import dataclass
from datetime import UTC, datetime
from importlib import resources
from pathlib import Path
from typing import TYPE_CHECKING, Any

from brainwiki.config import Brain, UserConfig, route_brain, state_dir
from brainwiki.errors import Expired, NotFound, UsageError
from brainwiki.format import SOURCES, parse_document, parse_session_url, session_url
from brainwiki.hosts import SessionInfo, Transcript, Turn, reader_for
from brainwiki.ids import run_id
from brainwiki.write import brain_path, scrub

if TYPE_CHECKING:
    from brainwiki.engine import Engine

_PACKET_CHARS = 60_000  # ~15k tokens for the in-agent recipe
_TURN_CHARS = 2_000
_PATTERNS = ("record", "playbook", "file", "distill", "skip")
_RUN_TTL_SECONDS = 3600
_SINCE = re.compile(r"^(\d+)([hdw])$")
_TURNS = re.compile(r"^(\d+)-(\d+)$")


def _parse_since(value: str | None, default: str = "30d") -> float:
    match = _SINCE.match(value or default)
    if not match:
        raise UsageError(f"--since must look like 12h, 30d, or 2w, not {value!r}")
    amount, unit = int(match.group(1)), match.group(2)
    return amount * {"h": 3600, "d": 86400, "w": 7 * 86400}[unit]


# -- watermarks ------------------------------------------------------------
def _watermark_path(host: str, session: str) -> Path:
    digest = hashlib.sha256(session.encode("utf-8")).hexdigest()[:32]
    return state_dir() / "harvest" / host / f"{digest}.json"


def _watermark(host: str, session: str) -> int:
    try:
        return int(
            json.loads(_watermark_path(host, session).read_text(encoding="utf-8")).get(
                "last_turn", 0
            )
        )
    except (OSError, ValueError):
        return 0


def _advance(host: str, session: str, last_turn: int) -> None:
    if last_turn <= _watermark(host, session):
        return
    path = _watermark_path(host, session)
    path.parent.mkdir(parents=True, exist_ok=True)
    stamp = datetime.now(UTC).replace(microsecond=0).isoformat()
    path.write_text(
        json.dumps({"session": session, "last_turn": last_turn, "at": stamp}), encoding="utf-8"
    )


# -- discovery -------------------------------------------------------------
@dataclass
class Candidate:
    info: SessionInfo
    brain: Brain | None
    start: int  # first turn not yet harvested
    transcript: Transcript | None = None
    skip: str | None = None

    @property
    def new_turns(self) -> list[Turn]:
        return (
            [t for t in self.transcript.turns if t.index >= self.start] if self.transcript else []
        )

    def to_json(self) -> dict[str, Any]:
        turns = self.new_turns
        return {
            "host": self.info.host,
            "session": self.info.id,
            "cwd": self.info.cwd,
            "brain": self.brain.display_name if self.brain else None,
            "turns": f"{turns[0].index}-{turns[-1].index}" if turns else None,
            "skip": self.skip,
            "estimated_tokens": sum(len(t.text) for t in turns) // 4,
        }


def discover(
    user: UserConfig,
    hosts: list[str],
    *,
    since: str | None = None,
    project: str | None = None,
    brain_key: str | None = None,
    now: float | None = None,
) -> list[Candidate]:
    """Every session of these hosts in the window, with a skip reason where one applies."""
    now = now or time.time()
    window = _parse_since(since, str(user.harvest.get("since") or "30d"))
    min_idle = float(user.harvest.get("min_idle_minutes", 60)) * 60
    min_user_turns = int(user.harvest.get("min_user_turns", 3))
    own = str(state_dir().resolve())
    project_path = str(Path(project).expanduser().resolve()) if project else None
    out: list[Candidate] = []
    for host in hosts:
        reader = reader_for(host)
        if reader is None:
            continue
        for info in reader.list_sessions():
            if now - info.modified > window:
                continue
            candidate = Candidate(info, None, _watermark(host, info.id) + 1)
            out.append(candidate)
            cwd = str(Path(info.cwd).expanduser()) if info.cwd else ""
            if info.subagent:
                candidate.skip = "subagent session"
            elif info.headless and not user.harvest.get("include_headless"):
                candidate.skip = "headless session"
            elif cwd and cwd.startswith(own):
                candidate.skip = "brain-wiki's own run"
            elif now - info.modified < min_idle:
                candidate.skip = "still in progress"
            elif project_path and not (cwd == project_path or cwd.startswith(project_path + "/")):
                candidate.skip = "outside --project"
            if candidate.skip:
                continue
            candidate.brain = route_brain(info.cwd, host, user)
            if candidate.brain is None:
                candidate.skip = "routes to no brain"
                continue
            if brain_key and candidate.brain.key != brain_key:
                candidate.skip = "belongs to another brain"
                continue
            candidate.transcript = reader.read(info)
            if not candidate.transcript.readable:
                candidate.skip = "unreadable transcript"
            elif sum(1 for t in candidate.new_turns if t.role == "user") < min_user_turns:
                candidate.skip = "nothing new" if candidate.start > 1 else "too few user turns"
    return out


# -- condensing ------------------------------------------------------------
def _condense(turns: list[Turn], budget: int) -> tuple[list[dict[str, Any]], bool]:
    """Scrubbed, shortened turns that fit `budget` characters; truncation keeps the start."""
    out: list[dict[str, Any]] = []
    used = 0
    for turn in turns:
        text, _ = scrub(" ".join(turn.text.split()))
        if len(text) > _TURN_CHARS:
            text = text[: _TURN_CHARS - 1] + "…"
        entry = Turn(turn.index, turn.role, text, [scrub(t)[0] for t in turn.tools[:8]]).to_json()
        cost = len(json.dumps(entry, ensure_ascii=False))
        if out and used + cost > budget:
            return out, True
        out.append(entry)
        used += cost
    return out, False


def _session_payload(
    candidate: Candidate, turns: list[dict[str, Any]], truncated: bool, handle: str
) -> dict[str, Any]:
    turn_range = f"{turns[0]['turn']}-{turns[-1]['turn']}" if turns else None
    return {
        "handle": handle,
        "source": session_url(candidate.info.host, candidate.info.id, turn_range),
        "inputs": candidate.transcript.inputs if candidate.transcript else "unknown",
        "started": candidate.info.started,
        "project": Path(candidate.info.cwd).name if candidate.info.cwd else None,
        "turn_range": turn_range,
        "truncated": truncated,
        "turns": turns,
    }


# -- the in-agent recipe (MCP) -----------------------------------------------
def instructions() -> str:
    return (resources.files("brainwiki") / "assets" / "prompts" / "harvest.md").read_text(
        encoding="utf-8"
    )


def _run_file(run: str) -> Path:
    return state_dir() / "harvest" / "runs" / f"{run}.json"


def prepare_packet(
    user: UserConfig,
    host: str,
    brain: Brain,
    *,
    since: str | None,
    max_sessions: int,
    project: str | None,
) -> dict[str, Any] | None:
    found = [
        c
        for c in discover(user, [host], since=since or "7d", project=project, brain_key=brain.key)
        if not c.skip
    ]
    if not found:
        return None
    run = run_id()
    sessions, mapping, used = [], {}, 0
    for candidate in found[:max_sessions]:
        budget = max(4000, _PACKET_CHARS - used)
        if sessions and used >= _PACKET_CHARS:
            break
        turns, truncated = _condense(candidate.new_turns, budget)
        if not turns:
            continue
        handle = f"S{len(sessions) + 1}"
        sessions.append(_session_payload(candidate, turns, truncated, handle))
        used += sum(len(json.dumps(t, ensure_ascii=False)) for t in turns)
        mapping[handle] = {
            "session": candidate.info.id,
            "first": turns[0]["turn"],
            "last": turns[-1]["turn"],
            "inputs": candidate.transcript.inputs if candidate.transcript else "unknown",
        }
    packet = {
        "run": run,
        "host": host,
        "brain": brain.display_name,
        "remaining": max(0, len(found) - len(sessions)),
        "sessions": sessions,
    }
    target = _run_file(run)
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(
        json.dumps(
            {"created": time.time(), "host": host, "brain_root": str(brain.root), "map": mapping}
        ),
        encoding="utf-8",
    )
    return packet


def _cites_session(engine: Engine, note: str, host: str, session: str) -> bool:
    doc = parse_document(note, engine.store.read_bytes(note).decode("utf-8", "replace"))
    value = doc.frontmatter.data.get(SOURCES)
    for item in value if isinstance(value, list) else [value] if value else []:
        url = parse_session_url(str(item))
        if url is not None and url[:2] == (host, session):
            return True
    return False


def _outcome_problems(
    engine: Engine, host: str, handle: str, info: dict[str, Any], entry: dict[str, Any]
) -> list[str]:
    """Why one session's outcome cannot be recorded."""
    pattern = entry.get("pattern")
    notes = [str(n) for n in entry.get("notes") or []]
    if pattern not in _PATTERNS:
        return [f"{handle}: pattern must be one of {', '.join(_PATTERNS)}"]
    if pattern == "skip":
        if notes or not str(entry.get("reason") or "").strip():
            return [f"{handle}: a skipped session needs a reason and no notes"]
        return []
    if not notes:
        return [f"{handle}: {pattern} needs the notes it changed"]
    if pattern == "distill" and info.get("inputs") != "local":
        return [
            f"{handle}: the session read content from outside (inputs {info.get('inputs')}), "
            "so it cannot be distilled into statements about the user; record or file it"
        ]
    problems = []
    url = session_url(host, info["session"], f"{info['first']}-{info['last']}")
    for note in notes:
        rel = brain_path(engine, note)
        if not engine.store.exists(rel) or not rel.lower().endswith(".md"):
            problems.append(f"{handle}: no such note {note}")
        elif not _cites_session(engine, rel, host, info["session"]):
            problems.append(
                f'{handle}: {rel} does not cite the session; add "{url}" to its {SOURCES}'
            )
    return problems


def done_packet(
    engine: Engine, user: UserConfig, host: str, run: str, entries: list[dict[str, Any]]
) -> dict[str, Any]:
    """Record what came of each session of a harvest run and advance its watermark. A session
    whose outcome fails a check (a missing note or citation) keeps its watermark, so the next
    harvest offers it again."""
    target = _run_file(run)
    if not target.is_file():
        raise NotFound(f"no harvest run {run}; call brain_harvest_prepare")
    state = json.loads(target.read_text(encoding="utf-8"))
    if time.time() - float(state["created"]) > _RUN_TTL_SECONDS:
        raise Expired(f"{run} expired; call brain_harvest_prepare again")
    if state["host"] != host:
        raise NotFound(f"{run} belongs to another host")
    if str(engine.brain.root) != state["brain_root"]:
        raise UsageError(f"{run} was prepared for another brain")
    engine.scan()
    done, errors = [], []
    for entry in entries:
        handle = str(entry.get("session") or "")
        info = state["map"].get(handle)
        if info is None:
            errors.append(f"{handle or '?'}: not in this run")
            continue
        problems = _outcome_problems(engine, host, handle, info, entry)
        if problems:
            errors += problems
            continue
        session = reader_for(host)
        if session is not None and entry.get("pattern") != "skip":
            found = session.find(info["session"])
            if found is None or route_brain(found.cwd, host, user) is None:
                errors.append(f"{handle}: the session no longer routes to this brain")
                continue
        _advance(host, info["session"], int(info["last"]))
        done.append(
            {
                "session": handle,
                "source": session_url(host, info["session"], f"{info['first']}-{info['last']}"),
                "pattern": entry.get("pattern"),
                "notes": list(entry.get("notes") or []),
                "reason": entry.get("reason"),
            }
        )
    return {"run": run, "done": done, "errors": errors}
