---
id: 01M3250V000ZKSHVW7QH2ENQMS
type: design
title: "Output (Eval bench)"
aliases: ["11 §5"]
tags: [eval-bench]
source: "docs/design/11-eval-bench.md#5-output"
bw-part_of:
  - "[[eval-bench]]"
---
# Output (Eval bench)

- `--out DIR` receives `report.json` (stable schema: suite, case, backend,
  metric, value, pass) and `report.md` (tables per suite and backend, the
  worst-model line first).
- `brain bench compare A.json B.json` prints regressions and improvements.
