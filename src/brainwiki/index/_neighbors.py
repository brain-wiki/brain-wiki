"""Follow a node's typed edges without reading bodies (design doc 04 §9.2)."""

from __future__ import annotations

from typing import TYPE_CHECKING, Any

from brainwiki.errors import UsageError
from brainwiki.format import INVERSE, SYMMETRIC_RELS
from brainwiki.index._read import resolve_target

if TYPE_CHECKING:
    from brainwiki.engine import Engine

_TYPED = ("supersedes", "conflicts_with", "depends_on", "part_of", "related_to")
_RELATIONS = (*_TYPED, "links_to")
_DIRECTIONS = ("out", "in", "both")
_PRIORITY = {rel: i for i, rel in enumerate(_RELATIONS)}


def neighbors(
    engine: Engine,
    target: str,
    *,
    relations: list[str] | None = None,
    direction: str = "both",
    depth: int = 1,
    limit: int = 30,
) -> dict[str, Any]:
    """A small subgraph around `target`: nodes by depth and the edges between them.

    Within each depth, guards come first, then dependencies, containment, and plain links,
    newest first, so a `limit` keeps the neighbors that matter most.
    """
    rels = list(dict.fromkeys(relations or _TYPED))
    unknown = [r for r in rels if r not in _RELATIONS]
    if unknown:
        raise UsageError(f"unknown relation {unknown[0]!r}; use {', '.join(_RELATIONS)}")
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
    marks = ",".join("?" * len(rels))
    for level in range(1, depth + 1):
        found: list[tuple[int, str, dict[str, Any], dict[str, Any]]] = []
        for current in frontier:
            rows = conn.execute(
                f"""SELECT e.rel, e.src, e.dst, n.id, n.path, n.title, n.type, n.topic, n.status,
                           n.updated
                    FROM edges e JOIN nodes n ON n.id = CASE WHEN e.src = ? THEN e.dst ELSE e.src END
                    WHERE (e.src = ? OR e.dst = ?) AND e.src IS NOT NULL AND e.dst IS NOT NULL
                      AND e.src != e.dst AND e.rel IN ({marks})""",  # noqa: S608 - placeholders only
                (current, current, current, *rels),
            ).fetchall()
            for row in rows:
                outgoing = row["src"] == current
                one_way = row["rel"] not in SYMMETRIC_RELS and direction != "both"
                if one_way and outgoing != (direction == "out"):
                    continue
                edge = {"rel": row["rel"], "src": row["src"], "dst": row["dst"]}
                found.append((_PRIORITY[row["rel"]], current, edge, dict(row)))
        found.sort(key=lambda f: (f[0], -_stamp(f[3]["updated"])))
        next_frontier: list[str] = []
        for _, parent, edge, row in found:
            other = row["id"]
            if other not in nodes:
                if len(nodes) - 1 >= limit:
                    truncated = True
                    continue
                label = _label(edge, parent)
                nodes[other] = _node(row, level, {"from": parent, "relation": label})
                next_frontier.append(other)
            edges.setdefault((edge["rel"], edge["src"], edge["dst"]), edge)
        frontier = next_frontier
        if not frontier:
            break
    _flag(engine, nodes)
    return {
        "brain": engine.brain.display_name,
        "root": root["id"],
        "relations": rels,
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
    """The relation as read from `parent`: incoming part_of reads as has_part, and so on."""
    if edge["src"] == parent or edge["rel"] in SYMMETRIC_RELS:
        return edge["rel"]
    if edge["rel"] == "links_to":
        return "linked_from"
    return INVERSE.get(edge["rel"], edge["rel"])


def _node(row: Any, depth: int, via: dict[str, str] | None) -> dict[str, Any]:
    node = {
        "id": row["id"],
        "path": row["path"],
        "title": row["title"],
        "type": row["type"],
        "topic": row["topic"],
        "status": row["status"],
        "flags": [],
        "depth": depth,
    }
    if via:
        node["via"] = via
    return node


def _flag(engine: Engine, nodes: dict[str, dict[str, Any]]) -> None:
    """Mark nodes in an active conflict, and nodes a newer note supersedes."""
    ids = list(nodes)
    marks = ",".join("?" * len(ids))
    for row in engine.db.execute(
        f"""SELECT e.rel, e.src, e.dst FROM edges e
            JOIN nodes a ON a.id = e.src JOIN nodes b ON b.id = e.dst
            WHERE e.rel IN ('conflicts_with', 'supersedes')
              AND (e.src IN ({marks}) OR e.dst IN ({marks}))
              AND a.status = 'active' AND b.status != 'archived'""",  # noqa: S608 - placeholders only
        (*ids, *ids),
    ):
        if row["rel"] == "conflicts_with":
            for nid in (row["src"], row["dst"]):
                if nid in nodes and "conflict" not in nodes[nid]["flags"]:
                    nodes[nid]["flags"].append("conflict")
        elif (
            row["dst"] in nodes
            and nodes[row["dst"]]["status"] != "superseded"
            and "superseded" not in nodes[row["dst"]]["flags"]
        ):
            nodes[row["dst"]]["flags"].append("superseded")


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
        lines.append("(no neighbors for these relations)")
    if result["truncated"]:
        lines.append("Truncated: raise limit, or narrow relations or direction.")
    return "\n".join(lines)


def _tag(node: dict[str, Any]) -> str:
    status = node["status"].upper() if node["status"] != "active" else node["status"]
    bits = [node["type"], status, node["path"], *node["flags"]]
    return " · ".join(bits)
