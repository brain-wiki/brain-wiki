---
id: 01M3250V00A5W34V07C4AATN9G
type: design
title: "Relation-like properties"
aliases: ["09 §4.2"]
tags: [import]
source: "docs/design/09-import.md#42-relation-like-properties"
---
# Relation-like properties

| Property (case-insensitive) | Relation written |
|---|---|
| `parent`, `up`, `part_of`, `topic`, `moc` | `part_of` |
| `children`, `down`, `has_part` | `has_part` |
| `related`, `see_also`, `links` | `related_to` |
| `depends_on`, `requires`, `prerequisite` | `depends_on` |
| `supersedes`, `replaces` | `supersedes` |
| `superseded_by`, `replaced_by` | `superseded_by` |
| `next`, `prev`, `previous` | `related_to (next)` / `related_to (previous)` |
| `source`, `sources` (when the value is a wikilink) | `depends_on (source)` |

Accepted value shapes: a YAML list of wikilinks, a quoted single wikilink,
a comma-joined string of several wikilinks (`"[[A]], [[B]]"`, a common
artifact of tools that write lists as strings), and bare names (resolved
like link targets). Values that are not links (`source: "a book"`) are
left alone.

## Relations
- part_of [[09-4-normalization-rules]]
