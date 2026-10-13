---
id: 01M3250V00139H5TJCM8S47D6R
type: design
title: "Rendering"
aliases: ["12 §3"]
tags: [visualizer]
source: "docs/design/12-visualizer.md#3-rendering"
bw-part_of:
  - "[[visualizer]]"
---
# Rendering

- **three.js on WebGL2.** Nebulae are additive glow particles (one draw call
  for all topics); stars are instanced glow points with per-star size
  (√degree), color (topic hue), brightness (recency), ghosting
  (superseded or archived), and a halo ring per health flag, all in one
  shader. Trails are solid fat lines; directed relations add slow pulses
  running along them (prerequisite → dependent, old → new), so motion shows
  direction without breaking the line into dashes.
- **Post-processing:** bloom, ACES tone mapping, vignette, depth fog, a
  starfield backdrop. Camera moves are eased flights, not jumps.
- **Navigation is a 2.5D map,** not a free 3D camera: the view keeps a fixed
  tilt and heading, dragging pans across the galactic plane, and the wheel
  or a pinch zooms toward the cursor. Depth still separates dense clusters,
  but nobody gets lost upside down. Bloom and
  the constellation dust ease down at the topic and note levels, where the
  camera sits inside the glow and full strength would merge a cluster into
  one white blob.
- **Highlight issues** (`H`, formerly health mode) recolors instead of only dimming: each topic nebula
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
- **Layout is deterministic and local.** Constellations sit on a galactic
  disk (golden-angle spiral, collision-relaxed); topics sit on a spiral
  inside their constellation, a parent topic at the center of the
  constellation its sub-topics form; notes are laid out per topic as a
  radial tree of its folders, facing the camera: the topic index at the
  center, each folder in a slice of the circle sized by the notes below it,
  its sub-folders splitting that slice, and its own notes fanned out just
  beyond its star (in rows when there are many). Because every folder stays
  in its slice, tree lines never cross. Nesting reads as distance twice over:
  each level sits one ring farther out and one tier farther back from the
  camera, straight along the view, so depth never moves a star on screen.
  Typed links are drawn but do not move stars. The same brain always produces
  the same map, and no layout ever spans the whole brain.
- **Labels say what things are.** The galaxy is the look, not the vocabulary:
  the interface says Overview, Group (of topics), Topic, and Note, never
  galaxy or constellation; *issues*, not flags; *session captures*, not
  episodes; *Facts*, not claims; the topic index, not the hub. Relations read
  as plain verbs (Part of, Contains, Depends on, Enables, Conflicts with,
  Replaces, Replaced by, Related to), and every number names its unit.
- **The hierarchy follows the folders.** Inside a topic, the map's tree is
  the folder tree, as Obsidian shows it: a sub-folder is a branch, and its
  folder note (`x/x.md`, `x/index.md`, or `x/readme.md`) is the branch's star;
  a folder without one is still a branch, drawn as a label. A folder's label
  drops the leading ` · ` parts its parent folders' titles already say
  ("Lumen guide · Sync · Conflicts" reads "Conflicts"). A written `part_of` that
  points elsewhere is a relation, not the note's place.
- **Encoding of relations:**

| Relation | Trail |
|---|---|
| `part_of` | The folder tree (the dock's **Folders** chip, on by default): faint lines from each folder to the one above, running along the parent's ring and then straight out, and from each note straight to its folder's star (along the ring too when the folder's notes fan wide); notes directly in the topic draw none, so flat topics stay clean |
| `depends_on` | Blue, flowing prerequisite → dependent |
| `conflicts_with` | Red, always shown when either end is visible |
| `supersedes` | Amber, flowing old → new |
| `related_to` | Faint violet |
| Wikilinks (`links_to`) | Hidden by default; a dock toggle |
