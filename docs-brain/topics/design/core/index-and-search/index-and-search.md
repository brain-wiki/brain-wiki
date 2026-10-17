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
- [[index-and-search-2-location-and-lifecycle]]: Location and lifecycle
- [[index-and-search-3-schema]]: Schema
- [[index-and-search-4-freshness]]: Freshness
- [[index-and-search-5-supersession-guard]]: Supersession guard (Index and search)
- [[index-and-search-6-search]]: Search
- [[index-and-search-7-read]]: Read
- [[index-and-search-8-orientation-the-briefing]]: Orientation (the briefing)
- [[index-and-search-9-other-queries]]: Other queries
- [[index-and-search-10-performance-budgets]]: Performance budgets (Index and search)
- [[index-and-search-11-failure-modes]]: Failure modes (Index and search)
- [[index-and-search-12-alternatives-considered]]: Alternatives considered (Index and search)
