---
id: 01M3250V003BMETWYGAG302ZEJ
type: design
title: "Glossary"
aliases: ["01 §7"]
tags: [overview]
source: "docs/design/01-overview.md#7-glossary"
---
# Glossary

| Term | Meaning |
|---|---|
| **brain** | A directory with a `brain.toml` manifest; the unit of storage, access, and selection. |
| **topic** | A folder of related notes with one **hub** page that summarizes it and links its notes. Topics nest: a folder with a hub inside a topic is a sub-topic. |
| **note** | A curated Markdown file: frontmatter (with claims and relations in `bw-` fields) and free prose. |
| **claim** | One item in a note's `bw-claims` list, with an id and provenance metadata. The unit consolidation operates on. |
| **relation** | A typed, directed link held in a note's `bw-<verb>` field, such as `bw-depends_on: "[[Other note]]"`. |
| **guard relation** | `conflicts_with` and `supersedes`/`superseded_by`. Retrieving either end always retrieves the other. |
| **episode** | An immutable inbox file holding raw observations from one agent session or one human entry. May point back to the conversation it came from. |
| **harvest** | Reading finished sessions from a host's own transcript store and turning them into episodes. |
| **rule** | A standing directive in `rules.md`, always loaded into orientation. Only added with the user's verbatim words. |
| **consolidation run** | One pass that turns pending episodes into validated operations on notes. Has an id, a record, and an undo point. |
| **op** | One structured edit proposed by an LLM: `add_claim`, `merge_claim`, `supersede_claim`, `retract_claim`, `add_relation`, `create_note`, `create_topic`, `skip_episode`. |
| **origin** | Who produced content: `owner` (the human), `agent`, `import`, or `system`. |
| **inputs** | Whether the writer had read content from outside the user's control (web, email, third-party tools) before writing an episode or claim: `local`, `external`, or `unknown`. |
| **agent profile** | Per-brain settings for one host (e.g. `claude-code`): what it may write. Every host that may use a brain reads all of it; privacy inside a brain is being redesigned ([[proposal-privacy\|proposal]]). |
| **host** | An agent application that loads brain-wiki: Claude Code, Codex, Antigravity, OpenClaw, Cursor, or a generic MCP client. |
| **index** | The SQLite database derived from a brain; stored in the user cache directory, never inside the brain. |
| **orientation** | The short, budgeted briefing an agent fetches with `brain_orient` when a task may depend on the brain. |
