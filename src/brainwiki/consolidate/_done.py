"""Archive the episodes an agent consolidated, with what came of each, as one run that
`brain undo` reverses (write-path.md §4.4)."""

from __future__ import annotations

import re
from collections import Counter
from dataclasses import dataclass, field
from typing import TYPE_CHECKING, Any

from brainwiki.consolidate._prepare import archive_path
from brainwiki.errors import NotFound, UsageError
from brainwiki.format import SOURCES, parse_document
from brainwiki.runs import Run, RunRecord
from brainwiki.write import brain_path, require

if TYPE_CHECKING:
    from brainwiki.engine import Engine

_PATTERNS = ("record", "playbook", "file", "distill", "skip")
_LINK = re.compile(r"^\s*\[\[([^\]|#]+)")


@dataclass
class Outcome:
    """What came of one episode: the notes a pattern changed, or why it was skipped. Without a
    pattern (a plain episode reference) nothing is checked."""

    episode: str
    pattern: str | None = None
    notes: list[str] = field(default_factory=list)
    reason: str | None = None

    def check(self) -> None:
        if self.pattern is None:
            if self.notes or self.reason:
                raise UsageError(f"{self.episode}: give a pattern with notes or a reason")
            return
        if self.pattern not in _PATTERNS:
            raise UsageError(f"{self.episode}: pattern must be one of {', '.join(_PATTERNS)}")
        if self.pattern == "skip":
            if self.notes or not (self.reason or "").strip():
                raise UsageError(f"{self.episode}: a skipped episode needs a reason and no notes")
        elif not self.notes:
            raise UsageError(f"{self.episode}: {self.pattern} needs the note it changed")


def parse_outcome(text: str) -> Outcome:
    """`EPISODE`, `EPISODE:PATTERN:NOTE`, or `EPISODE:skip:REASON` (the CLI form)."""
    ref, _, rest = text.partition(":")
    if not rest:
        return Outcome(ref.strip())
    pattern, _, tail = rest.partition(":")
    pattern, tail = pattern.strip(), tail.strip()
    if pattern == "skip":
        return Outcome(ref.strip(), "skip", reason=tail or None)
    return Outcome(ref.strip(), pattern, notes=[tail] if tail else [])


def _pending(engine: Engine, ref: str) -> str:
    """The inbox path of a pending episode named by its path (relative or absolute) or id."""
    text = ref.strip()
    if not text:
        raise UsageError("empty episode reference")
    rel = brain_path(engine, text) if ("/" in text or text.endswith(".md")) else None
    row = engine.db.execute(
        """SELECT path FROM nodes WHERE kind IN ('episode', 'agent_file')
           AND (path = ? OR fm_id = ?)""",
        (rel, text),
    ).fetchone()
    if row is None:
        raise NotFound(f"{ref} is not a pending episode; `brain consolidate --prepare` lists them")
    return row["path"]


def _stem(path: str) -> str:
    return path[:-3] if path.lower().endswith(".md") else path


def _cites(engine: Engine, note: str, episode: str) -> bool:
    """Whether `note`'s `bw-sources` links to the episode, by its archive path, inbox path, or
    file name."""
    doc = parse_document(note, engine.store.read_bytes(note).decode("utf-8", "replace"))
    value = doc.frontmatter.data.get(SOURCES)
    items = value if isinstance(value, list) else [value] if value else []
    archived, inbox = _stem(archive_path(engine, episode)), _stem(episode)
    name = inbox.rsplit("/", 1)[-1].casefold()
    for item in items:
        match = _LINK.match(str(item))
        if not match:
            continue
        target = _stem(match.group(1).strip()).casefold()
        if target in (archived.casefold(), inbox.casefold(), name) or target.endswith("/" + name):
            return True
    return False


def _trail_problems(engine: Engine, path: str, outcomes: list[Outcome]) -> list[str]:
    """Why the outcomes for one episode cannot be recorded: a missing note or citation."""
    problems = []
    if any(o.pattern == "skip" for o in outcomes) and any(
        o.pattern not in (None, "skip") for o in outcomes
    ):
        problems.append(f"{path}: an episode is either skipped or consolidated, not both")
    link = f'"[[{_stem(archive_path(engine, path))}]]"'
    for outcome in outcomes:
        for note in outcome.notes:
            rel = brain_path(engine, note)
            if not engine.store.exists(rel) or not rel.lower().endswith(".md"):
                problems.append(f"{note}: no such note (named for {path})")
            elif not _cites(engine, rel, path):
                problems.append(f"{rel} does not cite {path}; add {link} to its {SOURCES}")
    return problems


def _describe(outcomes: list[Outcome]) -> str:
    parts = []
    for o in outcomes:
        if o.pattern == "skip":
            parts.append(f"skip ({o.reason})")
        elif o.pattern:
            parts.append(f"{o.pattern} → {', '.join(o.notes)}")
    return "; ".join(parts) or "archived"


def done(engine: Engine, outcomes: list[Outcome | str], *, agent: str | None = None) -> RunRecord:
    """Move the named pending episodes from the inbox to the archive, after checking that every
    note named for an episode exists and cites it."""
    require(engine, "edit", "archive consolidated episodes")
    if not outcomes:
        raise UsageError("name the episodes you consolidated (paths or ids)")
    engine.scan()
    by_episode: dict[str, list[Outcome]] = {}
    for item in outcomes:
        outcome = Outcome(item) if isinstance(item, str) else item
        outcome.check()
        by_episode.setdefault(_pending(engine, outcome.episode), []).append(outcome)
    problems = [
        p for path, group in by_episode.items() for p in _trail_problems(engine, path, group)
    ]
    if problems:
        raise UsageError(
            "nothing was archived: " + "; ".join(problems[:10]),
            details=problems,
        )
    count = len(by_episode)
    noun = "episode" if count == 1 else "episodes"
    patterns = Counter(
        o.pattern for group in by_episode.values() for o in group if o.pattern is not None
    )
    tally = ", ".join(f"{n} {p}" for p, n in sorted(patterns.items()))
    summary = f"archived {count} {noun}" + (f": {tally}" if tally else "")
    ops: list[Any] = [
        {
            "episode": path,
            "outcomes": [
                {"pattern": o.pattern, "notes": o.notes, "reason": o.reason}
                for o in group
                if o.pattern is not None
            ],
        }
        for path, group in by_episode.items()
    ]
    run = Run(engine, "consolidate", agent=agent, summary=summary, ops=ops)
    for path in by_episode:
        run.move(path, archive_path(engine, path))
    record = run.commit(
        log_lines=[f"- {path}: {_describe(group)}" for path, group in by_episode.items()],
        subject=f"brain: consolidate {count} {noun}",
    )
    if engine.manifest.reports.after_consolidate:
        from brainwiki.lint import generate

        generate(engine)
    return record
