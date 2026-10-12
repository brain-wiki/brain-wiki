---
id: 01M3250V0013B72DSRGR49MNAS
type: design
title: "`retrieval` (offline)"
aliases: ["11 §3.1"]
tags: [eval-bench]
source: "docs/design/11-eval-bench.md#31-retrieval-offline"
---
# `retrieval` (offline)

Generated brains with known structure: topics, notes, claims, relations,
supersession chains up to 4 long, conflict pairs, privacy levels, and
episodes. Queries come from templates over titles and claims (with
synonym substitution) plus hand-written queries for the example brain.

| Metric | Target |
|---|---|
| Recall@8, MRR, nDCG@8 for primary results | tracked; used to tune ranking factors |
| **Guard recall**: for every hit with a guard neighbor visible to the profile, the neighbor is returned | **100%** (fails the suite otherwise) |
| Newest-successor correctness through chains | **100%** |
| **Privacy leaks**: any result, snippet, guard, or count derived from a note above the profile's level, other than the hidden-guard count | **0** |
| Hidden-guard counts | exact |

## Relations
- part_of [[11-3-suites]]
