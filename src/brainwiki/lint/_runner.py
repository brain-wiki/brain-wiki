"""Run lint over a brain: file rules (cached by content hash) plus cross-file rules from the index."""

from __future__ import annotations

import hashlib
import json
import time
from fnmatch import fnmatch
from typing import TYPE_CHECKING

from brainwiki.lint._catalog import severity
from brainwiki.lint._cross import cross_checks
from brainwiki.lint._files import LINT_VERSION, FileContext, check_file
from brainwiki.lint._model import LintResult, Problem

if TYPE_CHECKING:
    from brainwiki.engine import Engine

_CHECKED_KINDS = (
    "note",
    "hub",
    "episode",
    "archived_episode",
    "agent_file",
    "rules",
    "agents_md",
    "proposal",
    "log",
)


def _cache_prefix(engine: Engine) -> str:
    budgets = json.dumps(vars(engine.manifest.budgets), sort_keys=True)
    return f"{LINT_VERSION}:{hashlib.sha256(budgets.encode()).hexdigest()[:8]}:"


def _in_scope(path: str, scope: list[str] | None) -> bool:
    if scope is None:
        return True
    for item in scope:
        item = item.rstrip("/")
        if item in ("", ".") or path == item or path.startswith(item + "/"):
            return True
    return False


def _match(code: str, patterns: list[str] | None) -> bool:
    return bool(patterns) and any(code.startswith(p.strip().upper()) for p in patterns or [] if p)


def lint(
    engine: Engine,
    *,
    paths: list[str] | None = None,
    profile: str | None = None,
    select: list[str] | None = None,
    ignore: list[str] | None = None,
    fixes: bool = False,
    staged: dict[str, bytes] | None = None,
) -> LintResult:
    """Lint the brain, or only `paths`. `staged` maps paths to the bytes git would commit."""
    started = time.monotonic()
    engine.scan(force=True)
    conn = engine.db
    ctx = FileContext.for_engine(engine)
    manifest = engine.manifest
    scope = list(staged) if staged is not None else paths

    def profile_for(path: str) -> str:
        for pattern, value in manifest.lint.overrides.items():
            if fnmatch(path, pattern):
                return value
        return profile or manifest.lint.profile

    problems: list[Problem] = []
    prefix = _cache_prefix(engine)
    cache = {
        row["path"]: (row["sha256"], row["problems"])
        for row in conn.execute("SELECT path, sha256, problems FROM lint_cache")
    }
    updates: list[tuple[str, str, str]] = []
    checked = 0
    rows = conn.execute(
        """SELECT f.path, f.kind, f.sha256, n.kind AS node_kind
           FROM files f LEFT JOIN nodes n ON n.id = f.node_id ORDER BY f.path"""
    ).fetchall()
    kinds = {row["path"]: row["node_kind"] or row["kind"] for row in rows}
    if staged is not None:
        from brainwiki.index import classify

        for path, data in staged.items():
            kind = kinds.get(path) or classify(engine, path, ctx.topics)
            if kind not in _CHECKED_KINDS or profile_for(path) == "off":
                continue
            checked += 1
            problems += check_file(ctx, path, kind, data, fixes=False)
    else:
        for row in rows:
            path = row["path"]
            kind = kinds[path]
            if kind not in _CHECKED_KINDS or not _in_scope(path, scope):
                continue
            if profile_for(path) == "off":
                continue
            checked += 1
            key = prefix + row["sha256"]
            hit = cache.get(path)
            if hit and hit[0] == key and not fixes:
                problems += [Problem(**p) for p in json.loads(hit[1])]
                continue
            try:
                data = engine.store.read_bytes(path)
            except OSError:
                continue
            found = check_file(ctx, path, kind, data, fixes=fixes)
            problems += found
            stored = [
                {
                    "code": p.code,
                    "path": p.path,
                    "line": p.line,
                    "message": p.message,
                    "fixable": p.fixable,
                }
                for p in found
            ]
            updates.append((path, key, json.dumps(stored)))
    if updates:
        conn.execute("BEGIN IMMEDIATE")
        conn.executemany(
            "INSERT OR REPLACE INTO lint_cache(path, sha256, problems) VALUES (?, ?, ?)", updates
        )
        conn.execute("COMMIT")
    problems += [p for p in cross_checks(engine, ctx, fixes=fixes) if _in_scope(p.path, scope)]

    kept: list[Problem] = []
    for problem in problems:
        if _match(problem.code, ignore) or (select and not _match(problem.code, select)):
            continue
        problem.severity = severity(problem.code, profile_for(problem.path))
        if problem.severity == "off":
            continue
        kept.append(problem)
    kept.sort(key=lambda p: (p.path, p.line or 0, p.code))
    return LintResult(
        kept, files_checked=checked, seconds=time.monotonic() - started, fix_info=bool(select)
    )
