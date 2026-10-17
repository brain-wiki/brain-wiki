# Visualizer

## 1. Goals

`brain viz` opens a local, interactive map of a brain. It helps a person understand and audit their brain:

| Question | What the map shows |
|---|---|
| What is in here? | Topics as glowing clouds grouped into constellations; zooming in shows notes as stars |
| What is unhealthy? | Superseded notes, notes that still link to them, orphans, files that failed to parse |
| What changed recently? | Brightness by recency, and recent runs highlighted where they changed notes |

The map is read-only and local. It does not edit notes, support collaboration, or get hosted publicly.

This is the second design. The first drew every note in one 3D force graph. At 10k notes and 90k links that meant 19.5 MB of JSON, a global layout in the browser, overlapping labels, and a tangle of lines, and its flat list of 250 topic checkboxes did not help anyone navigate. The second design works like a map: it shows a little at every zoom level, adds detail as you approach, and keeps positions stable. Every visual element encodes data.

## 2. Levels (semantic zoom)

```
 Galaxy ──► Constellation ──► Topic ──► Note
 groups of     topics as        page core,    one note in focus,
 topics        nebulae          notes as      its linked neighborhood
                                stars         lit, the rest dimmed
```

| Level | Shows | Loaded from |
|---|---|---|
| Galaxy | Constellations as labeled clusters, the flows between them, and the inbox at the center | `/api/world` |
| Constellation | Its topics as clouds, sized by note count and brightened by recency, and the flows between them | `/api/world` |
| Topic | The topic page as a bright core, each sub-folder as a labeled branch with its notes around it, links between notes as trails, and links leaving the topic running toward the other topic | `/api/topic/<slug>` |
| Note | The note and the notes it links to or from lit, the rest dimmed, with its details in the side panel | `/api/note/<id>` |

How the levels behave:

