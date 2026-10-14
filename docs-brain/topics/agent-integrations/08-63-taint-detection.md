---
id: 01M3250V006JB1XVHWQ1SVXYHK
type: design
title: "Taint detection"
aliases: ["08 §6.3"]
tags: [agent-integrations]
source: "docs/design/08-agent-integrations.md#63-taint-detection"
bw-part_of:
  - "[[08-6-harvest]]"
---
# Taint detection

A session is tainted from the first time an untrusted tool runs. Default
untrusted tools per host are web fetch and search tools, browser tools,
MCP tools from servers other than brain-wiki, and shell commands that fetch
from the network (`curl`, `wget`, URLs in arguments). Harvest scans the
transcript: episodes from tainted sessions get `bw-taint: true`, others
`false`. Episodes written over MCP get `unknown`, because the server cannot
see the rest of the session.
