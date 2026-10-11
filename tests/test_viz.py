from __future__ import annotations

import base64
import hashlib
import http.client
import importlib.util
import json
import re
import shutil
import threading
import xml.etree.ElementTree as ET
from collections.abc import Iterator
from pathlib import Path

import pytest
from tests.conftest import write

from brainwiki.config.resolve import open_brain
from brainwiki.engine import Engine
from brainwiki.viz import export
from brainwiki.viz import server as viz_server
from brainwiki.viz.export import (
    build_graph,
    script_json,
    to_graphml,
    to_standalone_html,
)
from brainwiki.viz.lod import GROUP_MAX, Atlas, group_topics, topic_weights
from brainwiki.viz.server import CSP, VizServer, make_server

FIXTURE = Path(__file__).parent / "fixtures" / "example-brain"
FTS5 = "01M4KT3JPRY4W6766VT18CQS91"
RIPGREP = "01M4KT3JPSB7BP2SNSCAVC2SF5"
VECTOR = "01M4KT3JPSB7BP2SNSCAVC2SF6"
POLICY = "01M4KT3JPSB7BP2SNSCAVC2SF8"
GPU = "01M4KT3JPSB7BP2SNSCAVC2SFA"
BUDGET_HUB = "01M4KT3JPSB7BP2SNSCAVC2SF9"
EPISODE = "01M4KT3JPSB7BP2SNSCAVC2SFB"
EVIL = '</script><script>alert("x")</script><img src=x onerror=alert(1)>'


@pytest.fixture
def example(tmp_path: Path) -> Path:
    root = tmp_path / "example"
    shutil.copytree(FIXTURE, root)
    return root


def engine_for(root: Path, host: str | None = None) -> Engine:
    return Engine(open_brain(root), host=host)


def _node(graph: dict, node_id: str) -> dict:
    return next(n for n in graph["nodes"] if n["id"] == node_id)


def _typed(graph: dict) -> set[tuple[str, str, str]]:
    return {
        (link["source"], link["target"], link["rel"]) for link in graph["links"] if link["typed"]
    }


def test_graph_nodes_links_and_flags(example: Path):
    with engine_for(example) as eng:
        graph = build_graph(eng)
    assert graph["brain"] == "example"
    assert graph["profile"] == "owner"
    kinds = {n["id"]: n["kind"] for n in graph["nodes"]}
    assert kinds[FTS5] == "note"
    assert kinds["01M4KT3JPRY4W6766VT18CQS90"] == "hub"
    assert kinds[EPISODE] == "episode"
    assert len([k for k in kinds.values() if k in ("note", "hub")]) == 8

    typed = _typed(graph)
    assert (FTS5, RIPGREP, "supersedes") in typed
    assert (FTS5, VECTOR, "conflicts_with") in typed
    assert (GPU, VECTOR, "conflicts_with") in typed
    depends = [link for link in graph["links"] if link["rel"] == "depends_on"]
    assert [(link["source"], link["target"]) for link in depends] == [(FTS5, POLICY)]
    assert depends[0]["verb"] == "depends_on"
    supersedes = next(link for link in graph["links"] if link["rel"] == "supersedes")
    assert supersedes["guard"] is True
    assert supersedes["qualifier"] == "replaced"
    body = [link for link in graph["links"] if link["rel"] == "links_to"]
    assert body
    assert all(not link["typed"] and not link["guard"] for link in body)

    assert "conflict" in _node(graph, FTS5)["flags"]
    assert "conflict" in _node(graph, VECTOR)["flags"]
    assert "conflict" in _node(graph, GPU)["flags"]
    assert "conflict" not in _node(graph, RIPGREP)["flags"]
    assert _node(graph, RIPGREP)["status"] == "superseded"
    assert not any("stale" in n["flags"] or "orphan" in n["flags"] for n in graph["nodes"])

    fts5 = _node(graph, FTS5)
    assert fts5["degree"] == 4
    assert fts5["claims"] == 1
    assert fts5["superseded_claims"] == 1
    assert fts5["aliases"] == ["FTS5 decision"]
    assert fts5["updated"] == "2026-10-01"

    topics = {t["slug"]: t for t in graph["topics"]}
    assert set(topics) == {"budget", "search", "storage"}
    assert topics["search"]["notes"] == 4
    assert topics["search"]["hub"] == "01M4KT3JPRY4W6766VT18CQS90"
    assert topics["search"]["description"] == "How local search works and why."
    assert len({t["color"] for t in topics.values()}) == 3
    assert graph["privacy"] == ["default", "sensitive"]
    assert graph["runs"] == []


