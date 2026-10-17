"""consolidate, review."""

from __future__ import annotations

import json
from pathlib import Path
from typing import Any

from brainwiki.cli._output import emit
from brainwiki.engine import open_engine
from brainwiki.errors import UsageError


def consolidate(args: Any) -> int:
    """`--prepare` gathers pending episodes for the agent; `--done` archives the ones it handled."""
    from brainwiki.consolidate import (
        done,
        guidance,
        nothing_message,
        packet_text,
        parse_outcome,
        prepare,
    )

    if args.run:
        return _run(args)
    if args.host or args.harvest or args.include or args.dry_run:
        raise UsageError("--host, --harvest, --include, and --dry-run go with --run")
    if args.prepare == bool(args.done):
        raise UsageError("give --prepare, --done EPISODE (repeatable), or --run --host HOST")
    if not args.prepare and (args.out or args.agent or args.unowned or args.all):
        raise UsageError("--out, --agent, --unowned, and --all go with --prepare")
    with open_engine(args.brain, host=getattr(args, "as_host", None)) as engine:
        if args.done:
            from brainwiki.cli._cmd_runs import warn_git

            record = done(engine, [parse_outcome(d) for d in args.done])
            warn_git(record)
            archived = [c.final_path for c in record.files if c.moved_to]
            emit(
                args,
                {"run": record.run, "archived": archived},
                f"{record.summary[:1].upper()}{record.summary[1:]} in {record.run} "
                f"(undo: brain undo {record.run})",
            )
            return 0
        packet = prepare(
            engine,
            topic=args.topic,
            max_episodes=args.max_episodes,
            agents=args.agent,
            unowned=args.unowned,
            all=args.all,
        )
        if packet is None:
            emit(args, {"episodes": []}, nothing_message(engine))
            return 0
    if args.out:
        document = {"guidance": guidance(), "packet": packet}
        Path(args.out).write_text(json.dumps(document, ensure_ascii=False, indent=1) + "\n")
        emit(
            args,
            {"out": args.out, "episodes": len(packet["episodes"])},
            f"Wrote {args.out}: {len(packet['episodes'])} of {packet['pending']} pending "
            "episode(s), with candidate notes and the guidance",
        )
        return 0
    emit(args, packet, packet_text(packet))
    return 0


def _run(args: Any) -> int:
    """One scheduled consolidation: what `brain schedule add consolidate` installs."""
    from brainwiki.consolidate import run_scheduled
    from brainwiki.write import require_owner

    if args.prepare or args.done or args.out or args.agent or args.unowned or args.all:
        raise UsageError("--run takes only --host, --harvest, --include, and --dry-run")
    if not args.host:
        raise UsageError("--run needs --host HOST, the agent app to start")
    with open_engine(args.brain, host=getattr(args, "as_host", None)) as engine:
        require_owner(engine, "start a scheduled consolidation")
        brain = engine.brain
    result = run_scheduled(
        brain, args.host, harvest=args.harvest, include=args.include, dry_run=args.dry_run
    )
    head = {
        "ok": f"{args.host} consolidated {brain.display_name}",
        "nothing": f"Nothing for {args.host} to do in {brain.display_name}",
        "planned": f"Would start {args.host} for {brain.display_name}",
        "failed": f"Scheduled consolidation by {args.host} failed",
    }[result.status]
    lines = [head + (f": {result.summary}" if result.summary else ".")]
    if result.error:
        lines.append(f"Error: {result.error}")
    lines += [f"- {note}" for note in result.notes]
    emit(args, result.to_json(), "\n".join(lines))
    return 1 if result.status == "failed" else 0


def review(args: Any) -> int:
    """Rule proposals awaiting the user (r-... ids, which `brain rules accept|reject` also take)."""
    if args.action != "list":
        if not args.run:
            raise UsageError(f"brain review {args.action} needs a proposal id")
        from brainwiki.cli._cmd_write import rule_proposal

        return rule_proposal(args, args.action, args.run)
    from brainwiki.write import rules

    with open_engine(args.brain, host=getattr(args, "as_host", None)) as engine:
        items = [{"kind": "rule", **p} for p in rules.pending_rule_proposals(engine)]
    emit(args, items, "\n".join(_review_line(p) for p in items) or "No proposals.")
    return 0


def _review_line(item: dict[str, Any]) -> str:
    agent = item.get("agent") or "an agent"
    line = f"{item['id']}  rule  {agent}  {item['text']}"
    if item.get("quote") and item["quote"] != item["text"]:
        line += f"  [quote: {item['quote']}]"
    if item.get("replaces"):
        line += f"  (replaces {item['replaces']})"
    return line
