---
id: 01M3250V00FR6A27XC2XGQRVD7
type: design
title: "Integration ladder"
aliases: ["08 §1"]
tags: [agent-integrations]
source: "docs/design/08-agent-integrations.md#1-integration-ladder"
bw-part_of:
  - "[[agent-integrations]]"
---
# Integration ladder

Every host gets the highest tier it supports. Lower tiers keep working
when higher ones are missing.

| Tier | Mechanism | What the agent gains |
|---|---|---|
| 0 · Files | The brain's own `AGENTS.md` ([[02-11-agentsmd\|02 §11]]) | Any file-reading agent opened in the brain folder can read and log episodes. |
| 1 · Skills | `skills/brain`, `skills/brain-setup`, `skills/brain-maintain` in the plugin | Knows when and how to use, set up, and maintain the brain, through the CLI or MCP ([[skills-and-onboarding\|15]]). |
| 2 · MCP | `brain mcp --host <id>` (stdio) | Orient, search with guards, read, log, propose rules, consolidate. |
| 3 · Hooks | `brain hook <host> <event>` | Orientation injected at session start; optional capture at stop or compaction; recall per prompt where the user wires it by hand (§5.2). |
| 4 · Native memory | Host-specific memory APIs | Not built ([[proposal-readme-backlog\|backlog]]). |

v0.1 coverage:

| Host | Install | Skill | MCP | Hooks | Harvest |
|---|---|---|---|---|---|
| Claude Code | Plugin marketplace (this repo) or `brain connect claude-code` | yes | yes | session start, stop, pre-compact, session end; prompt recall by hand only | yes |
| Codex CLI and Codex in the ChatGPT desktop app | Plugin marketplace or `brain connect codex` | yes | yes | same event names as Claude Code (desktop: manual installs only) | yes |
| Antigravity (desktop, IDE, CLI) | `agy plugin install <repo URL>`, global plugin folder, or `brain connect antigravity` | yes | yes | first model call (as session start), post-tool (taint), stop | yes |
| OpenClaw | `openclaw plugins install brain-wiki --marketplace <repo>` (bundle mode) | yes | yes | none (bundle mode does not execute Claude-format hooks; a hook pack is in the [[proposal-readme-backlog\|backlog]]) | after v0.1 |
| Cursor | Loads the repo's Agent Plugins bundle (`plugin.json` + `mcp.json`), or `brain connect cursor` | yes | yes | not in v0.1 (Cursor has its own hook events; planned) | after v0.1 |
| Other MCP clients | `brain connect generic --print` gives a config snippet | — | yes | — | — |
