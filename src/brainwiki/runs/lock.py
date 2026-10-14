"""The per-brain write lock: an OS advisory lock in the state dir, never inside the brain."""

from __future__ import annotations

from collections.abc import Iterator
from contextlib import contextmanager
from pathlib import Path

from filelock import FileLock, Timeout

from brainwiki.config.dirs import state_dir
from brainwiki.errors import Busy

# One FileLock object per brain so nested acquisitions in one process are reentrant
# instead of deadlocking on a second flock of the same file.
_LOCKS: dict[str, FileLock] = {}


def _lock_path(brain_key: str) -> Path:
    path = state_dir() / "locks" / f"{brain_key}.lock"
    path.parent.mkdir(parents=True, exist_ok=True)
    return path


@contextmanager
def brain_lock(brain_key: str, timeout: float = 30.0) -> Iterator[None]:
    lock = _LOCKS.get(brain_key)
    if lock is None:
        lock = _LOCKS[brain_key] = FileLock(str(_lock_path(brain_key)))
    try:
        lock.acquire(timeout=timeout)
    except Timeout as exc:
        raise Busy("another brain-wiki process is writing to this brain; try again") from exc
    try:
        yield
    finally:
        lock.release()
