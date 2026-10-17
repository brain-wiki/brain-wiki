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
    from brainwiki.engine import open_engine
    from brainwiki.write import require_owner

    consolidate = args.job == "consolidate"
    if consolidate and (args.every or args.push):
        raise UsageError("--every and --push go with the commit job")
    if not consolidate and (args.host or args.at or args.harvest or args.include):
        raise UsageError("--host, --at, --harvest, and --include go with the consolidate job")
    if consolidate and not args.host:
        raise UsageError("the consolidate job needs --host HOST, the agent app that runs it")
    with open_engine(args.brain, host=args.as_host) as engine:
        require_owner(engine, "schedule jobs")
        brain = engine.brain
    backend = scheduler()
    if args.action == "remove":
        ident = f"{brain.id}.{args.host}" if consolidate else brain.id
        plan = backend.remove(ident, dry_run=args.dry_run, kind=args.job)
        what = f"{args.host}'s consolidate job" if consolidate else "the commit job"
        if plan is None:
            emit(
                args,
                {"removed": False},
                f"No {what.removeprefix('the ')} for {brain.display_name}.",
            )
            return 0
        verb = "Would remove" if args.dry_run else "Removed"
        text = f"{verb} {what} for {brain.display_name} ({plan.backend})"
        if args.dry_run:
            text += ":\n" + plan.text.rstrip() + "\n\nCommands:\n  " + "\n  ".join(plan.commands)
        emit(args, {"removed": not args.dry_run, "plan": vars(plan)}, text)
        return 0
    name = _registered_name(brain)
    if consolidate:
        return _add_consolidate(args, backend, brain, name)

    from brainwiki.runs import is_work_tree
    from brainwiki.schedule import make_job, parse_every

    every = parse_every(args.every or "15m")[0]
    root = brain.root.resolve()
    if not is_work_tree(root):
        raise UsageError(f"brain {name!r} is not a git work tree; run `git init` in {root} first")
    job = make_job(brain.id, name, every, args.push)
    plan = backend.install(job, dry_run=args.dry_run)
    data = {"brain": name, "id": brain.id, "every": every, "push": args.push, "plan": vars(plan)}
    what = f"`brain commit --brain {name}{' --push' if args.push else ''}` every {every}"
    after = "" if args.push else "It commits and fetches but never pushes; add --push to push."
    return _report_install(args, plan, data, what, job.log_path, after)


def _registered_name(brain: Any) -> str:
    """The name the job uses for the brain: jobs name brains, so it must be registered."""
    from brainwiki.config import load_user_config

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
    return name


def _add_consolidate(args: Any, backend: Any, brain: Any, name: str) -> int:
    """Install a host's daily consolidation after the checks a run makes pass (write-path.md
    §4.8): a profile with `edit`, the host CLI and its unattended mode, and a dry run."""
    from brainwiki.consolidate import run_scheduled
    from brainwiki.schedule import make_consolidate_job

    job = make_consolidate_job(
        brain.id, name, args.host, args.at or "21:30", args.harvest, args.include
    )
    check = run_scheduled(
        brain, args.host, harvest=args.harvest, include=args.include, dry_run=True
    )
    if check.status == "failed":
        raise UsageError(f"not scheduled: {check.error}")
    plan = backend.install(job, dry_run=args.dry_run)
    data = {
        "brain": name,
        "id": brain.id,
        "host": args.host,
        "at": job.at,
        "harvest": args.harvest,
        "include": args.include,
        "check": check.to_json(),
        "plan": vars(plan),
    }
    what = f"{args.host}'s consolidation of {name} daily at {job.at}" + (
        ", with harvest" if args.harvest else ""
    )
    after = (
        f"Now: {check.summary}. The machine must be on at {job.at}; failures show in "
        "orientation and `brain doctor`."
    )
    return _report_install(args, plan, data, what, job.log_path, after)


def _report_install(
    args: Any, plan: Any, data: dict[str, Any], what: str, log: Path, after: str
) -> int:
    detail = plan.text.rstrip() + "\n\nCommands:\n  " + "\n  ".join(plan.commands)
    if plan.manual:
        emit(
            args,
            data | {"installed": False},
            "No scheduler is available here (no `crontab` command). Add this to your "
            f"crontab by hand (`crontab -e`):\n\n{plan.text.rstrip()}",
        )
        return 1
    if args.dry_run:
        emit(args, data | {"installed": False}, f"Would run {what} ({plan.backend}):\n{detail}")
        return 0
    text = f"Scheduled {what} ({plan.backend}); log: {log}" + (f"\n{after}" if after else "")
    emit(args, data | {"installed": True}, text)
    return 0


def _list(args: Any, backend: Any) -> int:
    from brainwiki.config import load_user_config, open_brain
    from brainwiki.schedule import last_run

    names: dict[str, str] = {}
    brains: dict[str, Any] = {}
    for name, path in load_user_config().brains.items():
        with contextlib.suppress(BrainError, OSError):  # unreadable: doctor reports it
            brain = open_brain(path, name)
            names.setdefault(brain.id, name)
            brains.setdefault(brain.id, brain)
    rows = []
    for job in backend.jobs():
        row: dict[str, Any] = {
            "kind": job.kind,
            "brain": names.get(job.brain_id),
            "id": job.brain_id,
            "job_brain": job.brain_name,
            "where": job.where,
        }
        if job.kind == "consolidate":
            record = _scheduled_record(brains.get(job.brain_id), job.host)
            row |= {
                "host": job.host,
                "at": job.at,
                "harvest": job.harvest,
                "include": job.include,
                "last_run": record.get("at"),
                "outcome": record.get("status"),
            }
        else:
            record = last_run(job.brain_id) or {}
            row |= {
                "every": job.every,
                "push": job.push,
                "last_run": record.get("time"),
                "outcome": record.get("outcome"),
            }
        rows.append(row)
    if not rows:
        text = (
            "No jobs. Add one with `brain schedule add commit`, or "
            "`brain schedule add consolidate --host HOST`."
        )
    else:
        text = "\n".join(_job_line(r) for r in rows)
    emit(args, {"jobs": rows}, text)
    return 0


def _scheduled_record(brain: Any, host: str | None) -> dict[str, Any]:
    if brain is None or not host:
        return {}
    import json

    from brainwiki.index import scheduled_run_path

    try:
        return json.loads(scheduled_run_path(brain.key, host).read_text(encoding="utf-8"))
    except (OSError, ValueError):
        return {}


def _job_line(r: dict[str, Any]) -> str:
    who = f"{r['brain'] or 'unregistered'} ({r['id']})"
    last = f"; last run {r['last_run']}: {r['outcome']}" if r["last_run"] else "; not run yet"
    if r["kind"] == "consolidate":
        extra = (", with harvest" if r["harvest"] else "") + (
            f", including {', '.join(r['include'])}" if r["include"] else ""
        )
        return f"{who}: {r['host']} consolidates daily at {r['at'] or '?'}{extra}{last}"
    return (
        f"{who}: commit every {r['every'] or '?'}, "
        + ("pushes" if r["push"] else "does not push")
        + last
    )
