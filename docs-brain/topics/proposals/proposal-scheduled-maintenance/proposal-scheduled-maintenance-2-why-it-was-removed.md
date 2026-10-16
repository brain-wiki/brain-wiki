---
id: 01M3250V00DNCHPC83CEGZBFVM
type: proposal
title: "Why it was removed (Scheduled maintenance)"
aliases: ["Scheduled maintenance §2"]
source: "docs/proposal/scheduled-maintenance.md#2-why-it-was-removed"
---
# Why it was removed (Scheduled maintenance)

- **It failed silently by default.** A new brain lets agents only log
  episodes, so the nightly `brain consolidate --backend command` was refused
  every night, and nobody saw the error in a cron log.
- **Device names were brittle.** `[consolidate] device` coupled the brain to
  a machine name; synced dotfiles made two machines claim the same name, and
  replacing a machine stopped consolidation without warning.
- **Desktop schedulers are not configurable from outside.** Most routines
  were printed steps for the user to click through, with per-host quirks
  (session-scoped schedules, catch-up runs, tool approval prompts).
- **In-session work fits the product better.** Agents now edit notes
  directly, and consolidate when the user asks, where the user can see and
  steer it.
