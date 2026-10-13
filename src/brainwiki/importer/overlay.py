"""Overlay import: an existing folder becomes a brain without moving notes (design doc 09 §3)."""

from __future__ import annotations

from pathlib import Path
from typing import TYPE_CHECKING, Any

from brainwiki import FORMAT_VERSION
from brainwiki.config.manifest import MANIFEST, parse_manifest
from brainwiki.errors import Conflict, UsageError
from brainwiki.format.agents_md import replace_block
from brainwiki.format.rules import RULES_HEADER
from brainwiki.ids import new_ulid
from brainwiki.importer.normalize import convert_relations, identity_and_status
from brainwiki.importer.survey import Survey, survey
from brainwiki.runs import Run, RunRecord
from brainwiki.runs.git import is_work_tree, run_git

if TYPE_CHECKING:
    from brainwiki.engine import Engine

INBOX = "inbox"


def _toml_string(value: str) -> str:
    return '"' + value.replace("\\", "\\\\").replace('"', '\\"') + '"'


def manifest_text(found: Survey, name: str) -> str:
    lines = [
        "# brain.toml: written by `brain import --overlay`. Edit freely; notes were not moved.",
        f"format = {FORMAT_VERSION}",
        f'id = "{new_ulid()}"',
        f"name = {_toml_string(name)}",
        "",
        "[layout]",
        'topics_dir = "."',
        f"hub_filename = {_toml_string(found.hub_filename)}",
        "ignore = [" + ", ".join(_toml_string(i) for i in found.ignore) + "]",
        "",
        "[lint]",
        'profile = "migrate"',
        "",
        "[agents.default]",
        'write = ["episodes"]',
    ]
    for slug, folder in found.topics.items():
        lines += ["", f"[topics.{slug}]", f"path = {_toml_string(folder)}"]
    text = "\n".join(lines) + "\n"
    parse_manifest(text)  # the generated manifest must always be valid
    return text


def report(found: Survey, name: str) -> str:
    counts = found.counts
    lines = [
        f"# Import plan: {found.root}",
        "",
        f"- Notes: {counts['notes']} ({counts['with_frontmatter']} with frontmatter, {counts['with_id']} with ids)",
        f"- Obsidian vault: {'yes' if found.obsidian else 'no'}; hub style: {found.hub_filename}",
        f"- Topics ({len(found.topics)}): "
        + ", ".join(f"{s} ← {f}/" for s, f in found.topics.items()),
        f"- Ignored folders: {', '.join(found.ignore) or 'none'}",
        f"- Non-standard status values: {dict(found.statuses) or 'none'}",
        f"- Relation-like properties: {dict(found.relation_props) or 'none'}",
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
        f"- 1 · Relations: converts {sum(found.relation_props.values())} relation-like properties into bw- relation fields.",
        f"- 2 · Identity and status: mints ids for {counts['notes'] - counts['with_id']} notes; "
        f"maps {sum(found.statuses.values())} status values into status + stage.",
        "- 3 · Structure: creates missing hubs and lists notes in them.",
        "",
        "Run each phase separately: `brain import PATH --overlay --apply [--phase N]`.",
        "",
        "## brain.toml that phase 0 writes",
        "",
        "```toml",
        manifest_text(found, name).rstrip(),
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


def adopt(root: Path, *, name: str | None = None, register: bool = True) -> dict[str, Any]:
    """Phase 0: add brain-wiki's own files; no existing note is touched."""
    from brainwiki.config.user import register_brain
    from brainwiki.lifecycle import LOG_HEADER, default_agents_block

    root = root.expanduser().resolve()
    if (root / MANIFEST).exists():
        raise Conflict(f"{root} is already a brain; use `brain brains add NAME {root}`")
    if not root.is_dir():
        raise UsageError(f"{root} is not a folder")
    _check_clean_git(root)
    found = survey(root)
    name = name or root.name
    created = []
    (root / MANIFEST).write_text(manifest_text(found, name), encoding="utf-8")
    created.append(MANIFEST)
    agents = root / "AGENTS.md"
    current = agents.read_text(encoding="utf-8") if agents.exists() else ""
    agents.write_text(replace_block(current, default_agents_block(name)), encoding="utf-8")
    created.append("AGENTS.md")
    for filename, content in (("rules.md", RULES_HEADER), ("log.md", LOG_HEADER)):
        if not (root / filename).exists():
            (root / filename).write_text(content, encoding="utf-8")
            created.append(filename)
    for sub in (f"{INBOX}/episodes", f"{INBOX}/agents", "archive/episodes", "reports"):
        (root / sub).mkdir(parents=True, exist_ok=True)
    (root / "reports" / "import-plan.md").write_text(report(found, name), encoding="utf-8")
    if register:
        register_brain(name, root)
    return {"brain": name, "root": str(root), "created": created, "survey": found.to_json()}


def apply_phase(
    engine: Engine, phase: int, *, drop_converted: bool = False, dry_run: bool = False
) -> tuple[RunRecord | None, str]:
    """Phases 1–3, each one undoable run. Returns (record, diff)."""
    from brainwiki.lint.fixes import plan as plan_fixes
    from brainwiki.lint.runner import lint

    if phase not in (1, 2, 3):
        raise UsageError("--phase must be 1, 2, or 3 (phase 0 is the adopt step)")
    if not dry_run:
        _check_clean_git(engine.brain.root)
    engine.scan(force=True)
    if phase == 3:
        result = lint(engine, select=["BW404", "BW405"], fixes=True)
        run, _ = plan_fixes(engine, result, include_info=True)
        run.kind, run.summary = "import", "import phase 3: hubs"
    else:
        run = Run(
            engine,
            "import",
            summary=f"import phase {phase}: {'relations' if phase == 1 else 'ids and status'}",
        )
        transform = (
            (lambda t: convert_relations(t, drop=drop_converted))
            if phase == 1
            else identity_and_status
        )
        rows = engine.db.execute(
            "SELECT f.path FROM files f JOIN nodes n ON n.id = f.node_id WHERE n.kind IN ('note', 'hub') AND f.parse_errors = 0"
        ).fetchall()
        for row in rows:
            text = run.read(row["path"])
            if text is None:
                continue
            new = transform(text)
            if new != text:
                run.write(row["path"], new)
    if not run.entries:
        return None, ""
    if dry_run:
        return None, run.diff()
    return run.commit(log_lines=[f"- {len(run.entries)} files changed"]), ""
