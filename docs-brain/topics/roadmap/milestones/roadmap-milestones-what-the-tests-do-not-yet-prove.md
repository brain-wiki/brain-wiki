---
id: 01M3250V00MV7VNA07KB5YY9RB
type: reference
title: "What the tests do not yet prove"
source: "docs/roadmap/milestones.md#what-the-tests-do-not-yet-prove"
---
# What the tests do not yet prove

| Area | Gap | Covered by |
|---|---|---|
| Real hosts | Only the Antigravity CLI (1.3.3) ran with the plugin installed; skills, MCP, rules, orientation, rule proposals, and the headless preset worked. Claude Code, Codex, OpenClaw, and Cursor were tested with fixtures and the MCP SDK's clients only | T-4, T-7, T-8, T-9, T-15 |
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
