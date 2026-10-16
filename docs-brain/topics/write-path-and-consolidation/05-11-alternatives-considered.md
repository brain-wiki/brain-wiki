---
id: 01M3250V00ZR1X0B52SSTW4VZ3
type: design
title: "Alternatives considered (Write path and consolidation)"
aliases: ["05 §11"]
tags: [write-path-and-consolidation]
source: "docs/design/05-write-path-and-consolidation.md#11-alternatives-considered"
---
# Alternatives considered (Write path and consolidation)

| Option | Why not |
|---|---|
| LLM rewrites the whole note | Silent loss; unreviewable diffs; no provenance per fact. |
| LLM edits with file tools (search/replace) | Same risks, plus the model needs write access to the brain. |
| Nightly multi-phase "dreaming" with clustering and saliency scores | Too much machinery to tune before there is data; the op-based run covers the need. Clustering can come back as a selection heuristic. |
| Watermark file for progress | Extra state to sync and corrupt; location already encodes it (D13). |
| Partial application of valid ops in a batch | Harder to reason about and undo; resubmission with errors is cheap. |
| Built-in API clients | Requires keys, adds dependencies; the user's agent already has a model (D8). |