def test_graph_respects_profile(example: Path):
    with engine_for(example, host="someone") as eng:
        graph = build_graph(eng)
    ids = {n["id"] for n in graph["nodes"]}
    assert GPU not in ids
    assert BUDGET_HUB not in ids
    assert FTS5 in ids
    assert all(GPU not in (link["source"], link["target"]) for link in graph["links"])
    assert "budget" not in {t["slug"] for t in graph["topics"]}
    assert graph["privacy"] == ["default"]
    assert graph["profile"] == "default"
    assert "conflict" in _node(graph, VECTOR)["flags"]


def test_graph_topic_filter(example: Path):
    with engine_for(example) as eng:
        graph = build_graph(eng, topics=["storage"])
    assert {n["topic"] for n in graph["nodes"]} == {"storage"}
    assert [t["slug"] for t in graph["topics"]] == ["storage"]
    assert all(link["source"] != FTS5 and link["target"] != FTS5 for link in graph["links"])


def test_health_flags(example: Path):
    write(
        example,
        "topics/search/legacy-cli.md",
        "---\nid: 01M4KT3JPSB7BP2SNSCAVC2SFC\ntitle: Legacy CLI search\n---\n"
        "# Legacy CLI search\n\n## Claims\n"
        "- The CLI pipes results through grep. <!-- id:c-01M4KT3JPSB7BP2SNSCAVC2SFF; taint:true -->\n\n"
        "## Relations\n- depends_on [[ripgrep]]\n",
    )
    write(example, "topics/search/broken.md", "---\ntitle: [unclosed\n---\n# Broken\n")
    hub = (
        "---\ntitle: Storage\ntype: hub\n---\n# Storage\n\n## Notes\n- [[sqlite-version-policy]]\n"
    )
    write(example, "topics/storage/index.md", hub + "".join(f"\nline {i}" for i in range(160)))
    with engine_for(example) as eng:
        graph = build_graph(eng)
    legacy = _node(graph, "01M4KT3JPSB7BP2SNSCAVC2SFC")
    assert {"stale", "orphan", "unverified"} <= set(legacy["flags"])
    assert legacy["unverified_claims"] == 1
    broken = next(n for n in graph["nodes"] if n["path"] == "topics/search/broken.md")
    assert "lint_error" in broken["flags"]
    storage = next(n for n in graph["nodes"] if n["path"] == "topics/storage/index.md")
    assert "over_budget" in storage["flags"]
    assert "over_budget" not in _node(graph, FTS5)["flags"]


def test_runs_from_records(example: Path):
    from brainwiki.ids import run_id
    from brainwiki.runs.record import FileChange, RunRecord, save_record

    with engine_for(example) as eng:
        made = []
        for finished in ("2026-10-09T10:00:00Z", "2026-10-10T19:40:03Z"):
            record = RunRecord(
                run=run_id(),
                kind="consolidate",
                brain=eng.manifest.id,
                started=finished,
                finished=finished,
                status="applied",
                files=[
                    FileChange("topics/search/fts5.md", "a", "b"),
                    FileChange("topics/budget/gpu-freeze.md", "a", "b"),
                    FileChange("inbox/episodes/2026/10/X.md", "c", "c", moved_to="archive/x.md"),
                    FileChange("log.md", "d", "e", append_only=True),
                ],
            )
            save_record(eng.brain.key, record)
            made.append(record.run)
        failed = RunRecord(run=run_id(), kind="consolidate", brain="x", started="", status="failed")
        save_record(eng.brain.key, failed)
        owner = build_graph(eng)["runs"]
    assert [r["id"] for r in owner] == made[::-1]
    assert owner[0] == {
        "id": made[1],
        "kind": "consolidate",
        "at": "2026-10-10T19:40:03Z",
        "episodes": 1,
        "touched": [FTS5, GPU],
    }
    with engine_for(example, host="someone") as eng:
        hidden = build_graph(eng)["runs"]
    assert hidden[0]["touched"] == [FTS5]


