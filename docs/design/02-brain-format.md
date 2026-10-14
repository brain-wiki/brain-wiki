# 02 · Brain format

Status: draft for review · Format version: 2 · Normative

This document defines what a brain looks like on disk. It is the contract
between brain-wiki, every agent host, and the user's other tools. The key
words MUST, MUST NOT, SHOULD, and MAY are used as in RFC 2119.

## 1. Requirements that shaped the format

| Requirement | Consequence |
|---|---|
| Readable and editable by people in any editor, and by Obsidian | Markdown files, YAML frontmatter, `[[wikilinks]]`, no binary state in the brain |
| Writable by LLMs without corrupting structure | One fact or relation per line; flat frontmatter lists; no nested YAML |
| Parseable with simple, fast code | Claims and relations are frontmatter strings with small grammars; the body stays prose |
| Survives renames and moves | Permanent ULID ids; link repair by id |
| Safe under concurrent agents and devices | Inbox files are append-only and uniquely named; curated files change only in validated runs |
| Diff- and merge-friendly in git | Stable ordering, one item per line, no reflowing of untouched lines |

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

**Why topics are folders.** A topic is the unit people browse, the unit of
topic policies (review, agent edits), and the unit a hub summarizes. A folder makes that
visible in every file browser and in Obsidian without extra tooling. Notes
MAY also live outside any topic (for example in an imported vault); they
belong to no topic and lint can warn about it.

**Topics form a tree.**

- A topic is a folder directly under `topics/`, or a folder at any depth
  below it that has a hub (`layout.hub_filename`, §8). There are no named
  levels: `people/` and `people/rin-sato/` are both topics.
- A folder without a hub inside a topic is plain organization; its notes
  belong to the enclosing topic.
- A topic's **parent** is the nearest enclosing topic. A sub-topic's hub is
  `part_of` its parent's hub without anyone writing it (an implicit
  relation, §6.4); an explicit `bw-part_of` adds further parents.
- Every topic has a **slug**, unique in the brain: its folder name,
  slugified (`01 People` → `people`). When two folders would get the same
  slug, the deeper one takes its parent's slug as a prefix (`rin-sato-notes`).
  Declaring a topic in `brain.toml` (§3) can name it. The slug, not the
  path, is the topic's identity.
- **Policies inherit down the tree.** A topic without its own `review` or
  `agent_edits` setting takes its nearest ancestor's.
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
format = 2                                  # format version (required, §13)
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
review  = "auto"                            # auto (review only when checks trigger) | always
review_external = false                     # route runs with external-input sources to review
max_episodes_per_run = 50
max_supersede_ratio  = 0.25                 # above this, a run is routed to review (see 05)

[reports]
after_consolidate = true
commit = false                              # include reports/ in brain-wiki's git commits

[git]
mode = "auto"                               # auto | off ; auto = commit when the brain is a git work tree

[topics.search]                             # one table per declared topic (optional)
path        = "topics/search"               # default: the folder with this slug, at any depth
title       = "Search"
description = "How local search works and why."
review      = "always"                      # per-topic override
agent_edits = "allow"                       # allow | review | deny for checked agent edits (05 §2.3)

[agents.default]                            # profile for unknown hosts
write       = ["episodes", "edit"]

