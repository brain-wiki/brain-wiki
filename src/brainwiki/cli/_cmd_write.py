"""rules, mv."""

from __future__ import annotations

from typing import Any

from brainwiki.cli._cmd_runs import warn_git
from brainwiki.cli._output import emit
from brainwiki.engine import open_engine
from brainwiki.errors import Forbidden, UsageError


def rules(args: Any) -> int:
    from brainwiki.write import rules as rule_store

    if args.action != "add" and (args.quote or args.replaces):
        raise UsageError("--quote and --replaces go with brain rules add")
    if args.action == "list" and args.value:
        raise UsageError("brain rules list takes no value")
    if args.action != "list" and not args.value:
        raise UsageError(f"brain rules {args.action} needs a value")
    if args.action in ("accept", "reject"):
        return rule_proposal(args, args.action, args.value)
    host = getattr(args, "as_host", None)
    with open_engine(args.brain, host=host) as engine:
        if args.action == "list":
            current = rule_store.list_rules(engine)
            pending = rule_store.pending_rule_proposals(engine)
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
        if engine.profile.name != "owner":
            # An agent cannot add a rule; it proposes one for the user (MCP brain_propose_rule).
            if not engine.profile.can("propose_rules"):
                raise Forbidden(engine.profile.refusal(host, "propose_rules", "propose rules"))
            proposal_id, path = rule_store.propose_rule(
                engine, args.value, args.quote or args.value, replaces=args.replaces, agent=host
            )
            emit(
                args,
                {"status": "proposed", "id": proposal_id, "path": path},
                f"Proposed {proposal_id} ({path}); the user accepts it with "
                f"`brain rules accept {proposal_id}`",
            )
            return 0
        new_id, record = rule_store.add_rule(
            engine, args.value, quote=args.quote, replaces=args.replaces
        )
    warn_git(record)
    emit(args, {"id": new_id, "run": record.run}, f"Added {new_id} ({record.run})")
    return 0


def rule_proposal(args: Any, action: str, proposal_id: str) -> int:
    """Show, accept, or reject a rule proposal: `brain rules accept|reject ID`, and
    `brain review show|accept|reject ID` for an r-... id."""
    from brainwiki.write import rules as rule_store

    with open_engine(args.brain, host=getattr(args, "as_host", None)) as engine:
        if action == "show":
            proposal = rule_store.rule_proposal(engine, proposal_id)
            lines = [
                f"{proposal_id}  rule proposal from {proposal.get('agent') or 'an agent'}",
                f"text: {proposal['text']}",
            ]
            if proposal.get("quote"):
                lines.append(f"quote: {proposal['quote']}")
            if proposal.get("replaces"):
                lines.append(f"replaces: {proposal['replaces']}")
            lines.append(
                f"Accept with `brain review accept {proposal_id}`, or reject with "
                f"`brain review reject {proposal_id}`."
            )
            emit(args, proposal | {"kind": "rule"}, "\n".join(lines))
            return 0
        if action == "accept":
            new_id, record = rule_store.accept_rule(engine, proposal_id)
            text = f"Accepted as {new_id} ({record.run})"
            data = {"id": new_id, "run": record.run}
        else:
            record = rule_store.reject_rule(engine, proposal_id)
            text = f"Rejected {proposal_id} ({record.run})"
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
