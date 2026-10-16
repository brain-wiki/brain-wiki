---
id: 01M3250V00J2A031J9NQT73SC5
type: guide
title: "First steps"
source: "docs/user/getting-started.md#first-steps"
---
# First steps

```sh
brain log "Lumen stores attachments next to notes; Obsidian expects relative paths."
brain search "attachments"
brain orient
brain rules add "Prefer pytest for new tests." --quote "from now on use pytest"
```

- `brain log` writes an **episode** to the inbox: something nobody has
  organized yet. Episodes are never edited afterwards.
- **Notes** are where knowledge lives. You and your agents write them
  directly; **consolidation** is an optional helper for folding the inbox
  into notes. See [[user-maintenance|Maintenance]].
- **Rules** are your standing instructions. Only you add them: from the
  CLI, or by confirming an agent's proposal.
