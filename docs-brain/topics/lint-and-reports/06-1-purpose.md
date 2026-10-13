---
id: 01M3250V004VXZNS6633SZES6C
type: design
title: "Purpose (Lint and reports)"
aliases: ["06 §1"]
tags: [lint-and-reports]
source: "docs/design/06-lint-and-reports.md#1-purpose"
bw-part_of:
  - "[[lint-and-reports]]"
---
# Purpose (Lint and reports)

Lint is how the format in [[brain-format|02]] is enforced without
locking anyone out. People, Obsidian, sync tools, and agents with file
access all write to a brain; lint finds what they broke, explains it, and
fixes what is safe to fix.

| Where lint runs | Scope | Profile |
|---|---|---|
| `brain lint` | Whole brain (or given paths) | From `brain.toml` |
| Inside every apply (consolidation, review accept, rule change, fix) | Touched files only, after the in-memory apply; only errors the change introduces block it, so a note a person broke by hand does not stall every later run that touches it | Always `strict` for new content |
| Git pre-commit hook (optional) | Staged files | From `brain.toml` |
| Indexer | Parse-level problems only (BW1xx), stored in `diagnostics` | — |

Lint never needs an LLM and never touches the network.
