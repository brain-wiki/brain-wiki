---
id: 01M3250V00FVQDS3NH9ABC79JR
type: proposal
title: "More deterministic graders"
tags: [proposals]
source: "docs/proposals/consolidation-bench.md#3-more-deterministic-graders"
---
# More deterministic graders

| Metric | How |
|---|---|
| Claim recall with key terms | A claim matches when it holds the required anchors and the key terms |
| Op-type accuracy | Per expected (episode, target) pair: add vs merge vs supersede vs skip |
| Placement accuracy | Target note or topic matches |
| Relation precision and recall | Verb, direction, endpoints |
| Citation faithfulness | Each written claim's anchors appear inside the episode spans it cites |
| Specificity | Anchors dropped by `supersede_claim` (the V9 warning), per run |
| Inputs propagation | Claims from episodes with external inputs carry `inputs`, for model runs |
