---
id: 01M3250V00DP5612DRH8XZ2VJP
type: design
title: "How agents reach brain-wiki"
aliases: ["Agent integrations §1"]
source: "docs/design/agent-integrations.md#1-how-agents-reach-brain-wiki"
---
# How agents reach brain-wiki

A host uses every mechanism it supports. Each one works without the others.

| Mechanism | What the agent gets |
|---|---|
| Files: the brain's own `AGENTS.md` ([[brain-format-11-agentsmd\|brain format §11]]) | Any agent that reads files, opened in the brain folder, can read notes and log episodes |
| Skills: `brain`, `brain-setup`, `brain-maintain` in the plugin | When and how to use, set up, and maintain the brain ([[skills-and-onboarding\|skills and onboarding]]) |
| MCP: `brain mcp --host <id>` over stdio | The tools of [[cli-and-mcp-34-tools\|CLI and MCP §3.4]] |
| Host lifecycle hooks | None (§5) |
| Host memory APIs | None ([[ideas\|ideas]]) |

Which hosts get what is in §4.
