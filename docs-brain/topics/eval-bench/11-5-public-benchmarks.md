---
id: 01M3250V00N2BARGPFG9FN2325
type: design
title: "Public benchmarks"
aliases: ["11 §5"]
tags: [eval-bench]
source: "docs/design/11-eval-bench.md#5-public-benchmarks"
bw-part_of:
  - "[[eval-bench]]"
---
# Public benchmarks

Public memory benchmarks measure question answering over long histories.
An adapter (after v0.1) can run them against brain-wiki by turning
sessions into episodes in timestamp order, consolidating, and answering
through search. They complement the core suites but do not test guards,
write safety, or relation structure.

| Benchmark | Relevant part | License | Use |
|---|---|---|---|
| LongMemEval | Knowledge-update and temporal-reasoning questions; evidence session ids allow retrieval recall without an LLM judge | MIT | First adapter target |
| MemoryAgentBench | Conflict resolution over incrementally fed facts (supersession) | MIT | Second target; closest to guard behavior |
| LoCoMo | Very long multi-session dialogs with evidence ids | CC BY-NC 4.0 | Download at run time only; never redistributed |
| HaluMem | Operation-level extraction and update quality against gold memory points | CC BY-NC-ND 4.0 | Download at run time only; closest public measure of write quality |

A method worth borrowing from recent work on LLM-compiled wikis is
**probe coverage**: generate questions from the source episodes and check
that each remains answerable from the consolidated notes. With a fixed
question set it can run without a judge (answers checked by anchors); it
is planned as an optional consolidation metric.
