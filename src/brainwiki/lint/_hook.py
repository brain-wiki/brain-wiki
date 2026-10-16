"""Git pre-commit integration: lint exactly what will be committed (docs/design/lint-and-reports.md §8)."""

from __future__ import annotations

import os
import stat
import subprocess
from pathlib import Path

from brainwiki.errors import Conflict, NotAvailable
from brainwiki.runs import git_dir_path, is_work_tree, run_git

_HOOK = """#!/bin/sh
# brain-wiki: lint the staged files of this brain (installed by `brain lint --install-hook`).
command -v brain >/dev/null 2>&1 || {{ echo "brain-wiki: 'brain' is not on PATH; skipping lint" >&2; exit 0; }}
cd "$(git rev-parse --show-toplevel)/{rel}" || exit 1
exec brain lint --staged --brain .
"""


def staged_files(root: Path) -> dict[str, bytes]:
    """Brain-relative path -> staged bytes, for files added, copied, modified, or renamed."""
    names = run_git(
        root, "diff", "--cached", "--name-only", "--relative", "--diff-filter=ACMR", "-z"
    )
    if names.returncode != 0:
        raise NotAvailable(names.stderr.strip() or "git diff failed")
    out: dict[str, bytes] = {}
    for name in filter(None, names.stdout.split("\0")):
        shown = subprocess.run(
            ["git", "-C", str(root), "show", f":./{name}"], capture_output=True, check=False
        )
        if shown.returncode == 0:
            out[name] = shown.stdout
    return out


def install_hook(root: Path) -> tuple[Path, bool]:
    """Install the pre-commit hook. Returns (hook path, whether it was installed already)."""
    if not is_work_tree(root):
        raise NotAvailable(f"{root} is not inside a git work tree")
    hooks = git_dir_path(root, "hooks")
    if hooks is None:
        raise NotAvailable("could not locate the git hooks directory")
    target = hooks / "pre-commit"
    top = run_git(root, "rev-parse", "--show-toplevel").stdout.strip()
    rel = os.path.relpath(root, top).replace(os.sep, "/") if top else "."
    hook = _HOOK.format(rel="" if rel == "." else rel)
    if target.exists():
        if target.read_text(encoding="utf-8", errors="replace") == hook:
            return target, True
        raise Conflict(
            f"{target} already exists; add this line to it instead: brain lint --staged --brain {root}"
        )
    hooks.mkdir(parents=True, exist_ok=True)
    target.write_text(hook, encoding="utf-8")
    target.chmod(target.stat().st_mode | stat.S_IXUSR | stat.S_IXGRP | stat.S_IXOTH)
    return target, False
