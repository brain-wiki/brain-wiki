---
id: 01M3250V0089HVKJA7D2MJK5ZT
type: design
title: "Other fixes"
aliases: ["Import §4.3"]
source: "docs/design/import.md#43-other-fixes"
---
# Other fixes

- `tags` written as a string becomes a list, split on commas, with
  leading `#` removed (phase 1).
- `aliases` written as a string becomes a list, split on commas
  (phase 1).
- Nested frontmatter mappings are only reported (BW102). Flattening them
  would guess at meaning.
