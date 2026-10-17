---
id: 01M3250V000JK45J4FQBJXS1J8
type: guide
title: "Connect, import, viz, and bench"
source: "docs/user/reference.md#connect-import-viz-and-bench"
---
# Connect, import, viz, and bench

- `brain connect` hosts: `claude-code`, `codex`, `antigravity`, `openclaw`,
  `cursor`, or `generic`. `--scope project` works for `claude-code` and
  `cursor`; each scope is connected and uninstalled on its own.
- `brain import` is a dry run without `--apply`, and `--dry-run` wins over
  `--apply`. With `--into`, `--topic T` puts what is imported under one
  topic. Documents and memory files are imported by asking an agent. See
  [[user-import|Import]].
- `brain viz` and `brain obsidian` open BRAIN, the only brain, or the one
  you pick. `brain viz --host 0.0.0.0` lets other machines open the map.
  `--export` writes `.html`, `.json`, or `.graphml` and exits.
- `brain bench` runs `retrieval`, `lint`, and `perf` by default. The
  `agent` suite is reserved and reports as skipped. `-q` prints a summary,
  failures, and regressions only.
