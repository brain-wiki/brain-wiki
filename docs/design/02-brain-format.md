# 02 · Brain format

Status: draft for review · Format version: 3 · Normative

This document defines what a brain looks like on disk. It is the contract
between brain-wiki, every agent host, and the user's other tools. The key
words MUST, MUST NOT, SHOULD, and MAY are used as in RFC 2119.

## 1. Requirements that shaped the format

| Requirement | Consequence |
|---|---|
| Readable and editable by people in any editor, and by Obsidian | Markdown files, YAML frontmatter, `[[wikilinks]]`, no binary state in the brain |
| Writable by LLMs without corrupting structure | Frontmatter holds flat metadata only; what a note knows is ordinary Markdown in the body, so a careless edit breaks a sentence, not the note |
| Parseable with simple, fast code | brain-wiki reads frontmatter, headings, and links; it never extracts meaning from the body |
| Survives renames and moves | Permanent ULID ids; link repair by id |
| Safe under concurrent agents and devices | Inbox files are append-only and uniquely named; agents edit notes directly and check them with `brain validate`; git keeps the history ([05](05-write-path-and-consolidation.md)) |
| Diff- and merge-friendly in git | Stable ordering, one item per line, no reflowing of untouched lines |

Format 3 replaced format 2's claims and typed relations, which lived in
frontmatter lists, with plain body content: Obsidian renders no Markdown in
properties, so facts and links held there were hard to read and edit. §13
describes the older formats and their conversion.

## 2. Directory layout

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
│       ├── index.md            hub page for the topic
│       ├── <note>.md           curated notes
│       ├── <subfolder>/…       further organization inside the topic
│       └── <sub-topic>/        a folder with its own hub is a topic too, at any depth
│           └── index.md
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

**Why topics are folders.** A topic is the unit people browse, the unit
search filters by, and the unit a hub summarizes. A folder makes that
visible in every file browser and in Obsidian without extra tooling. Notes
MAY also live outside any topic (for example in an imported vault); they
belong to no topic and lint can warn about it.

**Topics form a tree.**

- A topic is a folder directly under `topics/`, or a folder at any depth
  below it that has a hub (`layout.hub_filename`, §8). There are no named
  levels: `people/` and `people/rin-sato/` are both topics.
- A folder without a hub inside a topic is plain organization; its notes
  belong to the enclosing topic.
- A topic's **parent** is the nearest enclosing topic. Membership is the
  folder: a note belongs to the topic whose folder holds it, and a
  sub-topic belongs to its parent the same way. No frontmatter field
  declares membership.
- Every topic has a **slug**, unique in the brain: its folder name,
  slugified (`01 People` → `people`). When two folders would get the same
  slug, the deeper one takes its parent's slug as a prefix (`rin-sato-notes`).
  Declaring a topic in `brain.toml` (§3) can name it. The slug, not the
  path, is the topic's identity.
- **Reorganizing is moving folders.** `brain mv` moves a topic folder with
  its notes and rewrites the links that named them by path, as one undoable
  run; a move by hand works too, and `brain lint --fix` repairs path links
  from the index's history. Because a topic is known by its slug, topic
  settings, links by file name, and run records survive the move.

Why a tree rather than flat topics: a brain grows many small topics (a
person, a project, a ticker) that fall into a few natural groups. Flat, they
made the briefing's topic list long, scattered the folder view, and left the
map to guess the groups. Folders already say how a person groups them, in
every editor.

**Why no state directory inside the brain.** Machine state (index, run
records) is either rebuildable or device-specific, and putting it in the
brain would make sync tools and git fight over it. The one piece of
consolidation state that must travel, "which episodes are done", is encoded
by location: pending episodes live in `inbox/episodes/`, consolidated ones
in `archive/episodes/`.

## 3. `brain.toml`

The manifest identifies the brain and holds settings that must travel with
it. Settings that belong to a user or a machine (where brains are, which
brain is the default) live in the user config ([03](03-config-and-storage.md)).

