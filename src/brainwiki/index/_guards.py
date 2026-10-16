"""The supersession guard: a hit on a superseded note always comes with the note that replaced it
(index-and-search.md §5). A note names its replacement in `bw-superseded_by`."""

from __future__ import annotations

from collections import defaultdict
from typing import TYPE_CHECKING, Any

if TYPE_CHECKING:
    import sqlite3

    from brainwiki.engine import Engine

_MAX_CHAIN = 5
_ORDER = {"superseded_by": 0, "supersedes": 1}


def stale_links(conn: sqlite3.Connection) -> list[sqlite3.Row]:
    """Active notes that link to superseded or archived notes, other than the ones they replaced:
    (src, src_path, src_title, dst, dst_path, dst_title, dst_status), one row per pair. Hubs list
    their topic's history, so they are left out."""
    return conn.execute(
        """SELECT DISTINCT a.id AS src, a.path AS src_path, a.title AS src_title,
                  b.id AS dst, b.path AS dst_path, b.title AS dst_title, b.status AS dst_status
           FROM edges e JOIN nodes a ON a.id = e.src JOIN nodes b ON b.id = e.dst
           WHERE e.rel = 'links_to' AND a.status = 'active' AND a.kind = 'note'
             AND b.status IN ('superseded', 'archived')
             AND NOT EXISTS (SELECT 1 FROM edges s WHERE s.rel = 'superseded_by'
                             AND s.src = b.id AND s.dst = a.id)
           ORDER BY a.path, b.path"""
    ).fetchall()


def _node(engine: Engine, node_id: str) -> dict[str, Any] | None:
    row = engine.db.execute(
        "SELECT id, title, path, status, updated, topic FROM nodes WHERE id=?",
        (node_id,),
    ).fetchone()
    return dict(row) if row else None


def _replacements(engine: Engine, node_id: str) -> list[str]:
    rows = engine.db.execute(
        "SELECT DISTINCT dst FROM edges WHERE rel='superseded_by' AND src=? AND dst IS NOT NULL",
        (node_id,),
    ).fetchall()
    return [r["dst"] for r in rows]


def _successor_chain(engine: Engine, node_id: str) -> list[str]:
    """From a replacement, the chain forward to the newest successor (inclusive)."""
    chain = [node_id]
    seen = {node_id}
    for _ in range(_MAX_CHAIN):
        newer = [n for n in _replacements(engine, chain[-1]) if n not in seen]
        if not newer:
            break
        chain.append(newer[0])
        seen.add(newer[0])
    return chain


def guards_for(engine: Engine, node_ids: list[str]) -> dict[str, dict[str, Any]]:
    """For each hit, the notes that replaced it (resolved to the newest) and the notes it
    replaced, capped and ordered. The notes between in a chain are listed in `via_titles`."""
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
        f"""SELECT src, dst FROM edges
            WHERE rel='superseded_by' AND src IS NOT NULL AND dst IS NOT NULL AND src != dst
              AND (src IN ({placeholders}) OR dst IN ({placeholders}))""",  # noqa: S608 - placeholders only
        (*node_ids, *node_ids),
    ).fetchall()
    per_hit: dict[str, dict[tuple[str, str], dict[str, Any]]] = defaultdict(dict)
    cap = engine.manifest.search.max_guards_per_hit
    for row in rows:
        for hit in (row["src"], row["dst"]):
            if hit not in result:
                continue
            old = row["src"] == hit
            neighbor = row["dst"] if old else row["src"]
            label = "superseded_by" if old else "supersedes"
            via: list[str] = []
            if old:
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
        else:
            lines.append(f'↳ supersedes "{g["title"]}" ({g["path"]}).')
    more = max(0, len(guards) - limit) + guard_info.get("more_guards", 0)
    if more:
        pointer = (
            f'brain_neighbors("{target}", direction="in") lists them'
            if target
            else "brain_neighbors lists them"
        )
        lines.append(f"… {more} more replaced notes; {pointer}.")
    return lines