[agents.claude-code]                        # profile for one host id
write       = ["episodes", "edit", "propose_rules", "consolidate", "review"]
```

Rules:

- `format` and `id` are REQUIRED. Unknown keys MUST be preserved by tools
  that rewrite the file and SHOULD produce a lint warning.
- Inline tables (`status_factor = { … }`) are TOML, not frontmatter; the
  flat-values rule in §4 applies to note frontmatter only.
- A topic that exists on disk but is not declared still works: its slug is
  its folder name, title is taken from the hub, and its policies are its
  parent's. Declaring a topic lets the user set description, review mode,
  agent edits, or a path (for imported vaults). A declaration without
  `path` applies to the folder whose slug matches, wherever it sits.
- Topic slugs match `^[a-z0-9][a-z0-9-]{0,63}$`.
- Agent profile names are host ids ([08](08-agent-integrations.md#2-host-ids)).

## 4. Common file conventions

- Encoding UTF-8, no BOM. Line endings `\n`; `\r\n` is accepted on read and
  preserved on write for files that already use it.
- Frontmatter, when present, is a YAML block delimited by `---` lines at the
  very top of the file.
- **Frontmatter values are scalars or lists of scalars.** Nested mappings
  MUST NOT be used. Reasons: Obsidian's properties editor only handles flat
  properties; LLMs frequently break nested YAML; flat values index trivially.
- **brain-wiki's fields carry the `bw-` prefix.** Relations (§6.4), claims
  (§6.3), `bw-stage`, and episode provenance (§9) are fields
  named `bw-…`. Shared note metadata stays unprefixed: `id`, `type`, `title`,
  `aliases`, `tags`, `status`, `created`, `updated`. Reasons: the prefix
  marks what brain-wiki parses and validates, keeps those fields together in
  Obsidian's Properties view, and cannot clash with another tool's property
  names. The prefix is reserved: lint reports unknown `bw-` fields (BW302).
- Claims and relations are strings, written double-quoted, one list item
  per line. Obsidian shows and edits them as list properties, and quoted
  `"[[links]]"` stay live links.
- Other frontmatter wikilinks (`up:`, `related:`) are not relations.
  Importers convert common link properties into `bw-` relations
  ([09](09-import.md)).
- Writers change only the lines they mean to change. They MUST NOT reformat
  frontmatter or reflow prose they did not edit.

## 5. Identifiers

| Thing | Form | Example |
|---|---|---|
| brain, note, episode | ULID: 26 characters, Crockford base32, uppercase | `01J9Z7Q2V8K3M4N5P6R7S8T9U0` |
| claim | `c-` + ULID | `c-01J9Z8A3QK7T0V5W2X4Y6Z8B1C` |
| rule | `r-` + ULID | `r-01JA0C5D8E2F4G6H8J0K2M4N6P` |
| run | `run-` + ULID | `run-01JA0D7F9G1H3J5K7M9N1P3Q5R` |

- ULIDs sort by creation time, which keeps episode folders and claim lists
  naturally ordered and makes ids carry a timestamp without a separate field.
- Ids are permanent. Renaming or moving a file never changes its id.
- Ids MUST be unique within a brain. Lint reports duplicates (usually a
  copied file) and `--fix` re-mints the id of the newer copy.

## 6. Notes

### 6.1 Frontmatter

```yaml
---
id: 01J9Z7Q2V8K3M4N5P6R7S8T9U0
type: decision
title: Use SQLite FTS5 for local search
status: active
aliases: [FTS5 decision]
tags: [search, storage]
created: 2026-10-07
updated: 2026-10-09
bw-part_of: "[[search]]"
bw-depends_on:
  - "[[SQLite version policy]] — needs the trigram tokenizer"
bw-conflicts_with:
  - "[[Vector-only search proposal]] (unless: embeddings enabled)"
bw-supersedes:
  - "[[Use ripgrep for search]]"
bw-claims:
  - "SQLite FTS5 is the default search backend. {id: c-01J9Z8A3QK7T0V5W2X4Y6Z8B1C; src: inbox/episodes/2026/10/01J9Z6B5N3M1K9H7G5F3D1S9A7.md#L4-L6; origin: agent; at: 2026-10-07}"
  - "Trigram search needs SQLite 3.34 or newer."
bw-claims-superseded:
  - "Search shells out to ripgrep. {id: c-01J8XQ4R6S8T0V2W4X6Y8Z0A2B; by: c-01J9Z8A3QK7T0V5W2X4Y6Z8B1C; at: 2026-10-07}"
---
```

| Field | Required | Values | Notes |
|---|---|---|---|
| `id` | yes in `strict`, minted by `lint --fix` | ULID | |
| `type` | no (default `note`) | lowercase string | Open vocabulary. Suggested: `note`, `hub`, `concept`, `decision`, `howto`, `reference`, `person`, `project`, `source`, `meeting`. |
| `title` | no | string | Default: first `# ` heading, else file name without `.md`. |
| `status` | no (default `active`) | `active` \| `superseded` \| `archived` | Closed set; the retrieval engine only reasons about these three. |
| `aliases` | no | list of strings | Same meaning as in Obsidian; used for link resolution and search. |
| `tags` | no | list of strings | Without `#`. |
| `created`, `updated` | no | ISO 8601 date or date-time | Writers set `updated` when they change a note. |
| `bw-stage` | no | string | Free workflow state (`draft`, `shipped`, `abandoned`…). Importers move non-standard `status` values here. |
| `bw-<verb>` | no | string or list of strings | Relations, one field per canonical verb (§6.4). |
| `bw-claims`, `bw-claims-superseded` | no | list of strings | Current claims, and claims that were superseded or retracted (§6.3). |

