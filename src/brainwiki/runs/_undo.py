"""Undo a run, and roll back runs a crash left half-applied (design doc 05 §8, §10)."""

from __future__ import annotations

from typing import TYPE_CHECKING

from brainwiki.errors import Busy, Conflict, NotFound, Stale, UsageError
from brainwiki.runs._lock import brain_lock
from brainwiki.runs._record import (
    RunRecord,
    list_records,
    load_preimage,
    load_record,
    now_iso,
    run_dir,
    save_record,
)
from brainwiki.runs._transaction import Run, rollback

if TYPE_CHECKING:
    from brainwiki.engine import Engine


def _latest_undoable(brain_key: str) -> RunRecord:
    for record in list_records(brain_key):
        if record.status == "applied" and record.kind != "undo" and not record.undone_by:
            return record
    raise NotFound("no run to undo on this device")


def undo(
    engine: Engine, run: str | None = None, *, force: bool = False, agent: str | None = None
) -> RunRecord:
    key = engine.brain.key
    record = load_record(key, run) if run else _latest_undoable(key)
    if record.undone_by:
        raise Conflict(f"{record.run} was already undone by {record.undone_by}")
    if record.status != "applied":
        raise UsageError(f"{record.run} is {record.status}, not applied")
    result = _restore(engine, record, force=force, agent=agent)
    record.undone_by = result.run
    save_record(key, record)
    return result


def _restore(engine: Engine, record: RunRecord, *, force: bool, agent: str | None) -> RunRecord:
    """Put back every file from the run's pre-images, as a new run.

    Git is never the source: a run touches files git never saw (an uncommitted episode, a
    proposal), and a revert conflicts on log.md whenever a later run exists. The undo run's own
    commit records the result in a git brain.
    """
    store = engine.store
    key = engine.brain.key
    changes = [c for c in reversed(record.files) if not c.append_only]
    conflicts = [c.final_path for c in changes if store.sha(c.final_path) != c.after]
    if conflicts and not force:
        raise Stale(
            "changed since the run: "
            + ", ".join(conflicts)
            + " (use --force to undo anyway; current versions are saved first)",
            details=conflicts,
        )
    for rel in conflicts:
        if store.exists(rel):
            saved = run_dir(key, record.run) / "conflicts" / rel
            saved.parent.mkdir(parents=True, exist_ok=True)
            saved.write_bytes(store.read_bytes(rel))
    run = Run(engine, "undo", agent=agent, summary=f"undo {record.run}", undoes=record.run)
    for change in changes:
        final = change.final_path
        if change.before is None:
            if run.exists(final):
                run.delete(final)
            continue
        if change.moved_to and run.exists(final):
            run.move(final, change.path)
        if not (change.moved_to and change.before == change.after and final not in conflicts):
            run.write(change.path, load_preimage(key, record.run, change.before))
    return run.commit(log_lines=[f"- undid {record.run} ({record.kind})"])


def recover(engine: Engine) -> list[dict[str, object]]:
    """Roll back runs left in `applying` by a crash. Skips them while another writer holds the lock."""
    key = engine.brain.key
    report: list[dict[str, object]] = []
    pending = [r for r in list_records(key) if r.status == "applying"]
    if not pending:
        return report
    try:
        with brain_lock(key, timeout=0):
            for record in pending:
                restored, conflicts = rollback(engine, record)
                record.status = "rolled_back"
                record.finished = now_iso()
                record.error = "interrupted; rolled back by doctor"
                save_record(key, record)
                report.append({"run": record.run, "restored": restored, "left": conflicts})
    except Busy:
        report.append({"run": None, "error": "another process holds the write lock"})
    return report
