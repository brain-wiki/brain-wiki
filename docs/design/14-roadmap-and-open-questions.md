# 14 · Roadmap and open questions

Status: draft for review

## 1. Implementation milestones (stage 2)

Each milestone ends with passing tests, updated docs, and one or more
self-contained commits. Later milestones depend only on earlier ones.

| # | Milestone | Delivers | Exit criteria |
|---|---|---|---|
| M0 | Skeleton | `pyproject.toml`, package layout, `brain` entry point with lazy subcommands, platform dirs, user config, ULIDs, `LocalStore` (atomic writes, `O_EXCL`), `scripts/check.py` | `brain version`; `brain init` creates a valid brain and registers it; CI script green |
| M1 | Format | Parsers and line-preserving writers: frontmatter, claims, relations (with aliases and inverses), links, episodes, rules, `AGENTS.md` block | Round-trip and locality property tests; golden files |
| M2 | Index and retrieval | Schema, scanner with freshness and renames, link resolution, search (FTS5 + trigram + fallback), guards with chains and caps, read, orient; `brain search/read/orient/index` | Retrieval suite on generated brains: guard recall 100%, no privacy leaks; perf at 1k within budget |
| M3 | Lint and reports | Rule catalog, profiles and overrides, fixes as runs, reports, pre-commit hook | Lint suite 100% on its corpus; fix idempotency |
| M4 | Write path and runs | Episode writer with secret scrubbing and dedupe; `brain log`; rules via CLI; run records, pre-images, undo, locks, git integration; `brain mv`; `brain doctor` | Undo restores exact bytes; git commits contain only touched files |
| M5 | Consolidation | Selection and packets, ops schema and validator, deterministic applier, review proposals, agent backend (prepare/apply) and command backend with presets | Golden tests per op; consolidation suite runs against at least one real preset |
| M6 | MCP server | Ten tools, three prompts, error codes, instructions, cache hints (the harvest tools are wired in M8) | In-memory client tests for every tool and error path |
| M7 | Agent integrations | Root plugin files for each host, `brain connect`, `brain hook` adapters, opt-in capture, recall markers | Hook fixture tests per host; plugin validation; manual smoke test in each host available on the build machine |
| M8 | Import and harvest | Overlay (phases 0–3), into, to-episodes, from-host presets; session readers for Claude Code, Codex, and Antigravity; `brain harvest` (dry run, routing, raw and distill); the in-agent recipe (`brain_harvest_prepare` / `brain_harvest_apply`, `harvest` prompt, skill section, self-read fallback); origin lookup (`brain origin`, `brain_read_origin`) | Import of a generated messy vault: phase 0 changes no existing file; each phase undoable. Harvest on recorded fixtures: correct routing and skips, one episode per session chunk, no duplicates with hook capture |
| M9 | Bench | Generator, suites, graders, report, compare, capture | Offline suites in CI; a consolidation run across two presets produces a report |
| M10 | Visualizer | Graph export, local server, vendored assets with lock check, static app, exports | Manual checklist on a 10k brain; escaping tests |
| M11 | Release readiness | User guide, README, CONTRIBUTING, SECURITY, CHANGELOG, version sync, registry files | `scripts/check.py` runs every check; a fresh machine can install and connect one host following the guide |

Order rationale: M1–M4 are the foundation everything else touches; M5 and
M6 are the core value; M7 makes it usable in hosts; M8–M10 widen adoption
and trust.

## 2. Decisions needed from the maintainer

These change the design or defaults. Each has a recommendation.

| # | Question | Options | Recommendation |
|---|---|---|---|
| Q1 | **How should session capture work when enabled?** | (a) *Raw*: the stop hook copies a bounded transcript tail into an episode, no model involved. (b) *Prompted*: the stop hook asks the agent, once per session, to call `brain_log_episode` with its own summary (hosts that support "continue with reason" from a stop hook). (c) Both, per host. | (c), with (b) as default where supported: the agent's own summary is far more useful than a raw tail, costs one short turn, and needs no transcript parsing. Raw remains for hosts without that ability. |
| Q2 | **Should tainted sources route consolidation runs to review by default?** (`review_tainted`) | false: tainted claims land marked `[unverified]`; true: every run touching web-derived episodes waits for review | false. Coding sessions use web search constantly; true would put nearly every run in review. Rules stay protected regardless. |
| Q3 | **Default privacy levels** | `default/sensitive/secret`; or a single level until the user opts in | Ship the three names in the template, all content `default`, agent profiles defaulting to `default`. Users who never think about it see no difference. |
| Q4 | **Hidden guard counts** reveal that a restricted superseding or conflicting note exists. | Keep counts; hide completely | Keep counts. An agent that knows its answer may be stale can say so. |
| Q5 | **Windows support level for v0.1** | First-class; best-effort | Best-effort (core tests in CI, no hook or host guarantees). |
| Q6 | **npm launcher** (`npx brain-wiki`) | Ship in v0.1; defer | Defer. `uvx` covers the no-install path. |
| Q7 | **Publishing identity** | Personal GitHub account; an organization | Decide before the first push; it sets the MCP Registry namespace, the marketplace source, and the plugin manifests' repository fields. |
| Q8 | **Harvest default: distill or raw?** | Distill with the configured preset (cleaner episodes, model cost); raw (no model, verbose episodes for consolidation to distill) | Distill when a command-backend preset is configured, raw otherwise; a backfill dry run shows the token estimate before anything is spent. |

