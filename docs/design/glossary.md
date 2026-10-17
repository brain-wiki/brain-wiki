# Glossary

| Term | Meaning |
|---|---|
| brain | A directory with a `brain.toml` manifest. Hosts are allowed or limited to whole brains, and a brain is chosen by name for each call, project, or host. |
| topic | A folder under `topics/` with a hub page that summarizes it and links its notes. A folder with a hub inside a topic is a sub-topic. |
| hub | A topic's summary page, `index.md` in the topic folder by default. |
| note | A Markdown file in a topic. Frontmatter holds metadata, and facts and links are ordinary Markdown in the body. |
| link | A wikilink or Markdown link to another note. Links are untyped, and the sentence around a link says why it is there. In frontmatter, only `bw-superseded_by` and `bw-sources` hold links. |
| supersession guard | The retrieval rule that a hit on a superseded note comes with the note named in its `bw-superseded_by`, followed to the newest, and a hit on a newer note lists the notes it replaced. |
| sources | A note's `bw-sources` list: links to the episodes and notes, or URLs, that its content came from. |
| episode | A file of raw observations in `inbox/episodes/`, written by an agent, a person, an import, or harvest. Its text never changes, and consolidation moves it to `archive/episodes/`. It may record the session and turns it came from. |
| harvest | Reading finished sessions from a host's own transcript store and turning them into episodes. |
| rule | A standing directive in `rules.md`, shown at the top of every orientation. A rule is added only from the user's own words. |
| direct edit | A change that a person, or an agent whose profile has `edit`, makes to a note with their own tools. `brain validate` checks it and `brain commit` records it in git. |
| consolidation | An optional step in which an agent folds pending episodes into notes by editing the notes directly. `brain consolidate --prepare` gathers the work, and `brain consolidate --done` archives the episodes. |
| run | A change brain-wiki itself makes, such as `brain mv`, `brain lint --fix`, `brain import`, a new rule, or `brain consolidate --done`. Each run has an id, a record, and an undo point for `brain undo`. |
| origin | Who produced an episode: `agent`, `system` (brain-wiki's own setup check), or for episodes written by earlier versions `owner` (the user) or `import`. |
| inputs | Whether the writer had read content from outside the user's control, such as web pages, email, or third-party tools, before writing an episode: `local`, `external`, or `unknown`. |
| agent profile | Per-brain settings for one host, such as `claude-code`, in `brain.toml`. Its capabilities say what the host may do beyond capturing episodes (`edit`, `propose_rules`, `harvest`), and `read_origin` lets it read the conversation behind an episode. Every host that may use a brain reads all of it. |
| host | An agent application that uses brain-wiki: Claude Code, Codex, Antigravity, OpenClaw, Cursor, or another MCP client. |
| index | The SQLite database built from a brain, stored in the user cache directory and never inside the brain. `brain index --rebuild` recreates it. |
| orientation | The short briefing an agent gets from `brain_orient`: rules, what the brain holds, topics, the inbox, recent changes, and how to query, within a fixed size budget. |
