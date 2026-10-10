"""Link target resolution, Obsidian-compatible with leniencies (design doc 02 §6.5)."""

from __future__ import annotations

import posixpath
import sqlite3
from collections import defaultdict
from dataclasses import dataclass

ORDER = ("path", "stem", "alias", "title", "id")


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
    """In-memory view of the `names` table for fast bulk resolution."""

    def __init__(self, conn: sqlite3.Connection):
        self.keys: dict[str, dict[str, set[str]]] = {k: defaultdict(set) for k in ORDER}
        for row in conn.execute("SELECT key, kind, node_id FROM names"):
            self.keys[row["kind"]][row["key"]].add(row["node_id"])

    def resolve(self, raw: str, from_path: str | None = None) -> Resolution:
        if raw.startswith("path:") or raw.startswith("id:"):
            raw = raw.split(":", 1)[1]
        key = norm_key(raw)
        if not key:
            return Resolution(None, [])
        lookups: list[tuple[str, str]] = []
        if from_path:
            base = posixpath.dirname(from_path)
            joined = posixpath.normpath(posixpath.join(base, key))
            if not joined.startswith(".."):
                lookups.append(("path", joined.casefold()))
        lookups.append(("path", key))
        for _, lookup in lookups:
            hits = self.keys["path"].get(lookup)
            if hits:
                return Resolution(next(iter(hits)) if len(hits) == 1 else None, sorted(hits))
        if "/" in key:  # Obsidian matches partial paths by suffix
            suffix_hits = {
                n for k, ids in self.keys["path"].items() if k.endswith("/" + key) for n in ids
            }
            if suffix_hits:
                return Resolution(
                    next(iter(suffix_hits)) if len(suffix_hits) == 1 else None, sorted(suffix_hits)
                )
        for kind in ("stem", "alias", "title", "id"):
            hits = self.keys[kind].get(key)
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
