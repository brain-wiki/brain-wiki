# Visualizer

Status: draft for review (second design; the first rendered every note at
once and did not scale past a few thousand)

## 1. Goals

`brain viz` opens a local, interactive map of a brain. It exists to help a
person **understand and audit** their brain:

| Question | What the view shows |
|---|---|
| What is in here? | Topics as nebulae grouped into constellations; zooming in reveals notes as stars |
| What is unhealthy? | Superseded notes, notes that still link to them, orphans, lint errors |
| What changed recently? | Brightness by recency; recent consolidation runs, highlighted where they landed |

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
 topics        nebulae          notes as      its linked neighborhood
                                stars         lit, the rest dimmed
```

| Level | Shows | Loaded from |
|---|---|---|
| Galaxy | Constellations as glowing clusters with labels; aggregated flows between them; the inbox core at the center | `/api/world` |
| Constellation | Its topics as nebulae (size by notes, brightness by recency); flows between topics | `/api/world` |
| Topic | The hub as a bright core, each sub-folder as a labeled branch (its note count) with notes around it, links between notes as light trails; links that leave the topic run toward the other topic's nebula | `/api/topic/<slug>` |
| Note | The note and the notes it links to or is linked from lit, the rest dimmed; the inspector shows its banners, links, and backlinks | `/api/note/<id>` |

- **Detail by screen size, like a map.** A topic's stars load and appear
  when its nebula grows past a size threshold on screen, wherever the
  camera is; labels appear the same way, by priority (hubs, then flagged,
  then high-degree notes and the stars biggest on screen), with collision
  culling. Every star in view competes, so zooming into a crowd of short
  notes labels them as they grow. Map labels name their units ("82 notes",
  "82 notes · 3 with issues", "5 session captures"). At most 12 topics are
  revealed at once (nearest first); others fade back to nebulae.
- **Zooming changes the level, like a map.** Scrolling in on a
  constellation enters it once it fills about a quarter of the screen;
  scrolling in on a topic enters it at about a fifth; scrolling out leaves
  below a smaller size (hysteresis, so the level does not flicker); panning
  to a neighbor at the same zoom switches to it. The breadcrumb, inspector,
  flows, and rendering follow, the camera stays where the user put it, and
  the change replaces the current history entry instead of adding one.
  Clicking still selects directly: the camera flies there and a history
  entry is added. A selected note stays selected while its topic is on
  screen. `Esc` goes up one level.
- **Constellations** come from the topic tree (brain format §2): each top-level topic
  that has sub-topics is a constellation of itself and everything below it,
  named by its title. The remaining topics, and every topic of a flat brain,
  are grouped by the links between their notes (modularity clustering, deterministic),
  aiming for about √(topics) groups of 4–40 topics. A brain with 12 topics or
  fewer has one constellation and opens at the constellation level.

## 3. Rendering

- **three.js on WebGL2.** Nebulae are additive glow particles (one draw call
  for all topics); stars are instanced glow points with per-star size
  (how much the note holds: the fourth root of its lines), color (topic
  hue), brightness (recency), ghosting
  (superseded or archived), and a halo ring per health flag, all in one
  shader. Trails are solid fat lines; supersession adds slow pulses running
  along them (old → new), so motion shows direction without breaking the
  line into dashes.
- **Post-processing:** bloom, ACES tone mapping, vignette, depth fog, a
  starfield backdrop. Camera moves are eased flights, not jumps.
- **Navigation is a 2.5D map,** not a free 3D camera: the view keeps a fixed
  tilt and heading, dragging pans across the galactic plane, and the wheel
  or a trackpad pinch zooms toward the point of the map under the cursor
  (the look target stays on the map's level, so a zoom never stalls in empty
  space above it); a touchscreen pinch zooms toward the middle of the view.
  Depth still separates dense clusters,
  but nobody gets lost upside down. Bloom and
  the constellation dust ease down at the topic and note levels, where the
  camera sits inside the glow and full strength would merge a cluster into
  one white blob.
- **Highlight issues** (`I`, formerly health mode) recolors instead of only dimming: each topic nebula
  and constellation's dust takes a cool → amber → red tint by its flagged
  share, ranked against the other flagged topics so a brain where every
  topic has some flags still shows where the trouble concentrates. Unflagged
  topics turn grey and faint, flows fade, unflagged stars dim, and flagged
  stars show their halo rings. A legend explains the ramp, and the minimap
  uses the same colors.
- **Graphics:** *Low* (the default) draws the scene without post-processing;
  *High* adds bloom, the vignette, and grain; *Auto* skips the first 1.5 s
  after load (shader compiles, topic loads), samples 2.5 s of frames, and
  picks Low when the median frame takes longer than 1/30 s. The choice lives
  in the dock's ⋯ menu and is remembered by the browser; `?quality=` in the
  URL overrides it. `prefers-reduced-motion` turns off flows and flights.
- **No WebGL2** (hardware acceleration off, a remote desktop or VM without
  a GPU): the stage says why the map could not start and how to check, and
  the topic list, search, and details panel keep working without the scene.
- **Server errors.** A note or topic that is gone or fails to load says so
  in its panel instead of loading forever. When `brain viz` stops, the map
  backs off from topics it could not fetch (up to a minute) and a toast
  says the connection was lost; a start-up failure says whether the server
  is unreachable or the link's token is wrong. A mangled link opens the
  overview.
- **Layout is deterministic and local.** Constellations sit on a galactic
  disk (golden-angle spiral, collision-relaxed); topics sit on a spiral
  inside their constellation, a parent topic at the center of the
  constellation its sub-topics form; notes are gathered per topic by gravity
  and linked by folder, facing the camera, with no outlines. Each folder's
  own notes form a star cluster: the folder note (at the top, the topic
  index) at the core, the rest on a projected Plummer profile in order of
  length, so the core is dense, the halo sparse, and long notes sink to the
  middle. Each note's direction is random but seeded by its id, so stars
  clump instead of spacing out evenly; links between notes of one folder pull
  them together while gravity holds each at its depth, and close neighbors
  push apart. A note's room grows with its length (radius with the fourth
  root of its lines). The folder's sub-folders orbit that core, each in a
  wedge of its own, the largest first; an empty wedge keeps the way in from
  the parent clear. A line runs from each folder's core to its parent's, and
  since every folder stays inside its wedge, no link crosses another or runs
  through a folder it does not join. Each nesting level sits one tier farther
  back from the camera, straight along the view, so depth never moves a star
  on screen. Links are drawn but do not move stars outside their
  folder. The same brain always produces the same map, and no layout ever
  spans the whole brain.
- **Labels say what things are.** The galaxy is the look, not the vocabulary:
  the interface says Overview, Group (of topics), Topic, and Note, never
  galaxy or constellation; *issues*, not flags; *session captures*, not
  episodes; *Sources*, not `bw-sources`; the topic index, not the hub. Links
  read as plain verbs (Links to, Replaced by, Cites; from the other end: links
  here, replaced by this, cites this), and every number names its unit.
- **The hierarchy follows the folders.** Inside a topic, the map's tree is
  the folder tree, as Obsidian shows it: a sub-folder is a branch, and its
  folder note (`x/x.md`, `x/index.md`, or `x/readme.md`) is its core, where
  its links meet; a folder without one is still a cluster, with its longest
  note at the core, or, when it holds only sub-folders, an empty junction.
  Each folder is labeled just above its topmost note. A folder's label
  drops the leading ` · ` parts its parent folders' titles already say
  ("Lumen guide · Sync · Conflicts" reads "Conflicts"). A link to a note in
  another folder is a link, not the note's place.
- **Encoding of links.** The folder tree is always drawn: one line from each
  folder's core to its parent's, brighter at the parent end; a note's place
  in its folder's cluster says which folder holds it. Links between notes
  form three families, each a dock chip, all on by default:

| Family (dock chip) | From | Trail |
|---|---|---|
| **Links** | A wikilink in the body (`links_to`) | Faint violet: the main structure |
| **Replaces** | `bw-superseded_by` (`superseded_by`) | Amber, flowing old → new |
| **Sources** | A `bw-sources` entry (`source`) | Muted grey-blue, faint, citing → cited |

## 4. HUD and navigation

Glass panels over the scene, keyboard-first:

| Region | Contents |
|---|---|
| Top bar | Brain name and profile; back, forward, and a history list of everything opened in this tab; the breadcrumb (Overview › group › parent topics › topic › folders › note); search (`/` or `Ctrl/⌘-K`); totals (topics, notes, links, *with issues*, *inbox*), where *with issues* opens the Issues tab and *inbox* says what is waiting to be merged |
| Left panel: browse | Tabs: **Topics** (groups → topics, sub-topics nested under their parent; a group opens when you enter it, and its chevron or a second click on it closes it; with "N topics · N notes" and "N notes" counts, issue badges and recency bars; filter, and sort by name (the default; case aside, numbers in order), most notes, most issues, or recently changed, groups and topics alike), **Issues** (notes with issues grouped by kind, counts first, and the switch that highlights them on the map), **Activity** (recent recorded changes; selecting one highlights the notes it changed) |
| Right panel: details | Always shown, headed **Details**; with nothing selected it says how to fill it. A group: its topics. A topic: description, counts (notes, changed 7d, with issues, last change), issue breakdown, **Open the topic index**, **Sub-topics** and **Folders** (each with its note count, clickable), **Most connected** notes (with link counts; hidden for topics of five notes or fewer), **Linked topics**. A note: where it lives ("In Guide › Sync › …"), type and status chips, issue chips, banners (a superseded note's warning; the notes it replaces), the summary, **Links** (the note's outlinks grouped as Replaced by, Links to, Cites; a resolved one flies to its note, an unresolved one says *not found*, one outside the map's topics says *not on the map*), **Linked from** (backlinks, each with how it links: replaced by this, links here, cites this), path with copy and an `obsidian://` link |
| Right: note preview | Clicking a note (a star, a row, a search result, a wikilink) also opens its preview over the inspector: the note rendered like Obsidian's reading view, with properties from the frontmatter, then the body (headings, lists and tasks, tables, code, callouts, highlights, tags, footnotes). Wikilinks open the linked note and move the map with it, in the body and in property values alike (so `bw-superseded_by` and each `bw-sources` entry are links); links the viewer may not see show as unresolved. `Esc` closes it, `P` toggles it |
| Bottom left | Minimap: top-down galaxy with the current view; click to fly. Beside it, the zoom ladder: Overview, Group, Topic, Note, with the current level and its place named, a marker that creeps toward the next level as you scroll, and earlier levels clickable |
| Bottom center | Layer dock: one chip per link family (the legend and the filter; a hidden family shows a hollow swatch and a struck label), health mode, a ⋯ menu (labels, Graphics: Auto, High, Low), and help. Going back to the overview is the breadcrumb's first crumb or `O` |
| Overlays | Hover card: for a star its title, topic, status, and flags; for a trail the two notes it connects, read as a sentence ("2026.9.9 supersedes 2026.9.8"), with the trail and both ends lit, and a click goes to the other end; for a flow the two topics and the link count, by kind when not all are body links. Command palette with server-side search results grouped by topic; `?` shows the shortcuts |

