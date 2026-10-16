---
id: 01M3250V0066YT6PRGK1ZX8Q67
type: design
title: "Output (Eval bench)"
aliases: ["Eval bench §5"]
source: "docs/design/eval-bench.md#5-output"
---
# Output (Eval bench)

- `--out DIR`, by default a new temporary folder, receives `results.json` and `report.md`. `results.json` holds the schema version, the brain-wiki version, the time, the command, the sizes, each suite's status and details, and one record per metric (suite, case, backend, metric, value, target, pass, hard). `report.md` has a status table and one table per suite, and a skipped suite says why.
- The generated brains go in `DIR/work/`. The bench points brain-wiki's config, state, cache, and data directories there, so a run never touches the user's own brains.
- `--sizes` sets the brain sizes for `retrieval` and `perf`, such as `1k,10k` or `300`. The default is `1k` and the minimum 50.
- The terminal shows one line per metric, or with `-q` a summary and the failures. The command exits 1 when a hard target fails.
- `brain bench --compare A B` prints the metric changes between two `results.json` files and exits 1 when any metric went from pass to fail.
