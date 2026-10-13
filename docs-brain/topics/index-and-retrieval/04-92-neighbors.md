---
id: 01M3250V00NT103RFZ9B2QH06J
type: design
title: "Neighbors"
aliases: ["04 §9.2"]
tags: [index-and-retrieval]
source: "docs/design/04-index-and-retrieval.md#92-neighbors"
bw-part_of:
  - "[[04-9-other-queries]]"
---
# Neighbors

`neighbors(target, relations, direction, depth, limit)` follows a node's
typed edges without reading bodies: `relations` defaults to every typed
family, `direction` is `out`, `in`, or `both` (default `both`), `depth` is
1–3 (default 1), and `limit` caps nodes (default 30, max 100). It returns a
small subgraph:

```json
{"root": "01J9…",
 "nodes": [{"id": "01J9…", "title": "…", "depth": 0, "…": "…"},
           {"id": "…", "path": "…", "title": "…", "type": "…", "topic": "…",
            "status": "active", "flags": ["conflict"], "depth": 1,
            "via": {"from": "01J9…", "relation": "has_part"}}],
 "edges": [{"rel": "part_of", "src": "…", "dst": "01J9…"}],
 "hidden": 0, "truncated": false}
```

The root comes first, at depth 0. `via.relation` reads from the node it was
reached from, so an incoming `part_of` reads `has_part`, an incoming
`depends_on` reads `enables`, and an incoming body link reads `linked_from`;
`edges` keep the stored direction. Within a depth, guards come first, then
dependencies, containment, and plain links, newest first, so `limit` keeps
what matters. `flags` mark nodes in an active conflict and active nodes that a
newer note supersedes.

Typical uses: what a release shipped (`depends_on`, `out`), what depends on
a decision (`depends_on`, `in`), how a fact evolved (`supersedes`, `both`,
depth 3). Privacy filtering applies to every node; hidden neighbors are
counted, not named, as in §5.
