---
id: 01M3250V00JP0RTER7G19SADZE
type: design
title: "Output"
aliases: ["Lint and reports §6"]
source: "docs/design/lint-and-reports.md#6-output"
---
# Output

Text output groups problems by file. A problem without a line shows `-`.

```
topics/search/ripgrep.md
     5  error    BW119  bw-superseded_by is set but status is 'active'  (fixable)
topics/search/fts5.md
    14  warning  BW310  link target 'SQLite policy' not found; did you mean "SQLite version policy"?
2 problems (1 error, 1 warning), 1 fixable with --fix
```

- The "fixable with --fix" count is what `--fix` with the same options
  would repair. Fixable `info` problems are counted after it, with the
  selection that turns them on: `; 2 more with --fix --select BW405`.
- With no problems the output is `No problems (N files checked).`

`--json` emits `{problems, errors, warnings, info, fixable,
files_checked}`, each problem `{code, severity, path, line, message,
fixable}`. `--fix` adds `fixed` and `run`, and `--fix --dry-run` emits
`{fixes, diff}`. `brain validate --json` adds `checked`, the paths it
checked (null for the whole brain).

Exit codes: `0` no errors, `1` errors found, `2` usage error. The rest are
in [[cli-and-mcp-2-cli|CLI and MCP §2.3]].
