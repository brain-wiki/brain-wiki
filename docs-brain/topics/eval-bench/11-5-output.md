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

- `--out DIR` (default: a new temporary directory) receives `results.json`
  (schema version, brain-wiki version, the command, and one record per
  metric: suite, case, backend, metric, value, target, pass, hard) and
  `report.md` (tables per suite; in `consolidation`, the worst-model lines
  first). The command exits 1 when a hard target fails.
- `brain bench --compare A B` prints metric changes between two
  `results.json` files and exits 1 when a metric went from pass to fail.
