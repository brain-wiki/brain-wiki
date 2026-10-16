# Public memory benchmarks

Status: designed, not scheduled · Extends [eval bench](../design/eval-bench.md)

Public memory benchmarks measure question answering over long histories.
An adapter can run them against brain-wiki by turning sessions into
episodes in timestamp order, consolidating, and answering through search.
They complement the core suites but do not test guards, write safety, or
relation structure.

## 1. Targets

| Benchmark | Relevant part | License | Use |
|---|---|---|---|
| LongMemEval | Knowledge-update and temporal-reasoning questions; evidence session ids allow retrieval recall without an LLM judge | MIT | First adapter target |
| MemoryAgentBench | Conflict resolution over incrementally fed facts (supersession) | MIT | Second target; closest to guard behavior |
| LoCoMo | Very long multi-session dialogs with evidence ids | CC BY-NC 4.0 | Download at run time only; never redistributed |
| HaluMem | Operation-level extraction and update quality against gold memory points | CC BY-NC-ND 4.0 | Download at run time only; closest public measure of write quality |

## 2. Probe coverage

A method worth borrowing from recent work on LLM-compiled wikis is
**probe coverage**: generate questions from the source episodes and check
that each remains answerable from the consolidated notes. With a fixed
question set it can run without a judge (answers checked by anchors), as
an optional consolidation metric.
