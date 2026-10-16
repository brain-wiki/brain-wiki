---
id: 01M3250V00R0QGCCCCDW3SXRJX
type: design
title: "Rule catalog"
aliases: ["Lint and reports §3"]
source: "docs/design/lint-and-reports.md#3-rule-catalog"
---
# Rule catalog

Codes are stable; new rules get new codes, and the codes of removed rules
are not reused. "Fix" means `brain lint --fix` can repair it safely. The
codes marked † are `SCHEMA_CODES`, the frontmatter rules `brain validate`
runs alone.

## Subsections
- [[lint-and-reports-bw1xx-files-and-frontmatter]]: BW1xx: files and frontmatter
- [[lint-and-reports-bw3xx-links]]: BW3xx: links
- [[lint-and-reports-bw4xx-structure-and-budgets]]: BW4xx: structure and budgets
- [[lint-and-reports-bw5xx-inbox]]: BW5xx: inbox
- [[lint-and-reports-bw6xx-rules]]: BW6xx: rules
- [[lint-and-reports-bw7xx-safety]]: BW7xx: safety
