# Brain format

This document defines format 3, what a brain looks like on disk. brain-wiki,
every agent host, and the user's other tools rely on it, and it is
normative. The key words MUST, MUST NOT, SHOULD, and MAY are used as in
RFC 2119.

## 1. Requirements that shaped the format

| Requirement | Consequence |
|---|---|
| People can read and edit a brain in any editor, and in Obsidian | Markdown files, YAML frontmatter, `[[wikilinks]]`, no binary state in the brain |
| LLMs can write it without corrupting its structure | Frontmatter holds flat metadata only. A note's knowledge is ordinary Markdown in the body, so a careless edit breaks a sentence, not the note. |
| Simple, fast code can parse it | brain-wiki reads frontmatter, headings, and links, and never extracts meaning from the body ([D33](../decision/d33-no-meaning-extraction.md)) |
| Notes survive renames and moves | Permanent ULID ids, and link repair by id |
| Concurrent agents and devices are safe | Episodes are new, uniquely named files. Agents edit notes directly and check them with `brain validate`. Git keeps the history ([write path](write-path.md)). |
| Git diffs and merges stay small | Stable ordering, one item per line, untouched lines never rewritten |

Format 3 moved format 2's claims and typed relations out of frontmatter
lists and into plain body text. Obsidian renders no Markdown in
properties, so facts and links held there were hard to read and edit
([D32](../decision/d32-format-3.md)). §13 describes the older formats and
their conversion.

## 2. Directory layout

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

### 2.1 Topics

A topic is the unit people browse, search filters by, and a hub
summarizes. Topics are folders, so every file browser shows them, and they
form a tree ([D30](../decision/d30-topic-tree.md)).

- A topic is a folder directly under `topics/`, or a folder at any depth
  below it that has a hub (`layout.hub_filename`, §8). There are no named
  levels: `people/` and `people/rin-sato/` are both topics.
- A folder without a hub inside a topic is plain organization. Its notes
  belong to the enclosing topic.
- A topic's parent is the nearest enclosing topic. A note belongs to the
  topic whose folder holds it. No frontmatter field declares membership.
- Notes MAY live outside any topic, for example in an imported vault
  (BW407, info).
- The inbox, archive, and reports folders are never topics, even when
  `layout.topics_dir` is `.`.
- Every topic has a slug, unique in the brain, and the slug is its
  identity. It is the folder name without a leading number, lowercased,
  with other characters turned into `-` (`01 People` becomes `people`).
  Folders are named shallowest first. A folder whose slug is taken gets
  its parent's slug as a prefix (`rin-sato-notes`), then a number.
- A topic declared in `brain.toml` (§3) names its `path`, or else the
  folder whose slug matches, wherever it sits.

Reorganizing is moving folders. `brain mv` moves a topic folder with its
notes and rewrites the links that named them by path, as one undoable run.
A move by hand works too, and `brain lint --fix` repairs path links from
the index's history. Because a topic is known by its slug, topic settings,
links by file name, and run records survive the move.

There is no state directory inside the brain. Machine state (the index,
run records) is rebuildable or device-specific. Which episodes are done is
encoded by location, in `inbox/episodes/` or `archive/episodes/`
([D13](../decision/d13-inbox-by-location.md)).

## 3. `brain.toml`

The manifest identifies the brain and holds settings that travel with it.
Settings that belong to a user or a machine, such as where brains are and
which brain is the default, live in the user config
([config and storage](config-and-storage.md)).

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

[budgets]
rules_max_lines     = 100
rules_max_chars     = 4000
agents_md_max_lines = 150
orient_max_tokens   = 1500

[lint]                                      # see lint and reports §2
profile = "strict"                          # strict | migrate
stale_inbox_days = 14
# [lint.overrides] maps path globs to a profile or "off", e.g. "Archive/**" = "migrate"

[search]                                    # see index and search §4 to §6
freshness_ms       = 1000
max_guards_per_hit = 10
status_factor      = { active = 1.0, superseded = 0.35, archived = 0.2 }
kind_factor        = { hub = 1.15, note = 1.0, episode = 0.7, archived_episode = 0.5 }
recency_half_life_days = 180

