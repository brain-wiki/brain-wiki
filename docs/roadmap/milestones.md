# Milestones

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
| M7 | Agent integrations and skills | Root plugin files for each host, `brain connect`; the three skills; `brain doctor --json`, `brain setup` (routine templates and `brain schedule`, and host hooks for the briefing, capture, and recall, were built, then removed before 0.1: [scheduled maintenance](../proposal/scheduled-maintenance.md), [host hooks](../proposal/hooks.md)) | Connect fixture tests per host; plugin validation; manual smoke test in each host available on the build machine |
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

## Status (2026-10-15)

The milestones are implemented on `main` with tests (`uv run scripts/check.py`
runs every check). Format 3 (M13) is built, for release as 0.2.0. These
parts of the designs are not built:

| Not built | Where it is now |
|---|---|
| Scheduled maintenance: routine templates and the headless consolidation backend (built, then removed before 0.1). `brain schedule` now installs only commit jobs (D35) | [Scheduled maintenance proposal](../proposal/scheduled-maintenance.md) |
| Commit jobs on Windows (Task Scheduler) | [config and storage §6.2](../design/config-and-storage.md#62-v01-local-folder-with-optional-git) |
| Bench: the `agent` suite (a stub that reports skipped), model comparisons | Checked by hand before releases ([eval bench §3.5](../design/eval-bench.md#35-agent)) |
| Host hooks: the briefing at session start, capture, per-prompt recall, an OpenClaw hook pack | [Host hooks proposal](../proposal/hooks.md) |
| Unharvested-session count in orientation | [Backlog](ideas.md) (Harvest) |
| MCP review tools | [Backlog](ideas.md) (Consolidation) |
| Privacy levels inside a brain (built, then removed) | [Privacy proposal](../proposal/privacy.md) |

What the built code does not yet prove:

| Area | Gap | Covered by |
|---|---|---|
| Real hosts | The Antigravity CLI (1.3.3) was run with the plugin installed: skills, MCP, rules, orientation, tool-call payloads, rule proposals, and the headless preset work. Claude Code, Codex, OpenClaw, and Cursor were tested only with fixtures and the SDK's clients; the build machine has none of their CLIs | T-4, T-7, T-8, T-9 (other hosts) |
| Session readers | Claude Code and Antigravity readers were checked against local transcripts (structure only); the Codex reader follows the published source, not recorded files | T-6, T-11 |
| Marketplace start-up | The bundle's MCP server starts through online `uvx`, by choice (D23): it delayed Antigravity's brain tools by up to two minutes behind a slow index; `brain connect` is the fast path | T-10 (macOS) |
| Performance | Every budget the perf suite measures (doc engineering §5) passes on the bench's generated format-3 10k brain (after M13, 2026-10-15: rebuild 19.8 s, freshness check 127 ms, one-file update 30 ms p95, search 36 ms p95, read 5 ms p95, orientation 18.8 ms p95, warm lint 0.68 s); the freshness check has the least margin | `brain bench perf --sizes 10k` |
| Note quality | Consolidation and direct edits are agents writing Markdown; no bench measures the notes they write | By hand; a future `agent` suite |
