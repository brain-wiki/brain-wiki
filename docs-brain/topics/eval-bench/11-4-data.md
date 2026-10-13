---
id: 01M3250V00E5H6DX2SF9CCRAGY
type: design
title: "Data (Eval bench)"
aliases: ["11 §4"]
tags: [eval-bench]
source: "docs/design/11-eval-bench.md#4-data"
bw-part_of:
  - "[[eval-bench]]"
---
# Data (Eval bench)

- **Generator** (`brainwiki.bench.gen`): seeded; fictional domains
  (a software project, a research lab, a recipe collection, a community
  garden); produces notes, claims with anchors, relations, chains,
  conflicts, privacy levels, and episodes with controlled noise and
  injection.
- **Example brain:** a small hand-written brain about a fictional
  software project, also used by tests and docs.
- **Scenario format:**

```text
bench/scenarios/<slice>/<id>/
├── scenario.toml        id, slice, description, notes for maintainers
├── brain/               starting brain (a normal brain directory)
├── episodes/            episodes to place in the inbox before the run
└── expect.toml          expected claims (anchors, terms, target), forbidden anchors,
                         expected ops and relations, budget checks
```

- **Growing the set from real failures:** `brain bench capture <run>`
  copies a real run's packet, ops, and validation result into a draft
  scenario under the user's state directory. It never leaves the machine
  automatically; the user scrubs it and decides whether to contribute it.
