---
id: 01M3250V00GVKZ53BQN6JDRP56
type: hub
title: "Milestones"
source: "docs/roadmap/milestones.md"
---
# Milestones

Implementation milestones and the build status

brain-wiki was built in the milestones below. Each ended with passing tests, updated docs, and self-contained commits, and depended only on earlier milestones. All of them are built and on `main`, and `uv run scripts/check.py` runs every check. Version 0.2.0, released 2026-10-15, includes M13.
## Not built

| Not built | Where it is now |
|---|---|
| Unattended consolidation for Codex, Antigravity, Cursor, and OpenClaw; they consolidate in sessions | [[agent-integrations-7-unattended-agent-mode\|agent integrations §7]] |
| Commit jobs on Windows. `brain schedule` refuses to run there | [[config-and-storage-6-storage-and-sync\|config and storage §6.2]] |
| The bench's `agent` suite and model comparisons | Checked by hand before releases ([[eval-bench\|eval bench §3.5]]) |
| Host hooks: a briefing at session start, capture, recall on each prompt, an OpenClaw hook pack | [[proposal-hooks\|Host hooks proposal]] |
| A count of unharvested sessions in orientation | [[ideas\|Ideas]] (Harvest) |
| MCP tools for rule proposals | [[ideas\|Ideas]] (Consolidation) |
| Privacy levels inside a brain (built, then removed) | [[proposal-privacy\|Privacy proposal]] |
| Remote MCP and remote sync | [[proposal-remote-mcp\|Remote MCP]] and [[proposal-remote-sync\|remote sync]] proposals |


## What the tests do not yet prove

| Area | Gap | Covered by |
|---|---|---|
| Real hosts | Only the Antigravity CLI (1.3.3) ran with the plugin installed; skills, MCP, rules, orientation, rule proposals, and the headless preset worked. Claude Code, Codex, OpenClaw, and Cursor were tested with fixtures and the MCP SDK's clients only | T-4, T-7, T-8, T-9, T-15 |
| Unattended mode | The Claude Code flags of a scheduled run were tested with a recording stand-in for `claude`, not the real CLI: tool scoping to the brain and approval-free MCP calls are unverified | [[agent-integrations-9-test-matrix\|agent integrations §9]] |
| Session readers | The Claude Code and Antigravity readers were checked against local transcripts, for structure only. The Codex reader follows the published source, not recorded files | T-6, T-11 |
| Marketplace start-up | The plugin's MCP server starts through online `uvx` (D23), which delayed Antigravity's brain tools by up to two minutes behind a slow package index. `brain connect` avoids the delay | T-10 (macOS) |
| Performance | Every budget the perf suite measures passes on a generated 10k format-3 brain (below). The freshness check has the least margin | `brain bench perf --sizes 10k` |
| Note quality | No bench measures the notes agents write | By hand; a future `agent` suite |

Performance at 10k notes after M13 (2026-10-15), against the budgets in [[engineering-5-performance-budgets|engineering §5]]:

| Measure | Result |
|---|---|
| Full rebuild | 19.8 s |
| Freshness check | 127 ms |
| One-file update, p95 | 30 ms |
| Search, p95 | 36 ms |
| Read, p95 | 5 ms |
| Orientation, p95 | 18.8 ms |
| Warm lint | 0.68 s |


Generated from `docs/roadmap/milestones.md`.

## Notes
- [[m0]]: M0: Skeleton
- [[m1]]: M1: Format
- [[m2]]: M2: Index and retrieval
- [[m3]]: M3: Lint and reports
- [[m4]]: M4: Write path and runs
- [[m5]]: M5: Consolidation
- [[m6]]: M6: MCP server
- [[m7]]: M7: Agent integrations and skills
- [[m8]]: M8: Import and harvest
- [[m9]]: M9: Bench
- [[m10]]: M10: Visualizer
- [[m11]]: M11: Release readiness
- [[m12]]: M12: Agent context and discovery (D25–D28)
- [[m13]]: M13: Format 3 (D32–D35)
- [[m14]]: M14: Episode lifecycle (D36, D37)
