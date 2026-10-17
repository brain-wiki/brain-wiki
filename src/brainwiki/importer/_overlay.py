"""Overlay import: an existing folder becomes a brain without moving notes (import.md §3)."""

from __future__ import annotations

import hashlib
from collections.abc import Callable, Mapping
from pathlib import Path
from typing import TYPE_CHECKING, Any

from brainwiki import FORMAT_VERSION
from brainwiki.config import MANIFEST, parse_manifest
from brainwiki.errors import Conflict, UsageError
from brainwiki.format import RULES_HEADER, replace_block
from brainwiki.ids import is_ulid, new_ulid
from brainwiki.importer._normalize import identity_and_status
from brainwiki.importer._survey import Survey, survey
from brainwiki.runs import Run, RunRecord, is_work_tree, run_git

if TYPE_CHECKING:
    from brainwiki.engine import Engine

_INBOX = "inbox"
_CROCKFORD = "0123456789ABCDEFGHJKMNPQRSTVWXYZ"


def _toml_string(value: str) -> str:
    return '"' + value.replace("\\", "\\\\").replace('"', '\\"') + '"'


def _manifest_text(found: Survey, name: str) -> str:
    lines = [
        "# brain.toml: written by `brain import --overlay`. Edit freely; notes were not moved.",
        f"format = {FORMAT_VERSION}",
        f'id = "{new_ulid()}"',
        f"name = {_toml_string(name)}",
        "",
        "[layout]",
        'topics_dir = "."',
        f"topic_page = {_toml_string(found.topic_page)}",
        "ignore = [" + ", ".join(_toml_string(i) for i in found.ignore) + "]",
        "",
        "[lint]",
        'profile = "migrate"',
        "",
        "[agents.default]",
        'write = ["edit"]',
    ]
    for slug, folder in found.topics.items():
        lines += ["", f"[topics.{slug}]", f"path = {_toml_string(folder)}"]
    text = "\n".join(lines) + "\n"
    parse_manifest(text)  # the generated manifest must always be valid
    return text


def _tally(counts: Mapping[str, int]) -> str:
    """`{'related': 2, 'up': 1}` as `related (2), up (1)`, most frequent first."""
    ranked = sorted(counts.items(), key=lambda item: (-item[1], item[0]))
    return ", ".join(f"{key} ({n})" for key, n in ranked) or "none"


def report(found: Survey, name: str) -> str:
    counts = found.counts
    lines = [
        f"# Import plan: {found.root}",
        "",
        f"- Notes: {counts['notes']} ({counts['with_frontmatter']} with frontmatter, {counts['with_id']} with ids)",
        f"- Obsidian vault: {'yes' if found.obsidian else 'no'}; topic pages: {found.topic_page}",
        f"- Topics ({len(found.topics)}): "
        + ", ".join(f"{s} ← {f}/" for s, f in found.topics.items()),
        f"- Ignored folders: {', '.join(found.ignore) or 'none'}",
        f"- Non-standard status values: {_tally(found.statuses)}",
        f"- Unresolved links: {sum(found.unresolved.values())}"
        + (
            f" (top: {', '.join(t for t, _ in found.unresolved.most_common(5))})"
            if found.unresolved
            else ""
        ),
        f"- Conflict copies (left alone): {len(found.conflicts)}",
        f"- Files that fail to parse (never modified): {len(found.unparsable)}",
        "",
        "## Phases",
        "",
        "- 0 · Adopt: adds brain.toml, AGENTS.md (managed block), rules.md, log.md, inbox/, archive/, reports/. "
        "Touches no existing note.",
        f"- 1 · Identity and status: mints ids for {counts['notes'] - counts['with_id']} notes; "
        f"maps {sum(found.statuses.values())} status values into status + stage.",
        "- 2 · Structure: creates missing topic pages and lists notes in them.",
        "",
        "Run each phase separately: `brain import PATH --overlay --apply [--phase N]`.",
        "",
        "## brain.toml that phase 0 writes",
        "",
        "```toml",
        _manifest_text(found, name).rstrip(),
        "```",
    ]
    return "\n".join(lines) + "\n"


def _check_clean_git(root: Path) -> None:
    if is_work_tree(root):
        status = run_git(root, "status", "--porcelain").stdout.strip()
        if status:
            raise Conflict(
                "the folder has uncommitted git changes; commit or stash them first so import diffs stay clean"
            )


def already_brain(root: Path) -> str | None:
    """Why phase 0 cannot adopt `root`: it already holds a brain. Names its registration, or
    the command that registers it."""
    from brainwiki.config import load_user_config

    root = root.expanduser().resolve()
    if not (root / MANIFEST).exists():
        return None
    names = [n for n, p in load_user_config().brains.items() if p.expanduser().resolve() == root]
    if names:
        return (
            f"{root} is already a brain, registered as {names[0]!r}; for phases 1-2 run "
            f"`brain import {root} --overlay --phase N`"
        )
    return f"{root} is already a brain but not registered; use `brain brains add NAME {root}`"


