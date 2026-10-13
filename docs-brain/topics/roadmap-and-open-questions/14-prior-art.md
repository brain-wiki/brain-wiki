---
id: 01M3250V004X2A1HGBJEKV8NKD
type: design
title: "Prior art"
tags: [roadmap-and-open-questions]
source: "docs/design/14-roadmap-and-open-questions.md#prior-art"
bw-part_of:
  - "[[roadmap-and-open-questions]]"
---
# Prior art

Sources consulted for the design, with what each contributed. brain-wiki
borrows ideas only, never code, and is Apache-2.0.

| Source | License | Contributed | Differs |
|---|---|---|---|
| Basic Memory (Markdown + SQLite knowledge base with MCP) | AGPL-3.0-or-later | Relations as list items `- type [[Target]]` in the note body; plain-link edges; a rebuildable local index | Free-form relation types with no inverses or retrieval rules; supersession is a convention. We define canonical families, inverses, and guard co-retrieval. |
| "LLM Wiki" idea file (Karpathy, 2026) | — (a public gist) | Raw sources compiled into LLM-maintained pages; ingest/query/lint loop; `index.md` catalog and append-only `log.md` | No typed relations; contradictions only flagged in lint. We add guards, ops-only writes, and provenance. |
| OpenClaw memory-wiki and dreaming | Open source (OpenClaw) | Claims with evidence and line spans; generated health reports; ops instead of prose rewrites; a prior-entry loss guard; stripping recalled context before re-capture; provenance-based filtering | Coupled to one host; relations in frontmatter. We stay host-neutral and keep frontmatter flat. |
| Open Knowledge Format v0.2 (Google Cloud) | Apache-2.0 | A minimal bundle convention: required `type`, reserved `index.md` and `log.md`, per-claim source attribution, `status: deprecated` | Links untyped; no contradiction mechanism. An OKF export is possible later; our hubs (`index.md` with frontmatter) and log format differ from OKF's and would be transformed on export. |
| Host-native memories (instruction files, auto-memory folders, compaction flushes) | — | Hard budgets for always-loaded context; inbox-style capture; never auto-applying extracted memories | Each is siloed in one host. |
| Hosted memory layers (Mem0, Zep/Graphiti, Letta) | Various | Supersession instead of deletion; temporal validity | Require a service or database; files are not the truth. |
| Obsidian | Proprietary app; open help docs | Link resolution by file name, properties model, comments, Bases views | We stay compatible without depending on it. |
| Agent Skills, AGENTS.md, Agent Plugins 1.0, MCP | Open specifications | The integration surfaces in [[agent-integrations\|08]] | — |
| Memory benchmarks (LongMemEval, MemoryAgentBench, LoCoMo, HaluMem) and wiki-compilation studies | MIT; MIT; CC BY-NC 4.0; CC BY-NC-ND 4.0 | Knowledge-update and conflict-resolution slices; extraction quality against gold points; probe coverage | See the [[proposal-public-benchmarks\|public benchmarks proposal]]. |