Any other scalar or list property MAY be present and is preserved and
stored (for example `source`, `url`, `author`). Fields reserved for future
use: `valid_from`, `valid_until`, `confidence`.

### 6.2 Body

```markdown
# Use SQLite FTS5 for local search

Free prose: context, summary, reasoning. Humans and agents may write
anything here.
```

The body is free Markdown with no reserved headings. Consolidation never
edits prose; it changes only `bw-` fields. Body links are `links_to` edges
(§6.5).

### 6.3 Claims

A claim is one string in `bw-claims`. A claim that was superseded or
retracted moves to `bw-claims-superseded`.

```text
claim      = text [ " " meta ]
meta       = "{" pair *( "; " pair ) "}"
pair       = key ": " value             ; value double-quoted when it holds ";"
key        = "id" | "status" | "by" | "reason" | "src" | "origin" | "inputs" | "at"
```

| Key | Meaning |
|---|---|
| `id` | Claim id. Present on every claim written by brain-wiki. Claims a human writes without metadata are valid; `lint --fix` can assign ids. |
| `status` | Only in `bw-claims-superseded`, and only as `retracted`; a superseded claim needs no status. |
| `by` | For superseded claims: the id of the claim that replaced it. |
| `reason` | Why the claim was superseded or retracted. |
| `src` | One or more comma-separated sources: `<brain path>#L<start>-L<end>` for episode spans, `<host>:<session>#T<start>-T<end>` for turns of an agent conversation, or a URL. |
| `origin` | `owner`, `agent`, `import`, or `system`, from the source episodes. |
| `inputs` | `external` or `unknown` when any source episode had external or unknown inputs. Omitted when `local`. |
| `at` | Date or date-time the claim was last asserted. |

Choices behind the form:

- **Strings, not nested objects.** Obsidian's Properties view shows and
  edits a list of strings but not nested mappings (§4), and one claim per
  line keeps diffs and model edits local.
- **A trailing `{…}` block.** It reads as metadata to people and is easy to
  split off. It counts as metadata only when it holds known keys, and
  writers replace braces inside claim text with parentheses.
- **A separate list for history.** `bw-claims` shows only what is current;
  the history of a fact stays in the note where the fact lives. Lint
  enforces that `by` points to an existing claim.

### 6.4 Relations

A relation is one string in a `bw-<verb>` field, one field per canonical
verb:

```yaml
bw-depends_on:
  - "[[SQLite version policy]] — needs the trigram tokenizer"
bw-conflicts_with: "[[Vector-only search proposal]] (unless: embeddings enabled)"
```

```text
field      = "bw-" verb ": " ( relation | list of relation )
verb       = canonical | alias                       ; table below
relation   = target [ " " qualifiers ] [ " " sep " " note ]
target     = "[[" link "]]" | "[" label "](" path ")"
qualifiers = "(" qualifier *( ", " qualifier ) ")"
qualifier  = word | key ( "=" | ": " ) value         ; e.g. supplies_to, weight=0.7, unless: x
sep        = "—" | "–" | "--" | "-"
```

**Canonical vocabulary.** Five families, eight verbs. The verb is always
written from the point of view of the note that holds the field.

| Family | Field on note A | Meaning | Inverse (on B) | Stored as | Guard |
|---|---|---|---|---|---|
| Containment | `bw-part_of: "[[B]]"` | A is a part, child, or member of B | `bw-has_part: "[[A]]"` | `A part_of B` | no |
| Dependency | `bw-depends_on: "[[B]]"` | A requires, builds on, or is caused by B | `bw-enables: "[[A]]"` | `A depends_on B` | no |
| Conflict | `bw-conflicts_with: "[[B]]"` | A contradicts B, or B is an exception that defeats A | `bw-conflicts_with: "[[A]]"` (symmetric) | `A conflicts_with B` | **yes** |
| Lineage | `bw-supersedes: "[[B]]"` | A replaces B; B is outdated | `bw-superseded_by: "[[A]]"` | `A supersedes B` | **yes** |
| Peer | `bw-related_to: "[[B]]"` | A and B are related without a stronger claim | `bw-related_to: "[[A]]"` (symmetric) | `A related_to B` | no |

Choices behind the table:

- **Explicit verbs, not positions.** Earlier designs used compass-style
  poles (up, down, same…). "Down" ended up meaning both "child" and
  "downstream effect", which sent propagation the wrong way. Plain verbs
  make direction obvious to people and models without reading a spec.
