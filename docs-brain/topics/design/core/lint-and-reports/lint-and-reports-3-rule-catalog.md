---
id: 01M3250V00R0QGCCCCDW3SXRJX
type: design
title: "Rule catalog"
aliases: ["Lint and reports §3"]
source: "docs/design/lint-and-reports.md#3-rule-catalog"
---
# Rule catalog

Codes are stable. New rules get new codes, and the codes of removed rules
are not reused. The Fix column says what `brain lint --fix` does. Codes
marked † are `SCHEMA_CODES`, the rules `brain validate` runs.


### BW1xx: files and frontmatter

| Code | Rule | Severity (strict / migrate) | Fix |
|---|---|---|---|
| BW101 † | Frontmatter is not valid YAML, not a mapping, not closed, or over 64 KiB. | error / error | — |
| BW102 † | Frontmatter holds a nested mapping or a list of lists. | error / warning | — |
| BW103 † | Note has no `id`. | error / info | Mint an id |
| BW104 † | `id` is not a ULID. | error / warning | Mint a new id |
| BW105 † | Two files share an `id`. | error / error | Mint new ids for the newer notes or topic pages |
| BW106 † | `status` is not `active`, `superseded`, or `archived`. | error / info | Map it, keeping the old value in `bw-stage` |
| BW109 | Unknown key in `brain.toml`. | warning / warning | — |
| BW110 | Two paths differ only by letter case. | warning / warning | — |
| BW111 | File is not valid UTF-8. | error / error | — |
| BW112 | File looks like a sync conflict copy. | warning / warning | — |
| BW114 | Leftover merge conflict markers outside code. | error / error | — |
| BW115 | `*.sqlite`, `*.sqlite3`, `*.db`, `*-wal`, or `*-shm` file inside the brain. | warning / warning | — |
| BW117 † | Note is in format 1 or 2. | error / warning | Convert to format 3 (§5.1) |
| BW118 † | Unknown `bw-` field in a note. | error / warning | — |
| BW119 † | `bw-superseded_by` is malformed, unresolved, names its own note, or is set without `status: superseded`. | error / warning | Set `status: superseded` (last case only) |
| BW120 † | A `bw-sources` item is neither a link nor a URL. | error / warning | — |
| BW121 † | A protected file was edited. | error / error | — |
| BW122 † | A `bw-sources` link does not resolve. | warning / info | — |

- The BW103 message includes a fresh `id:` line an agent can paste.
- BW105 keeps the id on the file with the oldest modification time.
  Duplicate episode ids get no fix.
- BW106 maps status values as [[import-4-normalization-rules|import §4]]
  describes, and leaves an existing `bw-stage` alone.
- BW112 matches common sync-tool conflict names, and `note (1).md` or
  `note 2.md` when `note.md` exists with different content.
- BW114 checks notes, topic pages, `rules.md`, `AGENTS.md`, and `log.md`.
- BW117 lists what makes the note format 1 or 2
  ([[brain-format-13-format-versioning|brain format §13]]). A
  `bw-supersedes` relation adds a second BW117 whose fix marks the note it
  names as superseded.
- BW121 comes only from `brain validate`, for a path that
  [[write-path-23-direct-edits|write path §2.3]] protects.


### BW3xx: links

| Code | Rule | Severity (strict / migrate) | Fix |
|---|---|---|---|
| BW307 † | Supersession cycle along `bw-superseded_by`. | error / error | — |
| BW310 | Body link does not resolve, or is ambiguous. | warning / info | Repoint it from the index's path history |

An unresolved link's message suggests the closest title, and an ambiguous
one lists up to five candidates. A wikilink to an attachment, such as
`![[diagram.png]]`, is also BW310, because attachments are not notes.


### BW4xx: structure and budgets

| Code | Rule | Severity (strict / migrate) | Fix |
|---|---|---|---|
| BW402 | `rules.md` exceeds its line or character budget. | error / error | — |
| BW403 | `AGENTS.md` exceeds `budgets.agents_md_max_lines`. | error / warning | Regenerate the block |
| BW404 | A topic folder has no topic page. | warning / info | Create a topic page listing the topic's notes |
| BW405 | Note is not in its topic page's `## Notes`, and no chain of body links reaches it from a note that is. | info / off | Append a line to `## Notes` |
| BW406 | Orphan: no other note, topic page, or episode links to it. | info / off | — |
| BW407 | Note outside any topic. | info / off | — |
| BW408 | `AGENTS.md` or its managed block is missing or out of date. | warning / warning | Create the file or regenerate the block |
| BW409 | A topic slug declared in `brain.toml` is invalid. | error / warning | — |

A deeper folder without a topic page is not a topic
([[brain-format-2-directory-layout|brain format §2.1]]), so BW404 concerns
top-level folders and declared topics.


### BW5xx: inbox

| Code | Rule | Severity (strict / migrate) | Fix |
|---|---|---|---|
| BW501 | Episode changed after it was created. | error / error | — |
| BW502 | Episode id is not a ULID, or its path is not `YYYY/MM/<id>.md`. | error / warning | Move it (valid ids only) |
| BW503 | Episode lacks `id`, or a valid `bw-origin` or `bw-inputs`. | error / warning | Fill `bw-origin: agent`, `bw-inputs: unknown`, and a new id |
| BW504 | A proposal names an `inbox/episodes/` path that no longer exists. | warning / warning | — |
| BW505 | Episodes pending longer than `lint.stale_inbox_days` (default 14). | info / info | — |

- BW501 compares an episode with the first hash the index recorded for
  its id. A run that rewrites an episode records the new hash.
- Files archived under `archive/agents/` keep their own format and are not
  checked.


### BW6xx: rules

| Code | Rule | Severity (strict / migrate) | Fix |
|---|---|---|---|
| BW601 | Rule has no `quote`. | error / warning | — |
| BW602 | Rule `origin` is not `owner`. | error / error | — |
| BW603 | Rule metadata comment does not parse. | error / error | — |


### BW7xx: safety

| Code | Rule | Severity (strict / migrate) | Fix |
|---|---|---|---|
| BW701 | Text matches a secret pattern (API key, token, private key). | error / error | — |

The user removes the secret and rotates it, since git history may still
hold it. See [[security-and-privacy|security and privacy]].

Codes removed with format 3, for readers of 0.1 output: BW113, BW116 (now
part of BW117), BW201 to BW207, BW301 to BW306, BW308, BW309, BW311, and
BW702. An ambiguous body link, formerly BW305, is BW310.
