---
id: 01M3250V00GFZJDJNJG2RAXMKG
type: design
title: "Purpose (Lint and reports)"
aliases: ["Lint and reports §1"]
source: "docs/design/lint-and-reports.md#1-purpose"
---
# Purpose (Lint and reports)

Lint is how the format in [[brain-format|brain format]] is enforced without
locking anyone out. People, Obsidian, sync tools, and agents with file
access all write to a brain; lint finds what they broke, explains it, and
fixes what is safe to fix.

| Where lint runs | Scope | Profile |
|---|---|---|
| `brain lint` | Whole brain (or given paths) | From `brain.toml` |
| `brain validate` ([[write-path-23-direct-edits\|write path §2.3]]) | The notes an agent changed: the frontmatter rules only (`SCHEMA_CODES`, §3) | Always `strict` |
| Inside runs that rewrite notes (`lint --fix`, `mv`, `import --into`) | Touched files only, after the in-memory change; only errors the change introduces block it, so a note a person broke by hand does not stall every later run that touches it ([[write-path-72-lint-gate\|write path §7.2]]) | Always `strict` for new content |
| Git pre-commit hook (optional) | Staged files | From `brain.toml` |
| Indexer | Parse-level problems only (BW1xx), stored in `diagnostics` | — |

Lint never needs an LLM and never touches the network.
