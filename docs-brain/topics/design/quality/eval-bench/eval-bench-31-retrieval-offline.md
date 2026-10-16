---
id: 01M3250V00ESV324TP2TYX2W1Z
type: design
title: "`retrieval` (offline)"
aliases: ["Eval bench §3.1"]
source: "docs/design/eval-bench.md#31-retrieval-offline"
---
# `retrieval` (offline)

The suite generates a format-3 brain (§4), runs the planted queries, and checks every note and hub in the top 8 results against the ground truth. The only guard is supersession ([[brain-format-7-supersession-guard|brain format §7]]).

| Metric | Target |
|---|---|
| Recall@8, MRR, and nDCG@8, overall and per query family | None; tracked to tune ranking |
| Guard recall: a hit on a superseded note carries a `superseded_by` guard, and a hit on a successor carries `supersedes` guards for the notes it replaced | 100%, hard |
| Guards the ground truth does not have | 0, soft |
| Newest successor: the `superseded_by` guard names the end of the chain | 100%, hard |
