"""import."""

from __future__ import annotations

from pathlib import Path
from typing import Any

from brainwiki.cli._output import emit
from brainwiki.errors import Conflict, NotFound, UsageError

# Documents and agents' memory files are imported by an agent, which files them into notes
# directly; there is no command that turns them into episodes (import.md §6).
_MODES = (
    ("--overlay", "overlay"),
    ("--into", "into"),
)


def import_(args: Any) -> int:
    mode = _check_flags(args)
    args.apply = args.apply and not args.dry_run  # --dry-run wins, as in harvest and consolidate
    source = Path(args.path).expanduser()
    if not source.exists():
        raise NotFound(f"no such file or folder: {source}")
    if not source.is_dir():
        raise UsageError(f"{mode} needs a folder; {source} is a file")
    if mode == "--overlay":
        return _overlay(args, source)
    return _into(args, source)


def _check_flags(args: Any) -> str:
    """The one mode chosen; a flag the mode would ignore is a usage error, never dropped."""
    modes = [flag for flag, attr in _MODES if getattr(args, attr)]
    if len(modes) > 1:
        raise UsageError(f"choose one mode; {' and '.join(modes)} cannot be combined")
    if not modes:
        raise UsageError(
            "choose a mode: --overlay or --into BRAIN. To bring in documents or an agent's "
            "memory files, ask an agent to file them into notes"
        )
    mode = modes[0]
    if not args.path:
        raise UsageError(f"give a folder to import with {mode}")
    if mode != "--overlay" and args.phase is not None:
        raise UsageError("--phase works only with --overlay")
    if args.phase is None:
        args.phase = 0
    if args.phase not in (0, 1, 2):
        raise UsageError("--phase must be 0 (adopt), 1, or 2")
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
        text = f"Adopted {result['root']} as brain {result['brain']!r}. Next: --phase 1, 2 (each optional)."
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
