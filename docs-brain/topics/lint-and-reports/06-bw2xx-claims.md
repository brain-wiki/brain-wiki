---
id: 01M3250V00BWCA99R1VZNWK7DR
type: design
title: "BW2xx: claims"
tags: [lint-and-reports]
source: "docs/design/06-lint-and-reports.md#bw2xx-claims"
---
# BW2xx: claims

| Code | Rule | Severity | Fix |
|---|---|---|---|
| BW201 | Claim metadata comment is malformed. | error / warning | — |
| BW202 | Duplicate claim id. | error / error | re-mint |
| BW203 | `by:` points to a claim that does not exist. | error / warning | — |
| BW204 | `src:` points to a missing file or a line range outside it. | warning / info | — |
| BW205 | Claim has no metadata (human-written). | info / off | assign an id |
| BW206 | Two active claims cite the same source span with near-identical text (likely double consolidation). | warning / warning | — |
| BW207 | More than one `## Claims` section. | error / warning | — |

## Relations
- part_of [[06-3-rule-catalog]]
