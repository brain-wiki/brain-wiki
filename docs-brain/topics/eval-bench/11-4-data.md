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

- **Generator** (`brainwiki.bench.generate`): seeded; notes about invented
  software projects, in common English words plus generated pseudo-words
  drawn with a Zipf distribution so FTS ranks them like real prose. It
  plants topics, notes, claims with anchors, relations, supersession
  chains, conflicts, and episodes, and records the ground truth. The same
  seed writes byte-identical files.
- **Queries** come from the generated notes: a planted token (`exact`), a
  title (`title`), and a token shared by a small group with graded
  relevance (`group`).
- **Base brain:** a small hand-written brain about a fictional software
  project, the starting point for the lint and consolidation cases.
