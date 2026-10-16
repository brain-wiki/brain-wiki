---
id: 01M3250V0088EV6NNTARM5VBQT
type: design
title: "Naming and size limits"
aliases: ["CLI and MCP §3.2"]
source: "docs/design/cli-and-mcp.md#32-naming-and-size-limits"
---
# Naming and size limits

- The server key is `brain-wiki` in every host config. Every host accepts
  a lowercase name with a hyphen, and it keeps underscores free to
  separate server and tool names.
- Tool names are lowercase snake case with a `brain_` prefix, at most 26
  characters. Every host's prefixed form (`mcp__brain-wiki__brain_search`,
  `mcp__plugin_brain-wiki_brain-wiki__brain_search`,
  `brain-wiki__brain_search`) stays under the 64-character limit some model
  APIs impose.
- Tool descriptions put the essential sentence first and stay under 1,000
  characters. Server instructions stay under 2,000. One host truncates both
  at 2,048.
- Results stay under 20k tokens by default; one host's default cap is 25k.
  Larger content is paged or summarized with a pointer to `brain_read`.
- The two packet tools, `brain_consolidate_prepare` and
  `brain_harvest_prepare`, set `_meta["anthropic/maxResultSizeChars"]` to
  100,000. Their packets are budgeted at about 15k tokens.
