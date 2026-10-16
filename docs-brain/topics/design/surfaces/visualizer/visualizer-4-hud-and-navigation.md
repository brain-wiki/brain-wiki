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
- The breadcrumb: Overview › group › parent topics › topic › folders › note.
- Search, opened with `/` or `Ctrl/⌘-K`.
- Totals: topics, notes, links, notes with issues, and the inbox. "With issues" opens the Issues tab, and "inbox" says what is waiting to be merged.

Left panel, with three tabs:

- Topics lists groups and their topics, with sub-topics nested under their parent. A group opens when you enter it, and its chevron or a second click closes it. Rows show note counts, issue badges, and recency bars. The list can be filtered and sorted by name (the default, ignoring case and with numbers in order), most notes, most issues, or most recently changed.
- Issues lists notes with issues grouped by kind, counts first, with the switch that highlights them on the map.
- Activity lists recent runs. Selecting one highlights the notes it changed.

Right panel, headed Details, is always shown and says how to fill it when nothing is selected:

- A group shows its topics.
- A topic shows its description; counts of notes, notes changed in 7 days, and notes with issues; the last change; a breakdown of issues; a button to open the topic index; its sub-topics and folders with note counts; its most connected notes, hidden for topics of five notes or fewer; and linked topics.
- A note shows where it lives ("In Guide › Sync › …"), type, status, and issue chips, and banners for a superseded note or the notes it replaces. Then come its summary, its outgoing links grouped as Replaced by, Links to, and Cites, and its backlinks with how each links here. A resolved link flies to its note, an unresolved one says "not found", and one outside the mapped topics says "not on the map". Last come the path, with a copy button, and an `obsidian://` link.

Clicking a note anywhere (a star, a row, a search result, a wikilink) also opens a preview over the details panel. The preview renders the note like Obsidian's reading view: properties from the frontmatter, then the body with headings, lists and tasks, tables, code, callouts, highlights, tags, and footnotes. Wikilinks in the body and in property values open the linked note and move the map with it, so `bw-superseded_by` and each `bw-sources` entry are links. `Esc` closes the preview and `P` toggles it.

Bottom of the screen:

- Bottom left, a minimap shows the galaxy from above with the current view, and clicking it flies there. Beside it, a zoom ladder names the levels (Overview, Group, Topic, Note) and the current place. A marker creeps toward the next level as you scroll, and earlier levels are clickable.
- Bottom center, the dock has one chip per link kind, which is both legend and filter; a hidden kind shows a hollow swatch and a struck-through label. The dock also has the highlight-issues switch, a ⋯ menu for labels and graphics quality, and help. The breadcrumb's first crumb or `O` returns to the overview.

Overlays:

- Hovering a star shows its title, topic, status, and flags.
- Hovering a trail lights it and both ends, and reads the link as a sentence ("2026.9.9 supersedes 2026.9.8"). Clicking goes to the other end.
- Hovering a flow shows the two topics and the link count, split by kind when not all are body links.
- The command palette shows server-side search results grouped by topic, and `?` shows the shortcuts.

One table drives both the key handler and the shortcuts sheet, which writes keys the way each platform does (⌥ and ⌘ on a Mac, Alt and Ctrl elsewhere):

| Section | Keys | Does |
|---|---|---|
| Move | `Ctrl-↑` / `Ctrl-↓` (⌘ on a Mac) | Up or down one level: note, folder, topic, group, overview. Down retraces the way up, or else enters the biggest place inside |
| Move | `[` / `]` | Previous or next place at the same level |
| Move | `O` | Overview |
| Move | `Alt-←` / `Alt-→` (⌘ on a Mac) | The browser's own back and forward |
| Move | `Esc` | Close what is open, or else go up one level |
| Show | `P`, `I`, `L` | Note preview; highlight issues; labels |
| Show | `1`–`3` | Show or hide a kind of link, in the dock's order |
| Find | `/` or `Ctrl-K` (⌘ on a Mac) | Search |
| Find | `?` | The shortcuts sheet |

While typing in a field, only `Esc` and `Ctrl/⌘-K` work, so `Ctrl/⌘-↑` and `-↓` still move the caret. The shortcuts sheet also explains mouse gestures and how to read the map: star size, brightness, rings, and pulses.

The URL hash records the focus (`#/c/<id>`, `#/t/<slug>`, `#/t/<slug>/n/<id>`), so a view can be reopened. Every place opened becomes a browser history entry tagged with its position in the tab's trail. The top bar's back and forward buttons, the history list, `Alt-←` and `Alt-→`, and the browser's buttons all move through the same stack, which survives reloading the tab.
