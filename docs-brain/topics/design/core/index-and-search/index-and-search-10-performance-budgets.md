---
id: 01M3250V00F4XKKRC8EE8KXTK0
type: design
title: "Performance budgets (Index and search)"
aliases: ["Index and search §10"]
source: "docs/design/index-and-search.md#10-performance-budgets"
---
# Performance budgets (Index and search)

The bench performance suite measures these on generated brains of 1k and
10k notes (5 prose links and a `## Relations` list each), with a warm cache
on a local SSD.

| Operation | Budget at 10k |
|---|---|
| Freshness check, nothing changed | < 150 ms |
| Search (with guards) | p95 < 50 ms |
| Read | p95 < 20 ms |
| Orientation | p95 < 30 ms |
| Full rebuild | < 30 s |
| Incremental update, one changed file | < 50 ms |
| Whole-brain lint, warm cache | < 1 s |
