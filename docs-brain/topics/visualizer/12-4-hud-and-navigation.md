---
id: 01M3250V00AJ590C3TQZF2D3VA
type: design
title: "HUD and navigation"
aliases: ["12 §4"]
tags: [visualizer]
source: "docs/design/12-visualizer.md#4-hud-and-navigation"
bw-part_of:
  - "[[visualizer]]"
---
# HUD and navigation

Glass panels over the scene, keyboard-first:

| Region | Contents |
|---|---|
| Top bar | Brain name and profile; back, forward, and a history list of everything opened in this tab; the breadcrumb (Overview › group › parent topics › topic › folders › note); search (`/` or `Ctrl/⌘-K`); totals (topics, notes, links, *with issues*, *inbox*), where *with issues* opens the Issues tab and *inbox* says what is waiting to be merged |
| Left panel: browse | Tabs: **Topics** (groups → topics, sub-topics nested under their parent, with "N topics · N notes" and "N notes" counts, issue badges and recency bars; filter, and sort by most notes, most issues, recently changed, or name), **Issues** (notes with issues grouped by kind, counts first, and the switch that highlights them on the map), **Activity** (recent recorded changes; selecting one highlights the notes it changed) |
| Right panel: details | Always shown, headed **Details**; with nothing selected it says how to fill it. A group: its topics. A topic: description, counts (notes, changed 7d, with issues, last change), issue breakdown, **Open the topic index**, **Sub-topics** and **Folders** (each with its note count, clickable), **Most connected** notes (with link counts; hidden for topics of five notes or fewer), **Linked topics**. A note: where it lives ("In Guide › Sync › …"), type, status and privacy chips, guard banners, **Facts** (superseded struck through, unverified marked), relations by family, **Linked from**, path with copy and an `obsidian://` link |
| Right: note preview | Clicking a note (a star, a row, a search result, a wikilink) also opens its preview over the inspector: the note rendered like Obsidian's reading view, with properties from the frontmatter, then the body (headings, lists and tasks, tables, code, callouts, highlights, tags, footnotes). Wikilinks open the linked note and move the map with it, in the body and in property values alike (so `bw-part_of` and other relations are links); links the viewer may not see show as unresolved. A claim's `{id: …}` block shows as a tooltip. `Esc` closes it, `P` toggles it |
| Bottom left | Minimap: top-down galaxy with the current view; click to fly. Beside it, the zoom ladder: Overview, Group, Topic, Note, with the current level and its place named, a marker that creeps toward the next level as you scroll, and earlier levels clickable |
| Bottom center | Layer dock: one chip per relation family (the legend and the filter; a hidden family shows a hollow swatch and a struck label), health mode, a ⋯ menu (labels, Graphics: Auto, High, Low), and help. Going back to the overview is the breadcrumb's first crumb or `R` |
| Overlays | Hover card: for a star its title, topic, status, and flags; for a trail the two notes it connects, read as a sentence ("2026.9.9 supersedes 2026.9.8"), with the trail and both ends lit, and a click goes to the other end; for a flow the two topics and the link count by type. Command palette with server-side search results grouped by topic; `?` shows the shortcuts |

Keys: `/` or `Ctrl/⌘-K` search, `Esc` up one level or close, `Alt-↑` and
`Alt-↓` up and down one nesting level (note, folder, topic, parent topic,
group, overview; down retraces the way up, else enters the biggest place
inside), `H` health mode, `L` labels, `P` note preview, `[` and `]` previous
and next topic, `R` back to the overview, `?` help. The URL hash records the focus (`#/c/<id>`,
`#/t/<slug>`, `#/t/<slug>/n/<id>`), so a view can be reopened. Every place
opened becomes a browser history entry tagged with its position in the tab's
trail, so the top bar's back and forward buttons, the history list, `Alt-←`
and `Alt-→`, and the browser's own buttons all move through the same stack;
the trail survives a reload of the tab.
