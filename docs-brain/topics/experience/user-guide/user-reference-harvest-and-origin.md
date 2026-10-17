---
id: 01M3250V00JNM47GGBJ3XDDRAX
type: guide
title: "Harvest and origin"
source: "docs/user/reference.md#harvest-and-origin"
---
# Harvest and origin

- `brain harvest` options: `--from HOST` (repeatable), `--since 30d`,
  `--project P`, and `--status`. It lists sessions and token estimates and
  writes nothing; the agent does the harvest.
- `brain harvest route` sends sessions run in folders matching a pattern to
  a brain.
- `brain origin` takes an episode id or path (in the brain, or absolute),
  or a session URL from a note's `bw-sources`. `--turns A-B` must lie
  within the session.
