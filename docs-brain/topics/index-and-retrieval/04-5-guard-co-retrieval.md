---
id: 01M3250V0082PRFXY4ANERPFV4
type: design
title: "Guard co-retrieval"
aliases: ["04 §5"]
tags: [index-and-retrieval]
source: "docs/design/04-index-and-retrieval.md#5-guard-co-retrieval"
---
# Guard co-retrieval

Given the set of hit node ids `H`:

```sql
SELECT e.rel, e.verb, e.qualifier, e.note,
       CASE WHEN e.src = h.id THEN 'out' ELSE 'in' END AS dir,
       h.id AS hit,
       n.id, n.title, n.path, n.status, n.updated, n.topic
FROM hits h
JOIN edges e ON e.is_guard = 1 AND (e.src = h.id OR e.dst = h.id) AND e.dst IS NOT NULL
JOIN nodes n ON n.id = CASE WHEN e.src = h.id THEN e.dst ELSE e.src END;
```

(`hits` is a temporary table of `H`.) Then, in code:

| Edge | Label shown on the hit | Meaning for the agent |
|---|---|---|
| `supersedes`, dir `in` | `superseded_by` | The hit is outdated. The neighbor is current. |
| `supersedes`, dir `out` | `supersedes` | The hit replaced the neighbor (history). |
| `conflicts_with`, either dir | `conflicts_with` | Read both before acting. |

- **Chains.** `superseded_by` is followed up to 5 hops so the agent always
  gets the newest note (`superseded by C (via B)`). Cycles are a lint error
  and are cut at the first repeat.
- **Budget.** Guard neighbors are added on top of the result limit. Each is
  returned compactly (title, path, status, one-line note); the agent can
  `read` it. To keep a heavily contested note from flooding the context,
  each hit carries at most `search.max_guards_per_hit` neighbors (default
  10), ordered: newest successor first, then conflicts by most recent
  update, then history. The rest are counted (`more_guards: n`) so the agent
  knows to look. Only true guards count against this cap: a negative causal
  influence is a qualifier on `depends_on`, not a guard.
- **Notes vs claims.** Claim-level supersession needs no query: superseded
  claims are already excluded from `body` and marked in reads.
