---
id: 01M3250V005B1Q74SM0ZW904ZJ
type: proposal
title: "Direct edits (Notes as content (format 3))"
tags: [proposals]
source: "docs/proposals/notes-as-content.md#41-direct-edits"
---
# Direct edits (Notes as content (format 3))

- An agent with `edit` creates and edits notes and hubs under `topics/`
  with its own file tools, then runs `brain validate` on what it changed.
- Still protected: `rules.md` (the rules path, 05 §6), `brain.toml`
  (`brain` commands), `log.md`, the `AGENTS.md` managed block, `inbox/` and
  `archive/` (episodes stay immutable), `reports/`.
- `edit` tells an agent, through orientation and the `AGENTS.md` block,
  whether it may edit notes, and gates brain-wiki's own writers (`mv`,
  `lint --fix`, `consolidate --done`). Files are not authenticated, as today.
- Removed: `brain check`, `brain restore`, the loss guard, pending-edit
  detection, edit runs, and edit proposals in `brain review`.
