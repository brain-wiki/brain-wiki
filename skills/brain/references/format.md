# brain-wiki file format (for hand edits)

Use this only when the user asks you to edit a brain file by hand. After
editing, run `brain lint PATH` and fix what it reports.

## Notes

A note is a Markdown file under `topics/`. Frontmatter values are scalars or
lists of scalars; never nest mappings.

```markdown
---
id: 01J9Z7Q2V8K3M4N5P6R7S8T9U0
type: decision
title: Store Lumen attachments as files
status: active
tags: [storage]
created: 2026-10-07
updated: 2026-10-09
---
# Store Lumen attachments as files

Free prose: context, reasoning. Anything may go here.

## Claims
- Lumen stores attachments as files under attachments/. <!-- id:c-01J9Z8A3QK7T0V5W2X4Y6Z8B1C; src:inbox/episodes/2026/10/01J9Z6B5N3M1K9H7G5F3D1S9A7.md#L4-L6; origin:agent; at:2026-10-07 -->
- ~~Lumen stores attachments as SQLite blobs.~~ <!-- id:c-01J8XQ4R6S8T0V2W4X6Y8Z0A2B; status:superseded; by:c-01J9Z8A3QK7T0V5W2X4Y6Z8B1C; at:2026-10-07 -->

## Relations
- part_of [[storage]]
- supersedes [[Store Lumen attachments as blobs]]
```

- Never change an `id`. Ids are permanent, even when a file moves.
- `status` is one of `active`, `superseded`, `archived`.
- `## Claims` and `## Relations` are reserved headings, at most once each.
  All other headings are free.
- To move or rename a note, use `brain mv SRC DST`, which also fixes links.

## Claims

One list item under `## Claims` per fact:

```text
- <text> <!-- id:…; src:…; origin:…; at:… -->
- ~~<old text>~~ <!-- id:…; status:superseded; by:<new claim id>; at:… -->
```

| Key | Meaning |
|---|---|
| `id` | Claim id, `c-` plus a ULID. A claim you add by hand may omit the comment; `brain lint --fix` can assign an id. |
| `src` | Sources, comma-separated: `<brain path>#L<start>-L<end>` for episode lines, `<host>:<session>#T<start>-T<end>` for turns of an agent conversation, or a URL. |
| `origin` | `owner`, `agent`, `import`, or `system`. |
| `taint` | `true` or `unknown` when a source was untrusted or unchecked; omitted when false. |
| `at` | Date or date-time the claim was last asserted. |
| `status` | Omitted when active; `superseded` or `retracted`. |
| `by` | For a superseded claim: the id of the claim that replaced it. |

- Keep the whole comment on the last line of the item. A claim may wrap onto
  continuation lines indented by two or more spaces.
- Never delete a superseded claim; it stays struck through as history.

## Relations

One list item under `## Relations`, written from the point of view of the
note that contains it:

```text
- <verb> [[target]] (<qualifier>, key=value) — optional note
```

| Verb on note A | Meaning | Inverse, written on B | Retrieval guard |
|---|---|---|---|
| `part_of [[B]]` | A is a part, child, or member of B | `has_part [[A]]` | no |
| `depends_on [[B]]` | A requires, builds on, or is caused by B | `enables [[A]]` | no |
| `conflicts_with [[B]]` | A contradicts B, or B is an exception to A | `conflicts_with [[A]]` | yes |
| `supersedes [[B]]` | A replaces B; B is outdated | `superseded_by [[A]]` | yes |
| `related_to [[B]]` | Related, without a stronger claim | `related_to [[A]]` | no |

- Declare a relation on either side; never on both with different verbs.
- Guard relations are always shown together with the notes they qualify.
- If A `supersedes` B, set B's `status: superseded`.
- Put conditions and domain meaning in qualifiers:
  `- conflicts_with [[Vector-only search]] (unless: embeddings enabled)`.
  Reserved keys: `weight` (−1 to 1), `sign` (`+`/`-`), `lag`, `since`,
  `until`, `unless`.
- Accepted synonyms, which lint rewrites to the canonical verb:

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
agent: claude-code
origin: agent
taint: unknown
captured: mcp
created: 2026-10-10T19:22:11Z
topics: [lumen]
privacy: default
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
sections; none is required.
