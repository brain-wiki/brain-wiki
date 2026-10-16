---
id: 01M3250V00P312TER74NP8YYM4
type: design
title: "BW7xx: safety"
tags: [lint-and-reports]
source: "docs/design/06-lint-and-reports.md#bw7xx-safety"
---
# BW7xx: safety

| Code | Rule | Severity | Fix |
|---|---|---|---|
| BW701 | Text matches a secret pattern (API key, token, private key). | error / error | — (the user must remove and rotate it) |
| BW702 | Instruction-like text ("ignore previous instructions", "you must now…") in a claim with `inputs` ≠ `local`. | warning / warning | — |
