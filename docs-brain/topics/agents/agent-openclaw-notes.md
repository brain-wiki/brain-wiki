---
id: 01M3250V00RK4BMHNW1D0PZPY6
type: design
title: "Notes (OpenClaw)"
tags: [agents]
source: "docs/design/agents/openclaw.md#notes"
bw-part_of:
  - "[[agent-openclaw]]"
---
# Notes (OpenClaw)

- The workspace is resolved as OpenClaw does: `OPENCLAW_WORKSPACE_DIR`, then
  the `OPENCLAW_PROFILE` workspace, then `agents.defaults.workspace` in
  `openclaw.json`, then `<state dir>/workspace` (default
  `~/.openclaw/workspace`). OpenClaw injects at most 20,000 characters per
  bootstrap file; `brain connect` warns when the file nears that.
- MCP tools are registered as `brain-wiki__brain_search` (server prefix and
  64-character cap respected).
- The workspace `AGENTS.md` has the same weakness as Codex's single global
  file ([[agent-codex-1-instructions-come-from-the-mcp-server|Codex]]). Whether
  OpenClaw passes MCP server instructions to the model is not verified, so
  the block stays until it is.
- A native memory-provider plugin (taking OpenClaw's memory slot) is future
  work; it needs the OpenClaw SDK to build and test.
