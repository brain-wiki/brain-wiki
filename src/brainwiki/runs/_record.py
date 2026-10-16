"""Run records and pre-images under `<state>/brains/<key>/runs/<run>/` (docs/design/write-path.md §8)."""

from __future__ import annotations

import gzip
import json
import shutil
from dataclasses import asdict, dataclass, field
from datetime import UTC, datetime, timedelta
from pathlib import Path
from typing import Any

from brainwiki.config import brain_state_dir
from brainwiki.errors import NotFound
from brainwiki.ids import is_prefixed, ulid_datetime

_KEEP_RUNS = 200
_KEEP_DAYS = 90


@dataclass
class FileChange:
    path: str  # where the file was before the run
    before: str | None  # sha256 before the run; None when the run created it
    after: str | None  # sha256 after the run; None when the run deleted it
    moved_to: str | None = None
    append_only: bool = False  # log.md: never rolled back, the undo appends its own entry
    observed: str | None = None  # adopted changes: sha256 of what was on disk when the run began
    adopted: bool = (
        False  # the change was already on disk (a checked edit); undo still restores `before`
    )

    @property
    def final_path(self) -> str:
        return self.moved_to or self.path


@dataclass
class RunRecord:
    run: str
    kind: str
    brain: str
    started: str
    finished: str | None = None
    status: str = "applying"  # applying | applied | rolled_back | failed
    agent: str | None = None
    backend: str | None = None
    model: str | None = None
    summary: str = ""
    packet_sha256: str | None = None
    ops: list[Any] = field(default_factory=list)
    warnings: list[str] = field(default_factory=list)
    files: list[FileChange] = field(default_factory=list)
    git_commit: str | None = None
    git_error: str | None = None
    undoes: str | None = None
    undone_by: str | None = None
    error: str | None = None

    def to_json(self) -> dict[str, Any]:
        data = asdict(self)
        data["files"] = [asdict(f) for f in self.files]
        return data

    @classmethod
    def from_json(cls, data: dict[str, Any]) -> RunRecord:
        data = dict(data)
        files = [FileChange(**f) for f in data.pop("files", [])]
        known = set(cls.__dataclass_fields__)
        return cls(files=files, **{k: v for k, v in data.items() if k in known})


def _runs_dir(brain_key: str) -> Path:
    path = brain_state_dir(brain_key) / "runs"
    path.mkdir(parents=True, exist_ok=True)
    return path


def run_dir(brain_key: str, run: str) -> Path:
    return _runs_dir(brain_key) / run


def save_record(brain_key: str, record: RunRecord) -> None:
    directory = run_dir(brain_key, record.run)
    directory.mkdir(parents=True, exist_ok=True)
    tmp = directory / "record.json.tmp"
    tmp.write_text(json.dumps(record.to_json(), indent=2, ensure_ascii=False), encoding="utf-8")
    tmp.replace(directory / "record.json")


def load_record(brain_key: str, run: str) -> RunRecord:
    path = run_dir(brain_key, run) / "record.json"
    if not path.is_file():
        raise NotFound(f"no run {run!r} on this device")
    return RunRecord.from_json(json.loads(path.read_text(encoding="utf-8")))


def list_records(brain_key: str) -> list[RunRecord]:
    """Newest first. Prepared runs that were never applied (a packet, no record) are skipped."""
    records = []
    for child in sorted(_runs_dir(brain_key).iterdir(), reverse=True):
        if not is_prefixed(child.name, "run-") or not (child / "record.json").is_file():
            continue
        try:
            records.append(load_record(brain_key, child.name))
        except (OSError, ValueError, TypeError):
            continue
    return records


def save_preimage(brain_key: str, run: str, data: bytes, sha: str) -> None:
    target = run_dir(brain_key, run) / "preimages" / f"{sha}.gz"
    if target.exists():
        return
    target.parent.mkdir(parents=True, exist_ok=True)
    tmp = target.with_suffix(".tmp")
    tmp.write_bytes(gzip.compress(data, mtime=0))
    tmp.replace(target)


def load_preimage(brain_key: str, run: str, sha: str) -> bytes:
    target = run_dir(brain_key, run) / "preimages" / f"{sha}.gz"
    if not target.is_file():
        raise NotFound(f"pre-image {sha[:12]} of {run} is missing")
    return gzip.decompress(target.read_bytes())


def prune(brain_key: str, now: datetime | None = None) -> int:
    """Keep the last KEEP_RUNS runs or KEEP_DAYS days, whichever keeps more."""
    now = now or datetime.now(UTC)
    names = sorted(
        (c.name for c in _runs_dir(brain_key).iterdir() if is_prefixed(c.name, "run-")),
        reverse=True,
    )
    cutoff = now - timedelta(days=_KEEP_DAYS)
    removed = 0
    for name in names[_KEEP_RUNS:]:
        if ulid_datetime(name[4:]) < cutoff:
            shutil.rmtree(run_dir(brain_key, name), ignore_errors=True)
            removed += 1
    return removed


def now_iso() -> str:
    return datetime.now(UTC).replace(microsecond=0).isoformat().replace("+00:00", "Z")
