---
id: 01M3250V00AR5DSEN0T7FWJRHA
type: proposal
title: "Multi-model metrics"
tags: [proposals]
source: "docs/proposals/consolidation-bench.md#5-multi-model-metrics"
bw-part_of:
  - "[[proposal-consolidation-bench]]"
---
# Multi-model metrics

Same scenarios, several presets, 3 repeats each by default:

| Metric | Measures |
|---|---|
| Worst-model score per slice, over every grader | The headline number |
| Self-consistency | Variance across repeats of one model |
| Agreement on op type and placement (Fleiss' kappa) | Whether models make the same structural decisions |
| Claim-set overlap (anchor-matched Jaccard) | Content divergence |
| Cross-read retrieval | After model A consolidates, run the retrieval queries; tests whether A's notes serve every reader |
| Tokens and wall time | From the host CLI's JSON output where it reports usage |
