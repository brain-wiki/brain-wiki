---
id: 01M3250V00H0WV6Q1ANKJFZE2W
type: proposal
title: "Scenario format"
tags: [proposals]
source: "docs/proposals/consolidation-bench.md#2-scenario-format"
---
# Scenario format

Scenarios move out of code into files:

```text
bench/scenarios/<slice>/<id>/
├── scenario.toml        id, slice, description, notes for maintainers
├── brain/               starting brain (a normal brain directory)
├── episodes/            episodes to place in the inbox before the run
└── expect.toml          expected claims (anchors, terms, target), forbidden anchors,
                         expected ops and relations
```
