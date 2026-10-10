# brain-wiki design

Status: **draft for review**. Nothing here is implemented yet.

## Reading order

| # | Document | What it settles |
|---|---|---|
| 01 | [Overview](01-overview.md) | Problem, goals, non-goals, principles, scenarios, glossary |
| 02 | [Brain format](02-brain-format.md) | The on-disk contract: layout, manifest, notes, claims, relations, episodes, rules (normative) |
| 03 | [Config and storage](03-config-and-storage.md) | User config, multiple brains, brain selection, machine state, git, sync, future backends |
| 04 | [Index and retrieval](04-index-and-retrieval.md) | SQLite schema, freshness, search ranking, guard co-retrieval, read, orientation |
| 05 | [Write path and consolidation](05-write-path-and-consolidation.md) | Episodes, provenance and taint, ops, consolidation backends, validation, review, undo |
| 06 | [Lint and reports](06-lint-and-reports.md) | Rules, profiles, fixes, generated reports, pre-commit use |
| 07 | [Interfaces](07-interfaces.md) | CLI commands, MCP tools and schemas, agent profiles, error model |
| 08 | [Agent integrations](08-agent-integrations.md) | Plugin bundle, per-host details, hooks, `brain connect`, capture, future remote MCP |
| 09 | [Import](09-import.md) | Adopting existing Markdown folders and Obsidian vaults |
| 10 | [Security and privacy](10-security-and-privacy.md) | Threat model and mitigations |
| 11 | [Eval bench](11-eval-bench.md) | Retrieval, lint, consolidation, and performance suites |
| 12 | [Visualizer](12-visualizer.md) | 3D brain map |
| 13 | [Engineering](13-engineering.md) | Repo layout, dependencies, packaging, testing, performance budgets, release |
| 14 | [Roadmap and open questions](14-roadmap-and-open-questions.md) | Implementation milestones, future work, decisions needed |

Normative documents (02, and the schemas in 04, 05, 07) use MUST, SHOULD,
and MAY as in RFC 2119. The others explain and justify.

## Decision log

Each decision links to where it is argued. "Alternatives" lists what was
considered and rejected.

| ID | Decision | Alternatives | Where |
|---|---|---|---|
| D1 | The brain directory is the only source of truth; the SQLite index is a rebuildable cache stored outside the brain. | Database as source of truth; index inside the brain | [02 §2](02-brain-format.md#2-directory-layout), [04](04-index-and-retrieval.md) |
| D2 | The repo contains only source. Brains live at user-configured paths, and a user can have several named brains. | Brain inside the repo; one brain per user | [03](03-config-and-storage.md) |
| D3 | Frontmatter is flat (scalars and lists of scalars). Relations live in a `## Relations` section, claims in `## Claims`. | Relations as YAML arrays or nested maps | [02 §4, §6](02-brain-format.md#4-common-file-conventions) |
| D4 | Five relation families with eight canonical verbs; domain meaning goes in free qualifiers. | Compass-style poles; per-domain verb vocabularies compiled to families | [02 §6.4](02-brain-format.md#64-relations) |
| D5 | Guard co-retrieval: superseding and conflicting notes are always returned with a hit, in both directions, on top of top-k. | Rank-based retrieval only; post-hoc contradiction reports only | [02 §7](02-brain-format.md#7-guard-relations), [04 §5](04-index-and-retrieval.md#5-guard-co-retrieval) |
| D6 | Two write paths: an append-only inbox open to any agent, and curated notes changed only through validated ops (plus human edits). | Agents edit notes directly; MCP as the only write path | [05](05-write-path-and-consolidation.md) |
| D7 | The LLM only proposes JSON ops; the engine validates, applies, lints, records undo, and commits. | LLM rewrites whole files | [05 §5](05-write-path-and-consolidation.md#5-operations) |
| D8 | Consolidation reaches an LLM through the host agent (MCP) or a headless agent CLI. No API keys in v0.1. | Built-in provider SDKs | [05 §4](05-write-path-and-consolidation.md#4-consolidation) |
| D9 | Provenance and taint are set by the code path that writes, never by model text. Tainted or unknown-taint content can never become a rule. | Trust model self-reports | [05 §3](05-write-path-and-consolidation.md#3-provenance-and-taint), [10](10-security-and-privacy.md) |
| D10 | Privacy is an ordered level per note/topic plus a maximum per agent profile, enforced before ranking. Unrelated spheres (work vs personal) use separate brains. | Unordered label sets; embedding-based classification | [03](03-config-and-storage.md), [10](10-security-and-privacy.md) |
| D11 | v0.1 storage is a local directory with optional git integration. Remote storage is added later as replicators (git remote, fsspec object stores), keeping a local working copy. | Engine reads object storage directly; required git | [03 §6](03-config-and-storage.md#6-storage-and-sync) |
| D12 | ULIDs identify brains, notes, episodes, claims, rules, and runs; links resolve like Obsidian with id-based repair. | Path-only identity; UUIDv4 | [02 §5](02-brain-format.md#5-identifiers) |
| D13 | Pending vs consolidated episodes is encoded by location (`inbox/` vs `archive/`), not by a watermark file. | Watermark in machine state | [02 §9](02-brain-format.md#9-episodes) |
| D14 | The repo root is also the plugin root for every host; `brain connect` wires local installs; hooks go through one `brain hook` entry point; session capture is opt-in. | Separate repos per host; plugin in a subdirectory | [08](08-agent-integrations.md) |
| D15 | Remote MCP for chat apps is designed but not built in v0.1. | Ship HTTP + OAuth in v0.1 | [08 §9](08-agent-integrations.md#9-future-remote-mcp-for-chat-apps) |
| D16 | Python ≥ 3.11, stdlib-first, few runtime dependencies, `argparse` CLI for fast startup in hooks. | Typer/Click; Rust core | [13](13-engineering.md) |
| D17 | The visualizer is a static page with vendored JavaScript, served locally by `brain viz`; no Node build step. | npm-built web app | [12](12-visualizer.md) |
| D18 | The bench uses synthetic, seeded data and deterministic graders; model comparisons run through the same command backends as consolidation. | Public datasets only; LLM-as-judge by default | [11](11-eval-bench.md) |
| D19 | License: Apache-2.0. | AGPL, MIT | [13](13-engineering.md) |
| D20 | Hosts' own session stores are a second capture source (`brain harvest`, with backfill) and can be consulted during consolidation (origin lookup); both opt-in, routed by project, and never required for an episode to make sense. | Hooks as the only capture path; copying transcripts into the brain | [05 §2.2, §4.6](05-write-path-and-consolidation.md#22-harvesting-sessions), [08 §6](08-agent-integrations.md#6-capture-and-harvest) |
| D21 | Gemini CLI is not a supported host. | Shipping a Gemini CLI extension | [08](08-agent-integrations.md) |
