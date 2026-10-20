"""The topic tree (brain-format.md §2): which folders are topics, their parents, what they inherit.

Every folder under the topics directory that holds a note, directly or deeper, is a topic, with
or without a topic page; one without a page has no content of its own. A folder of attachments
only, or with nothing in it, is not a topic. Its slug, not its path, is its identity, so
folders can be reorganized.
"""

from __future__ import annotations

import json
import posixpath
import re
from collections.abc import Iterable
from dataclasses import dataclass, field
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from brainwiki.config import Layout, Manifest
    from brainwiki.engine import Engine


def slugify(name: str) -> str:
    name = re.sub(r"^\d+[\s._-]+", "", name.strip())
    slug = re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-")
    return slug[:64] or "topic"


def page_name(layout: Layout, folder: str) -> str:
    """The file name of the topic page in `folder` (`layout.topic_page`): the name a new page
    gets. An existing page may have the legacy name instead; `TopicTree.page` finds it."""
    return layout.topic_page.replace("{folder}", folder.rsplit("/", 1)[-1])


def is_rules_file(layout: Layout, rel: str) -> bool:
    """Whether `rel` is a topic rules file (`layout.topic_rules`, brain-format.md §8.1)."""
    return bool(layout.topic_rules) and posixpath.basename(rel) == layout.topic_rules


@dataclass(frozen=True)
class TopicTree:
    paths: dict[str, str]  # slug -> folder
    parents: dict[str, str | None]
    pages: dict[str, str] = field(default_factory=dict)  # slug -> its topic page, if it has one
    rules: frozenset[str] = frozenset()  # every topic rules file in the brain
    _children: dict[str, list[str]] = field(default_factory=dict, compare=False, repr=False)

    def __post_init__(self) -> None:
        for slug, parent in sorted(self.parents.items()):
            if parent is not None:
                self._children.setdefault(parent, []).append(slug)

    def for_path(self, rel: str) -> str | None:
        """The nearest enclosing topic of a brain path."""
        best: tuple[int, str] | None = None
        for slug, path in self.paths.items():
            if (rel.startswith(path.rstrip("/") + "/") or path in (".", "")) and (
                best is None or len(path) > best[0]
            ):
                best = (len(path), slug)
        return best[1] if best else None

    def parent(self, slug: str) -> str | None:
        return self.parents.get(slug)

    def ancestors(self, slug: str) -> list[str]:
        """Nearest first."""
        out, current = [], self.parents.get(slug)
        while current is not None and current not in out:
            out.append(current)
            current = self.parents.get(current)
        return out

    def children(self, slug: str) -> list[str]:
        return list(self._children.get(slug, []))

    def descendants(self, slug: str) -> list[str]:
        out, stack = [], list(reversed(self._children.get(slug, [])))
        while stack:
            current = stack.pop()
            out.append(current)
            stack += reversed(self._children.get(current, []))
        return out

    def page(self, slug: str) -> str | None:
        """The path of the topic's page, or None when it has none."""
        return self.pages.get(slug)

    def is_page(self, rel: str) -> bool:
        return rel in self._page_paths

    @property
    def _page_paths(self) -> frozenset[str]:
        cached = self.__dict__.get("_page_set")
        if cached is None:
            cached = frozenset(self.pages.values())
            object.__setattr__(self, "_page_set", cached)
        return cached

    def rules_for(self, rel: str) -> list[str]:
        """The topic rules files that apply to a brain path or folder, outermost first: one in
        its folder and in every folder above it (brain-format.md §8.1)."""
        if not self.rules:
            return []
        folder = rel if not rel.lower().endswith(".md") else posixpath.dirname(rel)
        found: list[str] = []
        while True:
            for path in self.rules:
                if posixpath.dirname(path) == folder:
                    found.append(path)
            if not folder:
                break
            folder = posixpath.dirname(folder)
        return found[::-1]

    def roots(self) -> list[str]:
        return sorted(s for s, p in self.parents.items() if p is None)

    def depth(self, slug: str) -> int:
        return len(self.ancestors(slug))

    def expand(self, slugs: Iterable[str]) -> set[str]:
        """The topics and all their sub-topics (unknown slugs are kept as given)."""
        out: set[str] = set()
        for slug in slugs:
            out.add(slug)
            out.update(self.descendants(slug))
        return out

    @property
    def signature(self) -> str:
        return json.dumps(
            {
                s: [self.paths[s], self.parents.get(s), self.pages.get(s)]
                for s in sorted(self.paths)
            },
            separators=(",", ":"),
        )


