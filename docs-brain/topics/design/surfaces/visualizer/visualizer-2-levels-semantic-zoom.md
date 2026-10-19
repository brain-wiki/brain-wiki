---
id: 01M3250V000BB22475N4WZD8ES
type: design
title: "Levels (semantic zoom)"
aliases: ["Visualizer §2"]
source: "docs/design/visualizer.md#2-levels-semantic-zoom"
---
# Levels (semantic zoom)

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
| A topic's ring | When the ring is about 70 px or more across on screen (radius), at most 16 at once, biggest first |
| Planes more than two levels below the topic in view (below plane 0 at the overview) | Fade out |
| Ancestors of the topic in view | Keep a faint center and stem; their rings fade out |
| Siblings of the topic in view | Nearly full, on their own plane |
| Other topics | Dimmed |

How the levels behave:

- Labels appear by screen size, in priority order: topic pages, then flagged notes, then well-linked notes and the stars biggest on screen. Labels that would collide are hidden. Map labels name their units: "82 notes", "82 notes · 3 with issues", "5 session captures". A topic's note count includes its sub-topics.
- Zooming changes the level. Scrolling in enters the deepest topic around the point in view once its footprint fills about 30% of the screen height, and then its sub-topics the same way. Scrolling out below 20% returns to the topic above, or to the overview, so the level does not flicker. Panning to a neighbor at the same zoom switches to it. The camera stays where the user put it, and the change replaces the current history entry.
- Clicking selects directly: the camera flies there and a history entry is added. A selected note stays selected while its topic is on screen, and `Esc` goes up one level.
