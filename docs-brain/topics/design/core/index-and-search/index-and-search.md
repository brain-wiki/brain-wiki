---
id: 01M3250V0079HR5VMN09AZ2JJQ
type: hub
title: "Index and search"
source: "docs/design/index-and-search.md"
---
# Index and search

The SQLite index, freshness, search ranking, the supersession guard, read, neighbors, orientation

The index is a SQLite database derived from a brain's files. Search, read,
neighbors, orientation, lint, and the visualizer all query it. The code is
in `src/brainwiki/index/`.

Generated from `docs/design/index-and-search.md`.

## Notes
- [[index-and-search-1-requirements]]: Requirements (Index and search)
  - [[r1]]: R1: The index is derived entirely from the brain folder and can be deleted…
  - [[r2]]: R2: Results reflect edits made a moment ago by any tool (Obsidian, git…
  - [[r3]]: R3: Filters (topic, type, tag, property, date) apply before ranking
  - [[r4]]: R4: A superseded note always comes with the note that replaced it (brain…
  - [[r5]]: R5: Search p95 under 50 ms and a freshness check under 150 ms at 10k notes
  - [[r6]]: R6: Lexical search works without any model
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
