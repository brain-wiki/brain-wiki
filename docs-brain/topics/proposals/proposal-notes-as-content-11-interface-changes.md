---
id: 01M3250V00TDD2KP4410AREZQ2
type: proposal
title: "Interface changes"
tags: [proposals]
source: "docs/proposals/notes-as-content.md#11-interface-changes"
---
# Interface changes

| Today | Format 3 |
|---|---|
| `brain check` / `brain_check` | `brain validate` / `brain_validate` |
| `brain restore` | Removed (git) |
| — | `brain commit`: snapshot direct edits into git |
| — | `brain schedule add\|list\|remove commit`: crontab (Linux) or LaunchAgent (macOS) |
| `brain consolidate --apply OPS.json --run RUN` / `brain_consolidate_apply` | `brain consolidate --done EPISODE…` / `brain_consolidate_done` |
| `brain review` (runs and rules) | Rules only |
| `brain neighbors --rel R` | `brain neighbors` (links and backlinks) |
| `brain read --mode outline` lists claims | Lists headings and links |
| Capabilities `episodes, edit, propose_rules, consolidate, harvest` | `episodes, edit, propose_rules, harvest` |
| `brain import --overlay --phase 1–3` | Phase 0 only |
