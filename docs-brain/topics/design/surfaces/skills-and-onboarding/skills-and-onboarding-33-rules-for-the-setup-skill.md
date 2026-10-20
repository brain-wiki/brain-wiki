---
id: 01M3250V008CQXGEGD0CRXQAF9
type: design
title: "Rules for the setup skill"
aliases: ["Skills and onboarding §3.3"]
source: "docs/design/skills-and-onboarding.md#33-rules-for-the-setup-skill"
---
# Rules for the setup skill

- Every change is a `brain` subcommand: `init`, `import --overlay`,
  `schedule add commit`, `connect`, `brains limit`, `agents grant`,
  `harvest enable|route`. The skill changes settings only through them,
  never by editing `brain.toml` or the user config, so every change can be
  shown first and undone.
- Ask the few questions a step needs together, then act. Never ask a wall
  of questions up front.
- Show a dry run before any change outside the brain, such as an agent
  app's config.
- Turn on nothing that reads sessions or sends content to a model without
  an explicit yes, and explain it first.
- Never move, rename, or delete the user's files. Import is overlay only,
  and later phases are offered, not applied.
- If setup stopped halfway, start again from step 1. `doctor` shows what
  is already done.
- Use plain words ("agent app", "notes", "brain"). The references hold the
  details for users who ask.
