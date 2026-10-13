---
id: 01M3250V00WEYSBGH5MQB4CBNX
type: design
title: "Directory layout"
aliases: ["02 §2"]
tags: [brain-format]
source: "docs/design/02-brain-format.md#2-directory-layout"
bw-part_of:
  - "[[brain-format]]"
---
# Directory layout

A directory is a brain if and only if it contains `brain.toml` at its root.
Default layout (every path is configurable in `[layout]`, see §3):

```text
<brain>/
├── brain.toml                  manifest (required)
├── AGENTS.md                   orientation for file-reading agents (generated block + user text)
├── rules.md                    standing directives, always loaded (budgeted)
├── log.md                      append-only human-readable change log
├── topics/
│   └── <topic>/
│       ├── index.md            hub page for the topic (budgeted)
│       ├── <note>.md           curated notes
│       ├── <subfolder>/…       further organization inside the topic
│       └── <sub-topic>/        a folder with its own hub is a topic too, at any depth
│           └── index.md
├── inbox/
│   ├── episodes/
│   │   └── YYYY/MM/<ulid>.md   immutable episodes, UTC year and month
│   └── agents/
│       └── <agent>/…           free-form files from host-native memory features
├── archive/
│   ├── episodes/YYYY/MM/<ulid>.md   episodes already consolidated
│   └── rules.md                superseded rules
└── reports/                    generated health reports (safe to delete)
```

Rules:

- Paths inside a brain are relative, use `/`, and are compared
  case-sensitively. Lint warns when two paths differ only by case, because
  macOS and Windows file systems usually treat them as the same file.
- Files and directories whose name starts with `.` are ignored (this covers
  `.git/`, `.obsidian/`, `.trash/`), as are paths matching `layout.ignore`.
- Only `*.md` files carry knowledge. Other files (images, PDFs) MAY exist
  and MAY be linked; they are indexed as attachments by name only.
- `reports/` is generated output. It is never indexed as knowledge.
- Nothing in the brain depends on the index or on machine-local state. The
  brain is complete by itself.

**Why topics are folders.** A topic is the unit people browse, the unit of
privacy defaults, and the unit a hub summarizes. A folder makes that
visible in every file browser and in Obsidian without extra tooling. Notes
MAY also live outside any topic (for example in an imported vault); they
belong to no topic and lint can warn about it.

**Topics form a tree.**

- A topic is a folder directly under `topics/`, or a folder at any depth
  below it that has a hub (`layout.hub_filename`, §8). There are no named
  levels: `people/` and `people/rin-sato/` are both topics.
- A folder without a hub inside a topic is plain organization; its notes
  belong to the enclosing topic.
- A topic's **parent** is the nearest enclosing topic. A sub-topic's hub is
  `part_of` its parent's hub without anyone writing it (an implicit
  relation, §6.4); an explicit `bw-part_of` adds further parents.
- Every topic has a **slug**, unique in the brain: its folder name,
  slugified (`03 People` → `people`). When two folders would get the same
  slug, the deeper one takes its parent's slug as a prefix (`rin-sato-notes`).
  Declaring a topic in `brain.toml` (§3) can name it. The slug, not the
  path, is the topic's identity.
- **Access inherits down the tree.** A topic's privacy level is the
  strictest of its own declared level and its ancestors'; a note may raise
  it further (§6.1). An agent allowed a topic (`topics = ["people"]`) may
  read its sub-topics.
- **Reorganizing is moving folders.** `brain mv` moves a topic folder with
  its notes and rewrites the links that named them by path, as one undoable
  run; a move by hand works too, and `brain lint --fix` repairs path links
  from the index's history. Because a topic is known by its slug, agent
  allowlists, links by file name, and run records survive the move.

Why a tree rather than flat topics: a brain grows many small topics (a
person, a project, a ticker) that fall into a few natural groups. Flat, they
made the briefing's topic list long, scattered the folder view, and left the
map to guess the groups. Folders already say how a person groups them, in
every editor.

**Why no state directory inside the brain.** Machine state (index, run
records) is either rebuildable or device-specific, and putting it in the
brain would make sync tools and git fight over it. The one piece of
consolidation state that must travel, "which episodes are done", is encoded
by location: pending episodes live in `inbox/episodes/`, consolidated ones
in `archive/episodes/`.
