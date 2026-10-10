"""Graph export for the visualizer: JSON, GraphML, and a self-contained HTML page (design doc 12 §3)."""

from __future__ import annotations

import base64
import hashlib
import json
import re
import xml.etree.ElementTree as ET
from datetime import UTC, datetime
from pathlib import Path
from typing import TYPE_CHECKING, Any

if TYPE_CHECKING:
    from brainwiki.engine import Engine

ASSETS = Path(__file__).parent / "assets"
PALETTE = (
    "#4e79a7",
    "#f28e2b",
    "#59a14f",
    "#b07aa1",
    "#76b7b2",
    "#edc948",
    "#ff9da7",
    "#9c755f",
    "#bab0ac",
    "#86bcb6",
)
SYMMETRIC = {"conflicts_with", "related_to"}
MAX_RUNS = 20
SKIP_RUN_STATUSES = {"applying", "failed"}
_XML_INVALID = re.compile("[\x00-\x08\x0b\x0c\x0e-\x1f\ufffe\uffff]")


def build_graph(engine: Engine, *, topics: list[str] | None = None) -> dict[str, Any]:
    from brainwiki.index.orient import topic_rows

    engine.scan()
    wanted = set(topics) if topics else None
    rows = _visible_nodes(engine, wanted)
    ids = {row["id"] for row in rows}
    links = _links(engine, ids)
    flags = _flags(engine)
    claims = _claim_counts(engine)
    degree: dict[str, int] = {}
    for link in links:
        if link["typed"]:
            degree[link["source"]] = degree.get(link["source"], 0) + 1
            degree[link["target"]] = degree.get(link["target"], 0) + 1
    nodes = [_node(row, degree, flags, claims) for row in rows]
    topic_list = _topics(topic_rows(engine), nodes, wanted)
    return {
        "brain": engine.brain.display_name,
        "generated": datetime.now(UTC).strftime("%Y-%m-%dT%H:%M:%SZ"),
        "profile": engine.profile.name,
        "privacy": privacy_levels({"nodes": nodes}, engine.manifest.privacy.levels),
        "budgets": {"hub_max_lines": engine.manifest.budgets.hub_max_lines},
        "topics": topic_list,
        "nodes": nodes,
        "links": links,
        "runs": _runs(engine, ids),
    }


def privacy_levels(graph: dict[str, Any], order: list[str] | None = None) -> list[str]:
    present = {n["privacy"] for n in graph["nodes"]}
    ranked = [level for level in (order or []) if level in present]
    return ranked + sorted(present - set(ranked))


def _visible_nodes(engine: Engine, wanted: set[str] | None) -> list[dict[str, Any]]:
    rows = engine.db.execute(
        """SELECT id, path, kind, topic, title, type, status, privacy, privacy_rank, updated,
                  aliases, line_count FROM nodes
           WHERE kind IN ('note','hub','episode') ORDER BY path"""
    ).fetchall()
    out = []
    for row in rows:
        if not engine.visible(row["privacy_rank"], row["topic"]):
            continue
        if wanted is not None and row["topic"] not in wanted:
            continue
        out.append(dict(row))
    return out


def _links(engine: Engine, ids: set[str]) -> list[dict[str, Any]]:
    rows = engine.db.execute(
        """SELECT src, dst, rel, is_guard, verb, qualifier, flip FROM edges
           WHERE src IS NOT NULL AND dst IS NOT NULL AND src != dst
           ORDER BY flip, declared_in, line"""
    ).fetchall()
    seen: set[tuple[str, str, str]] = set()
    links = []
    for row in rows:
        src, dst, rel = row["src"], row["dst"], row["rel"]
        if src not in ids or dst not in ids:
            continue
        a, b = (min(src, dst), max(src, dst)) if rel in SYMMETRIC else (src, dst)
        if (a, b, rel) in seen:
            continue
        seen.add((a, b, rel))
        links.append(
            {
                "source": src,
                "target": dst,
                "rel": rel,
                "typed": rel != "links_to",
                "guard": bool(row["is_guard"]),
                "verb": row["verb"],
                "qualifier": row["qualifier"],
            }
        )
    return links


