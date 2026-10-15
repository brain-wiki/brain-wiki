---
id: 01M3250V00XXH57YT1AEMBWY5N
type: guide
title: "Documents as episodes"
tags: [user-guide]
source: "docs/user/import.md#documents-as-episodes"
bw-part_of:
  - "[[user-import]]"
---
# Documents as episodes

```sh
brain import meeting-notes/ --to-episodes --apply
brain import clippings/ --to-episodes --untrusted --apply
```

Documents are split on headings into episodes for consolidation to fold
into notes; frontmatter is left out. Use `--untrusted` for text you did not
write. Running the same import again skips what was already imported, and
the output says how many episodes were written and how many skipped.
