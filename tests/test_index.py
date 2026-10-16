from __future__ import annotations

import shutil
import time
from pathlib import Path

import pytest

from brainwiki.config._resolve import open_brain
from brainwiki.engine import Engine
from brainwiki.index._orient import orient
from brainwiki.index._read import read
from brainwiki.index._search import search

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
        ids = {r["path"]: r["id"] for r in eng.db.execute("SELECT id, path FROM nodes")}
        fts5, policy = ids["topics/search/fts5.md"], ids["topics/storage/sqlite-version-policy.md"]
        edges = {
            (r["src"], r["dst"], r["rel"])
            for r in eng.db.execute("SELECT src, dst, rel FROM edges WHERE dst IS NOT NULL")
        }
        # a body link in each direction, and the metadata links with their own relations
        assert {(fts5, policy, "links_to"), (policy, fts5, "links_to")} <= edges
        assert (ids["topics/search/ripgrep.md"], fts5, "superseded_by") in edges
        episode = ids["archive/episodes/2026/09/01M2Z44880248H248H248H248H.md"]
        assert (fts5, episode, "source") in edges


def test_guard_recall_both_directions(example: Path):
    with engine_for(example) as eng:
        old = _hit(search(eng, "ripgrep shell out"), "Use ripgrep for search")
        assert [g["label"] for g in old["guards"]] == ["superseded_by"]
        assert old["guards"][0]["title"] == "Use SQLite FTS5 for local search"
        new = _hit(search(eng, "FTS5 default backend"), "Use SQLite FTS5 for local search")
        labels = sorted(g["label"] for g in new["guards"])
        assert labels == ["supersedes"]


def test_any_host_reads_every_topic(example: Path):
    with engine_for(example, host="someone") as eng:
        assert _hit(search(eng, "GPU purchases frozen"), "No GPU spending this year")
        assert read(eng, "No GPU spending this year")["topic"] == "budget"


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
        assert "<!--" not in full["content"] and "{id:" not in full["content"]
        assert "## Facts\n\n- SQLite FTS5 is the default" in full["content"]
        assert '\nLinks:\n- cites "01M2Z44880248H248H248H248H"' in full["content"]
        assert '- supersedes "Use ripgrep for search"' in full["content"]
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
        eng.scan(force=True)
        assert _hit(search(eng, "quokka"), "Vector-only search proposal")
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


def test_orient_lists_topics_within_budget(example: Path):
    with engine_for(example, host="someone") as eng:
        text = orient(eng)["text"]
        assert "Prefer pytest" in text and "**search**" in text and "**budget**" in text
        assert len(text) <= eng.manifest.budgets.orient_max_tokens * 4


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


def test_editing_a_note_keeps_incoming_links_resolved(example: Path):
    with engine_for(example) as eng:
        eng.scan(force=True)
        note = example / "topics/search/fts5.md"
        note.write_text(note.read_text() + "\nOne more line.\n")
        eng.scan(paths=["topics/search/fts5.md"])
        unresolved = eng.db.execute(
            "SELECT raw_target FROM edges WHERE other IS NULL AND rel != 'links_to'"
        ).fetchall()
        assert unresolved == []
        hub_links = eng.db.execute(
            "SELECT other FROM edges WHERE raw_target='fts5' AND rel='links_to'"
        ).fetchall()
        assert hub_links and all(r["other"] for r in hub_links)


def test_read_raw_is_the_file_and_section_flags_agree(
    example: Path, capsys: pytest.CaptureFixture[str]
):
    from brainwiki.cli._main import main
    from brainwiki.errors import UsageError
    from brainwiki.index._read import format_read_text

    note = example / "topics/search/ripgrep.md"
    with engine_for(example) as eng:
        raw = read(eng, "ripgrep", mode="raw")
        assert (
            raw["banners"] and format_read_text(raw) == note.read_text()
        )  # no banners (index-and-search.md §7)
        assert read(eng, "fts5", section="facts")["mode"] == "section"  # --section implies it
        with pytest.raises(UsageError):
            read(eng, "fts5", mode="section")
        with pytest.raises(UsageError):
            read(eng, "fts5", mode="full", section="facts")
    assert main(["--brain", str(example), "read", "ripgrep", "--mode", "raw"]) == 0
    assert capsys.readouterr().out == note.read_text()
    assert main(["--brain", str(example), "read", "fts5", "--mode", "section"]) == 2


def test_where_matches_keys_stored_as_columns(example: Path):
    def paths(where: dict[str, str]) -> list[str]:
        return [r["path"] for r in search(eng, "", where=where, limit=50)["results"]]

    with engine_for(example) as eng:
        assert paths({"tags": "SEARCH"}) == ["topics/search/fts5.md"]  # a list matches any item
        assert paths({"aliases": "fts5 decision"}) == ["topics/search/fts5.md"]
        assert paths({"title": "Use ripgrep for search"}) == ["topics/search/ripgrep.md"]
        assert paths({"id": "01M4KT3JPSB7BP2SNSCAVC2SF5"}) == ["topics/search/ripgrep.md"]
