"""consolidate, review."""

from __future__ import annotations

import json
import sys
from pathlib import Path
from typing import Any

from brainwiki.cli.output import emit
from brainwiki.engine import open_engine
from brainwiki.errors import UsageError


def consolidate(args: Any) -> int:
    from brainwiki.consolidate import pipeline

    host = getattr(args, "as_host", None)
    with open_engine(args.brain, host=host) as engine:
        if args.apply_file:
            if not args.run:
                raise UsageError("--apply needs --run RUN (the id from --prepare)")
            raw = (
                sys.stdin.read()
                if args.apply_file == "-"
                else Path(args.apply_file).read_text(encoding="utf-8")
            )
            try:
                payload = json.loads(raw)
            except ValueError as exc:
                raise UsageError(f"{args.apply_file} is not JSON: {exc}") from exc
            result = pipeline.apply_run(
                engine,
                args.run,
                payload,
                engine.profile,
                dry_run=args.dry_run,
                agent=host,
                backend="agent",
            )
            emit(args, result.to_json(), result.format_text())
            return 0 if result.status in ("applied", "review", "dry_run") else 1
        if args.prepare:
            packet = pipeline.prepare(
                engine, engine.profile, topic=args.topic, max_episodes=args.max_episodes
            )
            if packet is None:
                emit(args, {"run": None, "pending": 0}, "Nothing to consolidate.")
                return 0
            text = pipeline.instructions() + "\n" + packet.model_text() + "\n"
            if args.out:
                Path(args.out).write_text(text, encoding="utf-8")
                emit(args, {"run": packet.run, "out": args.out}, f"{packet.run}: wrote {args.out}")
            else:
                emit(
                    args,
                    {
                        "run": packet.run,
                        "instructions": pipeline.instructions(),
                        "packet": packet.data,
                    },
                    text,
                )
            return 0
        raise UsageError(
            "consolidation runs in your agent's session: ask it to consolidate the brain. "
            "To drive it yourself, run `brain consolidate --prepare`, then `--apply OPS.json --run RUN`"
        )


def review(args: Any) -> int:
    from brainwiki.consolidate import pipeline
    from brainwiki.consolidate.review import list_proposals, load_proposal

    with open_engine(args.brain, host=getattr(args, "as_host", None)) as engine:
        if args.action == "list":
            items = list_proposals(engine)
            text = "\n".join(
                f"{p['run']}  {p.get('agent') or ''}  {p.get('created') or ''}" for p in items
            )
            emit(args, items, text or "No proposals.")
            return 0
        if not args.run:
            raise UsageError(f"brain review {args.action} needs a run id")
        from brainwiki.write import edits

        if edits.is_edit_proposal(engine, args.run):
            if args.action == "show":
                text = engine.store.read_text(
                    f"{engine.manifest.layout.proposals_dir}/{args.run}.md"
                )
                emit(args, {"run": args.run, "type": "edit-proposal"}, text)
                return 0
            if args.action == "accept":
                record = edits.accept_proposal(engine, args.run)
                emit(args, record.to_json(), f"Accepted {args.run} as {record.run}.")
                return 0
            record = edits.reject_proposal(engine, args.run)
            emit(args, record.to_json(), f"Rejected {args.run}; the note is unchanged.")
            return 0
        if args.action == "show":
            _, ops, agent, text = load_proposal(engine, args.run)
            emit(args, {"run": args.run, "agent": agent, "ops": ops}, text)
            return 0
        if args.action == "accept":
            result = pipeline.accept_review(engine, args.run, engine.profile)
            emit(args, result.to_json(), result.format_text())
            return 0 if result.status == "applied" else 1
        record = pipeline.reject_review(engine, args.run)
        emit(args, record.to_json(), f"Rejected {args.run}; its episodes stay pending.")
    return 0