def _flags(engine: Engine) -> dict[str, list[str]]:
    conn = engine.db
    budget = engine.manifest.budgets.hub_max_lines
    queries = {
        "conflict": (
            """SELECT a.id, b.id FROM edges e JOIN nodes a ON a.id=e.src JOIN nodes b ON b.id=e.dst
               WHERE e.rel='conflicts_with' AND a.status='active' AND b.status='active'
                 AND a.id != b.id""",
            (),
        ),
        "stale": (
            """SELECT DISTINCT e.src FROM edges e JOIN nodes n ON n.id=e.src JOIN nodes d ON d.id=e.dst
               WHERE e.rel='depends_on' AND n.status='active'
                 AND d.status IN ('superseded','archived')""",
            (),
        ),
        "orphan": (
            """SELECT n.id FROM nodes n WHERE n.kind='note' AND NOT EXISTS
               (SELECT 1 FROM edges e WHERE e.dst=n.id AND e.src IS NOT NULL AND e.src != n.id)""",
            (),
        ),
        "unverified": (
            """SELECT DISTINCT node_id FROM claims
               WHERE status='active' AND taint IN ('true','unknown')""",
            (),
        ),
        "over_budget": ("SELECT id FROM nodes WHERE kind='hub' AND line_count > ?", (budget,)),
        "lint_error": (
            "SELECT DISTINCT n.id FROM nodes n JOIN diagnostics d ON d.path = n.path",
            (),
        ),
    }
    flags: dict[str, list[str]] = {}
    for flag, (sql, params) in queries.items():
        for row in conn.execute(sql, params):
            for node_id in row:
                bucket = flags.setdefault(node_id, [])
                if flag not in bucket:
                    bucket.append(flag)
    return flags


def _claim_counts(engine: Engine) -> dict[str, dict[str, int]]:
    rows = engine.db.execute(
        """SELECT node_id,
                  SUM(status='active') AS active,
                  SUM(status='superseded') AS superseded,
                  SUM(status='active' AND taint IN ('true','unknown')) AS unverified
           FROM claims GROUP BY node_id"""
    ).fetchall()
    return {
        r["node_id"]: {
            "claims": r["active"] or 0,
            "superseded_claims": r["superseded"] or 0,
            "unverified_claims": r["unverified"] or 0,
        }
        for r in rows
    }


def _node(
    row: dict[str, Any],
    degree: dict[str, int],
    flags: dict[str, list[str]],
    claims: dict[str, dict[str, int]],
) -> dict[str, Any]:
    try:
        aliases = [str(a) for a in json.loads(row["aliases"] or "[]")]
    except ValueError:
        aliases = []
    counts = claims.get(row["id"], {"claims": 0, "superseded_claims": 0, "unverified_claims": 0})
    return {
        "id": row["id"],
        "title": row["title"],
        "path": row["path"],
        "kind": row["kind"],
        "topic": row["topic"],
        "type": row["type"],
        "status": row["status"],
        "privacy": row["privacy"],
        "updated": (row["updated"] or "")[:10] or None,
        "aliases": aliases,
        "lines": row["line_count"],
        "degree": degree.get(row["id"], 0),
        **counts,
        "flags": list(flags.get(row["id"], [])),
    }


def _topics(
    rows: list[dict[str, Any]], nodes: list[dict[str, Any]], wanted: set[str] | None
) -> list[dict[str, Any]]:
    counts: dict[str, int] = {}
    hubs: dict[str, str] = {}
    for node in nodes:
        if node["topic"] and node["kind"] in ("note", "hub"):
            counts[node["topic"]] = counts.get(node["topic"], 0) + 1
        if node["kind"] == "hub" and node["topic"]:
            hubs.setdefault(node["topic"], node["id"])
    out = []
    for index, row in enumerate(sorted(rows, key=lambda r: r["slug"])):
        if wanted is not None and row["slug"] not in wanted:
            continue
        out.append(
            {
                "slug": row["slug"],
                "title": row["title"],
                "color": PALETTE[index % len(PALETTE)],
                "notes": counts.get(row["slug"], 0),
                "hub": hubs.get(row["slug"]),
            }
        )
    return out


def _runs(engine: Engine, ids: set[str]) -> list[dict[str, Any]]:
    from brainwiki.runs.record import list_records

    episodes_dir = engine.manifest.layout.episodes_dir + "/"
    out: list[dict[str, Any]] = []
    for record in list_records(engine.brain.key):
        if record.status in SKIP_RUN_STATUSES:
            continue
        episodes = sum(1 for f in record.files if f.moved_to or f.path.startswith(episodes_dir))
        paths = [f.final_path for f in record.files if not f.append_only]
        out.append(
            {
                "id": record.run,
                "kind": record.kind,
                "at": record.finished or record.started,
                "episodes": episodes,
                "touched": _resolve_paths(engine, paths, ids),
            }
        )
        if len(out) >= MAX_RUNS:
            break
    return out


def _resolve_paths(engine: Engine, paths: list[str], ids: set[str]) -> list[str]:
    touched: list[str] = []
    for path in paths:
        row = engine.db.execute(
            "SELECT id, kind FROM nodes WHERE path=? "
            "UNION SELECT node_id, 'note' FROM path_history WHERE path=?",
            (path, path),
        ).fetchone()
        if row and row[0] in ids and row[1] in ("note", "hub") and row[0] not in touched:
            touched.append(row[0])
    return touched


