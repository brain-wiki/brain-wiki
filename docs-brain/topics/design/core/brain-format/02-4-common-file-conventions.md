---
id: 01M3250V00ZRE7NA69N0WQBKWC
type: design
title: "Common file conventions"
aliases: ["02 §4"]
source: "docs/design/02-brain-format.md#4-common-file-conventions"
---
# Common file conventions

- Encoding UTF-8, no BOM. Line endings `\n`; `\r\n` is accepted on read and
  preserved on write for files that already use it.
- Frontmatter, when present, is a YAML block delimited by `---` lines at the
  very top of the file.
- **Frontmatter values are scalars or lists of scalars.** Nested mappings
  MUST NOT be used. Reasons: Obsidian's properties editor only handles flat
  properties; LLMs frequently break nested YAML; flat values index trivially.
- **Frontmatter holds metadata only.** What a note knows (facts, reasons,
  connections to other notes) MUST be written in the body (§6.2). Obsidian
  defines properties as small, atomic values and renders no Markdown in
  them.
- **brain-wiki's fields carry the `bw-` prefix.** On notes these are
  `bw-superseded_by` (§6.3), `bw-sources` (§6.4), and `bw-stage`; episodes
  carry their provenance in `bw-` fields (§9). Shared note metadata stays
  unprefixed: `id`, `type`, `title`, `aliases`, `tags`, `status`,
  `created`, `updated`. Reasons: the prefix marks what brain-wiki parses
  and validates, keeps those fields together in Obsidian's Properties view,
  and cannot clash with another tool's property names. The prefix is
  reserved: lint reports an unknown `bw-` field on a note (BW118).
- Links in brain-wiki's fields are written double-quoted (`"[[note]]"`), so
  YAML reads them as strings and Obsidian keeps them live links.
- Other frontmatter wikilinks (`up:`, `related:`) are the user's
  properties: preserved and filterable, but not read as links.
- Writers change only the lines they mean to change. They MUST NOT reformat
  frontmatter or reflow prose they did not edit.