## 3. Verification items

Facts the design depends on that could not be confirmed from
documentation. Each becomes a test during M7, and the design adapts to the
result.

| # | Question | Test |
|---|---|---|
| T-1 | Does Antigravity accept a root `plugin.json` that carries Agent Plugins fields (`$schema`, `version`, `extensions`)? Its published schema is closed. | **Partly verified (agy 1.0.2, 2026-10-10):** `agy plugin install` accepted a full Agent Plugins manifest (`$schema`, `version`, `author`, `license`, `repository`, `keywords`, `extensions`), processed the skill, and staged the file unchanged. Still to confirm in M7: the plugin's skills and MCP server are visible to the agent at runtime. Fallback if not: keep root `plugin.json` minimal and move rich metadata to `.claude-plugin/`, `.codex-plugin/`, and `.cursor-plugin/` manifests. |
| T-2 | Does Antigravity expand a plugin-root variable in plugin `mcp_config.json` and `hooks.json`, and what working directory do plugin hooks get? | Hook that writes `pwd` and its environment to a file. Default design avoids the question by calling `brain` from `PATH`. |
| T-3 | Antigravity transcript JSONL line schema | Inspect a real transcript; the capture adapter parses defensively and falls back to `taint: unknown`. |
| T-4 | Does any host load a plugin-root `AGENTS.md` (or `GEMINI.md`) into user sessions? | Sentinel text in `AGENTS.md`; ask the agent in each host. |
| T-5 | Can an Antigravity headless run be restricted to no tools (custom agent `tools: []`)? | `agy -p … --agent <none-tools agent> --output-format stream-json`; inspect the tools list. |
| T-6 | Codex rollout files: line schema, how a session id maps to a file, and how subagent threads are marked | Record fixtures from current Codex releases; the reader is built against them. |
| T-7 | Which marketplace file does `codex plugin marketplace add` read from a repository: `.agents/plugins/marketplace.json` only, or also `.claude-plugin/marketplace.json`? | Add the repo as a marketplace in a scratch Codex config. |
| T-8 | Which hosts support elicitation (either form) for `brain_propose_rule` confirmation? | Call the tool in each host. |
| T-9 | Hook timeouts and output size limits per host in practice | Fixture hooks that sleep and print large outputs. |
| T-10 | Does `uvx --from brain-wiki==<version> brain hook …` (used by marketplace installs) fit the 300 ms hook budget once cached? | Time it on Linux and macOS. If not, plugin hooks call a small launcher that prefers `brain` on `PATH` and falls back to `uvx`. |
| T-11 | How much does the Claude Code transcript format vary across recent versions? (Its docs call the format internal.) | Fixtures from several releases; reader tests run against all of them. |

## 4. Future work (after v0.1)

| Area | Item | Design |
|---|---|---|
| Remote | HTTP transport, OAuth (CIMD and DCR), `search`/`fetch` aliases, tunnel recipes, for ChatGPT, claude.ai, and the Gemini app | [08 §9](08-agent-integrations.md#9-future-remote-mcp-for-chat-apps) |
| Storage | Git remote replicator, then GCS and S3 replicators via fsspec; server mode on object storage | [03 §6](03-config-and-storage.md#6-storage-and-sync) |
| Retrieval | Optional embeddings (sqlite-vec) with rank fusion; file watcher; cross-brain search; guard inheritance through containment | [04 §13](04-index-and-retrieval.md#13-future-work) |
| Consolidation | Direct-API backend; per-privacy-level backend routing (local model for sensitive topics); clustering as a selection heuristic | [05 §4.4](05-write-path-and-consolidation.md#44-backends) |
| Provenance | `brain forget --session <id>`: retract every claim whose only sources come from one session, with a dry run; per-claim source kinds (stated by user, observed in code, read in a document, inferred) | — |
| Hosts | Native OpenClaw memory provider (memory slot); Claude API memory-tool handler; Cursor plugin; MCP resources | [08](08-agent-integrations.md) |
| Importers | Chat exports, email, documents; authority ordering (specs over notes over chat) when sources disagree | [09](09-import.md) |
| Domain plugins | Signed influence propagation over weighted `depends_on`; domain layouts in the visualizer (dependency DAG, rule/exception tree, claim/evidence matrix); external state providers keyed by qualifiers | — |
| Bench | Adapters for public conversation-memory benchmarks | [11 §5](11-eval-bench.md#5-public-benchmarks) |

## Prior art

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
| Agent Skills, AGENTS.md, Agent Plugins 1.0, MCP | Open specifications | The integration surfaces in [08](08-agent-integrations.md) | — |
| Memory benchmarks (LongMemEval, MemoryAgentBench, LoCoMo, HaluMem) and wiki-compilation studies | MIT; MIT; CC BY-NC 4.0; CC BY-NC-ND 4.0 | Knowledge-update and conflict-resolution slices; extraction quality against gold points; probe coverage | See [11 §5](11-eval-bench.md#5-public-benchmarks). |
