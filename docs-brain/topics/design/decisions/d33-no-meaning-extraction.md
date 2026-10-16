---
id: 01M3250V004660AP8AVECFXVPJ
type: decision
title: "D33: brain-wiki does not extract meaning"
aliases: ["D33"]
source: "docs/decision/d33-no-meaning-extraction.md"
---
# D33: brain-wiki does not extract meaning

Status: accepted.
Argued in: [[brain-format-6-notes|brain format §6]], [[index-and-search|index and search]].

brain-wiki does not extract meaning from what a note says: it has no claims and no relation types. It indexes a note as Markdown, reading the words for search, the headings, and where links point. Lifecycle is metadata (`status`, `bw-superseded_by`), and provenance is an optional note-level `bw-sources` list.

### Alternatives considered

- Claims with provenance per fact, and typed relations (format 2).
