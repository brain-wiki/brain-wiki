---
id: 01M3250V00V488QYCDJN3RDEM6
type: design
title: "Brain list"
aliases: ["Index and search §9.1"]
source: "docs/design/index-and-search.md#91-brain-list"
---
# Brain list

`brain_list` (CLI `brain brains`) answers "which brains exist, and what is
each for?" for the calling host.

| Field | Source |
|---|---|
| `name`, `description` | Registration, and the optional one-line `description` in `brain.toml` |
| `default_here` | Brain resolution for the current project and host ([[config-and-storage-3-choosing-a-brain\|config and storage §3]]) |
| `topics`, `notes`, `updated`, `pending` | The index |
| `path` | The brain folder, so the host can read its files directly |
| `ok`, `error` | Whether the brain opened, and why not |

- A brain found from the working directory but not registered is listed
  too.
- Brains outside the host's allowed list
  ([[config-and-storage-3-choosing-a-brain|config and storage §3]]) are
  not listed.
- For the owner, each entry also has `default`, whether it is the user's
  default brain.
