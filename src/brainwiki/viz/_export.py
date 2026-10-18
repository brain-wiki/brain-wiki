"""Graph export for the visualizer: JSON, GraphML, and a self-contained HTML page
(visualizer.md §5).
"""

from __future__ import annotations

import base64
import hashlib
import json
import re
import xml.etree.ElementTree as ET
from datetime import UTC, datetime
from pathlib import Path
from typing import TYPE_CHECKING, Any

from brainwiki.viz._lod import topic_colors, topic_weights, tree_groups

if TYPE_CHECKING:
    from brainwiki.engine import Engine
    from brainwiki.viz._lod import Atlas

APP_DIR = Path(__file__).parent / "app"
_MAX_RUNS = 20
_SKIP_RUN_STATUSES = {"applying", "failed"}
_XML_INVALID = re.compile("[\x00-\x08\x0b\x0c\x0e-\x1f\ufffe\uffff]")


def build_graph(engine: Engine, *, topics: list[str] | None = None) -> dict[str, Any]:
    from brainwiki.index import topic_rows

    engine.scan()
    wanted = engine.topics.expand(topics) if topics else None  # with their sub-topics
    rows = _nodes(engine, wanted)
    ids = {row["id"] for row in rows}
    links = _links(engine, ids)
    flags = _flags(engine)
    degree: dict[str, int] = {}
    for link in links:
        degree[link["source"]] = degree.get(link["source"], 0) + 1
        degree[link["target"]] = degree.get(link["target"], 0) + 1
    nodes = [_node(row, degree, flags) for row in rows]
    topic_list = _topics(topic_rows(engine), nodes, links, wanted)
    return {
        "brain": engine.brain.display_name,
        "generated": datetime.now(UTC).strftime("%Y-%m-%dT%H:%M:%SZ"),
        "profile": engine.profile.name,
        "topics": topic_list,
        "nodes": nodes,
        "links": links,
        "runs": _runs(engine, ids),
    }


def _nodes(engine: Engine, wanted: set[str] | None) -> list[dict[str, Any]]:
    rows = engine.db.execute(
        """SELECT id, path, kind, topic, title, type, status, updated, aliases, line_count
           FROM nodes WHERE kind IN ('note','topic','episode') ORDER BY path"""
    ).fetchall()
    out = []
    for row in rows:
        if wanted is not None and row["topic"] not in wanted:
            continue
        out.append(dict(row))
    return out


def _links(engine: Engine, ids: set[str]) -> list[dict[str, Any]]:
    """Where notes link, one entry per (source, target, relation): body links (`links_to`), the
    relation fields (`part_of`, `depends_on`, `conflicts_with`, `superseded_by`), and `bw-sources`
    (`source`)."""
    rows = engine.db.execute(
        """SELECT src, dst, rel FROM edges
           WHERE src IS NOT NULL AND dst IS NOT NULL AND src != dst
           ORDER BY declared_in, line"""
    ).fetchall()
    seen: set[tuple[str, str, str]] = set()
    links = []
    for row in rows:
        src, dst, rel = row["src"], row["dst"], row["rel"]
        if src not in ids or dst not in ids or (src, dst, rel) in seen:
            continue
        seen.add((src, dst, rel))
        links.append({"source": src, "target": dst, "rel": rel})
    return links


def _flags(engine: Engine) -> dict[str, list[str]]:
    from brainwiki.index import stale_links

    conn = engine.db
    queries = {
        "superseded": ("SELECT id FROM nodes WHERE status='superseded'", ()),
        "orphan": (
            """SELECT n.id FROM nodes n WHERE n.kind='note' AND NOT EXISTS
               (SELECT 1 FROM edges e WHERE e.dst=n.id AND e.src IS NOT NULL AND e.src != n.id)""",
            (),
        ),
        "lint_error": (
            "SELECT DISTINCT n.id FROM nodes n JOIN diagnostics d ON d.path = n.path",
            (),
        ),
    }
    found = {
        flag: [row[0] for row in conn.execute(sql, params)]
        for flag, (sql, params) in queries.items()
    }
    found["stale"] = [row["src"] for row in stale_links(conn)]
    flags: dict[str, list[str]] = {}
    for flag in ("superseded", "stale", "orphan", "lint_error"):
        for node_id in found[flag]:
            bucket = flags.setdefault(node_id, [])
            if flag not in bucket:
                bucket.append(flag)
    return flags


def _node(
    row: dict[str, Any], degree: dict[str, int], flags: dict[str, list[str]]
) -> dict[str, Any]:
    try:
        aliases = [str(a) for a in json.loads(row["aliases"] or "[]")]
    except ValueError:
        aliases = []
    return {
        "id": row["id"],
        "title": row["title"],
        "path": row["path"],
        "kind": row["kind"],
        "topic": row["topic"],
        "type": row["type"],
        "status": row["status"],
        "updated": (row["updated"] or "")[:10] or None,
        "aliases": aliases,
        "lines": row["line_count"],
        "degree": degree.get(row["id"], 0),
        "flags": list(flags.get(row["id"], [])),
    }


