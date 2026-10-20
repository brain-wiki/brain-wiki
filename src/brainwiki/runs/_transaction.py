"""A run: stage changes in memory, then verify, gate, record, apply, index, log, and commit.

Every curated change (consolidation, review accept, rule change, `lint --fix`, import apply,
`mv`, undo) goes through `Run.commit()`, so all of them get the same guarantees: base hashes are
checked under the brain's write lock, pre-images are kept for undo, and a git commit holds
exactly the touched files (write-path.md §7.3).
"""

from __future__ import annotations

import difflib
from collections.abc import Callable
from dataclasses import dataclass
from typing import TYPE_CHECKING, Any

from brainwiki.errors import Conflict, InvalidOps, NotFound, Stale
from brainwiki.ids import run_id as new_run_id
from brainwiki.runs import _git as git
from brainwiki.runs._lock import brain_lock
from brainwiki.runs._record import (
    FileChange,
    RunRecord,
    load_preimage,
    now_iso,
    prune,
    save_preimage,
    save_record,
)
from brainwiki.store import sha256_bytes

if TYPE_CHECKING:
    from brainwiki.engine import Engine

_LOG_FILE = "log.md"
_MAX_LOG_FILE_LINES = 20


@dataclass
class _Entry:
    path: str
    base: bytes | None  # content when first staged; None when the file did not exist
    data: bytes | None = None  # new content; None means unchanged
    deleted: bool = False
    moved_to: str | None = None
    append_only: bool = False
    # A change already made on disk (a checked agent edit): `base` is the last recorded version,
    # `observed` what the file held when the run read it.
    adopted: bool = False
    observed: bytes | None = None

    @property
    def base_sha(self) -> str | None:
        return sha256_bytes(self.base) if self.base is not None else None

    @property
    def observed_sha(self) -> str | None:
        return sha256_bytes(self.observed) if self.observed is not None else None

    @property
    def final(self) -> bytes | None:
        if self.deleted:
            return None
        return self.data if self.data is not None else self.base

    @property
    def final_path(self) -> str:
        return self.moved_to or self.path

    @property
    def changed(self) -> bool:
        return (
            self.deleted
            or self.moved_to is not None
            or (self.data is not None and self.data != self.base)
        )


def _encode(content: str | bytes) -> bytes:
    return content.encode("utf-8") if isinstance(content, str) else content


Check = Callable[["Run"], list[Any]]