Keys come from one table that drives both the handler and the shortcuts
sheet (`?`), which shows them as each platform writes them (⌥ and ⌘ on a
Mac, Alt and Ctrl elsewhere):

| Section | Keys | Does |
|---|---|---|
| Move | `Ctrl-↑` / `Ctrl-↓` (⌘ on a Mac) | Up or down one level along the breadcrumb: note, folder, topic, parent topic, group, overview. Down retraces the way up, else enters the biggest place inside |
| Move | `[` / `]` | Previous or next place under the same parent, in the order down uses |
| Move | `O` | Overview |
| Move | `Alt-←` / `Alt-→` (⌘ on a Mac) | The browser's own back and forward |
| Move | `Esc` | Close what is open; otherwise up one level |
| Show | `P`, `I`, `L` | Note preview; highlight issues; labels |
| Show | `1`–`3` | Show or hide a kind of line, in the order of the dock |
| Find | `/` or `Ctrl-K` (⌘ on a Mac) | Search |

Only `Esc` and `Ctrl/⌘-K` work while typing in a field, so `Ctrl/⌘-↑` and `-↓` still move the caret there. The sheet keeps
mouse gestures and how to read the map (star size, brightness, rings,
pulses) in sections of their own. The URL hash records the focus (`#/c/<id>`,
`#/t/<slug>`, `#/t/<slug>/n/<id>`), so a view can be reopened. Every place
opened becomes a browser history entry tagged with its position in the tab's
trail, so the top bar's back and forward buttons, the history list, `Alt-←`
and `Alt-→`, and the browser's own buttons all move through the same stack;
the trail survives a reload of the tab.

