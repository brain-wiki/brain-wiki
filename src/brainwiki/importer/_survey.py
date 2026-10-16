"""Scan a Markdown folder and detect its conventions without writing anything (docs/design/import.md §3.1)."""

from __future__ import annotations

import json
import re
from collections import Counter
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any

from brainwiki.format import STATUSES, parse_document
from brainwiki.index import norm_key, slugify

_DAILY = re.compile(r"^\d{4}-\d{2}-\d{2}\.md$")
_HUB_NAMES = ("index.md", "_index.md", "README.md")
_TEMPLATE_NAMES = {"templates", "_templates", "template"}
_INBOX_NAMES = {"inbox", "_inbox"}
_ATTACHMENT_NAMES = {"attachments", "assets", "files", "images", "media", "_resources"}
_MAX_PARSE_BYTES = 2 * 1024 * 1024
_NUMBERED = re.compile(r"^\d+[\s._-]+")  # "90 Templates", "00 Inbox": PARA-style prefixes
_CONFLICT = re.compile(r"\.sync-conflict-|(?i:conflicted copy)| \(\d+\)\.md$")


@dataclass
class Survey:
    root: Path
    notes: list[str] = field(default_factory=list)
    obsidian: bool = False
    markdown_links: bool = False
    ignore: list[str] = field(default_factory=list)
    topics: dict[str, str] = field(default_factory=dict)  # slug -> folder
    hub_filename: str = "index.md"
    daily_folder: str | None = None
    counts: Counter[str] = field(default_factory=Counter)
    statuses: Counter[str] = field(default_factory=Counter)
    unresolved: Counter[str] = field(default_factory=Counter)
    conflicts: list[str] = field(default_factory=list)
    unparsable: list[str] = field(default_factory=list)
    oversized: list[str] = field(default_factory=list)

    def to_json(self) -> dict[str, Any]:
        return {
            "root": str(self.root),
            "notes": len(self.notes),
            "obsidian": self.obsidian,
            "topics": self.topics,
            "hub_filename": self.hub_filename,
            "ignore": self.ignore,
            "daily_folder": self.daily_folder,
            "counts": dict(self.counts),
            "nonstandard_status": dict(self.statuses),
            "unresolved_links": sum(self.unresolved.values()),
            "top_unresolved": self.unresolved.most_common(10),
            "conflict_copies": self.conflicts,
            "unparsable": self.unparsable,
            "oversized": self.oversized,
        }


def _obsidian_settings(root: Path) -> dict[str, Any]:
    settings: dict[str, Any] = {}
    for name in ("app.json", "templates.json", "daily-notes.json"):
        path = root / ".obsidian" / name
        try:
            settings[name] = json.loads(path.read_text(encoding="utf-8"))
        except (OSError, ValueError):
            settings[name] = {}
    return settings


def survey(root: Path) -> Survey:
    root = root.expanduser().resolve()
    result = Survey(root)
    result.obsidian = (root / ".obsidian").is_dir()
    ignore: set[str] = set()
    if result.obsidian:
        settings = _obsidian_settings(root)
        app = settings["app.json"]
        result.markdown_links = bool(app.get("useMarkdownLinks"))
        attachments = str(app.get("attachmentFolderPath") or "").strip("./")
        if attachments:
            ignore.add(attachments)
        templates = str(settings["templates.json"].get("folder") or "").strip("/")
        if templates:
            ignore.add(templates)
    for child in sorted(root.iterdir()):
        if child.is_dir() and not child.name.startswith("."):
            lowered = _NUMBERED.sub("", child.name.lower())
            if lowered in _TEMPLATE_NAMES or lowered in _ATTACHMENT_NAMES:
                ignore.add(child.name)
    files = [
        p
        for p in sorted(root.rglob("*.md"))
        if not any(part.startswith(".") for part in p.relative_to(root).parts)
        and p.relative_to(root).parts[0] not in ignore
    ]
    keys: set[str] = set()
    docs = []
    for path in files:
        rel = path.relative_to(root).as_posix()
        result.notes.append(rel)
        if _CONFLICT.search(path.name):
            result.conflicts.append(rel)
        if path.stat().st_size > _MAX_PARSE_BYTES:
            result.oversized.append(rel)
            continue
        try:
            text = path.read_text(encoding="utf-8")
        except (OSError, UnicodeDecodeError):
            result.unparsable.append(rel)
            continue
        doc = parse_document(rel, text)
        docs.append(doc)
        keys.update({norm_key(rel), norm_key(path.name), doc.title.casefold()})
        keys.update(str(a).casefold() for a in (doc.fm.get("aliases") or []) if isinstance(a, str))
    hub_votes: Counter[str] = Counter()
    folders: dict[str, int] = Counter()
    daily: Counter[str] = Counter()
    for doc in docs:
        fm = doc.frontmatter
        result.counts["notes"] += 1
        if fm.error:
            result.unparsable.append(doc.path)
        if fm.present:
            result.counts["with_frontmatter"] += 1
        if fm.data.get("id"):
            result.counts["with_id"] += 1
        status = fm.data.get("status")
        if status is not None and str(status).lower() not in STATUSES:
            result.statuses[str(status)] += 1
        for link in doc.links:
            if norm_key(link.target) not in keys and link.target.casefold() not in keys:
                result.unresolved[link.target] += 1
        parts = doc.path.split("/")
        if len(parts) > 1:
            folders[parts[0]] += 1
            name = parts[-1]
            if name in _HUB_NAMES and len(parts) == 2:
                hub_votes[name] += 1
            elif len(parts) == 2 and name[:-3] == parts[0]:
                hub_votes["{folder}.md"] += 1
            if _DAILY.match(name):
                daily[parts[0]] += 1
    if hub_votes:
        result.hub_filename = hub_votes.most_common(1)[0][0]
    if daily:
        folder, count = daily.most_common(1)[0]
        if count >= max(3, folders[folder] // 2):
            result.daily_folder = folder
    used: set[str] = set()
    for folder in sorted(folders):
        if _NUMBERED.sub("", folder.lower()) in _INBOX_NAMES:
            continue
        slug = "journal" if folder == result.daily_folder else slugify(folder)
        base, n = slug, 2
        while slug in used:
            slug, n = f"{base}-{n}", n + 1
        used.add(slug)
        result.topics[slug] = folder
    result.ignore = sorted(ignore)
    return result
