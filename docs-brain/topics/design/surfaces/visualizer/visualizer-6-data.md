---
id: 01M3250V004D9SFBFDSEPC2JXH
type: design
title: "Data"
aliases: ["Visualizer §6"]
source: "docs/design/visualizer.md#6-data"
---
# Data

`/api/world`:

```json
{
  "brain": "personal", "generated": "2026-10-11T18:00:00Z", "profile": "owner",
  "totals": {"topics": 250, "notes": 10250, "pages": 250, "episodes": 200,
             "links": 29935, "flagged": 1925},
  "constellations": [{"id": "c1", "title": "Bispai · Ditpi · …", "color": "#6aa9ff",
                      "topics": ["bispai", "ditpi"]}],
  "topics": [{"slug": "search", "title": "Search", "description": "…", "parent": null,
              "color": "#6aa9ff", "constellation": "c1", "notes": 12,
              "page": "01J9…", "updated": "2026-10-09", "recent": 3,
              "flags": {"stale": 2}, "flagged": 2}],
  "flows": [{"a": "search", "b": "storage", "total": 7,
             "rels": {"links_to": 6, "superseded_by": 1}}],
  "episodes": {"count": 200},
  "runs": [{"id": "run-01JA…", "kind": "consolidate", "at": "…", "episodes": 6,
            "topics": {"search": 3}, "touched": ["01J9…"]}]
}
```

- `recent` counts notes updated in the last 7 days.
- `flows` count the links between notes of two topics, by `rel`, with `a` < `b`. Each topic keeps its 8 strongest flows.
- `runs` lists the 20 most recent runs, leaving out failed and unfinished ones, with the notes each changed.
- A constellation's `title` joins up to three topic titles. A constellation from the topic tree leads with its top topic. A clustered one leads with a topic linked to at least half of the others in it, such as a plugins topic linked to one topic per plugin, or else with its largest topics. The map labels a constellation by its first topic.

`/api/topic/<slug>` returns `{slug, title, color, page, path, nodes, links, external}`:

- `path` is the topic's folder, which the map uses to place notes by sub-folder.
- `nodes` are the topic's notes and its topic page (kind `topic`), in the node shape below.
- `links` are `{source, target, rel}` with both ends in the topic.
- `external` are links between this topic's notes and other topics' notes, as `{source, target, rel, topic, title, dir}` with `dir` `out` or `in`. There are at most 400, metadata links first.

A link's `rel` is one of:

- `links_to`, a body wikilink.
- `superseded_by`, `conflicts_with`, `depends_on`, or `part_of`, from a relation field ([[brain-format-66-relations|brain format §6.6]]). The source is the note that holds the field: the old note, either note of a conflict, the dependent, or the part.
- `source`, a `bw-sources` entry. The source is the citing note and the target the cited note or episode.

A node:

```json
{"id": "01J9Z7Q2…", "title": "Use SQLite FTS5 for local search", "path": "topics/search/fts5.md",
 "kind": "note", "topic": "search", "type": "decision", "status": "active",
 "updated": "2026-10-09", "aliases": [], "lines": 42, "degree": 7, "flags": ["stale"]}
```

`/api/note/<id>` returns the outline read (`id`, `title`, `path`, `abs_path`, `kind`, `type`, `status`, `topic`, `updated`, `banners`, `summary`) and the note's links:

- `outlinks`: `[{relation, target, id, title, path, resolved}]`, one per target, metadata links first. `relation` reads from this note, with the labels of [[index-and-search-3-schema|index and search §3]]: a relation field's name such as `depends_on`, `links_to`, or `cites` (a `bw-sources` entry). `target` is the link as written, and an unresolved link has `id`, `title`, and `path` null.
- `backlinks`: `[{id, title, path, relation}]`, at most 10, typed relations first. `relation` reads from this note: `supersedes` (the other note names this one in `bw-superseded_by`), `conflicts_with`, `depended_on_by`, `has_part`, `linked_from`, or `cited_by`.

It also returns what the preview needs:

- `properties`: the frontmatter as written.
- `markdown`: the body after the frontmatter, at most 200 KB.
- `links`: a map from wikilink text as written to `{id, title, topic}` for each target that resolves. Other links are absent, so they render as unresolved.

`/api/search?q=` returns `{results: [{id, title, topic, kind, snippet}]}`, at most 20, from the mapped topics only. Notes whose title or alias contains the query come first, prefix matches before the rest, followed by index search hits with snippets.

`/api/health` returns `{counts: {flag: n}, items: {flag: [{id, title, topic}]}}`, at most 200 items per flag.

A node's `flags`:

| Flag | Meaning |
|---|---|
| `superseded` | Its status is superseded |
| `stale` | An active note that links to a superseded or archived note other than one it replaced; the same query as the stale report ([[lint-and-reports-7-reports\|lint §7]]) |
| `orphan` | A note that nothing else links to |
| `lint_error` | The index recorded a parse problem for the file |

The map lists the flags in the order stale, superseded, orphan, lint error, and a star's halo shows the first that applies.
