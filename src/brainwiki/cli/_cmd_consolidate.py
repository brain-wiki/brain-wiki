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
    from brainwiki.consolidate import done, guidance, packet_text, prepare

    if args.prepare == bool(args.done):
        raise UsageError("give --prepare, or --done EPISODE (repeatable)")
    if args.out and not args.prepare:
        raise UsageError("--out goes with --prepare")
    with open_engine(args.brain, host=getattr(args, "as_host", None)) as engine:
        if args.done:
            from brainwiki.cli._cmd_runs import warn_git

            record = done(engine, args.done)
            warn_git(record)
            archived = [c.final_path for c in record.files if c.moved_to]
            emit(
                args,
                {"run": record.run, "archived": archived},
                f"Archived {len(archived)} episode(s) in {record.run} "
                f"(undo: brain undo {record.run})",
            )
            return 0
        packet = prepare(engine, topic=args.topic, max_episodes=args.max_episodes)
    if packet is None:
        emit(args, {"episodes": []}, "Nothing to consolidate: no pending episodes.")
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
