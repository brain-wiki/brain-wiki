---
id: 01M3250V00WHCB21M3H4TG1QBP
type: design
title: "When the bench runs"
aliases: ["Eval bench §6"]
source: "docs/design/eval-bench.md#6-when-the-bench-runs"
---
# When the bench runs

| When | Command |
|---|---|
| Every change, through `scripts/check.py` and CI | `brain bench retrieval lint --sizes 300` |
| Performance work, and before a release | `brain bench perf --sizes 10k` |
