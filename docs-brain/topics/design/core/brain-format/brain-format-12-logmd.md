---
id: 01M3250V007DB0KW7T28NY7VPD
type: design
title: "`log.md`"
aliases: ["Brain format §12"]
source: "docs/design/brain-format.md#12-logmd"
---
# `log.md`

`log.md` is an append-only, human-readable record of the runs brain-wiki
makes:

```markdown
## 2026-10-10T19:40:03Z · lint-fix · run-01JA0D7F…
- agent: owner
- lint --fix: 2 fixes
- topics/search/fts5.md: BW103 mint an id
- topics/search/ripgrep.md: BW119 set status: superseded
```

- `log.md` is for people. Orientation shows the last five headings and
  `reports/index.md` finds the last consolidation in it, but undo uses
  machine run records ([[write-path-8-undo|write path §8]]).
- Direct edits by people and agents are not runs and do not appear here.
  Git holds their history (`brain commit`,
  [[write-path-5-committing-direct-edits|write path §5]]).
- `brain init` sets `log.md merge=union` in `.gitattributes`, so
  concurrent appends from two devices merge without conflict.
