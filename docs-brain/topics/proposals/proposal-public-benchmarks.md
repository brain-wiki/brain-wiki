---
id: 01M3250V00958BGQDQZXD3Z2Q3
type: proposal
title: "Public memory benchmarks"
source: "docs/proposal/public-benchmarks.md"
---
# Public memory benchmarks

Status: designed, not scheduled. Extends
[[eval-bench|eval bench]].

Public memory benchmarks measure question answering over long histories.
An adapter would run one against brain-wiki in three steps:

1. Write the benchmark's sessions as episodes, in timestamp order.
2. Have an agent consolidate them into notes. This needs the bench's
   `agent` suite, which is reserved and not built.
3. Answer each question through search.

These benchmarks complement the core suites. They do not test supersession
warnings, write safety, or link structure.


## 1. Targets

| Benchmark | Relevant part | License | Use |
|---|---|---|---|
| LongMemEval | Knowledge-update and temporal-reasoning questions; evidence session ids measure retrieval recall without an LLM judge | MIT | First adapter |
| MemoryAgentBench | Conflict resolution over facts fed one at a time | MIT | Second adapter; closest to supersession |
| LoCoMo | Very long multi-session dialogs with evidence ids | CC BY-NC 4.0 | Download at run time only, never redistributed |
| HaluMem | Extraction and update quality against gold memory points | CC BY-NC-ND 4.0 | Download at run time only; the closest public measure of write quality |


## 2. Probe coverage

Probe coverage comes from recent work on wikis that LLMs compile. It
generates questions from the source episodes and checks that each stays
answerable from the consolidated notes. With a fixed question set and
answers checked by anchor strings, it needs no judge model, and it could
serve as an optional consolidation metric.
