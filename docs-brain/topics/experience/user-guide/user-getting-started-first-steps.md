---
id: 01M3250V00J2A031J9NQT73SC5
type: guide
title: "First steps"
source: "docs/user/getting-started.md#first-steps"
---
# First steps

```sh
brain search "attachments"
brain orient
brain rules add "Prefer pytest for new tests." --quote "from now on use pytest"
```

- Your agents record what they learn as **episodes** in the inbox, with the
  MCP tool `brain_log_episode`. An episode is an observation nobody has
  organized yet, and it is never edited afterwards. To have something
  remembered, tell an agent "remember that …".
- **Notes** hold the knowledge. You and your agents write them directly.
  **Consolidation** folds the inbox into notes when you ask. See
  [[user-maintenance-consolidate|Maintenance]].
- **Rules** are your standing instructions. Only you add them, from the CLI
  or by accepting an agent's proposal.
