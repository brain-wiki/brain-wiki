---
id: 01M3250V007DB0KW7T28NY7VPD
type: design
title: "`log.md`"
aliases: ["Brain format §12"]
source: "docs/design/brain-format.md#12-logmd"
---
# `log.md`

An append-only, human-readable record of changes made by brain-wiki:

```markdown
## 2026-10-10T19:40:03Z · lint-fix · run-01JA0D7F…
- agent: owner
- lint --fix: 2 fixes
- topics/search/fts5.md: BW103 mint an id
- topics/search/ripgrep.md: BW119 set status: superseded
```

`log.md` is for people. Nothing depends on parsing it; undo uses machine
run records ([[write-path-8-undo|write path §8]]). Direct
edits by people and agents are not runs and do not appear here; git holds
their history (`brain commit`, [[write-path|write path]]).
