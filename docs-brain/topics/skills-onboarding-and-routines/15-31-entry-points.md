---
id: 01M3250V005SWSGHHG7R4BXGG8
type: design
title: "Entry points"
aliases: ["15 §3.1"]
tags: [skills-onboarding-and-routines]
source: "docs/design/15-skills-onboarding-and-routines.md#31-entry-points"
bw-part_of:
  - "[[15-3-onboarding]]"
---
# Entry points

A user can arrive at setup from several places, and every one leads to the
same flow:

| Entry | What happens |
|---|---|
| Plugin installed from a marketplace, no brain yet | The session-start hook injects one line: "brain-wiki is installed but not set up; ask me to set it up." (Shown for the first three sessions only, then silent.) MCP tools return `not_configured` with the same hint. |
| User asks the agent | `brain-setup` triggers. |
| Terminal, no agent | `brain setup` runs the same flow as an interactive wizard. |
| Re-running later | Setup is idempotent: it reads the current state and offers only what is missing or worth changing. |
