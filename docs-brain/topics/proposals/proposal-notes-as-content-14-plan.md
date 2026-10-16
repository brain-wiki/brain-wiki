---
id: 01M3250V0029QWJE6EN6ARC7X1
type: proposal
title: "Plan"
tags: [proposals]
source: "docs/proposals/notes-as-content.md#14-plan"
---
# Plan

Each phase is one reviewable change with `scripts/check.py` green.

| Phase | Content |
|---|---|
| P1 | Schema module; `brain validate` (CLI and MCP); orientation's Writing notes section |
| P2 | Format-3 reading and index: no claims or typed edges; supersession guard on `bw-superseded_by`; `neighbors` and `read` outlines on links |
| P3 | Write path: remove ops, validator, `check`, `restore`, edit review; consolidate `--prepare` / `--done`; capabilities; reload `brain.toml` when it changes (the stale-profile bug) |
| P3b | `brain commit`; `brain schedule` with crontab and LaunchAgent backends; setup and doctor hooks |
| P4 | Lint, reports, import, bench; the format 1/2 → 3 conversion |
| P5 | Visualizer API, brain-wiki-viz, new bundle |
| P6 | Docs, skills, README, CHANGELOG; 0.1.x fixes (`brains remove` cleanup, help text, `opencode` client name); release 0.2.0 |

After the release, convert existing brains with `brain lint --fix --dry-run`
first.
