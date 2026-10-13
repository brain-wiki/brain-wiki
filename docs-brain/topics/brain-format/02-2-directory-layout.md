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
│       └── <subfolder>/…       optional further organization
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

**Why no state directory inside the brain.** Machine state (index, run
records) is either rebuildable or device-specific, and putting it in the
brain would make sync tools and git fight over it. The one piece of
consolidation state that must travel, "which episodes are done", is encoded
by location: pending episodes live in `inbox/episodes/`, consolidated ones
in `archive/episodes/`.