```toml
format = 3                                  # format version (required, §13)
id = "01J9Z7M0W4K8P2R6T9V3X5Z7A1"           # brain id, a ULID (required, never changes)
name = "personal"                           # display name (optional)
description = "Personal notes and projects" # one line shown by brain_list (optional)

[layout]                                    # all optional; defaults shown
topics_dir   = "topics"
inbox_dir    = "inbox"
archive_dir  = "archive"
reports_dir  = "reports"
hub_filename = "index.md"                   # or "{folder}.md" for folder-note style
ignore       = []                           # extra glob patterns, relative to the brain root

[budgets]                                   # hard limits enforced by lint and writers
rules_max_lines     = 100
rules_max_chars     = 4000
agents_md_max_lines = 150
orient_max_tokens   = 1500

[lint]
profile = "strict"                          # strict | migrate (see 06)
stale_inbox_days = 14
# [lint.overrides] maps path globs to a profile or "off", e.g. "Archive/**" = "migrate"

[search]                                    # ranking and guard settings (see 04)
freshness_ms       = 1000
max_guards_per_hit = 10
status_factor      = { active = 1.0, superseded = 0.35, archived = 0.2 }
kind_factor        = { hub = 1.15, note = 1.0, episode = 0.7, archived_episode = 0.5 }
recency_half_life_days = 180

[consolidate]
max_episodes_per_run = 50                   # episodes one `brain consolidate --prepare` returns (see 05)

[reports]
after_consolidate = true
commit = false                              # include reports/ in brain-wiki's git commits

[git]
mode = "auto"                               # auto | off ; auto = commit when the brain is a git work tree

[topics.search]                             # one table per declared topic (optional)
path        = "topics/search"               # default: the folder with this slug, at any depth
title       = "Search"
description = "How local search works and why."

[agents.default]                            # profile for unknown hosts
write       = ["episodes", "edit"]

[agents.claude-code]                        # profile for one host id
write       = ["episodes", "edit", "propose_rules", "harvest"]
```

Rules:

- `format` and `id` are REQUIRED. Unknown keys MUST be preserved by tools
  that rewrite the file and SHOULD produce a lint warning.
- Inline tables (`status_factor = { … }`) are TOML, not frontmatter; the
  flat-values rule in §4 applies to note frontmatter only.
- A topic that exists on disk but is not declared still works: its slug is
  its folder name and its title is taken from the hub. Declaring a topic
  lets the user set a title, a description, or a path (for imported
  vaults). A declaration without `path` applies to the folder whose slug
  matches, wherever it sits.
