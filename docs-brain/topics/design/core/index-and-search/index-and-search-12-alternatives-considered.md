---
id: 01M3250V00KKWN4CAZ4M0RJ564
type: design
title: "Alternatives considered (Index and search)"
aliases: ["Index and search §12"]
source: "docs/design/index-and-search.md#12-alternatives-considered"
---
# Alternatives considered (Index and search)

| Option | Why not |
|---|---|
| Scan files with ripgrep at query time | No ranking, no graph, no field weights, and the cost grows with the brain on every query |
| Vector database or embeddings only | Misses exact terms and identifiers, needs a model, and still needs the link graph for the guard |
| Tantivy or Whoosh | An extra dependency for little gain over FTS5 at this scale |
| DuckDB | Strong for analytics, weaker and heavier for incremental full-text search |
| In-memory index per process | Parsing 10k notes on every CLI call costs seconds |
| Index inside the brain | Breaks under sync tools, is device-specific, and clutters git |
