"""runs, undo."""

from __future__ import annotations

from typing import Any

from brainwiki.cli._output import emit
from brainwiki.engine import open_engine


def runs(args: Any) -> int:
    from brainwiki.runs import list_records, load_record

    with open_engine(args.brain, host=getattr(args, "as_host", None)) as engine:
        key = engine.brain.key
        if args.action == "show":
            record = load_record(key, args.run) if args.run else list_records(key)[0]
            data = record.to_json()
            lines = [
                f"{record.run}  {record.kind}  {record.status}  {record.started}",
                f"agent: {record.agent or 'owner'}"
                + (f"  backend: {record.backend}" if record.backend else ""),
            ]
            if record.summary:
                lines.append(record.summary)
            for change in record.files:
                if change.moved_to:
                    lines.append(f"  {change.path} -> {change.moved_to}")
                elif change.before is None:
                    lines.append(f"  + {change.path}")
                elif change.after is None:
                    lines.append(f"  - {change.path}")
                else:
                    lines.append(f"  ~ {change.path}")
            if record.git_commit:
                lines.append(f"git: {record.git_commit[:12]}")
            if record.git_error:
                lines.append(f"git error: {record.git_error}")
            if record.undone_by:
                lines.append(f"undone by {record.undone_by}")
            emit(args, data, "\n".join(lines))
            return 0
        records = list_records(key)
        data = [
            {
                k: r.to_json()[k]
                for k in ("run", "kind", "status", "started", "agent", "summary", "undone_by")
            }
            for r in records
        ]
        text = "\n".join(
            f"{r.run}  {r.kind:<12} {r.status:<11} {r.started}  {r.summary}"
            + (f"  (undone by {r.undone_by})" if r.undone_by else "")
            for r in records
        )
        emit(args, data, text or "No runs on this device.")
    return 0


def undo(args: Any) -> int:
    from brainwiki.runs import undo as run_undo

    with open_engine(args.brain, host=getattr(args, "as_host", None)) as engine:
        result = run_undo(engine, args.run, force=args.force, agent=getattr(args, "as_host", None))
    emit(args, result.to_json(), f"{result.summary} ({result.run})")
    return 0