- Topic slugs match `^[a-z0-9][a-z0-9-]{0,63}$`.
- Agent profile names are host ids ([08](08-agent-integrations.md#2-host-ids)).
  The write capabilities are `episodes`, `edit`, `propose_rules`, and
  `harvest` ([07 §1](07-interfaces.md#1-agent-profiles)).
- Settings from 0.1 that format 3 dropped (`[consolidate]` `review`,
  `review_external`, `max_supersede_ratio`; topic `review` and
  `agent_edits`) are unknown keys: preserved, reported by lint (BW109), and
  ignored. The old capability names `consolidate` and `review` load and are
  ignored.

## 4. Common file conventions

- Encoding UTF-8, no BOM. Line endings `\n`; `\r\n` is accepted on read and
  preserved on write for files that already use it.
- Frontmatter, when present, is a YAML block delimited by `---` lines at the
  very top of the file.
- **Frontmatter values are scalars or lists of scalars.** Nested mappings
  MUST NOT be used. Reasons: Obsidian's properties editor only handles flat
  properties; LLMs frequently break nested YAML; flat values index trivially.
- **Frontmatter holds metadata only.** What a note knows (facts, reasons,
  connections to other notes) MUST be written in the body (§6.2). Obsidian
  defines properties as small, atomic values and renders no Markdown in
  them.
- **brain-wiki's fields carry the `bw-` prefix.** On notes these are
  `bw-superseded_by` (§6.3), `bw-sources` (§6.4), and `bw-stage`; episodes
  carry their provenance in `bw-` fields (§9). Shared note metadata stays
  unprefixed: `id`, `type`, `title`, `aliases`, `tags`, `status`,
  `created`, `updated`. Reasons: the prefix marks what brain-wiki parses
  and validates, keeps those fields together in Obsidian's Properties view,
  and cannot clash with another tool's property names. The prefix is
  reserved: lint reports an unknown `bw-` field on a note (BW118).
- Links in brain-wiki's fields are written double-quoted (`"[[note]]"`), so
  YAML reads them as strings and Obsidian keeps them live links.
- Other frontmatter wikilinks (`up:`, `related:`) are the user's
  properties: preserved and filterable, but not read as links.
- Writers change only the lines they mean to change. They MUST NOT reformat
  frontmatter or reflow prose they did not edit.

## 5. Identifiers

| Thing | Form | Example |
|---|---|---|
| brain, note, episode | ULID: 26 characters, Crockford base32, uppercase | `01J9Z7Q2V8K3M4N5P6R7S8T9W0` |
| rule | `r-` + ULID | `r-01JA0C5D8E2F4G6H8J0K2M4N6P` |
| run | `run-` + ULID | `run-01JA0D7F9G1H3J5K7M9N1P3Q5R` |

- ULIDs sort by creation time, which keeps episode folders naturally
  ordered and makes ids carry a timestamp without a separate field.
- Format 2 also gave each claim a `c-` id. Claims are gone in format 3, and
  the conversion drops their ids (§13).
- Ids are permanent. Renaming or moving a file never changes its id.
- Ids MUST be unique within a brain. Lint reports duplicates (usually a
  copied file) and `--fix` re-mints the id of the newer copy.

## 6. Notes

Notes and hubs (§8) share the rules in this section.

### 6.1 Frontmatter

```yaml
---
id: 01J9Z7Q2V8K3M4N5P6R7S8T9W0
type: decision
title: Use SQLite FTS5 for local search
status: active
aliases: [FTS5 decision]
tags: [search, storage]
created: 2026-10-07
updated: 2026-10-09
bw-sources:
  - "[[archive/episodes/2026/10/01J9Z6B5N3M1K9H7G5F3D1S9A7]]"
  - "https://sqlite.org/fts5.html"
---
```

| Field | Required | Values | Notes |
|---|---|---|---|
| `id` | yes in `strict`, minted by `lint --fix` | ULID | Unique in the brain (§5). |
| `type` | no (default `note`) | lowercase string | Open vocabulary. Suggested: `note`, `hub`, `concept`, `decision`, `howto`, `reference`, `person`, `project`, `source`, `meeting`. |
| `title` | no | string | Default: first `# ` heading, else file name without `.md`. |
| `aliases` | no | list of strings | Same meaning as in Obsidian; used for link resolution and search. |
| `tags` | no | list of strings | Without `#`. |
| `status` | no (default `active`) | `active` \| `superseded` \| `archived` | Closed set; the retrieval engine only reasons about these three (§6.3). |
| `bw-superseded_by` | only with `status: superseded` | one link, `"[[note]]"` | The note that replaced this one (§6.3). |
| `bw-sources` | no | list of `"[[note or episode]]"` links or URLs | Where the note's knowledge came from (§6.4). |
| `bw-stage` | no | string | Free workflow state (`draft`, `shipped`, `abandoned`…). Importers move non-standard `status` values here. |
| `created`, `updated` | no | ISO 8601 date or date-time | Writers set `updated` when they change a note. |

- Any other scalar or list property MAY be present (for example `source`,
  `url`, `author`). It is the user's: preserved, indexed for `--where`
  filters, never validated. Fields reserved for future use: `valid_from`,
  `valid_until`, `confidence`.
- Any other `bw-` field on a note is an error (BW118).
- Format 2 fields (`bw-claims`, `bw-claims-superseded`, `bw-<verb>`
  relations, and `bw-superseded_by` written as a list) are reported as
  BW117, with the command that converts them (§13).
- `brain validate` checks these rules for the files an agent changed;
  `brain lint` checks them for the whole brain
  ([06](06-lint-and-reports.md)).

### 6.2 Body

The body is free Markdown, with no reserved headings. brain-wiki reads only
its headings and links (and its words, for search); it never extracts
meaning from it. Orientation recommends a shape, and nothing enforces it:

```markdown
# Use SQLite FTS5 for local search

Lumen searches notes with SQLite FTS5 instead of shelling out to ripgrep.

- FTS5 is the default search backend since Lumen 0.4.
- Trigram search needs SQLite 3.34 or newer; see [[SQLite version policy]].
- Tried ripgrep over 10k notes: 1.8 s per query, too slow for search-as-you-type.

Replaced the earlier [[Use ripgrep for search]] approach.
```

- The first paragraph is the summary; search snippets and outlines use it.
- One fact per bullet, specific (numbers, versions, dates). Failed
  approaches are facts too.
- Connections are wikilinks inside sentences, so the reason sits next to
  the link. A link has no type: the sentence says why it is there.
- A fact that changed MAY be kept as history, for example as a struck-through
  bullet (`- ~~Search shells out to ripgrep.~~ (too slow)`) under
  `## History`.
- The conversion from format 2 writes `## Facts`, `## History`, and
  `## Related` sections (§13). They are ordinary headings, and a person or
  agent may rename, merge, or remove them.

### 6.3 Status and supersession

`status` says whether a note is current:

| `status` | Meaning | In retrieval |
|---|---|---|
| `active` | Current knowledge | Ranked normally |
| `superseded` | Replaced by a newer note; kept as history | Ranked lower; carries a banner naming its replacement ([04 §5](04-index-and-retrieval.md#5-supersession-guard)) |
| `archived` | No longer relevant; kept | Left out of search unless asked for |

When a newer note replaces an older one, the older note gets
`status: superseded` and names its replacement:

```yaml
status: superseded
bw-superseded_by: "[[Use SQLite FTS5 for local search]]"
```

- `bw-superseded_by` MUST be one quoted link, and MUST appear only with
  `status: superseded` (BW119; `lint --fix` sets the status).
- The target MUST resolve to a note (BW119) and MUST NOT be the note itself
  (BW119). Notes MUST NOT form a supersession cycle (BW307).
- Chains are allowed: if B replaces A and C replaces B, A and B each name
  their direct replacement, and readers follow the chain to the newest
  note (§7).
- `status: superseded` without `bw-superseded_by` is valid: the note is
  ranked lower, but no guard points anywhere.
- The newer note declares nothing. The index derives the reverse direction
  ("supersedes") from the older note's field. The newer note MAY mention
  its predecessor in a sentence with a link.

Why metadata and not a relation: lifecycle is a property of the old note,
and one field written in one place gives the guard (§7) a single direction
to follow, whichever note an author edits.

### 6.4 Sources

`bw-sources` records where a note's knowledge came from:

```yaml
bw-sources:
  - "[[archive/episodes/2026/10/01J9Z6B5N3M1K9H7G5F3D1S9A7]]"
  - "[[SQLite version policy]]"
  - "https://sqlite.org/fts5.html"
```

- Each item MUST be a quoted link to a note or episode, or a URL (BW120).
- A link SHOULD resolve (BW122, a warning). A link to an episode's
  `archive/` path is not reported while that episode is still in the inbox,
  so a note can cite an episode before `brain consolidate --done` moves it.
- Sources are per note, not per fact, and carry no trust flags. The episode
  a source names keeps its own provenance (`bw-origin`, `bw-inputs`, §9),
  so following the link answers who wrote it and what they had read.

### 6.5 Links

Body links of either form are recognized:

- `[[target]]`, `[[target|label]]`, `[[target#heading]]`, `[[target#^block]]`
- `[label](relative/path.md)`, including `#heading` fragments
- `![[embed]]` embeds are recorded as links

Body links are stored as `links_to` edges; `bw-superseded_by` and
`bw-sources` add `superseded_by` and `source` edges
([04 §3](04-index-and-retrieval.md#3-schema)). Edges feed backlinks,
`brain_neighbors`, orphan detection, link repair, and the visualizer. Only
`superseded_by` carries a retrieval rule (§7).

**Resolution order** for a link target `t` (all comparisons on Unicode
case-folded strings, `.md` optional):

1. `t` is a path relative to the brain root, or to the linking note's folder
2. `t` equals exactly one note's file name (Obsidian's default behavior)
3. `t` equals exactly one note's alias
4. `t` equals exactly one note's title
5. `t` is a note id (`[[01J9Z7Q2…]]`)

Zero matches is an unresolved link; more than one match at the first
matching step is ambiguous. Both are lint findings. Steps 3 to 5 are
leniencies for hand-written and model-written links; Obsidian itself only
resolves steps 1 and 2. Writers therefore always emit a file-name link
(`[[file name]]`, or the shortest unique path when names collide), adding
`|label` when the title differs, so every link they write also works in
Obsidian.

**Renames.** The index remembers each id's previous paths. When a file
moves and links break, `brain lint --fix` rewrites the links using the id.
`brain mv` moves a file and rewrites links in one step.

## 7. Supersession guard

`bw-superseded_by` (§6.3) changes what retrieval must return:

- When a search or read returns a note that names a replacement in
  `bw-superseded_by`, the replacement MUST be returned with it, and the old
  note MUST be labeled superseded. A chain is followed to the newest note.
- When a search or read returns a note that other notes name in
  `bw-superseded_by`, those notes are listed as the history it replaced.

This holds regardless of search scores and result limits: the guard's notes
are added on top of the top-k results
([04 §5](04-index-and-retrieval.md#5-supersession-guard)).

Format 2 also had a `conflicts_with` relation whose two sides were always
retrieved together. Format 3 has no conflict relation: a note that
disagrees with another says so in a sentence with a link.

## 8. Topic hubs

A hub is the file named `layout.hub_filename` at the root of a topic
folder. Hubs give a person or an agent a one-page entry point.

```markdown
---
id: 01J9Z7M3…
type: hub
title: Search
---
# Search

How local search works in this project and why. Storage details are in
[[storage]].

## Notes
- [[Use SQLite FTS5 for local search]]: why FTS5 over alternatives
- [[SQLite version policy]]: minimum versions and fallbacks
```

- Hubs have no length limit. Detail belongs in notes in the topic's
  folder; the hub links them, one line each.
- A parent topic's hub need not list its sub-topics: the folders already
  form the topic tree (§2). A crowded topic splits into sub-topics.
- `## Notes` lists the topic's notes with a short gloss. It is navigation
  people read, not data. `brain lint --fix` can add missing entries; it
  never removes lines a person wrote.

## 9. Episodes

Episodes are the inbox. They capture what happened in a session, raw and
unpolished, so nothing has to be decided at capture time.

Path: `inbox/episodes/<YYYY>/<MM>/<ulid>.md`, using the UTC year and month
of the ULID's timestamp.

```markdown
---
id: 01JA0C5D8E2F4G6H8J0K2M4N6P
type: episode
created: 2026-10-10T19:22:11Z
bw-agent: claude-code
bw-session: 5f2c9a1e-…           # host session id, if known
bw-turns: 12-48                  # turns of that session this episode covers, if known
bw-device: laptop                # device the session ran on (user config name)
bw-origin: agent                 # owner | agent | import | system
bw-inputs: unknown               # local | external | unknown
bw-captured: mcp                 # mcp | harvest | cli | import | file
bw-topics: [search]              # hints only
bw-dedupe: claude-code:5f2c9a1e-…:12-48   # idempotency key, if the writer gave one
---
Switched the search path to FTS5 after ripgrep was too slow on 10k notes.

## Claims
- ripgrep took ~800 ms per query on the test corpus; FTS5 took ~5 ms.
- Trigram tokenizer requires SQLite 3.34+.

## Negative findings
- Tried a pure-Python BM25 first; too slow above 2k notes.

## Open questions
- Should CJK text use the trigram table by default?
```

Rules:

- Episodes are **immutable**. After creation no tool edits them. Lint
  records each episode's hash in the index and reports changes.
- `bw-origin`, `bw-inputs`, `bw-captured`, and `bw-agent` are set by the
  code path that writes the episode (MCP server, harvest, CLI, import), never
  taken from model-written text. See [05 §3](05-write-path-and-consolidation.md#3-provenance-and-inputs).
  Episodes written before format 2 use the names without `bw-` (and
  `origin_turns` for `bw-turns`); they are never rewritten, and readers
  accept both.
- `bw-session`, `bw-turns`, and `bw-device` point back to the conversation the
  episode came from, so tools on that device can show it
  ([05](05-write-path-and-consolidation.md)). They
  never hold file paths. An episode must be understandable on its own:
  hosts delete old transcripts, and transcripts stay on the device that
  produced them.
- `bw-dedupe` holds the writer's idempotency key
  ([05](05-write-path-and-consolidation.md)).
  Episodes imported from documents carry `bw-source`, the original file
  and heading ([09 §6](09-import.md#6-to-episodes-and-from-agents)).
- The body is free Markdown. `## Claims`, `## Negative findings` (what was
  tried and did not work, so later agents do not repeat it), and
  `## Open questions` are suggested sections that the consolidation
  guidance looks for; none is required. They are body text: `## Claims`
  in an episode is an ordinary heading, not format 1's reserved section,
  and episodes are never converted (§13).
- `brain consolidate --done` moves processed episodes to
  `archive/episodes/` with the same relative path. Archived episodes are
  kept as provenance: `bw-sources` links to them (§6.4) still resolve.
- Files dropped into `inbox/agents/<agent>/` by host-native memory features
  are treated as episodes by consolidation without needing frontmatter.
  Their origin is `agent` and their inputs are `unknown`. `brain
  consolidate --done` archives them to `archive/agents/<agent>/` unchanged.

## 10. Rules

`rules.md` holds the user's standing directives. It is injected into every
orientation, so it is short by construction.

```markdown
# Rules
- Prefer pytest over unittest for new tests. <!-- id:r-01JA0C…; quote:"from now on use pytest"; at:2026-10-10; origin:owner -->
- Write US English in code and docs. <!-- id:r-01JA0D…; quote:"US spelling please"; at:2026-10-10; origin:owner -->
```

- Hard limits: `budgets.rules_max_lines` and `budgets.rules_max_chars`.
  Writes that would exceed them fail with an error that says so.
- Every rule carries `quote`, the user's verbatim words that justify it,
  and `origin`. Rules with `origin` other than `owner` are invalid.
- Replacing a rule moves the old line to `archive/rules.md` with
  `status:superseded; by:<new id>`.
- Agents never edit `rules.md` directly (`brain validate` reports BW121
  when asked to check it), and consolidation never writes it. Rules are
  added by the user through the CLI, or by an agent through an MCP tool that the host gates
  with a user confirmation ([05 §6](05-write-path-and-consolidation.md#6-rules)).

## 11. `AGENTS.md`

`AGENTS.md` lets an agent that can only read files use the brain. It
contains a generated block between markers, and anything the user writes
outside the markers is preserved.

```markdown
<!-- brain-wiki:begin (generated; edit outside these markers) -->
# This folder is a brain-wiki brain: personal
- Read `rules.md` first: standing directives from the user.
- Knowledge lives in `topics/<topic>/`; each topic has a hub (`index.md`).
- To add or correct knowledge, edit or create a note, then run
  `brain validate <path>` (MCP: `brain_validate`) and fix what it reports. Something
  not organized yet goes in `inbox/episodes/YYYY/MM/<ULID>.md` (or the MCP tool
  `brain_log_episode`). Never edit `rules.md`, episodes, or `log.md`.
- A note's frontmatter is metadata; its facts and `[[links]]` are in the body. A note
  with `status: superseded` names its replacement in `bw-superseded_by`: read that one.

(table of topic slug, hub, and description)
<!-- brain-wiki:end -->
```

Agents that only read files have no profile of their own, so the block
follows `[agents.default]`: without `edit` in its `write` list, the
correction sentence becomes "To record something, add a new file under
`inbox/episodes/YYYY/MM/<ULID>.md` (or call `brain_log_episode`). Never
edit `topics/` or `rules.md` directly." This matches the host instruction
block ([08 §3.2](08-agent-integrations.md#32-the-static-instruction-block)).

Agents never edit `AGENTS.md`, inside or outside the markers; the user
may. `brain lint --fix`, `brain mv`, and a grant or revoke that changes
whether `[agents.default]` has `edit` regenerate the block. Total
length is limited by `budgets.agents_md_max_lines`. When the topic table
would not fit, it is truncated to the most recently updated topics with a
pointer to the hubs.

## 12. `log.md`

An append-only, human-readable record of changes made by brain-wiki:

```markdown
## 2026-10-10T19:40:03Z · lint-fix · run-01JA0D7F…
- agent: owner
- lint --fix: 2 fixes
- topics/search/fts5.md: BW103 mint an id
- topics/search/ripgrep.md: BW119 set status: superseded
```

`log.md` is for people. Nothing depends on parsing it; undo uses machine
run records ([05 §8](05-write-path-and-consolidation.md#8-undo)). Direct
edits by people and agents are not runs and do not appear here; git holds
their history (`brain commit`, [05](05-write-path-and-consolidation.md)).

## 13. Format versioning

- `format` in `brain.toml` is an integer: the newest file format the brain
  may contain. This document defines format 3.
- A tool MUST refuse to open a brain with a higher format than it supports.
  A best-effort read is not safe: an older reader misreads fields whose
  meaning changed (format 2 reads `bw-superseded_by` as a relation list),
  and its writers would put old-format content into a newer brain.
- A tool that writes files in a newer format first raises `format`. The
  change is one-way: undoing the run that raised it does not lower it,
  because other files in the new format may remain.
- Readers accept every older format. A format change ships with a fix that
  converts files, has a dry run, and writes one undo point.

**Format 2** kept claims and typed relations in frontmatter lists:

```yaml
bw-part_of: "[[search]]"
bw-depends_on:
  - "[[SQLite version policy]] — needs the trigram tokenizer"
bw-supersedes:
  - "[[Use ripgrep for search]]"
bw-claims:
  - "SQLite FTS5 is the default search backend. {id: c-01J9…; src: inbox/episodes/2026/10/01J9Z6B5N3M1K9H7G5F3D1S9A7.md#L4-L6; at: 2026-10-07}"
bw-claims-superseded:
  - "Search shells out to ripgrep. {id: c-01J8…; by: c-01J9…; reason: too slow}"
```

**Format 1** kept claims and relations in the body, under reserved
`## Claims` and `## Relations` headings (claims could wrap onto indented
continuation lines), wrote `stage` without the prefix, and wrote episode
provenance without it:

```markdown
## Claims
- SQLite FTS5 is the default search backend. <!-- id:c-01J9…; src:…; at:2026-10-07 -->
- ~~Search shells out to ripgrep.~~ <!-- id:c-01J8…; status:superseded; by:c-01J9… -->

## Relations
- depends_on [[SQLite version policy]] — needs the trigram tokenizer
```

**Conversion to format 3.** Lint reports a format 1 or 2 note as BW117, and
`brain lint --fix` converts it:

| Format 1 or 2 | Format 3 |
|---|---|
| `bw-claims` items, or format 1 `## Claims` items | `## Facts` bullets, text only; claim metadata (`id`, `origin`, `inputs`, `at`) is dropped |
| `bw-claims-superseded` items, or struck-through format 1 claims | `## History` bullets: `- ~~text~~ (reason)` |
| Claim `src` | `bw-sources` items: an episode path becomes a link (`inbox/` mapped to `archive/`, `.md` dropped); URLs are kept; conversation references (`host:session#T…`) are dropped; items are deduplicated and merged with an existing `bw-sources` |
| `bw-<verb>` relations, or format 1 `## Relations` items | `## Related` bullets such as `- Depends on [[SQLite version policy]] — needs the trigram tokenizer` |
| `bw-part_of` naming the note's own hub (its folder or hub path) | Dropped: membership is the folder (§2) |
| `bw-superseded_by` relation | The `bw-superseded_by` field (one link) and `status: superseded` |
| `bw-supersedes: X`, or a format 1 `supersedes` line | A `## Related` bullet, plus a second BW117 fix on note X: `status: superseded` and `bw-superseded_by` linking back by the shortest link (file name when unique, else path) |
| A relation item that does not parse | Moved unchanged to `## Related` |
| Unprefixed `stage` | `bw-stage` |

```markdown
## Facts

- SQLite FTS5 is the default search backend.

## History

- ~~Search shells out to ripgrep.~~ (too slow)

## Related

- Depends on [[SQLite version policy]] — needs the trigram tokenizer
- Supersedes [[Use ripgrep for search]]
```

- Items are appended to an existing `## Facts`, `## History`, or
  `## Related` section rather than adding a second one.
- All fixes form one undoable run; `brain lint --fix --dry-run` shows the
  diff first. The run raises `format` to 3.
- Until a note is converted, the text of its format 2 claims stays
  searchable, and lint keeps reporting the conversion command.
- Episodes are immutable and are never converted. Readers accept their
  format 1 provenance names (§9), and their `## Claims` sections are body
  text.
