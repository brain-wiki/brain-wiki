---
id: 01M3250V00DEDGV5E8Y8AWND91
type: design
title: "Detecting external inputs"
aliases: ["Agent integrations §6.3"]
source: "docs/design/agent-integrations.md#63-detecting-external-inputs"
---
# Detecting external inputs

A session has external inputs from the first time an untrusted tool runs. Default
untrusted tools per host are web fetch and search tools, browser tools,
MCP tools from servers other than brain-wiki, and shell commands that fetch
from the network (`curl`, `wget`, URLs in arguments). Harvest scans the
transcript: episodes from such sessions get `bw-inputs: external`, others
`local`. Episodes written over MCP get `unknown`, because the server cannot
see the rest of the session.
