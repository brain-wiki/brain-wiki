---
id: 01M3250V00QPCC4YCJGWZPMC01
type: design
title: "Prior art"
source: "docs/design/prior-art.md"
---
# Prior art

## What we take from it

brain-wiki borrows ideas from earlier tools, never code, and is licensed Apache-2.0 (D19). The main ideas:

- Plain files and a hard size budget for context loaded into every session, from the memory files hosts keep for themselves.
- Notes as Markdown with wikilinks, indexed by a local database that can be rebuilt, from Markdown and SQLite knowledge tools.
- Raw sources compiled into curated pages that cite them, with health reports, from LLM-maintained wikis.
- Supersession instead of deletion, from hosted memory layers.

brain-wiki differs from all of them in the same few ways. One brain serves every host. Supersession is metadata with a retrieval rule, the supersession guard. Nothing needs a service or database to run. Agents edit notes directly, `brain validate` checks the edits, and git keeps their history.


## Sources consulted

| Source | License | What we took | How we differ |
|---|---|---|---|
| Basic Memory, a Markdown and SQLite knowledge base with MCP | AGPL-3.0-or-later | Relations as list items `- type [[Target]]` in the body; plain links as edges; a local index that can be rebuilt | Its relation types are free-form, with no inverses or retrieval rules, and supersession is a convention. Ours are a fixed set of four, held in link-only frontmatter fields, each on one side, that lint checks ([[d39-relation-fields\|D39]]). |
| "LLM Wiki" idea file (Karpathy, 2026) | A public gist | Raw sources compiled into pages an LLM maintains; an ingest, query, and lint loop; an `index.md` catalog and an append-only `log.md` | Contradictions are only flagged by lint. We add the supersession guard, schema checks on frontmatter, and optional `bw-sources`. |
| OpenClaw memory-wiki and dreaming | Open source | Claims with evidence and line spans; generated health reports; ops instead of prose rewrites; a guard against losing earlier entries; stripping recalled context before capturing it again; filtering by provenance | It is tied to one host and keeps relations in frontmatter. Format 3 dropped claims, ops, and the loss guard in favor of plain notes with git history. |
| Open Knowledge Format v0.2 (Google Cloud) | Apache-2.0 | A minimal bundle convention: a required `type`, reserved `index.md` and `log.md`, source attribution per claim, `status: deprecated` | Its links are untyped, and it has no supersession link. Our topic pages and log format differ from OKF's, so an OKF export would have to transform them. |
| Host memory files (instruction files, auto-memory folders, compaction flushes) | — | Budgets for context loaded every session; capture into an inbox; never applying extracted memories automatically | Each one is tied to a single host. |
| Hosted memory layers (Mem0, Zep and Graphiti, Letta) | Various | Supersession instead of deletion; validity over time | They need a service or database, and files are not their source of truth. |
| Obsidian | Proprietary app with open help docs | Link resolution by file name, the properties model, comments, Bases views | brain-wiki stays compatible with Obsidian without depending on it. |
| Agent Skills, AGENTS.md, Agent Plugins 1.0, MCP | Open specifications | How brain-wiki reaches hosts ([[agent-integrations\|agent integrations]]) | — |
| Memory benchmarks (LongMemEval, MemoryAgentBench, LoCoMo, HaluMem) and studies of wiki compilation | MIT; MIT; CC BY-NC 4.0; CC BY-NC-ND 4.0 | Slices for knowledge updates and conflict resolution; extraction quality against gold points; probe coverage | See the [[proposal-public-benchmarks\|public benchmarks proposal]]. |
