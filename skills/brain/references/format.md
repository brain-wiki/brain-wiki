# brain-wiki file format (for direct edits)

Use this when you edit a note directly. Afterwards run `brain_check` (or
`brain check PATH`) on what you changed and fix what it reports. Never edit
rules, episodes, or log.md.

## Notes

A note is a Markdown file under `topics/`. Frontmatter values are scalars or
lists of scalars; never nest mappings. Claims and relations live in
frontmatter fields named `bw-…`; the body is free prose.

```markdown
---
id: 01J9Z7Q2V8K3M4N5P6R7S8T9U0
type: decision
title: Store Lumen attachments as files
status: active
tags: [storage]
created: 2026-10-07
updated: 2026-10-09
bw-part_of: "[[storage]]"
bw-supersedes:
  - "[[Store Lumen attachments as blobs]]"
bw-claims:
  - "Lumen stores attachments as files under attachments/. {id: c-01J9Z8A3QK7T0V5W2X4Y6Z8B1C; src: inbox/episodes/2026/10/01J9Z6B5N3M1K9H7G5F3D1S9A7.md#L4-L6; origin: agent; at: 2026-10-07}"
bw-claims-superseded:
  - "Lumen stores attachments as SQLite blobs. {id: c-01J8XQ4R6S8T0V2W4X6Y8Z0A2B; by: c-01J9Z8A3QK7T0V5W2X4Y6Z8B1C; at: 2026-10-07}"
---
# Store Lumen attachments as files

Free prose: context, reasoning. Anything may go here.
```

- Never change an `id`. Ids are permanent, even when a file moves.
- `status` is one of `active`, `superseded`, `archived`. Free workflow
  states go in `bw-stage`; a higher privacy level in `bw-privacy`.
- Write `bw-` values double-quoted, one list item per line. Other `bw-`
  fields than those listed here are errors.
- To move or rename a note, use `brain mv SRC DST`, which also fixes links.
- Topics nest: a folder with its own `index.md` hub inside a topic is a
  sub-topic, with its parent's privacy or stricter. Folders without a hub
  just organize notes. `brain mv` also moves a whole topic folder.

## Claims

One string in `bw-claims` per fact, with a trailing metadata block:

```yaml
bw-claims:
  - "<text> {id: …; src: …; origin: …; at: …}"
bw-claims-superseded:
  - "<old text> {id: …; by: <new claim id>; reason: …; at: …}"
```

| Key | Meaning |
|---|---|
| `id` | Claim id, `c-` plus a ULID. A claim you add may omit the block; `brain_check` adds one marking it as yours and unverified. |
| `src` | Sources, comma-separated: `<brain path>#L<start>-L<end>` for episode lines, `<host>:<session>#T<start>-T<end>` for turns of an agent conversation, or a URL. |
| `origin` | `owner`, `agent`, `import`, or `system`. |
| `taint` | `true` or `unknown` when a source was untrusted or unchecked; omitted when false. |
| `at` | Date or date-time the claim was last asserted. |
| `by` | For a superseded claim: the id of the claim that replaced it. |
| `status` | `retracted` for a claim that was wrong with no replacement; otherwise omitted. |
| `reason` | Why it was superseded or retracted. |

- To change a claim, supersede it: move the old item to
  `bw-claims-superseded` with `by:`, and add the new claim to `bw-claims`.
  Never reword or delete a claim in place; `brain_check` rejects that.
- Quote a value that contains `;` inside the block: `quote: "a; b"`.

## Relations

One string per relation, in the field for its verb, written from the point
of view of the note that holds it:

```yaml
bw-<verb>:
  - "[[target]] (<qualifier>, key=value) — optional note"
```

| Field on note A | Meaning | Inverse, on B | Retrieval guard |
|---|---|---|---|
| `bw-part_of: "[[B]]"` | A is a part, child, or member of B | `bw-has_part` | no |
| `bw-depends_on: "[[B]]"` | A requires, builds on, or is caused by B | `bw-enables` | no |
| `bw-conflicts_with: "[[B]]"` | A contradicts B, or B is an exception to A | `bw-conflicts_with` | yes |
| `bw-supersedes: "[[B]]"` | A replaces B; B is outdated | `bw-superseded_by` | yes |
| `bw-related_to: "[[B]]"` | Related, without a stronger claim | `bw-related_to` | no |

- Declare a relation on either side; never on both with different verbs.
- Guard relations are always shown together with the notes they qualify.
- If A `bw-supersedes` B, set B's `status: superseded`.
- Put conditions and domain meaning in qualifiers:
  `bw-conflicts_with: "[[Vector-only search]] (unless: embeddings enabled)"`.
  Reserved keys: `weight` (−1 to 1), `sign` (`+`/`-`), `lag`, `since`,
  `until`, `unless`.
- Accepted synonym fields (`bw-requires`…), which lint moves to the
  canonical field:

| Synonyms | Canonical |
|---|---|
| `parent`, `child_of`, `member_of`, `in` | `part_of` |
| `contains`, `parent_of` | `has_part` |
| `requires`, `builds_on`, `uses`, `caused_by` | `depends_on` |
| `drives`, `causes`, `supports`, `unblocks` | `enables` |
| `contradicts`, `unless`, `invalidated_by`, `refutes`, `exception` | `conflicts_with` |
| `replaces`, `obsoletes` | `supersedes` |
| `replaced_by`, `obsoleted_by` | `superseded_by` |
| `related`, `see_also`, `similar_to`, `analogous_to` | `related_to` |

Older notes may still hold `## Claims` and `## Relations` sections (format
1). They work as before; `brain lint --fix` converts them.

## Links

- `[[file name]]`, `[[file name|label]]`, `[[file name#heading]]`, or
  `[label](relative/path.md)`.
- Write file-name links so they also work in Obsidian.

## Episodes

Episodes are the inbox, at `inbox/episodes/<YYYY>/<MM>/<ULID>.md`. Prefer
`brain_log_episode` or `brain log`, which set the frontmatter for you.
Episodes are never edited after they are written.

```markdown
---
id: 01JA0C5D8E2F4G6H8J0K2M4N6P
type: episode
created: 2026-10-10T19:22:11Z
bw-agent: claude-code
bw-origin: agent
bw-taint: unknown
bw-captured: mcp
bw-topics: [lumen]
bw-privacy: default
---
Moved Lumen's attachments out of SQLite after backups became slow.

## Claims
- Backing up the 4 GB database with blobs took about 20 minutes.

## Negative findings
- Compressing blobs in SQLite cut size by only 8%.

## Open questions
- Should attachments be deduplicated by content hash?
```

`## Claims`, `## Negative findings`, and `## Open questions` are suggested
sections; none is required. An episode keeps its claims in the body.
