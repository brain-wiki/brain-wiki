---
id: 01M3250V00KN7DZGKY03EYXV0X
type: design
title: "Failure modes (Import)"
aliases: ["Import §7"]
source: "docs/design/import.md#7-failure-modes"
---
# Failure modes (Import)

| Failure | Behavior |
|---|---|
| The folder already has `brain.toml` | Phase 0 (dry run or apply) refuses with `conflict`; it names the registration and points to phases 1 and 2, or suggests `brain brains add` |
| Two folders give the same slug | The second gets a numeric suffix; the report shows the mapping, and `brain.toml` can be edited after phase 0 |
| Thousands of unresolved links | Reported as a total with the top targets; phase 0 still proceeds, since links are not changed |
| Huge files (exports, logs) | Not parsed by the scan above 2 MiB; listed as `oversized` in `--json` |
