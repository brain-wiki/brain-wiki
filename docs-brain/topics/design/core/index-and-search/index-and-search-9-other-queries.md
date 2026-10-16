---
id: 01M3250V00C42MSZM0V67R17R0
type: design
title: "Other queries"
aliases: ["Index and search §9"]
source: "docs/design/index-and-search.md#9-other-queries"
---
# Other queries

| Query | Used by | Notes |
|---|---|---|
| Notes within filters, newest first | `brain_search("")`, `brain search ""` | The search path without text matching (§6.1). There is no separate listing command. |
| Headings and links of a note | `brain read TARGET --mode outline` | §7 |
| Links as written in a file | `brain links` | Every edge the file declares, resolved or not, with its line |
| Backlinks | `brain backlinks`, read, BW406 | Edges from other nodes that resolve to the note |
| Topic tree | `brain topics` | Each topic with its own and total note counts |
| Tag and type counts | `brain tags`, `brain types`, search `facets`, orientation | — |
| Orphans | `brain orphans`, BW406, `reports/orphans.md` | Notes no other node links to |
| Unresolved links | `brain unresolved`, BW119, BW122, BW310 | Edges with no target |
| Stale links | `reports/stale.md`, the visualizer's `stale` flag | `stale_links`, defined below |
| Neighborhood graph | visualizer | Nodes plus edges; see [[visualizer\|visualizer]] |
| Pending episodes | `brain consolidate --prepare`, orientation | `kind = 'episode'`, ordered by id |

A stale link is a body link from an active note (not a hub) to a
superseded or archived note. A link from a note to the note it replaced is
not stale.

## Subsections
- [[index-and-search-91-brain-list]]: Brain list
- [[index-and-search-92-neighbors]]: Neighbors
