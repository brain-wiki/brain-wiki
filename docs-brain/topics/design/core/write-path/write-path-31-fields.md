---
id: 01M3250V00M5CYT1KQN2QMY2Z3
type: design
title: "Fields"
aliases: ["Write path §3.1"]
source: "docs/design/write-path.md#31-fields"
---
# Fields

Two independent fields on each episode, set by the code path that wrote it
(§2.1, [[d09-provenance-from-code|D9]]):

- `origin` says who produced the content: `owner`, `agent`, `import`, or
  `system`.
- `inputs` says whether the writer had read content from outside the
  user's control, which could carry instructions (indirect prompt
  injection): `local`, `external`, or `unknown`. External content is
  anything the user did not write or vouch for: web pages, search results,
  issue trackers, email, others' documents, and output of MCP servers other
  than brain-wiki.

Notes carry no per-fact provenance. A note may list its sources in
`bw-sources` ([[brain-format-61-frontmatter|brain format §6.1]]), and
git records when each line changed.