- **One canonical direction per family.** Either side may declare a
  relation; the index stores it once in canonical direction. This is what
  makes guard retrieval work no matter which note the author edited.
- **Domain meaning lives in qualifiers.** A finance note might write
  `bw-enables: "[[Cloud capex]] (supplies_to, weight=0.6, lag=1Q)"`, a legal
  note `bw-conflicts_with: "[[Clause 7.2]] (exception)"`, a research note
  `bw-depends_on: "[[Prior result]] (replicates)"`. The family drives retrieval
  and lint; the qualifier and note are stored and displayed but never
  change engine behavior. No vocabulary file to load, no compiler.
- **Guards are the reason typed relations exist.** See §7.

**Aliases.** The parser accepts alias fields (`bw-requires`, `bw-contains`…)
so people can write naturally, normalizes them, and records the alias as
the first qualifier. Lint (`migrate` profile: info; `strict`: warning)
suggests the canonical field, and `--fix` moves the item there.

| Alias | Canonical |
|---|---|
| `parent`, `child_of`, `member_of`, `in` | `part_of` |
| `contains`, `parent_of` | `has_part` |
| `requires`, `builds_on`, `uses`, `caused_by` | `depends_on` |
| `drives`, `causes`, `supports`, `unblocks` | `enables` |
| `contradicts`, `unless`, `invalidated_by`, `refutes`, `exception` | `conflicts_with` |
| `replaces`, `obsoletes` | `supersedes` |
| `replaced_by`, `obsoleted_by` | `superseded_by` |
| `related`, `see_also`, `similar_to`, `analogous_to` | `related_to` |

**Attributes.** `key=value` qualifiers are stored as attributes. Reserved
keys with defined types: `weight` (number in [-1, 1]), `sign` (`+`/`-`),
`lag` (string), `since`, `until` (dates), `unless` (string). Plugins MAY
interpret attributes (for example signed propagation over `depends_on`);
the core does not.

**Implicit containment.** A sub-topic's hub is `part_of` its parent
topic's hub because of where its folder sits (§2). The index stores this
like a written relation, so retrieval, `brain_neighbors`, and the map see the
topic tree; it has no line in any file, and writing it explicitly changes
nothing.

**Consistency rules** enforced by lint ([06](06-lint-and-reports.md)):

- If A `supersedes` B, then B's `status` SHOULD be `superseded`.
- A note MUST NOT supersede itself or form a supersession cycle.
- Contradictory declarations (A `part_of` B and B `part_of` A) are errors.

### 6.5 Links

Body links of either form are recognized:

- `[[target]]`, `[[target|label]]`, `[[target#heading]]`, `[[target#^block]]`
- `[label](relative/path.md)`, including `#heading` fragments
- `![[embed]]` embeds are recorded as links

Untyped body links are stored as `links_to` edges. They feed backlinks,
orphan detection, and the visualizer, but carry no retrieval rule.

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

## 7. Guard relations

Two families change what retrieval must return:

- **`supersedes`**: when a search or read returns a note that has been
  superseded, the superseding note MUST be returned with it, and the old
  note MUST be labeled as superseded. When the newer note is returned, the
  note it replaced is listed as history.
- **`conflicts_with`**: when either side is returned, the other side MUST
  be returned with it.

