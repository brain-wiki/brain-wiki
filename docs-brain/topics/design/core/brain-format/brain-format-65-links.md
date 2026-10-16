---
id: 01M3250V005D7BTFR1MR3TCG24
type: design
title: "Links (Brain format)"
aliases: ["Brain format §6.5"]
source: "docs/design/brain-format.md#65-links"
---
# Links (Brain format)

brain-wiki recognizes these body links:

- `[[target]]`, `[[target|label]]`, `[[target#heading]]`,
  `[[target#^block]]`, and `[[target\|label]]` (the escaped pipe Obsidian
  uses in tables)
- `![[embed]]`, recorded as a link
- `[label](relative/path.md)`, including `#heading` fragments

Links in code, links within the same note, and Markdown links to URLs,
`mailto:`, or non-Markdown files are not note links.

Body links are stored as `links_to` edges. `bw-superseded_by` and
`bw-sources` add `superseded_by` and `source` edges
([[index-and-search-3-schema|index and search §3]]). Edges feed
backlinks, `brain_neighbors`, orphan detection, link repair, and the
visualizer. Only `superseded_by` carries a retrieval rule (§7).

Resolution order for a link target `t`, comparing Unicode case-folded
strings with `.md` optional:

1. `t` is a path relative to the linking note's folder.
2. `t` is a path relative to the brain root.
3. `t` contains `/` and is the end of exactly one note's path.
4. `t` equals exactly one note's file name.
5. `t` equals exactly one note's alias.
6. `t` equals exactly one note's title.
7. `t` is a note id (`[[01J9Z7Q2…]]`).

- Zero matches is an unresolved link. More than one match at the first
  step that matches is ambiguous. Lint reports both (BW310 for body
  links, BW119 and BW122 for fields).
- Steps 1 to 4 are how Obsidian resolves links. Steps 5 to 7 are
  leniencies for hand-written and model-written links.
- Links brain-wiki writes use the file name, or the full path without
  `.md` when another note has the same file name, so they work in
  Obsidian too.

The index remembers each id's previous paths. When a file moves and links
break, `brain lint --fix` rewrites them using the id. `brain mv` moves a
file and rewrites links in one step.
