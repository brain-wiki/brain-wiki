---
id: 01M3250V003BMETWYGAG302ZEJ
type: design
title: "Glossary"
aliases: ["01 §7"]
tags: [overview]
source: "docs/design/01-overview.md#7-glossary"
bw-part_of:
  - "[[overview]]"
---
# Glossary

| Term | Meaning |
|---|---|
| **brain** | A directory with a `brain.toml` manifest; the unit of storage, privacy, and selection. |
| **topic** | A folder of related notes with one **hub** page that summarizes it and links its notes. |
| **note** | A curated Markdown file: frontmatter (with claims and relations in `bw-` fields) and free prose. |
| **claim** | One item in a note's `bw-claims` list, with an id and provenance metadata. The unit consolidation operates on. |
| **relation** | A typed, directed link held in a note's `bw-<verb>` field, such as `bw-depends_on: "[[Other note]]"`. |
| **guard relation** | `conflicts_with` and `supersedes`/`superseded_by`. Retrieving either end always retrieves the other. |
| **episode** | An immutable inbox file holding raw observations from one agent session or one human entry. May point back to the conversation it came from. |
| **harvest** | Reading finished sessions from a host's own transcript store and turning them into episodes. |
| **rule** | A standing directive in `rules.md`, always loaded into orientation. Only added with the user's verbatim words. |
| **consolidation run** | One pass that turns pending episodes into validated operations on notes. Has an id, a record, and an undo point. |
| **op** | One structured edit proposed by an LLM: `add_claim`, `merge_claim`, `supersede_claim`, `add_relation`, `create_note`, `create_topic`, `skip_episode`. |
| **origin** | Who produced content: `owner` (the human), `agent`, `import`, or `system`. |
| **taint** | Whether untrusted external content (web, email, unknown tools) influenced an episode: `true`, `false`, or `unknown`. |
| **privacy level** | An ordered label on topics and notes (default: `default` < `sensitive` < `secret`). Each agent profile has a maximum level it may see. |
| **agent profile** | Per-brain settings for one host (e.g. `claude-code`): which privacy levels and topics it may read and what it may write. |
| **host** | An agent application that loads brain-wiki: Claude Code, Codex, Antigravity, OpenClaw, Cursor, or a generic MCP client. |
| **index** | The SQLite database derived from a brain; stored in the user cache directory, never inside the brain. |
| **orientation** | The short, budgeted context an agent receives at session start. |
