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
