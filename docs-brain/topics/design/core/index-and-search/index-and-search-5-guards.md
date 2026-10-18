---
id: 01M3250V00NMBBFQ7EGCF0BTTS
type: design
title: "Guards (Index and search)"
aliases: ["Index and search §5"]
source: "docs/design/index-and-search.md#5-guards"
---
# Guards (Index and search)

The guards add, to every note or topic page a search or read returns, the
notes that replaced it, the notes it conflicts with, and the notes it
replaced ([[brain-format-7-guards|brain format §7]]). Given the hit node
ids `H`, they read the `superseded_by` and `conflicts_with` edges that
touch them:

```sql
SELECT src, dst FROM edges
WHERE rel = 'superseded_by' AND src IS NOT NULL AND dst IS NOT NULL AND src != dst
  AND (src IN (H) OR dst IN (H));
```

The same query with `rel = 'conflicts_with'` finds the conflicts. Then, in
code:

| Hit is | Label shown on the hit | Meaning for the agent |
|---|---|---|
| `src` of `superseded_by` (the hit names a replacement) | `superseded_by` | The hit is outdated. The neighbor is current. |
| Either end of `conflicts_with`, both notes active | `conflicts_with` | The two notes disagree. Read both before acting. |
| `dst` of `superseded_by` (other notes name the hit) | `supersedes` | The hit replaced the neighbor (history). |

- From a hit's replacement, `superseded_by` is followed up to 5 more hops,
  so the agent gets the newest note. The notes passed on the way are listed
  in `via_titles`. A cycle is a lint error (BW307), and the walk stops at
  the first repeat.
- A conflict is one hop, never followed further. It needs both notes
  `active`, so it ends when either is superseded or archived.
- Guard notes come on top of the result limit. Each is compact: `label`,
  `id`, `title`, `path`, `status`, `updated`, and `via_titles`. The agent
  reads one with `brain_read`.
- Guards come in the table's order, each group most recently updated
  first. A hit carries every replacement and conflict, and at most
  `search.max_guards_per_hit` (default 10) notes it replaced. The rest are
  counted in `more_guards`, so the agent knows to look.
- Superseded notes still match a query, but `status_factor` ranks them
  lower (§6.3).

Text output turns guards into banners: every replacement and conflict in
full, then the notes it replaced up to three lines in all, then a count:

```
⚠ SUPERSEDED by "Use SQLite FTS5 for local search" (topics/search/fts5.md): prefer it.
⚠ CONFLICTS with "Vector-only search proposal" (topics/search/vector-only.md): read both before acting.
↳ supersedes "Use ripgrep for search" (topics/search/ripgrep.md).
… 4 more replaced notes; brain_neighbors("topics/search/fts5.md", direction="in") lists them.
```

A chain adds ` (via B)` before the colon. Search results (§6.5) and reads
(§7) show banners the same way.
