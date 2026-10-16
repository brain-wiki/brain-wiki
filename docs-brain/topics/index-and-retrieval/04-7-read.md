---
id: 01M3250V00PX93CEZYMV68ZKE1
type: design
title: "Read"
aliases: ["04 §7"]
tags: [index-and-retrieval]
source: "docs/design/04-index-and-retrieval.md#7-read"
---
# Read

`read(target, mode)` resolves `target` by id, path, file name, alias, or
title (02 §6.5); an ambiguous target returns the candidates instead of
guessing.

| Mode | Returns |
|---|---|
| `outline` (default for hubs) | Frontmatter summary, headings, active claims (each with its `inputs`, and `[unverified]` in the text when not `local`), relations with resolved titles |
| `full` (default for notes) | The body, then the current claims (unverified ones marked) and a count of superseded ones; no metadata |
| `section` | One heading's content; `claims` gives the claims block. Asking for a `section` implies this mode; the mode without a section, or a section with another mode, is a usage error |
| `raw` | The file exactly as on disk (for agents about to edit it, [[05-23-checked-agent-edits\|05 §2.3]]); an episode stays in its untrusted envelope |

Every relation and backlink in the result carries its handle: `id` and
`path` in the structured result, and the path after the title in the text,
so the next call is exact:

```
Relations:
- part_of "Gateway" (topics/gateway/index.md)
- depends_on "Upgrade bundled npm to 12.1.0" (topics/install/pr-…md)

Linked from:
- related_to "Kai Keller" (topics/people/person-kai-keller.md)
```

`full` mode appends the same handles after the note, below a `---` line,
since the file's own wikilinks carry no paths. Backlinks list typed
relations before plain links, at most 10, with a count and a pointer to
`brain_neighbors` for the rest.

Guard banners show at most three in full, then a count with a pointer to
`brain_neighbors` for the rest, so a note with many conflicts does not bury
its own content. Search results render their banners the same way.

Every mode except `raw` starts with banners computed by §5 (a `raw` read
still carries them in the structured result, but its text is the file alone):

```
⚠ SUPERSEDED by "Use SQLite FTS5 for local search" (topics/search/fts5.md), 2026-10-09
⚠ CONFLICTS WITH "Vector-only search proposal" (unless: embeddings enabled)
```

Claims whose `inputs` are `external` or `unknown` are shown with an
`[unverified]` marker, so an agent can weigh them accordingly.
