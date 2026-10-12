---
id: 01M3250V00ZRE7NA69N0WQBKWC
type: design
title: "Common file conventions"
aliases: ["02 §4"]
tags: [brain-format]
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
- Wikilinks inside frontmatter are not relations. Typed connections belong
  in `## Relations` (§7). Importers convert common frontmatter link
  properties into relations ([[import|09]]).
- Writers change only the lines they mean to change. They MUST NOT reformat
  frontmatter or reflow prose they did not edit.

## Relations
- part_of [[brain-format]]
