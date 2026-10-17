---
id: 01M3250V00RMYSF3XG5YMCKXK5
type: design
title: "Notes"
aliases: ["Brain format §6"]
source: "docs/design/brain-format.md#6-notes"
---
# Notes

Notes and topic pages (§8) share the rules in this section.


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

- Suggested `type` values: `note`, `topic`, `concept`, `decision`, `howto`,
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
  `brain lint` for the whole brain ([[lint-and-reports|lint]]).


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
| `superseded` | Replaced by a newer note, kept as history | Ranked lower, with a banner naming its replacement ([[index-and-search-5-supersession-guard\|index and search §5]]) |
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
([[d05-supersession-guard|D5]]).


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
  ([[write-path-22-harvesting-sessions|write path §2.2]]). It holds no
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
([[index-and-search-3-schema|index and search §3]]). Edges feed
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
