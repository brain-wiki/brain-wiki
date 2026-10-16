---
id: 01M3250V00GPCVGZMFNNWJZK7A
type: design
title: "Other fixes"
aliases: ["09 §4.3"]
source: "docs/design/09-import.md#43-other-fixes"
---
# Other fixes

- `tags` written as a string → list; leading `#` removed (phase 1).
- `aliases` written as a string → list (phase 1).
- Nested frontmatter mappings → reported only (BW102); flattening them
  would guess at meaning.
