# Import

How existing Markdown becomes part of a brain: a folder adopted in place,
notes copied into a brain, documents turned into episodes, and agents' own
memory files brought in.

## 1. Goals

| # | Goal |
|---|---|
| I1 | An existing Markdown folder or Obsidian vault becomes a working brain in minutes, without moving or rewriting files. |
| I2 | Nothing changes before the user has seen what will change. |
| I3 | Every change to existing files is a run: undoable, logged, and committed when git is on. Adopting a folder (phase 0) only adds files. |
| I4 | Normalization is optional and step by step. The brain works before any of it. |
| I5 | The user's own files, and agents' memory files, can be fed to consolidation as episodes. |

## 2. Modes

| Mode | Command | Result |
|---|---|---|
| Overlay | `brain import <folder> --overlay` | The folder becomes a brain; notes stay where they are |
| Into | `brain import <folder> --into <brain>` | Notes are copied into an existing brain as topics |
| To episodes | `brain import <path> --to-episodes` | Documents become episodes in the inbox |
| From an agent | `brain import [PATH] --from <host>` | The host's memory files become episodes (§6) |

Rules shared by every mode:

- A command picks exactly one mode.
- Every mode is a dry run unless `--apply` is given. `--dry-run` wins when
  both are given.
- A flag the chosen mode does not use is a usage error (exit 2), never
  dropped: `--agent` and `--untrusted` need `--to-episodes`, `--phase`
  needs `--overlay`, and `--topic` does not work with `--overlay`, whose
  top-level folders become the topics.
- `--overlay` and `--into` need a folder. A source path that does not
  exist is `not_found` (exit 3).
- `--to-episodes` and `--from` write into the brain chosen by the global
  `--brain`.
  For phase 0, `--brain NAME` sets the new brain's name; the default is
  the folder name.

## 3. Overlay

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
  ([brain format §2](brain-format.md#2-directory-layout)).
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
`[agents.default] write = ["episodes", "edit"]`, and one `[topics.<slug>]`
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

## 4. Normalization rules

### 4.1 Status

| Original value (case-insensitive) | `status` | `bw-stage` |
|---|---|---|
| `active`, `superseded`, `archived` | the value, lowercased | — |
| `abandoned`, `paused`, `on hold`, `cancelled`, `canceled`, `inactive` | `archived` | the original value |
| `deprecated`, `obsolete`, `replaced`, `outdated` | `superseded` | the original value |
| anything else (`draft`, `wip`, `done`, `evergreen`, …) | `active` | the original value |

The original string is kept in `bw-stage`, so no information is lost and
users can map it back. An existing `bw-stage` is not overwritten. A note
mapped to `superseded` still needs `bw-superseded_by` to name its
replacement.

### 4.2 Link properties

Properties that hold wikilinks (`up`, `parent`, `related`, `see_also`,
`next`, `source`) are left as they are. Format 3 has no typed relations to
convert them into ([D33](../decision/d33-no-meaning-extraction.md)), and
brain-wiki indexes links from the body only, so these properties do not
appear in backlinks or neighbors. They can still be filtered with
`--where`. A user who wants them in the link graph can move them into the
body.

### 4.3 Other fixes

- `tags` written as a string becomes a list, split on commas, with
  leading `#` removed (phase 1).
- `aliases` written as a string becomes a list, split on commas
  (phase 1).
- Nested frontmatter mappings are only reported (BW102). Flattening them
  would guess at meaning.

## 5. Into an existing brain

`--into <brain>` copies the source's notes into a brain as one run. The
source stays untouched.

1. Map each note to a topic folder: `topics/<slug of its top-level
   folder>/…`, keeping the rest of its path. Notes at the source's top
   level go to the slug of the source folder's name. With `--topic <slug>`,
   every note goes under `topics/<slug>/`.
2. Rewrite links between copied notes: Markdown links get the new relative
   path, and wikilinks written as paths get the new path. Wikilinks by file
   name are left alone, since they still resolve. Markdown links to `.md`
   files outside the source are counted and reported.
3. Apply the phase 1 rules (§3.2) to the copies.
4. Commit the run through the lint gate.
5. Then add hubs for the new topics, and refresh the topic table in
   `AGENTS.md`, as separate runs (the table can only be computed once the
   hubs exist). The output names every run, so undoing them all reverts
   the import.

Only Markdown notes are copied. Attachments stay in the source, and links
to them are left as written.

## 6. To episodes, and from agents

`--to-episodes` turns documents into raw input for consolidation instead
of curated notes. It suits note dumps, exported chats, meeting
transcripts, and clippings. A folder imports every `.md` file under it.

- Frontmatter is metadata, not content. It is dropped, and only the body
  is split.
- Documents are split on headings into chunks of at most 8 KiB. Each chunk
  becomes one episode with `bw-captured: import`, `bw-origin: import`, and
  `bw-source` naming the file and heading.
- `bw-inputs` is `local` for the user's own files, or `external` with
  `--untrusted` (clippings, documents written by others).
- `--agent HOST` records the episodes as written by that host. `--topic`
  adds a topic hint.
- The original files are not modified or moved.
- Each chunk carries a dedupe key from its source and text, so a rerun
  skips what was already imported. The output counts episodes written and
  skipped, and names files it could not read; any unreadable file makes
  the exit code 1.

`--from <host>` imports the host's own memory files the same way, as
episodes attributed to the host (`bw-origin: agent`, `bw-inputs: unknown`):

| Host | Files (a `PATH` argument replaces them) |
|---|---|
| Claude Code | `projects/*/memory/*.md` and `CLAUDE.md` under `CLAUDE_CONFIG_DIR` (default `~/.claude`) |
| Codex | `memories/**/*.md` and `AGENTS.md` under `CODEX_HOME` (default `~/.codex`) |
| Antigravity | `~/.gemini/AGENTS.md`, `~/.gemini/GEMINI.md`, and `~/.gemini/config/rules/*.md` |
| OpenClaw | `MEMORY.md`, `USER.md`, and `memory/*.md` in `~/.openclaw/workspace/` |

`--from` brings in a host's memory files. A host's conversation history is
read by `brain harvest` instead
([write path §2.2](write-path.md#22-harvesting-sessions)), which is also
the way to backfill a new brain from past sessions.

The locations come from each host's documentation and change between host
versions, so they live in code (`importer/_episodes.py`). Instructions in
these files are natural candidates for rules, but only the user can add a
rule ([write path §6](write-path.md#6-rules)).

## 7. Failure modes

| Failure | Behavior |
|---|---|
| The folder already has `brain.toml` | Phase 0 (dry run or apply) refuses with `conflict`; it names the registration and points to phases 1 and 2, or suggests `brain brains add` |
| `--from` names a host with no known locations and no `PATH` | Usage error listing the known hosts; with a `PATH`, the files are imported under that host name |
| Two folders give the same slug | The second gets a numeric suffix; the report shows the mapping, and `brain.toml` can be edited after phase 0 |
| Thousands of unresolved links | Reported as a total with the top targets; phase 0 still proceeds, since links are not changed |
| Huge files (exports, logs) | Not parsed by the scan above 2 MiB; listed as `oversized` in `--json` |

## 8. Alternatives considered

- Restructuring the vault into `topics/<slug>/` on import was rejected. It
  breaks the user's mental map, Obsidian shortcuts, and outside links, and
  makes huge git diffs. Overlay maps folders instead.
- Classifying every note with a model during import was rejected as slow,
  costly, and not repeatable. Deterministic rules and an editable plan are
  enough, and consolidation handles new material.
- One big apply was rejected as hard to review. Phases keep each diff
  focused.
