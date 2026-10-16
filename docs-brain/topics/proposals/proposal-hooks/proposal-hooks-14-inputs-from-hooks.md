---
id: 01M3250V008MP9AJ2ERQ0BHJTE
type: proposal
title: "Inputs from hooks"
source: "docs/proposals/hooks.md#14-inputs-from-hooks"
---
# Inputs from hooks

`PostToolUse` marked a session as having external inputs when an untrusted tool ran (web
fetch and search, MCP servers not in `trusted_mcp_servers`, network shell
commands). `brain_log_episode` and `brain_propose_rule` took the host's
session id: episodes from such a session got `bw-inputs: external`, and
such a session could not propose rules.
