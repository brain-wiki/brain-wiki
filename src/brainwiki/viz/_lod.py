"""Level-of-detail payloads for the visualizer: world, topic, health (visualizer.md §2, §6).

Pure functions over a `build_graph` dict; no database access.
"""

from __future__ import annotations

import colorsys
import re
from datetime import UTC, date, datetime, timedelta
from typing import Any

_RECENT_DAYS = 7
_MAX_EXTERNAL = 400
_FLOWS_PER_TOPIC = 8
_MAX_HEALTH = 200
MAX_SEARCH = 20
_DIGITS = re.compile(r"(\d+)")


# --- the topic tree ---------------------------------------------------------


def _natural(name: str) -> list[Any]:
    """A sort key that compares runs of digits as numbers and ignores case, as Obsidian's file
    explorer orders names. Split on digits, the parts alternate text and number, so keys compare
    part by part without mixing types."""
    return [int(p) if i % 2 else p.casefold() for i, p in enumerate(_DIGITS.split(name))]


def _root(slug: str, parents: dict[str, str | None]) -> str:
    seen = {slug}
    while (parent := parents.get(slug)) is not None and parent in parents and parent not in seen:
        slug = parent
        seen.add(slug)
    return slug


def tree_order(
    slugs: list[str], parents: dict[str, str | None], names: dict[str, str]
) -> list[str]:
    """Topics depth first, siblings by folder name with numbers compared as numbers."""
    present = set(slugs)
    children: dict[str | None, list[str]] = {}
    for slug in slugs:
        parent = parents.get(slug)
        children.setdefault(parent if parent in present else None, []).append(slug)
    for kids in children.values():
        kids.sort(key=lambda s: (_natural(names.get(s) or s), s))
    out: list[str] = []
    stack = list(reversed(children.get(None, [])))
    while stack:
        slug = stack.pop()
        if slug in out:  # a cycle in malformed input
            continue
        out.append(slug)
        stack.extend(reversed(children.get(slug, [])))
    return out + sorted(present - set(out))


def _hex(hue: float, saturation: float, lightness: float) -> str:
    r, g, b = colorsys.hls_to_rgb((hue % 360) / 360, lightness, saturation)
    return f"#{round(r * 255):02x}{round(g * 255):02x}{round(b * 255):02x}"


def _frac(x: float) -> float:
    return x - int(x)


def _topic_color(index: int, position: int) -> str:
    """The hue of top-level topic `index`, spread by the golden angle, shifted by up to ±18° and
    lightened to 55–72% for its sub-topics in order."""
    offset = 36 * (_frac(0.5 + position * 0.618034) - 0.5)
    lightness = 0.55 + 0.17 * _frac(0.5 + position * 0.381966)
    return _hex(210 + 137.508 * index + offset, 0.70, lightness)


def topic_colors(order: list[str], parents: dict[str, str | None]) -> dict[str, str]:
    """One hue per top-level topic; its sub-topics vary around it (`order` is `tree_order`)."""
    hue: dict[str, int] = {}
    seen: dict[str, int] = {}
    colors = {}
    for slug in order:
        root = _root(slug, parents)
        index = hue.setdefault(root, len(hue))
        colors[slug] = _topic_color(index, seen.get(root, 0))
        seen[root] = seen.get(root, 0) + 1
    return colors


def folder_name(topic: dict[str, Any]) -> str:
    path = topic.get("path") or ""
    return path.rstrip("/").rsplit("/", 1)[-1] or topic["slug"]


# --- payloads ---------------------------------------------------------------


