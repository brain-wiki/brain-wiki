# D22: Three skills and a guided setup

Status: accepted.
Argued in: [skills and onboarding](../design/skills-and-onboarding.md).

The plugin ships three skills: `brain` (use a brain), `brain-setup` (a guided setup that can resume where it stopped), and `brain-maintain` (harvest, consolidation, rule proposals, health checks, and commits). Maintenance runs when the user asks for it. The only scheduled job is `brain commit` (D35).

## Alternatives considered

- One broad skill.
- A wizard that runs only in a terminal.
- Scheduled maintenance. It was built and removed before 0.1; scheduled consolidation returned per host ([D37](d37-per-agent-consolidation.md)).
