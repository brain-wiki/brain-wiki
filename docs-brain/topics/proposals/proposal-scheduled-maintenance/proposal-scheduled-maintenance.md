---
id: 01M3250V00202P6QS53XYNDKAN
type: hub
title: "Scheduled maintenance"
source: "docs/proposal/scheduled-maintenance.md"
---
# Scheduled maintenance

Routine templates for hosts' schedulers and OS schedulers; a headless consolidation backend; one consolidation device

Status: built during development and removed before 0.1. Not scheduled;
the design below needs rethinking first (§3). Since format 3, `brain schedule`
exists for one job only: running `brain commit` from crontab or a
LaunchAgent ([[write-path-52-brain-schedule|write path §5.2]]).
Maintenance routines remain unbuilt.

Maintenance today runs when the user asks for it: an agent harvests and
consolidates in the session ([[write-path-4-consolidation|write path §4]]),
and edits notes directly, then validates them
([[write-path-23-direct-edits|write path §2.3]]).
This proposal is what ran maintenance on a schedule instead. Its command
name, `brain schedule show|install|list|remove`, described the removed
design; the name `brain schedule` now belongs to the commit jobs, so a
revival needs another name or new subcommands.

Generated from `docs/proposal/scheduled-maintenance.md`.

## Notes
- [[proposal-scheduled-maintenance-1-what-was-built]]: What was built (Scheduled maintenance)
  - [[proposal-scheduled-maintenance-11-routine-templates]]: Routine templates
  - [[proposal-scheduled-maintenance-12-headless-consolidation]]: Headless consolidation
- [[proposal-scheduled-maintenance-2-why-it-was-removed]]: Why it was removed (Scheduled maintenance)
- [[proposal-scheduled-maintenance-3-open-questions]]: Open questions (Scheduled maintenance)
