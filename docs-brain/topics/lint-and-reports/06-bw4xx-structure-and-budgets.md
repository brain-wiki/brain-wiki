---
id: 01M3250V00V8ZX32GH2C2TSKJF
type: design
title: "BW4xx: structure and budgets"
tags: [lint-and-reports]
source: "docs/design/06-lint-and-reports.md#bw4xx-structure-and-budgets"
---
# BW4xx: structure and budgets

| Code | Rule | Severity | Fix |
|---|---|---|---|
| BW401 | Hub exceeds `hub_max_lines`. | error / warning | — |
| BW402 | `rules.md` exceeds its line or character budget. | error / error | — |
| BW403 | `AGENTS.md` exceeds its budget. | error / warning | regenerate the block |
| BW404 | Topic folder has no hub. | warning / info | create a hub |
| BW405 | Note is missing from its hub's `## Notes`. | info / off | append a line |
| BW406 | Orphan: no incoming links and not listed in a hub. | info / off | — |
| BW407 | Note outside any topic. | info / off | — |
| BW408 | `AGENTS.md` managed block missing or out of date. | warning / warning | regenerate |
| BW409 | Topic slug invalid. | error / warning | — |

## Relations
- part_of [[06-3-rule-catalog]]
