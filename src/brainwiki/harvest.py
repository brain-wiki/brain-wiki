"""Harvest: turn finished host sessions into episodes (design doc 05 §2.2).

discover ─► filter ─► route ─► extract ─► distill (or raw) ─► write episodes ─► advance watermark

Everything except distillation is deterministic and lives here. Provenance (agent, session,
turn range, device, taint) always comes from brain-wiki's own parse of the session.
"""

from __future__ import annotations

import hashlib
import json
import re
import time
from dataclasses import dataclass, field
from datetime import UTC, datetime
from importlib import resources
from pathlib import Path
from typing import Any

from brainwiki.config.dirs import state_dir
from brainwiki.config.resolve import Brain, route_brain
from brainwiki.config.user import UserConfig
from brainwiki.errors import Expired, NotFound, UsageError
from brainwiki.format.episode import EpisodeContent
from brainwiki.hosts.sessions import SessionInfo, Transcript, Turn, reader_for
from brainwiki.ids import run_id
from brainwiki.write.secrets import scrub

_PACKET_CHARS = 60_000  # ~15k tokens for the in-agent recipe
CHUNK_CHARS = 120_000  # ~30k tokens per headless distill call
_TURN_CHARS = 2_000
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


def advance(host: str, session: str, last_turn: int) -> None:
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
def condense(turns: list[Turn], budget: int) -> tuple[list[dict[str, Any]], bool]:
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


def chunks(turns: list[Turn], budget: int = CHUNK_CHARS) -> list[list[Turn]]:
    groups: list[list[Turn]] = [[]]
    used = 0
    for turn in turns:
        cost = min(len(turn.text), _TURN_CHARS) + 100
        if groups[-1] and used + cost > budget:
            groups.append([])
            used = 0
        groups[-1].append(turn)
        used += cost
    return [g for g in groups if g]


def session_payload(
    candidate: Candidate, turns: list[dict[str, Any]], truncated: bool, handle: str | None = None
) -> dict[str, Any]:
    out: dict[str, Any] = {}
    if handle:
        out["handle"] = handle
    out.update(
        started=candidate.info.started,
        project=Path(candidate.info.cwd).name if candidate.info.cwd else None,
        turn_range=f"{turns[0]['turn']}-{turns[-1]['turn']}" if turns else None,
        truncated=truncated,
        turns=turns,
    )
    return out


# -- writing ---------------------------------------------------------------
@dataclass
class Distilled:
    skip: bool = False
    reason: str = ""
    summary: str = ""
    claims: list[tuple[str, str]] = field(default_factory=list)  # (text, "a-b")
    negative_findings: list[str] = field(default_factory=list)
    open_questions: list[str] = field(default_factory=list)
    topics: list[str] = field(default_factory=list)


def parse_distilled(data: Any, first: int, last: int) -> tuple[Distilled | None, list[str]]:
    """Validate one session's result: shape, lengths, and turn ranges inside [first, last]."""
    if not isinstance(data, dict):
        return None, ["the result must be an object"]
    errors: list[str] = []
    if data.get("skip"):
        return Distilled(skip=True, reason=str(data.get("reason") or "")[:200]), []

    def strings(key: str, limit: int, count: int) -> list[str]:
        values = data.get(key) or []
        if not isinstance(values, list) or len(values) > count:
            errors.append(f"{key} must be a list of at most {count} strings")
            return []
        return [" ".join(str(v).split())[:limit] for v in values if str(v).strip()]

    summary = str(data.get("summary") or "").strip()
    claims = []
    for index, claim in enumerate(data.get("claims") or []):
        if not isinstance(claim, dict) or not str(claim.get("text") or "").strip():
            errors.append(f"claims[{index}] needs text")
            continue
        match = _TURNS.match(str(claim.get("turns") or ""))
        if not match or not (first <= int(match.group(1)) <= int(match.group(2)) <= last):
            errors.append(f"claims[{index}]: turns must be a range within {first}-{last}")
            continue
        claims.append(
            (" ".join(str(claim["text"]).split())[:500], f"{match.group(1)}-{match.group(2)}")
        )
    result = Distilled(
        summary=summary[:20000],
        claims=claims[:50],
        negative_findings=strings("negative_findings", 500, 20),
        open_questions=strings("open_questions", 500, 20),
        topics=strings("topics", 64, 5),
    )
    if not result.summary and not result.claims:
        errors.append("give a summary or at least one claim, or skip the session")
    return (result if not errors else None), errors


