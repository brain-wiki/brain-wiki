---
id: 01M3250V00WQGMA1VTRRV6Y9VQ
type: proposal
title: "Plan"
aliases: ["Episodes: quick capture, per-agent consolidation §10"]
source: "docs/proposal/episode-lifecycle.md#10-plan"
---
# Plan

| Phase | Content |
|---|---|
| 1 | Capture: agents only, through MCP; `brain log`, the `episodes` capability, `brain import --to-episodes`, and `brain import --from` removed; `bw-agent` always the caller; the `pattern` hint; import guidance in the skill |
| 2 | Scope and patterns: `--prepare` by owner, with `agents`, `unowned`, and `all` for when the user asks; outcomes and the `bw-sources` check in `--done`; the guidance rewrite, `reports/consolidation.md`, pending episodes per agent in orientation and doctor; harvest files sessions directly (session URLs, `brain_harvest_done`, session URLs in `brain origin`; `brain harvest --apply`, `--raw`, and `--distill` removed) |
| 3 | Scheduled consolidation for Claude Code: unattended mode, `brain schedule add consolidate`, checks before starting, failure reporting in orientation and doctor |
| 4 | Other hosts as their unattended modes are verified |

When built, `brain log` leaves the CLI, the user guide, the skills, and the
setup wizard's next steps, and the setup skill checks capture with
`brain_log_episode`. Existing episodes written by people count as
unowned. The import design (§6), the user guide's import page, and the
write path's table of episode writers lose `--to-episodes` and `--from`.
The write path (§2.2), agent integrations (§6), and the user guide's
harvest section describe harvest filing into notes, and a new decision
replaces the episode output of D20. This proposal replaces the
consolidation part of [[proposal-scheduled-maintenance|scheduled maintenance]].
