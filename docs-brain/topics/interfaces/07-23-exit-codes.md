---
id: 01M3250V00XSH16502Y7TJ7AMR
type: design
title: "Exit codes"
aliases: ["07 §2.3"]
tags: [interfaces]
source: "docs/design/07-interfaces.md#23-exit-codes"
bw-part_of:
  - "[[07-2-cli]]"
---
# Exit codes

| Code | Meaning |
|---|---|
| 0 | Success |
| 1 | The command ran and found problems (lint errors, invalid ops, review required), or a path could not be read or written (`os_error`) |
| 2 | Usage error |
| 3 | Not found (brain, note, run) |
| 4 | Conflict (stale packet, files changed since run, lock timeout) |
| 5 | Forbidden by profile or host limits |
| 10 | Internal error (bug) |
