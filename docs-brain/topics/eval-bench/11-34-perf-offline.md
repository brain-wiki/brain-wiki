---
id: 01M3250V00P0WN35G5BHQQ3VR1
type: design
title: "`perf` (offline)"
aliases: ["11 §3.4"]
tags: [eval-bench]
source: "docs/design/11-eval-bench.md#34-perf-offline"
bw-part_of:
  - "[[11-3-suites]]"
---
# `perf` (offline)

Generated brains of 1k and 10k notes; measures the budgets in
[[13-5-performance-budgets|13 §5]]: freshness check, full
rebuild, search and read latency percentiles, orientation, lint, and
`brain hook` end to end (process start to output). Each budget is a pass
or fail line in the report.
