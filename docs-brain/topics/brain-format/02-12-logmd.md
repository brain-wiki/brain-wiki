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
## 2026-10-10T19:40:03Z · consolidate · run-01JA0D7F…
- agent: claude-code (backend: agent) · episodes: 6 → archived 6
- topics/search/fts5.md: +2 claims, 1 superseded, +1 relation
```

`log.md` is for people. Nothing depends on parsing it; undo uses machine
run records ([[05-8-undo|05 §8]]).

## Relations
- part_of [[brain-format]]
