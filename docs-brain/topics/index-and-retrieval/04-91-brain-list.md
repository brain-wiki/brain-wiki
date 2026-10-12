---
id: 01M3250V001JNXZM0JJ5G25GV7
type: design
title: "Brain list"
aliases: ["04 §9.1"]
tags: [index-and-retrieval]
source: "docs/design/04-index-and-retrieval.md#91-brain-list"
---
# Brain list

`brain_list` (CLI `brain list`) answers "which brains exist, and what is
each for?" for the calling host:

| Field | Source |
|---|---|
| `name`, `description` | Registration, and the optional one-line `description` in `brain.toml` |
| `default_here` | Brain resolution for the current project and host ([[03-3-choosing-a-brain\|03 §3]]) |
| `topics`, `notes`, `updated`, `pending` | The index, filtered by the host's profile for that brain |
| `path` | The brain folder, **only** when the host's profile may read every privacy level and topic in the brain; omitted otherwise |

Brains outside the host's limits are not listed. The path is withheld from
restricted profiles because reading files directly would bypass the privacy
filters; privacy levels filter what the tools return and are not a sandbox
([[security-and-privacy|10]]).

## Relations
- part_of [[04-9-other-queries]]