def test_graphml_well_formed(example: Path):
    write(example, "topics/search/evil.md", f"---\ntitle: '{EVIL} &'\n---\n# Evil\n")
    with engine_for(example) as eng:
        graph = build_graph(eng)
    root = ET.fromstring(to_graphml(graph).encode("utf-8"))
    ns = {"g": "http://graphml.graphdrawing.org/xmlns"}
    nodes = root.findall("g:graph/g:node", ns)
    edges = root.findall("g:graph/g:edge", ns)
    assert len(nodes) == len(graph["nodes"])
    assert len(edges) == len(graph["links"])
    titles = [d.text for d in root.iterfind("g:graph/g:node/g:data[@key='n_title']", ns)]
    assert any(t and t.startswith("</script>") for t in titles)


APP_JS = 'import "./x";\nconsole.log("brain map");\n'
APP_CSS = "body { margin: 0; }\n"


@pytest.fixture
def app_dir(tmp_path: Path, monkeypatch: pytest.MonkeyPatch) -> Path:
    """A stand-in for the Vite build, so tests never depend on the real front end."""
    root = tmp_path / "app"
    (root / "assets").mkdir(parents=True)
    (root / "index.html").write_text(
        '<!doctype html>\n<html><head>\n<meta charset="utf-8">\n<title>brain</title>\n'
        '<script type="module" crossorigin src="/assets/index-test.js"></script>\n'
        '<link rel="modulepreload" crossorigin href="/assets/vendor-test.js">\n'
        '<link rel="stylesheet" crossorigin href="/assets/index-test.css">\n'
        '</head><body><div id="app"></div></body></html>\n',
        encoding="utf-8",
    )
    (root / "assets" / "index-test.js").write_text(APP_JS, encoding="utf-8")
    (root / "assets" / "index-test.css").write_text(APP_CSS, encoding="utf-8")
    (root / "assets" / "font.woff2").write_bytes(b"wOF2")
    monkeypatch.setattr(viz_server, "APP_DIR", root)
    monkeypatch.setattr(export, "APP_DIR", root)
    return root


def _atlas(root: Path, host: str | None = None) -> Atlas:
    with engine_for(root, host) as eng:
        return Atlas(build_graph(eng))


def test_world_shape_and_totals(example: Path):
    world = _atlas(example).world()
    assert set(world) == {
        "brain",
        "generated",
        "profile",
        "privacy",
        "totals",
        "constellations",
        "topics",
        "flows",
        "episodes",
        "runs",
    }
    assert world["totals"] == {
        "topics": 3,
        "notes": 5,
        "hubs": 3,
        "episodes": 1,
        "links": 9,
        "flagged": 3,
    }
    assert world["episodes"] == {"count": 1}
    [only] = world["constellations"]
    assert only["id"] == "c1"
    assert sorted(only["topics"]) == ["budget", "search", "storage"]
    assert re.fullmatch(r"#[0-9a-f]{6}", only["color"])
    topics = {t["slug"]: t for t in world["topics"]}
    search = topics["search"]
    assert search["notes"] == 4
    assert search["hub"] == "01M4KT3JPRY4W6766VT18CQS90"
    assert search["description"] == "How local search works and why."
    assert search["constellation"] == "c1"
    assert search["flags"] == {"conflict": 2}
    assert search["flagged"] == 2
    assert len({t["color"] for t in topics.values()}) == 3
    flows = {(f["a"], f["b"]): f for f in world["flows"]}
    assert flows[("search", "storage")]["rels"] == {"depends_on": 1}
    assert flows[("budget", "search")]["rels"] == {"conflicts_with": 1}
    assert all(f["a"] < f["b"] for f in world["flows"])


