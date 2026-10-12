---
id: 01M3250V00S7Y3QSHKY8AF6HYT
type: design
title: "Alternatives considered (Skills, onboarding, and routines)"
aliases: ["15 §7"]
tags: [skills-onboarding-and-routines]
source: "docs/design/15-skills-onboarding-and-routines.md#7-alternatives-considered"
---
# Alternatives considered (Skills, onboarding, and routines)

| Option | Why not |
|---|---|
| One skill covering everything | Broad triggers misfire, and the long setup text would load during everyday work. |
| Setup only through a terminal wizard | Users already talk to an agent; the wizard remains for those who do not. |
| Shipping scheduler configuration files directly for every host | Most desktop schedulers are configured in their app, not in files brain-wiki may write; where a command or file is supported (OpenClaw, OS schedulers), `brain schedule install` uses it. |
| Cloud schedulers (hosted routines, cloud agents) | No access to a local brain or local session stores in v0.1. |
| Running maintenance inside every session automatically | Costs tokens and attention in sessions meant for other work; scheduled runs are separate and visible. |

## Relations
- part_of [[skills-onboarding-and-routines]]
