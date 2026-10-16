---
id: 01M3250V009E8AT3NJ9CAN1JD7
type: design
title: "Security testing"
aliases: ["10 §9"]
tags: [security-and-privacy]
source: "docs/design/10-security-and-privacy.md#9-security-testing"
---
# Security testing

- Property-based tests for the frontmatter writer and the format 2 → 3
  conversion.
- Path traversal tests for every input that becomes a path.
- Rule tests: rules proposed over MCP wait for the user's confirmation, and
  `brain validate` reports edits to protected files (BW121).
- Visualizer tests that render hostile titles and bodies as text.
