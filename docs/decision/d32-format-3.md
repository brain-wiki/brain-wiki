# D32: Format 3: notes are Markdown pages

Status: accepted, amended by [D39](d39-relation-fields.md).
Argued in: [brain format §6](../design/brain-format.md#6-notes), [brain format §13](../design/brain-format.md#13-format-versioning).

In format 3 a note is an ordinary Markdown page. Frontmatter holds metadata only. Facts and connections are body Markdown, and notes connect through wikilinks. `brain lint --fix` converts format 1 and 2 notes as one undoable run.

## Alternatives considered

- Keeping claims and relations in frontmatter, as format 2 did (D3).
