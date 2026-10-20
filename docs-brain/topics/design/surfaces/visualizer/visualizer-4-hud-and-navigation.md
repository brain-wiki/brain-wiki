---
id: 01M3250V004SK5QB0E55W493BK
type: design
title: "HUD and navigation"
aliases: ["Visualizer §4"]
source: "docs/design/visualizer.md#4-hud-and-navigation"
---
# HUD and navigation

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
