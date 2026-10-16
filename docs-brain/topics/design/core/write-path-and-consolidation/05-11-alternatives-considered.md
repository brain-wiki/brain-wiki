---
id: 01M3250V00ZR1X0B52SSTW4VZ3
type: design
title: "Alternatives considered (Write path and consolidation)"
aliases: ["05 §11"]
source: "docs/design/05-write-path-and-consolidation.md#11-alternatives-considered"
---
# Alternatives considered (Write path and consolidation)

| Option | Why not |
|---|---|
| Validated operations as the only way knowledge enters notes (format 2) | A heavy protocol for the common case, and agents with file access write files anyway. The validator checked shape, not quality: a verbatim copy of a bundled episode line passed. |
| Recording every direct edit as a run (checked edits, a loss guard) | Duplicates what git does, and needs a "last recorded version" per note that drifts from the files. |
| `brain validate` commits or records on success | A check with side effects surprises agents; committing is a separate, schedulable step (§5). |
| Nightly multi-phase "dreaming" with clustering and saliency scores | Too much machinery to tune before there is data. Clustering can come back as a selection heuristic for prepare. |
| Watermark file for consolidation progress | Extra state to sync and corrupt; location already encodes it (D13). |
| Built-in API clients | Requires keys, adds dependencies; the user's agent already has a model (D8). |
