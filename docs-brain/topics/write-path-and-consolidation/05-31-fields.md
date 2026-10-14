---
id: 01M3250V00VHW4PWAE8XMQH9PS
type: design
title: "Fields"
aliases: ["05 §3.1"]
tags: [write-path-and-consolidation]
source: "docs/design/05-write-path-and-consolidation.md#31-fields"
bw-part_of:
  - "[[05-3-provenance-and-inputs]]"
---
# Fields

- **`origin`** says who produced the content: `owner`, `agent`, `import`,
  `system`.
- **`inputs`** says whether the writer had read content from outside the
  user's control before writing, which could carry instructions (indirect
  prompt injection): `local`, `external`, `unknown`. External content means
  anything the user did not write or explicitly vouch for: web pages,
  search results, issue trackers, email, documents from others, output of
  MCP servers other than brain-wiki.

They are separate because they vary independently: an agent can produce a
summary of the user's own notes (`agent`, `local`) or of a web page
(`agent`, `external`).
