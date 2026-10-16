---
id: 01M3250V0013B72DSRGR49MNAS
type: design
title: "`retrieval` (offline)"
aliases: ["11 §3.1"]
tags: [eval-bench]
source: "docs/design/11-eval-bench.md#31-retrieval-offline"
---
# `retrieval` (offline)

Generated format-3 brains with known structure: topics with hubs, notes,
supersession chains (`bw-superseded_by`, up to 4 notes long), body links,
and episodes. Queries come from the generated notes (§4). The only guard is
supersession ([[02-7-supersession-guard|02 §7]]).

| Metric | Target |
|---|---|
| Recall@8, MRR, nDCG@8 for primary results | tracked; used to tune ranking factors |
| **Guard recall**: every hit on a superseded note carries a `superseded_by` guard, and every hit on a successor carries `supersedes` guards for the notes it replaced | **100%** (fails the suite otherwise) |
| Unexpected guards: guards the ground truth does not have | 0 |
| Newest-successor correctness through chains | **100%** (fails the suite otherwise) |
