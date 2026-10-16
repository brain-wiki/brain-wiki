---
id: 01M3250V005NG9E7VZJE4DX48Z
type: decision
title: "D32: Format 3: notes are Markdown pages"
aliases: ["D32"]
source: "docs/decision/d32-format-3.md"
---
# D32: Format 3: notes are Markdown pages

Status: accepted.
Argued in: [[brain-format-6-notes|brain format §6]], [[brain-format-13-format-versioning|brain format §13]].

Format 3: a note is an ordinary Markdown page. Frontmatter holds metadata only; facts and connections are body Markdown, and notes connect through wikilinks. `brain lint --fix` converts format 1 and 2 notes.

### Alternatives considered

Keeping claims and relations in frontmatter (D3's format 2)

## Related
- [[d03-flat-frontmatter]]: D3: Frontmatter is flat metadata
