---
id: 01M3250V001JNXZM0JJ5G25GV7
type: design
title: "Brain list"
aliases: ["04 §9.1"]
source: "docs/design/04-index-and-retrieval.md#91-brain-list"
---
# Brain list

`brain_list` (CLI `brain brains`) answers "which brains exist, and what is
each for?" for the calling host:

| Field | Source |
|---|---|
| `name`, `description` | Registration, and the optional one-line `description` in `brain.toml` |
| `default_here` | Brain resolution for the current project and host ([[03-3-choosing-a-brain\|03 §3]]) |
| `topics`, `notes`, `updated`, `pending` | The index |
| `path` | The brain folder, so the host can read its files directly |

Brains outside the host's limits ([[03-3-choosing-a-brain|03 §3]]) are not listed.
