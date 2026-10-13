---
id: 01M3250V00FPSWEHMTDHMCKQJ6
type: design
title: "Declaring"
aliases: ["16 §4.2"]
tags: [privacy]
source: "docs/design/16-privacy.md#42-declaring"
bw-part_of:
  - "[[16-4-draft-model]]"
---
# Declaring

- A topic declares its level in its hub's frontmatter: `bw-privacy: private`
  in `index.md`. It covers the folder, its plain subfolders, and its
  sub-topics; the strictest level along the tree wins.
- Notes carry no level of their own. One private note in an open topic moves
  into a private sub-topic (a folder with an `index.md`, which may hold just
  that note).
- Episodes get a level from code: the strictest of their hinted topics and of
  what the session read (§4.4). An episode is never less private than its
  inputs.
- `brain.toml` keeps no per-topic level. It names which model providers the
  owner trusts for `private` (§4.3).