def test_world_recent_counts_last_week(example: Path):
    with engine_for(example) as eng:
        graph = build_graph(eng)
    dates = sorted(n["updated"] for n in graph["nodes"] if n["topic"] == "search" and n["updated"])
    from datetime import date

    latest = date.fromisoformat(dates[-1])
    topics = {t["slug"]: t for t in Atlas(graph, today=latest).world()["topics"]}
    assert topics["search"]["updated"] == dates[-1]
    assert topics["search"]["recent"] >= 1
    far = Atlas(graph, today=date(2099, 1, 1)).world()
    assert all(t["recent"] == 0 for t in far["topics"])


def test_world_hides_what_the_profile_cannot_see(example: Path):
    atlas = _atlas(example, host="someone")
    world = atlas.world()
    assert world["profile"] == "default"
    assert "budget" not in {t["slug"] for t in world["topics"]}
    assert all("budget" not in c["topics"] for c in world["constellations"])
    assert all("budget" not in (f["a"], f["b"]) for f in world["flows"])
    assert world["totals"]["topics"] == 2
    assert world["totals"]["notes"] + world["totals"]["hubs"] == 6
    assert atlas.topic("budget") is None
    health = atlas.health()
    ids = {item["id"] for items in health["items"].values() for item in items}
    assert GPU not in ids and BUDGET_HUB not in ids
    assert health["counts"] == {"conflict": 2}
    search = atlas.topic("search")
    assert search is not None
    assert all(GPU not in (x["source"], x["target"]) for x in search["external"])
    assert atlas.search_titles("gpu") == []


def test_topic_payload(example: Path):
    atlas = _atlas(example)
    topic = atlas.topic("search")
    assert topic is not None
    assert topic["slug"] == "search"
    assert topic["hub"] == "01M4KT3JPRY4W6766VT18CQS90"
    assert {n["id"] for n in topic["nodes"]} >= {FTS5, RIPGREP, VECTOR}
    assert all(n["topic"] == "search" for n in topic["nodes"])
    inner = {(x["source"], x["target"], x["rel"]) for x in topic["links"]}
    assert (FTS5, RIPGREP, "supersedes") in inner
    assert any(not x["typed"] and x["rel"] == "links_to" for x in topic["links"])
    external = {(x["source"], x["target"]): x for x in topic["external"]}
    assert external[(FTS5, POLICY)] == {
        "source": FTS5,
        "target": POLICY,
        "rel": "depends_on",
        "topic": "storage",
        "title": "SQLite version policy",
        "dir": "out",
    }
    assert external[(GPU, VECTOR)]["dir"] == "in"
    assert external[(GPU, VECTOR)]["topic"] == "budget"
    typed = [x["rel"] != "links_to" for x in topic["external"]]
    assert typed == sorted(typed, reverse=True)
    assert atlas.topic("nope") is None


def test_health_payload(example: Path):
    health = _atlas(example).health()
    assert health["counts"] == {"conflict": 3}
    items = health["items"]["conflict"]
    assert [i["id"] for i in items] == [GPU, FTS5, VECTOR]
    assert set(items[0]) == {"id", "title", "topic"}


def test_search_titles_matches_aliases(example: Path):
    atlas = _atlas(example)
    assert [r["id"] for r in atlas.search_titles("fts5 decision")] == [FTS5]
    hit = atlas.search_titles("SQLite")[0]
    assert set(hit) == {"id", "title", "topic", "kind", "snippet"}
    assert atlas.search_titles("  ") == []


def test_small_brain_has_one_constellation():
    adj = {"a": {"b": 3.0}, "b": {"a": 3.0}}
    slugs = [f"t{i:02d}" for i in range(12)]
    assert group_topics(slugs, adj) == [sorted(slugs)]
    assert group_topics([], {}) == []


