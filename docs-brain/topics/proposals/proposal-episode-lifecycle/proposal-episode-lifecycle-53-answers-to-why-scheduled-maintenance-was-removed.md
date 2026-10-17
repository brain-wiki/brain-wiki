---
id: 01M3250V00NE2H029Z3ZKS96KN
type: proposal
title: "Answers to why scheduled maintenance was removed"
aliases: ["Episodes: quick capture, per-agent consolidation §5.3"]
source: "docs/proposal/episode-lifecycle.md#53-answers-to-why-scheduled-maintenance-was-removed"
---
# Answers to why scheduled maintenance was removed

| Reason it was removed | This design |
|---|---|
| It failed silently, refused every night by a profile without the needed capability | `schedule add` refuses unless the host's profile has `edit` and a dry run succeeds. A failed run shows in orientation and `brain doctor` |
| Device names were brittle | No device name. Scope is "this host's episodes, those readable here first" (§3.1) |
| Desktop schedulers could not be configured from outside | The OS scheduler runs the job (crontab or a LaunchAgent, as commit jobs do), so no desktop app is involved |
| Work in a session fits better | In-session consolidation (§5.1) stays the default. Scheduling is opt-in per host |
