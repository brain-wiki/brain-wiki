---
id: 01M3250V00J09N2837T5FHB4KV
type: design
title: "Brain lifecycle"
aliases: ["Config and storage §5"]
source: "docs/design/config-and-storage.md#5-brain-lifecycle"
---
# Brain lifecycle

| Action | Command |
|---|---|
| Create | `brain init [PATH] [--name NAME] [--template NAME\|PATH] [--git] [--no-register]` |
| List templates | `brain templates` |
| Adopt an existing folder | `brain import <path> --overlay` ([[import\|import]]) |
| Register on another device | `brain brains add NAME PATH` |
| Move | Move the folder, then `brain brains add NAME NEW_PATH` |
| Rename | `brain brains rename OLD NEW` |
| Forget | `brain brains remove NAME [--purge-state]` |
| Commit direct edits | `brain commit`, or a job from `brain schedule add commit` (§6.2) |
| Check | `brain doctor` |

- `brain init` creates the folder; `brain.toml` with a new id; `AGENTS.md`,
  `rules.md`, `log.md`, and `.gitattributes`; and the `topics/`, `inbox/`,
  `archive/`, and `reports/` folders. It registers the brain (refusing a
  name or folder already registered to another brain) and makes it the
  default if it is the first. With `--template`, the brain starts with a
  topic tree (§5.1). With `--git`, it runs `git init` and commits the new
  files, so a clone is a working brain.
- `brain brains add` validates `brain.toml`. It is for a brain that arrived
  by git clone or file sync, or one that moved. A name may be re-pointed to
  a new folder only when its old folder is no longer a brain or holds the
  same brain. Otherwise the name is refused. The same id means index and
  history carry over.
- `brain brains rename` changes only the config. `brain.toml`'s `name` is
  cosmetic. It is refused when NEW is already registered. Otherwise the
  entry and every reference to OLD (`default`, `[hosts.*] brain` and
  `brains`, harvest routes) change in one write, and the brain's commit job
  (found by id) is rewritten to the new name.
- `brain brains remove` changes only the config: the entry and every
  reference to it (§2). It removes the brain's commit job. `--purge-state`
  also deletes the brain's index and run history on this device. brain-wiki
  never deletes a brain folder.
- `brain doctor` checks the config (including a missing default and
  entries that name unregistered brains), each brain (format, note and
  pending-episode counts, open proposals), SQLite FTS5 and trigram support,
  host wiring, and commit jobs
  ([[write-path-5-committing-direct-edits|write path §5.2]]). It rolls back runs a
  crash left half-applied and lists runs whose git commit failed.


### 5.1 Templates

A template is the topic tree a new brain starts with: folders, each with a
topic page and topic rules
([[brain-format-8-topic-pages|brain format §8.1]]), and no notes
([[d44-brain-templates|D44]]). The first agent session files
knowledge where the template says it belongs instead of inventing a
structure.

```text
<template>/
├── template.toml           description = "…" (optional; shown by `brain templates`)
└── topics/
    ├── _Rules.md           how the top-level folders are used
    └── People/
        ├── _Index.md       the topic page, without an id
        └── _Rules.md       how People is organized
```

`brain init --template` takes:

| Value | Source |
|---|---|
| A built-in name | A template shipped in the package (`src/brainwiki/assets/templates/`). `brain templates` lists them with their top-level topics. |
| A folder with `topics/` | A template laid out as above |
| A brain | The brain's topic tree, found with its own `[layout]`, without its inbox, archive, reports, or ignored folders |

Rules:

- Only topic pages and topic rules are copied, never notes, so no
  knowledge comes along. A copied page gets a new `id`, loses `created`
  and `updated`, and its `## Notes` list is emptied, since the notes it
  listed stay behind. Other links in a page are kept, and lint reports
  those that no longer resolve.
- Pages and rules take the new brain's names: a template made from a brain
  with `topic_page = "{folder}.md"`, or with legacy `index.md` pages,
  yields `_Index.md` pages.
- `brain init` refuses, before writing anything, when a template file
  would overwrite a file already in the target folder.
- The AGENTS.md topic table is generated after the copy, and `--git`
  commits the copied files with the scaffold.
- Built-in templates hold only Markdown and `template.toml`. A template's
  conventions are topic rules, never `rules.md`: a rule carries the user's
  own words as its source, which a template does not have.

The built-in templates:

| Name | Top-level topics |
|---|---|
| `personal` | Preferences, People, Projects, Reference |
| `engineering` | Preferences, Projects, Systems, Playbooks, People |
