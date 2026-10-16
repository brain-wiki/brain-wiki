---
id: 01M3250V005B3M7HCFGV1V5YXS
type: design
title: "Failure modes (Index and retrieval)"
aliases: ["04 §11"]
source: "docs/design/04-index-and-retrieval.md#11-failure-modes"
---
# Failure modes (Index and retrieval)

| Failure | Behavior |
|---|---|
| Index missing, corrupt, wrong schema or config | Rebuild automatically; log one line. |
| A file fails to parse (bad YAML, bad encoding) | The file is indexed as plain text with `parse_errors=1` and a diagnostic; search still finds it; lint reports it. |
| Two files share an id | Both indexed; the newer file gets `path:` as its node id until fixed; lint error. |
| Link target ambiguous | Edge stored with `dst = NULL`; lint error lists candidates. |
| SQLite busy beyond timeout | After `busy_timeout` (5 s) the call fails with SQLite's lock error; retrying works once the other writer finishes. |
| SQLite lacks trigram | `meta.fts_trigram = 0`; CJK queries use the `LIKE` fallback; `brain doctor` reports it. |
