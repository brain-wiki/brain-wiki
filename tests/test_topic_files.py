"""brain-wiki's files in a topic folder (brain-format.md §2.2): the `_Index.md` topic page and
its legacy name, topic rules, and brain templates."""

from __future__ import annotations

import json
from pathlib import Path

import pytest
from tests.conftest import write

from brainwiki.cli._main import main
from brainwiki.config._manifest import parse_manifest
from brainwiki.config._resolve import open_brain
from brainwiki.engine import Engine
from brainwiki.errors import Conflict
from brainwiki.index._orient import agents_block, orient
from brainwiki.index._read import format_read_text, read
from brainwiki.index._search import search
from brainwiki.index._topics import _build_tree
from brainwiki.lifecycle import init_brain
from brainwiki.lint import fix, lint, validate, validate_rules
from brainwiki.templates import builtin_templates, fresh_page, resolve_template

ID_A = "01M4KT3JPRY4W6766VT18CQSA1"
ID_B = "01M4KT3JPRY4W6766VT18CQSA2"


def _note(root: Path, rel: str, title: str, body: str = "", fm: str = "") -> None:
    write(root, rel, f"---\n{fm}title: {title}\n---\n# {title}\n\n{body}\n")


def _codes(engine: Engine) -> dict[str, list[str]]:
    out: dict[str, list[str]] = {}
    for p in lint(engine).problems:
        out.setdefault(p.code, []).append(p.path)
    return out


# -- the topic page and its legacy name (D42) --------------------------------------------


def test_default_page_is_underscore_index_and_legacy_name_is_found():
    manifest = parse_manifest('format = 4\nid = "01M4KT3JPRY4W6766VT18CQS8Z"\n')
    assert manifest.layout.topic_page == "_Index.md"
    assert manifest.layout.legacy_topic_page == "index.md"
    tree = _build_tree(
        manifest,
        [
            "topics/new/_Index.md",
            "topics/old/index.md",
            "topics/both/_Index.md",
            "topics/both/index.md",  # the new name wins; the old file is a note
            "topics/none/note.md",
        ],
    )
    assert tree.pages == {
        "new": "topics/new/_Index.md",
        "old": "topics/old/index.md",
        "both": "topics/both/_Index.md",
    }


def test_a_brain_that_names_its_page_has_no_legacy_fallback():
    manifest = parse_manifest(
        'format = 4\nid = "01M4KT3JPRY4W6766VT18CQS8Z"\n[layout]\ntopic_page = "Index.md"\n'
    )
    assert manifest.layout.legacy_topic_page == ""
    tree = _build_tree(manifest, ["topics/a/Index.md", "topics/b/index.md"])
    assert tree.pages == {"a": "topics/a/Index.md"}
    internal = parse_manifest(
        'format = 4\nid = "01M4KT3JPRY4W6766VT18CQS8Z"\n[layout]\nlegacy_topic_page = "x.md"\n'
    )
    assert internal.layout.legacy_topic_page == "index.md"  # not a setting brain.toml can change
    assert internal.unknown_keys == ["layout.legacy_topic_page"]


def test_legacy_page_name_is_renamed_by_lint_fix_with_its_links(brain_dir: Path):
    _note(brain_dir, "topics/search/index.md", "Search", "## Notes\n- [[fts]]", f"id: {ID_A}\n")
    _note(
        brain_dir,
        "topics/search/fts.md",
        "FTS",
        "Part of [[search/index|Search]]; see [the page](index.md).",
        f"id: {ID_B}\n",
    )
    with Engine(open_brain(brain_dir)) as e:
        e.scan(force=True)
        kind = e.db.execute("SELECT kind FROM nodes WHERE id=?", (ID_A,)).fetchone()[0]
        assert kind == "topic"  # still the page before the rename
        assert _codes(e).get("BW410") == ["topics/search/index.md"]
        outcome = fix(e)
        assert any(p.code == "BW410" for p in outcome.applied)
    assert not (brain_dir / "topics/search/index.md").exists()
    assert (brain_dir / "topics/search/_Index.md").read_text().startswith(f"---\nid: {ID_A}")
    body = (brain_dir / "topics/search/fts.md").read_text()
    assert "[[topics/search/_Index|Search]]" in body and "[the page](_Index.md)" in body
    assert "| search | topics/search/_Index.md |" in (brain_dir / "AGENTS.md").read_text()
    with Engine(open_brain(brain_dir)) as e:
        e.scan(force=True)
        assert "BW410" not in _codes(e) and "BW310" not in _codes(e)


