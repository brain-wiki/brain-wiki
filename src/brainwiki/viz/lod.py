"""Level-of-detail payloads for the visualizer: world, topic, health (design doc 12 §2, §6).

Pure functions over a `build_graph` dict; no database access.
"""

from __future__ import annotations

import colorsys
from datetime import UTC, date, datetime, timedelta
from typing import Any

SINGLE_MAX = 12
GROUP_MIN = 4
GROUP_MAX = 40
RECENT_DAYS = 7
MAX_EXTERNAL = 400
FLOWS_PER_TOPIC = 8
MAX_HEALTH = 200
MAX_SEARCH = 20
_PASSES = 50
_EPS = 1e-12

Adjacency = dict[str, dict[str, float]]


# --- constellations -------------------------------------------------------


def topic_weights(nodes: list[dict[str, Any]], links: list[dict[str, Any]]) -> Adjacency:
    """Undirected topic graph: weight = typed links between two different topics."""
    topic_of = {n["id"]: n["topic"] for n in nodes}
    adj: Adjacency = {}
    for link in links:
        if not link["typed"]:
            continue
        a, b = topic_of.get(link["source"]), topic_of.get(link["target"])
        if a is None or b is None or a == b:
            continue
        adj.setdefault(a, {})[b] = adj.setdefault(a, {}).get(b, 0) + 1
        adj.setdefault(b, {})[a] = adj.setdefault(b, {}).get(a, 0) + 1
    return adj


def group_topics(slugs: list[str], adj: Adjacency) -> list[list[str]]:
    """Deterministic constellations: sorted slug lists, largest first."""
    slugs = sorted(set(slugs))
    if len(slugs) <= SINGLE_MAX:
        return [slugs] if slugs else []
    present = set(slugs)
    sub = {s: {t: w for t, w in adj.get(s, {}).items() if t in present} for s in slugs}
    linked = [s for s in slugs if sub[s]]
    unlinked = [s for s in slugs if not sub[s]]
    groups = _merge_small(_cluster(linked, sub), sub) if linked else []
    groups = [part for g in groups for part in _split(g, sub)]
    groups += _chunks(unlinked)
    return sorted(groups, key=lambda g: (-len(g), g[0]))


def tree_groups(
    slugs: list[str], parents: dict[str, str | None], adj: Adjacency
) -> list[list[str]]:
    """Constellations from the topic tree (02 §2): each top-level topic that has sub-topics, with
    everything below it; the remaining topics are grouped by their links (`group_topics`)."""
    present = sorted(set(slugs))
    if len(present) <= SINGLE_MAX:
        return [present] if present else []

    def root(slug: str) -> str:
        seen = {slug}
        while (parent := parents.get(slug)) in present and parent not in seen:
            slug = parent
            seen.add(slug)
        return slug

    by_root: dict[str, list[str]] = {}
    for slug in present:
        by_root.setdefault(root(slug), []).append(slug)
    trees = [members for members in by_root.values() if len(members) > 1]
    rest = [members[0] for members in by_root.values() if len(members) == 1]
    groups = trees + (group_topics(rest, adj) if rest else [])
    return sorted(groups, key=lambda g: (-len(g), g[0]))


def _chunks(slugs: list[str]) -> list[list[str]]:
    return [slugs[i : i + GROUP_MAX] for i in range(0, len(slugs), GROUP_MAX)]


def _split(group: list[str], adj: Adjacency) -> list[list[str]]:
    if len(group) <= GROUP_MAX:
        return [group]
    parts = _merge_small(_cluster(group, adj), adj)
    if len(parts) < 2:
        return _chunks(group)
    return [p for part in parts for p in _split(part, adj)]


def _cluster(members: list[str], adj: Adjacency) -> list[list[str]]:
    """Two levels of Louvain local moving over the subgraph induced by `members`."""
    inside = set(members)
    sub = {m: {t: w for t, w in adj.get(m, {}).items() if t in inside} for m in members}
    degree = {m: float(sum(sub[m].values())) for m in members}
    first = _local_moving(members, sub, degree)
    level1 = _groups(members, first)

    # Second level: each first-level community becomes one node.
    names = [g[0] for g in level1]
    owner = {m: g[0] for g in level1 for m in g}
    agg: Adjacency = {n: {} for n in names}
    for m in members:
        for t, w in sub[m].items():
            a, b = owner[m], owner[t]
            if a != b:
                agg[a][b] = agg[a].get(b, 0) + w
    agg_degree = {g[0]: sum(degree[m] for m in g) for g in level1}
    second = _local_moving(names, agg, agg_degree)
    merged = {m: second[owner[m]] for m in members}
    return _groups(members, merged)


