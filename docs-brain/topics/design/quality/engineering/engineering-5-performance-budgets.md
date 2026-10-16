---
id: 01M3250V00G428SDYWRPZ2GMF7
type: design
title: "Performance budgets (Engineering)"
aliases: ["Engineering §5"]
source: "docs/design/engineering.md#5-performance-budgets"
---
# Performance budgets (Engineering)

| Operation | Budget | Measured by |
|---|---|---|
| Freshness check, no changes, 10k notes | < 150 ms | bench `perf` |
| Search p95, 10k notes | < 50 ms | bench `perf` |
| Lint, whole brain, warm, 10k notes | < 1 s | bench `perf` |
| Full index rebuild, 10k notes | < 30 s | bench `perf` |

The perf suite also checks read, orientation, and one-file update
([[index-and-search-10-performance-budgets|index and search §10]]). Below 10k
notes its thresholds are relaxed 2×. It is not part of `scripts/check.py`;
run `brain bench perf --sizes 10k` for performance work and before a
release. CLI start-up imports only the module of the command run, and help
none of them ([[cli-and-mcp-24-parser-and-startup-cost|CLI and MCP §2.4]]); a
test checks what `brain --help` imports, but no check measures time.
