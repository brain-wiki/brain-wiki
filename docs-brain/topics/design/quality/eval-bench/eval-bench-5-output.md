---
id: 01M3250V0066YT6PRGK1ZX8Q67
type: design
title: "Output (Eval bench)"
aliases: ["Eval bench §5"]
source: "docs/design/eval-bench.md#5-output"
---
# Output (Eval bench)

- `--out DIR` (default: a new temporary directory) receives `results.json`
  (schema version, brain-wiki version, the command, and one record per
  metric: suite, case, backend, metric, value, target, pass, hard) and
  `report.md` (tables per suite; a skipped suite says why). The command
  exits 1 when a hard target fails.
- `brain bench --compare A B` prints metric changes between two
  `results.json` files and exits 1 when a metric went from pass to fail.
