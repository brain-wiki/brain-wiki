---
id: 01M3250V00CE7BTHM6EBDXZMV9
type: design
title: "Supersession guard (Index and retrieval)"
aliases: ["04 §5"]
tags: [index-and-retrieval]
source: "docs/design/04-index-and-retrieval.md#5-supersession-guard"
---
# Supersession guard (Index and retrieval)

Given the set of hit node ids `H` (notes and hubs only), the guard reads the
`superseded_by` edges that touch them:

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

- **Chains.** From a hit's replacement, `superseded_by` is followed up to 5
  hops so the agent always gets the newest note; the notes passed on the way
  are listed in `via_titles` (`superseded by C (via B)`). Cycles are a lint
  error (BW307) and are cut at the first repeat.
- **Budget.** Guard notes are added on top of the result limit. Each is
  returned compactly (label, id, title, path, status, updated,
  `via_titles`); the agent can `read` it. Each hit carries at most
  `search.max_guards_per_hit` guards (default 10), ordered newest successor
  first, then the notes it replaced, most recently updated first. The rest
  are counted (`more_guards: n`) so the agent knows to look.
- **Ranking.** Superseded notes still match, but `status_factor` ranks them
  lower (§6.3).
- **Banners.** Text output turns guards into one line each, the first
  three in full, then a count:

  ```
  ⚠ SUPERSEDED by "Use SQLite FTS5 for local search" (topics/search/fts5.md): prefer it.
  ↳ supersedes "Use ripgrep for search" (topics/search/ripgrep.md).
  … 4 more replaced notes; brain_neighbors("topics/search/fts5.md", direction="in") lists them.
  ```

  A chain adds ` (via B)` before the colon. Search results (§6.5) and reads
  (§7) render banners the same way.
