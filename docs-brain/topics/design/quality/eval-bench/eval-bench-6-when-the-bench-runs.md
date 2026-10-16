---
id: 01M3250V00WHCB21M3H4TG1QBP
type: design
title: "When the bench runs"
aliases: ["Eval bench §6"]
source: "docs/design/eval-bench.md#6-when-the-bench-runs"
---
# When the bench runs

| Trigger | Suites |
|---|---|
| Every change (`scripts/check.py`, and CI through it) | `retrieval` and `lint` on a 300-note brain |
| Performance work, and before a release | `perf` at 10k (`brain bench perf --sizes 10k`) |
