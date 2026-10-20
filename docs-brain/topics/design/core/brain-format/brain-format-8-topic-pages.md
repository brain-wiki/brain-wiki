---
id: 01M3250V0074KPHGBJ2GSH6SAQ
type: design
title: "Topic pages"
aliases: ["Brain format §8"]
source: "docs/design/brain-format.md#8-topic-pages"
---
# Topic pages

A topic page is the file named `layout.topic_page` at the root of a topic
folder. It is the topic's own page, a one-page entry point for a person or
an agent. Only that file is a topic page: a note's `type` never makes it
one ([[d38-topic-pages|D38]]).

```markdown
---
id: 01J9Z7M3…
type: topic
title: Search
---
# Search

How local search works in this project and why. Storage details are in
[[storage]].

## Notes
- [[Use SQLite FTS5 for local search]]: why FTS5 over alternatives
- [[SQLite version policy]]: minimum versions and fallbacks
```

- The default name is `_Index.md` (§2.2). The page MAY be named
  otherwise with `layout.topic_page`, for example `Index.md` in a vault
  that already uses it.
- `type` defaults to `topic` on a topic page. Like every `type`, it is
  open vocabulary, so a page written with `type: hub` keeps working.
- With `topic_page = "{folder}.md"`, the page of `topics/search/` is
  `topics/search/search.md`.
- Topic pages have no length limit. Detail belongs in notes in the
  topic's folder, and the page links them, one line each.
- A parent topic's page need not list its sub-topics, since the folders
  already form the topic tree (§2). A crowded topic splits into
  sub-topics.
- `## Notes` lists the topic's notes with a short gloss. It is navigation
  people read, not data. A note it does not list, and that no listed note
  reaches through body links, is BW405.
  `brain lint --fix --select BW405` appends the missing entries and never
  removes lines a person wrote.
- An optional `description` property on the page is the topic's one-line
  description when `brain.toml` does not declare one.


### 8.1 Topic rules

A topic folder, or the topics folder itself, MAY hold a topic rules file
(`layout.topic_rules`, `_Rules.md` by default): the user's instructions for
how that part of the brain is organized
([[d43-topic-rules|D43]]).

```markdown
# People

- One `type: person` note per person, named by their full name (`Rin Sato.md`).
- Start with who they are to the user, then facts as bullets.
- Give a person a folder only once they have several notes; their person
  note then becomes that folder's `_Index.md`.
```

- A rules file applies to the folder that holds it and to every folder
  below it. Where several apply, all of them hold, read outermost first,
  and a nearer file is more specific.
- The body is free Markdown. Frontmatter MAY be present and is ignored.
- A rules file is not a note. It has no id, is not indexed for search,
  does not make its folder a topic, is never listed in `## Notes`, and a
  wikilink to it does not resolve.
- Agents follow the rules that apply when they add, move, or split notes,
  and do not edit a rules file unless the user asks. brain-wiki delivers
  them where an agent decides where knowledge goes: `brain_read` of a
  topic page includes their text, reading a note names them,
  `brain_validate` names the ones for the files it checked, orientation
  says which topics have them, and `brain consolidate --prepare` includes
  them ([[index-and-search-7-read|index and search §7]]).
- Nothing checks a note against them, since brain-wiki does not read
  meaning from notes ([[d33-no-meaning-extraction|D33]]).
  Lint checks only their length against
  `budgets.topic_rules_max_lines` (BW411), because their text goes into
  agents' context.
- They differ from `rules.md` (§10): `rules.md` holds standing directives
  loaded in every session, each with the user's own words as its source,
  and changes only through the CLI. Topic rules are about organizing one
  part of the brain, are read only when an agent works there, and are a
  plain file the user edits or a template brings
  ([[config-and-storage-5-brain-lifecycle|config and storage §5.1]]).
