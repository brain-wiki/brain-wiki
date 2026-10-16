---
id: 01M3250V0069VAW385Z8VE8QQ0
type: design
title: "Machine state"
aliases: ["03 §4"]
tags: [config-and-storage]
source: "docs/design/03-config-and-storage.md#4-machine-state"
---
# Machine state

| Kind | Linux / macOS default | Windows | Contents | If deleted |
|---|---|---|---|---|
| config | `~/.config/brain-wiki/` | `%APPDATA%\brain-wiki\` | `config.toml` | Brains must be re-registered |
| state | `$XDG_STATE_HOME/brain-wiki/`, default `~/.local/state/brain-wiki/` | `%LOCALAPPDATA%\brain-wiki\state\` | run records and pre-images (undo), open consolidation packets, episode markers, harvest watermarks, locks, `brain connect` records and backups, headless preset runs, the log | Undo history is lost; harvest may re-read sessions (dedupe keys prevent duplicate episodes); `connect --uninstall` can no longer restore what it replaced; nothing in any brain is lost |
| cache | `$XDG_CACHE_HOME/brain-wiki/`, default `~/.cache/brain-wiki/` | `%LOCALAPPDATA%\brain-wiki\cache\` | `brains/<brain-id>/index.sqlite` | Rebuilt on next use |
| data | `$XDG_DATA_HOME/brain-wiki/`, default `~/.local/share/brain-wiki/` | `%LOCALAPPDATA%\brain-wiki\data\` | `plugin/<host>/`, the plugin copies `brain connect` registers | Connected hosts lose brain-wiki until `brain connect` runs again |

`BRAIN_WIKI_CONFIG` (the file), `BRAIN_WIKI_STATE_DIR`, `BRAIN_WIKI_CACHE_DIR`,
and `BRAIN_WIKI_DATA_DIR` override them (tests use these).

Everything is keyed by the brain's `id` from `brain.toml`, not by its
path, so moving a brain folder keeps its index and undo history. When two
folders claim the same id (a copied brain), the second one is keyed by
`<id>-<hash of path>`, so the copies never share an index or undo history
([[04-2-location-and-lifecycle|04 §2]]). Nothing
reports the duplicate id.
