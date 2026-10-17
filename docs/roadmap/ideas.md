# Ideas

Ideas without a design yet. In the Idea column, a semicolon separates one idea from the next.

| Area | Idea | Related design |
|---|---|---|
| Retrieval | Optional embeddings (`sqlite-vec` and a local model) merged with lexical results by rank fusion, with the supersession guard applied the same way; a file watcher in long-running processes for very large brains; search across brains, with each result labeled by its brain | [index and search](../design/index-and-search.md) |
| Consolidation | Clustering episodes to choose what to consolidate together; MCP tools for rule proposals (list, show, accept after the user confirms, reject) so an agent can walk the user through them | [write path §4](../design/write-path.md#4-consolidation) |
| Writing over MCP | A tool that writes and validates a note in one call, minting the `id` of a new note, for agents without file access such as remote MCP clients | [write path §2.3](../design/write-path.md#23-direct-edits) |
| Provenance | `brain forget --session <id>`, which lists as a dry run the episodes from one session and the notes whose `bw-sources` cite only them, for the user to edit or delete | — |
| Hosts | A native OpenClaw memory provider in its memory slot; a handler for the Claude API memory tool; a Cursor plugin; session readers for OpenClaw and Cursor; MCP resources | [agent integrations](../design/agent-integrations.md) |
| Harvest | Orientation shows how many of the calling host's sessions are not yet harvested, from a cached count refreshed at most hourly, as a prompt to run the harvest recipe | [write path §2.2](../design/write-path.md#22-harvesting-sessions) |
| Importers | Chat exports, email, and documents; an authority order for when sources disagree, such as specs over notes over chat | [import](../design/import.md) |
