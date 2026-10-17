---
id: 01M3250V006FWHMPQMKCJQPB97
type: guide
title: "Files"
source: "docs/user/reference.md#files"
---
# Files

| Where | What |
|---|---|
| `<brain>/brain.toml` | Settings that travel with the brain: format, layout, topics, agent profiles, lint, search, consolidation, git, reports, budgets |
| `~/.config/brain-wiki/config.toml` | Per machine: registered brains, default brain, per-host settings, harvest |
| `~/.local/state/brain-wiki/` | Run records and pre-images for undo, locks, harvest and connect state, commit-job state (`schedule/`), scheduled consolidation outcomes, logs |
| `~/.cache/brain-wiki/` | The search index, rebuilt when missing |
| `~/.local/share/brain-wiki/plugin/<host>/` | Plugin copies written by `brain connect` |

- The `XDG_CONFIG_HOME`, `XDG_STATE_HOME`, `XDG_CACHE_HOME`, and
  `XDG_DATA_HOME` variables move these folders on Linux and macOS.
- On Windows they live under `%APPDATA%` and `%LOCALAPPDATA%`.
- `BRAIN_WIKI_CONFIG`, `BRAIN_WIKI_STATE_DIR`, `BRAIN_WIKI_CACHE_DIR`, and
  `BRAIN_WIKI_DATA_DIR` override each one.
