# 12 · Visualizer

Status: draft for review

## 1. Goals

`brain viz` opens a local, interactive 3D map of a brain. It exists to help
a person **understand and audit** their brain:

| Question | What the view shows |
|---|---|
| What is in here? | Topics as colored clusters, notes around their hubs, sized by connectedness |
| What is unhealthy? | Contradictions, stale dependents, orphans, unverified claims, over-budget hubs, lint errors |
| What changed recently? | Brightness by recency; replay of recent consolidation runs |
| What does a host see? | The same view filtered by a host's profile (`--as <host>`) |

Non-goals: editing notes, collaboration, public hosting. The view is
read-only and local.

Design constraint from earlier exploration: a default global force graph
of every note and every link turns into a hairball with a ring of
orphans and says nothing about health or change. The visualizer therefore
shows typed relations only by default, groups by topic, and puts
diagnostics and recency in the foreground. Decoration that is not tied to
real data (pulses, rotating meshes) is out.

## 2. Architecture

```
brain viz ─► export graph from the index (profile-filtered)
          ─► start a local HTTP server on 127.0.0.1:<random port>
          ─► open http://127.0.0.1:<port>/?t=<random token>
browser   ─► static page (vendored JS, no build step) ─► GET /api/graph, /api/note/<id>
```

- **Server:** Python standard library (`http.server.ThreadingHTTPServer`),
  read-only routes, every request must carry the session token (compared
  in constant time), strict Content-Security-Policy, exits after 30 minutes
  idle or on Ctrl-C.
- **Client:** the self-contained UMD build of `3d-force-graph` (MIT; about
  1.4 MB, 365 KB gzipped, with three.js bundled inside), its 2D sibling
  `force-graph` (MIT; about 170 KB) for low-end machines, and a small
  hand-written `app.js` and `app.css`. No Node toolchain, no CDN, works
  offline. Labels use the library's HTML tooltips rather than custom 3D
  text objects, which would need a second copy of three.js. The server sets
  MIME types explicitly, because some platforms override `.js` types from
  the system registry.
- **Exports:** `--export brain.html` writes a single self-contained file
  (data and scripts inlined) for offline viewing; `--export graph.json` and
  `--export graph.graphml` feed other tools (Gephi, Cytoscape, scripts).
  Exports contain note titles; the command prints which privacy levels are
  included.

## 3. Graph data

```json
{
  "brain": "personal",
  "generated": "2026-10-10T20:00:00Z",
  "profile": "owner",
  "topics": [{"slug": "search", "title": "Search", "color": "#4e79a7", "notes": 12}],
  "nodes": [{
    "id": "01J9Z7Q2…", "title": "Use SQLite FTS5 for local search",
    "kind": "note", "topic": "search", "type": "decision", "status": "active",
    "privacy": "default", "updated": "2026-10-09",
    "degree": 7, "claims": 5, "superseded_claims": 1, "unverified_claims": 0,
    "flags": ["conflict"]
  }],
  "links": [{"source": "01J9…", "target": "01J8…", "rel": "supersedes",
             "guard": true, "verb": "supersedes", "qualifier": null}],
  "runs": [{"id": "run-01JA…", "at": "2026-10-10T19:40:03Z",
            "episodes": 6, "touched": ["01J9…", "01JA…"]}]
}
```

`flags` come from the same queries as the reports ([06 §7](06-lint-and-reports.md#7-reports)):
`conflict`, `stale`, `orphan`, `unverified`, `over_budget`, `lint_error`.
Note bodies are not in the graph; the side panel fetches one note at a
time.

## 4. Visual encoding

| Element | Encoding |
|---|---|
| Topic | Hue; a clustering force pulls a topic's notes toward its hub |
| Hub | Larger node with a label always shown |
| Note size | √degree, clamped |
| Recency | Brightness: recently updated notes glow, old ones are dimmer (never invisible) |
| Superseded or archived | Translucent "ghost" node |
| Pending episodes | Small particles in a cloud at the center ("not yet consolidated"); hidden by default above 500 |
| `part_of` | Faint gray line |
| `depends_on` | Blue line with direction particles, prerequisite → dependent |
| `conflicts_with` | Red line, always visible |
| `supersedes` | Amber line with particles flowing old → new |
| `related_to` | Faint dashed line |
| Body links (`links_to`) | Hidden by default; toggle on |
| Diagnostics | A colored halo per flag; a "health" mode dims everything without a flag |

## 5. Interaction

- **Hover:** title, topic, status, flags.
- **Click:** side panel with path, status, guard banners, active claims (as
  plain text), relations, backlinks, and buttons to copy the path or open the
  note in Obsidian (`obsidian://open?path=…`) or the system editor.
- **Search:** filters and flies to matches by title or alias (client-side).
- **Filters:** topics, relation families, status, privacy levels, flags.
- **Focus mode:** shows only a note's one-hop typed neighborhood (at most 15
  nodes) laid out by family in fixed directions: containment up,
  dependencies down, conflicts left, peers right, history behind. No edge
  crossings, readable at a glance.
- **Replay:** animates the last N consolidation runs from run records:
  particles move from the inbox cloud to the notes each run touched, and
  new relations draw in.
- **2D toggle** and **reduced motion** (also honors the browser's
  `prefers-reduced-motion`: particles and camera motion off).

## 6. Scale

- Up to a few thousand nodes render directly.
- Above a configurable threshold (default 3,000 visible nodes), each topic
  collapses into a single cluster node until the user expands it, and body
  links stay hidden.
- Positions from the last session are cached in the browser's local
  storage per brain, so reopening does not re-run the layout from scratch.

## 7. Safety

- All note-derived strings are inserted with `textContent`, never as HTML.
  Claims and titles are not rendered as Markdown.
- Content-Security-Policy: `default-src 'none'; script-src 'self';
  style-src 'self'; img-src 'self' data:; connect-src 'self'`. Exported
  HTML uses the same policy with hashes for its inline scripts.
- Vendored files are pinned by version and SHA-256 in `scripts/vendor.lock`
  and checked in CI. The minified builds drop upstream license headers, so
  the package ships a `THIRD_PARTY_NOTICES` file with the full license text
  of the libraries and every dependency bundled inside them (MIT, ISC, and
  BSD-3-Clause), regenerated whenever the vendored versions change.

## 8. Testing

- Graph export: unit tests on fixture brains (nodes, links, flags, profile
  filtering).
- Escaping: titles and claims containing HTML and script render as text
  (checked by asserting the export and API responses never place
  note-derived strings in HTML contexts, and by a manual checklist).
- Server: token required on every route; binds to loopback only.
- Manual checklist per release: load a 10k-note generated brain, check
  frame rate, collapse behavior, focus mode, replay.

## 9. Alternatives considered

| Option | Why not |
|---|---|
| Obsidian's built-in graph | No typed relations, no guards, no health flags; fine as a complement. |
| A Node-built web app (React, bundler) | A second toolchain for contributors and a build step for releases, for a read-only view. |
| 2D-only (sigma.js, Cytoscape.js) | Good options and scale well; 2D is offered as a toggle. The 3D view is the default because it separates clusters better at a few thousand nodes. |
| Server-side rendering to images | No interaction. |
