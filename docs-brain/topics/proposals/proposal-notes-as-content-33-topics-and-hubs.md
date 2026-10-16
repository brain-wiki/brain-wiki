---
id: 01M3250V00C0AV3VHADSC58B6Y
type: proposal
title: "Topics and hubs"
tags: [proposals]
source: "docs/proposals/notes-as-content.md#33-topics-and-hubs"
bw-part_of:
  - "[[proposal-notes-as-content-3-format-3]]"
---
# Topics and hubs

- A topic is a folder under `topics/` with a hub (`index.md`). Membership is
  the folder; `bw-part_of` goes away.
- A hub's `## Notes` list stays navigation. `brain lint --fix` adds missing
  entries and never removes lines a person wrote (unchanged).
