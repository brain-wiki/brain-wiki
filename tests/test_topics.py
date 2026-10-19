"""The topic tree (brain-format.md §2): nested topics, inheritance, reorganizing."""

from __future__ import annotations

from pathlib import Path

import pytest
from tests.conftest import write

from brainwiki.cli._main import main
from brainwiki.config._manifest import parse_manifest
from brainwiki.config._resolve import open_brain
from brainwiki.engine import Engine
from brainwiki.index._neighbors import neighbors
from brainwiki.index._orient import orient
from brainwiki.index._search import search
from brainwiki.index._topics import _build_tree
from brainwiki.lint import lint
from brainwiki.runs._undo import undo
from brainwiki.write._move import move_note

MANIFEST = """format = 3
id = "01M4KT3JPRY4W6766VT18CQS8Z"
[topics.rin-sato]
title = "Rin Sato"
[topics.handbook]
path = "topics/search/guide"
"""


def test_tree_slugs_and_parents():
    manifest = parse_manifest(MANIFEST)
    tree = _build_tree(
        manifest,
        [
            "topics/people/index.md",
            "topics/people/rin-sato/index.md",
            "topics/people/rin-sato/meetings/2026-10-01.md",  # no topic page: still a topic
            "topics/people/rin-sato/drafts/idea.md",
            "topics/people/notes/index.md",
            "topics/search/fts.md",
            "topics/search/notes/index.md",
            "topics/search/guide/index.md",
            "topics/search/images/flow.png",  # attachments only: not a topic
            "inbox/episodes/index.md",  # not under topics/
        ],
    )
    assert tree.paths == {
        "people": "topics/people",
        "search": "topics/search",
        "rin-sato": "topics/people/rin-sato",  # declared without a path: found by slug
        "meetings": "topics/people/rin-sato/meetings",
        "drafts": "topics/people/rin-sato/drafts",
        "notes": "topics/people/notes",
        "search-notes": "topics/search/notes",  # a clash takes its parent's slug as prefix
        "handbook": "topics/search/guide",  # an explicit path wins its folder
    }
    assert tree.parent("meetings") == "rin-sato" and tree.ancestors("meetings") == [
        "rin-sato",
        "people",
    ]
    assert tree.roots() == ["people", "search"]
    assert tree.for_path("topics/people/rin-sato/meetings/2026-10-01.md") == "meetings"
    assert tree.for_path("topics/people/rin-sato/drafts/idea.md") == "drafts"
    assert tree.expand(["people"]) == {"people", "rin-sato", "meetings", "drafts", "notes"}


def _note(root: Path, rel: str, title: str, body: str = "", extra: str = "") -> None:
    write(root, rel, f"---\ntitle: {title}\n{extra}---\n# {title}\n\n{body}\n")


@pytest.fixture
def people(brain_dir: Path) -> Path:
    _note(brain_dir, "topics/people/index.md", "People", "## Notes\n- [[rin-sato/index|Rin Sato]]")
    _note(brain_dir, "topics/people/rin-sato/index.md", "Rin Sato", "## Notes\n- [[priority]]")
    _note(brain_dir, "topics/people/rin-sato/priority.md", "Priority", "Ship the search rewrite.")
    _note(brain_dir, "topics/search/index.md", "Search", "## Notes\n- [[fts]]")
    _note(
        brain_dir,
        "topics/search/fts.md",
        "FTS",
        "See [[priority]] and [p](../people/rin-sato/priority.md).",
    )
    return brain_dir


