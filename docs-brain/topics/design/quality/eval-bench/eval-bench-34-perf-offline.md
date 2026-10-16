---
id: 01M3250V0032RCP3PVTBRM8PNS
type: design
title: "`perf` (offline)"
aliases: ["Eval bench §3.4"]
source: "docs/design/eval-bench.md#34-perf-offline"
---
# `perf` (offline)

Generated brains of the sizes given by `--sizes` (default `1k`; budgets
apply at 10k and are relaxed 2× below it); measures the budgets in
[[engineering-5-performance-budgets|engineering §5]]: freshness check,
one-file update, full rebuild, search and read latency percentiles,
orientation, and warm lint. Each budget is a pass or fail line in the
report.
