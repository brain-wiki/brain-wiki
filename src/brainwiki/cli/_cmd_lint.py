"""lint, report."""

from __future__ import annotations

import time
from pathlib import Path
from typing import Any

from brainwiki.cli._output import emit
from brainwiki.engine import Engine, open_engine
from brainwiki.errors import NotFound, UsageError


def _engine(args: Any) -> Engine:
    return open_engine(args.brain, host=getattr(args, "as_host", None))


def _codes(raw: str | None, flag: str) -> list[str] | None:
    from brainwiki.lint import unknown_codes

    codes = [c.strip().upper() for c in raw.split(",") if c.strip()] if raw else None
    unknown = unknown_codes(codes or [])
    if unknown:
        raise UsageError(
            f"{flag}: no lint rule matches {', '.join(unknown)}; give codes or prefixes "
            "such as BW3,BW405"
        )
    return codes


def brain_paths(engine: Engine, raw: list[str]) -> list[str] | None:
    """CLI paths (absolute, cwd-relative, or brain-relative) as brain-relative paths."""
    if not raw:
        return None
    out = []
    for item in raw:
        candidate = Path(item) if Path(item).is_absolute() else Path.cwd() / item
        try:
            rel = candidate.resolve().relative_to(engine.brain.root).as_posix()
        except ValueError:
            rel = item.replace("\\", "/").strip("/")
        out.append("" if rel == "." else rel)
    return out


def _changed_paths(engine: Engine) -> list[str]:
    row = engine.db.execute("SELECT value FROM meta WHERE key='last_lint_ns'").fetchone()
    since = int(row["value"]) if row else 0
    return [
        r["path"] for r in engine.db.execute("SELECT path FROM files WHERE mtime_ns > ?", (since,))
    ]


def _mark_linted(engine: Engine) -> None:
    engine.db.execute(
        "INSERT OR REPLACE INTO meta(key, value) VALUES ('last_lint_ns', ?)", (str(time.time_ns()),)
    )


def lint(args: Any) -> int:
    from brainwiki.lint import lint as run_lint

    if args.dry_run and not args.fix:
        raise UsageError("--dry-run goes with --fix")
    select, ignore = _codes(args.select, "--select"), _codes(args.ignore, "--ignore")
    with _engine(args) as engine:
        if args.install_hook:
            from brainwiki.lint import install_hook

            target, already = install_hook(engine.brain.root)
            emit(
                args,
                {"installed": str(target), "already": already},
                f"{'Already installed' if already else 'Installed'} {target}",
            )
            return 0
        paths = brain_paths(engine, args.paths)
        for raw, rel in zip(args.paths or [], paths or [], strict=True):
            if not (engine.brain.root / rel).exists():
                raise NotFound(f"no such file or folder in the brain: {raw}")
        if args.fix:
            from brainwiki.lint import fix

            outcome = fix(
                engine,
                paths=paths,
                profile=args.profile,
                select=select,
                ignore=ignore,
                dry_run=args.dry_run,
            )
            if args.dry_run:
                emit(
                    args,
                    {"fixes": [p.to_json() for p in outcome.applied], "diff": outcome.diff},
                    outcome.diff or "Nothing to fix.",
                )
                return 0
            from brainwiki.cli._cmd_runs import warn_git

            warn_git(outcome.record)
            data = outcome.remaining.to_json()
            data["fixed"] = [p.to_json() for p in outcome.applied]
            data["run"] = outcome.record.run if outcome.record else None
            text = (
                f"Fixed {len(outcome.applied)} problem(s) in {outcome.record.run} (undo: brain undo {outcome.record.run})\n"
                if outcome.record
                else "Nothing to fix.\n"
            ) + outcome.remaining.format_text()
            emit(args, data, text)
            return 1 if outcome.remaining.errors else 0
        staged = None
        if args.staged:
            from brainwiki.lint import staged_files

            staged = staged_files(engine.brain.root)
        elif args.changed:
            engine.scan()
            paths = _changed_paths(engine)
        result = run_lint(
            engine, paths=paths, profile=args.profile, select=select, ignore=ignore, staged=staged
        )
        if staged is None and (args.changed or paths is None):
            _mark_linted(engine)
        emit(args, result.to_json(), result.format_text())
        return 1 if result.errors else 0


def validate(args: Any) -> int:
    from brainwiki.lint import format_validate_text
    from brainwiki.lint import validate as run_validate

    with _engine(args) as engine:
        paths = brain_paths(engine, args.paths)
        result, scope = run_validate(engine, paths)
    emit(args, result.to_json() | {"checked": scope}, format_validate_text(result, scope))
    return 1 if result.errors else 0


def report(args: Any) -> int:
    from brainwiki.lint import generate

    with _engine(args) as engine:
        written = generate(engine)
    emit(args, {"written": written}, "\n".join(f"wrote {p}" for p in written))
    return 0
