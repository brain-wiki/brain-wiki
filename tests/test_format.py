from __future__ import annotations

from hypothesis import given, settings
from hypothesis import strategies as st

from brainwiki.format._convert import legacy, mark_superseded, to_format3
from brainwiki.format._document import parse_document
from brainwiki.format._edit import append_to_section
from brainwiki.format._fields import list_values, quote
from brainwiki.format._frontmatter import _yaml, set_fields, split
from brainwiki.format._links import extract_links
from brainwiki.format._meta import format_meta, parse_meta
from brainwiki.format._relations import RelationError, parse_relation_line

NOTE = """---
id: 01J9Z7Q2V8K3M4N5P6R7S8T9U0
type: decision
title: Use SQLite FTS5 for local search
aliases: [FTS5 decision]
tags:
  - search
  - storage
created: 2026-10-07
bw-stage: accepted
bw-sources:
  - "[[archive/episodes/2026/10/01J9Z6B5N3M1K9H7G5F3D1S9A7]]"
  - https://sqlite.org/fts5.html
---
# Use SQLite FTS5 for local search

Prose with a [[SQLite version policy]] link and `[[not a link]]`.

## Facts

- SQLite FTS5 is the default search backend.

## Related

- Supersedes [[Use ripgrep for search]]
"""

NOTE_V2 = """---
id: 01J9Z7Q2V8K3M4N5P6R7S8T9U0
type: decision
title: Use SQLite FTS5 for local search
created: 2026-10-07
bw-part_of: "[[search]]"
bw-depends_on:
  - "[[SQLite version policy]] — needs the trigram tokenizer"
bw-unless:
  - "[[Vector-only search proposal]] (unless: embeddings enabled)"
bw-supersedes: ["[[Use ripgrep for search]]"]
bw-claims:
  - "SQLite FTS5 is the default search backend. {id: c-01J9Z8A3QK7T0V5W2X4Y6Z8B1C; src: inbox/episodes/2026/10/01J9Z6B5N3M1K9H7G5F3D1S9A7.md#L4-L6; origin: agent; at: 2026-10-07}"
  - "Trigram search needs SQLite 3.34 or newer. {src: https://sqlite.org/fts5.html}"
bw-claims-superseded:
  - "Search shells out to ripgrep. {id: c-01J8XQ4R6S8T0V2W4X6Y8Z0A2B; by: c-01J9Z8A3QK7T0V5W2X4Y6Z8B1C; reason: too slow}"
---
# Use SQLite FTS5 for local search

Prose with a [[SQLite version policy]] link.
"""

NOTE_V1 = """---
id: 01J9Z7Q2V8K3M4N5P6R7S8T9U0
type: decision
stage: accepted
---
# Use SQLite FTS5 for local search

Prose.

```
[[not a link]]
```

## Claims
- SQLite FTS5 is the default search backend. <!-- id:c-01J9Z8A3QK7T0V5W2X4Y6Z8B1C; src:inbox/episodes/2026/10/01J9Z6B5N3M1K9H7G5F3D1S9A7.md#L4-L6; origin:agent -->
- ~~Search shells out to ripgrep.~~ <!-- id:c-01J8XQ4R6S8T0V2W4X6Y8Z0A2B; status:superseded; by:c-01J9Z8A3QK7T0V5W2X4Y6Z8B1C -->

## Relations
- part_of [[search]]
- superseded_by [[Newer search]]
- frobnicates [[Nothing]]
"""


def test_frontmatter_parses_dates_and_lists():
    fm = split(NOTE)
    assert fm.present and fm.error is None
    assert fm.data["created"] == "2026-10-07"
    assert fm.data["tags"] == ["search", "storage"]