This holds regardless of which side declared the relation, of search
scores, and of result limits: guard neighbors are added on top of the
top-k results ([04](04-index-and-retrieval.md#5-guard-co-retrieval)).

Claim-level supersession (§6.3) stays out of the way: reads list current
claims and say how many were superseded or retracted, and superseded claims
are excluded from search snippets.

## 8. Topic hubs

A hub is the file named `layout.hub_filename` at the root of a topic
folder. Hubs give a person or an agent a one-page entry point.

```markdown
---
id: 01J9Z7M3…
type: hub
title: Search
bw-related_to: "[[storage]]"
---
# Search

How local search works in this project and why.

## Notes
- [[Use SQLite FTS5 for local search]]: why FTS5 over alternatives
- [[SQLite version policy]]: minimum versions and fallbacks
```

- Hubs have no length limit. Detail belongs in notes
  (`bw-part_of: "[[hub]]"`); the hub links them, one line each.
- A parent topic's hub need not list its sub-topics: the folder makes each
  sub-topic's hub `part_of` it (§2). A crowded topic splits into
  sub-topics.
- `## Notes` lists the topic's notes with a short gloss. It stays in the
  body because it is navigation people read, not data. `brain lint --fix`
  can add missing entries; it never removes lines a person wrote.

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
  ([05 §4.6](05-write-path-and-consolidation.md#46-origin-context)). They
  never hold file paths. An episode must be understandable on its own:
  hosts delete old transcripts, and transcripts stay on the device that
  produced them.
- `bw-dedupe` holds the writer's idempotency key
  ([05 §2.1](05-write-path-and-consolidation.md#21-ways-an-episode-is-written)).
  Episodes imported from documents carry `bw-source`, the original file
  and heading ([09 §6](09-import.md#6-to-episodes-and-from-agents)).
- The body is free Markdown. `## Claims`, `## Negative findings` (what was
  tried and did not work, so later agents do not repeat it), and
  `## Open questions` are suggested sections that consolidation prompts
  look for; none is required. Unlike a note, an episode keeps its claims
  in the body: it is raw capture that consolidation reads as text.
- Consolidation moves processed episodes to `archive/episodes/` with the
  same relative path. Archived episodes are kept as provenance: claim `src`
  references still resolve.
- Files dropped into `inbox/agents/<agent>/` by host-native memory features
  are treated as episodes by consolidation without needing frontmatter.
  Their origin is `agent` and their inputs are `unknown`. Consolidation
  archives them to `archive/agents/<agent>/` unchanged.

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
- Consolidation can never write `rules.md`. Rules are added by the user
  through the CLI, or by an agent through an MCP tool that the host gates
  with a user confirmation ([05 §6](05-write-path-and-consolidation.md#6-rules)).

## 11. `AGENTS.md`

`AGENTS.md` lets an agent that can only read files use the brain. It
contains a generated block between markers, and anything the user writes
outside the markers is preserved.

```markdown
<!-- brain-wiki:begin (generated; edit outside these markers) -->
# This folder is a brain-wiki brain
- Read `rules.md` first. Topics: (table of slug, title, description)
- To record something new, add `inbox/episodes/YYYY/MM/<ULID>.md` (or call
  `brain_log_episode`). To correct a note, edit it, then run `brain check <path>`
  and fix what it reports. Never edit `rules.md`, episodes, or `log.md`.
- Relations are `bw-<verb>` fields: part_of, depends_on, conflicts_with, …
<!-- brain-wiki:end -->
```

Agents that only read files have no profile of their own, so the block
follows `[agents.default]`: without `edit` in its `write` list, the
correction sentence becomes "Never edit `topics/` or `rules.md` directly;
consolidation folds episodes into notes." This matches the host instruction
block ([08 §3.2](08-agent-integrations.md#32-the-static-instruction-block)).

`brain lint --fix` and every consolidation run regenerate the block. Total
length is limited by `budgets.agents_md_max_lines`. When the topic table
would not fit, it is truncated to the most recently updated topics with a
pointer to the hubs.

## 12. `log.md`

An append-only, human-readable record of changes made by brain-wiki:

```markdown
## 2026-10-10T19:40:03Z · consolidate · run-01JA0D7F…
- agent: claude-code (backend: agent) · episodes: 6 → archived 6
- topics/search/fts5.md: +2 claims, 1 superseded, +1 relation
```

`log.md` is for people. Nothing depends on parsing it; undo uses machine
run records ([05 §8](05-write-path-and-consolidation.md#8-undo)).

## 13. Format versioning

- `format` in `brain.toml` is an integer: the newest file format the brain
  may contain. This document defines format 2.
- A tool MUST refuse to open a brain with a higher format than it supports.
  A best-effort read is not safe: an older reader ignores fields it does
  not know, such as `bw-claims`, and would show a note without its facts.
- A tool that writes files in a newer format first raises `format`. The
  change is one-way: undoing the run that raised it does not lower it,
  because other files in the new format may remain.
- Readers accept every older format. A format change ships with a fix that
  converts files, has a dry run, and writes one undo point.

**Format 1** kept claims and relations in the body, wrote `stage` without
the prefix, and wrote episode provenance without it:

```markdown
## Claims
- SQLite FTS5 is the default search backend. <!-- id:c-01J9…; src:…; at:2026-10-07 -->
- ~~Search shells out to ripgrep.~~ <!-- id:c-01J8…; status:superseded; by:c-01J9… -->

## Relations
- depends_on [[SQLite version policy]] — needs the trigram tokenizer
```

`## Claims` and `## Relations` were reserved headings, at most once each;
claims could wrap onto indented continuation lines. `brain lint --fix`
(BW116) converts such notes to format 2, and consolidation converts a note
before it edits it. Episodes keep format 1 because they are immutable.
