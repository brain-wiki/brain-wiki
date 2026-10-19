# Design proposals

These designs are not built. [docs/design](../design/README.md) describes
what brain-wiki does today. A proposal describes what it could do.

When a proposal is built, its content moves into the design documents it
changes, in the same change as the code, and the proposal is deleted.

| Proposal | Status | Changes |
|---|---|---|
| [Visualizer layers](visualizer-layers.md) | Draft; decided 2026-10-19, not built | The map as the folder tree in 3D: one plane per topic level, notes as a ring of slices around each `Index.md`, and Shift+drag to turn the view |
| [Privacy](privacy.md) | Draft; open questions PQ1 to PQ6 | Levels defined by where content may go (model, tools, outputs, exports), declared in a topic's `index.md` |
| [Remote sync and object storage](remote-sync.md) | Designed, not scheduled; `brain commit` already syncs a git brain with origin | `brain sync` with conflict copies, then GCS and S3, then a server that reads a brain from a bucket |
| [Remote MCP for chat apps](remote-mcp.md) | Designed, not scheduled; waits on privacy | HTTP transport and OAuth for ChatGPT, claude.ai, and the Gemini app |
| [Public memory benchmarks](public-benchmarks.md) | Designed, not scheduled | Bench adapters for LongMemEval and similar, and probe coverage as a consolidation metric |
| [Host hooks](hooks.md) | Built, then removed before 0.1; needs testing on real hosts | `brain hook`: briefing at session start, capture at stop and compaction, input tracking, per-prompt recall |
