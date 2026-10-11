# 12 · Visualizer

Status: draft for review (second design; the first rendered every note at
once and did not scale past a few thousand)

## 1. Goals

`brain viz` opens a local, interactive map of a brain. It exists to help a
person **understand and audit** their brain:

| Question | What the view shows |
|---|---|
| What is in here? | Topics as nebulae grouped into constellations; zooming in reveals notes as stars |
| What is unhealthy? | Contradictions, stale dependents, orphans, unverified claims, over-budget hubs, lint errors |
| What changed recently? | Brightness by recency; recent consolidation runs, highlighted where they landed |
| What does a host see? | The same map filtered by a host's profile (`--as <host>`) |

Non-goals: editing notes, collaboration, public hosting. The view is
read-only and local.

Lessons from the first design (a 3D force graph of every note):

- Rendering 10k notes and 90k links at once is slow (19.5 MB of JSON, a
  global layout in the browser) and unreadable: overlapping labels and a
  hairball.
- A flat list of 250 topic checkboxes is not navigation.

The second design works like a map: it shows a little at every zoom level,
reveals detail as you approach, and keeps positions stable so places stay
where you left them. Every visual element encodes data; there is no
decoration for its own sake.

## 2. Levels (semantic zoom)

```
 Galaxy ──► Constellation ──► Topic ──► Note
 groups of     topics as        hub core,     one note in focus,
 topics        nebulae          notes as      its typed neighborhood
                                stars         lit, the rest dimmed
```

| Level | Shows | Loaded from |
|---|---|---|
| Galaxy | Constellations as glowing clusters with labels; aggregated flows between them; the inbox core at the center | `/api/world` |
| Constellation | Its topics as nebulae (size by notes, brightness by recency, red tint by open conflicts); flows between topics | `/api/world` |
| Topic | The hub as a bright core, notes as stars, typed relations as light trails; relations that leave the topic run toward the other topic's nebula | `/api/topic/<slug>` |
| Note | The note and its one-hop typed neighborhood lit, the rest dimmed; the inspector shows claims and guards | `/api/note/<id>` |

- **Detail by screen size, like a map.** A topic's stars load and appear
  when its nebula grows past a size threshold on screen, wherever the
  camera is; labels appear the same way, by priority (hubs, then flagged,
  then high-degree notes), with collision culling. At most 12 topics are
  revealed at once (nearest first); others fade back to nebulae.
- **Focus is separate from zoom.** Clicking selects a constellation, topic,
  or note: the camera flies there, the breadcrumb and inspector follow, and
  `Esc` goes up one level. Zooming out past a level's range also pops the
  focus up.
- **Constellations** come from the topic hierarchy once nested topics exist
  (the topic hierarchy design). For flat brains the server groups topics by their
  typed links (modularity clustering, deterministic), aiming for about
  √(topics) groups of 4–40 topics. A brain with 12 topics or fewer has one
  constellation and opens at the constellation level.

## 3. Rendering

- **three.js on WebGL2.** Nebulae are additive glow particles (one draw call
  for all topics); stars are instanced glow points with per-star size
  (√degree), color (topic hue), brightness (recency), ghosting
  (superseded or archived), and a halo ring per health flag, all in one
  shader. Trails are fat lines; directed relations carry a slow flow along
  the line (prerequisite → dependent, old → new).
- **Post-processing:** bloom, ACES tone mapping, vignette, depth fog, a
  starfield backdrop. Camera moves are eased flights, not jumps. Bloom and
  the constellation dust ease down at the topic and note levels, where the
  camera sits inside the glow and full strength would merge a cluster into
  one white blob.
- **Health mode** (`H`) recolors instead of only dimming: each topic nebula
  and constellation's dust takes a cool → amber → red tint by its flagged
  share, ranked against the other flagged topics so a brain where every
  topic has some flags still shows where the trouble concentrates. Unflagged
  topics turn grey and faint, flows fade, unflagged stars dim, and flagged
  stars show their halo rings. A legend explains the ramp, and the minimap
  uses the same colors.
- **Quality:** *High* (bloom, particles, flows) and *Low* (no
  post-processing, fewer particles), chosen from measured frame time and
  switchable in the dock. `prefers-reduced-motion` turns off flows and
  flights.
- **Layout is deterministic and local.** Constellations sit on a galactic
  disk (golden-angle spiral, collision-relaxed); topics sit on a spiral
  inside their constellation; notes are laid out per topic with a small
  force simulation (hub fixed at the center, typed links attract, seeded by
  note id). The same brain always produces the same map, and no layout ever
  spans the whole brain.
- **Encoding of relations:**

| Relation | Trail |
|---|---|
| `part_of` | Faint, toward the hub |
| `depends_on` | Blue, flowing prerequisite → dependent |
| `conflicts_with` | Red, always shown when either end is visible |
| `supersedes` | Amber, flowing old → new |
| `related_to` | Faint violet |
| Body links (`links_to`) | Hidden by default; a dock toggle |

## 4. HUD and navigation

Glass panels over the scene, keyboard-first:

| Region | Contents |
|---|---|
| Top bar | Brain name and profile, the breadcrumb (Galaxy › constellation › topic › note), search (`/` or `Ctrl/⌘-K`), totals (notes, links, flagged, inbox) |
| Left: navigator | Tabs: **Atlas** (constellations → topics tree with counts, health badges and recency bars; filter and sort by size, health, recency, name), **Health** (flagged notes grouped by flag, counts first), **Changes** (recent runs; selecting one highlights what it touched) |
| Right: inspector | Topic: description, counts, flag breakdown, busiest notes, strongest flows to other topics. Note: type, status and privacy chips, guard banners, claims (superseded struck through, unverified marked), relations by family, backlinks, path with copy and an `obsidian://` link |
| Bottom left | Minimap: top-down galaxy with the current view; click to fly |
| Bottom center | Layer dock: relation families, body links, health mode, labels, quality, reset view, help |
| Overlays | Hover card (title, topic, status, flags); command palette with server-side search results grouped by topic; `?` shows the shortcuts |

