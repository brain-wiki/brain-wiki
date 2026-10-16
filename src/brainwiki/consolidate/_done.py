"""Archive the episodes an agent folded into notes, as one run that `brain undo` reverses."""

from __future__ import annotations

from typing import TYPE_CHECKING

from brainwiki.consolidate._prepare import archive_path
from brainwiki.errors import NotFound, UsageError
from brainwiki.runs import Run, RunRecord
from brainwiki.write import brain_path, require

if TYPE_CHECKING:
    from brainwiki.engine import Engine


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


def done(engine: Engine, refs: list[str], *, agent: str | None = None) -> RunRecord:
    """Move the named pending episodes from the inbox to the archive."""
    require(engine, "edit", "archive consolidated episodes")
    if not refs:
        raise UsageError("name the episodes you consolidated (paths or ids)")
    engine.scan()
    paths = list(dict.fromkeys(_pending(engine, ref) for ref in refs))
    count = len(paths)
    noun = "episode" if count == 1 else "episodes"
    run = Run(engine, "consolidate", agent=agent, summary=f"archived {count} {noun}")
    for path in paths:
        run.move(path, archive_path(engine, path))
    record = run.commit(
        log_lines=[f"- archived {count} {noun}", *[f"  - {p}" for p in paths]],
        subject=f"brain: consolidate {count} {noun}",
    )
    if engine.manifest.reports.after_consolidate:
        from brainwiki.lint import generate

        generate(engine)
    return record
