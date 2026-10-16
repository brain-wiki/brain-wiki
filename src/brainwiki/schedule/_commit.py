"""`brain commit`: snapshot direct edits into git and sync with origin (docs/design/write-path.md §5.1)."""

from __future__ import annotations

import json
import os
import subprocess
import time
from contextlib import ExitStack
from dataclasses import asdict, dataclass, field
from datetime import UTC, datetime
from pathlib import Path
from typing import Any

from brainwiki.config import Brain, Manifest, state_dir
from brainwiki.errors import Busy, UsageError
from brainwiki.runs import brain_lock, is_work_tree

_DEFAULT_SETTLE = 120
_REJECTED = ("[rejected]", "non-fast-forward", "fetch first", "failed to push some refs")


@dataclass
class Change:
    status: str  # A, M, D, or R
    path: str
    old: str | None = None

    @property
    def line(self) -> str:
        return (
            f"R {self.old} -> {self.path}" if self.status == "R" else f"{self.status} {self.path}"
        )


@dataclass
class CommitResult:
    brain: str
    brain_id: str
    outcome: str  # committed, nothing, fetched, pushed, conflict, rejected, offline, busy
    commit: str | None = None
    message: str | None = None
    changes: list[Change] = field(default_factory=list)
    held: list[str] = field(default_factory=list)  # left out by --settle
    upstream: str | None = None
    fetch: bool = False
    push: bool = False
    conflicts: list[str] = field(default_factory=list)
    notes: list[str] = field(default_factory=list)
    warnings: list[str] = field(default_factory=list)
    dry_run: bool = False

    @property
    def exit_code(self) -> int:
        return 1 if self.outcome in ("conflict", "rejected") else 0

    def to_json(self) -> dict[str, Any]:
        data = asdict(self)
        data["changes"] = [c.line for c in self.changes]
        return data


def _git(root: Path, *args: str) -> subprocess.CompletedProcess[str]:
    """git that never prompts: no terminal password prompt, ssh in batch mode, no editor. The
    brain's own lint hook sees BRAIN_WIKI_SNAPSHOT and lets a snapshot through; other hooks run."""
    env = {**os.environ, "GIT_TERMINAL_PROMPT": "0", "GIT_EDITOR": ":", "LC_ALL": "C"}
    env.setdefault("GIT_SSH_COMMAND", "ssh -o BatchMode=yes")
    env["BRAIN_WIKI_SNAPSHOT"] = "1"
    return subprocess.run(
        ["git", "-C", str(root), *args], capture_output=True, text=True, env=env, check=False
    )


def _output(result: subprocess.CompletedProcess[str]) -> str:
    return result.stderr.strip() or result.stdout.strip()


def _status(root: Path) -> list[tuple[str, str, str | None]]:
    """(XY, path, source of a rename) for every change inside `root`, paths relative to it."""
    result = _git(root, "status", "--porcelain=v1", "-z", "--untracked-files=all", "--", ".")
    if result.returncode != 0:
        raise UsageError(f"git status failed: {_output(result)}")
    prefix = _git(root, "rev-parse", "--show-prefix").stdout.strip()
    entries = result.stdout.split("\0")
    out: list[tuple[str, str, str | None]] = []
    i = 0
    while i < len(entries):
        entry = entries[i]
        i += 1
        if len(entry) < 4:
            continue
        xy, path, old = entry[:2], entry[3:], None
        if "R" in xy or "C" in xy:
            old = entries[i].removeprefix(prefix)
            i += 1
        out.append((xy, path.removeprefix(prefix), old))
    return out


def _status_letter(xy: str) -> str:
    if "?" in xy or "A" in xy[0]:
        return "A"
    if "R" in xy:
        return "R"
    return "D" if "D" in xy else "M"


def _select(
    root: Path, entries: list[tuple[str, str, str | None]], settle: int
) -> tuple[list[Change], list[str]]:
    """(changes to commit, files held back because they changed within `settle` seconds)."""
    cutoff = time.time() - settle
    picked: list[Change] = []
    held: list[str] = []
    for xy, path, old in entries:
        target = root / path
        exists = target.exists() or target.is_symlink()
        if exists and settle and os.lstat(target).st_mtime > cutoff:
            held.append(path)
            if old is not None:  # the source of a rename is a deletion, which always counts
                picked.append(Change("D", old))
            continue
        letter = _status_letter(xy) if exists else "D"
        picked.append(Change(letter, path, old if letter == "R" else None))
    return picked, held