def test_document_reads_metadata_headings_and_links_only():
    doc = parse_document("topics/search/fts5.md", NOTE)
    assert doc.title == "Use SQLite FTS5 for local search"
    assert doc.fm["stage"] == "accepted" and not doc.frontmatter.legacy_fields
    assert [link.target for link in doc.links] == [
        "SQLite version policy",
        "Use ripgrep for search",
    ]
    assert [(rel, link.target, link.line) for rel, link in doc.meta_links] == [
        ("source", "archive/episodes/2026/10/01J9Z6B5N3M1K9H7G5F3D1S9A7", 12)
    ]
    assert [s.name for s in doc.sections if s.level == 2] == ["facts", "related"]
    assert "default search backend" in doc.body_text and not legacy(NOTE)


def test_superseded_by_is_a_meta_link():
    doc = parse_document(
        "x.md", '---\nstatus: superseded\nbw-superseded_by: "[[Newer]]"\n---\n# X\n'
    )
    assert [(rel, link.target) for rel, link in doc.meta_links] == [("superseded_by", "Newer")]
    assert not legacy(doc.text)


def test_format2_converts_to_body_markdown():
    found = legacy(NOTE_V2)
    assert [k for k, _ in found.fields] == [
        "bw-part_of",
        "bw-depends_on",
        "bw-unless",
        "bw-supersedes",
        "bw-claims",
        "bw-claims-superseded",
    ]
    assert found.supersedes == ["Use ripgrep for search"]
    assert "default search backend" in parse_document("x.md", NOTE_V2).body_text

    out = to_format3(NOTE_V2, page_names=frozenset({"topics/search/index", "search"}))
    assert not legacy(out)
    assert out.endswith(
        "Prose with a [[SQLite version policy]] link.\n\n"
        "## Facts\n\n"
        "- SQLite FTS5 is the default search backend.\n"
        "- Trigram search needs SQLite 3.34 or newer.\n\n"
        "## History\n\n"
        "- ~~Search shells out to ripgrep.~~ (too slow)\n\n"
        "## Related\n\n"
        "- Depends on [[SQLite version policy]] — needs the trigram tokenizer\n"
        "- Unless [[Vector-only search proposal]] (unless: embeddings enabled)\n"
        "- Supersedes [[Use ripgrep for search]]\n"
    )
    assert list_values(out, "bw-sources") == [
        "[[archive/episodes/2026/10/01J9Z6B5N3M1K9H7G5F3D1S9A7]]",
        "https://sqlite.org/fts5.html",
    ]
    assert (
        "part_of" not in out and "bw-claims" not in out
    )  # the topic page link is the folder's job
    assert to_format3(out) == out


def test_format1_converts_and_keeps_lines_it_cannot_read():
    found = legacy(NOTE_V1)
    assert [n for n, _ in found.sections] == ["claims", "relations"] and found.stage
    out = to_format3(NOTE_V1)
    fm = split(out)
    assert fm.data["status"] == "superseded" and fm.raw["bw-superseded_by"] == "[[Newer search]]"
    assert fm.raw["bw-stage"] == "accepted" and "stage" not in fm.raw
    assert '\nbw-superseded_by: "[[Newer search]]"\n' in out
    assert "## Claims" not in out and "<!--" not in out
    assert "## Relations" not in out
    assert out.endswith("## Related\n\n- Part of [[search]]\n- frobnicates [[Nothing]]\n")
    assert "```\n[[not a link]]\n```" in out and not legacy(out)


def test_mark_superseded_sets_status_and_link():
    out = mark_superseded("---\nid: X\ntype: decision\n---\n# Old\n", "New note")
    assert split(out).raw == {
        "id": "X",
        "type": "decision",
        "status": "superseded",
        "bw-superseded_by": "[[New note]]",
    }


def test_relation_lines_still_parse_for_conversion():
    a = parse_relation_line("- superseded_by [[New]] (rotates_to)", 1)
    b = parse_relation_line("- enables [[Sync Server]] (feeds, weight=0.6) - latency", 1)
    assert not isinstance(a, RelationError) and not isinstance(b, RelationError)
    assert (a.verb, a.target, a.qualifier) == ("superseded_by", "New", "rotates_to")
    assert (b.rel, b.flip, b.attrs, b.note) == ("depends_on", True, {"weight": "0.6"}, "latency")
    md = parse_relation_line("- related_to [Other note](../x/Other%20note.md)", 3)
    assert not isinstance(md, RelationError) and md.target == "../x/Other note.md"


