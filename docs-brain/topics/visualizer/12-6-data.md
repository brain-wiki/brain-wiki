---
id: 01M3250V00M6MKZEWE6NXA99H5
type: design
title: "Data (Visualizer)"
aliases: ["12 §6"]
tags: [visualizer]
source: "docs/design/12-visualizer.md#6-data"
bw-part_of:
  - "[[visualizer]]"
---
# Data (Visualizer)

`/api/world`:

```json
{
  "brain": "personal", "generated": "2026-10-11T18:00:00Z", "profile": "owner",
  "privacy": ["default", "sensitive"],
  "totals": {"topics": 250, "notes": 10250, "hubs": 250, "episodes": 200,
             "links": 29935, "flagged": 1925},
  "constellations": [{"id": "c1", "title": "Bispai · Ditpi · …", "color": "#6aa9ff",
                      "topics": ["bispai", "ditpi"]}],
  "topics": [{"slug": "search", "title": "Search", "description": "…",
              "color": "#6aa9ff", "constellation": "c1", "notes": 12,
              "hub": "01J9…", "updated": "2026-10-09", "recent": 3,
              "flags": {"conflict": 2}, "flagged": 2}],
  "flows": [{"a": "search", "b": "storage", "total": 7,
             "rels": {"depends_on": 5, "related_to": 2}}],
  "episodes": {"count": 200},
  "runs": [{"id": "run-01JA…", "kind": "consolidate", "at": "…", "episodes": 6,
            "topics": {"search": 3}, "touched": ["01J9…"]}]
}
```

- `recent`: notes updated in the last 7 days. `flows`: typed links between
  topics (body links excluded), `a` < `b`.
- Constellation titles lead with the group's hub topic, one typed-linked to
  at least half of the other topics in it (a portfolio and its tickers);
  otherwise they name the largest topics. The map labels a constellation by
  its first topic. The topic hierarchy will supply real names.

`/api/topic/<slug>`: `{slug, title, color, hub, nodes: [...], links: [...],
external: [...]}`. `nodes` use the node shape below; `links` are relations
with both ends in the topic; `external` are relations from this topic's notes
to other topics (`{source, target, rel, topic, title}`, at most 400, typed
first).

```json
{"id": "01J9Z7Q2…", "title": "Use SQLite FTS5 for local search", "path": "topics/search/fts5.md",
 "kind": "note", "topic": "search", "type": "decision", "status": "active",
 "privacy": "default", "updated": "2026-10-09", "aliases": [], "degree": 7,
 "claims": 5, "superseded_claims": 1, "unverified_claims": 0, "flags": ["conflict"]}
```

`/api/note/<id>`: the outline read (path, banners, summary, claims,
relations, backlinks), plus what the preview needs: `properties` (the
frontmatter, as written), `markdown` (the body after the frontmatter, at most 200 KB), and
`links` (wikilink text as written → `{id, title, topic}` for each target this
profile may see; others are absent, so they render unresolved). `/api/search?q=`: the index search for the viewer's
profile (`{results: [{id, title, topic, kind, snippet}]}`, at most 20).
`/api/health`: `{counts: {flag: n}, items: {flag: [{id, title, topic}]}}`,
at most 200 per flag.

`flags` come from the same queries as the reports
([[06-7-reports|06 §7]]): `conflict`, `stale`, `orphan`,
`unverified`, `over_budget`, `lint_error`. Hidden notes never appear in any
payload, count, flow, or search result.
