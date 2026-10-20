"""Runs: recorded, undoable transactions for every curated change."""

from __future__ import annotations

from brainwiki.runs._git import changed_files, git_dir_path, is_repo_root, is_work_tree, run_git
from brainwiki.runs._lock import brain_lock
from brainwiki.runs._record import RunRecord, list_records, load_record
from brainwiki.runs._transaction import Check, Run
from brainwiki.runs._undo import recover, undo

__all__ = [
    "Check",
    "Run",
    "RunRecord",
    "brain_lock",
    "changed_files",
    "git_dir_path",
    "is_repo_root",
    "is_work_tree",
    "list_records",
    "load_record",
    "recover",
    "run_git",
    "undo",
]
