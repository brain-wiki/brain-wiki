# D26: Progressive discovery

Status: accepted.
Argued in: [index and search §6–§9](../design/index-and-search.md#6-search), [CLI and MCP §3.4](../design/cli-and-mcp.md#34-tools).

The tools follow progressive discovery (list, orient, search or browse, read with handles, follow links with `brain_neighbors`) and borrow the Obsidian CLI's conventions: wikilink-style or exact targets, counts and facets before fetching, `paths` output. The CLI mirrors them: `brain search` (an empty query browses), `brain read --mode outline`, `brain neighbors`, and small listings (`links`, `backlinks`, `tags`, `types`, `orphans`, `unresolved`).

## Alternatives considered

One tool per question (every tool description costs context); search only
