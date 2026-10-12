"""connect, hook, mcp, schedule."""

from __future__ import annotations

from typing import Any


def mcp(args: Any) -> int:
    from brainwiki.mcp.server import serve

    serve(args.host, args.brain)
    return 0


def hook(args: Any) -> int:
    import sys

    from brainwiki.hosts.hooks import handle

    data = "" if sys.stdin is None or sys.stdin.isatty() else sys.stdin.read()
    out = handle(args.host, args.event, data)
    if out:
        sys.stdout.write(out + "\n")
    return 0


def connect(args: Any) -> int:
    from brainwiki.cli.output import emit
    from brainwiki.errors import UsageError
    from brainwiki.hosts import connect as cn

    if args.uninstall:
        steps = cn.uninstall(args.host, dry_run=args.dry_run)
        emit(args, {"host": args.host, "steps": steps}, "\n".join(steps))
        return 0
    if args.print_only or args.host == "generic":
        if args.host not in cn.HOSTS:
            raise UsageError(f"unknown host {args.host!r}; use one of {', '.join(cn.HOSTS)}")
        text = cn.print_text(args.host, args.brain)
        emit(args, {"text": text}, text)
        return 0
    plan = cn.plan(
        args.host,
        scope=args.scope,
        capture=args.capture,
        brain_name=args.brain,
        briefing_hook=args.briefing_hook,
        force=args.force,
    )
    if args.dry_run:
        emit(args, {"plan": plan.describe()}, plan.describe())
        return 0
    record = cn.apply(plan, capture=args.capture, brain_name=args.brain, scope=args.scope)
    failed = [c for c in record["commands"] if not c["ok"]]
    lines = [f"Connected {args.host}: plugin at {record['plugin_dir']}"]
    lines += [
        f"  instructions: {item['written']}"
        for item in record.get("instructions", [])
        if not item.get("plugin")
    ]
    lines += [f"  failed: {' '.join(c['run'])}: {c['output'].strip()}" for c in failed]
    lines += plan.notes
    if "visible" in record:
        lines.append(
            "  verified: brain-wiki is listed"
            if record["visible"]
            else "  warning: brain-wiki is not listed yet"
        )
    lines.append(f"Undo with: brain connect {args.host} --uninstall")
    emit(args, record, "\n".join(lines))
    return 1 if failed else 0


def schedule(args: Any) -> int:
    from brainwiki.cli.output import emit
    from brainwiki.engine import open_engine
    from brainwiki.errors import UsageError
    from brainwiki.hosts import schedule as sc

    if args.action == "list":
        items = sc.schedule_state()
        text = (
            "\n".join(f"{i['key']}  {i['kind']}  {i['cron']}" for i in items)
            or "No routines installed."
        )
        emit(args, items, text)
        return 0
    if not args.routine:
        raise UsageError(f"brain schedule {args.action} needs a routine: {', '.join(sc.ROUTINES)}")
    if args.action == "remove":
        steps = sc.remove(args.routine)
        emit(args, {"steps": steps}, "\n".join(steps))
        return 0
    with open_engine(args.brain, host=getattr(args, "as_host", None)) as engine:
        if args.action == "show":
            if not args.for_host:
                raise UsageError("brain schedule show needs --for HOST")
            shown = sc.show(engine, args.routine, args.for_host, at=args.at)
            text = "\n".join(shown["steps"]) + "\n\n" + shown["prompt"]
            emit(args, shown, text)
            return 0
        plan = sc.plan_install(engine, args.routine, host=args.for_host, via=args.via, at=args.at)
    if not args.apply:
        emit(args, plan, sc.describe(plan) + "\n\nNothing changed. Run again with --apply.")
        return 0
    sc.install(plan)
    emit(
        args,
        plan,
        f"Installed {plan['key']} ({plan['kind']}). Remove with: brain schedule remove {args.routine}",
    )
    return 0
