# D26: Progressive discovery

Status: accepted.
Argued in: [index and search §6–§9](../design/index-and-search.md#6-search), [CLI and MCP §3.4](../design/cli-and-mcp.md#34-tools).

Agents explore a brain step by step, with a few general tools:

1. `brain_list` names the brains.
2. `brain_orient` briefs on one.
3. `brain_search` finds entry points; an empty query browses.
4. `brain_read` opens a note, and its outline lists the note's links.
5. `brain_neighbors` follows links.

The tools borrow the Obsidian CLI's conventions: targets written like wikilinks or exactly, counts and facets before fetching, and a `paths` output. The CLI has the same commands (`brain search`, `brain read --mode outline`, `brain neighbors`) plus small listings: `links`, `backlinks`, `tags`, `types`, `orphans`, and `unresolved`.

## Alternatives considered

- One tool per question. Every tool description costs context.
- Search only.
