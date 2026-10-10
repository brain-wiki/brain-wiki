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
from brainwiki.viz.export import (
    build_graph,
    script_json,
    to_graphml,
    to_standalone_html,
)
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


def _inline_scripts(html: str) -> list[str]:
    return re.findall(r"<script>(.*?)</script>", html, re.DOTALL)


def test_standalone_html_escapes_titles(example: Path):
    write(example, "topics/search/evil.md", f"---\ntitle: '{EVIL}'\n---\n# Evil\n")
    with engine_for(example) as eng:
        graph = build_graph(eng)
    html = to_standalone_html(graph)
    assert EVIL not in html
    assert "</script><script>alert" not in html
    assert "__TOKEN__" not in html
    assert 'src="/assets/' not in html

    blob = re.search(r'<script type="application/json" id="graph-data">(.*?)</script>', html, re.S)
    assert blob is not None
    assert "<" not in blob.group(1)
    data = json.loads(blob.group(1))
    assert EVIL in [n["title"] for n in data["nodes"]]
    assert blob.group(1) == script_json(graph)

    csp = re.search(r'<meta http-equiv="Content-Security-Policy" content="([^"]+)">', html)
    assert csp is not None
    policy = csp.group(1)
    assert "default-src 'none'" in policy
    assert "unsafe-inline" not in policy
    scripts = _inline_scripts(html)
    assert len(scripts) == 3
    for body in scripts:
        digest = base64.b64encode(hashlib.sha256(body.encode()).digest()).decode()
        assert f"'sha256-{digest}'" in policy
    style = re.search(r"<style>(.*?)</style>", html, re.S)
    assert style is not None
    digest = base64.b64encode(hashlib.sha256(style.group(1).encode()).digest()).decode()
    assert f"style-src 'sha256-{digest}'" in policy


@pytest.fixture
def server(example: Path) -> Iterator[VizServer]:
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


def _get(srv: VizServer, path: str) -> tuple[int, dict[str, str], bytes]:
    conn = http.client.HTTPConnection("127.0.0.1", srv.server_address[1], timeout=10)
    try:
        conn.request("GET", path)
        resp = conn.getresponse()
        return resp.status, {k.lower(): v for k, v in resp.getheaders()}, resp.read()
    finally:
        conn.close()


def test_server_requires_token(server: VizServer):
    assert server.server_address[0] == "127.0.0.1"
    for path in ("/", "/api/graph", "/assets/app.js", f"/api/note/{FTS5}"):
        assert _get(server, path)[0] == 403
        assert _get(server, path + "?t=wrong")[0] == 403


def test_server_routes(server: VizServer):
    t = server.token
    status, headers, body = _get(server, f"/?t={t}")
    assert status == 200
    assert headers["content-type"].startswith("text/html")
    assert headers["content-security-policy"] == CSP
    assert headers["x-content-type-options"] == "nosniff"
    assert headers["referrer-policy"] == "no-referrer"
    assert f"/assets/app.js?t={t}".encode() in body
    assert b"__TOKEN__" not in body

    status, headers, body = _get(server, f"/api/graph?t={t}")
    assert status == 200
    assert headers["content-type"].startswith("application/json")
    graph = json.loads(body)
    assert GPU not in {n["id"] for n in graph["nodes"]}

    status, headers, _ = _get(server, f"/assets/vendor/force-graph.min.js?t={t}")
    assert status == 200
    assert headers["content-type"].startswith("text/javascript")
    assert _get(server, f"/assets/app.css?t={t}")[1]["content-type"].startswith("text/css")

    status, _, body = _get(server, f"/api/note/{FTS5}?t={t}")
    note = json.loads(body)
    assert status == 200
    assert note["title"] == "Use SQLite FTS5 for local search"
    assert note["path"] == "topics/search/fts5.md"
    assert any("SUPERSEDES" in b.upper() or "CONFLICTS" in b for b in note["banners"])
    assert _get(server, f"/api/note/{GPU}?t={t}")[0] == 404


def test_server_blocks_traversal(server: VizServer):
    t = server.token
    for path in (
        "/assets/../server.py",
        "/assets/..%2Fserver.py",
        "/assets/%2e%2e/export.py",
        "/assets/vendor/../../server.py",
        "/assets//etc/passwd",
        "/assets/vendor/THIRD_PARTY_NOTICES.txt",
        "/nope",
    ):
        assert _get(server, f"{path}?t={t}")[0] == 404, path


def test_vendor_lock_matches():
    path = Path(__file__).resolve().parent.parent / "scripts" / "check_vendor.py"
    spec = importlib.util.spec_from_file_location("check_vendor", path)
    assert spec and spec.loader
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    assert module.check() == []


def test_cli_export(example: Path, tmp_path: Path, capsys: pytest.CaptureFixture[str]):
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
    assert main(["viz", "--brain", str(example), "--export", str(tmp_path / "x.txt")]) == 2
