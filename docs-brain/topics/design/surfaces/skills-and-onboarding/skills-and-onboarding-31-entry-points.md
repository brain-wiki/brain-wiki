---
id: 01M3250V00VH8DX4DZW1T7G1NW
type: design
title: "Entry points"
aliases: ["Skills and onboarding §3.1"]
source: "docs/design/skills-and-onboarding.md#31-entry-points"
---
# Entry points

Every way into setup leads to the same flow:

| Entry | What happens |
|---|---|
| Plugin installed, no brain yet | MCP tools fail with `not_configured`, and `brain_list` shows no brains; both say to use the `brain-setup` skill or `brain setup --guide` |
| The user asks the agent | `brain-setup` triggers |
| An agent with no plugin, or only the MCP server | The agent runs `brain setup --guide` (or `uvx --from brain-wiki brain setup --guide`) and follows it |
| A terminal, no agent | `brain setup` runs the flow as a wizard (§3.5) |
| Setup again later | Setup reads the current state and offers only what is missing |

`brain setup --guide` prints the `brain-setup` skill, without its
frontmatter and with reference links made absolute, under a short header.
The header tells the agent to walk the user through the steps and to use
the `brain` command until brain-wiki's tools load, which happens in a new
session after step 4 connects the agent's own app.