def test_constellations_on_generated_brain(tmp_path: Path):
    from brainwiki.bench.generate import generate

    root = tmp_path / "gen"
    generate(root, notes=800, seed=1)
    with engine_for(root) as eng:
        graph = build_graph(eng)
    first = Atlas(graph).world()["constellations"]
    assert Atlas(graph).world()["constellations"] == first
    slugs = [t["slug"] for t in graph["topics"]]
    assert len(slugs) > 12
    assert 2 <= len(first) <= 12
    assert [c["id"] for c in first] == [f"c{i + 1}" for i in range(len(first))]
    placed = [s for c in first for s in c["topics"]]
    assert sorted(placed) == sorted(slugs)
    assert all(1 <= len(c["topics"]) <= GROUP_MAX for c in first)
    sizes = [len(c["topics"]) for c in first]
    assert sizes == sorted(sizes, reverse=True)
    colors = {t["slug"]: t["color"] for t in graph["topics"]}
    world_colors = {t["slug"]: t["color"] for t in Atlas(graph).world()["topics"]}
    assert colors == world_colors


def test_constellations_split_and_chunk():
    # One dense clique of 90 topics cannot be split by modularity, so it is chunked;
    # unlinked topics land in their own chunks.
    clique = [f"k{i:03d}" for i in range(90)]
    adj = {a: {b: 1.0 for b in clique if b != a} for a in clique}
    loose = [f"z{i:03d}" for i in range(45)]
    groups = group_topics(clique + loose, adj)
    assert sorted(s for g in groups for s in g) == sorted(clique + loose)
    assert all(len(g) <= GROUP_MAX for g in groups)
    assert group_topics(clique + loose, adj) == groups
    assert [len(g) for g in groups] == [40, 40, 40, 10, 5]


def test_world_keeps_each_topics_strongest_flows():
    slugs = [f"t{i:02d}" for i in range(20)]
    nodes = [
        {"id": s, "kind": "note", "topic": s, "title": s, "updated": None, "flags": []}
        for s in slugs
    ]
    links = [
        {"source": a, "target": b, "rel": "related_to", "typed": True}
        for i, a in enumerate(slugs)
        for b in slugs[i + 1 :]
    ]
    links.append({"source": "t00", "target": "t19", "rel": "depends_on", "typed": True})
    graph = {
        "brain": "b",
        "generated": "",
        "profile": "owner",
        "privacy": [],
        "topics": [{"slug": s, "title": s, "notes": 1, "hub": None} for s in slugs],
        "nodes": nodes,
        "links": links,
        "runs": [],
    }
    flows = Atlas(graph).world()["flows"]
    assert flows[0] == {
        "a": "t00",
        "b": "t19",
        "total": 2,
        "rels": {"depends_on": 1, "related_to": 1},
    }
    assert len(flows) < 190
    for slug in slugs:
        assert sum(slug in (f["a"], f["b"]) for f in flows) >= 8


def test_topic_weights_count_typed_cross_topic_links():
    nodes = [{"id": "a", "topic": "x"}, {"id": "b", "topic": "y"}, {"id": "c", "topic": "x"}]
    links = [
        {"source": "a", "target": "b", "typed": True},
        {"source": "c", "target": "b", "typed": True},
        {"source": "a", "target": "b", "typed": False},
        {"source": "a", "target": "c", "typed": True},
    ]
    assert topic_weights(nodes, links) == {"x": {"y": 2}, "y": {"x": 2}}


def _inline(html: str, tag: str) -> list[str]:
    return re.findall(rf"<{tag}(?: type=\"module\")?>(.*?)</{tag}>", html, re.DOTALL)


def _sha(text: str) -> str:
    return "'sha256-" + base64.b64encode(hashlib.sha256(text.encode()).digest()).decode() + "'"


