"""Follow a note's links without reading bodies (docs/design/index-and-search.md §9.2)."""

from __future__ import annotations

from typing import TYPE_CHECKING, Any

from brainwiki.errors import UsageError
from brainwiki.index._read import resolve_target

if TYPE_CHECKING:
    from brainwiki.engine import Engine

_DIRECTIONS = ("out", "in", "both")
# Supersession first, so a `limit` keeps the replacement; then body links; then citations.
_PRIORITY = {"superseded_by": 0, "links_to": 1, "source": 2}
# How an edge reads from each end: (from the note holding it, from the note it points to).
_LABELS = {
    "superseded_by": ("superseded_by", "supersedes"),
    "links_to": ("links_to", "linked_from"),
    "source": ("cites", "cited_by"),
}


def neighbors(
    engine: Engine,
    target: str,
    *,
    direction: str = "both",
    depth: int = 1,
    limit: int = 30,
) -> dict[str, Any]:
    """A small subgraph around `target`: the notes it links to (`out`), the notes that link to
    it (`in`), or both, by depth. Within each depth, supersession comes first, newest first."""
    if direction not in _DIRECTIONS:
        raise UsageError(f"direction must be one of {', '.join(_DIRECTIONS)}")
    depth = max(1, min(3, depth))
    limit = max(1, min(100, limit))
    root = resolve_target(engine, target)
    conn = engine.db
    nodes: dict[str, dict[str, Any]] = {root["id"]: _node(root, 0, None)}
    edges: dict[tuple[str, str, str], dict[str, str]] = {}
    truncated = False
    frontier = [root["id"]]
    for level in range(1, depth + 1):
        found: list[tuple[int, str, dict[str, Any], dict[str, Any]]] = []
        for current in frontier:
            rows = conn.execute(
                """SELECT e.rel, e.src, e.dst, n.id, n.path, n.title, n.type, n.topic, n.status,
                          n.updated
                   FROM edges e JOIN nodes n ON n.id = CASE WHEN e.src = ? THEN e.dst ELSE e.src END
                   WHERE (e.src = ? OR e.dst = ?) AND e.src IS NOT NULL AND e.dst IS NOT NULL
                     AND e.src != e.dst""",
                (current, current, current),
            ).fetchall()
            for row in rows:
                outgoing = row["src"] == current
                if direction != "both" and outgoing != (direction == "out"):
                    continue
                edge = {"rel": row["rel"], "src": row["src"], "dst": row["dst"]}
                found.append((_PRIORITY.get(row["rel"], 9), current, edge, dict(row)))
        found.sort(key=lambda f: (f[0], -_stamp(f[3]["updated"]), f[3]["path"]))
        next_frontier: list[str] = []
        for _, parent, edge, row in found:
            other = row["id"]
            if other not in nodes:
                if len(nodes) - 1 >= limit:
                    truncated = True
                    continue
                nodes[other] = _node(row, level, {"from": parent, "relation": _label(edge, parent)})
                next_frontier.append(other)
            edges.setdefault((edge["rel"], edge["src"], edge["dst"]), edge)
        frontier = next_frontier
        if not frontier:
            break
    return {
        "brain": engine.brain.display_name,
        "root": root["id"],
        "direction": direction,
        "depth": depth,
        "nodes": list(nodes.values()),
        "edges": list(edges.values()),
        "truncated": truncated,
    }


def _stamp(updated: Any) -> float:
    from brainwiki.index._guards import _ts

    return _ts(updated)


def _label(edge: dict[str, str], parent: str) -> str:
    forward, backward = _LABELS.get(edge["rel"], (edge["rel"], edge["rel"]))
    return forward if edge["src"] == parent else backward


def _node(row: Any, depth: int, via: dict[str, str] | None) -> dict[str, Any]:
    node = {
        "id": row["id"],
        "path": row["path"],
        "title": row["title"],
        "type": row["type"],
        "topic": row["topic"],
        "status": row["status"],
        "depth": depth,
    }
    if via:
        node["via"] = via
    return node


def format_neighbors_text(result: dict[str, Any]) -> str:
    nodes = result["nodes"]
    root = nodes[0]
    lines = [f'"{root["title"]}"  [{_tag(root)}]']
    children: dict[str, list[dict[str, Any]]] = {}
    for node in nodes[1:]:
        children.setdefault(node["via"]["from"], []).append(node)

    def walk(parent: str, indent: str) -> None:
        for node in children.get(parent, []):
            lines.append(f'{indent}- {node["via"]["relation"]} "{node["title"]}"  [{_tag(node)}]')
            walk(node["id"], indent + "  ")

    walk(root["id"], "")
    if len(nodes) == 1:
        lines.append("(no linked notes)")
    if result["truncated"]:
        lines.append("Truncated: raise limit, or narrow the direction.")
    return "\n".join(lines)


def _tag(node: dict[str, Any]) -> str:
    status = node["status"].upper() if node["status"] != "active" else node["status"]
    return " · ".join([node["type"], status, node["path"]])