def test_nested_topic_takes_its_notes(people: Path):
    with Engine(open_brain(people)) as e:
        e.scan(force=True)
        row = e.db.execute(
            "SELECT topic FROM nodes WHERE path='topics/people/rin-sato/priority.md'"
        ).fetchone()
        assert row["topic"] == "rin-sato"
        page = e.db.execute(
            "SELECT kind FROM nodes WHERE path='topics/people/rin-sato/index.md'"
        ).fetchone()
        assert page["kind"] == "topic"
        up = neighbors(e, "topics/people/rin-sato/index.md", direction="in")
        assert [n["path"] for n in up["nodes"] if n["id"] != up["root"]] == [
            "topics/people/index.md"
        ]
        hits = search(e, "", topics=["people"])["results"]
        assert "topics/people/rin-sato/priority.md" in {h["path"] for h in hits}
        assert not [p for p in lint(e).problems if p.code == "BW404"]
        text = orient(e)["text"]
        assert (
            "**people**" in text and "1 sub-topics: rin-sato" in text and "**rin-sato**" not in text
        )


def test_only_the_page_file_is_a_topic_page(people: Path):
    _note(people, "topics/people/overview.md", "Overview", extra="type: hub\n")
    _note(people, "topics/people/roster.md", "Roster", extra="type: topic\n")
    with Engine(open_brain(people)) as e:
        e.scan(force=True)
        kinds = dict(e.db.execute("SELECT path, kind FROM nodes WHERE topic = 'people'"))
        assert kinds == {
            "topics/people/index.md": "topic",
            "topics/people/overview.md": "note",
            "topics/people/roster.md": "note",
        }
        assert next(r for r in orient(e)["topics"] if r["slug"] == "people")["page"] == (
            "topics/people/index.md"
        )


def test_every_folder_is_a_sub_topic_with_or_without_a_page(people: Path):
    _note(people, "topics/people/ann/one-on-one.md", "1:1 with Ann")
    with Engine(open_brain(people)) as e:
        e.scan(force=True)
        topic = "SELECT topic FROM nodes WHERE path='topics/people/ann/one-on-one.md'"
        assert e.db.execute(topic).fetchone()[0] == "ann"
        assert e.topics.parent("ann") == "people"
        assert not [p for p in lint(e).problems if p.code == "BW404"]  # a sub-topic needs no page
        _note(people, "topics/people/ann/index.md", "Ann")
        e.scan(paths=["topics/people/ann/index.md"])
        assert e.db.execute(topic).fetchone()[0] == "ann"
        kind = "SELECT kind FROM nodes WHERE path='topics/people/ann/index.md'"
        assert e.db.execute(kind).fetchone()[0] == "topic"
        (people / "topics/people/ann/index.md").unlink()
        e.scan(paths=["topics/people/ann/index.md"])
        assert e.db.execute(topic).fetchone()[0] == "ann"
        (people / "topics/people/ann/one-on-one.md").unlink()
        e.scan(paths=["topics/people/ann/one-on-one.md"])
        assert "ann" not in e.topics.paths  # a folder with no files is not a topic


def test_topics_command_prints_the_tree(people: Path, capsys: pytest.CaptureFixture[str]):
    assert main(["topics"]) == 0
    out = capsys.readouterr().out
    assert "- people: People  (0 notes, 1 with sub-topics)" in out
    assert "  - rin-sato: Rin Sato" in out
    assert main(["topics", "rin-sato"]) == 0
    assert capsys.readouterr().out.startswith("- rin-sato")


def test_mv_moves_a_topic_folder_and_keeps_its_identity(people: Path):
    with Engine(open_brain(people)) as e:
        record = move_note(e, "topics/people/rin-sato", "topics/rin-sato")
        assert not (people / "topics/people/rin-sato").exists()
        assert (people / "topics/rin-sato/priority.md").exists()
        fts = (people / "topics/search/fts.md").read_text()
        assert "[[priority]]" in fts and "](../rin-sato/priority.md)" in fts
        e.scan()
        assert (
            e.topics.paths["rin-sato"] == "topics/rin-sato" and e.topics.parent("rin-sato") is None
        )
        row = e.db.execute("SELECT topic FROM nodes WHERE path='topics/rin-sato/priority.md'")
        assert row.fetchone()[0] == "rin-sato"
        undo(e, record.run)
        assert (people / "topics/people/rin-sato/priority.md").exists()
