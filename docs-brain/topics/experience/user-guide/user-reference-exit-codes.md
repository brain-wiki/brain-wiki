---
id: 01M3250V00EXAFVDTZTNPD6RKG
type: guide
title: "Exit codes"
source: "docs/user/reference.md#exit-codes"
---
# Exit codes

| Code | Meaning |
|---|---|
| 0 | Success |
| 1 | Problems found (lint or validation errors, a commit conflict), a path that cannot be read or written, or an ambiguous target (the candidates are printed) |
| 2 | Usage error |
| 3 | Not found, or no brain configured |
| 4 | Conflict: `conflict` (a name or file already there), `stale` (changed since it was read), or `busy` (locked) |
| 5 | Forbidden by a profile |
| 10 | Internal error: one line on stderr, the trace in the log file |

With `--paths`, a listing prints only paths on stdout. When more rows
follow, the `--cursor` hint goes to stderr. `--count` prints the bare
number, followed by the facet lines with `--facets`.
