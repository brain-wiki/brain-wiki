"""import."""

from __future__ import annotations

from pathlib import Path
from typing import Any

from brainwiki.cli._output import emit
from brainwiki.errors import Conflict, NotFound, UnsupportedHost, UsageError

_MODES = (
    ("--overlay", "overlay"),
    ("--into", "into"),
    ("--to-episodes", "to_episodes"),
    ("--from", "from_host"),
)


def import_(args: Any) -> int:
    mode = _check_flags(args)
    args.apply = args.apply and not args.dry_run  # --dry-run wins, as in harvest and consolidate
    if mode == "--from":
        return _from_host(args)
    source = Path(args.path).expanduser()
    if not source.exists():
        raise NotFound(f"no such file or folder: {source}")
    if mode in ("--overlay", "--into") and not source.is_dir():
        raise UsageError(f"{mode} needs a folder; {source} is a file")
    if mode == "--overlay":
        return _overlay(args, source)
    if mode == "--into":
        return _into(args, source)
    return _to_episodes(args, source)


def _check_flags(args: Any) -> str:
    """The one mode chosen; a flag the mode would ignore is a usage error, never dropped."""
    modes = [flag for flag, attr in _MODES if getattr(args, attr)]
    if len(modes) > 1:
        raise UsageError(f"choose one mode; {' and '.join(modes)} cannot be combined")
    if not modes:
        raise UsageError("choose a mode: --overlay, --into BRAIN, --to-episodes, or --from HOST")
    mode = modes[0]
    if not args.path and mode != "--from":
        raise UsageError(f"give a folder or file to import with {mode}")
    if mode != "--to-episodes":
        for flag, given in (("--agent", args.agent), ("--untrusted", args.untrusted)):
            if given:
                hint = "; --from records the host itself" if mode == "--from" else ""
                raise UsageError(f"{flag} works only with --to-episodes{hint}")
    if mode != "--overlay" and args.phase:
        raise UsageError("--phase works only with --overlay")
    if args.phase not in (0, 1, 2, 3):
        raise UsageError("--phase must be 0 (adopt), 1, 2, or 3")
    if mode == "--overlay" and args.topic:
        raise UsageError(
            "--topic does not work with --overlay: top-level folders become topics "
            "(rename them in brain.toml after phase 0)"
        )
    return mode


def _overlay(args: Any, source: Path) -> int:
    from brainwiki.importer import overlay

    if args.phase == 0:
        if problem := overlay.already_brain(source):
            raise Conflict(problem)
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
        text = f"Adopted {result['root']} as brain {result['brain']!r}. Next: --phase 1, 2, 3 (each optional)."
        if result["git"] not in (None, "committed"):
            text += f"\nThe added files were not committed: {result['git']}"
        emit(args, result, text)
        return 0
    from brainwiki.config import open_brain
    from brainwiki.engine import Engine

    with Engine(open_brain(source)) as engine:
        record, diff = overlay.apply_phase(engine, args.phase, dry_run=not args.apply)
    if not args.apply:
        emit(
            args,
            {"diff": diff},
            (diff or "Nothing to change.")
            + ("\n\nNothing changed. Run with --apply." if diff else ""),
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
    text, failed = _episodes_summary(results, len(paths), apply=args.apply)
    emit(args, results, text)
    return 1 if failed else 0


def _episodes_summary(
    results: list[dict[str, Any]], files: int, *, apply: bool
) -> tuple[str, list[str]]:
    """What was written and what was skipped as already imported, or what a dry run would do."""
    failed = [r["file"] for r in results if r.get("error")]
    chunks = [r for r in results if not r.get("error")]
    read = files - len(failed)
    if apply:
        new = sum(1 for r in chunks if not r["deduped"])
        text = f"Wrote {new} episodes from {read} files"
        skipped = len(chunks) - new
        text += f"; skipped {skipped} already imported." if skipped else "."
    else:
        text = f"Would write {len(chunks)} episodes from {read} files (already imported ones are skipped)."
    if failed:
        text += f" Could not read {len(failed)}: " + ", ".join(failed)
    if not apply:
        text += " Nothing changed. Run with --apply."
    return text, failed


def _from_host(args: Any) -> int:
    from brainwiki.engine import open_engine
    from brainwiki.importer import import_documents, memory_files

    override = Path(args.path).expanduser() if args.path else None
    try:
        files = memory_files(args.from_host, override)
    except UnsupportedHost as exc:  # the user named a host we have no locations for
        raise UsageError(exc.message) from exc
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
    text, failed = _episodes_summary(results, len(files), apply=args.apply)
    lines = [f"{args.from_host}: {len(files)} memory files"]
    lines += [f"  {f}" for f in files]
    emit(args, results, "\n".join([*lines, text]))
    return 1 if failed else 0
