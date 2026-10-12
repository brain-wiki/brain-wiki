---
id: 01M3250V00WH4K46V393KH7VY1
type: design
title: "Output (Lint and reports)"
aliases: ["06 §6"]
tags: [lint-and-reports]
source: "docs/design/06-lint-and-reports.md#6-output"
---
# Output (Lint and reports)

Text, grouped by file:

```
topics/search/ripgrep.md
  12  warning  BW308  superseded by "fts5" but status is "active"  (fixable)
topics/search/fts5.md
  31  error    BW304  relation target "SQLite policy" not found; did you mean "SQLite version policy"?
2 problems (1 error, 1 warning), 1 fixable with --fix
```

`--json` emits a list of `{code, severity, path, line, message, fixable}`.
Exit codes: `0` no errors, `1` errors found, `2` usage or internal error.

## Relations
- part_of [[lint-and-reports]]