def _local_moving(order: list[str], adj: Adjacency, degree: dict[str, float]) -> dict[str, int]:
    comm = {n: i for i, n in enumerate(order)}
    m2 = sum(degree.values())
    if m2 <= 0:
        return comm
    tot = {i: degree[n] for n, i in comm.items()}
    for _ in range(_PASSES):
        moved = False
        for n in order:
            current = comm[n]
            k = degree[n]
            tot[current] -= k
            weights: dict[int, float] = {}
            for t, w in adj[n].items():
                if t != n:
                    weights[comm[t]] = weights.get(comm[t], 0.0) + w
            best = current
            best_gain = weights.get(current, 0.0) - tot[current] * k / m2
            for c in sorted(weights):
                gain = weights[c] - tot[c] * k / m2
                if gain > best_gain + _EPS or (abs(gain - best_gain) <= _EPS and c < best):
                    best, best_gain = c, gain
            tot[best] += k
            if best != current:
                comm[n] = best
                moved = True
        if not moved:
            break
    return comm


def _groups(order: list[str], comm: dict[str, int]) -> list[list[str]]:
    by: dict[int, list[str]] = {}
    for n in order:
        by.setdefault(comm[n], []).append(n)
    return sorted((sorted(g) for g in by.values()), key=lambda g: g[0])


def _merge_small(groups: list[list[str]], adj: Adjacency) -> list[list[str]]:
    groups = [list(g) for g in groups]
    while len(groups) > 1:
        small = [g for g in groups if len(g) < GROUP_MIN]
        if not small:
            break
        group = min(small, key=lambda g: (len(g), g[0]))
        members = set(group)
        others = [g for g in groups if g is not group]
        strength = [
            sum(adj.get(a, {}).get(b, 0) for a in members for b in other) for other in others
        ]
        if max(strength) > 0:
            target = min(
                range(len(others)), key=lambda i: (-strength[i], len(others[i]), others[i][0])
            )
        else:
            target = min(range(len(others)), key=lambda i: (len(others[i]), others[i][0]))
        others[target] = sorted(others[target] + group)
        groups = others
    return sorted(groups, key=lambda g: g[0])


def _hex(hue: float, saturation: float, lightness: float) -> str:
    r, g, b = colorsys.hls_to_rgb((hue % 360) / 360, lightness, saturation)
    return f"#{round(r * 255):02x}{round(g * 255):02x}{round(b * 255):02x}"


def _frac(x: float) -> float:
    return x - int(x)


def constellation_hue(index: int) -> float:
    return (210 + 137.508 * index) % 360


def constellation_color(index: int) -> str:
    return _hex(constellation_hue(index), 0.70, 0.62)


def topic_color(index: int, position: int) -> str:
    """Constellation hue shifted by up to ±18°, lightness 55–72%, spread by golden ratio."""
    offset = 36 * (_frac(0.5 + position * 0.618034) - 0.5)
    lightness = 0.55 + 0.17 * _frac(0.5 + position * 0.381966)
    return _hex(constellation_hue(index) + offset, 0.70, lightness)


def topic_colors(groups: list[list[str]]) -> dict[str, str]:
    return {slug: topic_color(i, j) for i, g in enumerate(groups) for j, slug in enumerate(g)}


# --- payloads ---------------------------------------------------------------


