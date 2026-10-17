# Milestones

brain-wiki was built in the milestones below. Each ended with passing tests, updated docs, and self-contained commits, and depended only on earlier milestones. All of them are built and on `main`, and `uv run scripts/check.py` runs every check. Version 0.2.0, released 2026-10-15, includes M13.

| # | Milestone | What it delivered | Exit criteria | Status |
|---|---|---|---|---|
| M0 | Skeleton | Package layout, the `brain` command with lazy subcommands, platform dirs, user config, ULIDs, `LocalStore` with atomic writes, `scripts/check.py` | `brain init` creates and registers a valid brain; check script green | Built |
| M1 | Format | Parsers and line-preserving writers for frontmatter, links, episodes, rules, and the `AGENTS.md` block, plus claims and relations | Round-trip and locality property tests | Built; M13 replaced claims and relations |
| M2 | Index and retrieval | Schema, scanner with freshness and renames, link resolution, search (FTS5, trigram, fallback), guards, read, orient | Guard recall 100% on generated brains; perf at 1k within budget | Built; M13 left only the supersession guard |
| M3 | Lint and reports | Rule catalog, lint profiles, fixes as runs, reports, pre-commit hook | Lint suite 100% on its corpus; fixes idempotent | Built |
| M4 | Write path and runs | Episode writer with secret scrubbing and dedupe, `brain log`, rules from the CLI, run records with undo, locks, git integration, `brain mv`, `brain doctor` | Undo restores exact bytes; git commits hold only touched files | Built |
| M5 | Consolidation | Episode selection and packets, the ops schema, validator, and applier, review proposals, headless presets | Tests per op; a run against a real preset | Partly replaced: M13 removed ops and review; selection lives on in `--prepare`; M14 removed the presets |
| M6 | MCP server | Tools, three prompts, error codes, server instructions | Client tests for every tool and error path | Built; 13 tools after M8, M12, and M13 |
| M7 | Agent integrations and skills | Plugin files for each host at the repo root, `brain connect`, three skills, `brain doctor --json`, `brain setup` | Connect tests per host; plugin validation; smoke test in each host on the build machine | Built; routine templates, `brain schedule`, and host hooks were removed before 0.1 |
| M8 | Import and harvest | `brain import` (overlay phases, `--into`, `--to-episodes`, `--from`), session readers for Claude Code, Codex, and Antigravity, `brain harvest`, the in-agent harvest recipe, origin lookup | Overlay phase 0 changes no existing file; each phase undoable; harvest routes and skips correctly and writes no duplicates | Built; M13 cut overlay to phases 0–2; M14 removed `--to-episodes`, `--from`, and `harvest --apply` |
| M9 | Bench | Generator, suites, graders, report, compare | Offline suites run in `scripts/check.py` | Built; the `agent` suite is a stub, and M13 removed the consolidation suite |
| M10 | Visualizer | Graph export, level-of-detail API, local server, the brain-wiki-viz bundle (D17), exports | Manual checklist on a 10k brain; escaping tests | Built |
| M11 | Release readiness | User guide, README, CONTRIBUTING, SECURITY, CHANGELOG, version sync, registry files | A fresh machine installs and connects one host from the guide | Built; 0.1.0 released |
| M12 | Agent context and discovery (D25–D28) | Static instructions per host, `brain_list`, "What's in this brain" in orientation, search filters, browse, counts, facets, `paths` output, `brain_neighbors`, Obsidian-style listing commands, checked agent edits | Tests per tool; connect writes and removes the instruction block for every host that has one; the retrieval failures found on a sample brain pass | Built; M13 replaced checked edits (`brain check`, `brain restore`, topic `agent_edits`) |
| M13 | Format 3 (D32–D35) | Notes as Markdown pages, `brain validate`, the "Writing notes" guide, an index without claims or typed links, direct edits, `brain consolidate --prepare` and `--done`, conversion in `brain lint --fix`, `brain commit`, `brain schedule` | Conversion is one undoable run with a `--dry-run` diff; offline bench suites pass on format 3; commit jobs tested with a local origin and fake schedulers | Built; released in 0.2.0 |
| M14 | Episode lifecycle (D36, D37) | Capture through MCP only, ownership by `bw-agent`, per-agent `--prepare` with `agents`/`unowned`/`all`, consolidation patterns and the citation check in `--done`, pending episodes per agent in orientation and doctor, `reports/consolidation.md`, harvest and import filing into notes with session URLs, `brain schedule add consolidate` and `brain consolidate --run` for Claude Code | Scope, outcome, and citation tests; a scheduled run end to end against a recording stand-in for `claude`; schedule tests with a fake crontab | Built; not released |

## Not built

| Not built | Where it is now |
|---|---|
| Unattended consolidation for Codex, Antigravity, Cursor, and OpenClaw; they consolidate in sessions | [agent integrations §7](../design/agent-integrations.md#7-unattended-agent-mode) |
| Commit jobs on Windows. `brain schedule` refuses to run there | [config and storage §6.2](../design/config-and-storage.md#62-local-folder-with-optional-git) |
| The bench's `agent` suite and model comparisons | Checked by hand before releases ([eval bench §3.5](../design/eval-bench.md#35-agent)) |
| Host hooks: a briefing at session start, capture, recall on each prompt, an OpenClaw hook pack | [Host hooks proposal](../proposal/hooks.md) |
| A count of unharvested sessions in orientation | [Ideas](ideas.md) (Harvest) |
| MCP tools for rule proposals | [Ideas](ideas.md) (Consolidation) |
| Privacy levels inside a brain (built, then removed) | [Privacy proposal](../proposal/privacy.md) |
| Remote MCP and remote sync | [Remote MCP](../proposal/remote-mcp.md) and [remote sync](../proposal/remote-sync.md) proposals |

## What the tests do not yet prove

| Area | Gap | Covered by |
|---|---|---|
| Real hosts | Only the Antigravity CLI (1.3.3) ran with the plugin installed; skills, MCP, rules, orientation, rule proposals, and the headless preset worked. Claude Code, Codex, OpenClaw, and Cursor were tested with fixtures and the MCP SDK's clients only | T-4, T-7, T-8, T-9, T-15 |
| Unattended mode | The Claude Code flags of a scheduled run were tested with a recording stand-in for `claude`, not the real CLI: tool scoping to the brain and approval-free MCP calls are unverified | [agent integrations §9](../design/agent-integrations.md#9-test-matrix) |
| Session readers | The Claude Code and Antigravity readers were checked against local transcripts, for structure only. The Codex reader follows the published source, not recorded files | T-6, T-11 |
| Marketplace start-up | The plugin's MCP server starts through online `uvx` (D23), which delayed Antigravity's brain tools by up to two minutes behind a slow package index. `brain connect` avoids the delay | T-10 (macOS) |
| Performance | Every budget the perf suite measures passes on a generated 10k format-3 brain (below). The freshness check has the least margin | `brain bench perf --sizes 10k` |
| Note quality | No bench measures the notes agents write | By hand; a future `agent` suite |

Performance at 10k notes after M13 (2026-10-15), against the budgets in [engineering §5](../design/engineering.md#5-performance-budgets):

| Measure | Result |
|---|---|
| Full rebuild | 19.8 s |
| Freshness check | 127 ms |
| One-file update, p95 | 30 ms |
| Search, p95 | 36 ms |
| Read, p95 | 5 ms |
| Orientation, p95 | 18.8 ms |
| Warm lint | 0.68 s |
