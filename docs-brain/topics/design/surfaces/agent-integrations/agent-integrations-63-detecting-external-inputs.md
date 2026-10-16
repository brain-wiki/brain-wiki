---
id: 01M3250V00DEDGV5E8Y8AWND91
type: design
title: "Detecting external inputs"
aliases: ["Agent integrations §6.3"]
source: "docs/design/agent-integrations.md#63-detecting-external-inputs"
---
# Detecting external inputs

A session has external inputs once it runs an untrusted tool:

- web fetch and search tools, and browser tools;
- MCP tools from servers other than brain-wiki;
- shell commands that mention `curl`, `wget`, `http`, `https`, or a URL.

Harvest scans the transcript. Episodes from such sessions get
`bw-inputs: external`, others `local`. Episodes written over MCP get
`unknown`, because the server cannot see the rest of the session.

| Host | Untrusted tools |
|---|---|
| Claude Code | `WebFetch`, `WebSearch`, `mcp__*` |
| Codex | `web_search`, `web_fetch`, `mcp__*`, `web_search_call` items |
| Antigravity | `search_web`, `read_url_content`, `read_browser_page`, `browser_*`, `mcp_*`, and the matching steps |