class Atlas:
    """Precomputed views of one graph for the visualizer's zoom levels."""

    def __init__(self, graph: dict[str, Any], *, today: date | None = None):
        self.graph = graph
        self.today = today or datetime.now(UTC).date()
        self.topics = {t["slug"]: t for t in graph["topics"]}
        self.nodes = {n["id"]: n for n in graph["nodes"]}
        self.notes = [
            n for n in graph["nodes"] if n["kind"] in ("note", "hub") and n["topic"] in self.topics
        ]
        self._topic_of = {n["id"]: n["topic"] for n in self.notes}
        self._adj = topic_weights(self.notes, graph["links"])
        self._parents = {s: t.get("parent") for s, t in self.topics.items()}
        self.groups = tree_groups(list(self.topics), self._parents, self._adj)
        self.colors = topic_colors(self.groups)
        self.constellation_of = {s: f"c{i + 1}" for i, g in enumerate(self.groups) for s in g}
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
        """A note or hub in a visible topic."""
        return self.nodes.get(node_id) if node_id in self._topic_of else None

    def world(self) -> dict[str, Any]:
        if self._world is None:
            self._world = self._build_world()
        return self._world

    def _build_world(self) -> dict[str, Any]:
        g = self.graph
        flagged = [n for n in self.notes if n["flags"]]
        typed = [link for link in g["links"] if link["typed"]]
        constellations = []
        for i, group in enumerate(self.groups):
            ranked = sorted(group, key=lambda s: (-self.topics[s]["notes"], s))
            hub = self._tree_root(group) or self._hub_topic(group)
            if hub:  # the map labels a constellation by its first topic
                ranked = [hub, *(s for s in ranked if s != hub)]
            titles = [self.topics[s]["title"] for s in ranked[:3]]
            constellations.append(
                {
                    "id": f"c{i + 1}",
                    "title": " · ".join(titles) + (" · …" if len(group) > 3 else ""),
                    "color": constellation_color(i),
                    "topics": group,
                }
            )
        return {
            "brain": g["brain"],
            "generated": g["generated"],
            "profile": g["profile"],
            "privacy": g["privacy"],
            "totals": {
                "topics": len(self.topics),
                "notes": sum(1 for n in self.notes if n["kind"] == "note"),
                "hubs": sum(1 for n in self.notes if n["kind"] == "hub"),
                "episodes": self._episode_count(),
                "links": len(typed),
                "flagged": len(flagged),
            },
            "constellations": constellations,
            "topics": self._topic_summaries(),
            "flows": self._flows(typed),
            "episodes": {"count": self._episode_count()},
            "runs": [self._run(r) for r in g["runs"]],
        }

    def _tree_root(self, group: list[str]) -> str | None:
        """The topic every other topic in the group sits under, for a group from the tree."""
        inside = set(group)
        tops = [s for s in group if self._parents.get(s) not in inside]
        return tops[0] if len(tops) == 1 and len(group) > 1 else None

    def _hub_topic(self, group: list[str]) -> str | None:
        """The topic typed-linked to at least half of the others in its group (investing and
        its tickers, people and each person), or None when no topic holds the group together."""
        if len(group) < 3:
            return None
        inside = set(group)
        reach = {s: len(set(self._adj.get(s, {})) & inside - {s}) for s in group}
        best = min(group, key=lambda s: (-reach[s], -self.topics[s]["notes"], s))
        return best if reach[best] * 2 >= len(group) - 1 else None

    def _episode_count(self) -> int:
        return sum(1 for n in self.graph["nodes"] if n["kind"] == "episode")

    def _topic_summaries(self) -> list[dict[str, Any]]:
        cutoff = (self.today - timedelta(days=RECENT_DAYS)).isoformat()
        by_topic: dict[str, list[dict[str, Any]]] = {}
        for node in self.notes:
            by_topic.setdefault(node["topic"], []).append(node)
        out = []
        for group in self.groups:
            for slug in group:
                topic = self.topics[slug]
                members = by_topic.get(slug, [])
                flags: dict[str, int] = {}
                for node in members:
                    for flag in node["flags"]:
                        flags[flag] = flags.get(flag, 0) + 1
                dates = [n["updated"] for n in members if n["updated"]]
                out.append(
                    {
                        "slug": slug,
                        "title": topic["title"],
                        "description": topic.get("description") or "",
                        "parent": topic.get("parent"),
                        "color": self.colors[slug],
                        "constellation": self.constellation_of[slug],
                        "notes": len(members),
                        "hub": topic.get("hub"),
                        "updated": max(dates) if dates else None,
                        "recent": sum(1 for d in dates if d >= cutoff),
                        "flags": flags,
                        "flagged": sum(1 for n in members if n["flags"]),
                    }
                )
        return out

    def _flows(self, typed: list[dict[str, Any]]) -> list[dict[str, Any]]:
        flows: dict[tuple[str, str], dict[str, int]] = {}
        for link in typed:
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
        # the world payload within budget (doc 12 §7).
        kept: dict[str, int] = {}
        out = []
        for flow in ranked:
            a, b = kept.get(flow["a"], 0), kept.get(flow["b"], 0)
            kept[flow["a"]], kept[flow["b"]] = a + 1, b + 1
            if min(a, b) < FLOWS_PER_TOPIC:
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
        for link in [x for x in outer if x["typed"]] + [x for x in outer if not x["typed"]]:
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
            if len(external) >= MAX_EXTERNAL:
                break
        return {
            "slug": slug,
            "title": topic["title"],
            "color": self.colors[slug],
            "hub": topic.get("hub"),
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
                    :MAX_HEALTH
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
