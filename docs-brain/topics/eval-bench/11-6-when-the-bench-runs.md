---
id: 01M3250V00M012MS0Q213PD4KP
type: design
title: "When the bench runs"
aliases: ["11 §6"]
tags: [eval-bench]
source: "docs/design/11-eval-bench.md#6-when-the-bench-runs"
bw-part_of:
  - "[[eval-bench]]"
---
# When the bench runs

| Trigger | Suites |
|---|---|
| Every change (CI) | `retrieval`, `lint`, `perf` at 1k |
| Nightly (CI) | `perf` at 10k |
| Changing consolidation instructions (`instructions_version`) or the ops schema | `consolidation` with at least two backends; the worst-model score must not drop |
| Before a release | all, including `agent` where hosts are available |
