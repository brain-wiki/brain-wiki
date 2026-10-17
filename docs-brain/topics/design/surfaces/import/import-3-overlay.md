---
id: 01M3250V00XYGE5XCR50AZ4CTM
type: design
title: "Overlay"
aliases: ["Import §3"]
source: "docs/design/import.md#3-overlay"
---
# Overlay

### 3.1 Pipeline

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


### 3.2 Phases

| Phase | Changes | Touches existing notes? |
|---|---|---|
| 0, adopt | Adds `brain.toml`, `AGENTS.md`, `rules.md`, `log.md`, `inbox/`, `archive/`, `reports/`; registers the brain; commits in git | No |
| 1, ids and status | Mints missing `id:`; maps non-standard `status` (§4.1); turns string `tags` and `aliases` into lists (§4.3) | Frontmatter lines only |
| 2, hubs | Creates missing hubs; adds missing notes to hub `## Notes` lists | Hubs only |

Phase 0:

- Writes `AGENTS.md`, or a managed block in an existing one, with the
  topic table filled in from the folders found.
- Does not overwrite an existing `rules.md` or `log.md`.
- In a git repository, commits every file it added, including
  `reports/import-plan.md`, so the tree is clean for phases 1 and 2.
- Is not a run. To undo it, remove the brain (`brain brains remove`) and
  the files it added, or revert its commit.

Phase 0 alone gives a searchable brain: notes without ids are indexed
under `path:` ids, `migrate` lint keeps legacy issues at `info`, and agents
can log episodes at once. Phases 1 and 2 are each a separate
`--phase N --apply` run, so the user can stop at any point and review each
diff on its own.

The diff a dry run shows is the diff the apply makes. Phase 1 ids are
therefore not random. Each is a ULID whose time part is the brain id's
(the adoption time) and whose random part is a hash of the brain id, the
note's path, and its text. A note edited between the dry run and the apply
gets a different id, since its diff differs anyway. Phase 1 skips notes
whose frontmatter fails to parse.


### 3.3 Safety

- If the folder is a git repository with uncommitted changes, phase 0 and
  the apply of phases 1 and 2 stop and ask the user to commit or stash
  first, so import diffs stay clean.
- Without git, `brain undo` restores what phases 1 and 2 changed from the
  run's saved copies. There is no separate backup.
- Phase 0 refuses a name or folder already registered to another brain.
- Files that fail to parse are never modified.
- Conflict copies (Syncthing `.sync-conflict-`, "conflicted copy", or a
  ` (N).md` suffix) are reported and left alone; lint reports them as
  BW112.
