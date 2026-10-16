---
id: 01M3250V00R6B5QDF7GNMZ5FTV
type: design
title: "Supersession guard (Index and search)"
aliases: ["Index and search §5"]
source: "docs/design/index-and-search.md#5-supersession-guard"
---
# Supersession guard (Index and search)

The guard adds, to every note or hub a search or read returns, the notes
that replaced it and the notes it replaced. Given the hit node ids `H`, it
reads the `superseded_by` edges that touch them:

```sql
SELECT src, dst FROM edges
WHERE rel = 'superseded_by' AND src IS NOT NULL AND dst IS NOT NULL AND src != dst
  AND (src IN (H) OR dst IN (H));
```

Then, in code:

| Hit is | Label shown on the hit | Meaning for the agent |
|---|---|---|
| `src` (the hit names a replacement) | `superseded_by` | The hit is outdated. The neighbor is current. |
| `dst` (other notes name the hit) | `supersedes` | The hit replaced the neighbor (history). |

- From a hit's replacement, `superseded_by` is followed up to 5 more hops,
  so the agent gets the newest note. The notes passed on the way are listed
  in `via_titles`. A cycle is a lint error (BW307), and the walk stops at
  the first repeat.
- Guard notes come on top of the result limit. Each is compact: `label`,
  `id`, `title`, `path`, `status`, `updated`, and `via_titles`. The agent
  reads one with `brain_read`.
- Each hit carries at most `search.max_guards_per_hit` guards (default
  10). Replacements come first, then the notes it replaced, each group
  most recently updated first. The rest are counted in `more_guards`, so
  the agent knows to look.
- Superseded notes still match a query, but `status_factor` ranks them
  lower (§6.3).

Text output turns guards into banners, the first three in full, then a
count:

```
⚠ SUPERSEDED by "Use SQLite FTS5 for local search" (topics/search/fts5.md): prefer it.
↳ supersedes "Use ripgrep for search" (topics/search/ripgrep.md).
… 4 more replaced notes; brain_neighbors("topics/search/fts5.md", direction="in") lists them.
```

A chain adds ` (via B)` before the colon. Search results (§6.5) and reads
(§7) show banners the same way.
