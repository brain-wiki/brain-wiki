"""Link target resolution, Obsidian-compatible with leniencies (design doc 02 §6.5)."""

from __future__ import annotations

import posixpath
import sqlite3
from collections import defaultdict
from dataclasses import dataclass

_ORDER = ("path", "stem", "alias", "title", "id")


def norm_key(text: str) -> str:
    key = text.strip().replace("\\", "/")
    if key.startswith("./"):
        key = key[2:]
    if key.lower().endswith(".md"):
        key = key[:-3]
    return key.casefold()


@dataclass
class Resolution:
    node_id: str | None
    candidates: list[str]

    @property
    def ambiguous(self) -> bool:
        return self.node_id is None and len(self.candidates) > 1


class Resolver:
    """Resolve link targets against the `names` table.

    `preload=True` loads every name into memory, for bulk re-resolution; otherwise names are
    looked up on demand, so a one-file update does not read the whole table.
    """

    def __init__(self, conn: sqlite3.Connection, *, preload: bool = False):
        self.conn = conn
        self.keys: dict[str, dict[str, set[str]]] | None = None
        self._cache: dict[tuple[str, str], set[str]] = {}
        if preload:
            self.keys = {k: defaultdict(set) for k in _ORDER}
            for row in conn.execute("SELECT key, kind, node_id FROM names"):
                self.keys[row["kind"]][row["key"]].add(row["node_id"])

    def _lookup(self, kind: str, key: str) -> set[str]:
        if self.keys is not None:
            return self.keys[kind].get(key, set())
        found = self._cache.get((kind, key))
        if found is None:
            found = {
                r[0]
                for r in self.conn.execute(
                    "SELECT node_id FROM names WHERE key = ? AND kind = ?", (key, kind)
                )
            }
            self._cache[(kind, key)] = found
        return found

    def _suffix(self, key: str) -> set[str]:
        if self.keys is not None:
            return {n for k, ids in self.keys["path"].items() if k.endswith("/" + key) for n in ids}
        pattern = "%/" + key.replace("\\", "\\\\").replace("%", "\\%").replace("_", "\\_")
        return {
            r[0]
            for r in self.conn.execute(
                "SELECT node_id FROM names WHERE kind = 'path' AND key LIKE ? ESCAPE '\\'",
                (pattern,),
            )
        }

    def resolve(self, raw: str, from_path: str | None = None) -> Resolution:
        if raw.startswith("path:") or raw.startswith("id:"):
            raw = raw.split(":", 1)[1]
        key = norm_key(raw)
        if not key:
            return Resolution(None, [])
        lookups: list[str] = []
        if from_path:
            base = posixpath.dirname(from_path)
            joined = posixpath.normpath(posixpath.join(base, key))
            if not joined.startswith(".."):
                lookups.append(joined.casefold())
        lookups.append(key)
        for lookup in lookups:
            hits = self._lookup("path", lookup)
            if hits:
                return Resolution(next(iter(hits)) if len(hits) == 1 else None, sorted(hits))
        if "/" in key:  # Obsidian matches partial paths by suffix
            suffix_hits = self._suffix(key)
            if suffix_hits:
                return Resolution(
                    next(iter(suffix_hits)) if len(suffix_hits) == 1 else None, sorted(suffix_hits)
                )
        for kind in ("stem", "alias", "title", "id"):
            hits = self._lookup(kind, key)
            if hits:
                if len(hits) == 1:
                    return Resolution(next(iter(hits)), list(hits))
                return Resolution(None, sorted(hits))
        return Resolution(None, [])


def name_rows(
    node_id: str, path: str, title: str, aliases: list[str], fm_id: str | None
) -> list[tuple[str, str, str]]:
    stem = path.rsplit("/", 1)[-1]
    rows = {
        (norm_key(path), "path"),
        (norm_key(stem), "stem"),
        (title.casefold().strip(), "title"),
        (node_id.casefold(), "id"),
    }
    if fm_id:
        rows.add((fm_id.casefold(), "id"))
    for alias in aliases:
        if isinstance(alias, str) and alias.strip():
            rows.add((alias.strip().casefold(), "alias"))
    return [(key, kind, node_id) for key, kind in rows if key]


class LinkNamer:
    """How to write a wikilink to a node: its file stem when unique, else its path."""

    def __init__(self, conn: sqlite3.Connection):
        self.conn = conn
        self._stems: dict[str, int] | None = None

    def __call__(self, node_id: str) -> str:
        if self._stems is None:
            self._stems = {
                r["key"]: r["c"]
                for r in self.conn.execute(
                    "SELECT key, COUNT(*) AS c FROM names WHERE kind='stem' GROUP BY key"
                )
            }
        row = self.conn.execute("SELECT path FROM nodes WHERE id=?", (node_id,)).fetchone()
        path = row["path"]
        bare = path[:-3] if path.lower().endswith(".md") else path
        stem = bare.rsplit("/", 1)[-1]
        return stem if self._stems.get(norm_key(stem), 0) <= 1 else bare


def link_text(conn: sqlite3.Connection, node_id: str) -> str:
    return LinkNamer(conn)(node_id)
