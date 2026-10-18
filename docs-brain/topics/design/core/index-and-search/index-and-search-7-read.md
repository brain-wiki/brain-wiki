---
id: 01M3250V006QKAECBGV8SFZJ9G
type: design
title: "Read"
aliases: ["Index and search §7"]
source: "docs/design/index-and-search.md#7-read"
---
# Read

`read(target, mode)` returns one note, topic page, or episode. The target is
matched by node id, path, or frontmatter id, then by the link resolution
order of [[brain-format-65-links|brain format §6.5]]. An ambiguous target
is an error that lists the candidates instead of guessing.

| Mode | Returns |
|---|---|
| `outline` (default for topic pages) | Summary, headings, links, and backlinks |
| `full` (default for notes and episodes) | The body, then link and backlink lists |
| `section` | One section's content |
| `raw` | The file exactly as on disk, for an agent about to edit it |

- The outline summary is the first paragraph that is not a heading, up to
  600 characters.
- `full` returns the body without frontmatter or HTML comments. For notes
  and topic pages it appends "Links:", "Parts:", and "Linked from:" lists
  below a `---` line, since the file's own wikilinks carry no paths.
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
  `relation` is the label seen from the note (§3), such as `depends_on`,
  `cites`, or `links_to`. `target` is the link as written. `id`, `title`,
  and `path` are null when it does not resolve. Metadata links come first,
  then body links in file order, one entry per target, so a field wins
  over a body link to the same note. Text shows 20, then a pointer to
  `brain_neighbors("<path>", direction="out")`.
- `parts`: items `{id, title, path}`, the notes that name this one in
  `bw-part_of`, sorted by title with the numbers in titles compared as
  numbers, so "2 Design" comes before "10 Rollout" and dated titles sort
  by date. The result keeps 50 and `parts_total` gives the full count.
  Text shows 20, then a pointer to `brain_search("", within="<path>")`. A
  part names its wholes in `links`, where `part_of` comes before body
  links.
- `backlinks`: items `{id, title, path, relation}`, where `relation` is
  the label seen from the target (§3), such as `supersedes` or
  `linked_from`. Parts are left out, since `parts` lists them. They come in
  the priority order of §3, the most recently updated first within each,
  one entry per note, at most 10. `backlinks_total` gives the full count,
  and text points to `brain_neighbors("<path>", direction="in")` for the
  rest.

An episode's result adds `agent`, `inputs`, `origin`, `session`, and
`origin_turns`.
