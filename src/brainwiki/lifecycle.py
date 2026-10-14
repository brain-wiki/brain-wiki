"""Creating brains and the files `brain init` writes."""

from __future__ import annotations

import re
from pathlib import Path
from typing import TYPE_CHECKING

from brainwiki import FORMAT_VERSION
from brainwiki.config.manifest import MANIFEST, parse_manifest
from brainwiki.errors import Conflict, UsageError
from brainwiki.format.agents_md import replace_block
from brainwiki.format.rules import RULES_HEADER
from brainwiki.ids import new_ulid

if TYPE_CHECKING:
    from brainwiki.engine import Engine

_BRAIN_TOML_TEMPLATE = """\
# brain.toml: this directory is a brain-wiki brain. Settings here travel with the brain.
# Machine-specific choices (where brains live, defaults per agent) are in the user config.
format = {format}
id = "{id}"
name = "{name}"
# description = "What this brain is for, in one line (shown by `brain list`)"

[consolidate]
review = "auto"            # auto | always: whether consolidation waits for your review

[agents.default]           # what agents without their own profile may write
write       = ["episodes", "edit"]

# Example of a profile for one agent:
# [agents.claude-code]
# write       = ["episodes", "edit", "propose_rules", "consolidate", "harvest"]
"""

LOG_HEADER = "# Log\n\nChanges made by brain-wiki, newest at the bottom.\n"


def default_agents_block(name: str, topics: list[tuple[str, str, str]] | None = None) -> str:
    rows = topics or []
    table = ["| Topic | Hub | About |", "|---|---|---|"]
    table += [f"| {slug} | {hub} | {about} |" for slug, hub, about in rows] or [
        "| (none yet) | | |"
    ]
    return "\n".join(
        [
            f"# This folder is a brain-wiki brain: {name}",
            "",
            "- Read `rules.md` first: standing directives from the user.",
            "- Knowledge lives in `topics/<topic>/`; each topic has a hub (`index.md`).",
            "- To record something, add a new file under `inbox/episodes/YYYY/MM/<ULID>.md`",
            "  (or call the brain-wiki MCP tool `brain_log_episode`). Never edit `topics/` or `rules.md`",
            "  directly; consolidation folds episodes into notes.",
            "- A note's relations are its `bw-<verb>` frontmatter fields: part_of, has_part,",
            "  depends_on, enables, conflicts_with, supersedes, superseded_by, related_to. If a",
            "  note is superseded or conflicts with another, read both before acting.",
            "",
            *table,
        ]
    )


def declare_format(engine: Engine) -> bool:
    """Raise `format` in brain.toml to this version before writing files in it (02 §13).

    One-way and outside undo: once a brain holds format 2 files, an older brain-wiki must refuse
    it rather than misread them (it would not see `bw-claims`). Returns whether it changed.
    """
    if engine.manifest.format >= FORMAT_VERSION:
        return False
    text = engine.store.read_text(MANIFEST)
    new = re.sub(r"(?m)^format\s*=\s*\d+", f"format = {FORMAT_VERSION}", text, count=1)
    if new == text:
        return False
    engine.store.write_text(MANIFEST, new)
    engine.manifest.format = FORMAT_VERSION
    return True


def init_brain(path: Path, name: str | None = None) -> Path:
    path = path.expanduser()
    if (path / MANIFEST).exists():
        raise Conflict(f"{path} is already a brain")
    if path.exists() and not path.is_dir():
        raise UsageError(f"{path} exists and is not a directory")
    path.mkdir(parents=True, exist_ok=True)
    name = name or path.name
    text = _BRAIN_TOML_TEMPLATE.format(format=FORMAT_VERSION, id=new_ulid(), name=name)
    parse_manifest(text)  # the template must always be valid
    (path / MANIFEST).write_text(text, encoding="utf-8")
    for sub in ("topics", "inbox/episodes", "inbox/agents", "archive/episodes", "reports"):
        (path / sub).mkdir(parents=True, exist_ok=True)
    agents = path / "AGENTS.md"
    agents.write_text(
        replace_block(
            agents.read_text(encoding="utf-8") if agents.exists() else "",
            default_agents_block(name),
        ),
        encoding="utf-8",
    )
    for filename, content in (("rules.md", RULES_HEADER), ("log.md", LOG_HEADER)):
        target = path / filename
        if not target.exists():
            target.write_text(content, encoding="utf-8")
    gitattributes = path / ".gitattributes"
    if not gitattributes.exists():
        gitattributes.write_text("log.md merge=union\nreports/** -diff\n", encoding="utf-8")
    return path.resolve()