Keys: `/` or `Ctrl/⌘-K` search, `Esc` up one level or close, `H` health
mode, `L` labels, `[` and `]` previous and next topic, `R` reset view, `?`
help. The URL hash records the focus (`#/c/<id>`, `#/t/<slug>`,
`#/t/<slug>/n/<id>`), so browser back and forward work and a view can be
reopened.

## 5. Architecture

```
brain viz ─► local HTTP server on 127.0.0.1:<port> (stdlib, read-only)
          ─► opens http://127.0.0.1:<port>/?t=<token>
browser   ─► built app (index.html + assets/) ─► /api/world, /api/topic/<slug>,
             /api/note/<id>, /api/search?q=, /api/health
```

- **Session:** the first request carries the random token in the URL; the
  server answers with an `HttpOnly; SameSite=Strict` cookie holding it, so
  module chunks and API calls are authorized without putting the token in
  every URL. Every request needs the token (query) or the cookie, compared
  in constant time. Loopback only; exits after 30 minutes idle or on
  Ctrl-C.
- **Data:** the server builds the graph once (§6), caches it, and rebuilds
  it only when an index scan reports changes. World, health, and search
  requests check for changes; topic requests serve the cached graph, so a
  reveal never waits on a scan (about 120 ms at 10k notes) and matches the
  world the page loaded. The world payload stays small
  (topics, constellations, flows, totals: about 170 KB at 10k notes);
  topics load on demand.
- **Front end:** TypeScript, three.js, `camera-controls` for flights,
  `d3-force-3d` for per-topic layout, and Preact for the HUD, built with
  Vite from `viz-app/` into `src/brainwiki/viz/app/`. **The built bundle is
  committed**, so installing or running brain-wiki never needs Node; only
  people changing the visualizer do. CI rebuilds from `package-lock.json`
  and fails if the result differs from the committed bundle. The lockfile
  records public registry URLs only.
- **Exports:** `--export brain.html` writes one self-contained file: the
  same app with every asset inlined (CSP hashes) and the world plus every
  topic embedded; the inspector shows what the topic data carries, without
  claim text. `--export graph.json` and `--export graph.graphml` are
  unchanged, for other tools. Exports contain note titles; the command
  prints which privacy levels are included.

## 6. Data

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
- Constellation titles name their largest topics; the topic hierarchy will
  supply real names.

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
relations, backlinks). `/api/search?q=`: the index search for the viewer's
profile (`{results: [{id, title, topic, kind, snippet}]}`, at most 20).
`/api/health`: `{counts: {flag: n}, items: {flag: [{id, title, topic}]}}`,
at most 200 per flag.

`flags` come from the same queries as the reports
([06 §7](06-lint-and-reports.md#7-reports)): `conflict`, `stale`, `orphan`,
`unverified`, `over_budget`, `lint_error`. Hidden notes never appear in any
payload, count, flow, or search result.

## 7. Budgets

| Measure | Budget at 10k notes |
|---|---|
| `/api/world` size | < 300 KB |
| First frame after load | < 1.5 s |
| Topic reveal (fetch + layout + upload) | < 150 ms for a 50-note topic |
| Frame rate, integrated GPU, High quality | ≥ 50 fps at every level |

## 8. Safety

- Note-derived strings are rendered as text (Preact escapes; labels use
  `textContent`), never as HTML or Markdown.
- Content-Security-Policy: `default-src 'none'; script-src 'self';
  style-src 'self'; img-src 'self' data:; connect-src 'self'; worker-src
  'self'`. Exported HTML uses hashes for its inline script and style.
- Third-party code ships only inside the built bundle; `THIRD_PARTY_NOTICES`
  next to it carries the licenses of every bundled package (all MIT or
  ISC), regenerated by the build.

## 9. Testing

- Server: token or cookie required on every route; loopback only; CSP;
  every API shape on fixture brains; profile filtering (hidden notes absent
  from world, topic, flows, health, search).
- Constellations: deterministic, size limits, single constellation for
  small brains.
- Export: titles containing HTML and script are inert; CSP hashes match.
- Front end: type check and unit tests for layout determinism and level
  selection (`npm test`); the bundle-matches-source check.
- Browser: headless Chrome screenshots of each level on the fixture and a
  generated 10k brain, interaction scripts (search, fly to a topic, select a
  note, `Esc`), and frame time.

## 10. Alternatives considered

| Option | Why not |
|---|---|
| The first design: one 3D force graph of everything (`3d-force-graph`) | Did not scale: global layout and payload, hairball, no navigation. |
| 2.5D terrain atlas (topics as territories, notes as towns) | Easiest to navigate, but the galaxy keeps depth for separating dense clusters and matches the brain metaphor; both use the same levels and API. |
| No build step (vendored ES modules, hand-written JS) | Keeps contributors off Node, but a HUD of this size and custom shaders are much harder to maintain without types and a bundler; committing the bundle keeps users off Node anyway. |
| React | Preact gives the same model at a fraction of the size. |
| Obsidian's built-in graph | No typed relations, guards, or health flags; fine as a complement. |
| Server-side rendering to images | No interaction. |
