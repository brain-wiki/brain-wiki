---
id: 01M3250V00PV4QEP3QGZNMYVHK
type: design
title: "Stability promises"
aliases: ["CLI and MCP §4"]
source: "docs/design/cli-and-mcp.md#4-stability-promises"
---
# Stability promises

| Surface | Promise in 0.x |
|---|---|
| Brain format | Versioned by `format`; a format change ships with a `brain lint --fix` conversion ([[brain-format-13-format-versioning\|brain format §13]]) |
| CLI command names and `--json` shapes | Additive changes only within a minor version; breaking changes are noted in the changelog |
| MCP tool names and input schemas | Additive changes only; a renamed tool keeps its old name as an alias for one minor version |
| Python API (`import brainwiki`) | Not public |