[consolidate]
max_episodes_per_run = 50                   # episodes one `brain consolidate --prepare` returns

[reports]
after_consolidate = true                    # `brain consolidate --done` regenerates reports/
commit = false                              # accepted, currently has no effect

[git]
mode = "auto"                               # auto | off; auto commits each run in a git work tree

[topics.search]                             # one table per declared topic (optional)
path        = "topics/search"               # default: the folder with this slug, at any depth
title       = "Search"
description = "How local search works and why."

[agents.default]                            # profile for hosts without their own
write       = ["edit"]

[agents.claude-code]                        # profile for one host id
write       = ["edit", "propose_rules", "harvest"]
read_origin = false
```

Rules:

- `format` and `id` are REQUIRED. A known key with a value of the wrong
  type stops the brain from opening, with an error naming the key.
- Unknown keys MUST be preserved by tools that rewrite the file, and
  SHOULD produce a lint warning (BW109).
- Inline tables (`status_factor = { … }`) are TOML, not frontmatter. The
  flat-values rule of §4 applies to note frontmatter only.
- An undeclared topic still works. Its title comes from its hub, and its
  description from the hub's `description` property. A declaration sets
  the title, the description, or a path (for imported vaults).
- Declared topic slugs MUST match `^[a-z0-9][a-z0-9-]{0,63}$` (BW409).
- `[budgets]` limits are hard. Rule writes refuse to exceed theirs, lint
  reports `rules.md` (BW402) and `AGENTS.md` (BW403), and orientation is
  cut to fit.
- `git.mode = "on"` behaves like `auto`.
- Agent profile names are host ids
  ([agent integrations §2](agent-integrations.md#2-host-ids)). The write
  capabilities are `edit`, `propose_rules`, and `harvest`, and
  `read_origin` lets a host read the conversation behind an episode
  ([CLI and MCP §1](cli-and-mcp.md#1-agent-profiles)).
- Settings that 0.1 had and format 3 dropped (`[consolidate]` `review`,
  `review_external`, `max_supersede_ratio`, and topic `review` and
  `agent_edits`) are unknown keys, so they are preserved, reported
  (BW109), and ignored. The old capability names `consolidate`, `review`,
  and `episodes` grant nothing; capturing an episode needs no capability.

## 4. Common file conventions

- Encoding is UTF-8. Files SHOULD have no BOM, and readers ignore one.
  Line endings are `\n`. Readers accept `\r\n`, and writers keep it in
  files that already use it.
- Frontmatter, when present, is a YAML block at the very top of the file,
  opened by a `---` line and closed by `---` or `...`. It MUST be at most
  64 KiB (BW101).
- Frontmatter values MUST be scalars or lists of scalars. Nested mappings
  and lists of lists MUST NOT be used (BW102). Obsidian edits only flat
  properties, and LLMs often break nested YAML
  ([D3](../decision/d03-flat-frontmatter.md)).
- Frontmatter holds metadata only. What a note knows (facts, reasons,
  connections to other notes) MUST be written in the body (§6.2), since
  Obsidian renders no Markdown in properties.
- brain-wiki's own fields carry the reserved `bw-` prefix: on notes
  `bw-superseded_by` (§6.3), `bw-sources` (§6.4), and `bw-stage`, and on
  episodes the provenance fields (§9). Shared metadata stays unprefixed:
  `id`, `type`, `title`, `aliases`, `tags`, `status`, `created`,
  `updated`. The prefix marks what brain-wiki validates and cannot clash
  with other tools ([D29](../decision/d29-bw-prefix.md)). Lint reports an
  unknown `bw-` field on a note (BW118).
- Links in brain-wiki's fields are written double-quoted (`"[[note]]"`),
  so YAML reads them as strings and Obsidian keeps them live links.
- Wikilinks in other frontmatter properties (`up:`, `related:`) are the
  user's. brain-wiki preserves them and can filter on them, but does not
  read them as links.
- Writers change only the lines they mean to change. They MUST NOT
  reformat frontmatter or reflow prose they did not edit.

## 5. Identifiers

| Thing | Form | Example |
|---|---|---|
| brain, note, episode | ULID: 26 characters, Crockford base32, uppercase | `01J9Z7Q2V8K3M4N5P6R7S8T9W0` |
| rule | `r-` + ULID | `r-01JA0C5D8E2F4G6H8J0K2M4N6P` |
| run | `run-` + ULID | `run-01JA0D7F9G1H3J5K7M9N1P3Q5R` |

- ULIDs sort by creation time, which keeps episode folders ordered and
  gives every id a timestamp without a separate field
  ([D12](../decision/d12-ulids.md)).
- Ids are permanent. Renaming or moving a file never changes its id.
- Ids MUST be unique within a brain. Lint reports duplicates (BW105),
  usually a copied file, and `--fix` mints a new id for each newer copy
  of a note or hub.
- Format 2 also gave each claim a `c-` id. The conversion to format 3
  drops them (§13).

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
| `id` | yes in `strict` (BW103) | ULID | Unique in the brain (§5) |
| `type` | no (default `note`) | lowercase string | Open vocabulary |
| `title` | no | string | Default: first `# ` heading, else file name |
| `aliases` | no | list of strings | As in Obsidian; used to resolve links |
| `tags` | no | list of strings | Without `#` |
| `status` | no (default `active`) | `active`, `superseded`, `archived` | Closed set (§6.3, BW106) |
| `bw-superseded_by` | only with `status: superseded` | one link, `"[[note]]"` | §6.3 |
| `bw-sources` | no | list of links or URLs | §6.4 |
| `bw-stage` | no | string | Free workflow state |
| `created`, `updated` | no | ISO 8601 date or date-time | — |

