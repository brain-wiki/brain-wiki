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
│   ├── _Rules.md               optional topic rules for the whole tree (§8.1)
│   └── <topic>/
│       ├── _Index.md           the topic page (§8)
│       ├── _Rules.md           optional: how this folder is organized (§8.1)
│       ├── <note>.md           curated notes
│       └── <sub-topic>/        every folder inside a topic is a topic too, at any depth
│           └── _Index.md       optional; without it the topic has no content of its own
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
  attachments only, or with nothing in it, is not, and neither is one that
  holds only topic rules (§8.1). There are no named
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


### 2.2 brain-wiki files in a topic folder

A file in a topic folder whose name starts with `_` is one brain-wiki gives
a meaning to ([[d42-underscore-topic-files|D42]]). File
browsers and Obsidian sort these names before the notes.

| File | Setting | What it is |
|---|---|---|
| `_Index.md` | `layout.topic_page` | The topic page (§8): the topic's summary and its `## Notes` list |
| `_Rules.md` | `layout.topic_rules` | Topic rules (§8.1): how the user wants this folder and the folders below it organized |

- Other `_` names are ordinary notes. Later versions may give more names a
  meaning, so a brain SHOULD NOT use `_Name.md` notes for its own purposes.
- A brain that does not set `layout.topic_page` also finds `index.md`, the
  default before `_Index.md`, in any case (`Index.md` too), as the page of
  a folder without `_Index.md`. Lint reports such a page (BW410), and
  `brain lint --fix` renames it and rewrites the links that named it by
  path. A brain that sets `topic_page`, as an imported vault does, finds
  only that name; removing the setting moves its pages the same way.

There is no state directory inside the brain. Machine state (the index,
run records) is rebuildable or device-specific. Which episodes are done is
encoded by location, in `inbox/episodes/` or `archive/episodes/`
([[d13-inbox-by-location|D13]]).
