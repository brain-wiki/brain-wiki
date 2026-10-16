# Design proposals

Designs that are not implemented. [docs/design](../design/README.md)
describes what brain-wiki does today; a proposal here describes what it
could do.

When a proposal is built, its content moves into the design documents it
changes, in the same change as the code, and the proposal is deleted.

| Proposal | Status | Changes |
|---|---|---|
| [Privacy](privacy.md) | Draft; open questions PQ1–PQ6 | Levels defined by where content may go (model, tools, outputs, exports), declared in a topic's `index.md`; replaces the removed privacy levels |
| [Remote sync and object storage](remote-sync.md) | Designed, not scheduled | `brain sync` to a private git remote, then GCS and S3; a store interface for a server with no local copy |
| [Remote MCP for chat apps](remote-mcp.md) | Designed, not scheduled; waits on privacy | HTTP transport and OAuth for ChatGPT, claude.ai, and the Gemini app |
| [Public memory benchmarks](public-benchmarks.md) | Designed, not scheduled | Bench adapters for LongMemEval and similar; probe coverage as a consolidation metric |
| [Scheduled maintenance](scheduled-maintenance.md) | Built, then removed before 0.1; needs rethinking. `brain schedule` now exists for commit jobs only | Routine templates for hosts' schedulers and OS schedulers; a headless consolidation backend; one consolidation device |
| [Host hooks](hooks.md) | Built, then removed before 0.1; needs real-host verification | `brain hook`: the briefing injected at session start, capture at stop and compaction, input tracking from tool hooks, per-prompt recall |

## Backlog

Ideas without a design yet.

| Area | Idea | Related design |
|---|---|---|
| Retrieval | Optional embeddings (`sqlite-vec`, a local model) with rank fusion, guards applied the same way; a file watcher in long-running processes for very large brains; cross-brain search with results labeled by brain | [04](../design/04-index-and-retrieval.md) |
| Consolidation | A headless run of the prepare → edit → validate → done loop with a configured model; clustering as a selection heuristic; MCP tools for rule proposals (list, show, accept with user confirmation, reject) so an agent can walk the user through them | [05 §4](../design/05-write-path-and-consolidation.md#4-consolidation) |
| Writing over MCP | A tool that writes a note and validates it in one call, minting the `id` of a new note, for agents without file access (such as remote MCP clients) | [05 §2.3](../design/05-write-path-and-consolidation.md#23-direct-edits) |
| Provenance | `brain forget --session <id>`: list, with a dry run, the episodes from one session and the notes whose `bw-sources` cite only them, for the user to edit or delete | — |
| Hosts | Native OpenClaw memory provider (memory slot); Claude API memory-tool handler; Cursor plugin; session readers for OpenClaw and Cursor; MCP resources | [08](../design/08-agent-integrations.md) |
| Harvest | Orientation shows how many of the calling host's sessions are not yet harvested, from a cached count refreshed at most hourly, as a nudge to run the recipe | [05 §2.2](../design/05-write-path-and-consolidation.md#22-harvesting-sessions) |
| Importers | Chat exports, email, documents; authority ordering (specs over notes over chat) when sources disagree | [09](../design/09-import.md) |
