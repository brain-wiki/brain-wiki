---
id: 01M3250V000Q1WHWMARQSKTEQ5
type: design
title: "Alternatives considered (Index and retrieval)"
aliases: ["04 §12"]
tags: [index-and-retrieval]
source: "docs/design/04-index-and-retrieval.md#12-alternatives-considered"
---
# Alternatives considered (Index and retrieval)

| Option | Why not (for v0.1) |
|---|---|
| Scan files with ripgrep at query time | No ranking, no graph, no field weights; cost grows with the brain on every query. |
| Vector database / embeddings only | Misses exact terms and identifiers, needs a model, is opaque, and still needs the graph for guards. Planned as an optional hybrid signal. |
| Tantivy or Whoosh | An extra dependency for little gain over FTS5 at this scale. |
| DuckDB | Strong for analytics, weaker and heavier for incremental full-text search. |
| In-memory index per process | Parsing 10k notes on every hook call costs seconds. |
| Index inside the brain | Breaks under sync tools, is device-specific, and clutters git. |

## Relations
- part_of [[index-and-retrieval]]
