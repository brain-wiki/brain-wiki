# D33: brain-wiki does not extract meaning

Status: accepted.
Argued in: [brain format §6](../design/brain-format.md#6-notes), [index and search](../design/index-and-search.md).

brain-wiki does not extract meaning from content: no claims, no relation types. It indexes content only as Markdown: words for search, headings, and where links point. Lifecycle is metadata (`status`, `bw-superseded_by`) and provenance an optional note-level `bw-sources` list.

## Alternatives considered

Claims with per-fact provenance and typed relations (format 2)
