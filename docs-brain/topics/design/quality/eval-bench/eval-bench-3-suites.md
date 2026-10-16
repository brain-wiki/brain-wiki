---
id: 01M3250V00EMZFCKR9VM9KHPWN
type: design
title: "Suites"
aliases: ["Eval bench §3"]
source: "docs/design/eval-bench.md#3-suites"
---
# Suites

`brain bench` with no suite names runs `retrieval`, `lint`, and `perf`. Every metric with a target is either hard or soft. A hard miss fails the command; a soft miss shows as `miss` in the report and does not.

## Subsections
- [[eval-bench-31-retrieval-offline]]: `retrieval` (offline)
- [[eval-bench-32-lint-offline]]: `lint` (offline)
- [[eval-bench-33-consolidation-removed]]: `consolidation` (removed)
- [[eval-bench-34-perf-offline]]: `perf` (offline)
- [[eval-bench-35-agent]]: `agent`
