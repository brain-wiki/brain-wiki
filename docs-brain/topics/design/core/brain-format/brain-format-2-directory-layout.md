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
│       ├── index.md            hub page for the topic
│       ├── <note>.md           curated notes
│       ├── <subfolder>/…       further organization inside the topic
│       └── <sub-topic>/        a folder with its own hub is a topic too, at any depth
│           └── index.md
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

## Subsections
- [[brain-format-21-topics]]: Topics
