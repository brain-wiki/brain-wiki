---
id: 01M3250V0079HR5VMN09AZ2JJQ
type: hub
title: "Index and search"
source: "docs/design/index-and-search.md"
---
# Index and search

The SQLite index, freshness, search ranking, the supersession guard, read, neighbors, orientation

Status: draft for review

Generated from `docs/design/index-and-search.md`.

## Notes
- [[index-and-search-1-requirements]]: Requirements (Index and search)
  - [[r1]]: R1: The index is derived entirely from the brain directory and can be…
  - [[r2]]: R2: Results reflect edits made a moment ago by any tool (Obsidian, git…
  - [[r3]]: R3: Filters (topic, type, tag, property, date) are applied before ranking,…
  - [[r4]]: R4: A superseded note is always returned with the note that replaced it…
  - [[r5]]: R5: Fast enough to call on every turn
  - [[r6]]: R6: Lexical search works with zero models
- [[index-and-search-2-location-and-lifecycle]]: Location and lifecycle
- [[index-and-search-3-schema]]: Schema
- [[index-and-search-4-freshness]]: Freshness
- [[index-and-search-5-supersession-guard]]: Supersession guard (Index and search)
- [[index-and-search-6-search]]: Search
  - [[index-and-search-61-inputs]]: Inputs
  - [[index-and-search-62-matching]]: Matching
  - [[index-and-search-63-ranking]]: Ranking
  - [[index-and-search-64-graph-expansion]]: Graph expansion
  - [[index-and-search-65-output]]: Output (Index and search)
- [[index-and-search-7-read]]: Read
- [[index-and-search-8-orientation-the-briefing]]: Orientation (the briefing)
- [[index-and-search-9-other-queries]]: Other queries
  - [[index-and-search-91-brain-list]]: Brain list
  - [[index-and-search-92-neighbors]]: Neighbors
- [[index-and-search-10-performance-budgets]]: Performance budgets (Index and search)
- [[index-and-search-11-failure-modes]]: Failure modes (Index and search)
- [[index-and-search-12-alternatives-considered]]: Alternatives considered (Index and search)
