"""Undo a run, and roll back runs a crash left half-applied (design doc 05 §8, §10)."""

from __future__ import annotations

from typing import TYPE_CHECKING

from brainwiki.errors import Busy, Conflict, NotFound, UsageError
from brainwiki.ids import run_id
from brainwiki.runs import _git as git
from brainwiki.runs._lock import brain_lock
from brainwiki.runs._record import (
    FileChange,
    RunRecord,
    list_records,
    load_preimage,
    load_record,
    now_iso,
    run_dir,
    save_record,
)
from brainwiki.runs._transaction import LOG_FILE, Run, rollback

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
    root = engine.brain.root
    if (
        record.git_commit
        and engine.manifest.git.mode in ("auto", "on")
        and git.is_work_tree(root)
        and git.commit_exists(root, record.git_commit)
    ):
        result = _undo_git(engine, record, agent)
    else:
        result = _undo_files(engine, record, force=force, agent=agent)
    record.undone_by = result.run
    save_record(key, record)
    return result


def _undo_files(engine: Engine, record: RunRecord, *, force: bool, agent: str | None) -> RunRecord:
    store = engine.store
    key = engine.brain.key
    changes = [c for c in reversed(record.files) if not c.append_only]
    conflicts = [c.final_path for c in changes if store.sha(c.final_path) != c.after]
    if conflicts and not force:
        raise Conflict(
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


def _undo_git(engine: Engine, record: RunRecord, agent: str | None) -> RunRecord:
    root = engine.brain.root
    key = engine.brain.key
    assert record.git_commit
    paths = list(
        dict.fromkeys([c.path for c in record.files] + [c.final_path for c in record.files])
    )
    befores = {p: engine.store.sha(p) for p in paths}
    with brain_lock(key):
        error = git.revert_no_commit(root, record.git_commit)
        if error:
            raise Conflict(f"git revert of {record.git_commit[:12]} failed: {error}")
        if LOG_FILE in paths:
            git.restore_from_head(root, LOG_FILE)  # log.md stays append-only
        undo_id = run_id()
        entry = (
            f"\n## {now_iso()} · undo · {undo_id}\n- agent: {agent or 'owner'}\n"
            f"- undid {record.run} ({record.kind}) by reverting {record.git_commit[:12]}\n"
        )
        log_text = engine.store.read_text(LOG_FILE) if engine.store.exists(LOG_FILE) else ""
        engine.store.write_text(LOG_FILE, log_text.rstrip("\n") + "\n" + entry)
        if LOG_FILE not in paths:
            paths.append(LOG_FILE)
        sha, git_error = git.commit_paths(
            root,
            paths,
            f"brain: undo {record.run}",
            {"Brain-Run": undo_id, "Brain-Agent": agent or "owner"},
        )
        engine.scan(paths=paths, sanctioned=True)
        result = RunRecord(
            run=undo_id,
            kind="undo",
            brain=engine.manifest.id,
            started=now_iso(),
            finished=now_iso(),
            status="applied",
            agent=agent,
            summary=f"undo {record.run}",
            files=[
                FileChange(path=p, before=befores.get(p), after=engine.store.sha(p))
                for p in paths
                if befores.get(p) != engine.store.sha(p)
            ],
            git_commit=sha,
            git_error=git_error,
            undoes=record.run,
        )
        save_record(key, result)
    return result


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
