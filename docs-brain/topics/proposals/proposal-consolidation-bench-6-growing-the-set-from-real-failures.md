---
id: 01M3250V00EE0JXTXABC0QD0DA
type: proposal
title: "Growing the set from real failures"
tags: [proposals]
source: "docs/proposals/consolidation-bench.md#6-growing-the-set-from-real-failures"
bw-part_of:
  - "[[proposal-consolidation-bench]]"
---
# Growing the set from real failures

`brain bench capture <run>` copies a real run's packet, ops, and
validation result into a draft scenario under the user's state
directory. It never leaves the machine automatically; the user scrubs it
and decides whether to contribute it.
