# 09 · Import

Status: draft for review

## 1. Goals

| # | Goal |
|---|---|
| I1 | An existing Markdown folder or Obsidian vault becomes a working brain in minutes, without moving or rewriting files. |
| I2 | Nothing changes before the user has seen a report of what will change. |
| I3 | Every change to existing files is a run: undoable, logged, committed if git is on. Adopting a folder (phase 0) only adds files. |
| I4 | Normalization is opt-in and incremental. The brain works before any of it. |
| I5 | The user's own files can also be fed to consolidation as episodes, and agents' existing memory files can be brought in the same way. |

## 2. Modes

| Mode | Command | Result |
|---|---|---|
| **Overlay** | `brain import <folder> --overlay` | The folder itself becomes a brain. brain-wiki adds its own files; notes stay where they are. |
| **Into** | `brain import <folder> --into <brain>` | Files are copied into an existing brain as one or more topics; links are rewritten; the source folder is untouched. |
| **To episodes** | `brain import <path> --to-episodes` | Documents are split into episodes in the inbox, for consolidation to fold into notes. |
| **From an agent** | `brain import --from <host>` | The host's own memory files become episodes attributed to that host (§6). |

All modes default to `--dry-run`; `--apply` executes, and `--dry-run` wins
when both are given. Exactly one mode per command. A flag the chosen mode
does not use is a usage error (exit 2), never silently dropped: `--agent`
and `--untrusted` need `--to-episodes`, `--phase` needs `--overlay`, and
`--topic` does not apply to `--overlay` (top-level folders are the topics).
A source path that does not exist is `not_found` (exit 3) in every mode.

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
| Topics | Top-level folders containing notes | Each becomes a declared topic with `path` set to the folder and a slug derived from its name. Numbered prefixes (`01 Projects`) are kept in the path and dropped from the slug. Deeper folders that have a hub are sub-topics (02 §2) without being declared. |
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
| 0 · Adopt | Adds `brain.toml`, `AGENTS.md` (or a managed block in an existing one, with the topic table filled in from the folders found), `rules.md`, `log.md`, `inbox/`, `archive/`, `reports/`; registers the brain; in a git repository, commits every file it added (including `reports/import-plan.md`), so the tree is clean for phases 1–3. Not a run: it is undone by removing the brain and the added files, or by reverting its commit. | **No** |
| 1 · Relations | Converts relation-like frontmatter into `bw-<verb>` relations (§4.2) and keeps the original properties. | Yes, frontmatter lines only |
| 2 · Identity and status | Mints `id:` for notes without one; maps non-standard `status` values into `status` + `bw-stage` (§4.1). | Yes, frontmatter lines only |
| 3 · Structure | Creates missing hubs, adds missing notes to hub `## Notes` lists. | Hubs only |

Phase 0 alone gives a fully searchable brain: notes without ids are
indexed under `path:` ids, `migrate` lint keeps legacy issues at `info`,
and agents can start logging episodes immediately. Phases 1–3 are each a
separate `--apply --phase N` run, so the user can stop at any point and
review each diff on its own.

The diff a dry run shows is the diff the apply makes. Phase 2 ids are
therefore not random: each is a ULID whose time part is the brain id's
(the adoption time, as a freshly minted id would have) and whose random
part is a hash of the brain id, the note's path, and its text. A note
edited between the dry run and the apply gets a different id, as its diff
differs anyway.

### 3.3 Safety

- If the folder is a git repository with uncommitted changes, apply stops
  and asks the user to commit or stash first, so import diffs stay clean.
- If the folder is not a git repository, `brain undo` restores what
  phases 1–3 changed from the run's pre-images; there is no separate backup.
- Phase 0 refuses a name or folder that is already registered as another
  brain.
- Files that fail to parse are never modified.
- A conflict copy (BW112) is reported and left alone.

## 4. Normalization rules

### 4.1 Status

