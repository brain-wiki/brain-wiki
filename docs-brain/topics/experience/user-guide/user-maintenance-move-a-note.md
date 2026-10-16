---
id: 01M3250V00Y5ZYEWSBSPFY61EJ
type: guide
title: "Move a note"
source: "docs/user/maintenance.md#move-a-note"
---
# Move a note

```sh
brain mv topics/search/old-name.md topics/search/new-name.md --dry-run
brain mv topics/search/old-name.md topics/search/new-name.md
```

- Links that name the note by path or file name are rewritten in the same
  run.
- Moving a topic folder (`brain mv topics/storage topics/persistence`) also
  renames its `[topics.storage]` table in `brain.toml`, or updates its
  `path`, and refreshes the `AGENTS.md` topic table.
- Moving files in another tool works too. Links keep resolving through the
  index's path history, and `brain lint --fix` rewrites them.
