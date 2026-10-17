---
id: 01M3250V0010R6798MB6ND6MSR
type: design
title: "Alternatives considered (Skills and onboarding)"
aliases: ["Skills and onboarding §6"]
source: "docs/design/skills-and-onboarding.md#6-alternatives-considered"
---
# Alternatives considered (Skills and onboarding)

- One skill for everything: broad triggers misfire, and the long setup
  text would load during everyday work.
- Setup only through a terminal wizard: users already talk to an agent.
  The wizard remains for those who do not.
- Maintenance in every session: it costs tokens and attention in sessions
  meant for other work, so maintenance runs when the user asks.
- Scheduled maintenance (routine templates, a headless consolidation
  backend) was built and removed before 0.1. What runs on a schedule now
  is `brain commit` ([[d35-git-history|D35]]) and a host's
  consolidation ([[d37-per-agent-consolidation|D37]]), both
  set up with `brain schedule`.
