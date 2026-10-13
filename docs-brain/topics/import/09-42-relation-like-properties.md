---
id: 01M3250V00A5W34V07C4AATN9G
type: design
title: "Relation-like properties"
aliases: ["09 §4.2"]
tags: [import]
source: "docs/design/09-import.md#42-relation-like-properties"
bw-part_of:
  - "[[09-4-normalization-rules]]"
---
# Relation-like properties

| Property (case-insensitive) | Field written |
|---|---|
| `parent`, `up`, `part_of`, `topic`, `moc` | `bw-part_of` |
| `children`, `down`, `has_part` | `bw-has_part` |
| `related`, `see_also`, `links` | `bw-related_to` |
| `depends_on`, `requires`, `prerequisite` | `bw-depends_on` |
| `supersedes`, `replaces` | `bw-supersedes` |
| `superseded_by`, `replaced_by` | `bw-superseded_by` |
| `next`, `prev`, `previous` | `bw-related_to` with qualifier `(next)` / `(previous)` |
| `source`, `sources` (when the value is a wikilink) | `bw-depends_on` with qualifier `(source)` |

Accepted value shapes: a YAML list of wikilinks, a quoted single wikilink,
a comma-joined string of several wikilinks (`"[[A]], [[B]]"`, a common
artifact of tools that write lists as strings), and bare names (resolved
like link targets). Values that are not links (`source: "a book"`) are
left alone.
