"""lint, report."""

from __future__ import annotations

import time
from pathlib import Path
from typing import Any

from brainwiki.cli.output import emit
from brainwiki.engine import Engine, open_engine
from brainwiki.errors import NotFound


def _engine(args: Any) -> Engine:
    return open_engine(args.brain, host=getattr(args, "as_host", None))


def _codes(raw: str | None) -> list[str] | None:
    return [c.strip().upper() for c in raw.split(",") if c.strip()] if raw else None


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
    from brainwiki.lint.runner import lint as run_lint

    with _engine(args) as engine:
        if args.install_hook:
            from brainwiki.lint.hook import install_hook

            target = install_hook(engine.brain.root)
            emit(args, {"installed": str(target)}, f"Installed {target}")
            return 0
        paths = brain_paths(engine, args.paths)
        for raw, rel in zip(args.paths or [], paths or [], strict=True):
            if not (engine.brain.root / rel).exists():
                raise NotFound(f"no such file or folder in the brain: {raw}")
        select, ignore = _codes(args.select), _codes(args.ignore)
        if args.fix:
            from brainwiki.lint.fixes import fix

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
            from brainwiki.lint.hook import staged_files

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


def report(args: Any) -> int:
    from brainwiki.lint.reports import generate

    with _engine(args) as engine:
        written = generate(engine)
    emit(args, {"written": written}, "\n".join(f"wrote {p}" for p in written))
    return 0
