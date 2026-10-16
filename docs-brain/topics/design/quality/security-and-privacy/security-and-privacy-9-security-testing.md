---
id: 01M3250V006Y67KPBN9CB7CABH
type: design
title: "Security testing"
aliases: ["Security and privacy §9"]
source: "docs/design/security-and-privacy.md#9-security-testing"
---
# Security testing

- Property-based tests: frontmatter writes never touch the body, quoted
  values are valid YAML, and the format 2 to 3 conversion keeps every
  claim's text.
- Path traversal tests for inputs that become paths.
- Rule tests: rules proposed over MCP wait for the user's confirmation, and
  `brain validate` reports edits to protected files (BW121).
- Visualizer tests that render hostile titles and bodies as text.
