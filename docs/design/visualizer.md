# Visualizer

## 1. Goals

`brain viz` opens a local, interactive map of a brain. It helps a person understand and audit their brain:

| Question | What the map shows |
|---|---|
| What is in here? | The topic tree, one plane per level; zooming in shows each topic's notes as a ring of slices around its topic page |
| What is unhealthy? | Superseded notes, notes that still link to them, orphans, files that failed to parse |
| What changed recently? | Brightness by recency, and recent runs highlighted where they changed notes |

The map is read-only and local. It does not edit notes, support collaboration, or get hosted publicly.

This is the third design ([D41](../decision/d41-map-of-the-topic-tree.md)):

- The first drew every note in one 3D force graph. At 10k notes and 90k links that meant 19.5 MB of JSON, a global layout in the browser, overlapping labels, and a tangle of lines.
- The second grouped topics into clusters by their links and scattered each topic's notes as stars around its page. The groups were not anything the user made, and a scatter showed neither how long a note is nor where it sits in its folder.
- The third draws the folder tree itself. It works like a map: it shows a little at every zoom level, adds detail as you approach, and keeps positions stable. Every visual element encodes data.

## 2. Levels (semantic zoom)

```
 Overview ──► Topic ──► Note
 every topic   its notes as a    one note in focus,
 center and    ring of slices,   its linked notes lit,
 stem          sub-topics below  the rest dimmed
```

| Level | Shows | Loaded from |
|---|---|---|
| Overview | Every topic's center and the stems that join them, top-level topics on plane 0 and each level below on its own plane, the flows between top-level topics, and the inbox beside the map | `/api/world` |
| Topic | Its notes as a ring of slices around its topic page, its sub-topics on the plane below, links between notes, and links to notes of other topics whose rings are loaded | `/api/topic/<slug>` |
| Note | The note and the notes it links to or from lit, the rest dimmed, with its details in the side panel | `/api/note/<id>` |

What shows:

| Element | When |
|---|---|
| Topic centers and stems | Always, for the whole tree |
| A topic's ring | When the ring is about 140 px or more across on screen (radius), at most 16 at once, biggest first; until then the topic is its star |
| Planes more than two levels below the topic in view (below plane 0 at the overview) | Fade out |
| Ancestors of the topic in view | Keep a faint center and stem; their rings fade out |
| Siblings of the topic in view | Nearly full, on their own plane |
| Other topics | Dimmed |

How the levels behave:

- Labels appear by screen size, in priority order: topic pages, then flagged notes, then well-linked notes and the stars biggest on screen. Labels that would collide are hidden. Map labels name their units: "82 notes", "82 notes · 3 with issues", "5 session captures". A topic's note count includes its sub-topics.
- Zooming changes the level. Scrolling in enters the deepest topic around the point in view once its footprint fills about 30% of the screen height, and then its sub-topics the same way. Scrolling out below 20% returns to the topic above, or to the overview, so the level does not flicker. Panning to a neighbor at the same zoom switches to it. The camera stays where the user put it, and the change replaces the current history entry.
- Clicking selects directly: the camera flies there and a history entry is added. A selected note stays selected while its topic is on screen, and `Esc` goes up one level.

## 3. Rendering

The scene uses three.js on WebGL2:

- Each topic is a star at its center, drawn as additive glow points in one draw call for all topics: sized by everything under it and never under 6 px on screen, with a faint halo as wide as its ring; a folder without a topic page is a smaller, dimmer star.
- Each loaded ring is one mesh of slices. Stars at the slices' tips are glow points drawn by one shader: color is the topic's, brightness the note's recency, superseded and archived notes look faded, and each health flag adds a halo ring.
- Stems, trails, and flows are solid thick lines drawn as curves. Supersession adds slow pulses running from the old note to the new one, so the line shows direction without breaking into dashes.
- Post-processing adds bloom, tone mapping, a vignette, depth fog, and a starfield backdrop. Camera moves are eased flights, not jumps.

Navigation is a map you can turn:

- The default view is tilted 50° from straight down, heading north, so the lower planes show.
- Dragging pans across the map, moving the plane of the topic in view with the cursor: whenever the camera settles, and before a drag starts, what it looks at slides along the line of sight onto that plane. Shift+drag turns the view around the point in view, in any direction, stopping before the camera goes below the map (78° from straight down) or upside down. `R` returns to the default tilt and heading.
- The wheel or a trackpad pinch zooms toward the point under the cursor, also while Shift is held (browsers then report the wheel as horizontal). The camera's target stays on its plane, so a zoom never stalls in empty space. A touchscreen pinch zooms toward the middle of the view.
- Flights keep the heading and tilt the user turned to. Bloom fades at the topic and note levels, where full strength would merge a ring into one white blob.

