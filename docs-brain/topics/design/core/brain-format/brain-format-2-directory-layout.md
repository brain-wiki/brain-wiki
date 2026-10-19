---
id: 01M3250V001YAA963DS6C8H5RP
type: design
title: "Directory layout"
aliases: ["Brain format §2"]
source: "docs/design/brain-format.md#2-directory-layout"
---
# Directory layout

A directory is a brain if and only if it contains `brain.toml` at its
root. The default layout follows. Every folder name is configurable in
`[layout]` (§3).

```text
<brain>/
├── brain.toml                  manifest (required)
├── AGENTS.md                   orientation for file-reading agents (generated block + user text)
├── rules.md                    standing directives, always loaded (budgeted)
├── log.md                      append-only human-readable change log
├── .gitattributes              written by `brain init`
├── topics/
│   └── <topic>/
│       ├── index.md            the topic page
│       ├── <note>.md           curated notes
│       └── <sub-topic>/        every folder inside a topic is a topic too, at any depth
│           └── index.md        optional; without it the topic has no content of its own
├── inbox/
│   ├── episodes/
│   │   └── YYYY/MM/<ulid>.md   immutable episodes, UTC year and month
│   ├── agents/
│   │   └── <agent>/…           free-form files from host-native memory features
│   └── proposals/
│       └── rule-<id>.md        rule proposals awaiting the user
├── archive/
│   ├── episodes/YYYY/MM/<ulid>.md   episodes already consolidated
│   ├── agents/<agent>/…        agent files already consolidated
│   └── rules.md                superseded rules
└── reports/                    generated health reports (safe to delete)
```

Rules:

- Paths inside a brain are relative, use `/`, and are compared
  case-sensitively. Lint warns when two paths differ only by case (BW110),
  because macOS and Windows usually treat them as the same file.
- Names starting with `.` (`.git/`, `.obsidian/`, `.trash/`) are ignored
  at any depth, as are paths matching a glob in `layout.ignore`.
- Only `*.md` files carry knowledge. Other files (images, PDFs) MAY exist,
  but they are not notes, so a wikilink or embed naming one does not
  resolve (BW310).
- `reports/` is generated output. It is never indexed as knowledge.
- Nothing in the brain depends on the index or on machine-local state. The
  brain is complete by itself.


### 2.1 Topics

A topic is the unit people browse and search filters by, and its topic
page summarizes it. Topics are folders, so every file browser shows them, and they
form a tree ([[d30-topic-tree|D30]]).

- Every folder under `topics/` that holds a note, directly or deeper, is a
  topic ([[d40-every-folder-is-a-topic|D40]]). A folder of
  attachments only, or with nothing in it, is not. There are no named
  levels: `people/` and `people/rin-sato/` are both topics.
- The topic page (`layout.topic_page`, §8) is optional. A topic without
  one has no content of its own: no description and no summary.
- A sub-topic's parent is the topic of the folder above it. A note belongs to the
  topic whose folder holds it. No frontmatter field declares membership.
- Notes MAY live outside any topic, for example in an imported vault
  (BW407, info).
- The inbox, archive, and reports folders are never topics, even when
  `layout.topics_dir` is `.`.
- Every topic has a slug, unique in the brain, and the slug is its
  identity. It is the folder name without a leading number, lowercased,
  with other characters turned into `-` (`01 People` becomes `people`).
  Folders are named shallowest first. A folder whose slug is taken gets
  its parent's slug as a prefix (`rin-sato-notes`), then a number.
- A topic declared in `brain.toml` (§3) names its `path`, or else the
  folder whose slug matches, wherever it sits.

Reorganizing is moving folders. `brain mv` moves a topic folder with its
notes and rewrites the links that named them by path, as one undoable run.
A move by hand works too, and `brain lint --fix` repairs path links from
the index's history. Because a topic is known by its slug, topic settings,
links by file name, and run records survive the move.

There is no state directory inside the brain. Machine state (the index,
run records) is rebuildable or device-specific. Which episodes are done is
encoded by location, in `inbox/episodes/` or `archive/episodes/`
([[d13-inbox-by-location|D13]]).
