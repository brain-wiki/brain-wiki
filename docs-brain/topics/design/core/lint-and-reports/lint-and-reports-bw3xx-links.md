---
id: 01M3250V003PWRX8G55279NHJR
type: design
title: "BW3xx: links"
source: "docs/design/lint-and-reports.md#bw3xx-links"
---
# BW3xx: links

| Code | Rule | Severity (strict / migrate) | Fix |
|---|---|---|---|
| BW307 † | Supersession cycle on `bw-superseded_by`. | error / error | — |
| BW310 | Body link does not resolve, or is ambiguous (the message lists the candidates). | warning / info | point the link at the note's current name, from the index's path history |
