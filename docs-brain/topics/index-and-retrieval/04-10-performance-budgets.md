---
id: 01M3250V00BG701KK17CXQKEDA
type: design
title: "Performance budgets (Index and retrieval)"
aliases: ["04 §10"]
tags: [index-and-retrieval]
source: "docs/design/04-index-and-retrieval.md#10-performance-budgets"
---
# Performance budgets (Index and retrieval)

Measured by the bench performance suite on generated brains of 1k and 10k
notes (average 40 lines, 3 relations, 5 body links each), warm cache, local
SSD:

| Operation | Budget at 10k |
|---|---|
| Freshness check, nothing changed | < 150 ms |
| Search (with expansion and guards) | p95 < 50 ms |
| Read | p95 < 20 ms |
| Orientation | p95 < 30 ms |
| Full rebuild | < 30 s |
| Incremental update, one changed file | < 50 ms |

## Relations
- part_of [[index-and-retrieval]]
