---
id: 01M3250V00RSSKVMQ4APJKGTYK
type: design
title: "Alternatives considered (Skills and onboarding)"
aliases: ["15 §6"]
source: "docs/design/15-skills-and-onboarding.md#6-alternatives-considered"
---
# Alternatives considered (Skills and onboarding)

| Option | Why not |
|---|---|
| One skill covering everything | Broad triggers misfire, and the long setup text would load during everyday work. |
| Setup only through a terminal wizard | Users already talk to an agent; the wizard remains for those who do not. |
| Running maintenance inside every session automatically | Costs tokens and attention in sessions meant for other work; maintenance runs when the user asks. |
| Scheduled maintenance (routine templates, a headless consolidation backend) | Built, then removed before 0.1: see [[proposal-scheduled-maintenance\|the proposal]]. Only `brain commit` runs on a schedule (D35). |