def _staged_changes(root: Path, paths: list[str]) -> list[Change]:
    """What the index holds for `paths` against HEAD, with renames detected."""
    diff = _git(root, "diff", "--cached", "--name-status", "-z", "-M", "--relative", "--", *paths)
    fields = diff.stdout.split("\0")
    out: list[Change] = []
    i = 0
    while i < len(fields) and fields[i]:
        status = fields[i][0]
        if status in "RC":
            old, new = fields[i + 1], fields[i + 2]
            out.append(Change("R", new, old) if status == "R" else Change("A", new))
            i += 3
            continue
        out.append(Change(status if status in "ADM" else "M", fields[i + 1]))
        i += 2
    return out


def _topic_of(manifest: Manifest, rel: str) -> str | None:
    """The topic a note belongs to, or None for anything that is not a note in a topic."""
    if not rel.endswith(".md"):
        return None
    declared = [
        (len(t.path), slug) for slug, t in manifest.topics.items() if rel.startswith(t.path + "/")
    ]
    if declared:
        return max(declared)[1]
    base = manifest.layout.topics_dir.rstrip("/") + "/"
    if not rel.startswith(base):
        return None
    folder = rel[len(base) :].rpartition("/")[0]
    return folder or None


def _count(n: int, word: str) -> str:
    return f"{n} {word}{'' if n == 1 else 's'}"


def _commit_message(manifest: Manifest, changes: list[Change], agent: str) -> str:
    topics = [_topic_of(manifest, c.path) for c in changes]
    notes = [t for t in topics if t is not None]
    parts = []
    if notes:
        where = notes[0] if len(set(notes)) == 1 else f"{len(set(notes))} topics"
        parts.append(f"{_count(len(notes), 'note')} in {where}")
    if len(notes) < len(changes):
        parts.append(_count(len(changes) - len(notes), "file"))
    subject = f"brain: snapshot {' and '.join(parts)}"
    body = "\n".join(c.line for c in changes)
    return f"{subject}\n\n{body}\n\nBrain-Agent: {agent}\n"


def _in_progress(root: Path) -> str | None:
    for name, what in (
        ("rebase-merge", "a rebase"),
        ("rebase-apply", "a rebase"),
        ("MERGE_HEAD", "a merge"),
    ):
        path = _git(root, "rev-parse", "--git-path", name).stdout.strip()
        if path and (Path(path) if Path(path).is_absolute() else root / path).exists():
            return what
    return None


def _paths(changes: list[Change]) -> list[str]:
    return list(dict.fromkeys(p for c in changes for p in (c.path, c.old) if p))


def _stage(root: Path, changes: list[Change]) -> list[Change]:
    """Stage exactly these files; return what the index then holds for them."""
    paths = _paths(changes)
    known = set(_git(root, "ls-files", "-z", "--", *paths).stdout.split("\0"))
    # A deletion staged earlier is in neither the tree nor the index: git add would refuse it.
    to_add = [p for p in paths if (root / p).exists() or (root / p).is_symlink() or p in known]
    if to_add:
        added = _git(root, "add", "-A", "--", *to_add)
        if added.returncode != 0:
            raise UsageError(f"git add failed: {_output(added)}")
    return _staged_changes(root, paths)


def _snapshot(root: Path, changes: list[Change], message: str) -> str:
    """Commit exactly these files (other staged files stay staged), never amending."""
    committed = _git(root, "commit", "-q", "-m", message.rstrip("\n"), "--", *_paths(changes))
    if committed.returncode != 0:
        raise UsageError(f"git commit failed: {_output(committed)}")
    return _git(root, "rev-parse", "HEAD").stdout.strip()


def _upstream(top: Path) -> tuple[str, str] | None:
    """(upstream like origin/main, the branch on origin like refs/heads/main), if on origin."""
    upstream = _git(top, "rev-parse", "--abbrev-ref", "--symbolic-full-name", "@{u}")
    branch = _git(top, "symbolic-ref", "--short", "HEAD").stdout.strip()
    if upstream.returncode != 0 or not branch:
        return None
    remote = _git(top, "config", "--get", f"branch.{branch}.remote").stdout.strip()
    merge = _git(top, "config", "--get", f"branch.{branch}.merge").stdout.strip()
    if remote != "origin" or not merge:
        return None
    return upstream.stdout.strip(), merge


def _rebase(top: Path, result: CommitResult) -> bool:
    """Rebase onto the upstream; on a conflict, abort so everything is as before."""
    rebased = _git(top, "rebase", "--autostash", "@{u}")
    text = rebased.stdout + rebased.stderr
    if rebased.returncode == 0:
        if "autostash resulted in conflicts" in text.lower():
            result.warnings.append(
                "warning: files still being edited conflict with origin; they are kept in "
                "`git stash list` and marked in the working tree"
            )
        return True
    unmerged = _git(top, "diff", "--name-only", "--diff-filter=U").stdout.split()
    if _in_progress(top):
        _git(top, "rebase", "--abort")
    result.outcome = "conflict"
    result.conflicts = unmerged
    if not unmerged:
        result.notes.append(_output(rebased) or "git rebase failed")
    return False


