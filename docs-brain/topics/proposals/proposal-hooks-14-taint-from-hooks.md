---
id: 01M3250V00HCXM46MMR0VY7MX2
type: proposal
title: "Taint from hooks"
tags: [proposals]
source: "docs/proposals/hooks.md#14-taint-from-hooks"
bw-part_of:
  - "[[proposal-hooks-1-what-was-built]]"
---
# Taint from hooks

`PostToolUse` marked a session tainted when an untrusted tool ran (web
fetch and search, MCP servers not in `trusted_mcp_servers`, network shell
commands). `brain_log_episode` and `brain_propose_rule` took the host's
session id: episodes from a tainted session got `bw-taint: true`, and a
tainted session could not propose rules.
