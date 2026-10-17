---
id: 01M3250V00JQXRV0FVANQMQKG5
type: decision
title: "D22: Three skills and a guided setup"
aliases: ["D22"]
source: "docs/decision/d22-three-skills.md"
---
# D22: Three skills and a guided setup

Status: accepted.
Argued in: [[skills-and-onboarding|skills and onboarding]].

The plugin ships three skills: `brain` (use a brain), `brain-setup` (a guided setup that can resume where it stopped), and `brain-maintain` (harvest, consolidation, rule proposals, health checks, and commits). Maintenance runs when the user asks for it. The only scheduled job is `brain commit` (D35).

### Alternatives considered

- One broad skill.
- A wizard that runs only in a terminal.
- Scheduled maintenance. It was built and removed before 0.1; scheduled consolidation returned per host ([[d37-per-agent-consolidation|D37]]).

## Related
- [[d35-git-history]]: D35: Git is the history of direct edits
- [[d37-per-agent-consolidation]]: D37: Each agent consolidates its own episodes, in a session or on a schedule
