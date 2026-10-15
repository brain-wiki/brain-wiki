---
id: 01M3250V001C7MG657DA1YQB0S
type: design
title: "Failure modes (Import)"
aliases: ["09 §7"]
tags: [import]
source: "docs/design/09-import.md#7-failure-modes"
bw-part_of:
  - "[[import]]"
---
# Failure modes (Import)

| Failure | Behavior |
|---|---|
| Folder already contains `brain.toml` | Overlay phase 0 (dry run or apply) refuses: if the folder is registered, it names the registration and points at phases 1–3; otherwise it suggests `brain brains add`. |
| `--from` names a host with no known locations and no `PATH` | Usage error listing the known hosts; a `PATH` imports from there under that host name. |
| A top-level folder name slugifies to an invalid or duplicate slug | The plan shows the clash and appends a numeric suffix; the user can edit `brain.toml` before phase 0. |
| Thousands of unresolved links | Reported in aggregate with the top offenders; phase 0 still proceeds (links are not modified). |
| Huge files (exports, logs) | Indexed by name only above the size cap; listed in the report. |
