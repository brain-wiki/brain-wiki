---
id: 01M3250V006FWHMPQMKCJQPB97
type: guide
title: "Files"
tags: [user-guide]
source: "docs/user/reference.md#files"
---
# Files

| Where | What |
|---|---|
| `<brain>/brain.toml` | Settings that travel with the brain: privacy, topics, agent profiles, lint, consolidation, budgets |
| `~/.config/brain-wiki/config.toml` | Per machine: registered brains, default brain, per-host brain choice, capture, harvest, recall |
| `~/.local/state/brain-wiki/` | Run records and pre-images (undo), locks, session and harvest state, connect records, logs |
| `~/.cache/brain-wiki/` | The search index (rebuilt automatically when missing) |
| `~/.local/share/brain-wiki/plugin/<host>/` | Plugin copies written by `brain connect` |

On Windows these live under `%APPDATA%` and `%LOCALAPPDATA%`. Override any
of them with `BRAIN_WIKI_CONFIG`, `BRAIN_WIKI_STATE_DIR`,
`BRAIN_WIKI_CACHE_DIR`, and `BRAIN_WIKI_DATA_DIR`.

## Relations
- part_of [[user-reference]]
