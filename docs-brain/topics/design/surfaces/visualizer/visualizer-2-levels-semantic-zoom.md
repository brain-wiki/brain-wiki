---
id: 01M3250V000BB22475N4WZD8ES
type: design
title: "Levels (semantic zoom)"
aliases: ["Visualizer §2"]
source: "docs/design/visualizer.md#2-levels-semantic-zoom"
---
# Levels (semantic zoom)

```
 Galaxy ──► Constellation ──► Topic ──► Note
 groups of     topics as        hub core,     one note in focus,
 topics        nebulae          notes as      its linked neighborhood
                                stars         lit, the rest dimmed
```

| Level | Shows | Loaded from |
|---|---|---|
| Galaxy | Constellations as labeled clusters, the flows between them, and the inbox at the center | `/api/world` |
| Constellation | Its topics as clouds, sized by note count and brightened by recency, and the flows between them | `/api/world` |
| Topic | The hub as a bright core, each sub-folder as a labeled branch with its notes around it, links between notes as trails, and links leaving the topic running toward the other topic | `/api/topic/<slug>` |
| Note | The note and the notes it links to or from lit, the rest dimmed, with its details in the side panel | `/api/note/<id>` |

How the levels behave:

- Detail follows screen size, as on a map. A topic's stars load when its cloud grows past a size on screen, wherever the camera is. Labels appear the same way, in priority order: hubs, then flagged notes, then well-linked notes and the stars biggest on screen. Labels that would collide are hidden. Map labels name their units: "82 notes", "82 notes · 3 with issues", "5 session captures". At most 12 topics show their stars at once, nearest first.
- Zooming changes the level. Scrolling in on a constellation enters it once it fills about a quarter of the screen, and on a topic at about a fifth. Scrolling out leaves below a smaller size, so the level does not flicker, and panning to a neighbor at the same zoom switches to it. The camera stays where the user put it, and the change replaces the current history entry. Clicking selects directly: the camera flies there and a history entry is added. A selected note stays selected while its topic is on screen, and `Esc` goes up one level.
- Constellations come from the topic tree ([[brain-format-2-directory-layout|brain format §2]]). Each top-level topic with sub-topics forms a constellation with everything below it. The remaining topics, and every topic of a flat brain, are grouped by the links between their notes, with deterministic modularity clustering into groups of 4 to 40 topics. Topics with no links to other topics are grouped in chunks of up to 40. A brain with 12 topics or fewer has one constellation and opens at that level.
