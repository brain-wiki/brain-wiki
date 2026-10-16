---
id: 01M3250V00GRF8YH6BY6W0YZ94
type: design
title: "Entry points"
aliases: ["15 §3.1"]
source: "docs/design/15-skills-and-onboarding.md#31-entry-points"
---
# Entry points

A user can arrive at setup from several places, and every one leads to the
same flow:

| Entry | What happens |
|---|---|
| Plugin installed from a marketplace, no brain yet | MCP tools return `not_configured` (and `brain_list` an empty list) with a hint for the agent: use the `brain-setup` skill, or run `brain setup --guide`. |
| User asks the agent | `brain-setup` triggers. |
| An agent without the plugin, or only the MCP server (e.g. added by hand) | The user asks it to install brain-wiki and run `brain setup --guide`; the hint names `uvx --from brain-wiki brain setup --guide` for when the command is not installed. The command prints the `brain-setup` skill (frontmatter removed, reference links as absolute paths) under a short header telling the agent to walk the user through it, and to use the `brain` command until the tools load after it connects itself. |
| Terminal, no agent | `brain setup` runs the same flow as an interactive wizard, minus the install step, and ends with next steps. Without a terminal it refuses and names `brain setup --guide`, so an agent that runs it learns the next command. |
| Re-running later | Setup is idempotent: it reads the current state and offers only what is missing or worth changing. |
