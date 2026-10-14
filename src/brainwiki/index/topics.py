"""The topic tree (design doc 02 §2): which folders are topics, their parents, what they inherit.

A topic is a folder directly under the topics directory, or a folder at any depth below it that
has a hub. Its slug, not its path, is its identity, so folders can be reorganized. Topic policies
(`review`, `agent_edits`) inherit down the tree.
"""

from __future__ import annotations

import json
import posixpath
import re
from collections.abc import Iterable
from dataclasses import dataclass, field
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from brainwiki.config.manifest import Layout, Manifest
    from brainwiki.engine import Engine


def slugify(name: str) -> str:
    name = re.sub(r"^\d+[\s._-]+", "", name.strip())
    slug = re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-")
    return slug[:64] or "topic"


def hub_name(layout: Layout, folder: str) -> str:
    return layout.hub_filename.replace("{folder}", folder.rsplit("/", 1)[-1])


def _is_hub_file(layout: Layout, rel: str) -> bool:
    folder, _, name = rel.rpartition("/")
    return bool(folder) and name == hub_name(layout, folder)


@dataclass(frozen=True)
class TopicTree:
    paths: dict[str, str]  # slug -> folder
    parents: dict[str, str | None]
    settings: dict[str, dict[str, str]] = field(default_factory=dict)  # slug -> nearest declared
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

    def setting(self, slug: str | None, name: str) -> str | None:
        """A topic policy (`review`, `agent_edits`): its own, else its nearest ancestor's."""
        return self.settings.get(slug, {}).get(name) if slug else None

    @property
    def signature(self) -> str:
        return json.dumps(
            {s: [self.paths[s], self.parents.get(s)] for s in sorted(self.paths)},
            separators=(",", ":"),
        )


def _build_tree(manifest: Manifest, top_dirs: Iterable[str], hub_files: Iterable[str]) -> TopicTree:
    """The tree from the folders directly under the topics directory and the hub files below it."""
    layout = manifest.layout
    base = "" if layout.topics_dir in (".", "") else layout.topics_dir.rstrip("/") + "/"
    reserved = (layout.inbox_dir, layout.archive_dir, layout.reports_dir)
    folders = set(top_dirs)
    for rel in hub_files:
        folder = posixpath.dirname(rel)
        if (
            folder
            and folder.startswith(base)
            and not any(folder == r or folder.startswith(r + "/") for r in reserved)
            and not manifest.is_ignored(folder)
        ):
            folders.add(folder)
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
    settings: dict[str, dict[str, str]] = {}
    for slug in paths:
        found: dict[str, str] = {}
        for owner in [slug, *_chain(parents, slug)]:
            cfg = declared.get(owner)
            for name in _INHERITED:
                value = getattr(cfg, name, None) if cfg else None
                if value is not None and name not in found:
                    found[name] = value
        settings[slug] = found
    return TopicTree(paths, parents, settings)


_INHERITED = ("review", "agent_edits")


def _chain(parents: dict[str, str | None], slug: str) -> list[str]:
    out, current = [], parents.get(slug)
    while current is not None and current not in out and current != slug:
        out.append(current)
        current = parents.get(current)
    return out


def topic_tree(engine: Engine) -> TopicTree:
    """The engine's topic tree, rebuilt only when the top-level folders or hub files change."""
    hubs = _hub_files(engine)
    top = _top_dirs(engine)
    key = (id(engine.manifest), top, hubs)
    cached = getattr(engine, "_topic_tree", None)
    if cached is not None and cached[0] == key:
        return cached[1]
    tree = _build_tree(engine.manifest, top, hubs)
    engine._topic_tree = (key, tree)  # type: ignore[attr-defined]
    return tree


def _hub_files(engine: Engine) -> frozenset[str]:
    """Hub files in the brain as of the last scan (the scan keeps this current)."""
    cached = getattr(engine, "_hub_files", None)
    if cached is None:
        layout = engine.manifest.layout
        rows = engine.db.execute("SELECT path FROM files")
        cached = frozenset(r[0] for r in rows if _is_hub_file(layout, r[0]))
        engine._hub_files = cached  # type: ignore[attr-defined]
    return cached


def note_hub_changes(engine: Engine, present: Iterable[str], absent: Iterable[str]) -> None:
    """Keep the hub-file set current after a scan saw files appear or disappear."""
    layout = engine.manifest.layout
    current = set(_hub_files(engine))
    current.update(p for p in present if _is_hub_file(layout, p))
    current.difference_update(p for p in absent if _is_hub_file(layout, p))
    engine._hub_files = frozenset(current)  # type: ignore[attr-defined]


def set_hub_files(engine: Engine, paths: Iterable[str]) -> None:
    layout = engine.manifest.layout
    engine._hub_files = frozenset(p for p in paths if _is_hub_file(layout, p))  # type: ignore[attr-defined]


def _top_dirs(engine: Engine) -> tuple[str, ...]:
    """Folders directly under the topics directory, cached on its modification time."""
    layout = engine.manifest.layout
    base = engine.brain.root / layout.topics_dir
    try:
        stamp = base.stat().st_mtime_ns
    except OSError:
        stamp = None
    cached = getattr(engine, "_top_dirs", None)
    if cached is not None and cached[0] == stamp:
        return cached[1]
    reserved = {layout.inbox_dir, layout.archive_dir, layout.reports_dir}
    prefix = "" if layout.topics_dir in (".", "") else f"{layout.topics_dir}/"
    found: list[str] = []
    if base.is_dir():
        for child in sorted(base.iterdir()):
            rel = f"{prefix}{child.name}"
            if (
                child.is_dir()
                and not child.name.startswith(".")
                and rel not in reserved
                and not engine.manifest.is_ignored(rel)
            ):
                found.append(rel)
    out = tuple(found)
    engine._top_dirs = (stamp, out)  # type: ignore[attr-defined]
    return out