- Suggested `type` values: `note`, `hub`, `concept`, `decision`, `howto`,
  `reference`, `person`, `project`, `source`, `meeting`, `record` (a dated
  account of something that happened, which consolidation writes under
  `topics/<topic>/records/`).
- `bw-stage` is a free workflow state (`draft`, `shipped`, `abandoned`).
  Importers and the BW106 fix move non-standard `status` values here.
- Agents SHOULD set `updated` when they change a note. brain-wiki's own
  fixes and moves leave it alone.
- Any other scalar or list property MAY be present (for example `source`,
  `url`, `author`). It is the user's: preserved, filterable with `--where`,
  never validated. The names `valid_from`, `valid_until`, and `confidence`
  are reserved for a later format.
- Format 2 fields (`bw-claims`, `bw-claims-superseded`, `bw-<verb>`
  relations, and `bw-superseded_by` written as a list) are BW117, and the
  message names the command that converts them (§13).
- `brain validate` checks these rules for the files an agent changed, and
  `brain lint` for the whole brain ([lint](lint-and-reports.md)).

### 6.2 Body

The body is free Markdown with no reserved headings. brain-wiki reads only
its headings and links, and its words for search. It never extracts
meaning from it. Orientation recommends this shape, and nothing enforces
it:

```markdown
# Use SQLite FTS5 for local search

Lumen searches notes with SQLite FTS5 instead of shelling out to ripgrep.

- FTS5 is the default search backend since Lumen 0.4.
- Trigram search needs SQLite 3.34 or newer; see [[SQLite version policy]].
- Tried ripgrep over 10k notes: 1.8 s per query, too slow for search-as-you-type.

Replaced the earlier [[Use ripgrep for search]] approach.
```

- The first paragraph is the summary. Search snippets and outlines use
  it.
- One fact per bullet, specific (numbers, versions, dates). Failed
  approaches are facts too.
- Connections are wikilinks inside sentences, so the reason sits next to
  the link. A link has no type. The sentence says why it is there.
- A fact that changed MAY be kept as history, for example as a
  struck-through bullet under `## History`:
  `- ~~Search shells out to ripgrep.~~ (too slow)`.
- The conversion from format 2 writes `## Facts`, `## History`, and
  `## Related` sections (§13). They are ordinary headings that a person or
  agent may rename, merge, or remove.

