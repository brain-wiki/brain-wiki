"""Git integration through the git CLI: stage exactly the touched files, commit, never push."""

from __future__ import annotations

import os
import shutil
import subprocess
from pathlib import Path


def _git_available() -> bool:
    return shutil.which("git") is not None


def run_git(root: Path, *args: str) -> subprocess.CompletedProcess[str]:
    env = {**os.environ, "GIT_TERMINAL_PROMPT": "0", "GIT_OPTIONAL_LOCKS": "0"}
    return subprocess.run(
        ["git", "-C", str(root), *args], capture_output=True, text=True, env=env, check=False
    )


def is_work_tree(root: Path) -> bool:
    if not _git_available():
        return False
    result = run_git(root, "rev-parse", "--is-inside-work-tree")
    return result.returncode == 0 and result.stdout.strip() == "true"


def git_dir_path(root: Path, name: str) -> Path | None:
    result = run_git(root, "rev-parse", "--git-path", name)
    if result.returncode != 0:
        return None
    path = Path(result.stdout.strip())
    return path if path.is_absolute() else root / path


def _committable(root: Path, paths: list[str]) -> tuple[list[str], list[str]]:
    """(paths to stage, paths already staged as deleted).

    To stage: paths that exist or are in the index, minus ignored files (git add would refuse
    them). A path only HEAD still has is a deletion staged earlier: git add refuses it, but the
    commit must include it or HEAD keeps the file.
    """
    keep: list[str] = []
    untracked_existing: list[str] = []
    staged_deleted: list[str] = []
    for rel in dict.fromkeys(paths):
        exists = (root / rel).exists()
        tracked = run_git(root, "ls-files", "--error-unmatch", "--", rel).returncode == 0
        if tracked:
            keep.append(rel)
        elif exists:
            untracked_existing.append(rel)
        elif run_git(root, "cat-file", "-e", f"HEAD:{rel}").returncode == 0:
            staged_deleted.append(rel)
    if untracked_existing:
        ignored = run_git(root, "check-ignore", "--", *untracked_existing)
        ignored_set = set(ignored.stdout.splitlines()) if ignored.returncode == 0 else set()
        keep += [p for p in untracked_existing if p not in ignored_set]
    return keep, staged_deleted


def commit_paths(
    root: Path, paths: list[str], subject: str, trailers: dict[str, str]
) -> tuple[str | None, str | None]:
    """Commit exactly `paths` with the user's identity and hooks. Returns (sha, error)."""
    to_add, staged_deleted = _committable(root, paths)
    paths = to_add + staged_deleted
    if not paths:
        return None, None
    if to_add:
        added = run_git(root, "add", "-A", "--", *to_add)
        if added.returncode != 0:
            return None, added.stderr.strip() or "git add failed"
    if run_git(root, "diff", "--cached", "--quiet", "--", *paths).returncode == 0:
        return None, None
    trailer_text = "\n".join(f"{k}: {v}" for k, v in trailers.items())
    committed = run_git(root, "commit", "-q", "-m", subject, "-m", trailer_text, "--", *paths)
    if committed.returncode != 0:
        return None, (committed.stderr or committed.stdout).strip() or "git commit failed"
    head = run_git(root, "rev-parse", "HEAD")
    return (head.stdout.strip() or None), None
