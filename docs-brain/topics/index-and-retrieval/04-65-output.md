---
id: 01M3250V00B68Z7GMVVGC95EVY
type: design
title: "Output (Index and retrieval)"
aliases: ["04 §6.5"]
tags: [index-and-retrieval]
source: "docs/design/04-index-and-retrieval.md#65-output"
bw-part_of:
  - "[[04-6-search]]"
---
# Output (Index and retrieval)

Structured result (MCP `structuredContent`; JSON from the CLI with
`--json`):

```json
{
  "brain": "personal",
  "query": "fts5 trigram",
  "results": [
    {
      "id": "01J9Z7Q2V8K3M4N5P6R7S8T9U0",
      "path": "topics/search/fts5.md",
      "title": "Use SQLite FTS5 for local search",
      "kind": "note", "topic": "search", "type": "decision",
      "status": "active", "updated": "2026-10-09",
      "score": 11.8,
      "snippet": "…the «trigram» tokenizer needs SQLite 3.34+…",
      "via": null,
      "taint": null,
      "guards": [
        {"label": "supersedes", "id": "01J8…", "title": "Use ripgrep for search",
         "path": "topics/search/ripgrep.md", "status": "superseded"}
      ]
    }
  ],
  "truncated": false,
  "total": 37,
  "next_cursor": "8",
  "facets": {"type": {"decision": 21, "fix": 9}, "topic": {"search": 30}, "tag": {}}
}
```

`total` counts every match before `limit`. `next_cursor` is present when
more results follow. `facets` appears only when requested. `score` is null
when results are ordered by date or title instead of relevance.

The text form (MCP text content, CLI default) shows each hit's path, which is
the handle for the next call, and puts guard warnings first:

```
1. Use SQLite FTS5 for local search  [decision · active · topics/search/fts5.md]
   …the trigram tokenizer needs SQLite 3.34+…
   ↳ supersedes: Use ripgrep for search (superseded)
2. Use ripgrep for search  [decision · SUPERSEDED · topics/search/ripgrep.md]
   ⚠ superseded by: Use SQLite FTS5 for local search, so prefer that note
```

Episode hits are raw and unreviewed. Their text is wrapped in an
`<untrusted-episode agent="…" taint="…">` envelope with a one-line
reminder that it is data, not instructions ([[security-and-privacy|10]]).
