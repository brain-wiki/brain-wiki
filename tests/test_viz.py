from __future__ import annotations

import base64
import hashlib
import http.client
import importlib.util
import json
import re
import shutil
import sys
import threading
import xml.etree.ElementTree as ET
from collections.abc import Iterator
from pathlib import Path

import pytest
from tests.conftest import write

from brainwiki.config._resolve import open_brain
from brainwiki.engine import Engine
from brainwiki.viz import _export as export
from brainwiki.viz import _server as viz_server
from brainwiki.viz._export import _script_json, build_graph, to_graphml, to_standalone_html
from brainwiki.viz._lod import Atlas, tree_order
from brainwiki.viz._server import _CSP, _make_server, _VizServer

FIXTURE = Path(__file__).parent / "fixtures" / "example-brain"
FTS5 = "01M4KT3JPRY4W6766VT18CQS91"
RIPGREP = "01M4KT3JPSB7BP2SNSCAVC2SF5"
VECTOR = "01M4KT3JPSB7BP2SNSCAVC2SF6"
POLICY = "01M4KT3JPSB7BP2SNSCAVC2SF8"
GPU = "01M4KT3JPSB7BP2SNSCAVC2SFA"
BUDGET_PAGE = "01M4KT3JPSB7BP2SNSCAVC2SF9"
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


def _links(graph: dict) -> set[tuple[str, str, str]]:
    return {(link["source"], link["target"], link["rel"]) for link in graph["links"]}


def test_graph_nodes_links_and_flags(example: Path):
    with engine_for(example) as eng:
        graph = build_graph(eng)
    assert graph["brain"] == "example"
    assert graph["profile"] == "owner"
    kinds = {n["id"]: n["kind"] for n in graph["nodes"]}
    assert kinds[FTS5] == "note"
    assert kinds["01M4KT3JPRY4W6766VT18CQS90"] == "topic"
    assert kinds[EPISODE] == "episode"
    assert len([k for k in kinds.values() if k in ("note", "topic")]) == 8

    links = _links(graph)
    assert (RIPGREP, FTS5, "superseded_by") in links  # from its metadata
    assert {(FTS5, POLICY, "links_to"), (POLICY, FTS5, "links_to")} <= links
    assert (FTS5, RIPGREP, "links_to") in links and (GPU, VECTOR, "links_to") in links
    assert all(set(link) == {"source", "target", "rel"} for link in graph["links"])

    assert _node(graph, RIPGREP)["status"] == "superseded"
    assert _node(graph, RIPGREP)["flags"] == ["superseded"]
    assert {n["id"] for n in graph["nodes"] if "conflict" in n["flags"]} == {FTS5, VECTOR, GPU}
    assert not any(set(n["flags"]) - {"superseded", "conflict"} for n in graph["nodes"])

    fts5 = _node(graph, FTS5)
    assert fts5["degree"] == 8  # its fields and the prose links beside them
    assert 0 < fts5["chars"] < len((example / fts5["path"]).read_text())
    assert fts5["aliases"] == ["FTS5 decision"]
    assert fts5["updated"] == "2026-10-01"

    topics = {t["slug"]: t for t in graph["topics"]}
    assert set(topics) == {"budget", "search", "storage"}
    assert topics["search"]["notes"] == 3  # its topic page is not one of its notes
    assert topics["search"]["page"] == "01M4KT3JPRY4W6766VT18CQS90"
    assert topics["search"]["description"] == "How local search works and why."
    assert len({t["color"] for t in topics.values()}) == 3
    assert graph["runs"] == []


