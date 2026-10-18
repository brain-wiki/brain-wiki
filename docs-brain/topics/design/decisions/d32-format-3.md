---
id: 01M3250V005NG9E7VZJE4DX48Z
type: decision
title: "D32: Format 3: notes are Markdown pages"
aliases: ["D32"]
source: "docs/decision/d32-format-3.md"
---
# D32: Format 3: notes are Markdown pages

Status: accepted, amended by [[d39-relation-fields|D39]].
Argued in: [[brain-format-6-notes|brain format §6]], [[brain-format-13-format-versioning|brain format §13]].

In format 3 a note is an ordinary Markdown page. Frontmatter holds metadata only. Facts and connections are body Markdown, and notes connect through wikilinks. `brain lint --fix` converts format 1 and 2 notes as one undoable run.

### Alternatives considered

- Keeping claims and relations in frontmatter, as format 2 did (D3).

## Related
- [[d03-flat-frontmatter]]: D3: Frontmatter is flat metadata
- [[d39-relation-fields]]: D39: Relations are link-only fields the author declares
