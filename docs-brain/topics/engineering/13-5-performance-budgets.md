---
id: 01M3250V00635HGT54NQP00P6K
type: design
title: "Performance budgets (Engineering)"
aliases: ["13 §5"]
tags: [engineering]
source: "docs/design/13-engineering.md#5-performance-budgets"
---
# Performance budgets (Engineering)

| Operation | Budget | Measured by |
|---|---|---|
| `brain hook <host> session-start` end to end (process start → output) | < 300 ms at 10k notes | bench `perf` suite |
| `brain hook … stop` (capture) | < 500 ms, excluding transcript size beyond 5 MB | bench `perf` |
| Freshness check, no changes, 10k notes | < 150 ms | bench `perf` |
| Search p95, 10k notes | < 50 ms | bench `perf` |
| Lint, whole brain, 10k notes | < 1 s | bench `perf` |
| Full index rebuild, 10k notes | < 30 s | bench `perf` |
| Import of the CLI module for `brain hook` | < 80 ms | `python -X importtime` check in CI |

CI runs the perf suite at 1k notes on every change, with thresholds
relaxed 2× for shared-runner noise, and at 10k nightly.

## Relations
- part_of [[engineering]]
