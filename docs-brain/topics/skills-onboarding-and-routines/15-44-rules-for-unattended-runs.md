---
id: 01M3250V000VW26RB45GZMZ71N
type: design
title: "Rules for unattended runs"
aliases: ["15 §4.4"]
tags: [skills-onboarding-and-routines]
source: "docs/design/15-skills-onboarding-and-routines.md#44-rules-for-unattended-runs"
bw-part_of:
  - "[[15-4-routines]]"
---
# Rules for unattended runs

- **Pre-approve only brain-wiki tools.** Templates list the tools a run
  needs (`allow_tools`). The skill asks the user to click "run now" once
  and always-allow those tools, so later runs do not stall on a prompt.
  Routines never call `brain_propose_rule`: it requires user interaction by
  design and would stall every run.
- **Idempotent.** Desktop schedulers run a single catch-up after missed
  runs; harvest watermarks, dedupe keys, and consolidation's pending set
  make repeats harmless.
- **One consolidation device.** Templates check
  `[consolidate] device` through orientation and stop elsewhere.
- **Quiet when idle.** "nothing to do" is the whole reply when there is no
  work, so scheduled-run notifications stay meaningful.
- **No new permissions.** A routine can do nothing the host's profile does
  not already allow; `needs` is checked when the routine is created.
