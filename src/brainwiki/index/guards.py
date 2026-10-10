"""Guard co-retrieval: superseding and conflicting notes always come with a hit (design doc 04 §5)."""

from __future__ import annotations

from collections import defaultdict
from typing import TYPE_CHECKING, Any

if TYPE_CHECKING:
    from brainwiki.engine import Engine

MAX_CHAIN = 5
_ORDER = {"superseded_by": 0, "conflicts_with": 1, "supersedes": 2}


def _node(engine: Engine, node_id: str) -> dict[str, Any] | None:
    row = engine.db.execute(
        "SELECT id, title, path, status, updated, privacy_rank, topic FROM nodes WHERE id=?",
        (node_id,),
    ).fetchone()
    return dict(row) if row else None


def _newer_than(engine: Engine, node_id: str) -> list[str]:
    rows = engine.db.execute(
        "SELECT DISTINCT src FROM edges WHERE rel='supersedes' AND dst=? AND src IS NOT NULL",
        (node_id,),
    ).fetchall()
    return [r["src"] for r in rows]


def follow_successors(engine: Engine, node_id: str) -> tuple[str, list[str]]:
    """From a superseding node, walk forward to the newest successor. Returns (head, via chain)."""
    via: list[str] = []
    current = node_id
    seen = {node_id}
    for _ in range(MAX_CHAIN):
        newer = [n for n in _newer_than(engine, current) if n not in seen]
        if not newer:
            break
        via.append(current)
        current = newer[0]
        seen.add(current)
    return current, via


def guards_for(engine: Engine, node_ids: list[str]) -> dict[str, dict[str, Any]]:
    """For each hit, visible guard neighbors (capped, ordered) and counts of hidden ones."""
    result: dict[str, dict[str, Any]] = {
        n: {"guards": [], "hidden_guards": {}, "more_guards": 0} for n in node_ids
    }
    if not node_ids:
        return result
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
                neighbor, via = follow_successors(engine, neighbor)
            key = (label, neighbor)
            if key in per_hit[hit]:
                continue
            per_hit[hit][key] = {
                "label": label,
                "id": neighbor,
                "qualifier": row["qualifier"],
                "note": row["note"],
                "via": via,
            }
    for hit, entries in per_hit.items():
        visible, hidden = [], defaultdict(int)
        for entry in entries.values():
            node = _node(engine, entry["id"])
            if node is None:
                continue
            if not engine.visible(node["privacy_rank"], node["topic"]):
                hidden[entry["label"]] += 1
                continue
            entry.update(
                title=node["title"],
                path=node["path"],
                status=node["status"],
                updated=node["updated"],
            )
            entry["via_titles"] = [
                (_node(engine, v) or {}).get("title", v) for v in entry.pop("via")
            ]
            visible.append(entry)
        visible.sort(key=lambda e: (_ORDER[e["label"]], -_ts(e.get("updated"))))
        result[hit]["guards"] = visible[:cap]
        result[hit]["more_guards"] = max(0, len(visible) - cap)
        result[hit]["hidden_guards"] = dict(hidden)
    return result


def _ts(value: Any) -> float:
    from datetime import datetime

    if not value:
        return 0.0
    try:
        return datetime.fromisoformat(str(value).replace("Z", "+00:00")).timestamp()
    except ValueError:
        return 0.0


def banners(guard_info: dict[str, Any]) -> list[str]:
    lines = []
    for g in guard_info.get("guards", []):
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
    for label, count in guard_info.get("hidden_guards", {}).items():
        lines.append(
            f"⚠ {count} restricted note(s) {label.replace('_', ' ')} this one; you cannot read them."
        )
    if guard_info.get("more_guards"):
        lines.append(
            f"… {guard_info['more_guards']} more related guard notes; use brain_read on this note."
        )
    return lines
