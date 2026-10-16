# D32: Format 3: notes are Markdown pages

Status: accepted.
Argued in: [brain format §6](../design/brain-format.md#6-notes), [brain format §13](../design/brain-format.md#13-format-versioning).

Format 3: a note is an ordinary Markdown page. Frontmatter holds metadata only; facts and connections are body Markdown, and notes connect through wikilinks. `brain lint --fix` converts format 1 and 2 notes.

## Alternatives considered

Keeping claims and relations in frontmatter (D3's format 2)
