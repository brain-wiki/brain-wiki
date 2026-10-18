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
| Unresolved links | `brain unresolved`, BW119, BW122, BW124, BW310 | Edges with no target |
| Stale dependents, open conflicts, stale links | `reports/stale.md`, orientation, the visualizer's `stale` flag | `stale_dependents`, `open_conflicts`, and `stale_links`, defined below |
| Neighborhood graph | visualizer | Nodes plus edges; see [[visualizer\|visualizer]] |
| Pending episodes | `brain consolidate --prepare`, orientation | `kind = 'episode'`, ordered by id |

Three queries find notes that may need review, listed in this order in
`reports/stale.md`:

- A stale dependent is an active note or topic page whose `bw-depends_on`
  names a superseded or archived note. It rests on something outdated.
- An open conflict is a pair of active notes in a `bw-conflicts_with`
  relation, listed once whichever note holds the field.
- A stale link is a body link from an active note (not a topic page) to a
  superseded or archived note. A link from a note to the note it replaced
  is not stale, and neither is a link from a note that already depends on
  its target, which is listed as a dependent instead.


### 9.1 Brain list

`brain_list` (CLI `brain brains`) answers "which brains exist, and what is
each for?" for the calling host.

| Field | Source |
|---|---|
| `name`, `description` | Registration, and the optional one-line `description` in `brain.toml` |
| `default_here` | Brain resolution for the current project and host ([[config-and-storage-3-choosing-a-brain\|config and storage §3]]) |
| `topics`, `notes`, `updated`, `pending` | The index |
| `path` | The brain folder, so the host can read its files directly |
| `ok`, `error` | Whether the brain opened, and why not |

- A brain found from the working directory but not registered is listed
  too.
- Brains outside the host's allowed list
  ([[config-and-storage-3-choosing-a-brain|config and storage §3]]) are
  not listed.
- For the owner, each entry also has `default`, whether it is the user's
  default brain.
- The text of `brain_list` gives each brain's description, so an agent can
  pick the right one. `brain brains` in a terminal leaves it out, so the
  counts and path fit on one line; `--json` has every field.


### 9.2 Neighbors

`neighbors(target, direction, depth, limit, relations)` follows a node's resolved
edges without reading bodies, and returns a small subgraph.

- `direction` is `out` (what it links to), `in` (what links to it), or
  `both` (default).
- `depth` is 1 to 3 (default 1).
- `limit` caps the nodes returned besides the root (default 30, at most
  100). The engine clamps out-of-range values, and the CLI rejects values
  below 1.
- `relations` limits the edges followed to the `rel` values listed, from
  §3 (`superseded_by`, `conflicts_with`, `depends_on`, `part_of`,
  `links_to`, `source`); the default is all. With `direction`, it answers
  questions such as "what rests on this note"
  (`relations=["depends_on"], direction="in"`). An unknown value is a usage
  error that lists the valid ones. The CLI spelling is `--relation`,
  repeatable.

```json
{"brain": "personal", "root": "01J9…", "direction": "both", "depth": 1, "relations": null,
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
- Within a depth, edges come in the priority order of §3, each newest
  first, so `limit` keeps what matters.

Typical uses: what a topic page lists (`out`), what refers to a decision (`in`),
and how a note evolved (`both`, depth 3).