class Atlas:
    """Precomputed views of one graph for the visualizer's zoom levels."""

    def __init__(self, graph: dict[str, Any], *, today: date | None = None):
        self.graph = graph
        self.today = today or datetime.now(UTC).date()
        self.topics = {t["slug"]: t for t in graph["topics"]}
        self.nodes = {n["id"]: n for n in graph["nodes"]}
        self.notes = [
            n
            for n in graph["nodes"]
            if n["kind"] in ("note", "topic") and n["topic"] in self.topics
        ]
        self._topic_of = {n["id"]: n["topic"] for n in self.notes}
        self._parents = {s: t.get("parent") for s, t in self.topics.items()}
        names = {s: folder_name(t) for s, t in self.topics.items()}
        self.order = tree_order(list(self.topics), self._parents, names)
        self.colors = topic_colors(self.order, self._parents)
        self._inner: dict[str, list[dict[str, Any]]] = {}
        self._outer: dict[str, list[dict[str, Any]]] = {}
        for link in graph["links"]:
            a, b = self._topic_of.get(link["source"]), self._topic_of.get(link["target"])
            if a is not None and a == b:
                self._inner.setdefault(a, []).append(link)
                continue
            for mine, other in ((a, b), (b, a)):
                if mine is not None and other is not None:
                    self._outer.setdefault(mine, []).append(link)
        self._world: dict[str, Any] | None = None

    def note(self, node_id: str) -> dict[str, Any] | None:
        """A note or topic page in one of the map's topics."""
        return self.nodes.get(node_id) if node_id in self._topic_of else None

    def world(self) -> dict[str, Any]:
        if self._world is None:
            self._world = self._build_world()
        return self._world

    def _build_world(self) -> dict[str, Any]:
        g = self.graph
        flagged = [n for n in self.notes if n["flags"]]
        links = g["links"]
        return {
            "brain": g["brain"],
            "generated": g["generated"],
            "profile": g["profile"],
            "totals": {
                "topics": len(self.topics),
                "notes": sum(1 for n in self.notes if n["kind"] == "note"),
                "pages": sum(1 for n in self.notes if n["kind"] == "topic"),
                "episodes": self._episode_count(),
                "links": len(links),
                "flagged": len(flagged),
            },
            "topics": self._topic_summaries(),
            "flows": self._flows(links),
            "episodes": {"count": self._episode_count()},
            "runs": [self._run(r) for r in g["runs"]],
        }

    def _episode_count(self) -> int:
        return sum(1 for n in self.graph["nodes"] if n["kind"] == "episode")

    def _topic_summaries(self) -> list[dict[str, Any]]:
        cutoff = (self.today - timedelta(days=_RECENT_DAYS)).isoformat()
        by_topic: dict[str, list[dict[str, Any]]] = {}
        for node in self.notes:
            by_topic.setdefault(node["topic"], []).append(node)
        own = {s: sum(n.get("chars") or 0 for n in by_topic.get(s, [])) for s in self.order}
        tree = dict(own)
        for slug in reversed(self.order):  # children come after their parent
            parent = self._parents.get(slug)
            if parent in tree:
                tree[parent] += tree[slug]
        out = []
        for slug in self.order:
            topic = self.topics[slug]
            members = by_topic.get(slug, [])
            flags: dict[str, int] = {}
            for node in members:
                for flag in node["flags"]:
                    flags[flag] = flags.get(flag, 0) + 1
            dates = [n["updated"] for n in members if n["updated"]]
            notes = [n for n in members if n["kind"] == "note"]  # not the topic page
            parent = topic.get("parent")
            out.append(
                {
                    "slug": slug,
                    "title": topic["title"],
                    "name": folder_name(topic),
                    "description": topic.get("description") or "",
                    "parent": parent if parent in self.topics else None,
                    "depth": len(self._ancestors(slug)),
                    "color": self.colors[slug],
                    "notes": len(notes),
                    "page": topic.get("page"),
                    "chars": own[slug],
                    "tree_chars": tree[slug],
                    "updated": max(dates) if dates else None,
                    "recent": sum(1 for n in notes if (n["updated"] or "") >= cutoff),
                    "flags": flags,
                    "flagged": sum(1 for n in members if n["flags"]),
                }
            )
        return out

    def _ancestors(self, slug: str) -> list[str]:
        out: list[str] = []
        while (parent := self._parents.get(slug)) in self.topics and parent not in out:
            out.append(parent)
            slug = parent
        return out

    def _flows(self, links: list[dict[str, Any]]) -> list[dict[str, Any]]:
        """Typed links between the notes of two topics; body links are not drawn, and the map adds
        the flows up between top-level topics (visualizer.md §3)."""
        flows: dict[tuple[str, str], dict[str, int]] = {}
        for link in links:
            if link["rel"] == "links_to":
                continue
            a, b = self._topic_of.get(link["source"]), self._topic_of.get(link["target"])
            if a is None or b is None or a == b:
                continue
            rels = flows.setdefault((min(a, b), max(a, b)), {})
            rels[link["rel"]] = rels.get(link["rel"], 0) + 1
        ranked = sorted(
            (
                {"a": a, "b": b, "total": sum(rels.values()), "rels": dict(sorted(rels.items()))}
                for (a, b), rels in flows.items()
            ),
            key=lambda f: (-f["total"], f["a"], f["b"]),
        )
        # Large brains link almost every pair of topics; each topic's strongest flows keep
        # the world payload within budget (visualizer.md §7).
        kept: dict[str, int] = {}
        out = []
        for flow in ranked:
            a, b = kept.get(flow["a"], 0), kept.get(flow["b"], 0)
            kept[flow["a"]], kept[flow["b"]] = a + 1, b + 1
            if min(a, b) < _FLOWS_PER_TOPIC:
                out.append(flow)
        return out

    def _run(self, run: dict[str, Any]) -> dict[str, Any]:
        topics: dict[str, int] = {}
        for node_id in run["touched"]:
            slug = self._topic_of.get(node_id)
            if slug is not None:
                topics[slug] = topics.get(slug, 0) + 1
        return {
            "id": run["id"],
            "kind": run["kind"],
            "at": run["at"],
            "episodes": run["episodes"],
            "topics": topics,
            "touched": list(run["touched"]),
        }

    def topic(self, slug: str) -> dict[str, Any] | None:
        topic = self.topics.get(slug)
        if topic is None:
            return None
        external = []
        outer = self._outer.get(slug, [])
        for link in sorted(outer, key=lambda x: x["rel"] == "links_to"):
            out = self._topic_of[link["source"]] == slug
            other = self.nodes[link["target"] if out else link["source"]]
            external.append(
                {
                    "source": link["source"],
                    "target": link["target"],
                    "rel": link["rel"],
                    "topic": other["topic"],
                    "title": other["title"],
                    "dir": "out" if out else "in",
                }
            )
            if len(external) >= _MAX_EXTERNAL:
                break
        return {
            "slug": slug,
            "title": topic["title"],
            "color": self.colors[slug],
            "page": topic.get("page"),
            "path": topic.get("path"),  # the map places notes by the folders below it
            "nodes": [n for n in self.notes if n["topic"] == slug],
            "links": list(self._inner.get(slug, [])),
            "external": external,
        }

    def health(self) -> dict[str, Any]:
        items: dict[str, list[dict[str, Any]]] = {}
        for node in self.notes:
            for flag in node["flags"]:
                items.setdefault(flag, []).append(
                    {"id": node["id"], "title": node["title"], "topic": node["topic"]}
                )
        counts = {flag: len(rows) for flag, rows in sorted(items.items())}
        return {
            "counts": counts,
            "items": {
                flag: sorted(items[flag], key=lambda r: (r["topic"], r["title"], r["id"]))[
                    :_MAX_HEALTH
                ]
                for flag in counts
            },
        }

    def search_titles(self, query: str, limit: int = MAX_SEARCH) -> list[dict[str, Any]]:
        """Notes whose title or an alias contains `query` (case-insensitive), prefix matches first."""
        q = query.strip().casefold()
        if not q:
            return []
        hits = []
        for node in self.notes:
            names = [node["title"] or "", *node["aliases"]]
            folded = [name.casefold() for name in names]
            if not any(q in name for name in folded):
                continue
            prefix = any(name.startswith(q) for name in folded)
            hits.append((not prefix, (node["title"] or "").casefold(), node["id"], node))
        hits.sort(key=lambda h: h[:3])
        return [
            {
                "id": n["id"],
                "title": n["title"],
                "topic": n["topic"],
                "kind": n["kind"],
                "snippet": None,
            }
            for *_, n in hits[:limit]
        ]
