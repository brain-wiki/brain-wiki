---
id: 01M3250V00JCSW1HRSA5RQJ0TQ
type: hub
title: "Public memory benchmarks"
source: "docs/proposals/public-benchmarks.md"
---
# Public memory benchmarks

Bench adapters for LongMemEval and similar; probe coverage as a consolidation metric

Status: designed, not scheduled · Extends [[eval-bench|11]]

Public memory benchmarks measure question answering over long histories.
An adapter can run them against brain-wiki by turning sessions into
episodes in timestamp order, consolidating, and answering through search.
They complement the core suites but do not test guards, write safety, or
relation structure.

Generated from `docs/proposals/public-benchmarks.md`.

## Notes
- [[proposal-public-benchmarks-1-targets]]: Targets
- [[proposal-public-benchmarks-2-probe-coverage]]: Probe coverage
