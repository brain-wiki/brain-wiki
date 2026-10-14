"""connect, hook, mcp."""

from __future__ import annotations

from typing import Any


def mcp(args: Any) -> int:
    from brainwiki.mcp.server import serve

    serve(args.host, args.brain)
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
    plan = cn.plan(args.host, scope=args.scope, brain_name=args.brain, force=args.force)
    if args.dry_run:
        emit(args, {"plan": plan.describe()}, plan.describe())
        return 0
    record = cn.apply(plan, brain_name=args.brain, scope=args.scope)
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
