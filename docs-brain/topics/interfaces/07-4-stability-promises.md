---
id: 01M3250V00REQCEJXKTVAJR1HG
type: design
title: "Stability promises"
aliases: ["07 §4"]
tags: [interfaces]
source: "docs/design/07-interfaces.md#4-stability-promises"
bw-part_of:
  - "[[interfaces]]"
---
# Stability promises

| Surface | Promise in 0.x |
|---|---|
| Brain format | Versioned (`format`); a format change ships with a `brain lint --fix` conversion ([[02-13-format-versioning\|02 §13]]). |
| CLI command names and `--json` shapes | Additive changes only within a minor version; breaking changes noted in the changelog. |
| MCP tool names and input schemas | Additive changes only; a renamed tool keeps its old name as an alias for one minor version. |
| Python API (`import brainwiki`) | Not public in 0.x. |
