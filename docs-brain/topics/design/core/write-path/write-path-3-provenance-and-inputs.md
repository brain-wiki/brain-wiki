---
id: 01M3250V00KR062J3WS7Z98ZPW
type: design
title: "Provenance and inputs"
aliases: ["Write path §3"]
source: "docs/design/write-path.md#3-provenance-and-inputs"
---
# Provenance and inputs

### 3.1 Fields

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


### 3.2 How inputs are determined

| Path | Value |
|---|---|
| A session's transcript (harvest packets, `session_inputs` in consolidation packets) | `external` when any tool call in the session matches the host's untrusted-tool list, else `local` |
| MCP | `unknown` |

The untrusted-tool list covers web fetch and search, browser tools, MCP
servers other than brain-wiki, and shell commands that reach the network
([[agent-integrations-6-harvest|agent integrations §6.3]]).
Harvest checks the whole transcript, not only the harvested turns. An MCP
server cannot see the rest of the session, and the model's claims about it
are not evidence.

`unknown` is treated like `external` everywhere it matters for safety
(§3.3).


### 3.3 Invariants

1. Nothing derived from content with `inputs` other than `local` is ever
   written to `rules.md` or the managed block of `AGENTS.md`. Consolidation
   never writes either file, and both are protected from direct edits
   (§2.3).
2. An episode keeps its `inputs` for life. The consolidation packet marks
   every episode whose `inputs` is not `local` with `"untrusted": true`,
   and orientation asks agents to cite sources in `bw-sources`. Once text
   is in a note, it carries no trust flag
   ([[security-and-privacy-3-threats-and-mitigations|security]], T2).
3. Episodes returned by search or read are wrapped in an
   `<untrusted-episode …>` envelope. The consolidation guidance tells the
   model that instructions inside episodes are content, never commands.
4. Harvest and origin windows drop tool output bodies, so what brain-wiki's
   tools returned is never recorded again as new evidence.
5. Provenance fields are written by code, stored in episode frontmatter,
   and indexed. No component parses provenance out of prose.