Other rendering behavior:

- Highlight issues (`I`) recolors the map. Each topic center takes a tint from cool through amber to red by its share of flagged notes, ranked against the other flagged topics, so a brain where every topic has some flags still shows where the trouble concentrates. Unflagged topics turn grey and faint, flows fade, unflagged stars and slices dim, and flagged stars show their halo rings. A legend explains the colors, and the minimap uses them too.
- Graphics quality has three settings. Low, the default, draws without post-processing. High adds bloom, the vignette, and grain. Auto ignores the first 1.5 s after load, samples 2.5 s of frames, and picks Low when the median frame takes longer than 1/30 s. The setting is in the dock's ⋯ menu, the browser remembers it, and `?quality=` in the URL overrides it. `prefers-reduced-motion` turns off flows and flights.
- Without WebGL2 (hardware acceleration off, or a remote desktop or VM without a GPU), the stage says why the map could not start and how to check. The topic list, search, and details panel keep working.
- When a note or topic is gone or fails to load, its panel says so instead of loading forever. When `brain viz` stops, the map backs off from topics it could not fetch, for up to a minute, and a message says the connection was lost. A failure at start-up says whether the server is unreachable or the link's token is wrong. A mangled link opens the overview.

### 3.1 Layout

The layout is deterministic. The same brain always produces the same map. A topic is a folder ([brain format §2.1](brain-format.md#21-topics)): its topic page (`_Index.md` by default) is the topic itself, every other note in the folder describes the topic, and every sub-folder is a sub-topic.

```
           plane 0   ·  top-level topics, packed by size
     ◜◝ ring ◜◝      ·  each topic's notes around its topic page
        │ stem
           plane 1   ·  sub-topics, in orbit outside the parent's ring
     ◜◝ ring ◜◝
        │
           plane 2   ·  and so on, one plane per level
```

| Rule | Detail |
|---|---|
| Content | The characters of a note's text, without its frontmatter. A topic's content is the sum over every note under it |
| Planes | Top-level topics sit on plane 0. Each level of sub-topics sits on its own plane below: the first 6% of the map's radius under plane 0, each further gap three quarters of the one above, so deep trees stay short |
| Orbit | Bottom up, a topic's sub-topics orbit outside its ring, each in a wedge of its own wide enough for its footprint, as near the ring as the wedges allow: the largest first, the rest alternating to either side. One wedge stays empty, for the stem coming in from the topic above |
| Footprint | The smallest circle around a topic's ring and its sub-topics' footprints, so it grows with all the content under it. Top down, each topic turns about its footprint's center until its empty wedge faces its parent. Top-level footprints are packed by size on plane 0, and the map is scaled to a fixed radius. Footprints are not drawn |
| Center | The topic page is a bright core at the topic's center, labeled with the topic's title. A topic without a page shows a small marker labeled with its folder name. Flying to a topic puts its center in the middle of the view, far enough out to show its whole footprint |
| Ring | The topic's other notes, around its center on its plane (§3.2) |
| Stem | A curve from the parent's center to the sub-topic's: it drops from the parent and comes down onto the sub-topic from above, running between the two planes and never along either. Seen from above it is a straight line inside the sub-topic's wedge, so it crosses no other topic |

`bw-part_of` does not move anything: a note sits only under its folder, and Part of shows as a link.

### 3.2 A topic's ring

- Notes go clockwise from 12 o'clock, in file-name order with numbers compared as numbers, as Obsidian's file explorer shows them.
- Each note is a slice. A longer note gets a wider slice, and its slice reaches farther from the center, the reach growing with the square root of its content, so long notes do not swamp the topic. The longest note's tip is at the ring's radius, which grows with the square root of the topic's own content.
- A slice is faint and filled in the topic's color, brighter when recently updated and fainter when wide, with no outline and a gap of up to 1.4° to its neighbors. A star at its outer tip carries the label, the issue halo, and the selection, and grows a little with the note's content.
- Slices are at least a 48th of a turn wide.
- A topic with too many notes for one ring lays them out as spiral arms, like a galaxy's: two arms, three from 80 notes, four from 150, starting evenly round from 12 o'clock. Notes in file-name order are dealt round the arms, so on every arm the order runs outward, and dated notes end newest at the rim. Each arm is a logarithmic spiral that winds 1.4 turns clockwise and widens as it goes out, and so do its slices and stars; a longer note's stretch of arm is longer and reaches farther.

### 3.3 Words and lines

The interface says Overview, Topic, and Note, and calls a topic by its title, or by its folder name when it has no topic page. It says issues, not flags; session captures, not episodes; and Sources, not `bw-sources`. Links read as plain verbs (Links to, Replaced by, Conflicts with, Depends on, Part of, Cites, and from the other end links here, replaced by this, conflicts with this, depends on this, parts, cites this), and every number names its unit.

The topic tree is always drawn, as a curved stem from each parent's center down to its sub-topic's, brighter at the parent end. A body wikilink only says that one note mentions another, so the map does not draw it, and flows count only typed links; the Details panel lists body links. The map draws five kinds of link between notes, as arcs from tip to tip that rise higher the farther apart the notes are, across planes when the two notes' topics are on different levels. Flows between top-level topics arc the same way. Each kind has a chip in the dock, and all are on by default. A trail runs from the note that holds the link to the one it names:

| Kind (dock chip) | From | Trail |
|---|---|---|
| Replaces | `bw-superseded_by` (`superseded_by`) | Amber, pulsing from old to new |
| Sources | A `bw-sources` entry (`source`) | Faint grey-blue, from the citing note to the cited one |
| Conflicts | `bw-conflicts_with` (`conflicts_with`) | Red and thick, with no direction |
| Depends on | `bw-depends_on` (`depends_on`) | Blue, pulsing from the dependent to the note it rests on |
| Part of | `bw-part_of` (`part_of`) | Teal, from the part to its whole |

## 4. HUD and navigation

Glass panels sit over the scene, and everything can be done from the keyboard.

Top bar:

- The brain's name and profile.
- Back, forward, and a list of everything opened in this tab.
- The breadcrumb: Overview › parent topics › topic › note.
- Search, opened with `/` or `Ctrl/⌘-K`.
- Totals: topics, notes, links, notes with issues, and the inbox. "With issues" opens the Issues tab, and "inbox" says what is waiting to be merged.

Left panel, with three tabs:

- Topics lists the topic tree the way a file explorer lists folders: top-level topics, each opening onto its sub-topics. The way to the topic in view opens by itself, and a filter shows each match with the topics above it. Rows show note counts including sub-topics, issue badges, and recency bars. The list can be sorted by name (the default, ignoring case and with numbers in order), most notes, most issues, or most recently changed.
- Issues lists notes with issues grouped by kind, counts first, with the switch that highlights them on the map.
- Activity lists recent runs. Selecting one highlights the notes it changed and flies to the top-level topic where it changed the most.

Right panel, headed Details, is always shown and says how to fill it when nothing is selected:

- A topic is its topic page, so selecting a topic shows the page in this panel. First come where the topic lives ("In Money › Investing") and chips for its notes, sub-topics, notes changed in 7 days, last change, and issues; the notes and sub-topics chips jump to their lists. Then the page, rendered like the preview, with its properties folded and without an opening heading that repeats the title. Then what the page cannot say for itself: the topic's notes in ring order and its sub-topics, each list showing twelve with a button for the rest; the page's links other than those in its text, and its backlinks; linked topics; and the page's path with copy and `obsidian://` buttons. A topic without a page shows its description in place of the page. Opening a topic page anywhere (its star, a search result, a link, or an address ending in its id) opens its topic.
- A note shows where it lives ("In Guide › Sync"), type, status, and issue chips, and banners for a superseded note or the notes it replaces. Then come its summary, its outgoing links grouped as Replaced by, Conflicts with, Depends on, Part of, Links to, and Cites, its parts (the notes that name it in `bw-part_of`) by title, and its backlinks with how each links here. A resolved link flies to its note, an unresolved one says "not found", and one outside the mapped topics says "not on the map". Last come the path, with a copy button, and an `obsidian://` link.
- A clicked connection replaces the details of the focused place, and the map stays where it is, with the connection lit, until it closes (its ✕, `Esc`, or going to another place):
  - A link between two notes reads as a sentence: the two notes as cards that open them, and how they link ("supersedes", "conflicts with", "depends on", "is part of", "cites"). Under "Where … says it" comes the property entry of the linking note that holds the link (`bw-superseded_by`, `bw-conflicts_with`, `bw-depends_on`, `bw-part_of`, or `bw-sources`), rendered like the preview. A button reads the whole note, and "Both ways" says when the other note links back.
  - A flow between two top-level topics names both topics, which open them, and the count by kind, then lists the pairs of topics under them whose notes link; a row opens the links between that pair, each of which opens that link as a connection.

Clicking a note anywhere (a star, a row, a search result, a wikilink) also opens a preview over the details panel. The preview renders the note like Obsidian's reading view: properties from the frontmatter, then the body with headings, lists and tasks, tables, code, callouts, highlights, tags, and footnotes. Wikilinks in the body and in property values open the linked note and move the map with it, so the relation fields and each `bw-sources` entry are links. `Esc` closes the preview and `P` toggles it.

A button in the header of the Details panel and of the preview, or `W`, widens both to the same width for reading, so the preview still covers the panel. The browser remembers the choice.

Bottom of the screen:

- Bottom left, a minimap shows plane 0 from above, each top-level topic's footprint with the current view, and clicking it flies to the nearest top-level topic. Beside it, a zoom ladder names the levels (Overview, Topic, Note) and the current place. A marker creeps toward the next level as you scroll, and earlier levels are clickable.
- Bottom center, the dock has one chip per link kind, which is both legend and filter; a hidden kind shows a hollow swatch and a struck-through label. The dock also has the highlight-issues switch, a ⋯ menu for labels and graphics quality, and help. The breadcrumb's first crumb or `O` returns to the overview.

Overlays:

- Hovering a star shows its title, topic, status, and flags. Hovering a topic center shows its notes, sub-topics, and issues.
- Hovering a trail lights it and both ends, and reads the link as a sentence ("2026.9.9 supersedes 2026.9.8"). Clicking opens the connection in the Details panel.
- Hovering a flow shows the two topics and the link count, split by kind. Clicking lists those links in the Details panel.
- The command palette shows server-side search results grouped by topic, and `?` shows the shortcuts.

One table drives both the key handler and the shortcuts sheet, which writes keys the way each platform does (⌥ and ⌘ on a Mac, Alt and Ctrl elsewhere):

| Section | Keys | Does |
|---|---|---|
| Move | `Ctrl-↑` / `Ctrl-↓` (⌘ on a Mac) | Up or down one level: note, topic, parent topics, overview. Down retraces the way up, or else enters the biggest sub-topic, then the notes in ring order |
| Move | `[` / `]` | Previous or next topic, or note, under the same parent |
| Move | `O` | Overview |
| Move | `R` | Turn the view back to the default tilt, heading north |
| Move | `Alt-←` / `Alt-→` (⌘ on a Mac) | The browser's own back and forward |
| Move | `Esc` | Close what is open, or else go up one level |
| Show | `P`, `W`, `I`, `L` | Note preview; widen the Details panel and the preview; highlight issues; labels |
| Show | `1`–`5` | Show or hide a kind of link, in the dock's order |
| Find | `/` or `Ctrl-K` (⌘ on a Mac) | Search |
| Find | `?` | The shortcuts sheet |

While typing in a field, only `Esc` and `Ctrl/⌘-K` work, so `Ctrl/⌘-↑` and `-↓` still move the caret. The shortcuts sheet also explains mouse gestures, Shift+drag among them, and how to read the map: planes, rings, slices, brightness, rings on stars, and pulses.

The URL hash records the focus (`#/t/<slug>`, `#/t/<slug>/n/<id>`), so a view can be reopened; a link to a group from the previous design opens the overview. Every place opened becomes a browser history entry tagged with its position in the tab's trail. The top bar's back and forward buttons, the history list, `Alt-←` and `Alt-→`, and the browser's buttons all move through the same stack, which survives reloading the tab.

## 5. Architecture

```
brain viz ─► local HTTP server on 127.0.0.1:<port> (stdlib, read-only; --host to widen)
          ─► opens http://127.0.0.1:<port>/?t=<token>
browser   ─► built app (index.html + assets/) ─► /api/world, /api/topic/<slug>,
             /api/note/<id>, /api/search?q=, /api/health
```

- `--port` picks the port, by default any free one. `--topic` maps only the named topics and their sub-topics. `--no-open` prints the URL without opening a browser.
- The server answers only GET; other methods get 405. Every request needs the token, either in the `t` query parameter or in a cookie. The token is random for each start. With `--keep-token`, which needs `--port`, the server reuses the token saved for that brain and port, so the link stays the same across restarts. The token is saved in brain-wiki's state directory, readable only by the user, and deleting the file makes a new one. A request with the token in the URL gets an `HttpOnly; SameSite=Strict` cookie named for the port, so module chunks and API calls are authorized without the token in every URL. Tokens are compared in constant time.
- The server exits after 2 hours without a request, or on Ctrl-C.
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
  "topics": [{"slug": "search", "title": "Search", "name": "02 Search", "description": "…",
              "parent": null, "depth": 0, "color": "#6aa9ff", "notes": 12,
              "page": "01J9…", "chars": 18400, "tree_chars": 52100,
              "updated": "2026-10-09", "recent": 3, "flags": {"stale": 2}, "flagged": 2}],
  "flows": [{"a": "search", "b": "storage", "total": 3,
             "rels": {"depends_on": 2, "superseded_by": 1}}],
  "episodes": {"count": 200},
  "runs": [{"id": "run-01JA…", "kind": "consolidate", "at": "…", "episodes": 6,
            "topics": {"search": 3}, "touched": ["01J9…"]}]
}
```

- `topics` come depth first, siblings in folder-name order with numbers compared as numbers. `name` is the topic's folder name and `depth` its level below the top (0).
- `chars` counts the characters of the text of the topic's notes and its topic page, without frontmatter, and `tree_chars` adds every topic below it.
- A top-level topic has its own hue, and the topics below it vary that hue.
- `recent` counts notes updated in the last 7 days.
- `flows` count the typed links between the notes of two topics, by `rel`, with `a` < `b`. Body links (`links_to`) are left out. Each topic keeps its 8 strongest flows. The map adds them up between top-level topics.
- `runs` lists the 20 most recent runs, leaving out failed and unfinished ones, with the notes each changed.

`/api/topic/<slug>` returns `{slug, title, color, page, path, nodes, links, external}`:

- `path` is the topic's folder.
- `nodes` are the topic's notes and its topic page (kind `topic`), in the node shape below.
- `links` are `{source, target, rel}` with both ends in the topic.
- `external` are links between this topic's notes and other topics' notes, as `{source, target, rel, topic, title, dir}` with `dir` `out` or `in`. There are at most 400, metadata links first.

A link's `rel` is one of:

- `links_to`, a body wikilink.
- `superseded_by`, `conflicts_with`, `depends_on`, or `part_of`, from a relation field ([brain format §6.6](brain-format.md#66-relations)). The source is the note that holds the field: the old note, either note of a conflict, the dependent, or the part.
- `source`, a `bw-sources` entry. The source is the citing note and the target the cited note or episode.

A node:

```json
{"id": "01J9Z7Q2…", "title": "Use SQLite FTS5 for local search", "path": "topics/search/fts5.md",
 "kind": "note", "topic": "search", "type": "decision", "status": "active",
 "updated": "2026-10-09", "aliases": [], "lines": 42, "chars": 1830, "degree": 7,
 "flags": ["stale"]}
```

`chars` counts the characters of the note's text without its frontmatter.

`/api/note/<id>` returns the outline read (`id`, `title`, `path`, `abs_path`, `kind`, `type`, `status`, `topic`, `updated`, `banners`, `summary`) and the note's links:

- `outlinks`: `[{relation, target, id, title, path, resolved}]`, one per target, metadata links first. `relation` reads from this note, with the labels of [index and search §3](index-and-search.md#3-schema): a relation field's name such as `depends_on`, `links_to`, or `cites` (a `bw-sources` entry). `target` is the link as written, and an unresolved link has `id`, `title`, and `path` null.
- `backlinks`: `[{id, title, path, relation}]`, at most 10, typed relations first. `relation` reads from this note: `supersedes` (the other note names this one in `bw-superseded_by`), `conflicts_with`, `depended_on_by`, `linked_from`, or `cited_by`.
- `parts` and `parts_total`: the notes that name this one in `bw-part_of`, `[{id, title, path}]` sorted by title with numbers compared as numbers, at most 50, and their count ([index and search §7](index-and-search.md#7-read)).

It also returns what the preview needs:

- `properties`: the frontmatter as written.
- `markdown`: the body after the frontmatter, at most 200 KB.
- `links`: a map from wikilink text as written to `{id, title, topic}` for each target that resolves. Other links are absent, so they render as unresolved.

`/api/search?q=` returns `{results: [{id, title, topic, kind, snippet}]}`, at most 20, from the mapped topics only. Notes whose title or alias contains the query come first, prefix matches before the rest, followed by index search hits with snippets.

`/api/health` returns `{counts: {flag: n}, items: {flag: [{id, title, topic}]}}`, at most 200 items per flag.

A node's `flags`:

| Flag | Meaning |
|---|---|
| `conflict` | An active note in a `bw-conflicts_with` relation with another active note, whichever holds the field |
| `stale` | An active note that rests on (`bw-depends_on`), or links to, a superseded or archived note other than one it replaced; the queries of the stale report ([lint §7](lint-and-reports.md#7-reports)) |
| `superseded` | Its status is superseded |
| `orphan` | A note that nothing else links to |
| `lint_error` | The index recorded a parse problem for the file |

The map lists the flags in the order conflict, stale, superseded, orphan, lint error, and a star's halo shows the first that applies.

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
- The topic tree: depth-first order with numbers compared as numbers, content totals, and flows of typed links only.
- Export: titles containing HTML and script are inert, and the CSP hashes match.
- Front end, in brain-wiki-viz: type checks and unit tests for layout determinism, footprint containment, ring order and wrapping, and level selection (`npm run check`). Here: the bundle is complete, stamped with a clean commit, and matches a rebuild.
- Browser: headless Chrome screenshots of each level on the fixture brain and a generated 10k brain, interaction scripts (search, fly to a topic, select a note, `Esc`), and frame time. Scripts drive the app through `window.__brainViz` (the controller, the scene, and a `ready` flag) and wait for `body[data-ready]`.

## 10. Alternatives considered

| Option | Why not |
|---|---|
| The first design, one 3D force graph of every note (`3d-force-graph`) | It did not scale: a global layout and payload, a tangle of lines, and no navigation. |
| A force layout per topic, seeded by its folder tree | Deep or lopsided folder trees crossed themselves: 77 of 175 tree lines crossed on a 176-note topic five folders deep, and the 3D scatter hid how deep a folder sat. |
| A radial tree per topic, with a slice per folder and a line per note | No crossings, but a folder of 200 daily notes became a spiky ball, lines routed along rings read as bent polylines, and nothing showed how much a note holds. |
| Circle packing per topic, nested circles with no lines | Compact, but containment alone did not read as levels, the topic page often landed at the edge, and lines from a folder to its sub-folders ran through sibling circles (7 of 33 on a 176-note topic). Orbits around each folder's core fix both, at some cost in space when a folder has many sub-folders. |
| Concentric rings for a topic with many notes, each restarting at 12 o'clock, or one arm coiling outward | Rings read as a stack of hoops. One continuous arm keeps file order on a single path but looks much like the rings from a distance; galaxy arms read as one shape and put the newest dated notes at the rim. |
| Sunflower clusters inside folder outlines | No crossings, but golden-angle spacing laid notes out evenly, so a folder of 200 daily notes read as a grid rather than a cluster, and the outlines added clutter the links already conveyed. |
| Groups of topics clustered by their links, and each topic's notes as a star cluster around its page (the second design) | The folder tree already says how topics group, and clustering put topics in groups nobody made. A scatter showed neither a note's length nor its place in its folder, and the cluster around each folder note only hinted at the tree. |
| Sub-topics packed around their parent's own notes, with the parent's ring as the center of the packing | A small center lands at the edge of the packing, so each level could double a footprint; a tree seven folders deep took most of the map. |
| Sub-topics packed inside their parent's footprint, around its ring | Stems ran across siblings and sub-topics sat under their parent's ring: 29 of 168 stems and 64 sub-topics on a 181-topic brain. In orbit, each sub-topic keeps a wedge of its own. |
| A topic's details with a button that opens its topic page as a note | Three views of one thing, each a click from the next: the topic's counts, the page's summary and links, and the page's text in the preview. A topic of five notes or fewer listed none of them. |
| Stems that start at the edge of the parent's ring | They stay off the parent's own notes, but the ring draws only close up, so from farther out a topic's stems started on an invisible circle around its star. |
| A fixed gap between planes | Deep sub-topics are small, so a gap that reads at the top made their stems long vertical spikes; the gap shrinks with depth instead. |
| A 2.5D terrain atlas, with topics as territories and notes as towns | Easiest to navigate, but the map keeps depth for separating levels. Both would use the same levels and API. |
| No build step, with vendored ES modules and hand-written JavaScript | Keeps contributors off Node, but panels of this size and custom shaders are much harder to maintain without types and a bundler. Committing the bundle keeps users off Node anyway. |
| React | Preact gives the same model at a fraction of the size. |
| Obsidian's built-in graph | It shows no supersession, relation kinds, citations, or health flags. It works alongside this map. |
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