| Original value (case-insensitive) | `status` | `bw-stage` |
|---|---|---|
| `active`, `superseded`, `archived` | unchanged | — |
| `draft`, `wip`, `in progress`, `in-progress`, `todo`, `review`, `in review`, `published`, `done`, `complete`, `completed`, `approved`, `shipped`, `evergreen`, `seed`, `sprout` | `active` | the original value |
| `abandoned`, `paused`, `on hold`, `cancelled`, `canceled`, `inactive` | `archived` | the original value |
| `deprecated`, `obsolete`, `replaced`, `outdated` | `superseded` | the original value (lint then asks for a `superseded_by` relation) |
| anything else | `active` | the original value |

The original string is always preserved in `bw-stage`, so no information is
lost and users can map it back.

### 4.2 Relation-like properties

| Property (case-insensitive) | Field written |
|---|---|
| `parent`, `up`, `part_of`, `topic`, `moc` | `bw-part_of` |
| `children`, `down`, `has_part` | `bw-has_part` |
| `related`, `see_also`, `links` | `bw-related_to` |
| `depends_on`, `requires`, `prerequisite` | `bw-depends_on` |
| `supersedes`, `replaces` | `bw-supersedes` |
| `superseded_by`, `replaced_by` | `bw-superseded_by` |
| `next`, `prev`, `previous` | `bw-related_to` with qualifier `(next)` / `(previous)` |
| `source`, `sources` (when the value is a wikilink) | `bw-depends_on` with qualifier `(source)` |

Accepted value shapes: a YAML list of wikilinks, a quoted single wikilink,
and a string holding several wikilinks (`"[[A]], [[B]]"`, a common
artifact of tools that write lists as strings). Only `[[wikilinks]]` are
converted: bare names (`parent: Projects`) and other values
(`source: "a book"`) are left alone, because a plain string cannot be told
apart from a name.

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
4. Apply phases 1 and 2 (§3.2) to the copies (the source stays untouched),
   all in one run.
5. Then add hubs for the new topics and refresh the topic table in
   `AGENTS.md`, as separate lint-fix runs (the table can only be computed
   once the hubs exist). The output names every run, so undoing them all
   reverts the import.

## 6. To episodes, and from agents

`--to-episodes` turns documents into raw input for consolidation instead of
curated notes. It suits note dumps, exported chats, meeting transcripts, and
clippings.

- Frontmatter is metadata, not content: it is dropped, and only the body is
  split.
- Documents are split on headings into chunks of at most 8 KiB; each chunk
  becomes one episode with `bw-captured: import`, `bw-origin: import`, and a
  `bw-source` property naming the original file and heading.
- `inputs` is `local` for the user's own files, or `external` with `--untrusted`
  (clippings, documents written by others).
- The original files are not modified or moved.
- Each chunk carries a dedupe key (source and text), so a rerun skips what
  was already imported; the output counts episodes written and skipped.

`--from <host>` knows where hosts keep their own memory and imports those
files as episodes attributed to the host (`bw-origin: agent`, `bw-inputs:
unknown`):

| Host | Files (defaults; a `PATH` argument overrides them) |
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
| Folder already contains `brain.toml` | Overlay phase 0 (dry run or apply) refuses: if the folder is registered, it names the registration and points at phases 1–3; otherwise it suggests `brain brains add`. |
| `--from` names a host with no known locations and no `PATH` | Usage error listing the known hosts; a `PATH` imports from there under that host name. |
| A top-level folder name slugifies to an invalid or duplicate slug | The plan shows the clash and appends a numeric suffix; the user can edit `brain.toml` before phase 0. |
| Thousands of unresolved links | Reported in aggregate with the top offenders; phase 0 still proceeds (links are not modified). |
| Huge files (exports, logs) | Indexed by name only above the size cap; listed in the report. |

## 8. Alternatives considered

| Option | Why not |
|---|---|
| Restructure the vault into `topics/<slug>/` on import | Breaks the user's mental map, Obsidian shortcuts, and external links; huge git diffs. Overlay maps instead. |
| LLM-driven classification of every note during import | Slow, costly, non-deterministic; deterministic heuristics plus an editable plan are enough, and consolidation handles new material. |
| One big apply | Hard to review; phases keep each diff focused. |
