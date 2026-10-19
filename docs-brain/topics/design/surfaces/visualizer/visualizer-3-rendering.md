---
id: 01M3250V00EREQHKVW32J0S2J8
type: design
title: "Rendering"
aliases: ["Visualizer §3"]
source: "docs/design/visualizer.md#3-rendering"
---
# Rendering

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

The layout is deterministic. The same brain always produces the same map. A topic is a folder ([[brain-format-2-directory-layout|brain format §2.1]]): its topic page (`Index.md`) is the topic itself, every other note in the folder describes the topic, and every sub-folder is a sub-topic.

```
           plane 0   ·  top-level topics, packed by size
     ◜◝ ring ◜◝      ·  each topic's notes around its topic page
        │ stem
           plane 1   ·  sub-topics, packed inside the parent's footprint
     ◜◝ ring ◜◝
        │
           plane 2   ·  and so on, one plane per level
```

| Rule | Detail |
|---|---|
| Content | The characters of a note's text, without its frontmatter. A topic's content is the sum over every note under it |
| Planes | Top-level topics sit on plane 0. Each level of sub-topics sits on its own plane below: the first 6% of the map's radius under plane 0, each further gap three quarters of the one above, so deep trees stay short |
| Footprint | Bottom up, a topic packs its sub-topics' footprints around its center, largest first; its footprint's area is its ring's plus that packing, so it grows with all the content under it. Top-level footprints are packed the same way on plane 0, and the map is scaled to a fixed radius. Footprints are not drawn |
| Center | The topic page is a bright core at the center of the footprint, labeled with the topic's title. A topic without a page shows a small marker labeled with its folder name |
| Ring | The topic's other notes, around its center on its plane (§3.2) |
| Stem | A curve joins each sub-topic's center to its parent's: it drops from the parent and comes down onto the sub-topic from above, running between the two planes and never along either |

`bw-part_of` does not move anything: a note sits only under its folder, and Part of shows as a link.


### 3.2 A topic's ring

- Notes go clockwise from 12 o'clock, in file-name order with numbers compared as numbers, as Obsidian's file explorer shows them.
- Each note is a slice. A longer note gets a wider slice, and its slice reaches farther from the center, the reach growing with the square root of its content, so long notes do not swamp the topic. The longest note's tip is at the ring's radius, which grows with the square root of the topic's own content.
- A slice is faint and filled in the topic's color, brighter when recently updated and fainter when wide, with no outline and a gap of up to 1.4° to its neighbors. A star at its outer tip carries the label, the issue halo, and the selection, and grows a little with the note's content.
- Slices are at least a 48th of a turn wide.
- A topic with too many notes for one ring lays them out as spiral arms, like a galaxy's: two arms, three from 80 notes, four from 150, starting evenly round from 12 o'clock. Notes in file-name order are dealt round the arms, so on every arm the order runs outward, and dated notes end newest at the rim. Each arm is a logarithmic spiral that winds 1.4 turns clockwise and widens as it goes out, and so do its slices and stars; a longer note's stretch of arm is longer and reaches farther.


### 3.3 Words and lines

The interface says Overview, Topic, and Note, and calls a topic by its title, or by its folder name when it has no topic page. It says issues, not flags; session captures, not episodes; and Sources, not `bw-sources`. Links read as plain verbs (Links to, Replaced by, Conflicts with, Depends on, Part of, Cites, and from the other end links here, replaced by this, conflicts with this, depends on this, parts, cites this), and every number names its unit.

The topic tree is always drawn, as a curved stem from each sub-topic's center to its parent's, brighter at the parent end. A body wikilink only says that one note mentions another, so the map does not draw it, and flows count only typed links; the Details panel lists body links. The map draws five kinds of link between notes, as arcs from tip to tip that rise higher the farther apart the notes are, across planes when the two notes' topics are on different levels. Flows between top-level topics arc the same way. Each kind has a chip in the dock, and all are on by default. A trail runs from the note that holds the link to the one it names:

| Kind (dock chip) | From | Trail |
|---|---|---|
| Replaces | `bw-superseded_by` (`superseded_by`) | Amber, pulsing from old to new |
| Sources | A `bw-sources` entry (`source`) | Faint grey-blue, from the citing note to the cited one |
| Conflicts | `bw-conflicts_with` (`conflicts_with`) | Red and thick, with no direction |
| Depends on | `bw-depends_on` (`depends_on`) | Blue, pulsing from the dependent to the note it rests on |
| Part of | `bw-part_of` (`part_of`) | Teal, from the part to its whole |
