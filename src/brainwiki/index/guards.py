"""Guard co-retrieval: superseding and conflicting notes always come with a hit (design doc 04 §5)."""

from __future__ import annotations

from collections import defaultdict
from typing import TYPE_CHECKING, Any

if TYPE_CHECKING:
    from brainwiki.engine import Engine

_MAX_CHAIN = 5
_ORDER = {"superseded_by": 0, "conflicts_with": 1, "supersedes": 2}


def _node(engine: Engine, node_id: str) -> dict[str, Any] | None:
    row = engine.db.execute(
        "SELECT id, title, path, status, updated, topic FROM nodes WHERE id=?",
        (node_id,),
    ).fetchone()
    return dict(row) if row else None


def _newer_than(engine: Engine, node_id: str) -> list[str]:
    rows = engine.db.execute(
        "SELECT DISTINCT src FROM edges WHERE rel='supersedes' AND dst=? AND src IS NOT NULL",
        (node_id,),
    ).fetchall()
    return [r["src"] for r in rows]


def _successor_chain(engine: Engine, node_id: str) -> list[str]:
    """From a superseding node, the chain forward to the newest successor (inclusive)."""
    chain = [node_id]
    seen = {node_id}
    for _ in range(_MAX_CHAIN):
        newer = [n for n in _newer_than(engine, chain[-1]) if n not in seen]
        if not newer:
            break
        chain.append(newer[0])
        seen.add(newer[0])
    return chain


def guards_for(engine: Engine, node_ids: list[str]) -> dict[str, dict[str, Any]]:
    """For each hit, its guard neighbors (capped, ordered).

    A supersession chain resolves to its newest successor; the notes between are listed in `via`.
    """
    result: dict[str, dict[str, Any]] = {n: {"guards": [], "more_guards": 0} for n in node_ids}
    if not node_ids:
        return result
    nodes: dict[str, dict[str, Any] | None] = {}

    def node(node_id: str) -> dict[str, Any] | None:
        if node_id not in nodes:
            nodes[node_id] = _node(engine, node_id)
        return nodes[node_id]

    placeholders = ",".join("?" * len(node_ids))
    rows = engine.db.execute(
        f"""SELECT id, src, dst, rel, verb, qualifier, note FROM edges
            WHERE is_guard=1 AND src IS NOT NULL AND dst IS NOT NULL
              AND (src IN ({placeholders}) OR dst IN ({placeholders}))""",  # noqa: S608 - placeholders only
        (*node_ids, *node_ids),
    ).fetchall()
    per_hit: dict[str, dict[tuple[str, str], dict[str, Any]]] = defaultdict(dict)
    cap = engine.manifest.search.max_guards_per_hit
    for row in rows:
        for hit in (row["src"], row["dst"]):
            if hit not in result or row["src"] == row["dst"]:
                continue
            outgoing = row["src"] == hit
            neighbor = row["dst"] if outgoing else row["src"]
            if row["rel"] == "supersedes":
                label = "supersedes" if outgoing else "superseded_by"
            else:
                label = "conflicts_with"
            via: list[str] = []
            if label == "superseded_by":
                chain = [n for n in _successor_chain(engine, neighbor) if node(n) is not None]
                if not chain:
                    continue
                neighbor, via = chain[-1], chain[:-1]
            elif node(neighbor) is None:
                continue
            key = (label, neighbor)
            if key in per_hit[hit]:
                continue
            info = node(neighbor)
            assert info is not None
            per_hit[hit][key] = {
                "label": label,
                "id": neighbor,
                "qualifier": row["qualifier"],
                "note": row["note"],
                "title": info["title"],
                "path": info["path"],
                "status": info["status"],
                "updated": info["updated"],
                "via_titles": [(node(v) or {}).get("title", v) for v in via],
            }
    for hit in result:
        shown = sorted(
            per_hit[hit].values(), key=lambda e: (_ORDER[e["label"]], -_ts(e.get("updated")))
        )
        result[hit]["guards"] = shown[:cap]
        result[hit]["more_guards"] = max(0, len(shown) - cap)
    return result


def _ts(value: Any) -> float:
    from datetime import datetime

    if not value:
        return 0.0
    try:
        return datetime.fromisoformat(str(value).replace("Z", "+00:00")).timestamp()
    except ValueError:
        return 0.0


_BANNER_LIMIT = 3


def banners(
    guard_info: dict[str, Any], target: str | None = None, limit: int = _BANNER_LIMIT
) -> list[str]:
    """Warning lines for a hit or read: the first `limit` guards in full, then a count.

    Guards arrive newest successor first, so a superseded note always shows what replaced it.
    """
    guards = guard_info.get("guards", [])
    lines = []
    for g in guards[:limit]:
        if g["label"] == "superseded_by":
            via = f" (via {', '.join(g['via_titles'])})" if g.get("via_titles") else ""
            lines.append(f'⚠ SUPERSEDED by "{g["title"]}" ({g["path"]}){via}: prefer it.')
        elif g["label"] == "conflicts_with":
            extra = f" ({g['qualifier']})" if g.get("qualifier") else ""
            note = f": {g['note']}" if g.get("note") else ""
            lines.append(
                f'⚠ CONFLICTS WITH "{g["title"]}" ({g["path"]}){extra}{note}: read both before acting.'
            )
        else:
            lines.append(f'↳ supersedes "{g["title"]}" ({g["path"]}).')
    more = max(0, len(guards) - limit) + guard_info.get("more_guards", 0)
    if more:
        pointer = (
            f'brain_neighbors("{target}", relations=["conflicts_with", "supersedes"]) lists them'
            if target
            else "brain_neighbors lists them"
        )
        lines.append(f"… {more} more conflicting or replaced notes; {pointer}.")
    return lines
