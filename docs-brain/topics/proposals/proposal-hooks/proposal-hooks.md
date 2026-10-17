---
id: 01M3250V007YQ0H9K676ZGX29Z
type: hub
title: "Host hooks: briefing, capture, and recall"
source: "docs/proposal/hooks.md"
---
# Host hooks: briefing, capture, and recall

`brain hook`: briefing at session start, capture at stop and compaction, input tracking, per-prompt recall

Status: built during development and removed before 0.1. Not scheduled;
bring it back only after the checks in §3.

Today agents learn about brain-wiki from the static instruction block and
fetch the briefing with `brain_orient`
([[agent-integrations-32-the-static-instruction-block|agent integrations §3.2]],
[[d25-static-instructions|D25]]). They record what they learn
with `brain_log_episode`, and `brain harvest` turns past sessions into
episodes afterwards
([[write-path-22-harvesting-sessions|write path §2.2]]). This
proposal records what host lifecycle hooks added on top.

Generated from `docs/proposal/hooks.md`.

## Notes
- [[proposal-hooks-1-what-was-built]]: What was built
  - [[proposal-hooks-11-events]]: Events
  - [[proposal-hooks-12-outputs]]: Outputs
  - [[proposal-hooks-13-capture]]: Capture
  - [[proposal-hooks-14-inputs-from-hooks]]: Inputs from hooks
  - [[proposal-hooks-15-rules-for-every-hook]]: Rules for every hook
- [[proposal-hooks-2-why-it-was-removed]]: Why it was removed
- [[proposal-hooks-3-before-bringing-it-back]]: Before bringing it back
