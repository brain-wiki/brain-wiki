---
id: 01M3250V00DAPPCSX9CFSBFMF3
type: design
title: "Naming and size limits"
aliases: ["07 §3.2"]
source: "docs/design/07-interfaces.md#32-naming-and-size-limits"
---
# Naming and size limits

- Server key `brain-wiki` in every host config: lowercase with a hyphen,
  which every host accepts and which keeps underscores free to separate
  server and tool names.
- Tool names: lowercase snake case with a `brain_` prefix, at most 26
  characters, so every host's prefixed form (`mcp__brain-wiki__brain_search`,
  `mcp__plugin_brain-wiki_brain-wiki__brain_search`, `brain-wiki__brain_search`) stays under
  the 64-character limits some model APIs impose.
- Tool descriptions put the essential sentence first and stay under 1,000
  characters; server instructions under 2,000 (one host truncates both at
  2,048).
- Results are kept under 20k tokens by default (one host's default cap is
  25k). Larger content is paginated or summarized with a pointer to `read`.
