---
id: 01M3250V0064T634CMNR2SMY5S
type: design
title: "BW7xx: safety"
source: "docs/design/lint-and-reports.md#bw7xx-safety"
---
# BW7xx: safety

| Code | Rule | Severity (strict / migrate) | Fix |
|---|---|---|---|
| BW701 | Text matches a secret pattern (API key, token, private key). | error / error | — |

The user removes the secret and rotates it, since git history may still
hold it. See [[security-and-privacy|security and privacy]].

Codes removed with format 3, for readers of 0.1 output: BW113, BW116 (now
part of BW117), BW201 to BW207, BW301 to BW306, BW308, BW309, BW311, and
BW702. An ambiguous body link, formerly BW305, is BW310.
