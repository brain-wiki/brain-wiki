---
id: 01M3250V00JZSQMQ7KG9S1WSBY
type: design
title: "BW3xx: relations and links"
tags: [lint-and-reports]
source: "docs/design/06-lint-and-reports.md#bw3xx-relations-and-links"
---
# BW3xx: relations and links

| Code | Rule | Severity | Fix |
|---|---|---|---|
| BW301 | Relation line does not parse. | error / warning | — |
| BW302 | Unknown relation verb. | error / warning | — |
| BW303 | Alias verb instead of canonical. | warning / info | rewrite canonically, keep the alias as qualifier |
| BW304 | Relation target does not resolve. | error / warning | repair via id history when possible |
| BW305 | Relation target is ambiguous. | error / error | — (lists candidates) |
| BW306 | Note relates to itself. | error / error | — |
| BW307 | Supersession cycle. | error / error | — |
| BW308 | Target of `supersedes` is not `status: superseded`. | warning / info | set status |
| BW309 | Contradictory containment (A part_of B and B part_of A). | error / error | — |
| BW310 | Body link does not resolve. | warning / info | repair via id history |
| BW311 | More than one `## Relations` section. | error / warning | — |
| BW312 | A note links to a note with a higher privacy level (the link text reveals the target's name to anyone allowed to read the source). | warning / warning | — |

## Relations
- part_of [[06-3-rule-catalog]]