def _build_tree(manifest: Manifest, files: Iterable[str]) -> TopicTree:
    """The tree from every folder under the topics directory that holds a note."""
    layout = manifest.layout
    files = files if isinstance(files, (set, frozenset)) else frozenset(files)
    base = "" if layout.topics_dir in (".", "") else layout.topics_dir.rstrip("/") + "/"
    reserved = (layout.inbox_dir, layout.archive_dir, layout.reports_dir)
    folders: set[str] = set()
    rules: set[str] = set()
    for rel in files:
        if not rel.lower().endswith(".md"):
            continue  # attachments alone do not make a topic
        if is_rules_file(layout, rel):
            if not any(rel.startswith(r + "/") for r in reserved):
                rules.add(rel)
            continue  # nor do rules: they say how to organize notes, they are not notes
        folder = posixpath.dirname(rel)
        while folder and folder.startswith(base) and folder not in folders:
            if any(folder == r or folder.startswith(r + "/") for r in reserved) or (
                manifest.is_ignored(folder)
            ):
                break
            folders.add(folder)
            folder = posixpath.dirname(folder)
    ordered = sorted(folders, key=lambda f: (f.count("/"), f))

    paths: dict[str, str] = {}
    claimed: dict[str, str] = {}  # folder -> slug
    declared = manifest.topics
    for slug, cfg in declared.items():  # an explicit path wins its folder
        if cfg.path_declared:
            paths[slug] = cfg.path.rstrip("/")
            claimed[paths[slug]] = slug
    for slug, cfg in declared.items():  # a declaration without one names the folder of its slug
        if slug in paths:
            continue
        match = next(
            (f for f in ordered if f not in claimed and slugify(posixpath.basename(f)) == slug),
            None,
        )
        paths[slug] = match or cfg.path.rstrip("/")
        claimed[paths[slug]] = slug

    def parent_of(folder: str) -> str | None:
        current = posixpath.dirname(folder)
        while current:
            if current in claimed:
                return claimed[current]
            current = posixpath.dirname(current)
        return None

    for (
        folder
    ) in ordered:  # the rest are named after their folder; a clash gets the parent's prefix
        if folder in claimed:
            continue
        slug = slugify(posixpath.basename(folder))
        if slug in paths:
            parent = parent_of(folder)
            slug = f"{parent}-{slug}" if parent else slug
            stem, n = slug, 2
            while slug in paths:
                slug, n = f"{stem}-{n}", n + 1
        paths[slug] = folder
        claimed[folder] = slug

    parents = {slug: parent_of(path) for slug, path in paths.items()}
    # The old default name, in any case, until BW410 renames it (D42).
    legacy: dict[str, str] = {}  # folder -> its page under the old name
    if layout.legacy_topic_page:
        for rel in sorted(files):
            folder, name = posixpath.split(rel)
            if layout.is_legacy_page(name):
                legacy.setdefault(folder, rel)
    pages: dict[str, str] = {}
    for slug, folder in paths.items():
        page = f"{folder}/{page_name(layout, folder)}"
        if page in files:
            pages[slug] = page
        elif folder in legacy:
            pages[slug] = legacy[folder]
    return TopicTree(paths, parents, pages, frozenset(rules))


def topic_tree(engine: Engine) -> TopicTree:
    """The engine's topic tree, rebuilt only when the set of files changes."""
    files = _files(engine)
    key = (id(engine.manifest), files)
    cached = getattr(engine, "_topic_tree", None)
    if cached is not None and cached[0] == key:
        return cached[1]
    tree = _build_tree(engine.manifest, files)
    engine._topic_tree = (key, tree)  # type: ignore[attr-defined]
    return tree


def _files(engine: Engine) -> frozenset[str]:
    """Every file in the brain as of the last scan (the scan keeps this current)."""
    cached = getattr(engine, "_files", None)
    if cached is None:
        cached = frozenset(r[0] for r in engine.db.execute("SELECT path FROM files"))
        engine._files = cached  # type: ignore[attr-defined]
    return cached


def note_file_changes(engine: Engine, present: Iterable[str], absent: Iterable[str]) -> None:
    """Keep the file set current after a scan saw files appear or disappear."""
    current = set(_files(engine))
    current.update(present)
    current.difference_update(absent)
    engine._files = frozenset(current)  # type: ignore[attr-defined]


def set_files(engine: Engine, paths: Iterable[str]) -> None:
    engine._files = frozenset(paths)  # type: ignore[attr-defined]
