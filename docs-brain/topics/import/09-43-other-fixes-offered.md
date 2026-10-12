---
id: 01M3250V00CNWMPFTT3378BGMM
type: design
title: "Other fixes offered"
aliases: ["09 §4.3"]
tags: [import]
source: "docs/design/09-import.md#43-other-fixes-offered"
---
# Other fixes offered

- `tags` written as a string → list; leading `#` removed.
- `aliases` written as a string → list.
- Nested frontmatter mappings → reported only (BW102); flattening them
  would guess at meaning.

## Relations
- part_of [[09-4-normalization-rules]]
