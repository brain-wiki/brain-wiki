---
id: 01M3250V00GRF8YH6BY6W0YZ94
type: design
title: "Entry points"
aliases: ["15 §3.1"]
tags: [skills-and-onboarding]
source: "docs/design/15-skills-and-onboarding.md#31-entry-points"
bw-part_of:
  - "[[15-3-onboarding]]"
---
# Entry points

A user can arrive at setup from several places, and every one leads to the
same flow:

| Entry | What happens |
|---|---|
| Plugin installed from a marketplace, no brain yet | MCP tools return `not_configured` with a hint to ask the agent to set brain-wiki up. |
| User asks the agent | `brain-setup` triggers. |
| Terminal, no agent | `brain setup` runs the same flow as an interactive wizard. |
| Re-running later | Setup is idempotent: it reads the current state and offers only what is missing or worth changing. |
