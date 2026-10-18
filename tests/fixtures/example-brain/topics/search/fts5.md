---
id: 01M4KT3JPRY4W6766VT18CQS91
type: decision
title: Use SQLite FTS5 for local search
aliases: [FTS5 decision]
tags: [search, storage]
created: 2026-09-20
updated: 2026-10-01
bw-depends_on: "[[sqlite-version-policy]]"
bw-conflicts_with: "[[vector-only]]"
bw-sources:
  - "[[archive/episodes/2026/09/01M2Z44880248H248H248H248H]]"
---
# Use SQLite FTS5 for local search

We switched from shelling out to ripgrep to an FTS5 index because queries
were too slow on large note collections.

## Facts

- SQLite FTS5 is the default search backend for Lumen.
- The trigram tokenizer requires SQLite 3.34 or newer.

## History

- ~~Search shells out to ripgrep on every query.~~

## Relations

- Depends on [[sqlite-version-policy]] — needs the trigram tokenizer
- Conflicts with [[vector-only]] (unless: embeddings enabled)
- Supersedes [[ripgrep]] (replaced) — ripgrep took about 800 ms per query
