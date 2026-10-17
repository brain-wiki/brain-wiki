---
id: 01M3250V008B5BWBWMEB5E1EB2
type: design
title: "Pipeline"
aliases: ["Import §3.1"]
source: "docs/design/import.md#31-pipeline"
---
# Pipeline

```
scan ─► detect conventions ─► report ─► apply phase 0 ─► (optional) phases 1 and 2
```

The scan walks the folder and parses every `.md` file without writing
anything. It skips hidden folders, the folders it ignores (below), and the
contents of files over 2 MiB, which it lists as `oversized`.

Conventions it detects:

| Convention | Detected by | Effect |
|---|---|---|
| Obsidian vault | A `.obsidian/` folder | Reads `useMarkdownLinks` and `attachmentFolderPath` from `app.json`, and the template folder from `templates.json` |
| Topics | Top-level folders with notes | Each becomes a declared topic: `path` is the folder, the slug comes from its name |
| Hub style | `index.md`, `_index.md`, `README.md`, or a folder note (`Folder/Folder.md`) directly in top-level folders | The most common one becomes `layout.hub_filename` (`{folder}.md` for folder notes) |
| Templates | A top-level folder named `templates`, `_templates`, or `template`, or Obsidian's template folder | Ignored |
| Attachments | Obsidian's attachment folder, or a top-level folder named `attachments`, `assets`, `files`, `images`, `media`, or `_resources` | Ignored for knowledge, still linkable |
| Daily notes | A folder where at least 3 notes, and at least half its notes, are named `YYYY-MM-DD.md` | Declared as the `journal` topic |
| Inbox folder | A top-level folder named `inbox` or `_inbox` | Not declared as a topic; brain-wiki creates its own `inbox/` |

- Numbered prefixes (`01 Projects`, `90 Templates`) are ignored when
  matching names, kept in the path, and dropped from the slug.
- Two folders that give the same slug get `-2`, `-3`, and so on.
- Deeper folders are sub-topics without being declared
  ([[brain-format-2-directory-layout|brain format §2]]).
- Properties that hold links (`up`, `parent`, `related`, `next`) stay the
  user's properties (§4.2).

The report prints in the terminal on a dry run and is saved as
`reports/import-plan.md` by phase 0. It shows:

- note counts: notes, notes with frontmatter, notes with ids;
- whether the folder is an Obsidian vault, and the hub style;
- the topics and the folders they come from, and the ignored folders;
- non-standard `status` values with counts;
- unresolved links, with the five most common targets;
- conflict copies (left alone) and files that fail to parse (never
  modified);
- what each phase would do, and the `brain.toml` phase 0 would write.

`--json` gives the same survey as data, including the oversized files.

The generated `brain.toml` sets `layout.topics_dir = "."`, the hub style,
the ignored folders, `lint.profile = "migrate"`,
`[agents.default] write = ["edit"]`, and one `[topics.<slug>]`
table per topic.
