---
id: 01M3250V00M012MS0Q213PD4KP
type: design
title: "When the bench runs"
aliases: ["11 §6"]
tags: [eval-bench]
source: "docs/design/11-eval-bench.md#6-when-the-bench-runs"
---
# When the bench runs

| Trigger | Suites |
|---|---|
| Every change (`scripts/check.py`, and CI through it) | `retrieval` and `lint` on a 300-note brain |
| Performance work, and before a release | `perf` at 10k (`brain bench perf --sizes 10k`) |
| Changing consolidation instructions (`instructions_version`) or the ops schema | `consolidation` with at least two backends; the worst-model score must not drop |