def test_standalone_html_escapes_titles(example: Path, app_dir: Path):
    write(example, "topics/search/evil.md", f"---\ntitle: '{EVIL}'\n---\n# Evil\n")
    atlas = _atlas(example)
    html = to_standalone_html(atlas)
    assert EVIL not in html
    assert "</script><script>alert" not in html
    assert 'src="/assets/' not in html
    assert "/assets/" not in html
    assert "modulepreload" not in html

    blob = re.search(r'<script type="application/json" id="brain-data">(.*?)</script>', html, re.S)
    assert blob is not None
    assert "<" not in blob.group(1)
    data = json.loads(blob.group(1))
    assert set(data) == {"world", "topics", "health"}
    assert blob.group(1) == script_json(
        {
            "world": atlas.world(),
            "topics": {slug: atlas.topic(slug) for slug in atlas.topics},
            "health": atlas.health(),
        }
    )
    assert set(data["topics"]) == {"budget", "search", "storage"}
    assert EVIL in [n["title"] for n in data["topics"]["search"]["nodes"]]
    assert html.index('id="brain-data"') < html.index('<script type="module">')

    csp = re.search(r'<meta http-equiv="Content-Security-Policy" content="([^"]+)">', html)
    assert csp is not None
    policy = csp.group(1)
    assert "default-src 'none'" in policy
    assert "connect-src 'none'" in policy
    assert "unsafe-inline" not in policy
    assert html.index("Content-Security-Policy") < html.index("<script")
    [script] = re.findall(r'<script type="module">(.*?)</script>', html, re.S)
    [style] = re.findall(r"<style>(.*?)</style>", html, re.S)
    assert script == APP_JS
    assert style == APP_CSS
    assert f"script-src {_sha(script)};" in policy
    assert f"style-src {_sha(style)};" in policy


def test_standalone_html_refuses_unsafe_assets(example: Path, app_dir: Path):
    atlas = _atlas(example)
    (app_dir / "assets" / "index-test.js").write_text("x = '</script>'", encoding="utf-8")
    with pytest.raises(ValueError, match="</script"):
        to_standalone_html(atlas)
    (app_dir / "assets" / "index-test.js").write_text(APP_JS, encoding="utf-8")
    (app_dir / "assets" / "index-test.css").write_text("a{} </STYLE>", encoding="utf-8")
    with pytest.raises(ValueError, match="</style"):
        to_standalone_html(atlas)


@pytest.fixture
def server(example: Path, app_dir: Path) -> Iterator[VizServer]:
    eng = engine_for(example, host="someone")
    srv = make_server(eng, 0)
    thread = threading.Thread(target=srv.serve_forever, daemon=True)
    thread.start()
    try:
        yield srv
    finally:
        srv.shutdown()
        srv.server_close()
        thread.join(timeout=5)
        eng.close()


def _get(srv: VizServer, path: str, cookie: str | None = None) -> tuple[int, dict[str, str], bytes]:
    conn = http.client.HTTPConnection("127.0.0.1", srv.server_address[1], timeout=10)
    try:
        conn.request("GET", path, headers={"Cookie": cookie} if cookie else {})
        resp = conn.getresponse()
        return resp.status, {k.lower(): v for k, v in resp.getheaders()}, resp.read()
    finally:
        conn.close()


def _api(srv: VizServer, path: str) -> object:
    sep = "&" if "?" in path else "?"
    status, headers, body = _get(srv, f"{path}{sep}t={srv.token}")
    assert status == 200, path
    assert headers["content-type"].startswith("application/json")
    return json.loads(body)


def test_cli_prints_url_through_a_pipe(example: Path):
    import os
    import select
    import subprocess
    import sys

    proc = subprocess.Popen(
        [sys.executable, "-m", "brainwiki", "viz", "--brain", str(example), "--no-open"],
        stdout=subprocess.PIPE,
        text=True,
        env=os.environ.copy(),
    )
    try:
        ready, _, _ = select.select([proc.stdout], [], [], 30)
        assert ready, "no output within 30 s"
        assert proc.stdout is not None
        assert re.match(r"brain viz: http://127\.0\.0\.1:\d+/\?t=\S+", proc.stdout.readline())
    finally:
        proc.terminate()
        proc.wait(timeout=10)


ROUTES = (
    "/",
    "/api/world",
    "/api/health",
    "/api/topic/search",
    "/api/search?q=fts5",
    "/assets/index-test.js",
    f"/api/note/{FTS5}",
)


def test_server_requires_token(server: VizServer):
    assert server.server_address[0] == "127.0.0.1"
    for path in ROUTES:
        sep = "&" if "?" in path else "?"
        assert _get(server, path)[0] == 403, path
        assert _get(server, f"{path}{sep}t=wrong")[0] == 403, path
        assert "set-cookie" not in _get(server, path)[1]


