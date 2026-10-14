"""import."""

from __future__ import annotations

from pathlib import Path
from typing import Any

from brainwiki.cli._output import emit
from brainwiki.errors import NotFound, UsageError


def import_(args: Any) -> int:
    if args.from_host:
        return _from_host(args)
    if not args.path:
        raise UsageError("give a folder or file to import, or --from HOST")
    source = Path(args.path).expanduser()
    if args.overlay:
        return _overlay(args, source)
    if args.into:
        return _into(args, source)
    if args.to_episodes:
        return _to_episodes(args, source)
    raise UsageError("choose a mode: --overlay, --into BRAIN, --to-episodes, or --from HOST")


def _overlay(args: Any, source: Path) -> int:
    from brainwiki.importer import overlay

    if args.phase == 0:
        if not args.apply:
            from brainwiki.importer import survey

            found = survey(source)
            text = overlay.report(found, args.brain or source.resolve().name)
            emit(
                args,
                found.to_json(),
                text + "\nNothing changed. Run with --apply to adopt (phase 0).",
            )
            return 0
        result = overlay.adopt(source, name=args.brain)
        emit(
            args,
            result,
            f"Adopted {result['root']} as brain {result['brain']!r}. Next: --phase 1, 2, 3 (each optional).",
        )
        return 0
    from brainwiki.config import open_brain
    from brainwiki.engine import Engine

    with Engine(open_brain(source)) as engine:
        record, diff = overlay.apply_phase(engine, args.phase, dry_run=not args.apply)
    if not args.apply:
        emit(
            args,
            {"diff": diff},
            (diff or "Nothing to change.") + ("\n\nRun with --apply." if diff else ""),
        )
        return 0
    if record is None:
        emit(args, {"run": None}, "Nothing to change.")
        return 0
    emit(
        args,
        record.to_json(),
        f"Phase {args.phase} applied ({record.run}); undo with brain undo {record.run}",
    )
    return 0


def _into(args: Any, source: Path) -> int:
    from brainwiki.engine import open_engine
    from brainwiki.importer import plan_into, tidy_after_import
    from brainwiki.lint import run_gate

    with open_engine(args.into) as engine:
        run, summary = plan_into(engine, source, topic=args.topic)
        if not args.apply:
            lines = [
                f"Would copy {summary['files']} files into topics {', '.join(summary['topics'])}."
            ]
            lines.append(
                f"Markdown links to files outside the source: {summary['unresolved_md_links']}"
            )
            emit(args, summary, "\n".join(lines) + "\nNothing changed. Run with --apply.")
            return 0
        record = run.commit(
            check=run_gate(engine), log_lines=[f"- imported {summary['files']} files from {source}"]
        )
        tidy = [r.run for r in tidy_after_import(engine)]
    text = f"Imported {summary['files']} files ({record.run})."
    if tidy:
        text += f" Then added hubs and refreshed AGENTS.md ({', '.join(tidy)}); undo all to revert."
    emit(args, record.to_json() | summary | {"tidy_runs": tidy}, text)
    return 0


def _to_episodes(args: Any, source: Path) -> int:
    from brainwiki.engine import open_engine
    from brainwiki.importer import import_documents

    if not source.exists():
        raise NotFound(f"no such file or folder: {source}")
    paths = sorted(source.rglob("*.md")) if source.is_dir() else [source]
    with open_engine(args.brain, host=getattr(args, "as_host", None)) as engine:
        results = import_documents(
            engine,
            paths,
            base=source if source.is_dir() else source.parent,
            origin="import",
            inputs="external" if args.untrusted else "local",
            agent=args.agent,
            topic=args.topic,
            dry_run=not args.apply,
        )
    failed = [r["file"] for r in results if r.get("error")]
    written = len(results) - len(failed)
    verb = "Would write" if not args.apply else "Wrote"
    text = f"{verb} {written} episodes from {len(paths) - len(failed)} files."
    if failed:
        text += f" Could not read {len(failed)}: " + ", ".join(failed)
    emit(args, results, text + ("" if args.apply else " Run with --apply."))
    return 1 if failed else 0


def _from_host(args: Any) -> int:
    from brainwiki.engine import open_engine
    from brainwiki.importer import import_documents, memory_files

    override = Path(args.path).expanduser() if args.path else None
    files = memory_files(args.from_host, override)
    with open_engine(args.brain) as engine:
        results = import_documents(
            engine,
            files,
            base=Path.home(),
            origin="agent",
            inputs="unknown",
            agent=args.from_host,
            topic=args.topic,
            dry_run=not args.apply,
        )
    lines = [f"{args.from_host}: {len(files)} memory files, {len(results)} episodes"]
    lines += [f"  {f}" for f in files]
    if not args.apply:
        lines.append("Nothing changed. Run with --apply.")
    emit(args, results, "\n".join(lines))
    return 0
