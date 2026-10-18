---
id: 01M3250V001KWQN3A05RWXQWA3
type: design
title: "Common file conventions"
aliases: ["Brain format §4"]
source: "docs/design/brain-format.md#4-common-file-conventions"
---
# Common file conventions

- Encoding is UTF-8. Files SHOULD have no BOM, and readers ignore one.
  Line endings are `\n`. Readers accept `\r\n`, and writers keep it in
  files that already use it.
- Frontmatter, when present, is a YAML block at the very top of the file,
  opened by a `---` line and closed by `---` or `...`. It MUST be at most
  64 KiB (BW101).
- Frontmatter values MUST be scalars or lists of scalars. Nested mappings
  and lists of lists MUST NOT be used (BW102). Obsidian edits only flat
  properties, and LLMs often break nested YAML
  ([[d03-flat-frontmatter|D3]]).
- Frontmatter holds metadata: what a note is, and which notes it relates
  to, as links (§6.6). What a note knows, its facts and reasons, MUST be
  written in the body (§6.2), since Obsidian renders no Markdown in
  properties.
- brain-wiki's own fields carry the reserved `bw-` prefix: on notes the
  relation fields (§6.6), `bw-superseded_by` (§6.3), `bw-sources` (§6.4),
  and `bw-stage`, and on episodes the provenance fields (§9). Shared metadata stays unprefixed:
  `id`, `type`, `title`, `aliases`, `tags`, `status`, `created`,
  `updated`. The prefix marks what brain-wiki validates and cannot clash
  with other tools ([[d29-bw-prefix|D29]]). Lint reports an
  unknown `bw-` field on a note (BW118).
- Links in brain-wiki's fields are written double-quoted (`"[[note]]"`),
  so YAML reads them as strings and Obsidian keeps them live links.
- Wikilinks in other frontmatter properties (`up:`, `related:`) are the
  user's. brain-wiki preserves them and can filter on them, but does not
  read them as links.
- Writers change only the lines they mean to change. They MUST NOT
  reformat frontmatter or reflow prose they did not edit.