class Run:
    def __init__(
        self,
        engine: Engine,
        kind: str,
        *,
        agent: str | None = None,
        backend: str | None = None,
        model: str | None = None,
        summary: str = "",
        ops: list[Any] | None = None,
        packet_sha256: str | None = None,
        undoes: str | None = None,
        run_id: str | None = None,
    ):
        self.engine = engine
        self.store = engine.store
        self.kind = kind
        self.id = run_id or new_run_id()
        self.agent = agent or (engine.host if engine.host not in (None, "owner") else None)
        self.backend = backend
        self.model = model
        self.summary = summary
        self.ops = ops or []
        self.packet_sha256 = packet_sha256
        self.undoes = undoes
        self.warnings: list[str] = []
        self.declared = False  # whether commit raised brain.toml's format
        self._entries: dict[str, _Entry] = {}

    # -- staging ---------------------------------------------------------
    def _lookup(self, rel: str) -> _Entry | None:
        for entry in self._entries.values():
            if entry.moved_to == rel:
                return entry
        entry = self._entries.get(rel)
        if entry is not None and entry.moved_to is None:
            return entry
        return None

    def _ensure(self, rel: str) -> _Entry:
        entry = self._lookup(rel)
        if entry is not None:
            return entry
        if rel in self._entries:  # moved away earlier in this run; the old path is free again
            raise Conflict(f"{rel} was moved earlier in this run")
        path = self.store.abspath(rel)
        entry = _Entry(rel, path.read_bytes() if path.is_file() else None)
        self._entries[rel] = entry
        return entry

    def read_bytes(self, rel: str) -> bytes | None:
        return self._ensure(rel).final

    def read(self, rel: str) -> str | None:
        data = self.read_bytes(rel)
        return data.decode("utf-8") if data is not None else None

    def exists(self, rel: str) -> bool:
        entry = self._lookup(rel)
        if entry is not None:
            return entry.final is not None
        if rel in self._entries:
            return False
        return self.store.abspath(rel).is_file()

    def write(self, rel: str, content: str | bytes) -> None:
        entry = self._ensure(rel)
        entry.data = _encode(content)
        entry.deleted = False

    def create(self, rel: str, content: str | bytes) -> None:
        if self.exists(rel):
            raise Conflict(f"{rel} already exists")
        self.write(rel, content)

    def adopt(self, rel: str, base: bytes | None, final: bytes | None) -> None:
        """Record a change already on disk, with `base` (the last recorded version) as its
        pre-image. `final` is what the file should hold: what is on disk, plus any stamps."""
        if rel in self._entries:
            raise Conflict(f"{rel} is already staged in this run")
        path = self.store.abspath(rel)
        observed = path.read_bytes() if path.is_file() else None
        self._entries[rel] = _Entry(
            rel, base, data=final, deleted=final is None, adopted=True, observed=observed
        )

    def delete(self, rel: str) -> None:
        entry = self._ensure(rel)
        if entry.final is None:
            raise NotFound(f"{rel} does not exist")
        entry.deleted = True

    def move(self, src: str, dst: str) -> None:
        if src == dst:
            return
        entry = self._ensure(src)
        if entry.final is None:
            raise NotFound(f"{src} does not exist")
        if self.exists(dst):
            raise Conflict(f"{dst} already exists")
        if entry.moved_to is not None:  # moving again: keep the original source
            entry.moved_to = dst if dst != entry.path else None
        else:
            entry.moved_to = dst

    # -- inspection ------------------------------------------------------
    @property
    def entries(self) -> list[_Entry]:
        return [e for e in self._entries.values() if e.changed]

    def touched_paths(self) -> list[str]:
        paths: list[str] = []
        for entry in self.entries:
            paths.append(entry.path)
            if entry.moved_to:
                paths.append(entry.moved_to)
        return list(dict.fromkeys(paths))

    def text_changes(self) -> list[tuple[str, str | None, str | None]]:
        """(final path, before text, after text) for every changed Markdown file."""
        out = []
        for entry in self.entries:
            if not entry.final_path.lower().endswith(".md") or entry.append_only:
                continue
            before = entry.base.decode("utf-8", "replace") if entry.base is not None else None
            after = entry.final.decode("utf-8", "replace") if entry.final is not None else None
            out.append((entry.final_path, before, after))
        return out

    def diff(self) -> str:
        chunks: list[str] = []
        for entry in self.entries:
            if entry.moved_to:
                chunks.append(f"rename {entry.path} -> {entry.moved_to}\n")
            if entry.data is None and not entry.deleted:
                continue
            before = entry.base.decode("utf-8", "replace") if entry.base is not None else ""
            after = entry.final.decode("utf-8", "replace") if entry.final is not None else ""
            chunks.extend(
                difflib.unified_diff(
                    before.splitlines(keepends=True),
                    after.splitlines(keepends=True),
                    fromfile=f"a/{entry.path}" if entry.base is not None else "/dev/null",
                    tofile=f"b/{entry.final_path}" if entry.final is not None else "/dev/null",
                )
            )
        return "".join(chunks)

    # -- commit ----------------------------------------------------------
    def _log_entry(self, lines: list[str] | None) -> str:
        header = f"## {now_iso()} · {self.kind} · {self.id}"
        body = []
        who = self.agent or "owner"
        body.append(f"- agent: {who}" + (f" (backend: {self.backend})" if self.backend else ""))
        if self.summary:
            body.append(f"- {self.summary}")
        if lines:
            body.extend(lines)
        else:
            entries = self.entries
            for entry in entries[:_MAX_LOG_FILE_LINES]:
                if entry.deleted:
                    body.append(f"- {entry.path}: deleted")
                elif entry.base is None:
                    body.append(f"- {entry.final_path}: created")
                elif entry.moved_to:
                    body.append(f"- {entry.path} → {entry.moved_to}")
                else:
                    body.append(f"- {entry.path}: changed")
            if len(entries) > _MAX_LOG_FILE_LINES:
                body.append(f"- … {len(entries) - _MAX_LOG_FILE_LINES} more files")
        return "\n".join([header, *body]) + "\n"

    def _stage_log(self, lines: list[str] | None) -> None:
        from brainwiki.lifecycle import LOG_HEADER

        entry = self._ensure(_LOG_FILE)
        current = (entry.final or LOG_HEADER.encode("utf-8")).decode("utf-8")
        if current and not current.endswith("\n"):
            current += "\n"
        entry.data = (current + "\n" + self._log_entry(lines)).encode("utf-8")
        entry.append_only = True

    def commit(
        self,
        *,
        check: Check | None = None,
        log_lines: list[str] | None = None,
        log: bool = True,
        use_git: bool = True,
        subject: str | None = None,
    ) -> RunRecord:
        if not self.entries:
            raise InvalidOps("nothing to change")
        key = self.engine.brain.key
        with brain_lock(key):
            self._verify()
            if check is not None:
                problems = check(self)
                if problems:
                    raise InvalidOps(
                        "the change would introduce lint errors: "
                        + "; ".join(str(p) for p in problems[:5]),
                        details=problems,
                    )
            if log:
                self._stage_log(log_lines)
            record = self._record()
            for entry in self.entries:
                if entry.base is not None:
                    save_preimage(key, self.id, entry.base, entry.base_sha or "")
                if entry.adopted and entry.observed is not None:
                    save_preimage(key, self.id, entry.observed, entry.observed_sha or "")
            save_record(key, record)
            try:
                self._apply()
            except BaseException as exc:
                rollback(self.engine, record)
                record.status = "failed"
                record.error = str(exc)
                record.finished = now_iso()
                save_record(key, record)
                raise
            self.declared = self._declare_format()
            self.engine.scan(paths=self.touched_paths(), sanctioned=True)
            record.status = "applied"
            record.finished = now_iso()
            save_record(key, record)
            if use_git:
                self._git_commit(record, subject)
                save_record(key, record)
        prune(key)
        return record

    def _declare_format(self) -> bool:
        from brainwiki.lifecycle import declare_format

        writes = any(
            e.final_path.endswith(".md") and e.final_path != _LOG_FILE and e.final is not None
            for e in self.entries
        )
        return writes and declare_format(self.engine)

    def _verify(self) -> None:
        for entry in self.entries:
            path = self.store.abspath(entry.path)
            current = sha256_bytes(path.read_bytes()) if path.is_file() else None
            if current != (entry.observed_sha if entry.adopted else entry.base_sha):
                raise Stale(f"{entry.path} changed since this run read it; re-run")
            if entry.moved_to and self.store.abspath(entry.moved_to).exists():
                raise Conflict(f"{entry.moved_to} already exists")

    def _record(self) -> RunRecord:
        files = []
        for entry in self.entries:
            final = entry.final
            files.append(
                FileChange(
                    path=entry.path,
                    before=entry.base_sha,
                    after=sha256_bytes(final) if final is not None else None,
                    moved_to=entry.moved_to,
                    append_only=entry.append_only,
                    observed=entry.observed_sha if entry.adopted else None,
                    adopted=entry.adopted,
                )
            )
        return RunRecord(
            run=self.id,
            kind=self.kind,
            brain=self.engine.manifest.id,
            started=now_iso(),
            agent=self.agent,
            backend=self.backend,
            model=self.model,
            summary=self.summary,
            packet_sha256=self.packet_sha256,
            ops=self.ops,
            warnings=self.warnings,
            files=files,
            undoes=self.undoes,
        )

    def _apply(self) -> None:
        for entry in self.entries:
            if entry.adopted:
                if entry.final is None:
                    if self.store.exists(entry.path):
                        self.store.delete(entry.path)
                elif entry.final != entry.observed:
                    self.store.write_bytes(entry.path, entry.final, expect_sha=entry.observed_sha)
                continue
            if entry.deleted:
                self.store.delete(entry.path)
                continue
            if entry.data is not None and entry.data != entry.base:
                self.store.write_bytes(entry.path, entry.data, expect_sha=entry.base_sha)
            if entry.moved_to:
                self.store.move(entry.path, entry.moved_to)

    def _git_commit(self, record: RunRecord, subject: str | None) -> None:
        root = self.engine.brain.root
        mode = self.engine.manifest.git.mode
        # `auto` commits only a brain that is its own repository; inside another repository
        # (a samples or dotfiles repo) only `on` commits, so a run never lands in a repo that
        # did not ask for it.
        if mode == "auto" and not git.is_repo_root(root):
            return
        if mode not in ("auto", "on") or not git.is_work_tree(root):
            return
        sha, error = git.commit_paths(
            root,
            self.touched_paths() + (["brain.toml"] if self.declared else []),
            subject or f"brain: {self.summary or self.kind}",
            {"Brain-Run": self.id, "Brain-Agent": self.agent or "owner"},
        )
        record.git_commit, record.git_error = sha, error


