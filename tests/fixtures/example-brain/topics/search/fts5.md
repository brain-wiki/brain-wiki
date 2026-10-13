---
id: 01M4KT3JPRY4W6766VT18CQS91
type: decision
title: Use SQLite FTS5 for local search
aliases: [FTS5 decision]
tags: [search, storage]
created: 2026-09-20
updated: 2026-10-01
bw-part_of:
  - "[[Search]]"
bw-depends_on:
  - "[[sqlite-version-policy]] — needs the trigram tokenizer"
bw-conflicts_with:
  - "[[vector-only]] (unless: embeddings enabled)"
bw-supersedes:
  - "[[ripgrep]] (replaced) — ripgrep took about 800 ms per query"
bw-claims:
  - "SQLite FTS5 is the default search backend for Lumen. {id: c-01M4KT3JPSB7BP2SNSCAVC2SFD; src: inbox/episodes/2026/09/01M2Z44880248H248H248H248H.md#L11-L12; origin: agent; at: 2026-09-20}"
  - "The trigram tokenizer requires SQLite 3.34 or newer."
bw-claims-superseded:
  - "Search shells out to ripgrep on every query. {id: c-01M4KT3JPSB7BP2SNSCAVC2SFE; by: c-01M4KT3JPSB7BP2SNSCAVC2SFD; at: 2026-09-20}"
---
# Use SQLite FTS5 for local search

We switched from shelling out to ripgrep to an FTS5 index because queries
were too slow on large note collections.
