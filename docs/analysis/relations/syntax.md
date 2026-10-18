# Writing relations in a note

Status: settled by the maintainer, 2026-10-17 and 2026-10-18.
Study: [Typed relations](README.md).

How a relation is written decides who can write it, what lint can check,
and whether people can follow it. The direction is set: a relation is a
link in a frontmatter field, and the reason it holds is prose in the body
that brain-wiki never parses. This page records that design, its
consequences, and the options it was chosen over.

## At a glance

- **Relations are metadata.** Each relation is a quoted wikilink in a `bw-<verb>` frontmatter field, the way `bw-superseded_by` already works.
- **The body section is free.** A `## Relations` section, if the user writes one, is prose for people: it may explain the fields or say something else entirely.
- **Format 2's mistake is not repeated.** Format 2 put sentences inside YAML strings; here frontmatter holds links and nothing else.

## 1. The design

```markdown
---
id: 01J9Z7Q2V8K3M4N5P6R7S8T9W0
title: Use SQLite FTS5 for Local Search
bw-part_of: ["[[App v2 Launch]]"]
bw-depends_on: ["[[SQLite Version Policy]]"]
bw-conflicts_with: ["[[Vector-Only Search Proposal]]"]
---
# Use SQLite FTS5 for Local Search

Search runs on SQLite FTS5 instead of ripgrep.

## Relations

- The search rewrite is the first milestone of [[App v2 Launch]].
- Trigram search needs SQLite 3.34 or newer, which [[SQLite Version Policy]] guarantees.
- [[Vector-Only Search Proposal]] drops FTS5; the two cannot both ship.
```

The relation set: a note's folder gives its topic, and four fields give
everything else.

| Relation | Written as | On which note | Guard |
|---|---|---|---|
| [topic](topic.md) | The folder the note sits in | Every note | no |
| [part_of](part-of.md) | `bw-part_of` | The part | no |
| [depends_on](depends-on.md) | `bw-depends_on` | The dependent | no |
| [conflicts_with](conflicts-with.md) | `bw-conflicts_with` | Either note, once; it applies to both | yes, while both are active |
| [supersedes](supersedes.md) | `bw-superseded_by` | The old note | yes |

[related_to](related-to.md) is not a field: a plain link already says it.

| Part | Holds | Read by brain-wiki |
|---|---|---|
| `bw-<verb>` field | One or more quoted wikilinks, nothing else | Yes: typed edges, guards, traversal, lint |
| `## Relations` section | Free prose, written or not as the user likes: it may explain the fields or have nothing to do with them | Only as text and plain links, like any section |

- A field holds one or more links, written as one value
  (`"[[Pricing Decision]]"`) or a list (`["[[A]]", "[[B]]"]`). Every
  relation field has this shape.
- A field item is exactly one quoted link. No qualifiers, notes, or
  separators: what format 2 wrote after the link moves to the body.
- Each relation has one field. A directed relation lives on one side,
  named in the table above; the other side sees it as a backlink. The
  symmetric `bw-conflicts_with` is written once, on either note.
- `## Relations` is never parsed and never checked against the fields. A
  relation without a sentence, and a sentence without a relation, are both
  fine.
- Each relation has exactly one field name. There are no alias fields
  (`bw-requires` is not `bw-depends_on`; it is an unknown field), following
  the [fewer concepts](../README.md#principle-fewer-concepts) principle.
- A field is a set of links, and the order of its items carries no meaning.
  Where order matters, the titles carry it.

## 2. Why this design

- **It fits what properties are for.** Obsidian treats properties as small
  atomic values, and a quoted wikilink is one, shown as a live link. Format
  3 already stores `bw-superseded_by` and `bw-sources` this way.
- **It separates what machines read from what people read.** The engine
  never parses prose ([D33](../../decision/d33-no-meaning-extraction.md)'s
  concern), and people never have to read a relation's reason out of a YAML
  string (format 2's failure).
- **It is easy to write and check.** Agents edit a YAML list; `brain
  validate` checks that each item is a link that resolves.

## 3. Consequences

| Area | Change |
|---|---|
| Format | A new format version, since format 3 notes treat both parts as legacy. A converter runs once per note, as one undoable run, with a dry run |
| Converter, from format 2 | Each relation string splits: the link goes to the field, the rest to `## Relations`. Inverse fields move to the canonical side: `bw-has_part` becomes `bw-part_of` on each part, `bw-enables` becomes `bw-depends_on` on the dependent, and `bw-supersedes` becomes `bw-superseded_by` on the old note, as format 3 already does. `bw-related_to` and `caused_by` relations become plain links in `## Relations` |
| Converter, from format 3 | The `## Related` bullets that format 3's converter wrote ("Part of [[x]]", "Depends on [[x]]", "Conflicts with [[x]]") become fields again, and each bullet stays as prose under `## Relations`. Other bullets stay as they are. This is the only time brain-wiki reads those bullets |
| Legacy detection | Today a `## Relations` section with bullets is read as format 1, and `bw-<verb>` fields as format 2 (BW117). Both detectors change: a `## Relations` section is never legacy, so format 1's parsed relations are no longer read (their links stay plain links), and format 2 fields are converted to link-only items |
| Decisions | [D33](../../decision/d33-no-meaning-extraction.md) gains: relation types are metadata the author declares, never inferred. [D32](../../decision/d32-format-3.md)'s "connections are body content" narrows to reasons |
| Lint | Field items must be quoted links that resolve; a `bw-` field that is not a known relation is an error, as unknown `bw-` fields are today (BW118). Nothing checks `## Relations` |
| Qualifiers | Format 2's `(weight=0.6, lag=1Q)` qualifiers have no place in a link-only item; domain detail moves to prose |
| Obsidian | Properties show the links; the body shows the reasons. GitHub renders frontmatter as a table without live links |

## 4. Options it was chosen over

| Option | What it was | Why not |
|---|---|---|
| A. Inline fields | `depends_on:: [[X]]` anywhere in the body, as Dataview reads it | Parses the body; reads as code without the plugin |
| B. Parsed `## Related` bullets | The leading verb phrase of each bullet read against an alias table | Parses prose; a reworded sentence silently loses its type |
| C. Inferred from the sentence | The index classifies each body link | Meaning extraction and model calls, ruled out by D33 and D8 |
| D. A guard field only | `bw-conflicts_with` beside `bw-superseded_by`, nothing else | Same storage as the chosen design, but brings back only the guard |
| E. Mapped user properties | `[relations] up = "part_of"` in `brain.toml` | Possible later as an import aid that rewrites properties into `bw-<verb>` fields |

## 5. Settled

| Question | Answer |
|---|---|
| Alias field names such as `bw-requires`? | No. One name per relation (2026-10-17) |
| A field on each side of a relation? | No. One field, in one canonical direction, chosen per relation; a symmetric relation is written once on either note (2026-10-17, 2026-10-18) |
| Does lint check `## Relations` against the fields? | No. The section is free-form (2026-10-17) |
| Is format 1's parsed `## Relations` still read? | No. The section is free-form, so it is never parsed (2026-10-17) |
| Which fields exist? | `bw-part_of`, `bw-depends_on`, `bw-conflicts_with`, and `bw-superseded_by`; `related_to` is dropped (2026-10-18) |
| What shape does a field have? | One or more quoted links, as one value or a list, for every field (2026-10-18) |
