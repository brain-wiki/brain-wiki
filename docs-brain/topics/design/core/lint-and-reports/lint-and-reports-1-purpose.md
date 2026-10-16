---
id: 01M3250V00GFZJDJNJG2RAXMKG
type: design
title: "Purpose (Lint and reports)"
aliases: ["Lint and reports §1"]
source: "docs/design/lint-and-reports.md#1-purpose"
---
# Purpose (Lint and reports)

Lint checks a brain against the [[brain-format|brain format]] without
locking anyone out. People, Obsidian, sync tools, and agents all write to a
brain. Lint finds what they broke, explains it, and fixes what is safe to
fix. It never calls a model or the network.

| Where lint runs | Scope | Profile |
|---|---|---|
| `brain lint` | The whole brain, or the given paths | From `brain.toml` |
| `brain validate` | Frontmatter rules on changed notes (§4) | `strict` |
| The lint gate of a run | File rules on the files the run touches | `strict`, errors only |
| Git pre-commit hook | Staged files (§8) | From `brain.toml` |
| Indexer | BW101 and BW111, stored in `diagnostics` | — |

The lint gate runs inside `brain lint --fix`, `brain mv`, and
`brain import`, after the change is made in memory. Only strict errors the
change introduces block the run, so a note someone broke by hand does not
stall every later run that touches it. See
[[write-path-72-lint-gate|write path §7.2]].