## 5. Architecture

```
brain viz ─► local HTTP server on 127.0.0.1:<port> (stdlib, read-only; --host to widen)
          ─► opens http://127.0.0.1:<port>/?t=<token>
browser   ─► built app (index.html + assets/) ─► /api/world, /api/topic/<slug>,
             /api/note/<id>, /api/search?q=, /api/health
```

- **Session:** the first request carries the random token in the URL; the
  server answers with an `HttpOnly; SameSite=Strict` cookie holding it, so
  module chunks and API calls are authorized without putting the token in
  every URL. Every request needs the token (query) or the cookie, compared
  in constant time. Exits after 30 minutes idle or on Ctrl-C.
- **Address:** loopback by default. `--host ADDRESS` listens elsewhere, so
  the map can be opened from another machine (`0.0.0.0` or `::` for every
  interface); the server then prints a second URL with the machine's
  hostname and warns on stderr (§8).
- **Data:** the server builds the graph once (§6), caches it, and rebuilds
  it only when an index scan reports changes. World, health, and search
  requests check for changes; topic requests serve the cached graph, so a
  reveal never waits on a scan (about 120 ms at 10k notes) and matches the
  world the page loaded. The world payload stays small
  (topics, constellations, flows, totals: about 170 KB at 10k notes);
  topics load on demand.
