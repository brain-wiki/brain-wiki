---
id: 01M3250V003PWRX8G55279NHJR
type: design
title: "BW3xx: links"
source: "docs/design/lint-and-reports.md#bw3xx-links"
---
# BW3xx: links

| Code | Rule | Severity (strict / migrate) | Fix |
|---|---|---|---|
| BW307 † | Supersession cycle along `bw-superseded_by`. | error / error | — |
| BW310 | Body link does not resolve, or is ambiguous. | warning / info | Repoint it from the index's path history |

An unresolved link's message suggests the closest title, and an ambiguous
one lists up to five candidates. A wikilink to an attachment, such as
`![[diagram.png]]`, is also BW310, because attachments are not notes.
