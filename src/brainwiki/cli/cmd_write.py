"""log, rule, mv."""

from __future__ import annotations

import sys
from typing import Any

from brainwiki.cli.output import emit
from brainwiki.engine import open_engine
from brainwiki.errors import UsageError


def log(args: Any) -> int:
    from brainwiki.format.episode import EpisodeContent
    from brainwiki.write.episode import write_episode

    text = args.text
    if text in (None, "-"):
        if sys.stdin.isatty() and text is None:
            raise UsageError("give the episode text, or - to read it from stdin")
        text = sys.stdin.read()
    if not text.strip() and not args.claim:
        raise UsageError("the episode is empty")
    host = getattr(args, "as_host", None)
    with open_engine(args.brain, host=host) as engine:
        if args.agent:
            origin, taint, agent = "agent", args.taint or "unknown", args.agent
        else:
            origin, taint, agent = "owner", args.taint or "false", None
        result = write_episode(
            engine,
            EpisodeContent(summary=text.strip(), claims=args.claim),
            origin=origin,
            taint=taint,
            captured="cli",
            agent=agent,
            topics=args.topic,
        )
    message = f"{'Already logged' if result.deduped else 'Logged'} {result.path}"
    if result.redacted:
        message += f" (redacted: {', '.join(result.redacted)})"
    emit(args, result.to_json(), message)
    return 0


def rule(args: Any) -> int:
    from brainwiki.write import rules

    with open_engine(args.brain, host=getattr(args, "as_host", None)) as engine:
        if args.action == "list":
            current = rules.list_rules(engine)
            pending = rules.pending_rule_proposals(engine)
            lines = [
                f"{r['id']}  {r['text']}"
                + (f"  (via {r['via']})" if r.get("via") else "")
                + (f"  [quote: {r['quote']}]" if r.get("quote") and r["quote"] != r["text"] else "")
                for r in current
            ] or ["(no rules)"]
            if pending:
                lines.append("")
                lines.append("Awaiting confirmation:")
                lines += [
                    f"{p['id']}  {p['text']}  (from {p.get('agent') or 'an agent'})"
                    for p in pending
                ]
            emit(args, {"rules": current, "proposals": pending}, "\n".join(lines))
            return 0
        if not args.value:
            raise UsageError(f"brain rule {args.action} needs a value")
        if args.action == "add":
            new_id, record = rules.add_rule(
                engine, args.value, quote=args.quote, replaces=args.replaces
            )
            emit(args, {"id": new_id, "run": record.run}, f"Added {new_id} ({record.run})")
        elif args.action == "accept":
            new_id, record = rules.accept_rule(engine, args.value)
            emit(args, {"id": new_id, "run": record.run}, f"Accepted as {new_id} ({record.run})")
        else:
            record = rules.reject_rule(engine, args.value)
            emit(args, {"run": record.run}, f"Rejected {args.value} ({record.run})")
    return 0


def mv(args: Any) -> int:
    from brainwiki.cli.cmd_lint import brain_paths
    from brainwiki.lint.files import run_gate
    from brainwiki.write.move import move_note, plan_move

    with open_engine(args.brain, host=getattr(args, "as_host", None)) as engine:
        src, dst = brain_paths(engine, [args.src, args.dst]) or ["", ""]
        if args.dry_run:
            diff = plan_move(engine, src, dst).diff()
            emit(args, {"diff": diff}, diff)
            return 0
        record = move_note(engine, src, dst, check=run_gate(engine))
    emit(args, record.to_json(), f"Moved {src} → {dst} ({record.run})")
    return 0


def check(args: Any) -> int:
    from brainwiki.write.edits import check_edits, format_check_text

    with open_engine(args.brain, host=getattr(args, "as_host", None)) as engine:
        result = check_edits(engine, args.paths, allow_shrink=args.allow_shrink, adopt=args.adopt)
    emit(args, result, format_check_text(result))
    return 1 if result["status"] == "failed" else 0


def restore(args: Any) -> int:
    from brainwiki.write.edits import restore as run

    with open_engine(args.brain, host=getattr(args, "as_host", None)) as engine:
        result = run(engine, args.path)
    text = (
        f"{result['path']} already matches its last recorded version."
        if result["status"] == "unchanged"
        else f"Restored {result['path']}"
        + (" (removed: it was not recorded)" if result.get("deleted") else "")
        + (f"; the discarded version is in {result['saved']}" if result.get("saved") else "")
    )
    emit(args, result, text)
    return 0
