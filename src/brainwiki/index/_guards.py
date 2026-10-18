"""Guards (index-and-search.md §5): a hit on a superseded note always comes with the note that
replaced it (`bw-superseded_by`), and a hit on an active note with the active notes it conflicts
with (`bw-conflicts_with`). Also the stale and conflict queries behind `reports/stale.md`."""

from __future__ import annotations

from collections import defaultdict
from typing import TYPE_CHECKING, Any

if TYPE_CHECKING:
    import sqlite3

    from brainwiki.engine import Engine

_MAX_CHAIN = 5
_ORDER = {"superseded_by": 0, "conflicts_with": 1, "supersedes": 2}
# Guards a hit always carries in full; only the notes it replaced (`supersedes`) are capped.
_ALWAYS = ("superseded_by", "conflicts_with")


def stale_links(conn: sqlite3.Connection) -> list[sqlite3.Row]:
    """Active notes that link to superseded or archived notes, other than the ones they replaced:
    (src, src_path, src_title, dst, dst_path, dst_title, dst_status), one row per pair. Topic
    pages list their topic's history, so they are left out."""
    return conn.execute(
        """SELECT DISTINCT a.id AS src, a.path AS src_path, a.title AS src_title,
                  b.id AS dst, b.path AS dst_path, b.title AS dst_title, b.status AS dst_status
           FROM edges e JOIN nodes a ON a.id = e.src JOIN nodes b ON b.id = e.dst
           WHERE e.rel = 'links_to' AND a.status = 'active' AND a.kind = 'note'
             AND b.status IN ('superseded', 'archived')
             AND NOT EXISTS (SELECT 1 FROM edges s WHERE s.rel = 'superseded_by'
                             AND s.src = b.id AND s.dst = a.id)
             AND NOT EXISTS (SELECT 1 FROM edges d WHERE d.rel = 'depends_on'
                             AND d.src = a.id AND d.dst = b.id)
           ORDER BY a.path, b.path"""
    ).fetchall()


# Active notes and topic pages resting on outdated notes. CROSS JOIN pins the order: start from
# the few superseded or archived notes, never scan every edge.
_DEPENDENTS = """FROM nodes b CROSS JOIN edges e CROSS JOIN nodes a
           WHERE b.kind IN ('note', 'topic') AND b.status IN ('superseded', 'archived')
             AND e.dst = b.id AND e.rel = 'depends_on' AND a.id = e.src
             AND a.status = 'active' AND a.kind IN ('note', 'topic')"""


def stale_dependents(conn: sqlite3.Connection) -> list[sqlite3.Row]:
    """Active notes and topic pages that rest (`bw-depends_on`) on superseded or archived notes,
    with the columns of `stale_links`. They need review; a plain link only mentions."""
    return conn.execute(
        f"""SELECT DISTINCT a.id AS src, a.path AS src_path, a.title AS src_title,
                   b.id AS dst, b.path AS dst_path, b.title AS dst_title, b.status AS dst_status
            {_DEPENDENTS} ORDER BY a.path, b.path"""  # noqa: S608 - constant SQL
    ).fetchall()


def review_counts(conn: sqlite3.Connection) -> dict[str, int]:
    """The briefing's counts: open conflicts, and notes resting on an outdated note."""
    dependents = conn.execute(f"SELECT COUNT(DISTINCT a.id) {_DEPENDENTS}").fetchone()[0]  # noqa: S608
    return {"open_conflicts": len(open_conflicts(conn)), "stale_dependents": dependents}


def open_conflicts(conn: sqlite3.Connection) -> list[dict[str, Any]]:
    """Pairs of active notes in conflict (`bw-conflicts_with`), once per pair whichever note holds
    the field: (a, a_path, a_title, b, b_path, b_title), with a_path < b_path."""
    pairs: dict[frozenset[str], dict[str, Any]] = {}
    for r in conn.execute(
        """SELECT a.id AS a, a.path AS a_path, a.title AS a_title,
                  b.id AS b, b.path AS b_path, b.title AS b_title
           FROM edges e JOIN nodes a ON a.id = e.src JOIN nodes b ON b.id = e.dst
           WHERE e.rel = 'conflicts_with' AND e.src != e.dst
             AND a.status = 'active' AND b.status = 'active'"""
    ):
        row = dict(r)
        if row["a_path"] > row["b_path"]:
            row = {
                "a": row["b"],
                "a_path": row["b_path"],
                "a_title": row["b_title"],
                "b": row["a"],
                "b_path": row["a_path"],
                "b_title": row["a_title"],
            }
        pairs.setdefault(frozenset((row["a"], row["b"])), row)
    return sorted(pairs.values(), key=lambda r: (r["a_path"], r["b_path"]))


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
    """For each hit, the notes that replaced it (resolved to the newest), the active notes an
    active hit conflicts with, and the notes it replaced, in that order. Only the replaced notes
    are capped. The notes between in a chain are listed in `via_titles`."""
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
    rows = engine.db.execute(
        f"""SELECT src, dst FROM edges
            WHERE rel='conflicts_with' AND src IS NOT NULL AND dst IS NOT NULL AND src != dst
              AND (src IN ({placeholders}) OR dst IN ({placeholders}))""",  # noqa: S608 - placeholders only
        (*node_ids, *node_ids),
    ).fetchall()
    for row in rows:
        for hit in (row["src"], row["dst"]):
            if hit not in result:
                continue
            neighbor = row["dst"] if row["src"] == hit else row["src"]
            mine, info = node(hit), node(neighbor)
            if not (mine and info and mine["status"] == info["status"] == "active"):
                continue  # once a side is superseded or archived, supersession takes over
            per_hit[hit].setdefault(
                ("conflicts_with", neighbor),
                {
                    "label": "conflicts_with",
                    "id": neighbor,
                    "title": info["title"],
                    "path": info["path"],
                    "status": info["status"],
                    "updated": info["updated"],
                    "via_titles": [],
                },
            )
    for hit in result:
        ordered = sorted(
            per_hit[hit].values(), key=lambda e: (_ORDER[e["label"]], -_ts(e.get("updated")))
        )
        always = [g for g in ordered if g["label"] in _ALWAYS]
        replaced = [g for g in ordered if g["label"] not in _ALWAYS]
        result[hit]["guards"] = always + replaced[:cap]
        result[hit]["more_guards"] = max(0, len(replaced) - cap)
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
    """Warning lines for a hit or read: every replacement and conflict in full, then the notes it
    replaced up to `limit` lines in all, then a count of the rest.
    """
    guards = guard_info.get("guards", [])
    warnings = [g for g in guards if g["label"] in _ALWAYS]
    replaced = [g for g in guards if g["label"] not in _ALWAYS]
    shown = replaced[: max(0, limit - len(warnings))]
    lines = []
    for g in warnings + shown:
        if g["label"] == "superseded_by":
            via = f" (via {', '.join(g['via_titles'])})" if g.get("via_titles") else ""
            lines.append(f'⚠ SUPERSEDED by "{g["title"]}" ({g["path"]}){via}: prefer it.')
        elif g["label"] == "conflicts_with":
            lines.append(f'⚠ CONFLICTS with "{g["title"]}" ({g["path"]}): read both before acting.')
        else:
            lines.append(f'↳ supersedes "{g["title"]}" ({g["path"]}).')
    more = len(replaced) - len(shown) + guard_info.get("more_guards", 0)
    if more:
        pointer = (
            f'brain_neighbors("{target}", direction="in") lists them'
            if target
            else "brain_neighbors lists them"
        )
        lines.append(f"… {more} more replaced notes; {pointer}.")
    return lines
