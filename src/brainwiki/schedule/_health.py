"""What `brain doctor` reports about commit jobs (design doc 05 §5.2)."""

from __future__ import annotations

import time
from datetime import UTC, datetime, timedelta
from pathlib import Path
from typing import Any

from brainwiki.runs import changed_files
from brainwiki.schedule._commit import last_run
from brainwiki.schedule._jobs import list_jobs

_DAY = 86400


def _old_changes(root: Path) -> int:
    """Uncommitted files last changed more than a day ago."""
    cutoff = time.time() - _DAY
    old = 0
    for rel in changed_files(root):
        try:
            old += (root / rel).lstat().st_mtime < cutoff
        except OSError:
            continue
    return old


def _stale_sync(record: dict[str, Any]) -> bool:
    if record.get("outcome") not in ("offline", "conflict", "rejected"):
        return False
    synced = record.get("synced")
    if not synced:
        return True
    try:
        return datetime.now(UTC) - datetime.fromisoformat(synced) > timedelta(days=1)
    except ValueError:
        return True


def schedule_problems(brains: list[dict[str, Any]]) -> list[dict[str, Any]]:
    """Problems for doctor, given its brain summaries (name, path, ok, git, id)."""
    problems: list[dict[str, Any]] = []
    jobs = {job.brain_id: job for job in list_jobs()}
    registered = {b["id"] for b in brains if b.get("ok")}
    for brain_id, job in sorted(jobs.items()):
        if brain_id not in registered:
            problems.append(
                {
                    "code": "schedule_unregistered",
                    "severity": "warning",
                    "message": f"a commit job ({job.where}) runs for brain id {brain_id} "
                    f"(named {job.brain_name!r} in the job), which is no longer registered",
                    "fix": "register the brain again (`brain brains add NAME PATH`), or remove "
                    "the job with `brain schedule remove commit --brain PATH`",
                }
            )
    for brain in brains:
        if not brain.get("ok"):
            continue
        name = brain["name"]
        record = last_run(brain["id"])
        if record and _stale_sync(record):
            problems.append(
                {
                    "code": "brain_not_synced",
                    "severity": "warning",
                    "message": f"brain {name!r} has not synced with origin for over a day "
                    f"(last run: {record.get('outcome')} at {record.get('time')})",
                    "fix": f"brain commit --brain {name}",
                }
            )
        if brain.get("git") and brain["id"] not in jobs:
            old = _old_changes(Path(brain["path"]))
            if old:
                problems.append(
                    {
                        "code": "uncommitted_edits",
                        "severity": "info",
                        "message": f"brain {name!r} has {old} file(s) changed over a day ago "
                        "and not committed, and no commit job",
                        "fix": f"brain schedule add commit --brain {name} (or `brain commit`)",
                    }
                )
    return problems
