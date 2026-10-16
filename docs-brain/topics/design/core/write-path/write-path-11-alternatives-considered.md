---
id: 01M3250V00CSY6XJWFQJF266P0
type: design
title: "Alternatives considered (Write path)"
aliases: ["Write path §11"]
source: "docs/design/write-path.md#11-alternatives-considered"
---
# Alternatives considered (Write path)

| Option | Why not |
|---|---|
| Validated JSON operations as the only way knowledge enters notes (format 2) | Heavy for the common case, and agents with file access write files anyway. See [[d07-json-ops\|D7]], superseded by [[d34-direct-edits\|D34]]. |
| Recording every direct edit as a run | Duplicates git, and needs a "last recorded version" per note that drifts from the files. See [[d28-checked-edits\|D28]]. |
| `brain validate` commits or records on success | A check with side effects surprises agents. Committing is a separate step (§5). |
| Nightly multi-phase "dreaming" with clustering and saliency scores | Too much machinery to tune before there is data. Clustering may return as a selection heuristic for prepare. |
| A watermark file for consolidation progress | Extra state to sync and corrupt; location already encodes it ([[d13-inbox-by-location\|D13]]). |
| Built-in API clients | Need keys and dependencies; the user's agent already has a model ([[d08-no-model-calls\|D8]]). |