def test_links_skip_code_and_capture_md_and_embeds():
    links = extract_links(
        ["[[A|label]] ![[B#h]] [c](notes/C%20d.md) [x](https://e.com) `[[D]]` [i](img.png)"]
    )
    assert [(lk.target, lk.label, lk.embed, lk.kind) for lk in links] == [
        ("A", "label", False, "wiki"),
        ("B", None, True, "wiki"),
        ("notes/C d.md", "c", False, "md"),
    ]
    in_table = extract_links([r"| [[A\|label]] | x |"])
    assert [(lk.target, lk.label) for lk in in_table] == [("A", "label")]


def test_meta_quotes_and_roundtrip():
    meta = {"id": "r-1", "quote": 'use pytest; "always"', "at": "2026-10-10"}
    assert parse_meta(format_meta(meta)[5:-4]) == meta


def test_set_fields_inserts_and_replaces_block_lists():
    out = set_fields(NOTE, {"status": "superseded", "tags": ["a"]})
    fm = split(out)
    assert fm.data["status"] == "superseded" and fm.data["tags"] == ["a"]
    assert out.split("---", 2)[2] == NOTE.split("---", 2)[2]


def test_new_fields_land_before_brain_wiki_fields():
    out = set_fields(NOTE, {"source": "a book"})
    keys = [line.split(":")[0] for line in out.split("\n---\n")[0].splitlines()[1:]]
    keys = [k for k in keys if not k.startswith(" ")]
    assert keys.index("source") == keys.index("bw-stage") - 1


def test_set_fields_creates_frontmatter():
    out = set_fields("# T\n", {"id": "X", "type": "note"}, order_first=("id",))
    assert out.startswith("---\nid: X\ntype: note\n---\n# T")


def test_append_to_section_creates_it_before_another():
    text = "# T\n\nprose\n\n## Related\n- [[H]]\n"
    out = append_to_section(text, "notes", ["- one"], create_before="related")
    assert out.index("## Notes") < out.index("## Related")
    out2 = append_to_section(out, "notes", ["- two"])
    assert "## Notes\n- one\n- two\n\n## Related" in out2


_line = st.text(alphabet=st.characters(blacklist_categories=("Cs", "Cc")), max_size=40).map(
    lambda s: s.replace("---", "- -")
)


@settings(max_examples=150)
@given(
    st.lists(_line, min_size=1, max_size=12), st.text(alphabet="abcdefgh", min_size=1, max_size=8)
)
def test_set_fields_never_touches_body(body_lines, value):
    text = "---\nid: X\n---\n" + "\n".join(body_lines) + "\n"
    out = set_fields(text, {"status": value, "updated": "2026-01-01"})
    assert out.split("\n---\n", 1)[1] == text.split("\n---\n", 1)[1]


@settings(max_examples=300)
@given(st.text(max_size=80))
def test_quote_is_valid_yaml(text):
    yaml, loader = _yaml()
    assert yaml.load(f"k: {quote(text)}", Loader=loader)["k"] == " ".join(text.split())  # noqa: S506


@settings(max_examples=100)
@given(st.text(min_size=1, max_size=120).filter(lambda s: s.split()), st.booleans())
def test_converted_claims_keep_their_text(text, superseded):
    key = "bw-claims-superseded" if superseded else "bw-claims"
    note = f"---\nid: X\n{key}:\n  - {quote(text + ' {id: c-1}')}\n---\n# T\n"
    out = to_format3(note)
    assert not legacy(out) and "bw-claims" not in out
    section = "## History" if superseded else "## Facts"
    assert section in out and "{id: c-1}" not in out
