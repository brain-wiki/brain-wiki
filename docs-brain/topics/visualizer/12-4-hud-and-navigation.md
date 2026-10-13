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
| Top bar | Brain name and profile; back, forward, and a history list of everything opened in this tab; the breadcrumb (Galaxy › constellation › parent topics › topic › folders › note); search (`/` or `Ctrl/⌘-K`); totals (notes, links, flagged, inbox), where *flagged* opens the Health tab and *inbox* says what is pending |
| Left: navigator | Tabs: **Atlas** (constellations → topics tree with counts, sub-topics nested under their parent, health badges and recency bars; filter and sort by size, health, recency, name), **Health** (flagged notes grouped by flag, counts first), **Changes** (recent runs; selecting one highlights what it touched) |
| Right: inspector | Topic: description, counts, flag breakdown, busiest notes, strongest flows to other topics. Note: type, status and privacy chips, guard banners, claims (superseded struck through, unverified marked), relations by family, backlinks, path with copy and an `obsidian://` link |
| Right: note preview | Clicking a note (a star, a row, a search result, a wikilink) also opens its preview over the inspector: the note rendered like Obsidian's reading view, with properties from the frontmatter, then the body (headings, lists and tasks, tables, code, callouts, highlights, tags, footnotes). Wikilinks open the linked note and move the map with it, in the body and in property values alike (so `bw-part_of` and other relations are links); links the viewer may not see show as unresolved. A claim's `{id: …}` block shows as a tooltip. `Esc` closes it, `P` toggles it |
| Bottom left | Minimap: top-down galaxy with the current view; click to fly. Beside it, the level ladder: Galaxy, Constellation, Topic, Note, with the current level and its place named, a marker that creeps toward the next level as you scroll, and earlier levels clickable |
| Bottom center | Layer dock: one chip per relation family (the legend and the filter; a hidden family shows a hollow swatch and a struck label), health mode, a ⋯ menu (labels, Graphics: Auto, High, Low), and help. Going back to the overview is the breadcrumb's first crumb or `R` |
| Overlays | Hover card: for a star its title, topic, status, and flags; for a trail the two notes it connects, read as a sentence ("2026.9.9 supersedes 2026.9.8"), with the trail and both ends lit, and a click goes to the other end; for a flow the two topics and the link count by type. Command palette with server-side search results grouped by topic; `?` shows the shortcuts |

Keys: `/` or `Ctrl/⌘-K` search, `Esc` up one level or close, `H` health
mode, `L` labels, `P` note preview, `[` and `]` previous and next topic,
`R` back to the overview, `?` help. The URL hash records the focus (`#/c/<id>`,
`#/t/<slug>`, `#/t/<slug>/n/<id>`), so a view can be reopened. Every place
opened becomes a browser history entry tagged with its position in the tab's
trail, so the top bar's back and forward buttons, the history list, `Alt-←`
and `Alt-→`, and the browser's own buttons all move through the same stack;
the trail survives a reload of the tab.
