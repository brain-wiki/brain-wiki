from __future__ import annotations

import shutil
import time
from pathlib import Path

import pytest

from brainwiki.config.resolve import open_brain
from brainwiki.engine import Engine
from brainwiki.errors import NotFound
from brainwiki.index.orient import orient
from brainwiki.index.read import read
from brainwiki.index.search import search

FIXTURE = Path(__file__).parent / "fixtures" / "example-brain"


@pytest.fixture
def example(tmp_path: Path) -> Path:
    root = tmp_path / "example"
    shutil.copytree(FIXTURE, root)
    return root


def engine_for(root: Path, host: str | None = None) -> Engine:
    return Engine(open_brain(root), host=host)


def _hit(result, title):
    return next(r for r in result["results"] if r["title"] == title)


def test_scan_indexes_and_resolves(example: Path):
    with engine_for(example) as eng:
        stats = eng.scan(force=True)
        assert stats.added >= 12
        unresolved = eng.db.execute(
            "SELECT raw_target FROM edges WHERE rel!='links_to' AND other IS NULL"
        ).fetchall()
        assert unresolved == []
        rows = eng.db.execute("SELECT src, dst, verb FROM edges WHERE rel='depends_on'").fetchall()
        fts5 = eng.db.execute(
            "SELECT id FROM nodes WHERE title LIKE 'Use SQLite FTS5%'"
        ).fetchone()["id"]
        # both declarations (depends_on on fts5, enables on the policy) store fts5 -> policy
        assert {(r["src"] == fts5) for r in rows} == {True}
        assert len(rows) == 2


def test_guard_recall_both_directions(example: Path):
    with engine_for(example) as eng:
        old = _hit(search(eng, "ripgrep shell out"), "Use ripgrep for search")
        assert [g["label"] for g in old["guards"]] == ["superseded_by"]
        assert old["guards"][0]["title"] == "Use SQLite FTS5 for local search"
        new = _hit(search(eng, "FTS5 default backend"), "Use SQLite FTS5 for local search")
        labels = sorted(g["label"] for g in new["guards"])
        assert labels == ["conflicts_with", "supersedes"]


def test_privacy_hides_guard_but_counts_it(example: Path):
    with engine_for(example, host="someone") as eng:
        hit = _hit(search(eng, "vector embeddings"), "Vector-only search proposal")
        assert all(g["title"] != "No GPU spending this year" for g in hit["guards"])
        assert hit["hidden_guards"] == {"conflicts_with": 1}
        assert not [
            r for r in search(eng, "GPU purchases frozen")["results"] if r["topic"] == "budget"
        ]
        with pytest.raises(NotFound):
            read(eng, "No GPU spending this year")
    with engine_for(example, host="trusted") as eng:
        hit = _hit(search(eng, "vector embeddings"), "Vector-only search proposal")
        assert "No GPU spending this year" in [g["title"] for g in hit["guards"]]


def test_superseded_text_ranks_low_and_not_in_snippet(example: Path):
    with engine_for(example) as eng:
        result = search(eng, "ripgrep")
        fts5 = _hit(result, "Use SQLite FTS5 for local search")
        assert "shells out" not in (fts5["snippet"] or "")


def test_read_banners_and_modes(example: Path):
    with engine_for(example) as eng:
        res = read(eng, "ripgrep")
        assert res["banners"][0].startswith("⚠ SUPERSEDED by")
        hub = read(eng, "Search")
        assert (
            hub["mode"] == "outline"
            and "Use SQLite FTS5 for local search" in hub["content"]
            or hub["backlinks"]
        )
        full = read(eng, "FTS5 decision")
        assert "<!--" not in full["content"] and "(superseded)" in full["content"]
        ep = read(eng, eng.db.execute("SELECT id FROM nodes WHERE kind='episode'").fetchone()["id"])
        assert ep["content"].startswith("<untrusted-episode")


def test_freshness_picks_up_edits_and_renames(example: Path):
    with engine_for(example) as eng:
        eng.scan(force=True)
        note = example / "topics/search/vector-only.md"
        time.sleep(0.01)
        note.write_text(
            note.read_text().replace(
                "embeddings and a vector index", "embeddings via quokka vectors"
            )
        )
        assert _hit(
            search(eng, "quokka", intent="none")
            if not eng.scan(force=True)
            else search(eng, "quokka"),
            "Vector-only search proposal",
        )
        target = example / "topics/storage/sqlite-policy.md"
        (example / "topics/storage/sqlite-version-policy.md").rename(target)
        stats = eng.scan(force=True)
        assert stats.renamed == 1
        old_path = eng.db.execute("SELECT path FROM path_history").fetchone()["path"]
        assert old_path.endswith("sqlite-version-policy.md")
        # links by file name now dangle until fixed; the id-based node still exists
        assert (
            eng.db.execute(
                "SELECT COUNT(*) FROM nodes WHERE path=?", ("topics/storage/sqlite-policy.md",)
            ).fetchone()[0]
            == 1
        )


def test_orient_respects_profile_and_budget(example: Path):
    with engine_for(example, host="someone") as eng:
        text = orient(eng)["text"]
        assert "Prefer pytest" in text and "**search**" in text and "budget" not in text
        assert len(text) <= eng.manifest.budgets.orient_max_tokens * 4
    with engine_for(example, host="trusted") as eng:
        assert "**budget**" in orient(eng)["text"]


def test_cjk_and_short_queries(example: Path):
    note = example / "topics/search/cjk.md"
    note.write_text("# 中文检索\n\n支持中文全文检索测试。\n")
    with engine_for(example) as eng:
        assert search(eng, "全文检索")["results"]
        assert search(eng, "检索")["results"]


def test_rebuild_matches_incremental(example: Path):
    with engine_for(example) as eng:
        eng.scan(force=True)
        before = sorted(tuple(r) for r in eng.db.execute("SELECT src, dst, rel FROM edges"))
        eng.rebuild()
        after = sorted(tuple(r) for r in eng.db.execute("SELECT src, dst, rel FROM edges"))
        assert before == after
