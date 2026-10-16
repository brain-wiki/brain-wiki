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

brain-wiki does not extract meaning from content: no claims, no relation types. It indexes content only as Markdown: words for search, headings, and where links point. Lifecycle is metadata (`status`, `bw-superseded_by`) and provenance an optional note-level `bw-sources` list.

### Alternatives considered

Claims with per-fact provenance and typed relations (format 2)