def test_server_session_cookie(server: VizServer):
    status, headers, body = _get(server, f"/?t={server.token}")
    assert status == 200
    assert headers["content-type"].startswith("text/html")
    assert b'src="/assets/index-test.js"' in body
    name = f"brainviz_{server.server_address[1]}"
    assert headers["set-cookie"] == (f"{name}={server.token}; HttpOnly; SameSite=Strict; Path=/")
    cookie = f"{name}={server.token}"
    for path in ROUTES:
        status, headers, _ = _get(server, path, cookie=cookie)
        assert status == 200, path
        assert "set-cookie" not in headers
    assert _get(server, "/api/world", cookie=f"{name}=wrong")[0] == 403
    assert _get(server, "/api/world", cookie=f"brainviz_1={server.token}")[0] == 403
    assert _get(server, "/api/world", cookie='bad"cookie; x')[0] == 403


def test_server_headers_and_assets(server: VizServer):
    t = server.token
    status, headers, _ = _get(server, f"/assets/index-test.js?t={t}")
    assert status == 200
    assert headers["content-type"].startswith("text/javascript")
    assert headers["content-security-policy"] == CSP
    assert "worker-src 'self'" in CSP
    assert headers["x-content-type-options"] == "nosniff"
    assert headers["referrer-policy"] == "no-referrer"
    assert headers["cache-control"] == "no-store"
    assert _get(server, f"/assets/index-test.css?t={t}")[1]["content-type"].startswith("text/css")
    assert _get(server, f"/assets/font.woff2?t={t}")[1]["content-type"] == "font/woff2"


def test_server_api(server: VizServer):
    world = _api(server, "/api/world")
    assert isinstance(world, dict)
    assert world["profile"] == "default"
    assert "budget" not in {t["slug"] for t in world["topics"]}
    topic = _api(server, "/api/topic/search")
    assert isinstance(topic, dict)
    assert FTS5 in {n["id"] for n in topic["nodes"]}
    assert _get(server, f"/api/topic/budget?t={server.token}")[0] == 404
    assert _get(server, f"/api/topic/nope?t={server.token}")[0] == 404
    health = _api(server, "/api/health")
    assert isinstance(health, dict)
    assert GPU not in {i["id"] for items in health["items"].values() for i in items}
    assert _get(server, f"/api/graph?t={server.token}")[0] == 404

    status, _, body = _get(server, f"/api/note/{FTS5}?t={server.token}")
    note = json.loads(body)
    assert status == 200
    assert note["title"] == "Use SQLite FTS5 for local search"
    assert note["path"] == "topics/search/fts5.md"
    assert any("SUPERSEDES" in b.upper() or "CONFLICTS" in b for b in note["banners"])
    assert _get(server, f"/api/note/{GPU}?t={server.token}")[0] == 404


def test_server_note_preview(server: VizServer, example: Path):
    peek = "01M4KT3JPSB7BP2SNSCAVC2SZZ"
    write(
        example,
        "topics/search/peek.md",
        f"---\nid: {peek}\ntype: concept\ntitle: Peek\ntags: [search]\n---\n# Peek\n\n"
        "Compare [[fts5]] with [[gpu-freeze|the freeze]] and [[missing-note]].\n",
    )
    server.engine.last_scan_ns = 0  # step past the scan freshness window
    note = _api(server, f"/api/note/{peek}")
    assert isinstance(note, dict)
    assert note["markdown"].startswith("# Peek")
    assert "id:" not in note["markdown"]
    assert note["properties"]["type"] == "concept"
    assert note["properties"]["tags"] == ["search"]
    # Links resolve only to notes this profile may see; hidden and missing targets stay unresolved.
    assert note["links"] == {
        "fts5": {"id": FTS5, "title": "Use SQLite FTS5 for local search", "topic": "search"}
    }


