---
id: 01M3250V002SS09D5ZKWWANYYK
type: design
title: "Links (Brain format)"
aliases: ["02 §6.5"]
source: "docs/design/02-brain-format.md#65-links"
---
# Links (Brain format)

Body links of either form are recognized:

- `[[target]]`, `[[target|label]]`, `[[target#heading]]`, `[[target#^block]]`
- `[label](relative/path.md)`, including `#heading` fragments
- `![[embed]]` embeds are recorded as links

Body links are stored as `links_to` edges; `bw-superseded_by` and
`bw-sources` add `superseded_by` and `source` edges
([[04-3-schema|04 §3]]). Edges feed backlinks,
`brain_neighbors`, orphan detection, link repair, and the visualizer. Only
`superseded_by` carries a retrieval rule (§7).

**Resolution order** for a link target `t` (all comparisons on Unicode
case-folded strings, `.md` optional):

1. `t` is a path relative to the brain root, or to the linking note's folder
2. `t` equals exactly one note's file name (Obsidian's default behavior)
3. `t` equals exactly one note's alias
4. `t` equals exactly one note's title
5. `t` is a note id (`[[01J9Z7Q2…]]`)

Zero matches is an unresolved link; more than one match at the first
matching step is ambiguous. Both are lint findings. Steps 3 to 5 are
leniencies for hand-written and model-written links; Obsidian itself only
resolves steps 1 and 2. Writers therefore always emit a file-name link
(`[[file name]]`, or the shortest unique path when names collide), adding
`|label` when the title differs, so every link they write also works in
Obsidian.

**Renames.** The index remembers each id's previous paths. When a file
moves and links break, `brain lint --fix` rewrites the links using the id.
`brain mv` moves a file and rewrites links in one step.