# --- serializations -----------------------------------------------------


def to_json(graph: dict[str, Any]) -> str:
    return json.dumps(graph, ensure_ascii=False, indent=2)


def script_json(graph: dict[str, Any]) -> str:
    """JSON safe to embed in a <script> element: no '<', '>' or '&' survive literally."""
    text = json.dumps(graph, ensure_ascii=False, separators=(",", ":"))
    return (
        text.replace("&", "\\u0026")
        .replace("<", "\\u003c")
        .replace(">", "\\u003e")
        .replace("\u2028", "\\u2028")
        .replace("\u2029", "\\u2029")
    )


_NODE_KEYS = (
    ("title", "string"),
    ("kind", "string"),
    ("topic", "string"),
    ("type", "string"),
    ("status", "string"),
    ("privacy", "string"),
    ("updated", "string"),
    ("degree", "int"),
    ("claims", "int"),
    ("flags", "string"),
)
_EDGE_KEYS = (
    ("rel", "string"),
    ("typed", "boolean"),
    ("guard", "boolean"),
    ("verb", "string"),
    ("qualifier", "string"),
)


def _xml_text(value: Any) -> str:
    if isinstance(value, bool):
        return "true" if value else "false"
    if isinstance(value, list):
        value = " ".join(str(v) for v in value)
    return _XML_INVALID.sub("", str(value))


def to_graphml(graph: dict[str, Any]) -> str:
    ns = "http://graphml.graphdrawing.org/xmlns"
    root = ET.Element("graphml", {"xmlns": ns})
    for domain, keys in (("node", _NODE_KEYS), ("edge", _EDGE_KEYS)):
        for name, kind in keys:
            ET.SubElement(
                root,
                "key",
                {"id": f"{domain[0]}_{name}", "for": domain, "attr.name": name, "attr.type": kind},
            )
    g = ET.SubElement(root, "graph", {"id": _xml_text(graph["brain"]), "edgedefault": "directed"})
    for node in graph["nodes"]:
        el = ET.SubElement(g, "node", {"id": _xml_text(node["id"])})
        for name, _ in _NODE_KEYS:
            if node.get(name) not in (None, []):
                ET.SubElement(el, "data", {"key": f"n_{name}"}).text = _xml_text(node[name])
    for index, link in enumerate(graph["links"]):
        el = ET.SubElement(
            g,
            "edge",
            {
                "id": f"e{index}",
                "source": _xml_text(link["source"]),
                "target": _xml_text(link["target"]),
            },
        )
        for name, _ in _EDGE_KEYS:
            if link.get(name) is not None:
                ET.SubElement(el, "data", {"key": f"e_{name}"}).text = _xml_text(link[name])
    ET.indent(root)
    return '<?xml version="1.0" encoding="UTF-8"?>\n' + ET.tostring(root, encoding="unicode") + "\n"


def _sha256_source(text: str) -> str:
    return (
        "'sha256-" + base64.b64encode(hashlib.sha256(text.encode("utf-8")).digest()).decode() + "'"
    )


SCRIPT_FILES = ("vendor/3d-force-graph.min.js", "vendor/force-graph.min.js", "app.js")


def to_standalone_html(graph: dict[str, Any]) -> str:
    template = (ASSETS / "index.html").read_text(encoding="utf-8")
    css = (ASSETS / "app.css").read_text(encoding="utf-8")
    scripts = [(ASSETS / name).read_text(encoding="utf-8") for name in SCRIPT_FILES]
    for body in scripts:
        if re.search(r"</script", body, re.IGNORECASE):
            raise ValueError("an asset contains '</script' and cannot be inlined")
    csp = (
        "default-src 'none'; "
        f"script-src {' '.join(_sha256_source(s) for s in scripts)}; "
        f"style-src {_sha256_source(css)}; "
        "img-src data:; connect-src 'none'"
    )
    html = re.sub(
        r'<link rel="stylesheet" href="/assets/app\.css\?t=__TOKEN__">',
        lambda _: (
            f'<meta http-equiv="Content-Security-Policy" content="{csp}">\n<style>{css}</style>'
        ),
        template,
    )
    html = re.sub(r'\s*<script src="/assets/[^"]+"></script>', "", html)
    data = f'<script type="application/json" id="graph-data">{script_json(graph)}</script>'
    inline = "".join(f"<script>{s}</script>\n" for s in scripts)
    return html.replace("</body>", data + "\n" + inline + "</body>", 1)
