---
id: 01M3250V008B5BWBWMEB5E1EB2
type: design
title: "Pipeline"
aliases: ["Import §3.1"]
source: "docs/design/import.md#31-pipeline"
---
# Pipeline

```
scan ─► detect conventions ─► plan ─► report ─► apply phase 0 ─► (optional) phases 1..2
```

**Scan** walks the folder (respecting ignore rules) and parses every `.md`
file without writing anything.

**Detect conventions:**

| Convention | Detection | Effect on the plan |
|---|---|---|
| Obsidian vault | `.obsidian/` present | Read `app.json` for link style (`useMarkdownLinks`), new-file location, attachment folder; read `types.json` for property types. |
| Topics | Top-level folders containing notes | Each becomes a declared topic with `path` set to the folder and a slug derived from its name. Numbered prefixes (`01 Projects`) are kept in the path and dropped from the slug. Deeper folders that have a hub are sub-topics (brain format §2) without being declared. |
| Hub style | `index.md`, `_index.md`, `README.md`, or a folder note (`Folder/Folder.md`) inside topic folders | Sets `layout.hub_filename` (`{folder}.md` for folder notes). Topics without a hub get one only in phase 2. |
| Templates | A folder named like `Templates` or configured as the template folder | Ignored (template placeholders are not knowledge). |
| Attachments | The configured attachment folder, or folders of mostly non-Markdown files | Ignored for knowledge, still linkable. |
| Daily notes | Files named `YYYY-MM-DD.md` in one folder | Declared as a `journal` topic; optionally fed to consolidation with `--to-episodes` later. |
| Inbox folder | A top-level folder named like `Inbox` | Used as `layout.inbox_dir` only if empty of curated notes; otherwise left alone and the default inbox is created. |

Properties that hold links (`up`, `parent`, `related`, `next`) stay the
user's properties: preserved and filterable with `--where`, never converted
or reported (§4.2).

**Plan and report.** The report (`reports/import-plan.md` in the target,
plus terminal output) shows:

- the generated `brain.toml` (topics with paths, hub style, ignores,
  `lint.profile = "migrate"`);
- counts: notes, notes with and without frontmatter, ids present,
  non-standard `status` values, unresolved links (with the most common
  targets), conflict copies, files that fail to parse;
- every change each phase would make, with examples;
- what will not change.
