# 09 · Import

Status: draft for review

## 1. Goals

| # | Goal |
|---|---|
| I1 | An existing Markdown folder or Obsidian vault becomes a working brain in minutes, without moving or rewriting files. |
| I2 | Nothing changes before the user has seen a report of what will change. |
| I3 | Every change is a run: undoable, logged, committed if git is on. |
| I4 | Normalization is opt-in and incremental. The brain works before any of it. |
| I5 | The user's own files can also be fed to consolidation as episodes, and agents' existing memory files can be brought in the same way. |

## 2. Modes

| Mode | Command | Result |
|---|---|---|
| **Overlay** | `brain import <folder> --overlay` | The folder itself becomes a brain. brain-wiki adds its own files; notes stay where they are. |
| **Into** | `brain import <folder> --into <brain>` | Files are copied into an existing brain as one or more topics; links are rewritten; the source folder is untouched. |
| **To episodes** | `brain import <path> --to-episodes` | Documents are split into episodes in the inbox, for consolidation to fold into notes. |
| **From an agent** | `brain import --from <host>` | The host's own memory files become episodes attributed to that host (§6). |

All modes default to `--dry-run`; `--apply` executes.

## 3. Overlay

### 3.1 Pipeline

```
scan ─► detect conventions ─► plan ─► report ─► apply phase 0 ─► (optional) phases 1..3
```

**Scan** walks the folder (respecting ignore rules) and parses every `.md`
file without writing anything.

**Detect conventions:**

| Convention | Detection | Effect on the plan |
|---|---|---|
| Obsidian vault | `.obsidian/` present | Read `app.json` for link style (`useMarkdownLinks`), new-file location, attachment folder; read `types.json` for property types. |
| Topics | Top-level folders containing notes | Each becomes a declared topic with `path` set to the folder and a slug derived from its name. Numbered prefixes (`01 Projects`) are kept in the path and dropped from the slug. |
| Hub style | `index.md`, `_index.md`, `README.md`, or a folder note (`Folder/Folder.md`) inside topic folders | Sets `layout.hub_filename` (`{folder}.md` for folder notes). Topics without a hub get one only in phase 3. |
| Templates | A folder named like `Templates` or configured as the template folder | Ignored (template placeholders are not knowledge). |
| Attachments | The configured attachment folder, or folders of mostly non-Markdown files | Ignored for knowledge, still linkable. |
| Daily notes | Files named `YYYY-MM-DD.md` in one folder | Declared as a `journal` topic; optionally fed to consolidation with `--to-episodes` later. |
| Inbox folder | A top-level folder named like `Inbox` | Used as `layout.inbox_dir` only if empty of curated notes; otherwise left alone and the default inbox is created. |
| Existing relation properties | Frontmatter keys holding wikilinks (`related`, `parent`, `up`, `down`, `next`, `prev`, `see_also`, `source`) | Listed for phase 1 conversion. |

**Plan and report.** The report (`reports/import-plan.md` in the target,
plus terminal output) shows:

- the generated `brain.toml` (topics with paths, hub style, ignores,
  `lint.profile = "migrate"`);
- counts: notes, notes with and without frontmatter, ids present,
  non-standard `status` values, relation-like properties, unresolved and
  ambiguous links, conflict copies, files that fail to parse;
- every change each phase would make, with examples;
- what will not change.

### 3.2 Phases

| Phase | Changes | Touches existing notes? |
|---|---|---|
| 0 · Adopt | Adds `brain.toml`, `AGENTS.md` (or a managed block in an existing one), `rules.md`, `log.md`, `inbox/`, `archive/`, `reports/`; registers the brain. | **No** |
| 1 · Relations | Converts relation-like frontmatter into `## Relations` lines (§4.2), keeps the original properties unless `--drop-converted` is given. | Yes, appends a section |
| 2 · Identity and status | Mints `id:` for notes without one; maps non-standard `status` values into `status` + `stage` (§4.1). | Yes, frontmatter lines only |
| 3 · Structure | Creates missing hubs, adds missing notes to hub `## Notes` lists. | Hubs only |

Phase 0 alone gives a fully searchable brain: notes without ids are
indexed under `path:` ids, `migrate` lint keeps legacy issues at `info`,
and agents can start logging episodes immediately. Phases 1–3 are each a
separate `--apply --phase N` run, so the user can stop at any point and
review each diff on its own.

### 3.3 Safety

- If the folder is a git repository with uncommitted changes, apply stops
  and asks the user to commit or stash first, so import diffs stay clean.
- If the folder is not a git repository, apply writes a compressed backup
  of every file it will modify to the run's state directory before
  changing anything (in addition to the normal pre-images).
- Files that fail to parse are never modified.
- A conflict copy (BW112) is reported and left alone.

## 4. Normalization rules

### 4.1 Status