### 6.3 Status and supersession

`status` says whether a note is current.

| `status` | Meaning | In retrieval |
|---|---|---|
| `active` | Current knowledge | Ranked normally |
| `superseded` | Replaced by a newer note, kept as history | Ranked lower, with a banner naming its replacement ([index and search §5](index-and-search.md#5-supersession-guard)) |
| `archived` | No longer relevant, kept | Left out of search unless asked for |

When a newer note replaces an older one, the older note gets
`status: superseded` and names its replacement:

```yaml
status: superseded
bw-superseded_by: "[[Use SQLite FTS5 for local search]]"
```

- `bw-superseded_by` MUST be one quoted link, and MUST appear only with
  `status: superseded` (BW119). `lint --fix` sets the status.
- The target MUST resolve to a note and MUST NOT be the note itself
  (BW119). Notes MUST NOT form a supersession cycle (BW307).
- Chains are allowed. If B replaces A and C replaces B, A and B each name
  their direct replacement, and readers follow the chain to the newest
  note (§7).
- `status: superseded` without `bw-superseded_by` is valid. The note
  ranks lower, but no guard points anywhere.
- The newer note declares nothing. The index derives the reverse
  direction ("supersedes") from the older note's field. The newer note MAY
  mention its predecessor in a sentence with a link.

Supersession is a field on the old note, so the guard has one direction to
follow whichever note an author edits
([D5](../decision/d05-supersession-guard.md)).

### 6.4 Sources

`bw-sources` records where a note's knowledge came from.

```yaml
bw-sources:
  - "[[archive/episodes/2026/10/01J9Z6B5N3M1K9H7G5F3D1S9A7]]"
  - "[[SQLite version policy]]"
  - "https://sqlite.org/fts5.html"
  - "session://claude-code/5f2c9a1e-…#turns=12-48"
```

- Each item MUST be a quoted link to a note or episode, or a URL (BW120).
- A session URL, `session://<host>/<session id>#turns=A-B`, cites the
  agent session a note was harvested from
  ([write path §2.2](write-path.md#22-harvesting-sessions)). It holds no
  file path; `brain origin` shows those turns on the machine that has the
  transcript.
- A link SHOULD resolve (BW122, a warning). A link to an episode's
  `archive/` path is not reported while that episode is still in the
  inbox, so a note can cite an episode before `brain consolidate --done`
  moves it.
- Sources are per note, not per fact, and carry no trust flags. The
  episode a source names keeps its own provenance (`bw-origin`,
  `bw-inputs`, §9), so following the link answers who wrote it and what
  they had read.

### 6.5 Links

brain-wiki recognizes these body links:

- `[[target]]`, `[[target|label]]`, `[[target#heading]]`,
  `[[target#^block]]`, and `[[target\|label]]` (the escaped pipe Obsidian
  uses in tables)
- `![[embed]]`, recorded as a link
- `[label](relative/path.md)`, including `#heading` fragments

Links in code, links within the same note, and Markdown links to URLs,
`mailto:`, or non-Markdown files are not note links.

Body links are stored as `links_to` edges. `bw-superseded_by` and
`bw-sources` add `superseded_by` and `source` edges
([index and search §3](index-and-search.md#3-schema)). Edges feed
backlinks, `brain_neighbors`, orphan detection, link repair, and the
visualizer. Only `superseded_by` carries a retrieval rule (§7).

Resolution order for a link target `t`, comparing Unicode case-folded
strings with `.md` optional:

1. `t` is a path relative to the linking note's folder.
2. `t` is a path relative to the brain root.
3. `t` contains `/` and is the end of exactly one note's path.
4. `t` equals exactly one note's file name.
5. `t` equals exactly one note's alias.
6. `t` equals exactly one note's title.
7. `t` is a note id (`[[01J9Z7Q2…]]`).

- Zero matches is an unresolved link. More than one match at the first
  step that matches is ambiguous. Lint reports both (BW310 for body
  links, BW119 and BW122 for fields).
- Steps 1 to 4 are how Obsidian resolves links. Steps 5 to 7 are
  leniencies for hand-written and model-written links.
- Links brain-wiki writes use the file name, or the full path without
  `.md` when another note has the same file name, so they work in
  Obsidian too.

The index remembers each id's previous paths. When a file moves and links
break, `brain lint --fix` rewrites them using the id. `brain mv` moves a
file and rewrites links in one step.

## 7. Supersession guard

`bw-superseded_by` (§6.3) changes what retrieval must return.

- When a search or read returns a note that names a replacement in
  `bw-superseded_by`, the replacement MUST be returned with it, and the
  old note MUST be labeled superseded. A chain is followed to the newest
  note.
- When a search or read returns a note that other notes name in
  `bw-superseded_by`, those notes are listed as the history it replaced.

This holds regardless of search scores and result limits. The guard's
notes come on top of the top-k results
([index and search §5](index-and-search.md#5-supersession-guard)).

Format 3 has no conflict relation. A note that disagrees with another says
so in a sentence with a link.

## 8. Topic hubs

A hub is the file named `layout.hub_filename` at the root of a topic
folder. It gives a person or an agent a one-page entry point. A note with
`type: hub` elsewhere in a topic is indexed as a hub too.

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

- With `hub_filename = "{folder}.md"`, the hub of `topics/search/` is
  `topics/search/search.md`.
- Hubs have no length limit. Detail belongs in notes in the topic's
  folder, and the hub links them, one line each.
- A parent topic's hub need not list its sub-topics, since the folders
  already form the topic tree (§2). A crowded topic splits into
  sub-topics.
- `## Notes` lists the topic's notes with a short gloss. It is navigation
  people read, not data. A note it does not list, and that no listed note
  reaches through body links, is BW405.
  `brain lint --fix --select BW405` appends the missing entries and never
  removes lines a person wrote.
- An optional `description` property on the hub is the topic's one-line
  description when `brain.toml` does not declare one.

## 9. Episodes

Episodes are the inbox. They capture what happened in a session, raw and
unpolished, so nothing has to be decided at capture time.

The path is `inbox/episodes/<YYYY>/<MM>/<ulid>.md`, using the UTC year and
month of the ULID's timestamp (BW502).

```markdown
---
id: 01JA0C5D8E2F4G6H8J0K2M4N6P
type: episode
bw-agent: claude-code
bw-session: 5f2c9a1e-…           # host session id, if known
bw-turns: 12-48                  # turns of that session this episode covers, if known
bw-device: laptop                # device the session ran on (user config name)
bw-origin: agent                 # owner | agent | import | system
bw-inputs: unknown               # local | external | unknown
bw-captured: mcp                 # mcp | harvest | cli | import | file
created: 2026-10-10T19:22:11Z
bw-topics: [search]              # hints only
bw-dedupe: claude-code:5f2c9a1e-…:12-48   # idempotency key, if the writer gave one
bw-pattern: file                 # the agent's consolidation hint, if it gave one
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

- Episodes are immutable. After creation no tool edits them. The index
  records each episode's first hash, and lint reports a change (BW501).
- An episode MUST have `id`, `bw-origin`, and `bw-inputs` (BW503).
- `bw-origin`, `bw-inputs`, `bw-captured`, and `bw-agent` are set by the
  code path that writes the episode (the MCP server or harvest), never
  taken from model-written text. The index trusts them only for
  episodes this device wrote. See
  [write path §3](write-path.md#3-provenance-and-inputs) and
  [index and search §3](index-and-search.md#3-schema).
- Episodes written before format 2 use the field names without `bw-`, and
  `origin_turns` for `bw-turns`. They are never rewritten, and readers
  accept both.
- `bw-session`, `bw-turns`, and `bw-device` point back to the conversation
  the episode came from, so tools on that device can show it
  ([write path §4.6](write-path.md#46-origin-context)). They never hold
  file paths. An episode must still make sense on its own, because hosts
  delete old transcripts and transcripts stay on their device.
- `bw-dedupe` holds the writer's idempotency key
  ([write path §2.1](write-path.md#21-ways-an-episode-is-written)).
  Episodes imported from documents by earlier versions carry `bw-source`,
  the original file and heading.
- `bw-pattern` is the capturing agent's guess at how the episode should be
  consolidated: `record`, `playbook`, `file`, or `distill`
  ([write path §2.1](write-path.md#21-ways-an-episode-is-written)). It is a
  hint, not provenance.
- The body is free Markdown. `## Claims`, `## Negative findings` (what was
  tried and failed, so later agents do not repeat it), and
  `## Open questions` are optional sections the consolidation guidance
  looks for. In an episode, `## Claims` is an ordinary heading, not format
  1's reserved section.
- `brain consolidate --done` moves processed episodes to
  `archive/episodes/` with the same relative path. Archived episodes are
  kept as provenance, so `bw-sources` links to them (§6.4) still resolve.
- Files dropped into `inbox/agents/<agent>/` by host-native memory
  features are treated as episodes without needing frontmatter. Their
  origin is `agent` and their inputs are `unknown`.
  `brain consolidate --done` archives them unchanged to
  `archive/agents/<agent>/`.

## 10. Rules

`rules.md` holds the user's standing directives. Every orientation
includes it, so it is short by construction.

```markdown
# Rules
- Prefer pytest over unittest for new tests. <!-- id:r-01JA0C…; origin:owner; at:2026-10-10; quote:"from now on use pytest" -->
- Write US English in code and docs. <!-- id:r-01JA0D…; origin:owner; at:2026-10-10; quote:"US spelling please" -->
```

- A rule is a list item followed by a metadata comment. A comment that
  does not parse is BW603.
- Hard limits are `budgets.rules_max_lines` and
  `budgets.rules_max_chars`. A write that would exceed them fails with an
  error that names the longest rules. Lint reports a file over budget
  (BW402).
- Every rule carries `quote`, the user's verbatim words that justify it
  (BW601), and `origin`. A rule whose `origin` is not `owner` is invalid
  (BW602). A rule added from a proposal also carries `via`.
- Replacing a rule moves the old line to `archive/rules.md` with
  `status:superseded; by:<new id>`.
- Agents never edit `rules.md` directly, and `brain validate` reports
  BW121 when asked to check it. Consolidation never writes it. The user
  adds rules through the CLI. An agent proposes one through an MCP tool,
  which writes `inbox/proposals/rule-<id>.md`, and the rule takes effect
  when the user runs `brain rules accept`
  ([write path §6](write-path.md#6-rules)).

## 11. `AGENTS.md`

`AGENTS.md` lets an agent that can only read files use the brain. It
contains a generated block between markers. Anything the user writes
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

| Topic | Hub | About |
|---|---|---|
| search | topics/search/index.md | How local search works and why. |
<!-- brain-wiki:end -->
```

Agents that only read files have no profile of their own, so the block
follows `[agents.default]`. Without `edit` in its `write` list, the third
bullet becomes "To record something, add a new file under
`inbox/episodes/YYYY/MM/<ULID>.md` (or call the brain-wiki MCP tool
`brain_log_episode`). Never edit `topics/` or `rules.md` directly." This
matches the host instruction block
([agent integrations §3.2](agent-integrations.md#32-the-static-instruction-block)).

- The topic table lists the top-level topics alphabetically, with the hub
  path and the description (or title) plus the number of sub-topics.
- The whole file is limited to `budgets.agents_md_max_lines`, counting
  the user's text outside the markers. When the table does not fit, it
  keeps the most recently updated topics and ends with a row pointing to
  the hubs.
- Agents never edit `AGENTS.md`, inside or outside the markers. The user
  may.
- `brain init` writes the block. `brain lint --fix` (BW403, BW408),
  `brain mv`, and a grant or revoke that changes whether
  `[agents.default]` has `edit` regenerate it.

## 12. `log.md`

`log.md` is an append-only, human-readable record of the runs brain-wiki
makes:

```markdown
## 2026-10-10T19:40:03Z · lint-fix · run-01JA0D7F…
- agent: owner
- lint --fix: 2 fixes
- topics/search/fts5.md: BW103 mint an id
- topics/search/ripgrep.md: BW119 set status: superseded
```

- `log.md` is for people. Orientation shows the last five headings and
  `reports/index.md` finds the last consolidation in it, but undo uses
  machine run records ([write path §8](write-path.md#8-undo)).
- Direct edits by people and agents are not runs and do not appear here.
  Git holds their history (`brain commit`,
  [write path §5](write-path.md#5-committing-direct-edits)).
- `brain init` sets `log.md merge=union` in `.gitattributes`, so
  concurrent appends from two devices merge without conflict.

## 13. Format versioning

`format` in `brain.toml` is an integer, the newest file format the brain
may contain. This document defines format 3.

- A tool MUST refuse to open a brain with a higher format than it
  supports. A best-effort read is not safe. An older reader misreads
  fields whose meaning changed (format 2 reads `bw-superseded_by` as a
  relation list), and its writers would put old-format content into a
  newer brain.
- A tool that writes files in a newer format MUST raise `format`. In
  brain-wiki, every run that writes a Markdown file other than `log.md`,
  and every episode write, raises it to the current version. The change is
  one-way. Undoing the run that raised it does not lower it, because other
  files in the new format may remain.
- Readers accept every older format. A format change ships with a fix
  that converts files, has a dry run, and writes one undo point.

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
`## Claims` and `## Relations` headings. Claims could wrap onto indented
continuation lines. It wrote `stage` and episode provenance without the
prefix:

```markdown
## Claims
- SQLite FTS5 is the default search backend. <!-- id:c-01J9…; src:…; at:2026-10-07 -->
- ~~Search shells out to ripgrep.~~ <!-- id:c-01J8…; status:superseded; by:c-01J9… -->

## Relations
- depends_on [[SQLite version policy]] — needs the trigram tokenizer
```

Lint reports a format 1 or 2 note as BW117, and `brain lint --fix`
converts it to format 3:

| Format 1 or 2 | Format 3 |
|---|---|
| `bw-claims` items, or format 1 `## Claims` items | `## Facts` bullets, text only |
| `bw-claims-superseded` items, or struck-through format 1 claims | `## History` bullets: `- ~~text~~ (reason)` |
| Claim `src` | `bw-sources` items |
| `bw-<verb>` relations, or format 1 `## Relations` items | `## Related` bullets |
| `bw-part_of` naming the note's own hub | Dropped, since membership is the folder (§2) |
| `bw-superseded_by` relation | The `bw-superseded_by` field and `status: superseded` |
| `bw-supersedes: X`, or a format 1 `supersedes` line | A `## Related` bullet, plus a fix on note X |
| A relation item that does not parse | Moved unchanged to `## Related` |
| Unprefixed `stage` | `bw-stage` |

- Claim metadata (`id`, `origin`, `inputs`, `at`) is dropped. An episode
  path in `src` becomes a link, with `inbox/` mapped to `archive/` and
  `.md` and any `#…` fragment removed. URLs are kept, and conversation
  references (`host:session#T…`) are dropped. Items merge into an existing
  `bw-sources` without duplicates.
- A relation bullet starts with its verb as a phrase, as in the example
  below. "The note's own hub" means its hub path, folder name, or slug.
- A `bw-superseded_by` relation sets `status: superseded` only when the
  status was `active`.
- For `bw-supersedes: X`, a second BW117 fix on X sets
  `status: superseded` and a `bw-superseded_by` link back, by file name
  when unique, else by path.

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
  `## Related` section rather than adding a second one. A legacy section
  left empty is removed.
- All fixes form one undoable run, and `brain lint --fix --dry-run` shows
  the diff first. The run raises `format` to 3.
- Until a note is converted, the text of its format 2 claims stays
  searchable, and lint keeps reporting the conversion command.
- Episodes are immutable and are never converted. Readers accept their
  format 1 provenance names (§9), and their `## Claims` sections are body
  text.
