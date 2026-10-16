---
id: 01M3250V00EREQHKVW32J0S2J8
type: design
title: "Rendering"
aliases: ["Visualizer §3"]
source: "docs/design/visualizer.md#3-rendering"
---
# Rendering

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