- **Front end:** TypeScript, three.js, `camera-controls` for flights, and
  Preact for the HUD, built with Vite. The source is its own repository, **brain-wiki-viz**, so front-end
  work and its Node toolchain stay out of this one. **Only the built bundle
  is committed here**, in `src/brainwiki/viz/app/`, so installing or running
  brain-wiki never needs Node. `BUILD_INFO.json` next to the bundle names the
  brain-wiki-viz commit it was built from; CI rebuilds that commit from its
  `package-lock.json` (public registry URLs only) and fails if the result
  differs. The API in §6 is the contract between the two repositories: a
  change to it lands here first, then in brain-wiki-viz, then as a new
  bundle.
- **Exports:** `--export brain.html` writes one self-contained file: the
  same app with every asset inlined (CSP hashes) and the world plus every
  topic embedded; the inspector shows what the topic data carries (links
  and backlinks among the mapped notes, no summary or banners) and says note
  text is not included.
  `--export graph.json` and `--export graph.graphml` are unchanged, for
  other tools. Exports contain every note title.

## 6. Data

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
([lint §7](lint-and-reports.md#7-reports)): `superseded` (status
superseded), `stale` (an active note links to a superseded or archived note
other than one it replaced), `orphan` (no other note links to it), and
`lint_error`. The map lists them stale, superseded, orphan, lint error, and
a star's halo takes the first that applies.

## 7. Budgets

| Measure | Budget at 10k notes |
|---|---|
| `/api/world` size | < 300 KB |
| First frame after load | < 1.5 s |
| Topic reveal (fetch + layout + upload) | < 150 ms for a 50-note topic |
| Frame rate, integrated GPU, High quality | ≥ 50 fps at every level |

## 8. Safety

- Note-derived strings are rendered as text (Preact escapes; labels use
  `textContent`), never as HTML.
- The preview renders Markdown without HTML: the body is parsed into a
  syntax tree (CommonMark with GFM) and turned directly into elements; no
  HTML string is ever built or assigned. Raw HTML in a note shows as text,
  HTML and `%%` comments are dropped, links open only `http(s)` and `mailto`
  URLs (in a new tab, `noopener noreferrer`), wikilinks open only targets the
  server resolved, and images show as their alt
  text (the CSP blocks remote images anyway).
- Content-Security-Policy: `default-src 'none'; script-src 'self';
  style-src 'self'; img-src 'self' data:; connect-src 'self'; worker-src
  'self'`. Exported HTML uses hashes for its inline script and style.
- The server listens on loopback unless `--host` says otherwise. Beyond
  loopback the token still guards every request, but the traffic is plain
  HTTP: anyone who can see it can take the token and read the brain. The
  warning says so and suggests an SSH tunnel for untrusted networks.
- Third-party code ships only inside the built bundle; `THIRD_PARTY_NOTICES`
  next to it carries the licenses of every bundled package (MIT or ISC today),
  regenerated by the build.

## 9. Testing

- Server: token or cookie required on every route; loopback by default,
  and `--host` binds beyond it with the token still required; CSP; every
  API shape on fixture brains.
- Constellations: deterministic, size limits, single constellation for
  small brains.
- Export: titles containing HTML and script are inert; CSP hashes match.
- Front end (in brain-wiki-viz): type check and unit tests for layout
  determinism and level selection (`npm run check`). Here: the bundle is
  complete and stamped with a clean commit, and matches a rebuild of it.
- Browser: headless Chrome screenshots of each level on the fixture and a
  generated 10k brain, interaction scripts (search, fly to a topic, select a
  note, `Esc`), and frame time. Scripts drive the app through
  `window.__brainViz` (the controller, the scene, and a `ready` flag), and
  wait for `body[data-ready]`.

## 10. Alternatives considered

| Option | Why not |
|---|---|
| The first design: one 3D force graph of everything (`3d-force-graph`) | Did not scale: global layout and payload, hairball, no navigation. |
| A force layout per topic, seeded by its folder tree (strong tree springs, sub-folders in random directions) | Deep or lopsided folder trees crossed themselves: 77 of 175 tree lines crossed on a 176-note topic five folders deep, and the 3D scatter hid how deep a folder sat. |
| A radial tree per topic (a slice per folder, a line per note) | No crossings, but a line per note turned a folder of 200 dailies into a spiky ball, lines routed along rings to avoid crossings read as bent polylines, and nothing showed how much a note holds. |
| Plain circle packing per topic (nested circles, no lines) | Compact, but containment alone did not read as levels, the topic index often landed at the edge of the topic, and lines added from a folder to its sub-folders ran through sibling circles (7 of 33 on a 176-note topic). Orbits around each folder's core fix both, at some cost in space when a folder has many sub-folders. |
| Sunflower clusters inside folder outlines | No crossings, but the golden-angle spacing laid notes out evenly (a folder of 200 dailies became a uniform disc), which read as a grid rather than a cluster, and the outlines added clutter the links already conveyed. |
| 2.5D terrain atlas (topics as territories, notes as towns) | Easiest to navigate, but the galaxy keeps depth for separating dense clusters and matches the brain metaphor; both use the same levels and API. |
| No build step (vendored ES modules, hand-written JS) | Keeps contributors off Node, but a HUD of this size and custom shaders are much harder to maintain without types and a bundler; committing the bundle keeps users off Node anyway. |
| React | Preact gives the same model at a fraction of the size. |
| Obsidian's built-in graph | No supersession, citations, or health flags; fine as a complement. |
| Server-side rendering to images | No interaction. |

## 11. Choosing a brain, and opening it in Obsidian

`brain viz [BRAIN]` and `brain obsidian [BRAIN]` open a brain for a person
to look at. The brain is the one named (`brain viz work`, or `--brain`);
otherwise the only registered brain; otherwise, at a terminal, the one the
user picks from a numbered list, with the brain the command would open
anyway as the default (Enter keeps it). Without a terminal, or with `--json`
or `BRAIN_WIKI_BRAIN`, nothing is asked. Naming two different brains (an
argument and `--brain`) is a usage error.

`brain obsidian` opens the brain's whole folder as a vault:

| Case | What happens |
|---|---|
| Obsidian already knows the folder | Found in Obsidian's vault list (`obsidian.json`, read only; reading it does not start Obsidian), then `obsidian://open?vault=<id>` goes to the operating system (`xdg-open`, `open`, or the Windows shell), which keeps the user's last workspace |
| An unknown folder, with the Obsidian CLI (1.12+) | `obsidian eval` runs `vault-open` with the folder: the internal call behind "Open folder as vault", which registers and opens it. Obsidian offers no public API for this, so a later Obsidian may break it, and the next row is the fallback |
| An unknown folder, without the CLI or if that fails | `obsidian://choose-vault` opens the vault manager, and the output names the step: Open folder as vault, then the folder |
| Obsidian not found, and nothing can open a link | Refused (`not_available`) with the same step |
| A known folder, and nothing can open the link | The link is printed for the user to open |
