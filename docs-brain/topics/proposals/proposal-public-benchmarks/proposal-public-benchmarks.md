---
id: 01M3250V00JCSW1HRSA5RQJ0TQ
type: hub
title: "Public memory benchmarks"
source: "docs/proposal/public-benchmarks.md"
---
# Public memory benchmarks

Bench adapters for LongMemEval and similar, and probe coverage as a consolidation metric

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

Generated from `docs/proposal/public-benchmarks.md`.

## Notes
- [[proposal-public-benchmarks-1-targets]]: Targets
- [[proposal-public-benchmarks-2-probe-coverage]]: Probe coverage
