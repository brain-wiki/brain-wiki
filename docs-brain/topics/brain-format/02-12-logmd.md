---
id: 01M3250V00X3GEZCE900VCS0Z5
type: design
title: "`log.md`"
aliases: ["02 §12"]
tags: [brain-format]
source: "docs/design/02-brain-format.md#12-logmd"
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
run records ([[05-8-undo|05 §8]]). Direct
edits by people and agents are not runs and do not appear here; git holds
their history (`brain commit`, [[write-path-and-consolidation|05]]).
