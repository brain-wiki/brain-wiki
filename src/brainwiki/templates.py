"""Brain templates: the topic tree a new brain starts with (config-and-storage.md §1.1).

A template is a folder shaped like a brain: a `topics/` folder whose folders hold a topic page
and topic rules. An existing brain works as a template too. Only topic pages and topic rules are
copied, never notes, so no knowledge comes along (D44).
"""

from __future__ import annotations

import os
import posixpath
import re
import tomllib
from dataclasses import dataclass
from importlib import resources
from pathlib import Path
from typing import Any

from brainwiki.config import MANIFEST, Layout, open_brain
from brainwiki.errors import NotFound, UsageError
from brainwiki.ids import new_ulid

_TEMPLATE_FILE = "template.toml"
_DROPPED_KEYS = re.compile(r"^(id|created|updated)\s*:")
_LIST_ITEM = re.compile(r"^\s*(?:[-*+]|\d+[.)])\s")


@dataclass(frozen=True)
class Template:
    name: str
    root: Path
    description: str
    layout: Layout  # the source's names for its topics folder, pages, and rules
    ignored: tuple[str, ...] = ()  # folders of a source brain that are not topics

    @property
    def topics_root(self) -> Path:
        return (
            self.root if self.layout.topics_dir in (".", "") else self.root / self.layout.topics_dir
        )


def _builtin_root() -> Path:
    return Path(str(resources.files("brainwiki") / "assets" / "templates"))


def builtin_templates() -> list[Template]:
    root = _builtin_root()
    if not root.is_dir():
        return []
    return [_from_folder(p, p.name) for p in sorted(root.iterdir()) if (p / "topics").is_dir()]


def _from_folder(path: Path, name: str) -> Template:
    meta: dict[str, Any] = {}
    if (path / _TEMPLATE_FILE).is_file():
        try:
            meta = tomllib.loads((path / _TEMPLATE_FILE).read_text(encoding="utf-8"))
        except tomllib.TOMLDecodeError as exc:
            raise UsageError(f"{path / _TEMPLATE_FILE} is not valid TOML: {exc}") from exc
    return Template(name, path, str(meta.get("description", "")), Layout())


def resolve_template(spec: str) -> Template:
    """A built-in template by name, or a folder: a template, or a brain to copy the shape of."""
    for template in builtin_templates():
        if template.name == spec:
            return template
    path = Path(spec).expanduser()
    if not path.is_dir():
        names = ", ".join(t.name for t in builtin_templates()) or "none"
        raise NotFound(
            f"no template {spec!r}: give a built-in name ({names}), or a folder that holds "
            "topics/ or is a brain"
        )
    path = path.resolve()
    if (path / MANIFEST).is_file():
        manifest = open_brain(path).manifest
        layout = manifest.layout
        ignored = (layout.inbox_dir, layout.archive_dir, layout.reports_dir, *layout.ignore)
        description = manifest.description or f"the shape of brain {manifest.name or path.name}"
        return Template(path.name, path, description, layout, ignored)
    if not (path / "topics").is_dir():
        raise UsageError(f"{path} is not a template: it has no topics/ folder and is not a brain")
    return _from_folder(path, path.name)


def _ignored(template: Template, rel: str) -> bool:
    import fnmatch

    if any(part.startswith(".") for part in rel.split("/")):
        return True
    from_root = (
        rel
        if template.topics_root == template.root
        else posixpath.join(template.layout.topics_dir, rel)
    )
    return any(
        from_root == pat
        or from_root.startswith(pat.rstrip("/") + "/")
        or fnmatch.fnmatch(from_root, pat)
        for pat in template.ignored
    )


def _plan(template: Template, layout: Layout) -> dict[str, tuple[Path, bool]]:
    """Brain path in a new brain with `layout` -> (source file, whether it is a topic page)."""
    source = template.layout
    base = template.topics_root
    if not base.is_dir():
        raise UsageError(f"{template.root} has no {source.topics_dir}/ folder")
    out: dict[str, tuple[Path, bool]] = {}
    for folder, dirs, names in os.walk(base):
        rel = os.path.relpath(folder, base).replace(os.sep, "/")
        rel = "" if rel == "." else rel
        dirs[:] = sorted(d for d in dirs if not _ignored(template, posixpath.join(rel, d)))
        target = posixpath.join(layout.topics_dir, rel) if rel else layout.topics_dir
        if source.topic_rules and layout.topic_rules and source.topic_rules in names:
            out[f"{target}/{layout.topic_rules}"] = (Path(folder) / source.topic_rules, False)
        if not rel:
            continue  # the topics folder itself is no topic, so it has no page
        page = _page_in(source, rel, names)
        if page:
            name = layout.topic_page.replace("{folder}", posixpath.basename(rel))
            out[f"{target}/{name}"] = (Path(folder) / page, True)
    return out


def template_paths(template: Template, layout: Layout) -> list[str]:
    """The files the template puts in a new brain with `layout`."""
    return sorted(_plan(template, layout))


def template_files(template: Template, layout: Layout) -> dict[str, str]:
    """What the template puts in a new brain with `layout`: brain path -> content."""
    out = {}
    for rel, (source, is_page) in _plan(template, layout).items():
        text = source.read_text(encoding="utf-8")
        out[rel] = fresh_page(text) if is_page else text
    return out


def _page_in(layout: Layout, rel: str, names: list[str]) -> str | None:
    wanted = layout.topic_page.replace("{folder}", posixpath.basename(rel))
    if wanted in names:
        return wanted
    return next((name for name in sorted(names) if layout.is_legacy_page(name)), None)


def fresh_page(text: str) -> str:
    """A topic page for a new brain: a new id, no dates, and an empty `## Notes` list, since the
    notes it listed are not copied."""
    newline = "\r\n" if "\r\n" in text else "\n"
    lines = text.split(newline)
    if lines and lines[0].strip() == "---":
        end = next((i for i in range(1, len(lines)) if lines[i].strip() in ("---", "...")), None)
        if end is not None:
            kept = [ln for ln in lines[1:end] if not _DROPPED_KEYS.match(ln)]
            lines = ["---", f"id: {new_ulid()}", *kept, *lines[end:]]
        else:
            lines = ["---", f"id: {new_ulid()}", "type: topic", "---", *lines]
    else:
        lines = ["---", f"id: {new_ulid()}", "type: topic", "---", *lines]
    out: list[str] = []
    in_notes = False
    for line in lines:
        heading = re.match(r"^(#{1,6})\s+(.*?)\s*#*\s*$", line)
        if heading:
            in_notes = heading.group(1) == "##" and heading.group(2).strip().lower() == "notes"
        elif in_notes and (_LIST_ITEM.match(line) or (line[:1] in (" ", "\t") and line.strip())):
            continue  # an item of the list, or a line it wraps onto
        out.append(line)
    return newline.join(out)


def template_rows(templates: list[Template] | None = None) -> list[dict[str, Any]]:
    """The built-in templates as `brain templates` lists them."""
    rows = []
    for template in templates if templates is not None else builtin_templates():
        topics = sorted(
            p.name
            for p in template.topics_root.iterdir()
            if p.is_dir() and not p.name.startswith(".")
        )
        rows.append({"name": template.name, "description": template.description, "topics": topics})
    return rows
