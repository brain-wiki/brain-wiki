---
id: 01M3250V00F9F80VAYFP86N6RD
type: design
title: "Other queries"
aliases: ["04 §9"]
tags: [index-and-retrieval]
source: "docs/design/04-index-and-retrieval.md#9-other-queries"
bw-part_of:
  - "[[index-and-retrieval]]"
---
# Other queries

| Query | Used by | Notes |
|---|---|---|
| Backlinks of a node | read (`outline`), neighbors, lint orphans | All edges with `dst = node` |
| Facet counts | orientation, search `facets`, `brain tags`, `brain types` | Counts by type, topic, tag, and property over visible nodes |
| Orphans, dead ends, unresolved links | `brain orphans`, `brain unresolved`, reports | Nodes without incoming edges; nodes without outgoing edges; links that resolve to nothing |
| Neighborhood graph | visualizer | Nodes plus edges filtered by profile; see [[visualizer\|12]] |
| Stale dependents | reports | Nodes that `depends_on` a superseded or archived node |
| Open conflicts | orientation, reports | `conflicts_with` edges between two active nodes |
| Pending episodes | consolidation gate | `kind = 'episode'`, ordered by id |

## Subsections
- [[04-91-brain-list]]: Brain list
- [[04-92-neighbors]]: Neighbors
