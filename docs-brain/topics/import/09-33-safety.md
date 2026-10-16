---
id: 01M3250V00D8F44AM7H4MKXQBD
type: design
title: "Safety (Import)"
aliases: ["09 §3.3"]
tags: [import]
source: "docs/design/09-import.md#33-safety"
---
# Safety (Import)

- If the folder is a git repository with uncommitted changes, apply stops
  and asks the user to commit or stash first, so import diffs stay clean.
- If the folder is not a git repository, `brain undo` restores what
  phases 1–3 changed from the run's pre-images; there is no separate backup.
- Phase 0 refuses a name or folder that is already registered as another
  brain.
- Files that fail to parse are never modified.
- A conflict copy (BW112) is reported and left alone.
