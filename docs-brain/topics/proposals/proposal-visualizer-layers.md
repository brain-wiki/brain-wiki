---
id: 01M3250V00GVN3DX1H39RX1F9K
type: proposal
title: "Visualizer layers: topics as planes, notes as rings"
source: "docs/proposal/visualizer-layers.md"
---
# Visualizer layers: topics as planes, notes as rings

Status: draft; decisions made with the maintainer on 2026-10-19 (§7). Not
built.

The map today groups topics into constellations, scatters a topic's notes
as stars around its page, and keeps a fixed tilt
([[visualizer-2-levels-semantic-zoom|visualizer §2, §3]]). This
proposal lays the brain out as its folder tree in three dimensions: each
level of topics on its own plane, each topic's notes in a ring around its
page, and a view you can turn.


## 1. The model

A topic is a folder. Inside it:

- `Index.md` is the topic itself: what the topic is about.
- Every other note describes the topic, the way attributes describe a
  thing. They are still called notes; "attribute" only explains the role.
- Every sub-folder is a sub-topic of it.

This needs the first change from the topic analysis: every folder under
`topics/` is a topic, with or without an `Index.md`
(topic analysis §8). A topic
without one has no content of its own.


## 2. Layout

```
           plane 0   ·  top-level topics, packed by size
     ◜◝ ring ◜◝      ·  each topic's notes around its Index.md
        │ stem
           plane 1   ·  sub-topics, inside the parent's footprint
     ◜◝ ring ◜◝
        │
           plane 2   ·  and so on, one plane per level
```

| Rule | Detail |
|---|---|
| Planes | Top-level topics sit on plane 0. Each level of sub-topics sits one fixed step lower. |
| Footprint | A topic's area in the xy plane grows with all the content under it, sub-topics included. Top-level footprints are packed on plane 0; a topic's sub-topics are packed inside its footprint on the plane below. Packing is deterministic, so the same brain gives the same map. Footprints are not drawn. |
| Content | The characters of a note's text, without its frontmatter. A topic's content is the sum over every note under it. |
| Center | The topic's `Index.md` is a bright core at the center of its footprint, labeled with the topic's title. A topic without one shows a small marker with its folder name. |
| Stem | A line joins each sub-topic's center to its parent's center. |
| Ring | The topic's other notes form a ring around its center, on its plane (§3). |
| Links | Typed links (Replaces, Sources, Conflicts, Depends on, Part of) run between the tips of note slices, across planes when needed. Flows between top-level topics on plane 0 count only typed links. Body links are not drawn. |

`bw-part_of` does not move anything: a note sits only under its folder, and
Part of shows as a link.


## 3. A topic's ring

- Notes go clockwise from 12 o'clock, in file-name order with numbers
  compared as numbers, as Obsidian's file explorer shows them.
- Each note is a slice. A longer note gets a wider slice, and its slice
  reaches farther from the center, the radius growing with the square root
  of its content so long notes do not swamp the topic.
- A slice is faint and filled in the topic's color, brighter when recently
  updated, with no outline and a gap to its neighbors. A star at its outer
  tip carries the label, the issue halo, and the selection.
- Slices keep a minimum width. When a ring is full, the order continues on
  the next ring outward, again clockwise from 12 o'clock.


## 4. What shows

| Element | When |
|---|---|
| Topic centers and stems | Always, for the whole tree |
| A topic's slices | When the topic is big enough on screen, as stars load today |
| Planes more than two levels below the topic in view | Fade out |
| Ancestors of the topic in view | Keep a faint center and stem; their slices fade out while you are below them |
| Siblings of the topic in view | Normal, on their own plane |

The levels become Overview, Topic, and Note. Groups (constellations) and
the clustering of linked topics are removed; the folder tree is the map.


## 5. Navigation

| Input | Does |
|---|---|
| Drag | Pans across the xy plane |
| Shift+drag | Turns the view around the point in view, in any direction, stopping before the camera goes below the map or upside down |
| Wheel or pinch | Zooms toward the cursor |
| `R` | Returns to the default view: tilted about 50° from straight down, heading north |

The map opens at the default view, so the lower planes show.


## 6. Changes

| Area | Change |
|---|---|
| brain-wiki topics | Every folder under `topics/` is a topic (topic analysis change 1) |
| Index | A note's content length in characters, for slices and footprints |
| Viz export | The topic tree with every folder; content per note and per topic; no constellations |
| Viz scene | Planes, footprint packing, rings of slices, stems, fading by depth; topic clouds, constellations, folder wedges, and Plummer clusters removed |
| Viz controls | Shift+drag orbit with limits, `R` to reset |
| HUD | Overview / Topic / Note in the breadcrumb and zoom ladder; no Group level; the minimap shows plane 0 from above |
| Docs | [[visualizer\|Visualizer]] §2, §3, §4, §6 rewritten when built; this proposal deleted |


## 7. Decided

| Question | Answer (2026-10-19) |
|---|---|
| A new word for notes? | No. Notes describe their topic like attributes; the product keeps saying note |
| Where do sub-topics sit? | Inside the parent's footprint, one plane lower; footprints are not drawn |
| How does note length show? | A pie ring: wider slice for longer, reaching a little farther out |
| How is a slice drawn? | Faint filled slice, star at its tip |
| What counts as content? | Characters of the note text, frontmatter excluded |
| Topics with many notes? | Slices keep a minimum width and wrap onto more rings |
| Keep Groups? | No; the tree is the map |
| How much shows? | All centers and stems; slices near focus; planes beyond two levels fade |
| Planes above the focus? | Ancestors keep a faint center and stem; their slices fade |
| Ring order? | File name, numbers as numbers |
| Default view and turning? | Tilted default; Shift+drag turns, never under the map or upside down; `R` resets |


## 8. Open

- The plane step and the footprint scale, tuned on a real brain so planes
  read as layers without the tree getting tall.
- Labels on dense rings: which tips get a label when they collide.
- Files that are not notes (images, PDFs) and notes outside `topics/`
  (a brain's root `README.md`): not drawn, or drawn faintly.
- Touch: which gesture turns the view.
- Cost at 10k notes: slices as one instanced draw call per plane.
