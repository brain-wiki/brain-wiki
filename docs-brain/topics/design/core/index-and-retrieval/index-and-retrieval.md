---
id: 01M3250V00V4ZSAV5XWE176HHC
type: hub
title: "Index and retrieval"
source: "docs/design/04-index-and-retrieval.md"
---
# Index and retrieval

SQLite schema, freshness, search ranking, the supersession guard, read, neighbors, orientation

Status: draft for review

Generated from `docs/design/04-index-and-retrieval.md`.

## Notes
- [[04-1-requirements]]: Requirements (Index and retrieval)
  - [[r1]]: R1: The index is derived entirely from the brain directory and can be…
  - [[r2]]: R2: Results reflect edits made a moment ago by any tool (Obsidian, git…
  - [[r3]]: R3: Filters (topic, type, tag, property, date) are applied before ranking,…
  - [[r4]]: R4: A superseded note is always returned with the note that replaced it (02…
  - [[r5]]: R5: Fast enough to call on every turn
  - [[r6]]: R6: Lexical search works with zero models
- [[04-2-location-and-lifecycle]]: Location and lifecycle
- [[04-3-schema]]: Schema
- [[04-4-freshness]]: Freshness
- [[04-5-supersession-guard]]: Supersession guard (Index and retrieval)
- [[04-6-search]]: Search
  - [[04-61-inputs]]: Inputs
  - [[04-62-matching]]: Matching
  - [[04-63-ranking]]: Ranking
  - [[04-64-graph-expansion]]: Graph expansion
  - [[04-65-output]]: Output (Index and retrieval)
- [[04-7-read]]: Read
- [[04-8-orientation-the-briefing]]: Orientation (the briefing)
- [[04-9-other-queries]]: Other queries
  - [[04-91-brain-list]]: Brain list
  - [[04-92-neighbors]]: Neighbors
- [[04-10-performance-budgets]]: Performance budgets (Index and retrieval)
- [[04-11-failure-modes]]: Failure modes (Index and retrieval)
- [[04-12-alternatives-considered]]: Alternatives considered (Index and retrieval)
