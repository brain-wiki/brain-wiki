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

- `brain log` writes an episode to the inbox. An **episode** is an
  observation nobody has organized yet. Episodes are never edited afterwards.
- **Notes** hold the knowledge. You and your agents write them directly.
  **Consolidation** folds the inbox into notes when you ask. See
  [[user-maintenance-consolidate|Maintenance]].
- **Rules** are your standing instructions. Only you add them, from the CLI
  or by accepting an agent's proposal.