# -- topic rules (D43) -----------------------------------------------------------------


@pytest.fixture
def ruled(brain_dir: Path) -> Path:
    write(brain_dir, "topics/_Rules.md", "# Brain\n\n- One folder per area.\n")
    _note(brain_dir, "topics/people/_Index.md", "People", "Who is who.\n\n## Notes\n- [[rin]]")
    write(
        brain_dir, "topics/people/_Rules.md", "---\nx: 1\n---\n# People\n\n- One note per person.\n"
    )
    _note(brain_dir, "topics/people/rin.md", "Rin Sato", "Rin leads search.")
    write(brain_dir, "topics/drafts/_Rules.md", "- Drafts only.\n")  # rules alone: no topic
    return brain_dir


def test_rules_are_not_notes_and_do_not_make_topics(ruled: Path):
    with Engine(open_brain(ruled)) as e:
        e.scan(force=True)
        kinds = dict(e.db.execute("SELECT path, kind FROM files WHERE path LIKE '%_Rules.md'"))
        assert set(kinds.values()) == {"topic_rules"}
        assert not e.db.execute("SELECT 1 FROM nodes WHERE path LIKE '%_Rules.md'").fetchone()
        assert "drafts" not in e.topics.paths
        assert e.topics.rules_for("topics/people/rin.md") == [
            "topics/_Rules.md",
            "topics/people/_Rules.md",
        ]
        assert not search(e, "person")["results"]  # rules text is not searched
        assert not [p for p in lint(e).problems if p.path.endswith("_Rules.md")]


def test_reading_a_topic_page_includes_its_rules(ruled: Path):
    with Engine(open_brain(ruled)) as e:
        page = read(e, "topics/people/_Index.md")
        assert [r["path"] for r in page["rules"]] == ["topics/_Rules.md", "topics/people/_Rules.md"]
        text = format_read_text(page)
        assert "One folder per area." in text and "One note per person." in text
        assert "x: 1" not in text  # frontmatter is not part of the rules
        assert text.index("One folder per area.") < text.index("One note per person.")
        note = read(e, "topics/people/rin.md")
        assert note["rules"] == [{"path": "topics/_Rules.md"}, {"path": "topics/people/_Rules.md"}]
        assert (
            "Topic rules apply here: topics/_Rules.md, topics/people/_Rules.md" in note["content"]
        )
        assert "rules" not in read(e, "topics/people/rin.md", mode="raw")


def test_validate_names_the_rules_and_orient_says_where_they_are(
    ruled: Path, capsys: pytest.CaptureFixture[str]
):
    with Engine(open_brain(ruled)) as e:
        result, scope = validate(e, ["topics/people/rin.md"])
        assert validate_rules(e, scope) == ["topics/_Rules.md", "topics/people/_Rules.md"]
        text = orient(e)["text"]
        assert "`_Rules.md`" in text and "people" in text
        assert "read its `_Rules.md`" in agents_block(e)
    assert main(["validate", "topics/people/rin.md", "--json"]) == 1  # rin.md has no id yet
    assert json.loads(capsys.readouterr().out)["rules"] == [
        "topics/_Rules.md",
        "topics/people/_Rules.md",
    ]


def test_long_rules_are_reported_and_cut_when_read(ruled: Path):
    toml = ruled / "brain.toml"
    toml.write_text(toml.read_text() + "\n[budgets]\ntopic_rules_max_lines = 3\n")
    write(ruled, "topics/people/_Rules.md", "".join(f"- rule {i}\n" for i in range(10)))
    with Engine(open_brain(ruled)) as e:
        e.scan(force=True)
        assert _codes(e).get("BW411") == ["topics/people/_Rules.md"]
        text = read(e, "topics/people/_Index.md")["content"]
        assert "- rule 2" in text and "- rule 3" not in text and "cut at 3 lines" in text


def test_topic_rules_can_be_turned_off(ruled: Path):
    toml = ruled / "brain.toml"
    toml.write_text(toml.read_text() + '\n[layout]\ntopic_rules = ""\n')
    with Engine(open_brain(ruled)) as e:
        e.scan(force=True)
        assert not e.topics.rules and "drafts" in e.topics.paths  # now an ordinary note
        assert "rules" not in read(e, "topics/people/_Index.md")


# -- templates (D44) -------------------------------------------------------------------


