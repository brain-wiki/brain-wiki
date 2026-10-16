---
id: 01M3250V00NT103RFZ9B2QH06J
type: design
title: "Neighbors"
aliases: ["04 §9.2"]
tags: [index-and-retrieval]
source: "docs/design/04-index-and-retrieval.md#92-neighbors"
---
# Neighbors

`neighbors(target, direction, depth, limit)` follows a node's resolved
edges without reading bodies: `direction` is `out` (what it links to),
`in` (what links to it), or `both` (default), `depth` is 1–3 (default 1),
and `limit` caps nodes (default 30, max 100). There is no filter by
relation. It returns a small subgraph:

```json
{"brain": "personal", "root": "01J9…", "direction": "both", "depth": 1,
 "nodes": [{"id": "01J9…", "path": "…", "title": "…", "type": "decision",
            "topic": "search", "status": "active", "depth": 0},
           {"id": "01J8…", "path": "…", "title": "…", "type": "decision",
            "topic": "search", "status": "superseded", "depth": 1,
            "via": {"from": "01J9…", "relation": "supersedes"}}],
 "edges": [{"rel": "superseded_by", "src": "01J8…", "dst": "01J9…"}],
 "truncated": false}
```

The root comes first, at depth 0. `via.relation` reads from the node it was
reached from, with the labels in §3: an outgoing body link reads
`links_to` and an incoming one `linked_from`; `superseded_by` reads
`supersedes` from the newer note; a `bw-sources` link reads `cites` or
`cited_by`. `edges` keep the stored direction. Within a depth, supersession
comes first, then body links, then citations, each newest first, so
`limit` keeps what matters.

Typical uses: what a hub lists (`out`), what refers to a decision (`in`),
how a note evolved (`both`, depth 3; supersession edges are listed
first at each depth).
