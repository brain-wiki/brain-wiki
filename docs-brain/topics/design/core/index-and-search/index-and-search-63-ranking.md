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

status_factor  = active 1.0, superseded 0.35, archived 0.2
kind_factor    = hub 1.15, note 1.0, episode 0.7, archived_episode 0.5
recency_factor = 0.85 + 0.15 × 0.5^(age_days / 180)       # never below 0.85
```

- The factors and the half-life (`recency_half_life_days`) are set under
  `[search]` in `brain.toml`. Their defaults are tuned with the
  [[eval-bench|eval bench]].
- Trigram matches use weights 4.0 for the title and 1.0 for the body.
  `LIKE` matches get a lexical score of 0.5.
- A note without a readable `updated` counts as 365 days old.
- Recency is deliberately weak. An old note that is still active is still
  true. Supersession, not age, demotes outdated knowledge.
- With `sort` set to `recent` or `title`, a query returns its matches in
  that order and `score` is null.
