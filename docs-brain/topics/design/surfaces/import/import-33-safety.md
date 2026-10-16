---
id: 01M3250V00AJTCW894HM3R4CYY
type: design
title: "Safety (Import)"
aliases: ["Import §3.3"]
source: "docs/design/import.md#33-safety"
---
# Safety (Import)

- If the folder is a git repository with uncommitted changes, phase 0 and
  the apply of phases 1 and 2 stop and ask the user to commit or stash
  first, so import diffs stay clean.
- Without git, `brain undo` restores what phases 1 and 2 changed from the
  run's saved copies. There is no separate backup.
- Phase 0 refuses a name or folder already registered to another brain.
- Files that fail to parse are never modified.
- Conflict copies (Syncthing `.sync-conflict-`, "conflicted copy", or a
  ` (N).md` suffix) are reported and left alone; lint reports them as
  BW112.
