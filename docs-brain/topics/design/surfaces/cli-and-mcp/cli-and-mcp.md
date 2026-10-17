---
id: 01M3250V00STNK5VQBHDFWFNKH
type: hub
title: "CLI and MCP"
source: "docs/design/cli-and-mcp.md"
---
# CLI and MCP

Commands, MCP tools and their schemas, agent profiles, errors

Three interfaces reach the same engine. The tool schemas in §3.4 are
normative: the server MUST accept these arguments, and MUST reject a
top-level argument the schema does not declare.

Generated from `docs/design/cli-and-mcp.md`.

## Notes
- [[cli-and-mcp-1-agent-profiles]]: Agent profiles (CLI and MCP)
- [[cli-and-mcp-2-cli]]: CLI
  - [[cli-and-mcp-21-command-tree]]: Command tree
  - [[cli-and-mcp-22-conventions]]: Conventions
  - [[cli-and-mcp-23-exit-codes]]: Exit codes (CLI and MCP)
  - [[cli-and-mcp-24-parser-and-startup-cost]]: Parser and startup cost
- [[cli-and-mcp-3-mcp-server]]: MCP server
  - [[cli-and-mcp-31-protocol-target]]: Protocol target
  - [[cli-and-mcp-32-naming-and-size-limits]]: Naming and size limits
  - [[cli-and-mcp-33-server-instructions]]: Server instructions
  - [[cli-and-mcp-34-tools]]: Tools
  - [[cli-and-mcp-35-prompts]]: Prompts
  - [[cli-and-mcp-36-errors]]: Errors
  - [[cli-and-mcp-37-lifecycle]]: Lifecycle (CLI and MCP)
  - [[cli-and-mcp-38-not-built]]: Not built (CLI and MCP)
- [[cli-and-mcp-4-stability-promises]]: Stability promises
