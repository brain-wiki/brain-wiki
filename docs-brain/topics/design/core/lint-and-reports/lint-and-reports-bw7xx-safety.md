---
id: 01M3250V0064T634CMNR2SMY5S
type: design
title: "BW7xx: safety"
source: "docs/design/lint-and-reports.md#bw7xx-safety"
---
# BW7xx: safety

| Code | Rule | Severity (strict / migrate) | Fix |
|---|---|---|---|
| BW701 | Text matches a secret pattern (API key, token, private key). | error / error | — (the user must remove and rotate it) |

Removed with format 3, for readers of 0.1 output: BW113 (relation-like
properties), BW116 (format 1, now part of BW117), BW201–BW207 (claims),
BW301–BW306, BW308, BW309, BW311 (typed relations), and BW702
(instruction-like claim text). An ambiguous body link, formerly BW305, is
BW310.
