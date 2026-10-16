---
id: 01M3250V0098P7NYYN78MXMEJF
type: design
title: "Neighbors"
aliases: ["Index and search §9.2"]
source: "docs/design/index-and-search.md#92-neighbors"
---
# Neighbors

`neighbors(target, direction, depth, limit)` follows a node's resolved
edges without reading bodies, and returns a small subgraph.

- `direction` is `out` (what it links to), `in` (what links to it), or
  `both` (default).
- `depth` is 1 to 3 (default 1).
- `limit` caps the nodes returned besides the root (default 30, at most
  100). The engine clamps out-of-range values, and the CLI rejects values
  below 1.
- There is no filter by relation.

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

- The root comes first, at depth 0.
- `via.relation` uses the labels in §3, read from the node it was reached
  from. `edges` keep the stored direction.
- Within a depth, supersession comes first, then body links, then
  citations, each newest first, so `limit` keeps what matters.

Typical uses: what a hub lists (`out`), what refers to a decision (`in`),
and how a note evolved (`both`, depth 3).