def _render_turns(turns: list[Turn], per_turn: int = 1500) -> str:
    lines = []
    for turn in turns:
        who = "User" if turn.role == "user" else "Assistant"
        text = " ".join(turn.text.split())
        if len(text) > per_turn:
            text = text[: per_turn - 1] + "…"
        tools = f" [tools: {'; '.join(turn.tools[:6])}]" if turn.tools else ""
        lines.append(f"- **{who} (turn {turn.index})**: {text}{tools}")
    return "\n".join(lines)


def write_episode_for(
    candidate: Candidate,
    first: int,
    last: int,
    distilled: Distilled | None,
    *,
    raw_turns: list[Turn] | None = None,
) -> str | None:
    """Write one harvested episode into the session's brain. Returns its path."""
    from brainwiki.engine import Engine
    from brainwiki.write.episode import write_episode

    assert candidate.brain is not None and candidate.transcript is not None
    host, session = candidate.info.host, candidate.info.id
    if distilled is None:
        content = EpisodeContent(
            summary=f"Raw harvest of a {host} session (turns {first}-{last}); not yet distilled.\n\n"
            + _render_turns(raw_turns or [])
        )
        topics: list[str] = []
    else:
        content = EpisodeContent(
            summary=distilled.summary,
            claims=[f"{text} (turns {turns})" for text, turns in distilled.claims],
            negative_findings=distilled.negative_findings,
            open_questions=distilled.open_questions,
        )
        topics = distilled.topics
    with Engine(candidate.brain, host=host) as engine:
        result = write_episode(
            engine,
            content,
            origin="agent",
            taint=candidate.transcript.taint,
            captured="harvest",
            agent=host,
            session=session,
            origin_turns=f"{first}-{last}",
            topics=topics,
            dedupe=f"{host}:{session}:{first}-{last}",
        )
    return result.path


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
        turns, truncated = condense(candidate.new_turns, budget)
        if not turns:
            continue
        handle = f"S{len(sessions) + 1}"
        sessions.append(session_payload(candidate, turns, truncated, handle))
        used += sum(len(json.dumps(t, ensure_ascii=False)) for t in turns)
        mapping[handle] = {
            "session": candidate.info.id,
            "path": str(candidate.info.path),
            "first": turns[0]["turn"],
            "last": turns[-1]["turn"],
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


def apply_packet(
    user: UserConfig, host: str, run: str, entries: list[dict[str, Any]]
) -> dict[str, Any]:
    target = _run_file(run)
    if not target.is_file():
        raise NotFound(f"no harvest run {run}; call brain_harvest_prepare")
    state = json.loads(target.read_text(encoding="utf-8"))
    if time.time() - float(state["created"]) > _RUN_TTL_SECONDS:
        raise Expired(f"{run} expired; call brain_harvest_prepare again")
    if state["host"] != host:
        raise NotFound(f"{run} belongs to another host")
    reader = reader_for(host)
    assert reader is not None
    written, skipped, errors = [], [], []
    for entry in entries:
        handle = str(entry.get("session") or "")
        info = state["map"].get(handle)
        if info is None:
            errors.append(f"{handle or '?'}: not in this run")
            continue
        first, last = int(info["first"]), int(info["last"])
        distilled, problems = parse_distilled(entry, first, last)
        if problems:
            errors += [f"{handle}: {p}" for p in problems]
            continue
        assert distilled is not None
        if distilled.skip:
            advance(host, info["session"], last)
            skipped.append({"session": handle, "reason": distilled.reason})
            continue
        session = reader.find(info["session"])
        if session is None:
            errors.append(f"{handle}: the session is no longer on disk")
            continue
        brain = route_brain(session.cwd, host, user)
        if brain is None or str(brain.root) != state["brain_root"]:
            errors.append(f"{handle}: the session no longer routes to this brain")
            continue
        candidate = Candidate(session, brain, first, reader.read(session))
        path = write_episode_for(candidate, first, last, distilled)
        advance(host, info["session"], last)
        written.append({"session": handle, "episode": path})
    return {"run": run, "written": written, "skipped": skipped, "errors": errors}
