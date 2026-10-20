"""Creating brains and the files `brain init` writes."""

from __future__ import annotations

import re
import shutil
from pathlib import Path
from typing import TYPE_CHECKING

from brainwiki import FORMAT_VERSION
from brainwiki.config import MANIFEST, Layout, parse_manifest
from brainwiki.errors import Conflict, UsageError
from brainwiki.format import RULES_HEADER, replace_block
from brainwiki.ids import new_ulid

if TYPE_CHECKING:
    from brainwiki.engine import Engine
    from brainwiki.templates import Template

_BRAIN_TOML_TEMPLATE = """\
# brain.toml: this directory is a brain-wiki brain. Settings here travel with the brain.
# Machine-specific choices (where brains live, defaults per agent) are in the user config.
format = {format}
id = "{id}"
name = "{name}"
# description = "What this brain is for, in one line (shown to agents by brain_list)"

[agents.default]           # what agents without their own profile may write
write       = ["edit"]

# Example of a profile for one agent:
# [agents.claude-code]
# write       = ["edit", "propose_rules", "harvest"]
"""

LOG_HEADER = "# Log\n\nChanges made by brain-wiki, newest at the bottom.\n"


def default_agents_block(
    name: str,
    topics: list[tuple[str, str, str]] | None = None,
    *,
    edit: bool = True,
    layout: Layout | None = None,
) -> str:
    """`edit`: whether `[agents.default]`, the profile of agents that only read files, has it."""
    layout = layout or Layout()
    page = layout.topic_page.replace("{folder}", "<folder>")
    rows = topics or []
    table = ["| Topic | Page | About |", "|---|---|---|"]
    table += [f"| {slug} | {page} | {about} |" for slug, page, about in rows] or [
        "| (none yet) | | |"
    ]
    write = (
        [
            "- To add or correct knowledge, edit or create a note, then run",
            "  `brain validate <path>` (MCP: `brain_validate`) and fix what it reports. Something",
            "  not organized yet goes to the inbox through the MCP tool `brain_log_episode`.",
            "  Never edit `rules.md`, episodes, or `log.md`.",
            *(
                [
                    f"- Before adding or moving notes in a folder, read its `{layout.topic_rules}` and",
                    "  those of the folders above it: how the user wants that part organized.",
                ]
                if layout.topic_rules
                else []
            ),
        ]
        if edit
        else [
            "- Do not change files here. To record something, call the brain-wiki MCP tool",
            "  `brain_log_episode`.",
        ]
    )
    return "\n".join(
        [
            f"# This folder is a brain-wiki brain: {name}",
            "",
            "- Read `rules.md` first: standing directives from the user.",
            f"- Knowledge lives in `{layout.topics_dir}/<topic>/`; each topic has a page (`{page}`).",
            *write,
            "- A note's frontmatter is metadata; its facts and `[[links]]` are in the body. Relation",
            "  fields hold links: `bw-part_of`, `bw-depends_on`, `bw-conflicts_with` (read both). A note",
            "  with `status: superseded` names its replacement in `bw-superseded_by`: read that one.",
            "",
            *table,
        ]
    )


def declare_format(engine: Engine) -> bool:
    """Raise `format` in brain.toml to this version before writing files in it
    (brain-format.md §13).

    One-way and outside undo: once a brain holds files in a newer format, an older brain-wiki
    must refuse it rather than misread them. Returns whether it changed.
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


_SCAFFOLD = ("brain.toml", "AGENTS.md", "rules.md", "log.md", ".gitattributes")


def init_git(root: Path, name: str, extra: list[str] | None = None) -> str | None:
    """`git init` the brain and commit what `init_brain` wrote, so a clone is a brain too.

    Runs commit only the files they touch, so without this first commit `brain.toml` would
    never be tracked. Returns why it could not, or None.
    """
    from brainwiki.runs import run_git

    if shutil.which("git") is None:
        return "git is not installed"
    if not (root / ".git").exists():
        done = run_git(root, "init", "-q")
        if done.returncode != 0:
            return done.stderr.strip() or "git init failed"
    return commit_files(root, [*_SCAFFOLD, *(extra or [])], f"Create brain-wiki brain {name}")


def commit_files(root: Path, files: list[str], message: str) -> str | None:
    """Commit the brain-wiki files a step wrote outside a run. Returns why it failed, or None."""
    from brainwiki.runs import run_git

    files = [f for f in files if (root / f).exists()]
    run_git(root, "add", "--", *files)
    done = run_git(root, "commit", "-q", "-m", message, "--", *files)
    if done.returncode != 0:
        detail = (done.stderr or done.stdout).strip()
        return detail.splitlines()[0] if detail else "git commit failed"
    return None


def init_brain(path: Path, name: str | None = None, template: Template | None = None) -> Path:
    """Create a brain at `path`; with `template`, it starts with the template's topic tree
    (D44). Refuses before writing anything when the template would overwrite a file."""
    path = path.expanduser()
    if (path / MANIFEST).exists():
        raise Conflict(f"{path} is already a brain")
    if path.exists() and not path.is_dir():
        raise UsageError(f"{path} exists and is not a directory")
    path.mkdir(parents=True, exist_ok=True)
    name = name or path.name
    text = _BRAIN_TOML_TEMPLATE.format(format=FORMAT_VERSION, id=new_ulid(), name=name)
    manifest = parse_manifest(text)  # the template must always be valid
    from brainwiki.templates import template_files

    files = template_files(template, manifest.layout) if template else {}
    clashes = sorted(rel for rel in files if (path / rel).exists())
    if clashes:
        raise Conflict(f"the template would overwrite {', '.join(clashes[:5])}")
    (path / MANIFEST).write_text(text, encoding="utf-8")
    for sub in ("topics", "inbox/episodes", "inbox/agents", "archive/episodes", "reports"):
        (path / sub).mkdir(parents=True, exist_ok=True)
    agents = path / "AGENTS.md"
    agents.write_text(
        replace_block(
            agents.read_text(encoding="utf-8") if agents.exists() else "",
            default_agents_block(
                name, edit=manifest.profile("default").can("edit"), layout=manifest.layout
            ),
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
    if files:
        for rel, content in sorted(files.items()):
            target = path / rel
            target.parent.mkdir(parents=True, exist_ok=True)
            target.write_text(content, encoding="utf-8")
        _refresh_agents_md(path, name)
    return path.resolve()


def _refresh_agents_md(root: Path, name: str) -> None:
    """The AGENTS.md topic table, once a template's topics exist."""
    from brainwiki.config import open_brain
    from brainwiki.engine import Engine
    from brainwiki.index import agents_block

    agents = root / "AGENTS.md"
    with Engine(open_brain(root, name)) as engine:
        engine.scan(force=True)
        agents.write_text(
            replace_block(agents.read_text(encoding="utf-8"), agents_block(engine)),
            encoding="utf-8",
        )
