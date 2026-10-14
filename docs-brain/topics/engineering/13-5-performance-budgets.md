---
id: 01M3250V00635HGT54NQP00P6K
type: design
title: "Performance budgets (Engineering)"
aliases: ["13 §5"]
tags: [engineering]
source: "docs/design/13-engineering.md#5-performance-budgets"
bw-part_of:
  - "[[engineering]]"
---
# Performance budgets (Engineering)

| Operation | Budget | Measured by |
|---|---|---|
| `brain hook <host> SessionStart` end to end (process start → output) | < 300 ms at 10k notes | bench `perf` suite |
| Freshness check, no changes, 10k notes | < 150 ms | bench `perf` |
| Search p95, 10k notes | < 50 ms | bench `perf` |
| Lint, whole brain, warm, 10k notes | < 1 s | bench `perf` |
| Full index rebuild, 10k notes | < 30 s | bench `perf` |
| `brain hook … Stop` (capture) | < 500 ms, excluding transcript size beyond 5 MB | not measured yet |

The perf suite also checks read, orientation, and one-file update
([[04-10-performance-budgets|04 §10]]). Below 10k
notes its thresholds are relaxed 2×. It is not part of `scripts/check.py`;
run `brain bench perf --sizes 10k` for performance work and before a
release. `brain hook` stays fast by importing subcommand modules lazily and
never the MCP SDK ([[07-24-startup-cost|07 §2.4]]); no check
measures its import time.
