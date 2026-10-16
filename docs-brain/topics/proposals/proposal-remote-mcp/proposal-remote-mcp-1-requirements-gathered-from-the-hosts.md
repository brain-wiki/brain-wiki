---
id: 01M3250V002J43W25GP87MP72E
type: proposal
title: "Requirements gathered from the hosts"
aliases: ["Remote MCP for chat apps §1"]
source: "docs/proposal/remote-mcp.md#1-requirements-gathered-from-the-hosts"
---
# Requirements gathered from the hosts

| Need | Detail |
|---|---|
| Transport | Streamable HTTP |
| Reachability | Public HTTPS (claude.ai connects from the vendor's cloud) |
| Authorization | OAuth 2.1 with PKCE (S256 required by ChatGPT); protected resource metadata; issuer identification in responses; client registration through **both** client ID metadata documents (preferred by ChatGPT and Claude) and dynamic client registration (what the Gemini app and Antigravity document); audience-bound tokens |
| Tool shape | Read tools plus `brain_log_episode`; `search` and `fetch` aliases for hosts that expect those names; annotations everywhere |
| Gemini app limits | Personal accounts only, US, 18+, Keep Activity on; write actions require confirmation |