def test_graph_shows_every_topic_to_any_host(example: Path):
    with engine_for(example, host="someone") as eng:
        graph = build_graph(eng)
    ids = {n["id"] for n in graph["nodes"]}
    assert {GPU, BUDGET_PAGE, FTS5} <= ids
    assert "budget" in {t["slug"] for t in graph["topics"]}
    assert graph["profile"] == "default"
    assert "superseded" in _node(graph, RIPGREP)["flags"]


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
        "# Legacy CLI search\n\nThe CLI pipes [[ripgrep]] results through grep.\n",
    )
    write(example, "topics/search/broken.md", "---\ntitle: [unclosed\n---\n# Broken\n")
    with engine_for(example) as eng:
        graph = build_graph(eng)
    legacy = _node(graph, "01M4KT3JPSB7BP2SNSCAVC2SFC")
    assert set(legacy["flags"]) == {"stale", "orphan"}
    broken = next(n for n in graph["nodes"] if n["path"] == "topics/search/broken.md")
    assert "lint_error" in broken["flags"]
    # both notes of an open conflict, whichever holds the field, conflict first
    assert _node(graph, FTS5)["flags"][0] == "conflict"
    proposal = next(n for n in graph["nodes"] if n["path"] == "topics/search/vector-only.md")
    assert proposal["flags"] == ["conflict"]


def test_resting_on_an_outdated_note_is_stale(example: Path):
    policy = example / "topics/storage/sqlite-version-policy.md"
    policy.write_text(
        policy.read_text().replace("type: reference\n", "type: reference\nstatus: archived\n")
    )
    with engine_for(example) as eng:
        graph = build_graph(eng)
    assert "stale" in _node(graph, FTS5)["flags"]  # bw-depends_on names the archived policy


def test_runs_from_records(example: Path):
    from brainwiki.ids import run_id
    from brainwiki.runs._record import FileChange, RunRecord, save_record

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
    monkeypatch.setattr(viz_server, "_APP_DIR", root)
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
        "totals",
        "topics",
        "flows",
        "episodes",
        "runs",
    }
    assert world["totals"] == {
        "topics": 3,
        "notes": 5,
        "pages": 3,
        "episodes": 1,
        "links": 14,
        "flagged": 4,
    }
    assert world["episodes"] == {"count": 1}
    topics = {t["slug"]: t for t in world["topics"]}
    search = topics["search"]
    assert search["notes"] == 3
    assert search["page"] == "01M4KT3JPRY4W6766VT18CQS90"
    assert search["description"] == "How local search works and why."
    assert (search["name"], search["depth"], search["parent"]) == ("search", 0, None)
    assert search["tree_chars"] == search["chars"] > 0
    assert search["flags"] == {"superseded": 1, "conflict": 2}
    assert search["flagged"] == 3
    assert len({t["color"] for t in topics.values()}) == 3
    assert all(re.fullmatch(r"#[0-9a-f]{6}", t["color"]) for t in topics.values())
    flows = {(f["a"], f["b"]): f for f in world["flows"]}  # typed links only
    assert flows[("search", "storage")]["rels"] == {"depends_on": 1}
    assert flows[("budget", "search")]["rels"] == {"conflicts_with": 1}
    assert all(f["a"] < f["b"] for f in world["flows"])


def test_world_recent_counts_last_week(example: Path):
    with engine_for(example) as eng:
        graph = build_graph(eng)
    dates = sorted(n["updated"] for n in graph["nodes"] if n["topic"] == "search" and n["updated"])
    notes = sorted(
        n["updated"]
        for n in graph["nodes"]
        if n["topic"] == "search" and n["kind"] == "note" and n["updated"]
    )
    from datetime import date

    latest = date.fromisoformat(notes[-1])
    topics = {t["slug"]: t for t in Atlas(graph, today=latest).world()["topics"]}
    assert topics["search"]["updated"] == dates[-1]
    assert topics["search"]["recent"] >= 1
    far = Atlas(graph, today=date(2099, 1, 1)).world()
    assert all(t["recent"] == 0 for t in far["topics"])


def test_world_shows_every_topic_to_any_host(example: Path):
    atlas = _atlas(example, host="someone")
    world = atlas.world()
    assert world["profile"] == "default"
    assert "budget" in {t["slug"] for t in world["topics"]}
    assert world["totals"]["topics"] == 3
    assert atlas.topic("budget") is not None
    health = atlas.health()
    assert RIPGREP in {item["id"] for items in health["items"].values() for item in items}
    assert GPU in {r["id"] for r in atlas.search_titles("gpu")}