def adopt(root: Path, *, name: str | None = None, register: bool = True) -> dict[str, Any]:
    """Phase 0: add brain-wiki's own files; no existing note is touched."""
    from brainwiki.config import open_brain, register_brain, registration_conflict
    from brainwiki.engine import Engine
    from brainwiki.index import agents_block
    from brainwiki.lifecycle import LOG_HEADER, commit_files, default_agents_block

    root = root.expanduser().resolve()
    if problem := already_brain(root):
        raise Conflict(problem)
    if not root.is_dir():
        raise UsageError(f"{root} is not a folder")
    _check_clean_git(root)
    found = survey(root)
    name = name or root.name
    if register and (problem := registration_conflict(name, root)):
        raise Conflict(problem)
    created = []
    manifest_text = _manifest_text(found, name)
    (root / MANIFEST).write_text(manifest_text, encoding="utf-8")
    created.append(MANIFEST)
    agents = root / "AGENTS.md"
    current = agents.read_text(encoding="utf-8") if agents.exists() else ""
    edit = parse_manifest(manifest_text).profile("default").can("edit")
    agents.write_text(
        replace_block(current, default_agents_block(name, edit=edit)), encoding="utf-8"
    )
    created.append("AGENTS.md")
    for filename, content in (("rules.md", RULES_HEADER), ("log.md", LOG_HEADER)):
        if not (root / filename).exists():
            (root / filename).write_text(content, encoding="utf-8")
            created.append(filename)
    for sub in (f"{_INBOX}/episodes", f"{_INBOX}/agents", "archive/episodes", "reports"):
        (root / sub).mkdir(parents=True, exist_ok=True)
    (root / "reports" / "import-plan.md").write_text(report(found, name), encoding="utf-8")
    created.append("reports/import-plan.md")
    with Engine(open_brain(root, name)) as engine:  # the topic table the folder already has
        engine.scan(force=True)
        agents.write_text(
            replace_block(agents.read_text(encoding="utf-8"), agents_block(engine)),
            encoding="utf-8",
        )
    git = None
    if is_work_tree(root):
        problem = commit_files(root, created, f"Adopt {root.name} as brain-wiki brain {name}")
        git = problem or "committed"
    if register:
        register_brain(name, root)
    return {
        "brain": name,
        "root": str(root),
        "created": created,
        "git": git,
        "survey": found.to_json(),
    }


def _stable_id(brain_id: str, path: str, text: str) -> Callable[[], str]:
    """Phase 2 ids derive from the brain, the path, and the text, so the dry run shows the ids
    the apply writes. The time part is the brain's own (adoption time) when its id is a ULID."""
    if not is_ulid(brain_id):
        return new_ulid
    digest = hashlib.sha256(f"{brain_id}\n{path}\n{text}".encode()).digest()
    # A ULID is 26 Crockford base32 digits: 10 of milliseconds, 16 of randomness (80 bits).
    random = int.from_bytes(digest[:10], "big")
    tail = "".join(_CROCKFORD[(random >> (5 * i)) & 31] for i in reversed(range(16)))
    return lambda: brain_id[:10] + tail


def apply_phase(
    engine: Engine, phase: int, *, dry_run: bool = False
) -> tuple[RunRecord | None, str]:
    """Phases 1 and 2, each one undoable run. Returns (record, diff)."""
    from brainwiki.lint import lint
    from brainwiki.lint import plan as plan_fixes

    if phase not in (1, 2):
        raise UsageError("--phase must be 1 or 2 (phase 0 is the adopt step)")
    if not dry_run:
        _check_clean_git(engine.brain.root)
    engine.scan(force=True)
    if phase == 2:
        result = lint(engine, select=["BW404", "BW405"], fixes=True)
        run, _ = plan_fixes(engine, result, include_info=True)
        run.kind, run.summary = "import", "import phase 2: topic pages"
    else:
        run = Run(engine, "import", summary="import phase 1: ids and status")
        rows = engine.db.execute(
            "SELECT f.path FROM files f JOIN nodes n ON n.id = f.node_id WHERE n.kind IN ('note', 'topic') AND f.parse_errors = 0"
        ).fetchall()
        for row in rows:
            text = run.read(row["path"])
            if text is None:
                continue
            new = identity_and_status(text, mint=_stable_id(engine.manifest.id, row["path"], text))
            if new != text:
                run.write(row["path"], new)
    if not run.entries:
        return None, ""
    if dry_run:
        return None, run.diff()
    return run.commit(log_lines=[f"- {len(run.entries)} files changed"]), ""
