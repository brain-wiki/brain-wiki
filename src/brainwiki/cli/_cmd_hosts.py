"""connect, mcp."""

from __future__ import annotations

from typing import Any


def mcp(args: Any) -> int:
    from brainwiki.config import SLUG_RE
    from brainwiki.errors import UsageError

    if args.host != "auto" and not SLUG_RE.match(args.host):
        raise UsageError(
            f"{args.host!r} is not a host id; use auto or one like claude-code, codex, cursor"
        )
    from brainwiki.mcp import serve

    serve(args.host, args.brain)
    return 0


def connect(args: Any) -> int:
    from brainwiki.cli._output import emit
    from brainwiki.errors import UsageError
    from brainwiki.hosts import connect as cn

    if args.uninstall:
        if args.print_only:
            raise UsageError("--print and --uninstall do not go together; use one")
        steps = cn.uninstall(args.host, scope=args.scope, dry_run=args.dry_run)
        emit(args, {"host": args.host, "steps": steps}, "\n".join(steps))
        return 0
    brain = cn.check_brain(args.brain)
    if args.print_only or args.host == "generic":
        if args.host not in cn.HOSTS:
            raise UsageError(f"unknown host {args.host!r}; use one of {', '.join(cn.HOSTS)}")
        text = cn.print_text(args.host, brain)
        emit(args, {"text": text}, text)
        return 0
    plan = cn.plan(args.host, scope=args.scope, brain_name=brain, force=args.force)
    if args.dry_run:
        emit(args, {"plan": plan.describe()}, plan.describe())
        return 0
    record = cn.apply(plan, brain_name=brain, scope=args.scope)
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
    scope = " --scope project" if args.scope == "project" else ""
    lines.append(f"Undo with: brain connect {args.host}{scope} --uninstall")
    emit(args, record, "\n".join(lines))
    return 1 if failed else 0
