"""`brain validate`: the frontmatter rules of lint, on the notes an agent just changed."""

from __future__ import annotations

from typing import TYPE_CHECKING

from brainwiki.lint._catalog import SCHEMA_CODES, severity
from brainwiki.lint._model import LintResult, Problem
from brainwiki.lint._runner import lint
from brainwiki.runs import changed_files, is_work_tree

if TYPE_CHECKING:
    from brainwiki.engine import Engine


def _changed_notes(engine: Engine) -> list[str] | None:
    """Markdown files git sees as changed or new; None when the brain is not a git work tree.

    Left out: new files in the inbox, which agents are meant to create (episodes, proposals),
    and reports, which brain-wiki rewrites itself. A changed episode is still reported."""
    root = engine.brain.root
    if not is_work_tree(root):
        return None
    layout = engine.manifest.layout
    tracked = set(changed_files(root, untracked=False))
    return [
        p
        for p in changed_files(root)
        if p.endswith(".md")
        and (root / p).is_file()
        and not p.startswith(layout.reports_dir + "/")
        and (p in tracked or not p.startswith(layout.inbox_dir + "/"))
    ]


def validate(engine: Engine, paths: list[str] | None = None) -> tuple[LintResult, list[str] | None]:
    """Problems in the frontmatter of `paths` (default: the notes git sees as changed, or every
    note without git), and the paths checked (None for the whole brain)."""
    from brainwiki.write import brain_path, protected_reason

    scope = [brain_path(engine, p) for p in paths] if paths else _changed_notes(engine)
    extra: list[Problem] = []
    if scope is not None:
        checked = []
        for rel in scope:
            reason = protected_reason(engine, rel)
            if reason:
                extra.append(Problem("BW121", rel, None, f"{reason}; restore it"))
            else:
                checked.append(rel)
        scope = checked
    result = lint(engine, paths=scope, profile="strict", select=list(SCHEMA_CODES))
    for problem in extra:
        problem.severity = severity(problem.code, "strict")
    result.problems = sorted([*extra, *result.problems], key=lambda p: p.key())
    return result, scope


def format_validate_text(result: LintResult, scope: list[str] | None) -> str:
    if scope is not None and not scope and not result.problems:
        return "Nothing to validate: git sees no changed notes. Pass the paths you edited."
    if not result.problems:
        count = "every note" if scope is None else f"{len(scope)} file(s)"
        return f"Valid: {count} checked, no frontmatter problems."
    return result.format_text()
