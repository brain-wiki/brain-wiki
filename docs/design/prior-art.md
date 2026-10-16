# Prior art

## What we take from it

The design borrows ideas, not code. Details and sources are in the research
notes summarized in [roadmap](prior-art.md#sources-consulted).

| Prior art | What we take | Where we differ |
|---|---|---|
| Host-native memories (instruction files, auto-memory folders) | Plain files, hard size budgets for always-loaded context | One store shared by all hosts; validated edits; supersession with a retrieval rule |
| Markdown + SQLite knowledge tools (e.g. Basic Memory, AGPL-3.0) | Notes as Markdown with wikilinks; a rebuildable local index | Supersession as metadata with a retrieval rule; an inbox and a consolidation helper; Apache-2.0 |
| LLM-maintained wikis ("LLM wiki" pattern, OpenClaw memory-wiki) | Raw sources compiled into curated pages; source citations; health reports | Host-neutral; supersession guard; direct edits checked by `brain validate` and kept in git |
| Hosted memory layers (Mem0, Zep/Graphiti, Letta) | Supersession instead of deletion; temporal validity | No service or database to run; files remain the truth |

## Sources consulted

Sources consulted for the design, with what each contributed. brain-wiki
borrows ideas only, never code, and is Apache-2.0.

| Source | License | Contributed | Differs |
|---|---|---|---|
| Basic Memory (Markdown + SQLite knowledge base with MCP) | AGPL-3.0-or-later | Relations as list items `- type [[Target]]` in the note body; plain-link edges; a rebuildable local index | Free-form relation types with no inverses or retrieval rules; supersession is a convention. Format 3 dropped typed relations too (D33): connections are wikilinks in prose, and only supersession is metadata, with a retrieval guard. |
| "LLM Wiki" idea file (Karpathy, 2026) | — (a public gist) | Raw sources compiled into LLM-maintained pages; ingest/query/lint loop; `index.md` catalog and append-only `log.md` | No typed relations; contradictions only flagged in lint. We add the supersession guard, schema validation of frontmatter, and optional `bw-sources`. |
| OpenClaw memory-wiki and dreaming | Open source (OpenClaw) | Claims with evidence and line spans; generated health reports; ops instead of prose rewrites; a prior-entry loss guard; stripping recalled context before re-capture; provenance-based filtering | Coupled to one host; relations in frontmatter. We stay host-neutral and keep frontmatter flat; format 3 dropped claims, ops, and the loss guard in favor of plain notes with git history. |
| Open Knowledge Format v0.2 (Google Cloud) | Apache-2.0 | A minimal bundle convention: required `type`, reserved `index.md` and `log.md`, per-claim source attribution, `status: deprecated` | Links untyped, as ours now are; no supersession link. An OKF export is possible later; our hubs (`index.md` with frontmatter) and log format differ from OKF's and would be transformed on export. |
| Host-native memories (instruction files, auto-memory folders, compaction flushes) | — | Hard budgets for always-loaded context; inbox-style capture; never auto-applying extracted memories | Each is siloed in one host. |
| Hosted memory layers (Mem0, Zep/Graphiti, Letta) | Various | Supersession instead of deletion; temporal validity | Require a service or database; files are not the truth. |
| Obsidian | Proprietary app; open help docs | Link resolution by file name, properties model, comments, Bases views | We stay compatible without depending on it. |
| Agent Skills, AGENTS.md, Agent Plugins 1.0, MCP | Open specifications | The integration surfaces in [agent integrations](agent-integrations.md) | — |
| Memory benchmarks (LongMemEval, MemoryAgentBench, LoCoMo, HaluMem) and wiki-compilation studies | MIT; MIT; CC BY-NC 4.0; CC BY-NC-ND 4.0 | Knowledge-update and conflict-resolution slices; extraction quality against gold points; probe coverage | See the [public benchmarks proposal](../proposal/public-benchmarks.md). |
