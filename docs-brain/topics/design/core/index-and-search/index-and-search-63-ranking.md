---
id: 01M3250V005BB7W1GXPZR4KCBH
type: design
title: "Ranking"
aliases: ["Index and search §6.3"]
source: "docs/design/index-and-search.md#63-ranking"
---
# Ranking

```
lexical = -bm25(fts, 8.0, 6.0, 3.0, 2.0, 1.0)   # title, aliases, tags, headings, body
score   = lexical × status_factor × kind_factor × recency_factor

status_factor  = active 1.0 · superseded 0.35 · archived 0.2
kind_factor    = hub 1.15 · note 1.0 · episode 0.7 · archived_episode 0.5
recency_factor = 0.85 + 0.15 × 0.5^(age_days / 180)       # mild; never below 0.85
```

The factors are configurable under `[search]` in `brain.toml`, and their
defaults are tuned with the bench ([[eval-bench|eval bench]]). Recency is
deliberately weak: an old note that is still active is still true.
Supersession, not age, is what demotes outdated knowledge.
