---
id: 01M3250V00JP0RTER7G19SADZE
type: design
title: "Output (Lint and reports)"
aliases: ["Lint and reports §6"]
source: "docs/design/lint-and-reports.md#6-output"
---
# Output (Lint and reports)

Text, grouped by file:

```
topics/search/ripgrep.md
     8  error    BW119  bw-superseded_by is set but status is 'active'  (fixable)
topics/search/fts5.md
    14  warning  BW310  link target 'SQLite policy' not found; did you mean "SQLite version policy"?
2 problems (1 error, 1 warning), 1 fixable with --fix
```

The "fixable with --fix" count is what `--fix` with the same options would
repair. Fixable `info` problems are counted after it, with the selection
that turns them on: `; 2 more with --fix --select BW405`.

`--json` emits `{problems, errors, warnings, info, fixable, files_checked}`,
each problem `{code, severity, path, line, message, fixable}`.
Exit codes: `0` no errors, `1` errors found, `2` usage error; the rest as in
[[cli-and-mcp-23-exit-codes|CLI and MCP §2.3]].
