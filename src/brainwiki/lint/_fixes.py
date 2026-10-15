"""`brain lint --fix`: all fixes of one invocation form one run (design doc 06 §5)."""

from __future__ import annotations

from collections import defaultdict
from dataclasses import dataclass
from typing import TYPE_CHECKING

from brainwiki.errors import Conflict, Forbidden
from brainwiki.lint._files import run_gate
from brainwiki.lint._model import LintResult, Problem
from brainwiki.lint._runner import lint
from brainwiki.runs import Run, RunRecord

if TYPE_CHECKING:
    from brainwiki.engine import Engine


@dataclass
class FixOutcome:
    applied: list[Problem]
    record: RunRecord | None
    diff: str
    remaining: LintResult


def plan(engine: Engine, result: LintResult, *, include_info: bool) -> tuple[Run, list[Problem]]:
    """Stage every applicable fix in one run. Info-level fixes only when explicitly selected."""
    run = Run(engine, "lint-fix")
    groups: dict[str, list[Problem]] = defaultdict(list)
    for problem in result.problems:
        if problem.fix is None or (problem.severity == "info" and not include_info):
            continue
        groups[problem.fix.target or problem.path].append(problem)
    applied: list[Problem] = []
    for target, problems in groups.items():
        original = run.read(target)
        text = original
        for problem in problems:
            fix = problem.fix
            assert fix is not None
            if fix.create is not None:
                if text is None:
                    text = fix.create
                    applied.append(problem)
                continue
            if fix.edit is not None and text is not None:
                updated = fix.edit(text)
                if updated != text:
                    text = updated
                    applied.append(problem)
        if text is not None and text != original:
            run.write(target, text)
        for problem in problems:
            fix = problem.fix
            assert fix is not None
            if fix.move_to:
                try:
                    run.move(target, fix.move_to)
                except Conflict:
                    continue
                if problem not in applied:
                    applied.append(problem)
                break
    run.summary = f"lint --fix: {len(applied)} fix{'es' if len(applied) != 1 else ''}"
    return run, applied


def fix(
    engine: Engine,
    *,
    paths: list[str] | None = None,
    profile: str | None = None,
    select: list[str] | None = None,
    ignore: list[str] | None = None,
    dry_run: bool = False,
) -> FixOutcome:
    if not dry_run and not engine.profile.can("edit"):
        raise Forbidden(engine.profile.refusal(engine.host, "edit", "fix files"))
    result = lint(engine, paths=paths, profile=profile, select=select, ignore=ignore, fixes=True)
    run, applied = plan(engine, result, include_info=bool(select))
    if not run.entries:
        return FixOutcome([], None, "", result)
    if dry_run:
        return FixOutcome(applied, None, run.diff(), result)
    lines = [f"- {p.fix.target or p.path}: {p.code} {p.fix.description}" for p in applied if p.fix]
    record = run.commit(check=run_gate(engine), log_lines=lines[:40])
    remaining = lint(engine, paths=paths, profile=profile, select=select, ignore=ignore)
    return FixOutcome(applied, record, "", remaining)
