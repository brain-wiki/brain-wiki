from __future__ import annotations

from hypothesis import given, settings
from hypothesis import strategies as st

from brainwiki.format.document import parse_document
from brainwiki.format.edit import append_to_section
from brainwiki.format.fields import (
    claim_value,
    list_values,
    move_item,
    needs_format2,
    quote,
    relation_value,
    replace_item,
    to_format2,
)
from brainwiki.format.frontmatter import _yaml, set_fields, split
from brainwiki.format.links import extract_links
from brainwiki.format.meta import format_meta, parse_meta
from brainwiki.format.relations import RelationError, parse_relation_line

NOTE = """---
id: 01J9Z7Q2V8K3M4N5P6R7S8T9U0
type: decision
aliases: [FTS5 decision]
tags:
  - search
  - storage
created: 2026-10-07
bw-stage: accepted
bw-part_of: "[[search]]"
bw-depends_on:
  - "[[SQLite version policy]] — needs the trigram tokenizer"
bw-unless:
  - "[[Vector-only search proposal]] (unless: embeddings enabled)"
bw-supersedes: ["[[Use ripgrep for search]]"]
bw-claims:
  - "SQLite FTS5 is the default search backend. {id: c-01J9Z8A3QK7T0V5W2X4Y6Z8B1C; src: inbox/episodes/2026/10/01J9Z6B5N3M1K9H7G5F3D1S9A7.md#L4-L6; origin: agent; at: 2026-10-07}"
  - "Trigram search needs SQLite 3.34 or newer."
bw-claims-superseded:
  - "Search shells out to ripgrep. {id: c-01J8XQ4R6S8T0V2W4X6Y8Z0A2B; by: c-01J9Z8A3QK7T0V5W2X4Y6Z8B1C; at: 2026-10-07}"
---
# Use SQLite FTS5 for local search

Prose with a [[SQLite version policy]] link and `[[not a link]]`.
"""

NOTE_V1 = """---
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
    assert doc.fm["stage"] == "accepted" and not doc.frontmatter.legacy_fields
    assert [(c.status, c.key) for c in doc.claims] == [
        ("active", "bw-claims"),
        ("active", "bw-claims"),
        ("superseded", "bw-claims-superseded"),
    ]
    assert doc.claims[0].id == "c-01J9Z8A3QK7T0V5W2X4Y6Z8B1C"
    assert doc.claims[0].sources == ["inbox/episodes/2026/10/01J9Z6B5N3M1K9H7G5F3D1S9A7.md#L4-L6"]
    assert doc.claims[1].has_meta is False
    lines = NOTE.splitlines()
    assert lines[doc.claims[1].line - 1].strip() == '- "Trigram search needs SQLite 3.34 or newer."'
    rels = {(r.verb, r.target, r.qualifier) for r in doc.relations}
    assert rels == {
        ("part_of", "search", None),
        ("depends_on", "SQLite version policy", None),
        ("conflicts_with", "Vector-only search proposal", "unless"),
        ("supersedes", "Use ripgrep for search", None),
    }
    depends = next(r for r in doc.relations if r.verb == "depends_on")
    assert depends.note == "needs the trigram tokenizer" and depends.key == "bw-depends_on"
    assert lines[depends.line - 1].strip().startswith('- "[[SQLite version policy]]')
    assert next(r for r in doc.relations if r.verb == "conflicts_with").is_alias
    assert [link.target for link in doc.links] == ["SQLite version policy"]
    assert "default search backend" in doc.body_text
    assert "shells out" not in doc.body_text and "shells out" in doc.history_text
    assert not needs_format2(NOTE)


def test_format1_still_parses_and_converts():
    doc = parse_document("topics/search/fts5.md", NOTE_V1)
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
    assert needs_format2(NOTE_V1)

    out = to_format2(NOTE_V1)
    new = parse_document("topics/search/fts5.md", out)
    assert not needs_format2(out) and not new.problems[1:]
    assert [(c.text, c.id, c.status) for c in new.claims] == [
        (c.text, c.id, c.status) for c in sorted(doc.claims, key=lambda c: c.status != "active")
    ]
    assert {(r.verb, r.target, r.qualifier) for r in new.relations} == {
        (r.verb, r.target, r.qualifier) for r in doc.relations
    }
    assert "## Claims" not in out
    assert "- frobnicates [[Nothing]]" in out  # a line that does not parse stays put
    assert out.endswith(
        "# Use SQLite FTS5 for local search\n\nProse with a [[SQLite version policy]] link and `[[not a link]]`.\n\n```\n[[also not a link]]\n```\n\n## Relations\n- frobnicates [[Nothing]]\n"
    )
    assert to_format2(out) == out


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
        "feeds",
        {"weight": "0.6", "lag": "1Q"},
        "latency",
    )
    md = parse_relation_line("- related_to [Other note](../x/Other%20note.md)", 3)
    assert not isinstance(md, RelationError) and md.target == "../x/Other note.md"


def test_relation_value_roundtrip():
    value = relation_value("B", qualifier="builds_on", attrs={"weight": "0.5"}, note="why")
    doc = parse_document("x.md", f"---\nbw-depends_on:\n  - {quote(value)}\n---\n")
    (parsed,) = doc.relations
    assert (parsed.verb, parsed.target, parsed.qualifier, parsed.attrs, parsed.note) == (
        "depends_on",
        "B",
        "builds_on",
        {"weight": "0.5"},
        "why",
    )


def test_list_edits_change_only_their_field():
    out = replace_item(NOTE, "bw-claims", 1, [claim_value("Needs 3.35.", {"id": "c-2"})])
    assert list_values(out, "bw-claims")[1] == "Needs 3.35. {id: c-2}"
    changed = [a for a, b in zip(NOTE.splitlines(), out.splitlines(), strict=True) if a != b]
    assert changed == ['  - "Trigram search needs SQLite 3.34 or newer."']
    moved = move_item(
        NOTE,
        "bw-unless",
        "[[Vector-only search proposal]] (unless: embeddings enabled)",
        "bw-conflicts_with",
        "[[Vector-only search proposal]] (unless: embeddings enabled)",
    )
    assert "bw-unless" not in moved and split(moved).data["bw-conflicts_with"] == [
        "[[Vector-only search proposal]] (unless: embeddings enabled)"
    ]
    assert moved.split("\n---\n", 1)[1] == NOTE.split("\n---\n", 1)[1]


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


@settings(max_examples=300)
@given(st.text(max_size=80))
def test_quote_is_valid_yaml(text):
    yaml, loader = _yaml()
    assert yaml.load(f"k: {quote(text)}", Loader=loader)["k"] == " ".join(text.split())  # noqa: S506


@settings(max_examples=150)
@given(
    # Writers never emit an empty claim.
    st.text(min_size=1, max_size=120).filter(lambda s: s.split()),
    st.booleans(),
)
def test_claim_roundtrip(text, superseded):
    key = "bw-claims-superseded" if superseded else "bw-claims"
    value = claim_value(text, {"id": "c-01J9Z8A3QK7T0V5W2X4Y6Z8B1C", "at": "2026-10-10"})
    doc = parse_document("x.md", f"---\n{key}:\n  - {quote(value)}\n---\n# T\n")
    (claim,) = doc.claims
    assert claim.status == ("superseded" if superseded else "active")
    assert claim.text == " ".join(text.replace("{", "(").replace("}", ")").split())
    assert claim.id == "c-01J9Z8A3QK7T0V5W2X4Y6Z8B1C" and claim.line == 3
