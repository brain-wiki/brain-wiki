---
id: 01M3250V006QKAECBGV8SFZJ9G
type: design
title: "Read"
aliases: ["Index and search §7"]
source: "docs/design/index-and-search.md#7-read"
---
# Read

`read(target, mode)` returns one note, hub, or episode. The target is
matched by node id, path, or frontmatter id, then by the link resolution
order of [[brain-format-65-links|brain format §6.5]]. An ambiguous target
is an error that lists the candidates instead of guessing.

| Mode | Returns |
|---|---|
| `outline` (default for hubs) | Summary, headings, links, and backlinks |
| `full` (default for notes and episodes) | The body, then link and backlink lists |
| `section` | One section's content |
| `raw` | The file exactly as on disk, for an agent about to edit it |

- The outline summary is the first paragraph that is not a heading, up to
  600 characters.
- `full` returns the body without frontmatter or HTML comments. For notes
  and hubs it appends "Links:" and "Linked from:" lists below a `---`
  line, since the file's own wikilinks carry no paths.
- `section` matches a heading's text, case-insensitively. Passing a
  section implies this mode. The mode without a section, or a section with
  another mode, is a usage error.
- An episode's content, in every mode, is wrapped in the
  `<untrusted-episode>` envelope.

Every mode except `raw` starts with the banners from §5. A `raw` read
still carries them in the structured result, but its text is the file
alone. An outline:

```
↳ supersedes "Use ripgrep for search" (topics/search/ripgrep.md).

# Use SQLite FTS5 for local search
decision · active · topics/search/fts5.md

Lumen searches notes with SQLite FTS5 instead of shelling out to ripgrep.

Sections: Use SQLite FTS5 for local search

Links:
- links_to "SQLite version policy" (topics/search/sqlite-versions.md)
Linked from:
- supersedes "Use ripgrep for search" (topics/search/ripgrep.md)
- linked_from "Search" (topics/search/index.md)
```

Every link and backlink carries its handle, the path after the title. In
the structured result, `outline` and `full` include:

- `links`: items `{relation, target, id, title, path, resolved}`.
  `relation` is `superseded_by`, `cites`, or `links_to`. `target` is the
  link as written. `id`, `title`, and `path` are null when it does not
  resolve. Metadata links come first, then body links in file order, one
  entry per target. Text shows 20, then a pointer to
  `brain_neighbors("<path>", direction="out")`.
- `backlinks`: items `{id, title, path, relation}`, where `relation` is
  `supersedes`, `cited_by`, or `linked_from`. Supersession comes first,
  then the most recently updated, one entry per note, at most 10.
  `backlinks_total` gives the full count, and text points to
  `brain_neighbors("<path>", direction="in")` for the rest.

An episode's result adds `agent`, `inputs`, `origin`, `session`, and
`origin_turns`.
