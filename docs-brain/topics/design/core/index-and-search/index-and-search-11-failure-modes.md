---
id: 01M3250V00B2QQ1TEZC2N5FY35
type: design
title: "Failure modes (Index and search)"
aliases: ["Index and search §11"]
source: "docs/design/index-and-search.md#11-failure-modes"
---
# Failure modes (Index and search)

| Failure | Behavior |
|---|---|
| Index missing, corrupt, wrong schema or config | Rebuilt automatically, with one log line |
| A file fails to parse (bad YAML, bad encoding) | Indexed as text with a diagnostic, still searchable, reported by lint |
| Two files share an id | Both indexed; the one indexed later gets a `path:` id; lint error BW105 |
| Link target ambiguous | Edge stored with `dst = NULL` and `ambiguous = 1`; lint lists the candidates |
| SQLite busy beyond the timeout | The call fails with SQLite's lock error after 5 s; a retry works once the other writer finishes |
| SQLite lacks trigram | `meta.fts_trigram = 0`; `brain doctor` reports it |

Without trigram, CJK runs shorter than 3 characters still use the `LIKE`
fallback. Longer runs get no fallback and rely on the `unicode61` token
match alone.
