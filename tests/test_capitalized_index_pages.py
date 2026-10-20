"""Topic pages named `Index.md`, as Obsidian folder notes and adopted vaults name them: once
brain.toml names no page, they are the old default name like `index.md`, and BW410 moves them
to `_Index.md` (D42)."""

from __future__ import annotations

from pathlib import Path

from tests.conftest import write

from brainwiki.config._manifest import parse_manifest
from brainwiki.config._resolve import open_brain
from brainwiki.engine import Engine
from brainwiki.index._topics import _build_tree
from brainwiki.lint import fix, lint
from brainwiki.templates import _page_in

ID_A = "01M4KT3JPRY4W6766VT18CQSB1"
ID_B = "01M4KT3JPRY4W6766VT18CQSB2"


def test_the_old_page_name_is_found_in_any_case():
    manifest = parse_manifest('format = 4\nid = "01M4KT3JPRY4W6766VT18CQS8Z"\n')
    tree = _build_tree(manifest, ["topics/a/Index.md", "topics/b/INDEX.md", "topics/c/_Index.md"])
    assert tree.pages == {
        "a": "topics/a/Index.md",
        "b": "topics/b/INDEX.md",
        "c": "topics/c/_Index.md",
    }
    assert _page_in(manifest.layout, "topics/a", ["Index.md", "note.md"]) == "Index.md"


def test_capitalized_pages_are_renamed_by_lint_fix_with_their_links(brain_dir: Path):
    write(
        brain_dir,
        "topics/search/Index.md",
        f"---\nid: {ID_A}\n---\n# Search\n\nThis page: [[search/Index|Search]]. "
        "Jump to [[#Notes]] or [the list](#notes).\n\n## Notes\n- [[fts]]\n",
    )
    write(
        brain_dir,
        "topics/search/fts.md",
        f"---\nid: {ID_B}\n---\n# FTS\n\nPart of [[search/Index|Search]]; see [the page](Index.md).\n",
    )
    with Engine(open_brain(brain_dir)) as e:
        e.scan(force=True)
        found = [p for p in lint(e).problems if p.code == "BW410"]
        assert [p.path for p in found] == ["topics/search/Index.md"]
        assert "named Index.md" in found[0].message
        assert any(p.code == "BW410" for p in fix(e).applied)
    assert not (brain_dir / "topics/search/Index.md").exists()
    page = (brain_dir / "topics/search/_Index.md").read_text()
    assert page.startswith(f"---\nid: {ID_A}")
    # A page's link to itself moves with it; links to its own headings stay as they were.
    assert "[[topics/search/_Index|Search]]" in page
    assert "[[#Notes]]" in page and "[the list](#notes)" in page
    body = (brain_dir / "topics/search/fts.md").read_text()
    assert "[[topics/search/_Index|Search]]" in body and "[the page](_Index.md)" in body
    with Engine(open_brain(brain_dir)) as e:
        e.scan(force=True)
        codes = {p.code for p in lint(e).problems}
        assert "BW410" not in codes and "BW310" not in codes
