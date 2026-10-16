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
| **note** | A curated Markdown file: metadata in frontmatter; facts and links in the body, as ordinary Markdown. |
| **link** | A wikilink or Markdown link in a note's body, untyped: the sentence around it says why it is there. `bw-superseded_by` and `bw-sources` hold links in frontmatter. |
| **supersession guard** | The retrieval rule that a hit on a superseded note always comes with the note named in its `bw-superseded_by` (followed to the newest), and a hit on a newer note lists the notes it replaced. |
| **sources** | A note's `bw-sources` list: links to the episodes and notes, or URLs, its knowledge came from. |
| **episode** | An immutable inbox file holding raw observations from one agent session or one human entry. May point back to the conversation it came from. |
| **harvest** | Reading finished sessions from a host's own transcript store and turning them into episodes. |
| **rule** | A standing directive in `rules.md`, always loaded into orientation. Only added with the user's verbatim words. |
| **direct edit** | A change a person or an agent with `edit` makes to a note with their own tools. Checked with `brain validate`; recorded in git by `brain commit`. |
| **consolidation** | Optional: an agent folds pending episodes into notes by editing them directly. `brain consolidate --prepare` selects the work; `brain consolidate --done` archives the episodes. |
| **run** | A change brain-wiki itself makes (`brain mv`, `brain lint --fix`, `brain consolidate --done`, …). Has an id, a record, and an undo point. |
| **origin** | Who produced an episode: `owner` (the human), `agent`, `import`, or `system`. |
| **inputs** | Whether the writer had read content from outside the user's control (web, email, third-party tools) before writing an episode: `local`, `external`, or `unknown`. |
| **agent profile** | Per-brain settings for one host (e.g. `claude-code`): what it may write. Every host that may use a brain reads all of it; privacy inside a brain is being redesigned ([[proposal-privacy\|proposal]]). |
| **host** | An agent application that loads brain-wiki: Claude Code, Codex, Antigravity, OpenClaw, Cursor, or a generic MCP client. |
| **index** | The SQLite database derived from a brain; stored in the user cache directory, never inside the brain. |
| **orientation** | The short, budgeted briefing an agent fetches with `brain_orient` when a task may depend on the brain. |
