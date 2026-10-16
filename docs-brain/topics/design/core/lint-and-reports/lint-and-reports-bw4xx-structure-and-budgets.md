---
id: 01M3250V00FC9JYVS2RZ9682KW
type: design
title: "BW4xx: structure and budgets"
source: "docs/design/lint-and-reports.md#bw4xx-structure-and-budgets"
---
# BW4xx: structure and budgets

| Code | Rule | Severity (strict / migrate) | Fix |
|---|---|---|---|
| BW402 | `rules.md` exceeds its line or character budget. | error / error | — |
| BW403 | `AGENTS.md` exceeds `budgets.agents_md_max_lines`. | error / warning | Regenerate the block |
| BW404 | A topic folder has no hub. | warning / info | Create a hub listing the topic's notes |
| BW405 | Note is not in its hub's `## Notes`, and no chain of body links reaches it from a note that is. | info / off | Append a line to `## Notes` |
| BW406 | Orphan: no other note, hub, or episode links to it. | info / off | — |
| BW407 | Note outside any topic. | info / off | — |
| BW408 | `AGENTS.md` or its managed block is missing or out of date. | warning / warning | Create the file or regenerate the block |
| BW409 | A topic slug declared in `brain.toml` is invalid. | error / warning | — |

A deeper folder without a hub is not a topic
([[brain-format-21-topics|brain format §2.1]]), so BW404 concerns
top-level folders and declared topics.
