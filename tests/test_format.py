from __future__ import annotations

from hypothesis import given, settings
from hypothesis import strategies as st

from brainwiki.format.claims import clean_claim_text, format_claim, parse_claim_block
from brainwiki.format.document import parse_document
from brainwiki.format.edit import append_to_section
from brainwiki.format.frontmatter import set_fields, split
from brainwiki.format.links import extract_links
from brainwiki.format.meta import format_meta, parse_meta
from brainwiki.format.relations import RelationError, format_relation, parse_relation_line

NOTE = """---
id: 01J9Z7Q2V8K3M4N5P6R7S8T9U0
type: decision
aliases: [FTS5 decision]
tags:
  - search
  - storage
created: 2026-10-07
---
# Use SQLite FTS5 for local search

Prose with a [[SQLite version policy]] link and `[[not a link]]`.

```
[[also not a link]]
```

## Claims
- SQLite FTS5 is the default search backend. <!-- id:c-01J9Z8A3QK7T0V5W2X4Y6Z8B1C; src:inbox/episodes/2026/10/01J9Z6B5N3M1K9H7G5F3D1S9A7.md#L4-L6; origin:agent; at:2026-10-07 -->
- ~~Search shells out to ripgrep.~~ <!-- id:c-01J8XQ4R6S8T0V2W4X6Y8Z0A2B; status:superseded; by:c-01J9Z8A3QK7T0V5W2X4Y6Z8B1C; at:2026-10-07 -->
- Trigram search needs SQLite 3.34 or newer.

## Relations
- part_of [[search]]
- depends_on [[SQLite version policy]] — needs the trigram tokenizer
- unless [[Vector-only search proposal]] (unless: embeddings enabled)
- supersedes [[Use ripgrep for search]]
- frobnicates [[Nothing]]
"""


def test_frontmatter_parses_dates_and_lists():
    fm = split(NOTE)
    assert fm.present and fm.error is None
    assert fm.data["created"] == "2026-10-07"
    assert fm.data["tags"] == ["search", "storage"]


def test_document_structure():
    doc = parse_document("topics/search/fts5.md", NOTE)
    assert doc.title == "Use SQLite FTS5 for local search"
    assert [c.status for c in doc.claims] == ["active", "superseded", "active"]
    assert doc.claims[0].id == "c-01J9Z8A3QK7T0V5W2X4Y6Z8B1C"
    assert doc.claims[2].has_meta is False
    verbs = [(r.verb, r.rel, r.flip) for r in doc.relations]
    assert ("part_of", "part_of", False) in verbs
    assert ("conflicts_with", "conflicts_with", False) in verbs
    alias = [r for r in doc.relations if r.is_alias][0]
    assert alias.qualifier == "unless" and alias.attrs == {"unless": "embeddings enabled"}
    assert any(code == "BW302" for _, code, _ in doc.problems)
    targets = [link.target for link in doc.links]
    assert targets == ["SQLite version policy"]
    assert "shells out" not in doc.body_text and "shells out" in doc.history_text
    assert "<!--" not in doc.body_text


def test_relation_inverses_store_one_direction():
    a = parse_relation_line("- superseded_by [[New]] (rotates_to)", 1)
    b = parse_relation_line("- supersedes [[Old]]", 1)
    assert not isinstance(a, RelationError) and not isinstance(b, RelationError)
    assert (a.rel, a.flip, a.qualifier) == ("supersedes", True, "rotates_to")
    assert (b.rel, b.flip) == ("supersedes", False)
    e = parse_relation_line("- enables [[Sync Server]] (feeds, weight=0.6, lag=1Q) - latency", 1)
    assert not isinstance(e, RelationError)
    assert (e.rel, e.flip, e.qualifier, e.attrs, e.note) == (
        "depends_on",
        True,
        "supplies_to",
        {"weight": "0.6", "lag": "1Q"},
        "margin",
    )
    md = parse_relation_line("- related_to [Other note](../x/Other%20note.md)", 3)
    assert not isinstance(md, RelationError) and md.target == "../x/Other note.md"


def test_relation_format_roundtrip():
    line = format_relation(
        "depends_on", "B", qualifier="builds_on", attrs={"weight": "0.5"}, note="why"
    )
    parsed = parse_relation_line(line, 1)
    assert not isinstance(parsed, RelationError)
    assert (parsed.verb, parsed.target, parsed.qualifier, parsed.attrs, parsed.note) == (
        "depends_on",
        "B",
        "builds_on",
        {"weight": "0.5"},
        "why",
    )


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


def test_set_fields_creates_frontmatter():
    out = set_fields("# T\n", {"id": "X", "type": "note"}, order_first=("id",))
    assert out.startswith("---\nid: X\ntype: note\n---\n# T")


def test_append_to_section_creates_claims_before_relations():
    text = "# T\n\nprose\n\n## Relations\n- part_of [[H]]\n"
    out = append_to_section(text, "claims", ["- one"], create_before="relations")
    assert out.index("## Claims") < out.index("## Relations")
    out2 = append_to_section(out, "claims", ["- two"])
    doc = parse_document("x.md", out2)
    assert [c.text for c in doc.claims] == ["one", "two"]
    assert len(doc.relations) == 1


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


@settings(max_examples=150)
@given(
    # A claim has words once comment markers are removed; writers never emit an empty one.
    st.text(min_size=1, max_size=120).filter(lambda s: clean_claim_text(s) and "~~" not in s),
    st.booleans(),
)
def test_claim_roundtrip(text, struck):
    line = format_claim(
        text, {"id": "c-01J9Z8A3QK7T0V5W2X4Y6Z8B1C", "at": "2026-10-10"}, struck=struck
    )
    claims, problems = parse_claim_block([(1, line)])
    assert not problems
    assert claims[0].struck == struck
    assert claims[0].text == " ".join(text.replace("<!--", "").replace("-->", "").split())
    assert claims[0].id == "c-01J9Z8A3QK7T0V5W2X4Y6Z8B1C"
