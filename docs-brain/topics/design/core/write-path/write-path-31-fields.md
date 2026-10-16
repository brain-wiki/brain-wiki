---
id: 01M3250V00M5CYT1KQN2QMY2Z3
type: design
title: "Fields"
aliases: ["Write path §3.1"]
source: "docs/design/write-path.md#31-fields"
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

Both fields live on episodes, set by the code path that wrote them (§2.1).
Notes carry no per-fact provenance: a note may list where its content came
from in `bw-sources` (episodes, other notes, URLs;
[[brain-format-61-frontmatter|brain format §6.1]]), and git records when each
line changed.
