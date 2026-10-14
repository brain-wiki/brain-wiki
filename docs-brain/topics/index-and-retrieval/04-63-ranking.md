---
id: 01M3250V001P07R1AHT1VWWEY1
type: design
title: "Ranking"
aliases: ["04 §6.3"]
tags: [index-and-retrieval]
source: "docs/design/04-index-and-retrieval.md#63-ranking"
bw-part_of:
  - "[[04-6-search]]"
---
# Ranking

```
lexical = -bm25(fts, 8.0, 6.0, 3.0, 2.0, 1.0, 0.2)   # title, aliases, tags, headings, body, history
score   = lexical × status_factor × kind_factor × recency_factor

status_factor  = active 1.0 · superseded 0.35 · archived 0.2
kind_factor    = hub 1.15 · note 1.0 · episode 0.7 · archived_episode 0.5
recency_factor = 0.85 + 0.15 × 0.5^(age_days / 180)       # mild; never below 0.85
```

The factors are configurable under `[search]` in `brain.toml`, and their
defaults are tuned with the bench ([[eval-bench|11]]). Recency is
deliberately weak: an old note that is still active is still true.
Supersession, not age, is what demotes outdated knowledge.
