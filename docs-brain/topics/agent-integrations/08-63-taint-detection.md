---
id: 01M3250V006JB1XVHWQ1SVXYHK
type: design
title: "Taint detection"
aliases: ["08 §6.3"]
tags: [agent-integrations]
source: "docs/design/08-agent-integrations.md#63-taint-detection"
---
# Taint detection

A session is tainted from the first time an untrusted tool runs. Default
untrusted tools per host are web fetch and search tools, browser tools,
MCP tools from servers not in `trusted_mcp_servers`, and shell commands
that fetch from the network (`curl`, `wget`, URLs in arguments). The
`tool_used` hook records it immediately; raw capture also scans the
transcript. Episodes from tainted sessions get `taint: true`; sessions
whose tool use cannot be observed get `unknown`.

## Relations
- part_of [[08-6-capture-and-harvest]]
