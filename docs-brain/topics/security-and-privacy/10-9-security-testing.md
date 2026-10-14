---
id: 01M3250V009E8AT3NJ9CAN1JD7
type: design
title: "Security testing"
aliases: ["10 §9"]
tags: [security-and-privacy]
source: "docs/design/10-security-and-privacy.md#9-security-testing"
bw-part_of:
  - "[[security-and-privacy]]"
---
# Security testing

- Parser fuzzing (property-based tests) for frontmatter, claims, relations,
  links, and ops.
- Path traversal tests for every input that becomes a path.
- Bench injection suite: episodes with external inputs carrying instructions must never
  produce rules, never change the `AGENTS.md` block, and must yield claims
  marked unverified ([[eval-bench|11]]).
- Visualizer tests that render hostile titles and bodies as text.
