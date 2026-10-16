---
id: 01M3250V00GYSEE9D11J6ZQS5X
type: design
title: "BW3xx: links"
tags: [lint-and-reports]
source: "docs/design/06-lint-and-reports.md#bw3xx-links"
---
# BW3xx: links

| Code | Rule | Severity (strict / migrate) | Fix |
|---|---|---|---|
| BW307 † | Supersession cycle on `bw-superseded_by`. | error / error | — |
| BW310 | Body link does not resolve, or is ambiguous (the message lists the candidates). | warning / info | point the link at the note's current name, from the index's path history |