def _sync(top: Path, push: bool, result: CommitResult) -> None:
    found = _upstream(top)
    if found is None:
        result.notes.append("Not syncing: the branch does not track a branch on origin.")
        return
    result.upstream, merge = found
    for attempt in (1, 2):
        fetched = _git(top, "fetch", "--quiet", "origin")
        if fetched.returncode != 0:
            result.outcome = "offline"
            result.warnings.append(
                f"warning: could not fetch origin ({_output(fetched)}); "
                + ("the commit is kept locally" if result.commit else "will retry next run")
            )
            return
        result.fetch = True
        if not _rebase(top, result):
            return
        if not push:
            if result.outcome == "nothing":
                result.outcome = "fetched"
            return
        pushed = _git(top, "push", "--quiet", "origin", f"HEAD:{merge}")
        if pushed.returncode == 0:
            result.push = True
            result.outcome = "pushed"
            return
        if not any(marker in pushed.stderr for marker in _REJECTED):
            result.outcome = "offline"
            result.warnings.append(
                f"warning: could not push to origin ({_output(pushed)}); the commit is kept locally"
            )
            return
        if attempt == 2:
            result.outcome = "rejected"
            result.notes.append(f"origin rejected the push twice: {_output(pushed)}")


def _record_path(brain_id: str) -> Path:
    return state_dir() / "schedule" / f"{brain_id}.json"


def last_run(brain_id: str) -> dict[str, Any] | None:
    try:
        return json.loads(_record_path(brain_id).read_text(encoding="utf-8"))
    except (OSError, ValueError):
        return None


def _record(result: CommitResult) -> None:
    path = _record_path(result.brain_id)
    path.parent.mkdir(parents=True, exist_ok=True)
    now = datetime.now(UTC).isoformat(timespec="seconds")
    previous = last_run(result.brain_id) or {}
    synced = result.fetch and result.outcome not in ("conflict", "rejected", "offline")
    data = {
        "brain_id": result.brain_id,
        "brain": result.brain,
        "time": now,
        "outcome": result.outcome,
        "commit": result.commit,
        "conflicts": result.conflicts,
        "synced": now if synced else previous.get("synced"),
    }
    tmp = path.with_suffix(".tmp")
    tmp.write_text(json.dumps(data, indent=2) + "\n", encoding="utf-8")
    tmp.replace(path)


def commit_brain(
    brain: Brain,
    *,
    agent: str = "schedule",
    settle: int = _DEFAULT_SETTLE,
    fetch: bool = True,
    push: bool = False,
    dry_run: bool = False,
) -> CommitResult:
    root = brain.root
    if not is_work_tree(root):
        raise UsageError(
            f"brain {brain.display_name!r} is not a git work tree; run `git init` in {root} "
            "(and commit its files) to keep its history"
        )
    result = CommitResult(brain.display_name, brain.id, "nothing", dry_run=dry_run)
    with ExitStack() as stack:
        if not dry_run:
            try:
                stack.enter_context(brain_lock(brain.key, timeout=0))
            except Busy:
                result.outcome = "busy"
                result.notes.append("another brain-wiki process is writing; skipped this round")
                _record(result)
                return result
        top = Path(_git(root, "rev-parse", "--show-toplevel").stdout.strip() or root)
        busy_with = _in_progress(top)
        if busy_with:
            result.outcome = "conflict"
            result.notes.append(
                f"git is in the middle of {busy_with}; finish or abort it in {top} first"
            )
            if not dry_run:
                _record(result)
            return result
        changes, result.held = _select(root, _status(root), settle)
        if dry_run:
            result.changes = changes
            if changes:
                result.message = _commit_message(brain.manifest, changes, agent)
            found = _upstream(top) if fetch else None
            result.upstream = found[0] if found else None
            result.fetch, result.push = found is not None, found is not None and push
            if fetch and found is None:
                result.notes.append("Not syncing: the branch does not track a branch on origin.")
            return result
        if changes:
            result.changes = _stage(root, changes)
        if result.changes:
            result.message = _commit_message(brain.manifest, result.changes, agent)
            result.commit = _snapshot(root, result.changes, result.message)
            result.outcome = "committed"
        if fetch:
            _sync(top, push, result)
        _record(result)
    return result
