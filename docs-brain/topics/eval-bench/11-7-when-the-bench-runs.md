---
id: 01M3250V00678WD4M3Y85VJMGG
type: design
title: "When the bench runs"
aliases: ["11 §7"]
tags: [eval-bench]
source: "docs/design/11-eval-bench.md#7-when-the-bench-runs"
---
# When the bench runs

| Trigger | Suites |
|---|---|
| Every change (CI) | `retrieval`, `lint`, `perf` at 1k |
| Nightly (CI) | `perf` at 10k |
| Changing consolidation instructions (`instructions_version`) or the ops schema | `consolidation` with at least two backends; the worst-model score must not drop |
| Before a release | all, including `agent` where hosts are available |

## Relations
- part_of [[eval-bench]]
