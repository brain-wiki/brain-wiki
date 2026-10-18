---
id: 01M3250V00KPVRC2SFWYC2GJHD
type: design
title: "Format versioning"
aliases: ["Brain format §13"]
source: "docs/design/brain-format.md#13-format-versioning"
---
# Format versioning

`format` in `brain.toml` is an integer, the newest file format the brain
may contain. This document defines format 4.

- A tool MUST refuse to open a brain with a higher format than it
  supports. A best-effort read is not safe. An older reader misreads
  fields whose meaning changed (format 3 reads `bw-depends_on` as an
  unknown field to remove), and its writers would put old-format content
  into a newer brain.
- A tool that writes files in a newer format MUST raise `format`. In
  brain-wiki, every run that writes a Markdown file other than `log.md`,
  and every episode write, raises it to the current version. The change is
  one-way. Undoing the run that raised it does not lower it, because other
  files in the new format may remain.
- Readers accept every older format. A format change ships with a fix
  that converts files, has a dry run, and writes one undo point.

**Format 3** had one relation field, `bw-superseded_by`. Its converter
wrote every other format 2 relation as a `## Related` bullet that starts
with the verb:

```markdown
## Related
- Depends on [[SQLite version policy]] — needs the trigram tokenizer
```

**Format 2** kept claims and typed relations in frontmatter lists, with
text after the link, inverse verbs (`bw-has_part`, `bw-enables`,
`bw-supersedes`), and aliases (`bw-requires`, `bw-contradicts`, …):

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

Lint reports a note in an older format as BW117, and `brain lint --fix`
converts it to format 4:

| Older format | Format 4 |
|---|---|
| `bw-claims` items, or format 1 `## Claims` items | `## Facts` bullets, text only |
| `bw-claims-superseded` items, or struck-through format 1 claims | `## History` bullets: `- ~~text~~ (reason)` |
| Claim `src` | `bw-sources` items |
| A format 2 `bw-part_of`, `bw-depends_on`, `bw-conflicts_with`, or `bw-superseded_by` item with text after the link, or one of their aliases | The link in the canonical field, and the whole item as a `## Relations` bullet |
| A format 2 `bw-has_part`, `bw-enables`, or `bw-supersedes` item on note A naming B | `bw-part_of`, `bw-depends_on`, or `bw-superseded_by` (with `status: superseded`) on B naming A, by a second BW117 fix; the item stays on A as a `## Relations` bullet |
| A format 2 `bw-related_to`, `caused_by`, or `causes` item | A `## Relations` bullet with a plain link |
| A format 2 relation item that does not parse | Moved unchanged to `## Relations` |
| A format 3 "Part of", "Depends on", or "Conflicts with" bullet under `## Related`, or one with an alias verb | The link in the field; the bullet stays where it is |
| A format 3 "Has part" or "Enables" bullet on A naming B | The field on B naming A, by a second BW117 fix; the bullet stays |
| Format 1 `## Relations` lines | Left as they are: prose with plain links |
| Unprefixed `stage` | `bw-stage` |

- Claim metadata (`id`, `origin`, `inputs`, `at`) is dropped. An episode
  path in `src` becomes a link, with `inbox/` mapped to `archive/` and
  `.md` and any `#…` fragment removed. URLs are kept, and conversation
  references (`host:session#T…`) are dropped. Items merge into an existing
  `bw-sources` without duplicates.
- A converted bullet starts with the relation's verb as a phrase, as in
  the example below. A format 2 `bw-part_of` item with text after it that
  names the page of the note's own topic is dropped; a link-only one is
  left to BW313. "The page of the note's own topic" means the page's
  path, the folder's name, or the topic's slug.
- A `bw-superseded_by` relation sets `status: superseded` only when the
  status was `active`.
- A link back to the declaring note uses its file name when unique, else
  its path.
- Format 3's `## Related` bullets are read only while the brain declares
  format 3 or older. The run that converts them raises the brain to
  format 4, after which `## Related` is ordinary prose. Format 3's
  "Supersedes" bullets need nothing: its converter already marked the
  replaced note. When every conversion was already in place,
  `brain lint --fix` raises the format by itself.

```markdown
---
bw-depends_on: "[[SQLite version policy]]"
---
## Facts

- SQLite FTS5 is the default search backend.

## History

- ~~Search shells out to ripgrep.~~ (too slow)

## Relations

- Depends on [[SQLite version policy]] — needs the trigram tokenizer
- Supersedes [[Use ripgrep for search]]
```

- Items are appended to an existing `## Facts`, `## History`, or
  `## Relations` section rather than adding a second one. A legacy section
  left empty is removed.
- All fixes form one undoable run, and `brain lint --fix --dry-run` shows
  the diff first. The run raises `format` to 4.
- Until a note is converted, the text of its format 2 claims stays
  searchable, and lint keeps reporting the conversion command.
- Episodes are immutable and are never converted. Readers accept their
  format 1 provenance names (§9), and their `## Claims` sections are body
  text.
