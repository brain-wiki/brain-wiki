---
id: 01M3250V0069VAW385Z8VE8QQ0
type: design
title: "Machine state"
aliases: ["03 §4"]
tags: [config-and-storage]
source: "docs/design/03-config-and-storage.md#4-machine-state"
bw-part_of:
  - "[[config-and-storage]]"
---
# Machine state

| Kind | Linux / macOS default | Windows | Contents | If deleted |
|---|---|---|---|---|
| config | `~/.config/brain-wiki/` | `%APPDATA%\brain-wiki\` | `config.toml` | Brains must be re-registered |
| state | `$XDG_STATE_HOME/brain-wiki/`, default `~/.local/state/brain-wiki/` | `%LOCALAPPDATA%\brain-wiki\state\` | run records and pre-images (undo), open consolidation packets, session capture and taint markers, harvest watermarks, locks | Undo history is lost; harvest may re-read sessions (dedupe keys prevent duplicate episodes); nothing in any brain is lost |
| cache | `$XDG_CACHE_HOME/brain-wiki/`, default `~/.cache/brain-wiki/` | `%LOCALAPPDATA%\brain-wiki\cache\` | `brains/<brain-id>/index.sqlite` | Rebuilt on next use |

`BRAIN_WIKI_STATE_DIR` and `BRAIN_WIKI_CACHE_DIR` override them (tests use
these).

Everything is keyed by the brain's `id` from `brain.toml`, not by its
path, so moving a brain folder keeps its index and undo history. When two
folders claim the same id (a copied brain), the second one is keyed by
`<id>-<hash of path>` and lint reports BW105-style duplication at the
brain level ([[04-2-location-and-lifecycle|04 §2]]).
