---
id: 01M3250V00JNM47GGBJ3XDDRAX
type: guide
title: "Harvest and origin"
source: "docs/user/reference.md#harvest-and-origin"
---
# Harvest and origin

- `brain harvest` options: `--from HOST` (repeatable), `--since 30d`,
  `--project P`, `--raw` or `--distill PRESET`, `--apply`, `--dry-run`, and
  `--status`.
- Without `--apply` it lists sessions and token estimates. With
  `--apply --dry-run` it lists the turn ranges it would write.
- `brain harvest route` sends sessions run in folders matching a pattern to
  a brain.
- `brain origin` takes an episode id or path (in the brain, or absolute).
  `--turns A-B` must lie within the session.