def test_topic_payload(example: Path):
    atlas = _atlas(example)
    topic = atlas.topic("search")
    assert topic is not None
    assert topic["slug"] == "search"
    assert topic["page"] == "01M4KT3JPRY4W6766VT18CQS90"
    assert {n["id"] for n in topic["nodes"]} >= {FTS5, RIPGREP, VECTOR}
    assert all(n["topic"] == "search" for n in topic["nodes"])
    inner = {(x["source"], x["target"], x["rel"]) for x in topic["links"]}
    assert {(RIPGREP, FTS5, "superseded_by"), (FTS5, RIPGREP, "links_to")} <= inner
    external = {(x["source"], x["target"]): x for x in topic["external"]}
    assert external[(FTS5, POLICY)] == {
        "source": FTS5,
        "target": POLICY,
        "rel": "links_to",
        "topic": "storage",
        "title": "SQLite version policy",
        "dir": "out",
    }
    assert external[(GPU, VECTOR)]["dir"] == "in"
    assert external[(GPU, VECTOR)]["topic"] == "budget"
    metadata_first = [x["rel"] != "links_to" for x in topic["external"]]
    assert metadata_first == sorted(metadata_first, reverse=True)
    assert atlas.topic("nope") is None


def test_health_payload(example: Path):
    health = _atlas(example).health()
    assert health["counts"] == {"superseded": 1, "conflict": 3}
    items = health["items"]["superseded"]
    assert [i["id"] for i in items] == [RIPGREP]
    assert set(items[0]) == {"id", "title", "topic"}


def test_search_titles_matches_aliases(example: Path):
    atlas = _atlas(example)
    assert [r["id"] for r in atlas.search_titles("fts5 decision")] == [FTS5]
    hit = atlas.search_titles("SQLite")[0]
    assert set(hit) == {"id", "title", "topic", "kind", "snippet"}
    assert atlas.search_titles("  ") == []


def test_chars_count_the_text_without_frontmatter(example: Path):
    write(example, "topics/search/short.md", "---\ntitle: Short\n---\nabcde\n")
    with engine_for(example) as eng:
        graph = build_graph(eng)
    short = next(n for n in graph["nodes"] if n["path"] == "topics/search/short.md")
    assert short["chars"] == 5


def _tree_graph() -> dict:
    """Two top-level topics; `work` has the sub-topics `2 Plans` and `10 Notes`, and `10 Notes`
    has its own sub-topic."""
    topics = [
        {"slug": "work", "title": "Work", "path": "topics/Work", "parent": None},
        {"slug": "notes", "title": "notes", "path": "topics/Work/10 Notes", "parent": "work"},
        {"slug": "plans", "title": "plans", "path": "topics/Work/2 Plans", "parent": "work"},
        {"slug": "old", "title": "old", "path": "topics/Work/10 Notes/Old", "parent": "notes"},
        {"slug": "home", "title": "Home", "path": "topics/Home", "parent": None},
    ]
    chars = {"work": 100, "notes": 20, "plans": 30, "old": 5, "home": 7}
    nodes = [
        {"id": s, "kind": "note", "topic": s, "title": s, "updated": None, "flags": [], "chars": c}
        for s, c in chars.items()
    ]
    links = [
        {"source": "old", "target": "home", "rel": "depends_on"},
        {"source": "plans", "target": "home", "rel": "links_to"},  # a body link: no flow
        {"source": "plans", "target": "notes", "rel": "part_of"},
    ]
    return {
        "brain": "b",
        "generated": "",
        "profile": "owner",
        "topics": topics,
        "nodes": nodes,
        "links": links,
        "runs": [],
    }