- Detail follows screen size, as on a map. A topic's stars load when its cloud grows past a size on screen, wherever the camera is. Labels appear the same way, in priority order: topic pages, then flagged notes, then well-linked notes and the stars biggest on screen. Labels that would collide are hidden. Map labels name their units: "82 notes", "82 notes · 3 with issues", "5 session captures". At most 12 topics show their stars at once, nearest first.
- Zooming changes the level. Scrolling in on a constellation enters it once it fills about a quarter of the screen, and on a topic at about a fifth. Scrolling out leaves below a smaller size, so the level does not flicker, and panning to a neighbor at the same zoom switches to it. The camera stays where the user put it, and the change replaces the current history entry. Clicking selects directly: the camera flies there and a history entry is added. A selected note stays selected while its topic is on screen, and `Esc` goes up one level.
- Constellations come from the topic tree ([brain format §2](brain-format.md#2-directory-layout)). Each top-level topic with sub-topics forms a constellation with everything below it. The remaining topics, and every topic of a flat brain, are grouped by the links between their notes, with deterministic modularity clustering into groups of 4 to 40 topics. Topics with no links to other topics are grouped in chunks of up to 40. A brain with 12 topics or fewer has one constellation and opens at that level.

## 3. Rendering

The scene uses three.js on WebGL2:

- Clouds are additive glow particles, one draw call for all topics.
- Stars are instanced glow points drawn by one shader. Size shows how much a note holds (the fourth root of its line count), color its topic, and brightness its recency. Superseded and archived notes look faded, and each health flag adds a halo ring.
- Trails are solid thick lines. Supersession adds slow pulses running from the old note to the new one, so the line shows direction without breaking into dashes.
- Post-processing adds bloom, tone mapping, a vignette, depth fog, and a starfield backdrop. Camera moves are eased flights, not jumps.

Navigation is a 2.5D map, not a free 3D camera. The view keeps a fixed tilt and heading, dragging pans across the map, and the wheel or a trackpad pinch zooms toward the point under the cursor. The camera's target stays on the map's plane, so a zoom never stalls in empty space above it. A touchscreen pinch zooms toward the middle of the view. Depth still separates dense clusters, but nobody ends up upside down. Bloom and the constellation dust fade at the topic and note levels, where full strength would merge a cluster into one white blob.

Other rendering behavior:

- Highlight issues (`I`) recolors the map. Each topic cloud and constellation takes a tint from cool through amber to red by its share of flagged notes, ranked against the other flagged topics, so a brain where every topic has some flags still shows where the trouble concentrates. Unflagged topics turn grey and faint, flows fade, unflagged stars dim, and flagged stars show their halo rings. A legend explains the colors, and the minimap uses them too.
- Graphics quality has three settings. Low, the default, draws without post-processing. High adds bloom, the vignette, and grain. Auto ignores the first 1.5 s after load, samples 2.5 s of frames, and picks Low when the median frame takes longer than 1/30 s. The setting is in the dock's ⋯ menu, the browser remembers it, and `?quality=` in the URL overrides it. `prefers-reduced-motion` turns off flows and flights.
- Without WebGL2 (hardware acceleration off, or a remote desktop or VM without a GPU), the stage says why the map could not start and how to check. The topic list, search, and details panel keep working.
- When a note or topic is gone or fails to load, its panel says so instead of loading forever. When `brain viz` stops, the map backs off from topics it could not fetch, for up to a minute, and a message says the connection was lost. A failure at start-up says whether the server is unreachable or the link's token is wrong. A mangled link opens the overview.

### 3.1 Layout

The layout is deterministic and local. The same brain always produces the same map, and no layout spans the whole brain.

- Constellations sit on a disk along a golden-angle spiral, pushed apart where they collide. Topics sit on a spiral inside their constellation, with a parent topic at the center of the constellation its sub-topics form.
- Inside a topic, the map's tree is the folder tree, as Obsidian shows it. Each sub-folder is a branch, and its folder note (`x/x.md`, `x/index.md`, or `x/readme.md`) is its core, where its links meet. A folder without a folder note uses its longest note as the core, or is an empty junction when it holds only sub-folders.
- A folder's notes form a star cluster around its core, on a projected Plummer profile in order of length, so the core is dense, the edge sparse, and long notes sink toward the middle. Each note's direction is random but seeded by its id, so stars clump instead of spacing evenly. Links inside a folder pull notes together, gravity holds each at its depth, and close neighbors push apart. A note's space grows with the fourth root of its line count.
- Sub-folders orbit their parent's core, each in its own wedge, largest first, and an empty wedge keeps the way in from the parent clear. A line runs from each folder's core to its parent's core. Because every folder stays inside its wedge, no tree line crosses another or runs through a folder it does not join.
- Each nesting level sits one step farther from the camera, straight along the view, so depth never moves a star on screen. Links between folders are drawn but do not move stars, so a link to a note in another folder never changes where that note sits.
- Each folder is labeled directly above its topmost note. A label drops the leading ` · ` parts that its parent folders' titles already say, so "Lumen guide · Sync · Conflicts" reads "Conflicts".

### 3.2 Words and lines

The galaxy is the look, not the vocabulary. The interface says Overview, Group (of topics), Topic, and Note, never galaxy or constellation. It says issues, not flags; session captures, not episodes; and Sources, not `bw-sources`. Links read as plain verbs (Links to, Replaced by, Cites, and from the other end links here, replaced by this, cites this), and every number names its unit.

The folder tree is always drawn, as one line from each folder's core to its parent's, brighter at the parent end. Links between notes come in three kinds. Each has a chip in the dock, and all are on by default:

| Kind (dock chip) | From | Trail |
|---|---|---|
| Links | A wikilink in the body (`links_to`) | Faint violet, the main structure |
| Replaces | `bw-superseded_by` (`superseded_by`) | Amber, pulsing from old to new |
| Sources | A `bw-sources` entry (`source`) | Faint grey-blue, from the citing note to the cited one |

## 4. HUD and navigation

Glass panels sit over the scene, and everything can be done from the keyboard.

Top bar:

- The brain's name and profile.
- Back, forward, and a list of everything opened in this tab.
- The breadcrumb: Overview › group › parent topics › topic › folders › note.
- Search, opened with `/` or `Ctrl/⌘-K`.
- Totals: topics, notes, links, notes with issues, and the inbox. "With issues" opens the Issues tab, and "inbox" says what is waiting to be merged.

Left panel, with three tabs:

- Topics lists groups and their topics, with sub-topics nested under their parent. A group opens when you enter it, and its chevron or a second click closes it. Rows show note counts, issue badges, and recency bars. The list can be filtered and sorted by name (the default, ignoring case and with numbers in order), most notes, most issues, or most recently changed.
- Issues lists notes with issues grouped by kind, counts first, with the switch that highlights them on the map.
- Activity lists recent runs. Selecting one highlights the notes it changed.

Right panel, headed Details, is always shown and says how to fill it when nothing is selected:

- A group shows its topics.
- A topic shows its description; counts of notes, notes changed in 7 days, and notes with issues; the last change; a breakdown of issues; a button to open the topic page; its sub-topics and folders with note counts; its most connected notes, hidden for topics of five notes or fewer; and linked topics.
- A note shows where it lives ("In Guide › Sync › …"), type, status, and issue chips, and banners for a superseded note or the notes it replaces. Then come its summary, its outgoing links grouped as Replaced by, Links to, and Cites, and its backlinks with how each links here. A resolved link flies to its note, an unresolved one says "not found", and one outside the mapped topics says "not on the map". Last come the path, with a copy button, and an `obsidian://` link.
- A clicked connection replaces the details of the focused place, and the map stays where it is, with the connection lit, until it closes (its ✕, `Esc`, or going to another place):
  - A link between two notes reads as a sentence: the two notes as cards that open them, and how they link ("links to", "supersedes", "cites"). Under "Where … says it" come the passages of the linking note that hold the link, rendered like the preview: the paragraph, or the list item or table row, for a body link, and the `bw-superseded_by` or `bw-sources` entry for a metadata link. A button reads the whole note, and "Both ways" says when the other note links back.
  - The links between two topics name both topics, which open them, and the count by kind, then list each link between their notes; a row opens that link as a connection. Between two groups, the list is the topic pairs, and a row opens the links between that pair.

Clicking a note anywhere (a star, a row, a search result, a wikilink) also opens a preview over the details panel. The preview renders the note like Obsidian's reading view: properties from the frontmatter, then the body with headings, lists and tasks, tables, code, callouts, highlights, tags, and footnotes. Wikilinks in the body and in property values open the linked note and move the map with it, so `bw-superseded_by` and each `bw-sources` entry are links. `Esc` closes the preview and `P` toggles it.

Bottom of the screen:

- Bottom left, a minimap shows the galaxy from above with the current view, and clicking it flies there. Beside it, a zoom ladder names the levels (Overview, Group, Topic, Note) and the current place. A marker creeps toward the next level as you scroll, and earlier levels are clickable.
- Bottom center, the dock has one chip per link kind, which is both legend and filter; a hidden kind shows a hollow swatch and a struck-through label. The dock also has the highlight-issues switch, a ⋯ menu for labels and graphics quality, and help. The breadcrumb's first crumb or `O` returns to the overview.

Overlays:

- Hovering a star shows its title, topic, status, and flags.
- Hovering a trail lights it and both ends, and reads the link as a sentence ("2026.9.9 supersedes 2026.9.8"). Clicking opens the connection in the Details panel.
- Hovering a flow shows the two topics and the link count, split by kind when not all are body links. Clicking lists those links in the Details panel.
- The command palette shows server-side search results grouped by topic, and `?` shows the shortcuts.

One table drives both the key handler and the shortcuts sheet, which writes keys the way each platform does (⌥ and ⌘ on a Mac, Alt and Ctrl elsewhere):

| Section | Keys | Does |
|---|---|---|
| Move | `Ctrl-↑` / `Ctrl-↓` (⌘ on a Mac) | Up or down one level: note, folder, topic, group, overview. Down retraces the way up, or else enters the biggest place inside |
| Move | `[` / `]` | Previous or next place at the same level |
| Move | `O` | Overview |
| Move | `Alt-←` / `Alt-→` (⌘ on a Mac) | The browser's own back and forward |
| Move | `Esc` | Close what is open, or else go up one level |
| Show | `P`, `I`, `L` | Note preview; highlight issues; labels |
| Show | `1`–`3` | Show or hide a kind of link, in the dock's order |
| Find | `/` or `Ctrl-K` (⌘ on a Mac) | Search |
| Find | `?` | The shortcuts sheet |

While typing in a field, only `Esc` and `Ctrl/⌘-K` work, so `Ctrl/⌘-↑` and `-↓` still move the caret. The shortcuts sheet also explains mouse gestures and how to read the map: star size, brightness, rings, and pulses.

The URL hash records the focus (`#/c/<id>`, `#/t/<slug>`, `#/t/<slug>/n/<id>`), so a view can be reopened. Every place opened becomes a browser history entry tagged with its position in the tab's trail. The top bar's back and forward buttons, the history list, `Alt-←` and `Alt-→`, and the browser's buttons all move through the same stack, which survives reloading the tab.

## 5. Architecture

```
brain viz ─► local HTTP server on 127.0.0.1:<port> (stdlib, read-only; --host to widen)
          ─► opens http://127.0.0.1:<port>/?t=<token>
browser   ─► built app (index.html + assets/) ─► /api/world, /api/topic/<slug>,
             /api/note/<id>, /api/search?q=, /api/health
```

- `--port` picks the port, by default any free one. `--topic` maps only the named topics and their sub-topics. `--no-open` prints the URL without opening a browser.
- The server answers only GET; other methods get 405. Every request needs the random token, either in the `t` query parameter or in a cookie. A request with the token in the URL gets an `HttpOnly; SameSite=Strict` cookie named for the port, so module chunks and API calls are authorized without the token in every URL. Tokens are compared in constant time.
- The server exits after 30 minutes without a request, or on Ctrl-C.
- It listens on loopback by default. `--host ADDRESS` listens elsewhere, so the map can be opened from another machine (`0.0.0.0` or `::` for every interface). The server then prints a second URL with the machine's hostname and warns on stderr (§8).
- The server builds the graph once (§6), caches it, and rebuilds it only when an index scan reports changes. World, health, and search requests check for changes. Topic requests use the cached graph, so revealing a topic never waits on a scan (about 120 ms at 10k notes) and matches the world the page loaded. The world payload stays small, about 170 KB at 10k notes, and topics load on demand.
- The front end is TypeScript, three.js, `camera-controls` for flights, and Preact for the panels, built with Vite. Its source is a separate repository, brain-wiki-viz, which keeps the Node toolchain out of this one. Only the built bundle is committed here, in `src/brainwiki/viz/app/`, so installing or running brain-wiki never needs Node.
- `BUILD_INFO.json` next to the bundle names the brain-wiki-viz commit it was built from. CI rebuilds that commit from its `package-lock.json`, which may hold only public registry URLs, and fails if the result differs.
- The API in §6 is the interface between the two repositories. A change to it lands here first, then in brain-wiki-viz, then as a new bundle.

`--export FILE` writes the map to a file and exits, in the format its extension names:

| Extension | Contents |
|---|---|
| `.html` | One self-contained page: the app with every asset inlined, and the world, every topic, and health embedded |
| `.json` | The full graph: topics, nodes including episodes, links, and recent runs |
| `.graphml` | The same nodes and links as GraphML, for other graph tools |

The HTML export's details panel shows only what the topic data carries (links and backlinks among the mapped notes, no summary or banners) and says that note text is not included. Every export contains the title of every mapped note.

## 6. Data

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
- `superseded_by`, from the old note's `bw-superseded_by`. The source is the old note and the target the new one.
- `source`, a `bw-sources` entry. The source is the citing note and the target the cited note or episode.

A node:

```json
{"id": "01J9Z7Q2…", "title": "Use SQLite FTS5 for local search", "path": "topics/search/fts5.md",
 "kind": "note", "topic": "search", "type": "decision", "status": "active",
 "updated": "2026-10-09", "aliases": [], "lines": 42, "degree": 7, "flags": ["stale"]}
```

`/api/note/<id>` returns the outline read (`id`, `title`, `path`, `abs_path`, `kind`, `type`, `status`, `topic`, `updated`, `banners`, `summary`) and the note's links:

- `outlinks`: `[{relation, target, id, title, path, resolved}]`, one per target, metadata links first. `relation` reads from this note: `superseded_by`, `links_to`, or `cites` (a `bw-sources` entry). `target` is the link as written, and an unresolved link has `id`, `title`, and `path` null.
- `backlinks`: `[{id, title, path, relation}]`, at most 10, supersession first. `relation` reads from this note: `supersedes` (the other note names this one in `bw-superseded_by`), `linked_from`, or `cited_by`.

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
| `stale` | An active note that links to a superseded or archived note other than one it replaced; the same query as the stale report ([lint §7](lint-and-reports.md#7-reports)) |
| `orphan` | A note that nothing else links to |
| `lint_error` | The index recorded a parse problem for the file |

The map lists the flags in the order stale, superseded, orphan, lint error, and a star's halo shows the first that applies.

## 7. Budgets

| Measure | Budget at 10k notes |
|---|---|
| `/api/world` size | < 300 KB |
| First frame after load | < 1.5 s |
| Topic reveal (fetch, layout, upload) | < 150 ms for a 50-note topic |
| Frame rate on an integrated GPU, High quality | ≥ 50 fps at every level |

## 8. Safety

- Strings from notes are rendered as text, never as HTML. Preact escapes them, and labels use `textContent`.
- The preview renders Markdown without HTML. The body is parsed into a syntax tree (CommonMark with GFM), which is turned directly into elements, so no HTML string is built or assigned. Raw HTML in a note shows as text, and HTML and `%%` comments are dropped. Links open only `http(s)` and `mailto` URLs, in a new tab with `noopener noreferrer`. Wikilinks open only targets the server resolved. Images show as their alt text, and the CSP blocks remote images anyway.
- The server sends `Content-Security-Policy: default-src 'none'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'self'; worker-src 'self'; font-src 'self'`, with `X-Content-Type-Options: nosniff`, `Referrer-Policy: no-referrer`, and `Cache-Control: no-store`. Exported HTML allows its inline script and style by hash and allows no network connections.
- The server listens on loopback unless `--host` says otherwise. Beyond loopback the token still guards every request, but the traffic is plain HTTP, so anyone who can see it can take the token and read the brain. The warning says so and suggests an SSH tunnel on untrusted networks.
- Third-party code ships only inside the built bundle. `THIRD_PARTY_NOTICES.txt` next to it carries the licenses of every bundled package, all MIT or ISC today, and the build regenerates it.

## 9. Testing

- Server: the token or cookie is required on every route; loopback is the default, and `--host` binds beyond it with the token still required; the CSP; every API shape on fixture brains.
- Constellations: deterministic, within the size limits, and one constellation for small brains.
- Export: titles containing HTML and script are inert, and the CSP hashes match.
- Front end, in brain-wiki-viz: type checks and unit tests for layout determinism and level selection (`npm run check`). Here: the bundle is complete, stamped with a clean commit, and matches a rebuild.
- Browser: headless Chrome screenshots of each level on the fixture brain and a generated 10k brain, interaction scripts (search, fly to a topic, select a note, `Esc`), and frame time. Scripts drive the app through `window.__brainViz` (the controller, the scene, and a `ready` flag) and wait for `body[data-ready]`.

## 10. Alternatives considered

| Option | Why not |
|---|---|
| The first design, one 3D force graph of every note (`3d-force-graph`) | It did not scale: a global layout and payload, a tangle of lines, and no navigation. |
| A force layout per topic, seeded by its folder tree | Deep or lopsided folder trees crossed themselves: 77 of 175 tree lines crossed on a 176-note topic five folders deep, and the 3D scatter hid how deep a folder sat. |
| A radial tree per topic, with a slice per folder and a line per note | No crossings, but a folder of 200 daily notes became a spiky ball, lines routed along rings read as bent polylines, and nothing showed how much a note holds. |
| Circle packing per topic, nested circles with no lines | Compact, but containment alone did not read as levels, the topic page often landed at the edge, and lines from a folder to its sub-folders ran through sibling circles (7 of 33 on a 176-note topic). Orbits around each folder's core fix both, at some cost in space when a folder has many sub-folders. |
| Sunflower clusters inside folder outlines | No crossings, but golden-angle spacing laid notes out evenly, so a folder of 200 daily notes read as a grid rather than a cluster, and the outlines added clutter the links already conveyed. |
| A 2.5D terrain atlas, with topics as territories and notes as towns | Easiest to navigate, but the galaxy keeps depth for separating dense clusters. Both would use the same levels and API. |
| No build step, with vendored ES modules and hand-written JavaScript | Keeps contributors off Node, but panels of this size and custom shaders are much harder to maintain without types and a bundler. Committing the bundle keeps users off Node anyway. |
| React | Preact gives the same model at a fraction of the size. |
| Obsidian's built-in graph | It shows no supersession, citations, or health flags. It works alongside this map. |
| Rendering images on the server | No interaction. |

## 11. Choosing a brain, and opening it in Obsidian

`brain viz [BRAIN]` and `brain obsidian [BRAIN]` open a brain for a person to look at. They open the brain named as the argument or with `--brain`. Otherwise, with several brains registered and a terminal attached, they ask the user to pick one from a numbered list, and Enter keeps the brain the command would have opened anyway. With one brain, without a terminal, or with `--json` or `BRAIN_WIKI_BRAIN` set, nothing is asked. Naming two different brains, one as the argument and one with `--brain`, is a usage error.

`brain obsidian` opens the brain's whole folder as a vault:

| Case | What happens |
|---|---|
| Obsidian already knows the folder | brain-wiki finds it in Obsidian's vault list (`obsidian.json`, read without starting Obsidian) and hands `obsidian://open?vault=<id>` to the operating system (`xdg-open`, `open`, or the Windows shell), which keeps the user's last workspace |
| An unknown folder, with the Obsidian CLI (1.12+) | `obsidian eval` runs `vault-open` with the folder, the internal call behind "Open folder as vault", which registers and opens it |
| An unknown folder, without the CLI or when that fails | `obsidian://choose-vault` opens the vault manager, and the output names the step to take: Open folder as vault, then the folder |
| An unknown folder, no CLI, and nothing can open a link | Refused with `not_available` and the same step |
| A known folder, and nothing can open the link | The link is printed for the user to open |

Obsidian has no public API for adding a vault, so a later Obsidian may break the `vault-open` call. The vault manager is the fallback.
