---
id: 01M3250V00P0WN35G5BHQQ3VR1
type: design
title: "`perf` (offline)"
aliases: ["11 §3.4"]
tags: [eval-bench]
source: "docs/design/11-eval-bench.md#34-perf-offline"
---
# `perf` (offline)

Generated brains of the sizes given by `--sizes` (default `1k`; budgets
apply at 10k and are relaxed 2× below it); measures the budgets in
[[13-5-performance-budgets|13 §5]]: freshness check,
one-file update, full rebuild, search and read latency percentiles,
orientation, and warm lint. Each budget is a pass or fail line in the
report.
