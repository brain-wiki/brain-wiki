---
id: 01M3250V0013B72DSRGR49MNAS
type: design
title: "`retrieval` (offline)"
aliases: ["11 §3.1"]
tags: [eval-bench]
source: "docs/design/11-eval-bench.md#31-retrieval-offline"
bw-part_of:
  - "[[11-3-suites]]"
---
# `retrieval` (offline)

Generated brains with known structure: topics, notes, claims, relations,
supersession chains up to 4 long, conflict pairs, and episodes. Queries
come from the generated notes (§4).

| Metric | Target |
|---|---|
| Recall@8, MRR, nDCG@8 for primary results | tracked; used to tune ranking factors |
| **Guard recall**: for every hit with a guard neighbor, the neighbor is returned | **100%** (fails the suite otherwise) |
| Unexpected guards: guard neighbors the ground truth does not have | 0 |
| Newest-successor correctness through chains | **100%** (fails the suite otherwise) |
