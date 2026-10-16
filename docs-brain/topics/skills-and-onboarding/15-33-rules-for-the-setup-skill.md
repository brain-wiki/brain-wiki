---
id: 01M3250V00Q2K3YPS70JC64198
type: design
title: "Rules for the setup skill"
aliases: ["15 §3.3"]
tags: [skills-and-onboarding]
source: "docs/design/15-skills-and-onboarding.md#33-rules-for-the-setup-skill"
---
# Rules for the setup skill

- **Every step is a subcommand.** `brain setup` is only a convenience for
  terminal users: each change it makes is a `brain` subcommand (`init`,
  `import --overlay`, `connect`, `brains limit`, `agents grant`,
  `harvest enable|route`), calling the same code, so an agent following the
  guide can do all of it. The guide changes settings only through those
  commands, never by editing `brain.toml` or the user config.
- **One decision at a time, batched sensibly.** Ask the few questions a step
  needs together, then act; never a wall of questions up front.
- **Dry run before any write outside the brain** (host configs), and show
  the diff.
- **Nothing that reads sessions or sends content to a model is turned on
  without an explicit yes**, and the explanation comes first.
- **Never move, rename, or delete the user's files.** Import is overlay
  only; later phases are offered, not applied.
- **Resumable.** If the session ends halfway, the next run of setup picks up
  from `doctor`'s view of the state.
- **Plain language.** No internal terms (provenance, profiles, ops) unless the
  user asks; the references hold the details.
