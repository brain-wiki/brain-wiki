---
id: 01M3250V00C60X3G0YT34RCXW5
type: design
title: "Detecting external inputs"
aliases: ["08 §6.3"]
tags: [agent-integrations]
source: "docs/design/08-agent-integrations.md#63-detecting-external-inputs"
---
# Detecting external inputs

A session has external inputs from the first time an untrusted tool runs. Default
untrusted tools per host are web fetch and search tools, browser tools,
MCP tools from servers other than brain-wiki, and shell commands that fetch
from the network (`curl`, `wget`, URLs in arguments). Harvest scans the
transcript: episodes from such sessions get `bw-inputs: external`, others
`local`. Episodes written over MCP get `unknown`, because the server cannot
see the rest of the session.