def test_server_search(server: VizServer):
    assert _api(server, "/api/search?q=") == {"results": []}
    found = _api(server, "/api/search?q=FTS5")
    assert isinstance(found, dict)
    assert found["results"][0]["id"] == FTS5
    assert set(found["results"][0]) == {"id", "title", "topic", "kind", "snippet"}
    for query in ("GPU", "spending", "budget"):
        results = _api(server, f"/api/search?q={query}")["results"]  # type: ignore[index]
        assert all(r["topic"] != "budget" for r in results), query
        assert GPU not in {r["id"] for r in results}, query
    # Body text, not just titles, reaches the index search.
    body = _api(server, "/api/search?q=ripgrep")["results"]  # type: ignore[index]
    assert body and len(body) <= 20


def test_server_rebuilds_only_on_change(server: VizServer, example: Path):
    first = server.atlas()
    assert server.atlas() is first
    write(example, "topics/search/new.md", "---\ntitle: Brand new note\n---\n# Brand new note\n")
    server.engine.last_scan_ns = 0  # step past the scan freshness window
    assert server.atlas(fresh=False) is first
    second = server.atlas()
    assert second is not first
    assert any(n["title"] == "Brand new note" for n in second.notes)


def test_server_blocks_traversal(server: VizServer):
    t = server.token
    for path in (
        "/assets/../index.html",
        "/assets/..%2Findex.html",
        "/assets/%2e%2e/index.html",
        "/assets/sub/../../index.html",
        "/assets//etc/passwd",
        "/assets/.hidden",
        "/assets/notes.txt",
        "/nope",
    ):
        assert _get(server, f"{path}?t={t}")[0] == 404, path


def test_server_refuses_writes(server: VizServer):
    conn = http.client.HTTPConnection("127.0.0.1", server.server_address[1], timeout=10)
    try:
        conn.request("POST", f"/api/world?t={server.token}", body=b"{}")
        assert conn.getresponse().status == 405
    finally:
        conn.close()


def test_server_reports_missing_build(example: Path, tmp_path: Path, monkeypatch):
    monkeypatch.setattr(viz_server, "APP_DIR", tmp_path / "missing")
    with engine_for(example) as eng:
        srv = make_server(eng, 0)
        thread = threading.Thread(target=srv.serve_forever, daemon=True)
        thread.start()
        try:
            assert _get(srv, f"/?t={srv.token}")[0] == 503
            assert _get(srv, f"/api/world?t={srv.token}")[0] == 200
        finally:
            srv.shutdown()
            srv.server_close()
            thread.join(timeout=5)


def _check_viz():
    path = Path(__file__).resolve().parent.parent / "scripts" / "check_viz.py"
    spec = importlib.util.spec_from_file_location("check_viz", path)
    assert spec and spec.loader
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def test_committed_bundle_is_complete_and_stamped():
    assert _check_viz().bundle_problems() == []


def test_build_info_rejects_dirty_or_unknown_builds(tmp_path: Path):
    check = _check_viz()
    assert check.build_info_problems(tmp_path)  # missing
    (tmp_path / "BUILD_INFO.json").write_text(
        '{"source": "brain-wiki-viz", "commit": "abc", "dirty": false}'
    )
    assert any("commit" in p for p in check.build_info_problems(tmp_path))
    good = '{"source": "brain-wiki-viz", "commit": "' + "a" * 40 + '", "dirty": true}'
    (tmp_path / "BUILD_INFO.json").write_text(good)
    assert any("uncommitted" in p for p in check.build_info_problems(tmp_path))


def test_cli_export(
    example: Path, tmp_path: Path, app_dir: Path, capsys: pytest.CaptureFixture[str]
):
    from brainwiki.cli.main import main

    out = tmp_path / "graph.json"
    assert main(["viz", "--brain", str(example), "--as", "someone", "--export", str(out)]) == 0
    graph = json.loads(out.read_text(encoding="utf-8"))
    assert GPU not in {n["id"] for n in graph["nodes"]}
    assert "privacy levels: default" in capsys.readouterr().out
    html = tmp_path / "brain.html"
    assert main(["viz", "--brain", str(example), "--export", str(html)]) == 0
    assert "default, sensitive" in capsys.readouterr().out
    assert html.read_text(encoding="utf-8").startswith("<!doctype html>")
    assert 'id="brain-data"' in html.read_text(encoding="utf-8")
    assert main(["viz", "--brain", str(example), "--export", str(tmp_path / "x.txt")]) == 2