def test_world_lays_out_the_topic_tree():
    world = Atlas(_tree_graph()).world()
    topics = {t["slug"]: t for t in world["topics"]}
    # depth first, siblings by folder name with numbers as numbers
    assert [t["slug"] for t in world["topics"]] == ["home", "work", "plans", "notes", "old"]
    assert {s: t["depth"] for s, t in topics.items()} == {
        "home": 0,
        "work": 0,
        "plans": 1,
        "notes": 1,
        "old": 2,
    }
    assert topics["old"]["name"] == "Old" and topics["notes"]["name"] == "10 Notes"
    assert (topics["work"]["chars"], topics["work"]["tree_chars"]) == (100, 155)
    assert (topics["notes"]["chars"], topics["notes"]["tree_chars"]) == (20, 25)
    assert world["flows"] == [  # typed links only, between the notes' own topics
        {"a": "home", "b": "old", "total": 1, "rels": {"depends_on": 1}},
        {"a": "notes", "b": "plans", "total": 1, "rels": {"part_of": 1}},
    ]
    assert len({topics[s]["color"] for s in topics}) == 5


def test_tree_order_survives_a_parent_cycle():
    parents: dict[str, str | None] = {"a": "b", "b": "a", "c": None}
    assert sorted(tree_order(["a", "b", "c"], parents, {})) == ["a", "b", "c"]


def test_tree_order_and_colors_on_generated_brain(tmp_path: Path):
    from brainwiki.bench._generate import generate

    root = tmp_path / "gen"
    generate(root, notes=800, seed=1)
    with engine_for(root) as eng:
        graph = build_graph(eng)
    first = Atlas(graph).world()["topics"]
    assert Atlas(graph).world()["topics"] == first
    assert sorted(t["slug"] for t in first) == sorted(t["slug"] for t in graph["topics"])
    colors = {t["slug"]: t["color"] for t in graph["topics"]}
    assert colors == {t["slug"]: t["color"] for t in first}


