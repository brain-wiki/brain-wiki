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
| BW402 | `rules.md` exceeds its line or character budget. | error / error | — |
| BW403 | `AGENTS.md` exceeds its budget. | error / warning | regenerate the block |
| BW404 | A top-level topic folder has no hub. (A deeper folder without a hub is not a topic, 02 §2.) | warning / info | create a hub |
| BW405 | Note is missing from its hub's `## Notes`, and no `part_of` chain leads from it to the hub or to a note the hub lists. | info / off | append a line |
| BW406 | Orphan: no incoming links and not listed in a hub. | info / off | — |
| BW407 | Note outside any topic. | info / off | — |
| BW408 | `AGENTS.md` managed block missing or out of date. | warning / warning | regenerate |
| BW409 | Topic slug invalid. | error / warning | — |
