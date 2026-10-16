---
id: 01M3250V004X9YS8864RYJE45T
type: proposal
title: "Body (Notes as content (format 3))"
tags: [proposals]
source: "docs/proposals/notes-as-content.md#32-body"
---
# Body (Notes as content (format 3))

Free Markdown. Nothing in it is parsed except links (02 §6.5). Orientation
recommends a shape, and nothing enforces it:

```markdown
---
id: 01J9Z7Q2K4M6N8P0R2S4T6V8W0
type: decision
title: Use SQLite FTS5 for local search
bw-sources:
  - "[[archive/episodes/2026/10/01J9Z6B5N3M1K9H7G5F3D1S9A7]]"
updated: 2026-10-09
---
# Use SQLite FTS5 for local search

Lumen searches notes with SQLite FTS5 instead of shelling out to ripgrep.

- FTS5 is the default search backend since Lumen 0.4.
- Trigram search needs SQLite 3.34 or newer; see [[SQLite version policy]].
- Tried ripgrep over 10k notes: 1.8 s per query, too slow for search-as-you-type.

Replaced the earlier [[Use ripgrep for search]] approach.
```

- The first paragraph is the summary; search snippets and outlines use it.
- One fact per bullet, specific (numbers, versions, dates). Failed
  approaches are facts too.
- Connections are wikilinks in sentences, so the reason sits next to the
  link.
