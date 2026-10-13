---
id: 01M3250V003HYEQZ9ET1PT9W5B
type: design
title: "Future work (after v0.1)"
aliases: ["14 §4"]
tags: [roadmap-and-open-questions]
source: "docs/design/14-roadmap-and-open-questions.md#4-future-work-after-v01"
bw-part_of:
  - "[[roadmap-and-open-questions]]"
---
# Future work (after v0.1)

| Area | Item | Design |
|---|---|---|
| Remote | HTTP transport, OAuth (CIMD and DCR), `search`/`fetch` aliases, tunnel recipes, for ChatGPT, claude.ai, and the Gemini app | [[08-9-future-remote-mcp-for-chat-apps\|08 §9]] |
| Storage | Git remote replicator, then GCS and S3 replicators via fsspec; server mode on object storage | [[03-6-storage-and-sync\|03 §6]] |
| Retrieval | Optional embeddings (sqlite-vec) with rank fusion; file watcher; cross-brain search; guard inheritance through containment | [[04-13-future-work\|04 §13]] |
| Consolidation | Direct-API backend; per-privacy-level backend routing (local model for sensitive topics); clustering as a selection heuristic | [[05-44-backends\|05 §4.4]] |
| Provenance | `brain forget --session <id>`: retract every claim whose only sources come from one session, with a dry run; per-claim source kinds (stated by user, observed in code, read in a document, inferred) | — |
| Hosts | Native OpenClaw memory provider (memory slot); Claude API memory-tool handler; Cursor plugin; MCP resources | [[agent-integrations\|08]] |
| Importers | Chat exports, email, documents; authority ordering (specs over notes over chat) when sources disagree | [[import\|09]] |
| Domain plugins | Signed influence propagation over weighted `depends_on`; domain layouts in the visualizer (dependency DAG, rule/exception tree, claim/evidence matrix); external state providers keyed by qualifiers | — |
| Bench | Adapters for public conversation-memory benchmarks | [[11-5-public-benchmarks\|11 §5]] |
