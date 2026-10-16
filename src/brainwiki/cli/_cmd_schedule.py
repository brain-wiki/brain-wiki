"""commit, schedule."""

from __future__ import annotations

import contextlib
from pathlib import Path
from typing import Any

from brainwiki.cli._output import emit, warn
from brainwiki.errors import BrainError, Forbidden, UsageError


def commit(args: Any) -> int:
    from brainwiki.engine import open_engine
    from brainwiki.schedule import commit_brain, parse_duration
    from brainwiki.write import require

    settle = parse_duration(args.settle, "--settle")
    with open_engine(args.brain, host=args.as_host) as engine:
        agent = None if engine.profile.name == "owner" else engine.host
        if agent is not None:
            if args.push:
                raise Forbidden(
                    "pushing publishes the brain; only the user can run `brain commit --push`, "
                    f"not an agent (acting as {agent!r})"
                )
            require(engine, "edit", "commit the brain's changes")
        result = commit_brain(
            engine.brain,
            agent=agent or "schedule",
            settle=settle,
            fetch=not args.no_fetch,
            push=args.push,
            dry_run=args.dry_run,
        )
    for line in result.warnings:
        warn(line)
    emit(args, result.to_json(), _commit_text(result, args.settle, engine.brain.root))
    return result.exit_code


def _commit_text(result: Any, settle: str, root: Path) -> str:
    name = result.brain
    if result.outcome == "busy":
        return f"Skipped {name}: another brain-wiki process is writing; the next run commits."
    would = result.dry_run
    lines = []
    if result.changes:
        subject = (result.message or "").splitlines()[0]
        head = f"Would commit in {name}" if would else f"Committed {result.commit[:12]} in {name}"
        lines.append(f"{head}: {subject}")
        lines += [f"  {c.line}" for c in result.changes]
    else:
        lines.append(f"Nothing {'would be' if would else 'was'} committed in {name}.")
    if result.held:
        lines.append(
            f"Left out {len(result.held)} file(s) changed within {settle}: "
            + ", ".join(result.held[:5])
            + (" ..." if len(result.held) > 5 else "")
        )
    upstream = result.upstream or "origin"
    if would:
        if result.fetch:
            lines.append(
                f"Would fetch and rebase onto {upstream}" + (", then push" if result.push else "")
            )
    elif result.outcome == "conflict" and result.conflicts:
        lines.append(
            f"Conflict with {upstream} in: {', '.join(result.conflicts)}. The rebase was "
            f"aborted; nothing else changed. Resolve with `git pull --rebase` in {root}."
        )
    elif result.push:
        lines.append(f"Fetched, rebased, and pushed to {upstream}.")
    elif result.fetch and result.outcome != "conflict":
        lines.append(f"Fetched and rebased onto {upstream}.")
    lines += result.notes
    return "\n".join(lines)


def schedule(args: Any) -> int:
    from brainwiki.schedule import scheduler

    if args.action == "list":
        return _list(args, scheduler())
    from brainwiki.config import load_user_config
    from brainwiki.engine import open_engine
    from brainwiki.write import require_owner

    with open_engine(args.brain, host=args.as_host) as engine:
        require_owner(engine, "schedule jobs")
        brain = engine.brain
    backend = scheduler()
    if args.action == "remove":
        plan = backend.remove(brain.id, dry_run=args.dry_run)
        if plan is None:
            emit(args, {"removed": False}, f"No commit job for {brain.display_name}.")
            return 0
        verb = "Would remove" if args.dry_run else "Removed"
        text = f"{verb} the commit job for {brain.display_name} ({plan.backend})"
        if args.dry_run:
            text += ":\n" + plan.text.rstrip() + "\n\nCommands:\n  " + "\n  ".join(plan.commands)
        emit(args, {"removed": not args.dry_run, "plan": vars(plan)}, text)
        return 0

    from brainwiki.runs import is_work_tree
    from brainwiki.schedule import make_job, parse_every

    every = parse_every(args.every)[0]
    root = brain.root.resolve()
    name = next(
        (n for n, p in load_user_config().brains.items() if p.expanduser().resolve() == root),
        None,
    )
    if name is None:
        raise UsageError(
            f"the brain at {root} is not registered; the job names it, so register it first "
            "with `brain brains add NAME PATH`"
        )
    if not is_work_tree(root):
        raise UsageError(f"brain {name!r} is not a git work tree; run `git init` in {root} first")
    job = make_job(brain.id, name, every, args.push)
    plan = backend.install(job, dry_run=args.dry_run)
    data = {"brain": name, "id": brain.id, "every": every, "push": args.push, "plan": vars(plan)}
    detail = plan.text.rstrip() + "\n\nCommands:\n  " + "\n  ".join(plan.commands)
    if plan.manual:
        emit(
            args,
            data | {"installed": False},
            "No scheduler is available here (no `crontab` command). Add this to your "
            f"crontab by hand (`crontab -e`):\n\n{plan.text.rstrip()}",
        )
        return 1
    what = f"`brain commit --brain {name}{' --push' if args.push else ''}` every {every}"
    if args.dry_run:
        emit(args, data | {"installed": False}, f"Would run {what} ({plan.backend}):\n{detail}")
        return 0
    emit(
        args,
        data | {"installed": True},
        f"Scheduled {what} ({plan.backend}); log: {job.log_path}"
        + ("" if args.push else "\nIt commits and fetches but never pushes; add --push to push."),
    )
    return 0


def _list(args: Any, backend: Any) -> int:
    from brainwiki.config import load_user_config, open_brain
    from brainwiki.schedule import last_run

    names: dict[str, str] = {}
    for name, path in load_user_config().brains.items():
        with contextlib.suppress(BrainError, OSError):  # unreadable: doctor reports it
            names.setdefault(open_brain(path).id, name)
    rows = []
    for job in backend.jobs():
        record = last_run(job.brain_id) or {}
        rows.append(
            {
                "brain": names.get(job.brain_id),
                "id": job.brain_id,
                "job_brain": job.brain_name,
                "every": job.every,
                "push": job.push,
                "where": job.where,
                "last_run": record.get("time"),
                "outcome": record.get("outcome"),
            }
        )
    if not rows:
        text = "No commit jobs. Add one with `brain schedule add commit`."
    else:
        text = "\n".join(
            f"{r['brain'] or 'unregistered'} ({r['id']}): every {r['every'] or '?'}, "
            + ("pushes" if r["push"] else "does not push")
            + (f"; last run {r['last_run']}: {r['outcome']}" if r["last_run"] else "; not run yet")
            for r in rows
        )
    emit(args, {"jobs": rows}, text)
    return 0
