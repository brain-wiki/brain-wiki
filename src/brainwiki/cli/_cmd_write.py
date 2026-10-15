"""log, rule, mv."""

from __future__ import annotations

import sys
from typing import Any

from brainwiki.cli._cmd_runs import warn_git
from brainwiki.cli._output import emit, warn
from brainwiki.engine import open_engine
from brainwiki.errors import Forbidden, UsageError


def log(args: Any) -> int:
    from brainwiki.format import EpisodeContent
    from brainwiki.write import write_episode

    text = args.text
    if text in (None, "-"):
        if sys.stdin.isatty() and text is None:
            raise UsageError("give the episode text, or - to read it from stdin")
        text = sys.stdin.read()
    if not text.strip() and not args.claim:
        raise UsageError("the episode is empty")
    host = getattr(args, "as_host", None)
    with open_engine(args.brain, host=host) as engine:
        if engine.profile.name != "owner":  # what the host could write (brain_log_episode)
            if not engine.profile.can("episodes"):
                raise Forbidden(engine.profile.refusal(host, "episodes", "log episodes"))
            if args.agent and args.agent != host:
                raise UsageError(f"--agent {args.agent} contradicts --as {host}")
            if args.inputs == "local":
                raise UsageError("an agent cannot vouch for its inputs: drop --inputs local")
            origin, inputs, agent = "agent", args.inputs or "unknown", host
        elif args.agent:
            origin, inputs, agent = "agent", args.inputs or "unknown", args.agent
        else:
            origin, inputs, agent = "owner", args.inputs or "local", None
        known = engine.topics.paths
        for topic in args.topic:
            if topic.strip() and topic.strip() not in known:
                warn(f"note: there is no topic {topic.strip()!r} yet; kept as a hint")
        result = write_episode(
            engine,
            EpisodeContent(summary=text.strip(), claims=args.claim),
            origin=origin,
            inputs=inputs,
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

    if args.action != "add" and (args.quote or args.replaces):
        raise UsageError("--quote and --replaces go with brain rule add")
    if args.action == "list" and args.value:
        raise UsageError("brain rule list takes no value")
    if args.action != "list" and not args.value:
        raise UsageError(f"brain rule {args.action} needs a value")
    host = getattr(args, "as_host", None)
    with open_engine(args.brain, host=host) as engine:
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
                    f"{p['id']}  {p['text']}  (from {p.get('agent') or 'an agent'}"
                    + (f"; replaces {p['replaces']}" if p.get("replaces") else "")
                    + ")"
                    for p in pending
                ]
            emit(args, {"rules": current, "proposals": pending}, "\n".join(lines))
            return 0
        if args.action == "add" and engine.profile.name != "owner":
            # An agent cannot add a rule; it proposes one for the user (MCP brain_propose_rule).
            if not engine.profile.can("propose_rules"):
                raise Forbidden(engine.profile.refusal(host, "propose_rules", "propose rules"))
            proposal_id, path = rules.propose_rule(
                engine, args.value, args.quote or args.value, replaces=args.replaces, agent=host
            )
            emit(
                args,
                {"status": "proposed", "id": proposal_id, "path": path},
                f"Proposed {proposal_id} ({path}); the user accepts it with "
                f"`brain rule accept {proposal_id}`",
            )
            return 0
        if args.action == "add":
            new_id, record = rules.add_rule(
                engine, args.value, quote=args.quote, replaces=args.replaces
            )
            text = f"Added {new_id} ({record.run})"
            data = {"id": new_id, "run": record.run}
        elif args.action == "accept":
            new_id, record = rules.accept_rule(engine, args.value)
            text = f"Accepted as {new_id} ({record.run})"
            data = {"id": new_id, "run": record.run}
        else:
            record = rules.reject_rule(engine, args.value)
            text = f"Rejected {args.value} ({record.run})"
            data = {"run": record.run}
    warn_git(record)
    emit(args, data, text)
    return 0


def mv(args: Any) -> int:
    from brainwiki.cli._cmd_lint import brain_paths
    from brainwiki.lint import run_gate
    from brainwiki.write import move_note, plan_move

    with open_engine(args.brain, host=getattr(args, "as_host", None)) as engine:
        src, dst = brain_paths(engine, [args.src, args.dst]) or ["", ""]
        if args.dry_run:
            diff = plan_move(engine, src, dst).diff()
            emit(args, {"diff": diff}, diff)
            return 0
        record = move_note(engine, src, dst, check=run_gate(engine))
    warn_git(record)
    emit(args, record.to_json(), f"Moved {src} → {dst} ({record.run})")
    return 0


def check(args: Any) -> int:
    from brainwiki.runs import load_record
    from brainwiki.write import check_edits, format_check_text

    with open_engine(args.brain, host=getattr(args, "as_host", None)) as engine:
        result = check_edits(
            engine, args.paths, allow_shrink=args.allow_shrink, adopt=args.adopt, cli=True
        )
        if result.get("run"):
            warn_git(load_record(engine.brain.key, result["run"]))
    emit(args, result, format_check_text(result))
    return 1 if result["status"] == "failed" else 0


def restore(args: Any) -> int:
    from brainwiki.write import restore as run

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
