---
id: 01M3250V00ZRE7NA69N0WQBKWC
type: design
title: "Common file conventions"
aliases: ["02 §4"]
tags: [brain-format]
source: "docs/design/02-brain-format.md#4-common-file-conventions"
bw-part_of:
  - "[[brain-format]]"
---
# Common file conventions

- Encoding UTF-8, no BOM. Line endings `\n`; `\r\n` is accepted on read and
  preserved on write for files that already use it.
- Frontmatter, when present, is a YAML block delimited by `---` lines at the
  very top of the file.
- **Frontmatter values are scalars or lists of scalars.** Nested mappings
  MUST NOT be used. Reasons: Obsidian's properties editor only handles flat
  properties; LLMs frequently break nested YAML; flat values index trivially.
- **brain-wiki's fields carry the `bw-` prefix.** Relations (§6.4), claims
  (§6.3), `bw-privacy`, `bw-stage`, and episode provenance (§9) are fields
  named `bw-…`. Shared note metadata stays unprefixed: `id`, `type`, `title`,
  `aliases`, `tags`, `status`, `created`, `updated`. Reasons: the prefix
  marks what brain-wiki parses and validates, keeps those fields together in
  Obsidian's Properties view, and cannot clash with another tool's property
  names. The prefix is reserved: lint reports unknown `bw-` fields (BW302).
- Claims and relations are strings, written double-quoted, one list item
  per line. Obsidian shows and edits them as list properties, and quoted
  `"[[links]]"` stay live links.
- Other frontmatter wikilinks (`up:`, `related:`) are not relations.
  Importers convert common link properties into `bw-` relations
  ([[import|09]]).
- Writers change only the lines they mean to change. They MUST NOT reformat
  frontmatter or reflow prose they did not edit.
