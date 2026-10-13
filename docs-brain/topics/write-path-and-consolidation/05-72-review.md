---
id: 01M3250V00VCVHF0RQ9JVPABHY
type: design
title: "Review (Write path and consolidation)"
aliases: ["05 §7.2"]
tags: [write-path-and-consolidation]
source: "docs/design/05-write-path-and-consolidation.md#72-review"
bw-part_of:
  - "[[05-7-validation-and-apply]]"
---
# Review (Write path and consolidation)

A run routed to review writes `inbox/proposals/<run>.md`: a human-readable
summary, the rendered diff, warnings, and the ops as a fenced JSON block.
Nothing else changes; the episodes stay pending (and are excluded from new
packets while a proposal references them).

- `brain review list | show <run> | accept <run> | reject <run>` (and MCP
  equivalents for agents, gated like rules: accept requires user
  confirmation).
- Accept re-validates the stored ops against the current brain (notes may
  have changed) and applies them as a normal run.
- Proposals are files in the brain, so they sync to the user's other
  devices and can be reviewed in Obsidian.
