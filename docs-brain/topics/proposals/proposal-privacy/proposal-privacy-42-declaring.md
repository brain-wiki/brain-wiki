---
id: 01M3250V002V1D57C4BX9Y9JXV
type: proposal
title: "Declaring"
aliases: ["Privacy §4.2"]
source: "docs/proposal/privacy.md#42-declaring"
---
# Declaring

- A topic declares its level in its hub's frontmatter: `bw-privacy: private`
  in `index.md`. The level covers the folder, its plain subfolders, and its
  sub-topics. The strictest level along the tree wins.
- Notes carry no level of their own. One private note in an open topic moves
  into a private sub-topic: a folder with an `index.md`, which may hold just
  that note.
- Code gives each episode a level: the strictest of its topic hints and of
  what the session read (§4.4). An episode is never less private than its
  inputs.
- `brain.toml` keeps no per-topic level. It names the model providers the
  owner trusts for `private` (§4.3).
