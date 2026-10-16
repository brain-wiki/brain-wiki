---
id: 01M3250V006QKAECBGV8SFZJ9G
type: design
title: "Read"
aliases: ["Index and search §7"]
source: "docs/design/index-and-search.md#7-read"
---
# Read

`read(target, mode)` resolves `target` by id, path, file name, alias, or
title (brain format §6.5); an ambiguous target returns the candidates instead of
guessing.

| Mode | Returns |
|---|---|
| `outline` (default for hubs) | The summary (the first paragraph, up to 600 characters), headings, links, and backlinks |
| `full` (default for notes) | The body without frontmatter or HTML comments, then the "Links:" and "Linked from:" handle lists below a `---` line |
| `section` | One heading's content, matched by heading text, case-insensitively. Asking for a `section` implies this mode; the mode without a section, or a section with another mode, is a usage error |
| `raw` | The file exactly as on disk, for agents about to edit it; an episode stays in its untrusted envelope |

Every mode except `raw` starts with the banners from §5 (a `raw` read still
carries them in the structured result, but its text is the file alone). An
outline:

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

Every link and backlink carries its handle: the path after the title in
the text, and in the structured result:

| Field | Items | Order and limit |
|---|---|---|
| `links` | `{relation, target, id, title, path, resolved}`; `relation` is `superseded_by`, `cites`, or `links_to`; `target` is the link as written; `id`, `title`, and `path` are null when it does not resolve | Metadata links first, then body links in file order; one entry per target. Text shows 20, then a pointer to `brain_neighbors("<path>", direction="out")` |
| `backlinks` | `{id, title, path, relation}`; `relation` is `supersedes`, `cited_by`, or `linked_from` | Supersession first, then most recently updated; one entry per note; at most 10, with `backlinks_total` and a pointer to `brain_neighbors("<path>", direction="in")` |

`full` mode carries the same `links` and `backlinks`; it appends the handle
lists to notes and hubs, since the file's own wikilinks carry no paths. An
episode's result adds its `agent`, `inputs`, `origin`, `session`, and
`origin_turns`.
