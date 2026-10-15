"""Local filesystem store: path safety, atomic writes, exclusive creates."""

from __future__ import annotations

import hashlib
import os
import sys
import tempfile
from collections.abc import Callable, Iterator
from dataclasses import dataclass
from pathlib import Path, PurePosixPath

from brainwiki.errors import Conflict, Stale, UsageError

_TMP_PREFIX = ".brain-tmp-"


def sha256_bytes(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


@dataclass(frozen=True)
class FileStat:
    path: str
    size: int
    mtime_ns: int


class LocalStore:
    def __init__(self, root: Path):
        self.root = root.resolve()

    # -- paths ---------------------------------------------------------
    def abspath(self, rel: str) -> Path:
        """Resolve a brain-relative path, refusing anything that escapes the root."""
        if not rel or "\x00" in rel:
            raise UsageError("empty or invalid path")
        posix = PurePosixPath(rel.replace("\\", "/"))
        if posix.is_absolute() or ".." in posix.parts:
            raise UsageError(f"path escapes the brain: {rel}")
        target = (self.root / Path(*posix.parts)).resolve()
        if target != self.root and self.root not in target.parents:
            raise UsageError(f"path escapes the brain: {rel}")
        return target

    def rel(self, path: Path) -> str:
        return path.resolve().relative_to(self.root).as_posix()

    # -- reads ---------------------------------------------------------
    def exists(self, rel: str) -> bool:
        return self.abspath(rel).exists()

    def read_bytes(self, rel: str) -> bytes:
        return self.abspath(rel).read_bytes()

    def read_text(self, rel: str) -> str:
        return self.abspath(rel).read_bytes().decode("utf-8")

    def sha(self, rel: str) -> str | None:
        path = self.abspath(rel)
        return sha256_bytes(path.read_bytes()) if path.exists() else None

    def walk(self, skip: Callable[[str], bool] | None = None) -> Iterator[FileStat]:
        root = str(self.root)
        cut = len(root) + 1
        sep = os.sep
        stack = [root]
        while stack:
            current = stack.pop()
            try:
                entries = list(os.scandir(current))
            except OSError:
                continue
            for entry in entries:
                if entry.name.startswith("."):
                    continue
                rel = entry.path[cut:]
                if sep != "/":
                    rel = rel.replace(sep, "/")
                if skip and skip(rel):
                    continue
                if entry.is_dir(follow_symlinks=False):
                    stack.append(entry.path)
                elif entry.is_file(follow_symlinks=False):
                    st = entry.stat(follow_symlinks=False)
                    yield FileStat(rel, st.st_size, st.st_mtime_ns)

    # -- writes --------------------------------------------------------
    def write_bytes(self, rel: str, data: bytes, *, expect_sha: str | None = None) -> str:
        """Atomically replace a file. With `expect_sha`, refuse if the current content differs."""
        target = self.abspath(rel)
        if expect_sha is not None:
            current = sha256_bytes(target.read_bytes()) if target.exists() else None
            if current != expect_sha:
                raise Stale(f"{rel} changed since it was read")
        target.parent.mkdir(parents=True, exist_ok=True)
        mode = target.stat().st_mode & 0o777 if target.exists() else None
        fd, tmp = tempfile.mkstemp(prefix=_TMP_PREFIX, dir=target.parent)
        try:
            with os.fdopen(fd, "wb") as fh:
                fh.write(data)
                fh.flush()
                os.fsync(fh.fileno())
            if mode is not None:
                os.chmod(tmp, mode)
            os.replace(tmp, target)
        except BaseException:
            Path(tmp).unlink(missing_ok=True)
            raise
        _fsync_dir(target.parent)
        return sha256_bytes(data)

    def write_text(self, rel: str, text: str, *, expect_sha: str | None = None) -> str:
        return self.write_bytes(rel, text.encode("utf-8"), expect_sha=expect_sha)

    def create_text(self, rel: str, text: str) -> str:
        """Create a new file; raises FileExistsError if it already exists."""
        target = self.abspath(rel)
        target.parent.mkdir(parents=True, exist_ok=True)
        data = text.encode("utf-8")
        fd = os.open(target, os.O_WRONLY | os.O_CREAT | os.O_EXCL, 0o644)
        with os.fdopen(fd, "wb") as fh:
            fh.write(data)
            fh.flush()
            os.fsync(fh.fileno())
        _fsync_dir(target.parent)
        return sha256_bytes(data)

    def move(self, src: str, dst: str) -> None:
        source, target = self.abspath(src), self.abspath(dst)
        if target.exists():
            raise Conflict(f"{dst} already exists")
        target.parent.mkdir(parents=True, exist_ok=True)
        os.replace(source, target)
        _fsync_dir(target.parent)

    def delete(self, rel: str) -> None:
        self.abspath(rel).unlink(missing_ok=True)


def _fsync_dir(path: Path) -> None:
    if sys.platform == "win32":
        return
    try:
        fd = os.open(path, os.O_RDONLY)
    except OSError:
        return
    try:
        os.fsync(fd)
    except OSError:
        pass
    finally:
        os.close(fd)
