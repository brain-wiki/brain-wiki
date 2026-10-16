---
id: 01M3250V0032RCP3PVTBRM8PNS
type: design
title: "`perf` (offline)"
aliases: ["Eval bench §3.4"]
source: "docs/design/eval-bench.md#34-perf-offline"
---
# `perf` (offline)

The suite generates a brain of each size given with `--sizes` and measures the budgets in [[engineering-5-performance-budgets|engineering §5]]. Budgets apply at 10k notes and are relaxed 2× for smaller brains. Misses are soft.

| Metric | Measured over | Budget at 10k |
|---|---|---|
| `rebuild_s` | One full index rebuild | 30 s |
| `freshness_ms` | p95 of 20 scans of the unchanged tree | 150 ms |
| `incremental_ms` | p95 of 10 one-file edits, each followed by a scan of that file | 50 ms |
| `search_p95_ms` | Up to 200 planted queries plus 50 short three-word queries | 50 ms |
| `read_p95_ms` | 100 note reads | 20 ms |
| `orient_p95_ms` | 50 orientations | 30 ms |
| `lint_warm_s` | A second full lint | 1 s |
| `search_p50_ms`, `lint_cold_s` | Reported only | — |