def test_builtin_templates_are_lint_clean_brains(tmp_path: Path):
    names = [t.name for t in builtin_templates()]
    assert names == ["minimal"]  # fuller templates are the brain-wiki-samples brains
    for name in names:
        root = init_brain(tmp_path / name, name, resolve_template(name))
        assert (root / "topics/_Rules.md").is_file()
        with Engine(open_brain(root)) as e:
            e.scan(force=True)
            problems = [p for p in lint(e).problems if p.severity in ("error", "warning")]
            assert not problems, [str(p) for p in problems]
            assert len(e.topics.paths) >= 4 and all(e.topics.page(s) for s in e.topics.paths)
            ids = [r[0] for r in e.db.execute("SELECT fm_id FROM nodes WHERE kind='topic'")]
            assert all(ids) and len(set(ids)) == len(ids)
            assert "| people |" in (root / "AGENTS.md").read_text()


def test_two_brains_from_one_template_get_their_own_ids(tmp_path: Path):
    a = init_brain(tmp_path / "a", "a", resolve_template("minimal"))
    b = init_brain(tmp_path / "b", "b", resolve_template("minimal"))
    assert (a / "topics/People/_Index.md").read_text() != (
        b / "topics/People/_Index.md"
    ).read_text()


def test_a_brain_as_template_copies_pages_and_rules_but_no_notes(ruled: Path, tmp_path: Path):
    toml = ruled / "brain.toml"
    toml.write_text(toml.read_text() + '\n[layout]\ntopic_page = "{folder}.md"\n')
    (ruled / "topics/people/_Index.md").rename(ruled / "topics/people/people.md")
    write(ruled, "inbox/agents/x/_Rules.md", "not a template file\n")
    new = init_brain(tmp_path / "copy", "copy", resolve_template(str(ruled)))
    files = sorted(
        p.relative_to(new).as_posix() for p in (new / "topics").rglob("*") if p.is_file()
    )
    assert files == [
        "topics/_Rules.md",
        "topics/drafts/_Rules.md",
        "topics/people/_Index.md",  # renamed to the new brain's page name
        "topics/people/_Rules.md",
    ]
    page = (new / "topics/people/_Index.md").read_text()
    assert "Who is who." in page and "[[rin]]" not in page and "## Notes" in page


def test_a_template_never_overwrites(tmp_path: Path):
    target = tmp_path / "busy"
    write(target, "topics/People/_Index.md", "mine\n")
    with pytest.raises(Conflict):
        init_brain(target, "busy", resolve_template("minimal"))
    assert (target / "topics/People/_Index.md").read_text() == "mine\n"
    assert not (target / "brain.toml").exists()


def test_fresh_page_resets_identity_and_notes():
    text = (
        "---\nid: 01OLD\ntype: topic\ncreated: 2026-01-01\ntitle: P\n---\n# P\n\nAbout.\n\n"
        "## Notes\n- [[a]]: one\n  wrapped\n- [[b]]\n\n## Other\n- kept\n"
    )
    out = fresh_page(text)
    assert "01OLD" not in out and "created" not in out and "title: P" in out
    assert "[[a]]" not in out and "wrapped" not in out and "- kept" in out
    assert fresh_page("# Bare\n").startswith("---\nid: ")


def test_cli_init_with_template_and_templates_list(
    tmp_path: Path, capsys: pytest.CaptureFixture[str]
):
    assert main(["templates", "--json"]) == 0
    listed = json.loads(capsys.readouterr().out)["templates"]
    assert any(t["name"] == "minimal" and "Reference" in t["topics"] for t in listed)
    target = tmp_path / "small"
    assert main(["init", str(target), "--template", "minimal", "--json"]) == 0
    out = json.loads(capsys.readouterr().out)
    assert out["template"] == "minimal" and "topics/Reference/_Rules.md" in out["files"]
    assert main(["init", str(tmp_path / "x"), "--template", "nope"]) != 0


def test_setup_asks_for_a_built_in_a_folder_or_none(tmp_path: Path):
    from brainwiki.setup_wizard import _ask_template

    folder = tmp_path / "Sample"
    write(folder, "topics/Garden/_Index.md", "# Garden\n")
    said: list[str] = []
    assert _ask_template(lambda _: "", said.append).name == "minimal"
    assert _ask_template(lambda _: str(folder), said.append).root == folder.resolve()
    assert _ask_template(lambda _: "none", said.append) is None
    assert _ask_template(lambda _: "nope", said.append) is None  # three bad answers