| Original value (case-insensitive) | `status` | `stage` |
|---|---|---|
| `active`, `superseded`, `archived` | unchanged | — |
| `draft`, `wip`, `in progress`, `in-progress`, `todo`, `review`, `in review`, `published`, `done`, `complete`, `completed`, `approved`, `shipped`, `evergreen`, `seed`, `sprout` | `active` | the original value |
| `abandoned`, `paused`, `on hold`, `cancelled`, `canceled`, `inactive` | `archived` | the original value |
| `deprecated`, `obsolete`, `replaced`, `outdated` | `superseded` | the original value (lint then asks for a `superseded_by` relation) |
| anything else | `active` | the original value |

The original string is always preserved in `stage`, so no information is
lost and users can map it back.

### 4.2 Relation-like properties

| Property (case-insensitive) | Relation written |
|---|---|
| `parent`, `up`, `part_of`, `topic`, `moc` | `part_of` |
| `children`, `down`, `has_part` | `has_part` |
| `related`, `see_also`, `links` | `related_to` |
| `depends_on`, `requires`, `prerequisite` | `depends_on` |
| `supersedes`, `replaces` | `supersedes` |
| `superseded_by`, `replaced_by` | `superseded_by` |
| `next`, `prev`, `previous` | `related_to (next)` / `related_to (previous)` |
| `source`, `sources` (when the value is a wikilink) | `depends_on (source)` |

Accepted value shapes: a YAML list of wikilinks, a quoted single wikilink,
a comma-joined string of several wikilinks (`"[[A]], [[B]]"`, a common
artifact of tools that write lists as strings), and bare names (resolved
like link targets). Values that are not links (`source: "a book"`) are
left alone.

### 4.3 Other fixes offered

- `tags` written as a string → list; leading `#` removed.
- `aliases` written as a string → list.
- Nested frontmatter mappings → reported only (BW102); flattening them
  would guess at meaning.

## 5. Into an existing brain

1. Map the source's top-level folders (or the whole source, with
   `--topic <slug>`) to topics in the target brain.
2. Copy files to `topics/<slug>/…`, preserving relative structure.
3. Rewrite links between copied files and links to attachments; links to
   notes outside the source become unresolved and are reported.
4. Apply the same normalization phases to the copies (the source stays
   untouched), as one run.

## 6. To episodes, and from agents

`--to-episodes` turns documents into raw input for consolidation instead of
curated notes. It suits note dumps, exported chats, meeting transcripts, and
clippings.

- Documents are split on headings into chunks of at most 8 KiB; each chunk
  becomes one episode with `captured: import`, `origin: import`, and a
  `source:` property naming the original file and heading.
- `taint` is `false` for the user's own files, or `true` with `--untrusted`
  (clippings, documents written by others).
- The original files are not modified or moved.

`--from <host>` knows where hosts keep their own memory and imports those
files as episodes attributed to the host (`origin: agent`, `taint:
unknown`):

| Host | Files (defaults; overridable with `--path`) |
|---|---|
| Claude Code | Project memory directories under `~/.claude/projects/*/memory/` and user-level `CLAUDE.md` |
| Codex | `~/.codex/memories/` and `~/.codex/AGENTS.md` |
| Antigravity | `~/.gemini/AGENTS.md`, `~/.gemini/GEMINI.md`, and global rule files |
| OpenClaw | The agent workspace's `MEMORY.md`, `USER.md`, and `memory/*.md` |

`--from` brings in a host's *memory files*. A host's *conversation
history* is read by `brain harvest` instead
([05 §2.2](05-write-path-and-consolidation.md#22-harvesting-sessions)),
which is also the way to backfill a new brain from past sessions.

Locations are taken from each host's documentation and will be verified by
the integration tests in [08](08-agent-integrations.md); hosts change
them, so the table lives in code with per-host overrides. Directive-like
content from these files is a natural candidate for rules, but promotion
still requires the user ([05 §6](05-write-path-and-consolidation.md#6-rules)).

## 7. Failure modes

| Failure | Behavior |
|---|---|
| Folder already contains `brain.toml` | Overlay refuses; suggests `brain brains add`. |
| A top-level folder name slugifies to an invalid or duplicate slug | The plan shows the clash and appends a numeric suffix; the user can edit `brain.toml` before phase 0. |
| Thousands of unresolved links | Reported in aggregate with the top offenders; phase 0 still proceeds (links are not modified). |
| Huge files (exports, logs) | Indexed by name only above the size cap; listed in the report. |

## 8. Alternatives considered

| Option | Why not |
|---|---|
| Restructure the vault into `topics/<slug>/` on import | Breaks the user's mental map, Obsidian shortcuts, and external links; huge git diffs. Overlay maps instead. |
| LLM-driven classification of every note during import | Slow, costly, non-deterministic; deterministic heuristics plus an editable plan are enough, and consolidation handles new material. |
| One big apply | Hard to review; phases keep each diff focused. |
