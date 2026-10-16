---
id: 01M3250V0003RBZKC4QP63215N
type: design
title: "Purpose (Eval bench)"
aliases: ["Eval bench §1"]
source: "docs/design/eval-bench.md#1-purpose"
---
# Purpose (Eval bench)

`brain bench` measures what brain-wiki promises, so that defaults are
tuned on evidence and regressions are caught:

| Promise | Suite |
|---|---|
| Retrieval finds the right notes and always surfaces the notes that supersede them (G5) | `retrieval` |
| Lint finds what it claims and fixes safely | `lint` |
| Search, reads, and orientation are fast enough (G7) | `perf` |
| A real agent with the plugin answers with current knowledge | `agent` (a stub that reports skipped, §3.5) |

Rule for the project: published numbers come only from this bench, with
the command and version that produced them.
