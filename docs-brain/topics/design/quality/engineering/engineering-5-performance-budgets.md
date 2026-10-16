---
id: 01M3250V00G428SDYWRPZ2GMF7
type: design
title: "Performance budgets (Engineering)"
aliases: ["Engineering §5"]
source: "docs/design/engineering.md#5-performance-budgets"
---
# Performance budgets (Engineering)

The `perf` bench suite checks these budgets at 10k notes:

| Operation | Budget |
|---|---|
| Freshness check with no changes, p95 | < 150 ms |
| One-file update (write-through), p95 | < 50 ms |
| Search, p95 | < 50 ms |
| Read, p95 | < 20 ms |
| Orientation, p95 | < 30 ms |
| Lint, whole brain, warm | < 1 s |
| Full index rebuild | < 30 s |

See also [[index-and-search-10-performance-budgets|index and search §10]].

- Below 10k notes the thresholds are relaxed 2×.
- The suite is not part of `scripts/check.py`. Run `brain bench perf
  --sizes 10k` for performance work and before a release.
- CLI start-up imports only the module of the command run, and `brain
  --help` imports none of them
  ([[cli-and-mcp-24-parser-and-startup-cost|CLI and MCP §2.4]]). A test
  checks what `brain --help` imports. No check measures time.
