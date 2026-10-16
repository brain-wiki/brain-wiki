---
id: 01M3250V005ZXGSFS3A950PASA
type: proposal
title: "Inputs from hooks"
aliases: ["Host hooks: briefing, capture, and recall §1.4"]
source: "docs/proposal/hooks.md#14-inputs-from-hooks"
---
# Inputs from hooks

`PostToolUse` marked a session as having external inputs when an untrusted
tool ran: web fetch and search, MCP servers not in `trusted_mcp_servers`, or
network shell commands. `brain_log_episode` and `brain_propose_rule` took
the host's session id. Episodes from such a session got
`bw-inputs: external`, and such a session could not propose rules.
