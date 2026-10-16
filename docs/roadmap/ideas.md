# Ideas

Ideas without a design yet.

| Area | Idea | Related design |
|---|---|---|
| Retrieval | Optional embeddings (`sqlite-vec`, a local model) with rank fusion, guards applied the same way; a file watcher in long-running processes for very large brains; cross-brain search with results labeled by brain | [index and search](../design/index-and-search.md) |
| Consolidation | A headless run of the prepare → edit → validate → done loop with a configured model; clustering as a selection heuristic; MCP tools for rule proposals (list, show, accept with user confirmation, reject) so an agent can walk the user through them | [write path §4](../design/write-path.md#4-consolidation) |
| Writing over MCP | A tool that writes a note and validates it in one call, minting the `id` of a new note, for agents without file access (such as remote MCP clients) | [write path §2.3](../design/write-path.md#23-direct-edits) |
| Provenance | `brain forget --session <id>`: list, with a dry run, the episodes from one session and the notes whose `bw-sources` cite only them, for the user to edit or delete | — |
| Hosts | Native OpenClaw memory provider (memory slot); Claude API memory-tool handler; Cursor plugin; session readers for OpenClaw and Cursor; MCP resources | [agent integrations](../design/agent-integrations.md) |
| Harvest | Orientation shows how many of the calling host's sessions are not yet harvested, from a cached count refreshed at most hourly, as a nudge to run the recipe | [write path §2.2](../design/write-path.md#22-harvesting-sessions) |
| Importers | Chat exports, email, documents; authority ordering (specs over notes over chat) when sources disagree | [import](../design/import.md) |
