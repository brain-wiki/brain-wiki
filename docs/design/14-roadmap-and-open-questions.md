# 14 · Roadmap and open questions

Status: draft for review

## 1. Implementation milestones (stage 2)

Each milestone ends with passing tests, updated docs, and one or more
self-contained commits. Later milestones depend only on earlier ones.

| # | Milestone | Delivers | Exit criteria |
|---|---|---|---|
| M0 | Skeleton | `pyproject.toml`, package layout, `brain` entry point with lazy subcommands, platform dirs, user config, ULIDs, `LocalStore` (atomic writes, `O_EXCL`), `scripts/check.py` | `brain --version`; `brain init` creates a valid brain and registers it; CI script green |
| M1 | Format | Parsers and line-preserving writers: frontmatter, claims, relations (with aliases and inverses), links, episodes, rules, `AGENTS.md` block | Round-trip and locality property tests |
| M2 | Index and retrieval | Schema, scanner with freshness and renames, link resolution, search (FTS5 + trigram + fallback), guards with chains and caps, read, orient; `brain search/read/orient/index` | Retrieval suite on generated brains: guard recall 100%; perf at 1k within budget |
| M3 | Lint and reports | Rule catalog, profiles and overrides, fixes as runs, reports, pre-commit hook | Lint suite 100% on its corpus; fix idempotency |
| M4 | Write path and runs | Episode writer with secret scrubbing and dedupe; `brain log`; rules via CLI; run records, pre-images, undo, locks, git integration; `brain mv`; `brain doctor` | Undo restores exact bytes; git commits contain only touched files |
| M5 | Consolidation | Selection and packets, ops schema and validator, deterministic applier, review proposals, agent backend (prepare/apply); headless presets for the bench (a command backend was built, then removed before 0.1) | Tests per op; consolidation suite runs against at least one real preset |
| M6 | MCP server | Ten tools, three prompts, error codes, instructions, cache hints (the harvest tools are wired in M8) | In-memory client tests for every tool and error path |
| M7 | Agent integrations and skills | Root plugin files for each host, `brain connect`; the three skills; `brain doctor --json`, `brain setup` (routine templates and `brain schedule`, and host hooks for the briefing, capture, and recall, were built, then removed before 0.1: [scheduled maintenance](../proposals/scheduled-maintenance.md), [host hooks](../proposals/hooks.md)) | Connect fixture tests per host; plugin validation; manual smoke test in each host available on the build machine |
| M8 | Import and harvest | Overlay (phases 0–3), into, to-episodes, from-host presets; session readers for Claude Code, Codex, and Antigravity; `brain harvest` (dry run, routing, raw and distill); the in-agent recipe (`brain_harvest_prepare` / `brain_harvest_apply`, `harvest` prompt, skill section, self-read fallback); origin lookup (`brain origin`, `brain_read_origin`) | Import of a generated messy vault: phase 0 changes no existing file; each phase undoable. Harvest on recorded fixtures: correct routing and skips, one episode per session chunk, no duplicates on a repeated harvest |
| M9 | Bench | Generator, suites, graders, report, compare (capture, a larger scenario set, and the `agent` suite were not built; the consolidation suite was removed in M13) | Offline suites in `scripts/check.py`; a consolidation run across two presets produces a report |
| M10 | Visualizer | Graph export, level-of-detail API, local server, the committed build of brain-wiki-viz (D17), exports | Manual checklist on a 10k brain; escaping tests |
| M11 | Release readiness | User guide, README, CONTRIBUTING, SECURITY, CHANGELOG, version sync, registry files | `scripts/check.py` runs every check; a fresh machine can install and connect one host following the guide |
| M12 | Agent context and discovery (D25–D28) | Static instructions per host, placed by `brain connect` (Codex reads the MCP server's); `brain_list`; briefing with "what's in this brain"; search filters, browse, counts, facets, paths output; handles in reads; `brain_neighbors`; Obsidian-style CLI commands; checked agent edits (`brain check`, pending edits, `brain restore`, `edit` capability, topic `agent_edits`) | Unit and MCP tests per tool; connect writes and uninstalls the block for every host that has an instruction file, in fixtures; edits that delete a claim or touch protected files are refused; the retrieval failures found on the OpenClaw sample ("latest release", "what changed last week", sentence queries) pass as typed calls |
| M13 | Format 3 (D32–D35) | Notes as ordinary Markdown: metadata-only frontmatter, `brain validate`, the Writing notes section of orientation; an index without claims or typed edges, with the supersession guard on `bw-superseded_by`; direct edits replace `brain check`, ops, and edit review; `brain consolidate --prepare` / `--done`; the format 1/2 → 3 conversion in `brain lint --fix`; lint, reports, import, bench, and visualizer on format 3; `brain commit` and `brain schedule` | Conversion is one undoable run and `--dry-run` shows its diff; `brain validate` runs lint's schema rules on the changed files; offline bench suites pass on format-3 brains; `brain commit` and its jobs tested with a local origin and fake schedulers |

Order rationale: M1–M4 are the foundation everything else touches; M5 and
M6 are the core value; M7 makes it usable in hosts; M8–M10 widen adoption
and trust. M13 replaced parts of M1, M5, and M12 (claims, relations, ops,
checked edits).

### 1.1 Status (2026-10-15)

The milestones are implemented on `main` with tests (`uv run scripts/check.py`
runs every check). Format 3 (M13) is built, for release as 0.2.0. These
parts of the designs are not built:

| Not built | Where it is now |
|---|---|
| Scheduled maintenance: routine templates and the headless consolidation backend (built, then removed before 0.1). `brain schedule` now installs only commit jobs (D35) | [Scheduled maintenance proposal](../proposals/scheduled-maintenance.md) |
| Commit jobs on Windows (Task Scheduler) | [03 §6.2](03-config-and-storage.md#62-v01-local-folder-with-optional-git) |
| Bench: the `agent` suite (a stub that reports skipped), model comparisons | Checked by hand before releases ([11 §3.5](11-eval-bench.md#35-agent)) |
| Host hooks: the briefing at session start, capture, per-prompt recall, an OpenClaw hook pack | [Host hooks proposal](../proposals/hooks.md) |
| Unharvested-session count in orientation | [Backlog](../proposals/README.md#backlog) (Harvest) |
| MCP review tools | [Backlog](../proposals/README.md#backlog) (Consolidation) |
| Privacy levels inside a brain (built, then removed) | [Privacy proposal](../proposals/privacy.md) |

What the built code does not yet prove:

| Area | Gap | Covered by |
|---|---|---|
| Real hosts | The Antigravity CLI (1.3.3) was run with the plugin installed: skills, MCP, rules, orientation, tool-call payloads, rule proposals, and the headless preset work. Claude Code, Codex, OpenClaw, and Cursor were tested only with fixtures and the SDK's clients; the build machine has none of their CLIs | T-4, T-7, T-8, T-9 (other hosts) |
| Session readers | Claude Code and Antigravity readers were checked against local transcripts (structure only); the Codex reader follows the published source, not recorded files | T-6, T-11 |
| Marketplace start-up | The bundle's MCP server starts through online `uvx`, by choice (D23): it delayed Antigravity's brain tools by up to two minutes behind a slow index; `brain connect` is the fast path | T-10 (macOS) |
| Performance | Every budget the perf suite measures (doc 13 §5) passes on the bench's generated format-3 10k brain (after M13, 2026-10-15: rebuild 19.8 s, freshness check 127 ms, one-file update 30 ms p95, search 36 ms p95, read 5 ms p95, orientation 18.8 ms p95, warm lint 0.68 s); the freshness check has the least margin | `brain bench perf --sizes 10k` |
| Note quality | Consolidation and direct edits are agents writing Markdown; no bench measures the notes they write | By hand; a future `agent` suite |

## 2. Decisions needed from the maintainer

These change the design or defaults. Each has a recommendation.

| # | Question | Options | Recommendation |
|---|---|---|---|
| Q1 | **How should session capture work when enabled?** | — | Moot for v0.1: capture was removed with the other host hooks ([proposal](../proposals/hooks.md)); harvest covers the same sessions afterwards. |
| Q2 | **Should sources with external inputs route consolidation runs to review by default?** (`review_external`) | false: their claims land marked `[unverified]`; true: every run touching web-derived episodes waits for review | **Withdrawn (format 3):** consolidation has no review routing and `[unverified]` is gone (D34). Rules stay protected regardless. |
| Q3 | **Privacy inside a brain** | Ordered levels per topic and note with a maximum per host (shipped, then removed); a model built on who receives content | **Open:** levels were removed until a design says what each protects against ([proposal](../proposals/privacy.md)). |
| Q4 | **Hidden guard counts** reveal that a restricted superseding note exists. | Keep counts; hide completely | Moot until privacy returns ([proposal](../proposals/privacy.md)). |
| Q5 | **Windows support level for v0.1** | First-class; best-effort | Best-effort (core tests in CI, no host guarantees). |
| Q6 | **npm launcher** (`npx brain-wiki`) | Ship in v0.1; defer | Defer. `uvx` covers the no-install path. |
| Q7 | **Publishing identity** | Personal GitHub account; an organization | **Decided (D24):** the `brain-wiki` organization, `github.com/brain-wiki/brain-wiki`; MCP Registry name `io.github.brain-wiki/brain-wiki`. |
| Q8 | **Harvest default: distill or raw?** | Distill with the configured preset (cleaner episodes, model cost); raw (no model, verbose episodes for consolidation to distill) | Distill when a command-backend preset is configured, raw otherwise; a backfill dry run shows the token estimate before anything is spent. |
| Q9 | **Where does agent-learned knowledge live?** (see [01 §2.1](01-overview.md#21-two-uses)) | (a) Mixed in the user's topics, told apart only by per-claim `origin`. (b) Agent-owned topics: a topic flag (`owner = "agents"`) that consolidation may grow freely while user topics only gain inbox proposals. (c) A separate brain per agent or fleet, with a manifest `kind = "agent"` for brains no human curates. | (b), with (c) available through the same flag at brain level: one brain stays the default, user notes are protected from agent sprawl, and a standalone agent can still own a whole brain. **Open.** Format 3 removed per-claim `origin`, so (a) now means no distinction at all. |
| Q10 | **Should retrieval weigh who said it?** | (a) No: rank by relevance only, as today. (b) Label each result and orientation item with its origin (yours vs learned by agents) without changing rank. (c) Also rank owner-origin above agent-origin on ties, per profile. | **Moot until Q9 is settled:** format 3 records no origin per claim or note (D33), so there is nothing to label or rank by. Git history and `bw-sources` are the only record of who wrote what. |
| Q11 | **How do world facts stay current?** Agent knowledge about the outside world (versions, APIs, prices, people's roles) goes stale silently. | (a) Rely on supersession when someone notices. (b) Activate the reserved `valid_until` and a per-claim `source` URL; lint and the health view flag claims past due or old and unverified; a verify pass re-checks them against their sources. (c) Time-decay ranking. | **Open (format 3):** (b) relied on claim metadata, which is gone. Note-level `bw-sources` URLs exist; a note-level review date and a lint check are not designed. |
| Q12 | **What may agents learn without the user?** Rules always need the user's words. Agents also learn procedures ("tests in this repo need the emulator"). | (a) Procedures are ordinary notes, recalled by search only. (b) A `howto` note type that orientation surfaces for the matching project, below rules, never as a directive. (c) Let agents propose rules for one-click approval (already possible) and nothing else. | (b): agents get their own lessons back at session start without granting them the authority of rules. |

## 3. Verification items

Facts the design depends on that could not be confirmed from
documentation. Each becomes a test during M7, and the design adapts to the
result.

| # | Question | Test |
|---|---|---|
| T-1 | Does Antigravity accept a root `plugin.json` that carries Agent Plugins fields (`$schema`, `version`, `extensions`)? Its published schema is closed. | **Verified (agy 1.3.3, 2026-10-11):** `agy plugin install` accepts the full Agent Plugins manifest, and in a session the agent lists the plugin's three skills, calls its MCP tools, gets its `always_on` rules, and runs its hooks. |
| T-2 | Does Antigravity expand a plugin-root variable in plugin `mcp_config.json` and `hooks.json`, and what working directory do plugin hooks get? | **Verified (agy 1.3.3):** no plugin-root variable is set (`PLUGIN_ROOT`, `PLUGIN_DIR`, `PLUGIN_DATA`, `extensionPath` all unset). Hook commands run through a shell (`$HOME` and `${VAR:-x}` expand) with the plugin folder as working directory, the host's environment, `ANTIGRAVITY_CONVERSATION_ID`, and stdin closed after the payload. The project came from the payload's `workspacePaths`. |
| T-3 | Antigravity transcript JSONL line schema | **Verified for structure (2026-10-11):** steps carry `step_index`, `source`, `type` (`USER_INPUT`, `PLANNER_RESPONSE` with `tool_calls[{name, args}]`, `EPHEMERAL_MESSAGE`, tool step types), `status`, `created_at`, `content`. MCP calls are `call_mcp_tool` with `ServerName`, `ToolName`, `Arguments`. `transcript.jsonl` cuts long steps to about 4 KB; `transcript_full.jsonl` keeps them and is what the reader prefers. The CLI writes `conversation_summaries.db` (with `workspace_uris`) since 1.3, so its conversations route by working directory. |
| T-4 | Does any host load a plugin-root `AGENTS.md` (or `GEMINI.md`) into user sessions? | **Antigravity CLI: no** (the same plugin's `always_on` rule did load). Other hosts not tested. |
| T-5 | Can an Antigravity headless run be restricted to no tools (custom agent `tools: []`)? | **No (agy 1.3.3):** with `tools: []` or `tools: [finish]`, `init.tools` still listed all 59 tools. A tool call that headless mode denies ends the turn with no output, so the presets' prompt now starts with a no-tools preamble; the consolidation run then answered with ops directly. |
| T-6 | Codex rollout files: line schema, how a session id maps to a file, and how subagent threads are marked | Record fixtures from current Codex releases; the reader is built against them. |
| T-7 | Which marketplace file does `codex plugin marketplace add` read from a repository: `.agents/plugins/marketplace.json` only, or also `.claude-plugin/marketplace.json`? | Add the repo as a marketplace in a scratch Codex config. |
| T-8 | Which hosts support elicitation (either form) for `brain_propose_rule` confirmation? | **Antigravity CLI:** declares `elicitation: {form, url}` (client `antigravity-client`, protocol 2025-11-25) but declines every request without showing anything, headless and interactive. The server now gives Antigravity clients the proposal fallback. Claude Code and Codex not tested. |
| T-9 | Hook timeouts and output size limits per host in practice | **Antigravity:** a hook past its timeout is killed, logged, and its output dropped; the model call then proceeds. Hooks run one after another before every model call, so a slow hook delays each call. An `ephemeralMessage` is cut at about 49 KB with a notice appended. Other hosts not tested. |
| T-10 | Does `uvx --from brain-wiki==<version> brain hook …` (used by marketplace installs) fit the 300 ms hook budget once cached? | **No (Linux, 2026-10-11):** online `uvx` revalidates the index on every call, 23 s behind a slow package index even when cached, so Antigravity killed the hook before every model call. `uvx --offline` takes 0.13–0.21 s and an installed `brain-wiki` 0.08–0.11 s. Hooks were later removed altogether ([proposal](../proposals/hooks.md)); the MCP server's start has the same cost (08 §3). macOS not timed. |
| T-11 | How much does the Claude Code transcript format vary across recent versions? (Its docs call the format internal.) | Fixtures from several releases; reader tests run against all of them. |
| T-14 | Does Obsidian treat links in list properties (`bw-depends_on: ["[[Note]] — why"]`, with text after the link) as links: in backlinks and the graph, and rewritten on rename? | **Narrowed by format 3:** relations with text after the link moved to the body. Only `bw-superseded_by` and `bw-sources` hold links in properties, as bare `"[[note]]"` values. Open a format 3 brain in a scratch vault; rename a note one of them names and check the property, the backlinks pane, and the graph. |
| T-15 | Does Codex put the MCP server's `instructions` into the model's context, and does the agent act on them (call `brain_list` and `brain_orient` before work on past decisions)? brain-wiki relies on it instead of writing `AGENTS.md` ([Codex](agents/codex.md#1-instructions-come-from-the-mcp-server)). | In a scratch Codex session with the plugin, ask about a past decision and check that the agent orients first. |

## 4. Future work

Designs not yet built, and the backlog of ideas without a design, are in
[docs/proposals](../proposals/README.md).

## Prior art

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
| Agent Skills, AGENTS.md, Agent Plugins 1.0, MCP | Open specifications | The integration surfaces in [08](08-agent-integrations.md) | — |
| Memory benchmarks (LongMemEval, MemoryAgentBench, LoCoMo, HaluMem) and wiki-compilation studies | MIT; MIT; CC BY-NC 4.0; CC BY-NC-ND 4.0 | Knowledge-update and conflict-resolution slices; extraction quality against gold points; probe coverage | See the [public benchmarks proposal](../proposals/public-benchmarks.md). |
