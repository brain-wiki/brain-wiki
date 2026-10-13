---
id: 01M3250V00H21TCQH6P1DEVFNS
type: design
title: "Rules for the setup skill"
aliases: ["15 §3.3"]
tags: [skills-onboarding-and-routines]
source: "docs/design/15-skills-onboarding-and-routines.md#33-rules-for-the-setup-skill"
bw-part_of:
  - "[[15-3-onboarding]]"
---
# Rules for the setup skill

- **One decision at a time, batched sensibly.** Ask the few questions a step
  needs together, then act; never a wall of questions up front.
- **Dry run before any write outside the brain** (host configs, schedulers,
  crontab), and show the diff.
- **Nothing that reads sessions or sends content to a model is turned on
  without an explicit yes**, and the explanation comes first.
- **Never move, rename, or delete the user's files.** Import is overlay
  only; later phases are offered, not applied.
- **Resumable.** If the session ends halfway, the next run of setup picks up
  from `doctor`'s view of the state.
- **Plain language.** No internal terms (taint, profiles, ops) unless the
  user asks; the references hold the details.
