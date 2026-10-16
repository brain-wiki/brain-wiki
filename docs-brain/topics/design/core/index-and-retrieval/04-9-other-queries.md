---
id: 01M3250V00F9F80VAYFP86N6RD
type: design
title: "Other queries"
aliases: ["04 §9"]
source: "docs/design/04-index-and-retrieval.md#9-other-queries"
---
# Other queries

| Query | Used by | Notes |
|---|---|---|
| Notes within filters, newest first | `brain_search("")`, `brain search ""` (e.g. `--since 7d`, `--topic T`) | The search path without text matching (§6.1); there is no separate listing command |
| Headings and links of a note | read (`outline`), `brain read TARGET --mode outline` | §7 |
| Links as written in a file, and in other files | `brain links`, `brain backlinks` | Edges by the file that declares them (`declared_in`): body links, `bw-superseded_by`, and `bw-sources`, resolved or not; `brain neighbors` follows resolved edges by depth (§9.2) |
| Backlinks of a node | read (`outline`), neighbors, lint orphans | All edges with `dst = node` |
| Facet counts | orientation, search `facets`, `brain tags`, `brain types` | Counts by type, topic, tag, and property |
| Orphans, dead ends, unresolved links | `brain orphans`, `brain unresolved`, reports | Nodes without incoming edges; nodes without outgoing edges; links that resolve to nothing |
| Neighborhood graph | visualizer | Nodes plus edges; see [[visualizer\|12]] |
| Stale links | the `stale` report, the visualizer's `stale` flag | Active notes (not hubs) that link to a superseded or archived note, except a link from a note to the note it replaced (`index.stale_links`) |
| Pending episodes | `brain consolidate --prepare`, orientation | `kind = 'episode'`, ordered by id |

## Subsections
- [[04-91-brain-list]]: Brain list
- [[04-92-neighbors]]: Neighbors
