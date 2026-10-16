---
id: 01M3250V006Y67KPBN9CB7CABH
type: design
title: "Security testing"
aliases: ["Security and privacy §9"]
source: "docs/design/security-and-privacy.md#9-security-testing"
---
# Security testing

- Property-based tests for the frontmatter writer and the format 2 → 3
  conversion.
- Path traversal tests for every input that becomes a path.
- Rule tests: rules proposed over MCP wait for the user's confirmation, and
  `brain validate` reports edits to protected files (BW121).
- Visualizer tests that render hostile titles and bodies as text.
