---
id: 01M3250V00202P6QS53XYNDKAN
type: hub
title: "Scheduled maintenance"
source: "docs/proposal/scheduled-maintenance.md"
---
# Scheduled maintenance

Scheduled harvest and consolidation through host and OS schedulers

Status: built during development and removed before 0.1. Not scheduled; the
design needs rethinking first (§3). Today `brain schedule` runs one kind of
job, `brain commit`, from crontab or a LaunchAgent
([[write-path-52-brain-schedule|write path §5.2]]). Scheduled
harvest and consolidation are not built.

Today maintenance runs when the user asks. An agent harvests and
consolidates in the session
([[write-path-4-consolidation|write path §4]]), and edits notes
directly, then validates them
([[write-path-23-direct-edits|write path §2.3]]). This proposal
records the design that ran maintenance on a schedule instead.

The removed design used `brain schedule show|install|list|remove`. The name
`brain schedule` now belongs to commit jobs, so a revival needs another name
or new subcommands.

Generated from `docs/proposal/scheduled-maintenance.md`.

## Notes
- [[proposal-scheduled-maintenance-1-what-was-built]]: What was built (Scheduled maintenance)
  - [[proposal-scheduled-maintenance-11-routine-templates]]: Routine templates
  - [[proposal-scheduled-maintenance-12-headless-consolidation]]: Headless consolidation
- [[proposal-scheduled-maintenance-2-why-it-was-removed]]: Why it was removed (Scheduled maintenance)
- [[proposal-scheduled-maintenance-3-open-questions]]: Open questions (Scheduled maintenance)