def rollback(engine: Engine, record: RunRecord) -> tuple[list[str], list[str]]:
    """Put back files a run changed, where they still hold the run's output.

    Used after a failed apply and for crash recovery. Returns (restored, left alone).
    """
    restored, conflicts = [], []
    store = engine.store
    for change in reversed(record.files):
        final = change.final_path
        current = store.sha(final)
        if change.adopted:  # put back what the agent left on disk, never the older version
            if current == change.after and current != change.observed:
                if change.observed is None:
                    store.delete(final)
                else:
                    store.write_bytes(
                        final, load_preimage(engine.brain.key, record.run, change.observed)
                    )
                restored.append(final)
            continue
        if current != change.after:
            at_source = store.sha(change.path)
            if at_source == change.before and (not change.moved_to or current is None):
                continue  # never applied
            conflicts.append(final)
            continue
        if change.before is None:
            store.delete(final)
        elif change.moved_to and change.before == change.after:
            store.move(final, change.path)
        else:
            data = load_preimage(engine.brain.key, record.run, change.before)
            store.write_bytes(change.path, data)
            if change.moved_to:
                store.delete(final)
        restored.append(change.path)
    engine.scan(
        paths=list(
            dict.fromkeys([c.path for c in record.files] + [c.final_path for c in record.files])
        ),
        sanctioned=True,
    )
    return restored, conflicts
