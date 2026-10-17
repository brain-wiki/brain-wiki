# brain-wiki file format (for direct edits)

Use this when you create or edit a note directly. Afterwards run
`brain_validate` (or `brain validate PATH…`) on what you changed and fix what
it reports. Never edit `rules.md`, `brain.toml`, `log.md`, `AGENTS.md`, or
anything under `inbox/`, `archive/`, or `reports/`.

## Notes

A note is an ordinary Markdown page under `topics/<topic>/`. Frontmatter
holds metadata only; what the note knows, and how it connects to other
notes, is in the body.

```markdown
---
id: 01J9Z7Q2V8K3M4N5P6R7S8T9U0
type: decision
title: Store Lumen attachments as files
tags: [storage]
bw-sources:
  - "[[archive/episodes/2026/10/01J9Z6B5N3M1K9H7G5F3D1S9A7]]"
  - "https://lumen.example/docs/attachments"
created: 2026-10-07
updated: 2026-10-09
---
# Store Lumen attachments as files

Lumen keeps attachments as files under attachments/, because backups of the
SQLite database with blobs became slow.

- Backing up the 4 GB database with blobs took about 20 minutes.
- Tried compressing blobs in SQLite: size dropped only 8%, backups stayed slow.
- Attachment paths are relative, which [[Obsidian compatibility]] requires.
- Deduplicating attachments by content hash is still open.

Replaces [[Store Lumen attachments as blobs]].
```

## Frontmatter

Values are scalars or lists of scalars; never nest mappings.

| Field | Required | Values |
|---|---|---|
| `id` | yes | A ULID, unique in the brain. Never change one, even when the file moves. For a new note, `brain validate` reports a fresh one to add (`brain lint --fix` adds it itself). |
| `type` | no (default `note`) | A lowercase word: `note`, `topic`, `decision`, `howto`, `person`, `project`, `reference`, … |
| `title` | no | Default: the first `# ` heading, else the file name |
| `aliases`, `tags` | no | Lists of strings, as in Obsidian |
| `status` | no (default `active`) | `active`, `superseded`, or `archived` |
| `bw-superseded_by` | only with `status: superseded` | One link, `"[[newer note]]"`, that resolves |
| `bw-sources` | no | A list of `"[[note or episode]]"` links or URLs |
| `bw-stage` | no | Free workflow state (`draft`, `in review`, …) |
| `created`, `updated` | no | ISO 8601 date or date-time; set `updated` when you edit |

- Any other property is the user's: leave it as it is.
- Other `bw-` fields are errors. Quote `bw-` link values.

## Body

Free Markdown. brain-wiki reads only its headings and links, never its
meaning. The recommended shape:

- **A summary paragraph first.** Search snippets and outlines show it.
- **One fact per bullet, specific**: numbers, versions, dates, names. What
  failed is a fact too.
- **Links inside sentences**, so the reason sits next to the link:
  `Trigram search needs SQLite 3.34; see [[SQLite version policy]].`
- To change a fact, edit its bullet; git keeps the history. Keep the user's
  prose, and do not reorder lines you are not changing.

Notes converted from brain-wiki 0.1 have `## Facts`, `## History` (struck
through), and `## Related` sections; keep using them in those notes.

## Supersession

When a newer note replaces an older one, mark the older note:

```yaml
status: superseded
bw-superseded_by: "[[Store Lumen attachments as files]]"
```

- Every search hit on the older note comes with the newer one; chains are
  followed to the newest.
- The newer note may link back to the one it replaced in its body.
- No cycles. Use `status: archived` for a note that is outdated with no
  successor.

## Sources

`bw-sources` says where the note's knowledge came from: an episode, another
note, or a URL. It covers the whole note, not single facts. Consolidated
episodes move to `archive/`, so cite the `archive/` path.

## Topics and topic pages

- A topic is a folder under `topics/` with a topic page, `index.md`. A note
  belongs to the topic of its folder.
- Topics nest: a folder with its own `index.md` inside a topic is a
  sub-topic. Folders without a topic page just organize notes.
- A topic page's `## Notes` list is navigation: add a line for a new note.
  `brain lint --fix` adds missing entries and never removes lines.
- To move or rename a note or a topic folder, use `brain mv SRC DST`, which
  also fixes links.

## Links

- `[[file name]]`, `[[file name|label]]`, `[[file name#heading]]`, or
  `[label](relative/path.md)`.
- Write file-name links so they also work in Obsidian.

## Older notes

Notes from brain-wiki 0.1 may hold `bw-claims`, `bw-claims-superseded`, or
`bw-<verb>` relation fields (format 2), or `## Claims` and `## Relations`
sections (format 1). Validation reports them as BW117. Do not convert them
by hand: `brain lint --fix --dry-run`, then `brain lint --fix`, moves facts
to `## Facts`, relations to `## Related`, and claim sources to `bw-sources`.

## Episodes

Episodes are the inbox, at `inbox/episodes/<YYYY>/<MM>/<ULID>.md`. Write
them with `brain_log_episode`, which sets the frontmatter.
Episodes are never edited after they are written.

```markdown
---
id: 01JA0C5D8E2F4G6H8J0K2M4N6P
type: episode
created: 2026-10-10T19:22:11Z
bw-agent: claude-code
bw-origin: agent
bw-inputs: unknown
bw-captured: mcp
bw-topics: [lumen]
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
sections; none is required. Episodes keep this format; they are not
converted.