def _topics(
    rows: list[dict[str, Any]],
    nodes: list[dict[str, Any]],
    links: list[dict[str, Any]],
    wanted: set[str] | None,
) -> list[dict[str, Any]]:
    counts: dict[str, int] = {}
    pages: dict[str, str] = {}
    for node in nodes:
        if node["topic"] and node["kind"] == "note":  # a topic's page is not one of its notes
            counts[node["topic"]] = counts.get(node["topic"], 0) + 1
        if node["kind"] == "topic" and node["topic"]:
            pages[node["topic"]] = node["id"]
    rows = sorted(
        (r for r in rows if wanted is None or r["slug"] in wanted), key=lambda r: r["slug"]
    )
    notes = [n for n in nodes if n["kind"] in ("note", "topic")]
    shown = {r["slug"] for r in rows}
    parents = {r["slug"]: r.get("parent") if r.get("parent") in shown else None for r in rows}
    groups = tree_groups([r["slug"] for r in rows], parents, topic_weights(notes, links))
    colors = topic_colors(groups)
    return [
        {
            "slug": row["slug"],
            "title": row["title"],
            "description": row.get("description") or "",
            "parent": parents[row["slug"]],
            "path": row.get("path"),
            "color": colors[row["slug"]],
            "notes": counts.get(row["slug"], 0),
            "page": pages.get(row["slug"]),
        }
        for row in rows
    ]


def _runs(engine: Engine, ids: set[str]) -> list[dict[str, Any]]:
    from brainwiki.runs import list_records

    episodes_dir = engine.manifest.layout.episodes_dir + "/"
    out: list[dict[str, Any]] = []
    for record in list_records(engine.brain.key):
        if record.status in _SKIP_RUN_STATUSES:
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
        if len(out) >= _MAX_RUNS:
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
        if row and row[0] in ids and row[1] in ("note", "topic") and row[0] not in touched:
            touched.append(row[0])
    return touched


# --- serializations -----------------------------------------------------


def to_json(graph: dict[str, Any]) -> str:
    return json.dumps(graph, ensure_ascii=False, indent=2)


def _script_json(graph: dict[str, Any]) -> str:
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
    ("updated", "string"),
    ("degree", "int"),
    ("flags", "string"),
)
_EDGE_KEYS = (("rel", "string"),)


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


_TAG_ATTR = re.compile(r'([a-zA-Z-]+)(?:=(?:"([^"]*)"|\'([^\']*)\'|([^\s>]+)))?')
_ASSET_TAG = re.compile(r"<script\b([^>]*)>\s*</script>|<link\b([^>]*?)/?>", re.IGNORECASE)


def _attrs(text: str) -> dict[str, str]:
    return {
        m.group(1).lower(): next((g for g in m.group(2, 3, 4) if g is not None), "")
        for m in _TAG_ATTR.finditer(text)
    }


def _asset_text(app_dir: Path, url: str) -> str:
    if not url.startswith("/assets/"):
        raise ValueError(f"unexpected asset URL in index.html: {url!r}")
    name = url[len("/assets/") :]
    if "/" in name or ".." in name:
        raise ValueError(f"unexpected asset URL in index.html: {url!r}")
    return (app_dir / "assets" / name).read_text(encoding="utf-8")


def to_standalone_html(atlas: Atlas, app_dir: Path | None = None) -> str:
    """The built app with its script and style inlined, CSP-hashed, and every topic embedded."""
    app_dir = app_dir or APP_DIR
    html = (app_dir / "index.html").read_text(encoding="utf-8")
    payload = {
        "world": atlas.world(),
        "topics": {slug: atlas.topic(slug) for slug in atlas.topics},
        "health": atlas.health(),
    }
    data = f'<script type="application/json" id="brain-data">{_script_json(payload)}</script>'
    scripts: list[str] = []
    styles: list[str] = []

    def script(match: re.Match[str]) -> str:
        attrs = _attrs(match.group(1))
        if attrs.get("type") != "module" or "src" not in attrs:
            return match.group(0)
        body = _asset_text(app_dir, attrs["src"])
        if re.search(r"</script", body, re.IGNORECASE):
            raise ValueError("the app script contains '</script' and cannot be inlined")
        scripts.append(body)
        return f'{data}\n<script type="module">{body}</script>'

    def link(match: re.Match[str]) -> str:
        attrs = _attrs(match.group(2))
        rel = attrs.get("rel", "").lower().split()
        if "modulepreload" in rel:
            return ""
        if "stylesheet" not in rel or "href" not in attrs:
            return match.group(0)
        body = _asset_text(app_dir, attrs["href"])
        if re.search(r"</style", body, re.IGNORECASE):
            raise ValueError("the app stylesheet contains '</style' and cannot be inlined")
        styles.append(body)
        return f"<style>{body}</style>"

    # One pass over the original page, so text inside an inlined asset is never rewritten.
    html = _ASSET_TAG.sub(lambda m: script(m) if m.group(1) is not None else link(m), html)
    if len(scripts) != 1:
        raise ValueError(f"expected one module script in index.html, found {len(scripts)}")
    style_src = " ".join(_sha256_source(s) for s in styles) or "'none'"
    csp = (
        "default-src 'none'; "
        f"script-src {_sha256_source(scripts[0])}; "
        f"style-src {style_src}; "
        "img-src data:; connect-src 'none'"
    )
    meta = f'<meta http-equiv="Content-Security-Policy" content="{csp}">'
    head = re.search(r"<head\b[^>]*>", html, re.IGNORECASE)
    if head is None:
        raise ValueError("index.html has no <head>")
    return html[: head.end()] + "\n" + meta + html[head.end() :]