def test_world_keeps_each_topics_strongest_flows():
    slugs = [f"t{i:02d}" for i in range(20)]
    nodes = [
        {"id": s, "kind": "note", "topic": s, "title": s, "updated": None, "flags": []}
        for s in slugs
    ]
    links = [
        {"source": a, "target": b, "rel": "depends_on"}
        for i, a in enumerate(slugs)
        for b in slugs[i + 1 :]
    ]
    links.append({"source": "t00", "target": "t19", "rel": "superseded_by"})
    graph = {
        "brain": "b",
        "generated": "",
        "profile": "owner",
        "topics": [{"slug": s, "title": s, "notes": 1, "page": None} for s in slugs],
        "nodes": nodes,
        "links": links,
        "runs": [],
    }
    flows = Atlas(graph).world()["flows"]
    assert flows[0] == {
        "a": "t00",
        "b": "t19",
        "total": 2,
        "rels": {"depends_on": 1, "superseded_by": 1},
    }
    assert len(flows) < 190
    for slug in slugs:
        assert sum(slug in (f["a"], f["b"]) for f in flows) >= 8


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
    assert blob.group(1) == _script_json(
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
def server(example: Path, app_dir: Path) -> Iterator[_VizServer]:
    eng = engine_for(example, host="someone")
    srv = _make_server(eng, 0)
    thread = threading.Thread(target=srv.serve_forever, daemon=True)
    thread.start()
    try:
        yield srv
    finally:
        srv.shutdown()
        srv.server_close()
        thread.join(timeout=5)
        eng.close()


def test_server_starts_without_name_lookups(example: Path, monkeypatch: pytest.MonkeyPatch):
    import socket

    def lookup(*args: object) -> None:
        raise AssertionError("name lookup while starting the server")

    for name in ("getfqdn", "gethostbyaddr", "gethostname"):
        monkeypatch.setattr(socket, name, lookup)
    eng = engine_for(example)
    try:
        srv = _make_server(eng, 0)
        srv.server_close()
    finally:
        eng.close()
    assert srv.url.startswith("http://127.0.0.1:")
    assert srv.remote_url is None


def test_server_listens_beyond_loopback_on_request(example: Path, app_dir: Path):
    import socket

    eng = engine_for(example)
    srv = _make_server(eng, 0, host="0.0.0.0")
    thread = threading.Thread(target=srv.serve_forever, daemon=True)
    thread.start()
    try:
        assert srv.server_address[0] == "0.0.0.0"
        assert srv.url.startswith("http://127.0.0.1:")
        assert srv.remote_url == srv.url.replace("127.0.0.1", socket.gethostname())
        assert _get(srv, "/api/health")[0] == 403
        assert _api(srv, "/api/health")
    finally:
        srv.shutdown()
        srv.server_close()
        thread.join(timeout=5)
        eng.close()


def test_serve_warns_beyond_loopback(
    example: Path, app_dir: Path, monkeypatch: pytest.MonkeyPatch, capsys
):
    monkeypatch.setattr(_VizServer, "serve_forever", lambda self: None)
    monkeypatch.setattr(_VizServer, "watch_idle", lambda self: None)
    eng = engine_for(example)
    try:
        viz_server.serve(eng, 0, False, host="0.0.0.0")
        out, err = capsys.readouterr()
        assert "From other machines: http://" in out
        assert "SSH tunnel" in err
        viz_server.serve(eng, 0, False)
        out, err = capsys.readouterr()
        assert "From other machines" not in out
        assert err == ""
    finally:
        eng.close()


def test_cli_passes_host(example: Path, monkeypatch: pytest.MonkeyPatch):
    import brainwiki.viz
    from brainwiki.cli._main import main

    seen: dict[str, object] = {}
    monkeypatch.setattr(brainwiki.viz, "serve", lambda *args, **kw: seen.update(kw))
    assert main(["viz", "--brain", str(example), "--no-open"]) == 0
    assert seen["host"] == "127.0.0.1"
    assert main(["viz", "--brain", str(example), "--host", "0.0.0.0", "--no-open"]) == 0
    assert seen["host"] == "0.0.0.0" and seen["keep_token"] is False
    assert main(["viz", "--brain", str(example), "--port", "8792", "--keep-token"]) == 0
    assert seen["keep_token"] is True
    # the link includes the port, and an export has no link
    assert main(["viz", "--brain", str(example), "--keep-token"]) == 2
    out = example / "map.json"
    assert main(["viz", "--brain", str(example), "--keep-token", "--export", str(out)]) == 2


def test_kept_token_stays_per_brain_and_port(example: Path):
    with engine_for(example) as eng:
        first, path = viz_server.kept_token(eng, 8792)
        assert viz_server.kept_token(eng, 8792) == (first, path)
        assert viz_server.kept_token(eng, 8793)[0] != first
        assert path.stat().st_mode & 0o777 == 0o600  # the token reads the whole brain
        path.write_text("tampered\n")
        replaced, _ = viz_server.kept_token(eng, 8792)
        assert replaced not in (first, "tampered") and len(replaced) >= 16
        srv = _make_server(eng, 0, token=replaced)
        try:
            assert srv.url.endswith(f"/?t={replaced}")
        finally:
            srv.server_close()


def _get(
    srv: _VizServer, path: str, cookie: str | None = None
) -> tuple[int, dict[str, str], bytes]:
    conn = http.client.HTTPConnection("127.0.0.1", srv.server_address[1], timeout=10)
    try:
        conn.request("GET", path, headers={"Cookie": cookie} if cookie else {})
        resp = conn.getresponse()
        return resp.status, {k.lower(): v for k, v in resp.getheaders()}, resp.read()
    finally:
        conn.close()


def _api(srv: _VizServer, path: str) -> object:
    sep = "&" if "?" in path else "?"
    status, headers, body = _get(srv, f"{path}{sep}t={srv.token}")
    assert status == 200, path
    assert headers["content-type"].startswith("application/json")
    return json.loads(body)


def test_cli_refuses_an_unknown_topic(example: Path, tmp_path: Path, capsys):
    from brainwiki.cli._main import main

    out = tmp_path / "map.json"
    assert main(["viz", "--brain", str(example), "--topic", "nosuch", "--export", str(out)]) == 3
    assert capsys.readouterr().err.startswith("not_found: no topic 'nosuch'")
    assert not out.exists()
    assert main(["viz", "--brain", str(example), "--topic", "SEARCH", "--export", str(out)]) == 0
    assert json.loads(out.read_text())["nodes"]


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


def test_server_requires_token(server: _VizServer):
    assert server.server_address[0] == "127.0.0.1"
    for path in ROUTES:
        sep = "&" if "?" in path else "?"
        assert _get(server, path)[0] == 403, path
        assert _get(server, f"{path}{sep}t=wrong")[0] == 403, path
        assert "set-cookie" not in _get(server, path)[1]


def test_server_session_cookie(server: _VizServer):
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


def test_server_headers_and_assets(server: _VizServer):
    t = server.token
    status, headers, _ = _get(server, f"/assets/index-test.js?t={t}")
    assert status == 200
    assert headers["content-type"].startswith("text/javascript")
    assert headers["content-security-policy"] == _CSP
    assert "worker-src 'self'" in _CSP
    assert headers["x-content-type-options"] == "nosniff"
    assert headers["referrer-policy"] == "no-referrer"
    assert headers["cache-control"] == "no-store"
    assert _get(server, f"/assets/index-test.css?t={t}")[1]["content-type"].startswith("text/css")
    assert _get(server, f"/assets/font.woff2?t={t}")[1]["content-type"] == "font/woff2"


def test_server_api(server: _VizServer):
    world = _api(server, "/api/world")
    assert isinstance(world, dict)
    assert world["profile"] == "default"
    assert "budget" in {t["slug"] for t in world["topics"]}
    topic = _api(server, "/api/topic/search")
    assert isinstance(topic, dict)
    assert FTS5 in {n["id"] for n in topic["nodes"]}
    assert _get(server, f"/api/topic/budget?t={server.token}")[0] == 200
    assert _get(server, f"/api/topic/nope?t={server.token}")[0] == 404
    health = _api(server, "/api/health")
    assert isinstance(health, dict)
    assert RIPGREP in {i["id"] for items in health["items"].values() for i in items}
    assert _get(server, f"/api/graph?t={server.token}")[0] == 404

    status, _, body = _get(server, f"/api/note/{FTS5}?t={server.token}")
    note = json.loads(body)
    assert status == 200
    assert note["title"] == "Use SQLite FTS5 for local search"
    assert note["path"] == "topics/search/fts5.md"
    assert note["banners"] == [
        '⚠ CONFLICTS with "Vector-only search proposal" (topics/search/vector-only.md): '
        "read both before acting.",
        '↳ supersedes "Use ripgrep for search" (topics/search/ripgrep.md).',
    ]
    assert {(x["relation"], x["path"]) for x in note["outlinks"]} >= {
        ("depends_on", "topics/storage/sqlite-version-policy.md"),
        ("cites", "archive/episodes/2026/09/01M2Z44880248H248H248H248H.md"),
    }
    assert note["parts"] == [] and note["parts_total"] == 0
    assert _get(server, f"/api/note/{GPU}?t={server.token}")[0] == 200


def test_server_note_preview(server: _VizServer, example: Path):
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
    # Links resolve to the notes they name; a missing target stays unresolved.
    assert note["links"] == {
        "fts5": {"id": FTS5, "title": "Use SQLite FTS5 for local search", "topic": "search"},
        "gpu-freeze": {"id": GPU, "title": "No GPU spending this year", "topic": "budget"},
    }


def test_server_search(server: _VizServer):
    assert _api(server, "/api/search?q=") == {"results": []}
    found = _api(server, "/api/search?q=FTS5")
    assert isinstance(found, dict)
    assert found["results"][0]["id"] == FTS5
    assert set(found["results"][0]) == {"id", "title", "topic", "kind", "snippet"}
    gpu = _api(server, "/api/search?q=GPU")["results"]  # type: ignore[index]
    assert GPU in {r["id"] for r in gpu}
    # Body text, not just titles, reaches the index search.
    body = _api(server, "/api/search?q=ripgrep")["results"]  # type: ignore[index]
    assert body and len(body) <= 20


def test_server_rebuilds_only_on_change(server: _VizServer, example: Path):
    first = server.atlas()
    assert server.atlas() is first
    write(example, "topics/search/new.md", "---\ntitle: Brand new note\n---\n# Brand new note\n")
    server.engine.last_scan_ns = 0  # step past the scan freshness window
    assert server.atlas(fresh=False) is first
    second = server.atlas()
    assert second is not first
    assert any(n["title"] == "Brand new note" for n in second.notes)


def test_server_blocks_traversal(server: _VizServer):
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


def test_server_refuses_writes(server: _VizServer):
    conn = http.client.HTTPConnection("127.0.0.1", server.server_address[1], timeout=10)
    try:
        conn.request("POST", f"/api/world?t={server.token}", body=b"{}")
        assert conn.getresponse().status == 405
    finally:
        conn.close()


def test_server_reports_missing_build(example: Path, tmp_path: Path, monkeypatch):
    monkeypatch.setattr(viz_server, "_APP_DIR", tmp_path / "missing")
    with engine_for(example) as eng:
        srv = _make_server(eng, 0)
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
    from brainwiki.cli._main import main

    out = tmp_path / "graph.json"
    assert main(["viz", "--brain", str(example), "--as", "someone", "--export", str(out)]) == 0
    graph = json.loads(out.read_text(encoding="utf-8"))
    assert GPU in {n["id"] for n in graph["nodes"]}
    assert "profile default" in capsys.readouterr().out
    html = tmp_path / "brain.html"
    assert main(["viz", "--brain", str(example), "--export", str(html)]) == 0
    assert "profile owner" in capsys.readouterr().out
    assert html.read_text(encoding="utf-8").startswith("<!doctype html>")
    assert 'id="brain-data"' in html.read_text(encoding="utf-8")
    assert main(["viz", "--brain", str(example), "--export", str(tmp_path / "x.txt")]) == 2


class _Terminal:
    """stdin as a person at a terminal typing `answers`."""

    def __init__(self, *answers: str) -> None:
        self.lines = iter(answers)

    def isatty(self) -> bool:
        return True

    def readline(self) -> str:
        return next(self.lines) + "\n"


def _two_brains(brain_dir: Path, tmp_path: Path) -> None:
    from brainwiki.config._user import register_brain
    from brainwiki.lifecycle import init_brain

    register_brain("work", init_brain(tmp_path / "brains" / "work", "work"))


@pytest.mark.parametrize(("typed", "picked"), [("2", "work"), ("work", "work"), ("", "test")])
def test_viz_and_obsidian_ask_which_brain_when_there_are_several(
    brain_dir: Path, tmp_path: Path, monkeypatch: pytest.MonkeyPatch, typed: str, picked: str
):
    from types import SimpleNamespace

    from brainwiki.cli._choose import chosen_brain

    _two_brains(brain_dir, tmp_path)
    monkeypatch.setattr(sys, "stdin", _Terminal(typed))
    assert chosen_brain(SimpleNamespace(brain=None, json=False)) == picked


def test_no_brain_question_without_a_terminal_or_with_brain(
    brain_dir: Path, tmp_path: Path, monkeypatch: pytest.MonkeyPatch
):
    from types import SimpleNamespace

    from brainwiki.cli._choose import chosen_brain

    assert chosen_brain(SimpleNamespace(brain=None, json=False)) is None  # one brain: no question
    _two_brains(brain_dir, tmp_path)
    assert chosen_brain(SimpleNamespace(brain=None, json=False)) is None  # pytest's stdin
    monkeypatch.setattr(sys, "stdin", _Terminal("1"))
    assert chosen_brain(SimpleNamespace(which="work", brain=None, json=False)) == "work"
    assert chosen_brain(SimpleNamespace(brain="work", json=False)) == "work"


def test_viz_takes_a_brain_by_name(brain_dir: Path, tmp_path: Path):
    from brainwiki.cli._main import main

    _two_brains(brain_dir, tmp_path)
    out = tmp_path / "map.json"
    assert main(["viz", "work", "--export", str(out)]) == 0
    assert json.loads(out.read_text())["brain"] == "work"
    assert main(["viz", "work", "--brain", "test", "--export", str(out)]) == 2


def _vault_list(vaults: dict[str, Path]) -> None:
    from brainwiki.obsidian import _vault_lists

    listing = _vault_lists()[0]  # where the code reads it, whatever XDG_CONFIG_HOME says
    listing.parent.mkdir(parents=True, exist_ok=True)
    entries = {vid: {"path": str(path), "ts": 1} for vid, path in vaults.items()}
    listing.write_text(json.dumps({"vaults": entries}))


@pytest.fixture
def fake_tools(tmp_path: Path, monkeypatch: pytest.MonkeyPatch) -> Path:
    """Fake `obsidian`, `xdg-open` and `open` on PATH that log their arguments."""
    monkeypatch.delenv("XDG_CONFIG_HOME", raising=False)
    bindir = tmp_path / "bin"
    bindir.mkdir()
    log = tmp_path / "calls.log"
    for name in ("obsidian", "xdg-open", "open"):
        tool = bindir / name
        tool.write_text(f'#!/bin/sh\necho "{name} $*" >> "{log}"\n')
        tool.chmod(0o755)
    monkeypatch.setenv("PATH", str(bindir))
    return log


def _calls(log: Path) -> list[str]:
    return log.read_text().splitlines() if log.exists() else []


def test_obsidian_opens_a_brain_obsidian_knows(brain_dir: Path, tmp_path: Path, fake_tools: Path):
    from brainwiki.cli._main import main

    _two_brains(brain_dir, tmp_path)
    _vault_list({"abc123": brain_dir, "w1": tmp_path / "brains" / "work"})
    assert main(["obsidian", "test"]) == 0
    assert main(["obsidian", "work"]) == 0
    calls = _calls(fake_tools)
    assert calls[0].endswith("obsidian://open?vault=abc123")
    assert calls[1].endswith("obsidian://open?vault=w1")


def test_obsidian_opens_an_unknown_brain_folder_as_a_new_vault(
    brain_dir: Path, fake_tools: Path, capsys
):
    from brainwiki.cli._main import main

    assert main(["obsidian"]) == 0
    (call,) = _calls(fake_tools)
    assert call.startswith("obsidian eval code=window.electron.ipcRenderer.sendSync('vault-open', ")
    assert json.dumps(str(brain_dir.resolve())) in call
    assert "as a vault" in capsys.readouterr().out


def test_obsidian_without_its_cli_opens_the_vault_manager(
    brain_dir: Path, fake_tools: Path, capsys
):
    from brainwiki.cli._main import main

    (fake_tools.parent / "bin" / "obsidian").unlink()
    assert main(["obsidian"]) == 0
    assert _calls(fake_tools)[0].endswith("obsidian://choose-vault")
    assert "Open folder as vault" in capsys.readouterr().out


def test_obsidian_explains_when_nothing_can_open_it(
    brain_dir: Path, tmp_path: Path, monkeypatch: pytest.MonkeyPatch, capsys
):
    from brainwiki.cli._main import main

    monkeypatch.setenv("PATH", str(tmp_path / "empty"))
    assert main(["obsidian"]) == 3  # unknown folder, no Obsidian CLI, no way to open a link
    assert "Obsidian was not found" in capsys.readouterr().err
    _vault_list({"abc123": brain_dir})
    assert main(["obsidian"]) == 0  # a known vault: the link is printed instead
    assert "obsidian://open?vault=abc123" in capsys.readouterr().out
