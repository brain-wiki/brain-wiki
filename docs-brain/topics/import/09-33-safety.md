---
id: 01M3250V00D8F44AM7H4MKXQBD
type: design
title: "Safety (Import)"
aliases: ["09 §3.3"]
tags: [import]
source: "docs/design/09-import.md#33-safety"
bw-part_of:
  - "[[09-3-overlay]]"
---
# Safety (Import)

- If the folder is a git repository with uncommitted changes, apply stops
  and asks the user to commit or stash first, so import diffs stay clean.
- If the folder is not a git repository, apply writes a compressed backup
  of every file it will modify to the run's state directory before
  changing anything (in addition to the normal pre-images).
- Files that fail to parse are never modified.
- A conflict copy (BW112) is reported and left alone.
