---
id: 01M3250V004VXZNS6633SZES6C
type: design
title: "Purpose (Lint and reports)"
aliases: ["06 §1"]
source: "docs/design/06-lint-and-reports.md#1-purpose"
---
# Purpose (Lint and reports)

Lint is how the format in [[brain-format|02]] is enforced without
locking anyone out. People, Obsidian, sync tools, and agents with file
access all write to a brain; lint finds what they broke, explains it, and
fixes what is safe to fix.

| Where lint runs | Scope | Profile |
|---|---|---|
| `brain lint` | Whole brain (or given paths) | From `brain.toml` |
| `brain validate` ([[05-23-direct-edits\|05 §2.3]]) | The notes an agent changed: the frontmatter rules only (`SCHEMA_CODES`, §3) | Always `strict` |
| Inside runs that rewrite notes (`lint --fix`, `mv`, `import --into`) | Touched files only, after the in-memory change; only errors the change introduces block it, so a note a person broke by hand does not stall every later run that touches it ([[05-72-lint-gate\|05 §7.2]]) | Always `strict` for new content |
| Git pre-commit hook (optional) | Staged files | From `brain.toml` |
| Indexer | Parse-level problems only (BW1xx), stored in `diagnostics` | — |

Lint never needs an LLM and never touches the network.
