---
id: 01M3250V00M62PP3MSYXM8WB35
type: design
title: "Machine state"
aliases: ["Config and storage §4"]
source: "docs/design/config-and-storage.md#4-machine-state"
---
# Machine state

brain-wiki keeps four directories outside brains:

| Kind | Linux and macOS default | Windows | Contents |
|---|---|---|---|
| config | `~/.config/brain-wiki/` | `%APPDATA%\brain-wiki\` | `config.toml` |
| state | `$XDG_STATE_HOME/brain-wiki/`, default `~/.local/state/brain-wiki/` | `%LOCALAPPDATA%\brain-wiki\state\` | listed below |
| cache | `$XDG_CACHE_HOME/brain-wiki/`, default `~/.cache/brain-wiki/` | `%LOCALAPPDATA%\brain-wiki\cache\` | `brains/<brain-key>/index.sqlite` |
| data | `$XDG_DATA_HOME/brain-wiki/`, default `~/.local/share/brain-wiki/` | `%LOCALAPPDATA%\brain-wiki\data\` | `plugin/<host>/`, the plugin copies `brain connect` registers |

`BRAIN_WIKI_CONFIG` (the file), `BRAIN_WIKI_STATE_DIR`,
`BRAIN_WIKI_CACHE_DIR`, and `BRAIN_WIKI_DATA_DIR` override them. Tests use
these.

The state directory holds:

| Path | What |
|---|---|
| `brains/<brain-key>/runs/` | Run records and pre-images, for undo ([[write-path-8-undo\|write path §8]]) |
| `brains/<brain-key>/written/`, `dedupe/` | Episode markers ([[write-path-21-ways-an-episode-is-written\|write path §2.1]]) |
| `brains/<brain-id>/root` | The folder that owns the brain's id on this device |
| `harvest/` | Harvest watermarks and in-agent harvest runs |
| `locks/<brain-key>.lock` | Per-brain write locks |
| `connect/` | `brain connect` records and backups |
| `headless/` | Working folders for headless preset runs |
| `schedule/<brain-id>.json` | The last `brain commit` outcome per brain |
| `logs/` | `brain-wiki.log`, and `schedule-<brain-id>.log` per commit job |

What deleting each directory costs:

- config: brains must be registered again.
- state: undo history is lost. Harvest may re-read sessions, but dedupe
  keys prevent duplicate episodes. `brain connect --uninstall` can no
  longer restore what it replaced. `brain schedule list` and `brain doctor`
  show no last run until the next `brain commit`. Nothing in any brain is
  lost.
- cache: the index is rebuilt on next use.
- data: connected hosts lose brain-wiki until `brain connect` runs again.

State and cache are keyed by the brain's `id` from `brain.toml`, not by its
path, so moving a brain folder keeps its index and undo history. When a
second folder claims an id already owned by an existing folder (a copied
brain), the copy is keyed `<id>-<hash of path>`, so the two never share an
index or undo history
([[index-and-search-2-location-and-lifecycle|index and search §2]]).
Nothing reports the duplicate id. Commit jobs and their state files use the
plain id.
