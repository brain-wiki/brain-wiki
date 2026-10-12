---
id: 01M3250V00JJYEKVWET386V3NM
type: design
title: "Purpose (Eval bench)"
aliases: ["11 §1"]
tags: [eval-bench]
source: "docs/design/11-eval-bench.md#1-purpose"
---
# Purpose (Eval bench)

`brain bench` measures what brain-wiki promises, so that defaults are
tuned on evidence and regressions are caught:

| Promise | Suite |
|---|---|
| Retrieval finds the right notes and always surfaces superseding and conflicting ones (G5) | `retrieval` |
| Privacy filters leak nothing | `retrieval` (profile variants) |
| Lint finds what it claims and fixes safely | `lint` |
| Consolidation writes faithful, specific, well-placed claims, with any model (G4, G8) | `consolidation` |
| Injected instructions never become rules or directives | `consolidation` (injection slice) |
| Hooks and search are fast enough (G7) | `perf` |
| A real agent with the plugin answers with current knowledge | `agent` (optional) |

Rule for the project: published numbers come only from this bench, with
the command and version that produced them.

## Relations
- part_of [[eval-bench]]
