---
id: 01M3250V00M6MKZEWE6NXA99H5
type: design
title: "Data (Visualizer)"
aliases: ["12 §6"]
source: "docs/design/12-visualizer.md#6-data"
---
# Data (Visualizer)

`/api/world`:

```json
{
  "brain": "personal", "generated": "2026-10-11T18:00:00Z", "profile": "owner",
  "totals": {"topics": 250, "notes": 10250, "hubs": 250, "episodes": 200,
             "links": 29935, "flagged": 1925},
  "constellations": [{"id": "c1", "title": "Bispai · Ditpi · …", "color": "#6aa9ff",
                      "topics": ["bispai", "ditpi"]}],
  "topics": [{"slug": "search", "title": "Search", "description": "…", "parent": null,
              "color": "#6aa9ff", "constellation": "c1", "notes": 12,
              "hub": "01J9…", "updated": "2026-10-09", "recent": 3,
              "flags": {"stale": 2}, "flagged": 2}],
  "flows": [{"a": "search", "b": "storage", "total": 7,
             "rels": {"links_to": 6, "superseded_by": 1}}],
  "episodes": {"count": 200},
  "runs": [{"id": "run-01JA…", "kind": "consolidate", "at": "…", "episodes": 6,
            "topics": {"search": 3}, "touched": ["01J9…"]}]
}
```

- `recent`: notes updated in the last 7 days. `flows`: links between notes
  of two topics, counted by `rel`, `a` < `b`; each topic keeps its 8
  strongest.
- A constellation from the topic tree is titled by its top topic. A grouped
  one leads with its hub topic, one linked to at least half of the
  other topics in it (a plugins topic and each plugin); otherwise it names the
  largest topics. The map labels a constellation by its first topic.
  Topics carry their `parent` slug.

`/api/topic/<slug>`: `{slug, title, color, hub, nodes: [...], links: [...],
external: [...]}`. `nodes` use the node shape below; `links` are
`{source, target, rel}` with both ends in the topic; `external` are links
between this topic's notes and other topics (`{source, target, rel, topic,
title, dir}`, `dir` `out` or `in`, at most 400, metadata links first).

A link's `rel` is `links_to` (a body wikilink), `superseded_by` (from the old
note's `bw-superseded_by`: source old, target new), or `source` (a
`bw-sources` entry: source the citing note, target the cited note or
episode).

```json
{"id": "01J9Z7Q2…", "title": "Use SQLite FTS5 for local search", "path": "topics/search/fts5.md",
 "kind": "note", "topic": "search", "type": "decision", "status": "active",
 "updated": "2026-10-09", "aliases": [], "lines": 42, "degree": 7, "flags": ["stale"]}
```

`/api/note/<id>`: the outline read (`id`, `title`, `path`, `abs_path`,
`kind`, `type`, `status`, `topic`, `updated`, `banners`, `summary`) and
the note's links:

- `outlinks`: `[{relation, target, id, title, path, resolved}]`, one per
  target, metadata links first. `relation` reads from this note:
  `superseded_by`, `links_to`, or `cites` (a `bw-sources` entry); `target` is
  the link as written; an unresolved link has `id`, `title`, and `path` null.
- `backlinks`: `[{id, title, path, relation}]`, at most 10, supersession
  first. `relation` reads from this note: `supersedes` (that note names this
  one in `bw-superseded_by`), `linked_from`, or `cited_by`.

Then what the preview needs: `properties` (the
frontmatter, as written), `markdown` (the body after the frontmatter, at most 200 KB), and
`links` (wikilink text as written → `{id, title, topic}` for each target
that resolves; others are absent, so they render unresolved).
`/api/search?q=`: the index search (`{results: [{id, title, topic, kind,
snippet}]}`, at most 20).
`/api/health`: `{counts: {flag: n}, items: {flag: [{id, title, topic}]}}`,
at most 200 per flag.

`flags` come from the same queries as the reports
([[06-7-reports|06 §7]]): `superseded` (status
superseded), `stale` (an active note links to a superseded or archived note
other than one it replaced), `orphan` (no other note links to it), and
`lint_error`. The map lists them stale, superseded, orphan, lint error, and
a star's halo takes the first that applies.
