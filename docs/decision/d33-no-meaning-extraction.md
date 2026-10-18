# D33: brain-wiki does not extract meaning

Status: accepted, amended by [D39](d39-relation-fields.md).
Argued in: [brain format §6](../design/brain-format.md#6-notes), [index and search](../design/index-and-search.md).

brain-wiki does not extract meaning from what a note says: it has no claims and no relation types. It indexes a note as Markdown, reading the words for search, the headings, and where links point. Lifecycle is metadata (`status`, `bw-superseded_by`), and provenance is an optional note-level `bw-sources` list.

## Alternatives considered

- Claims with provenance per fact, and typed relations (format 2).
