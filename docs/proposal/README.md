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
