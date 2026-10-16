---
id: 01M3250V002J43W25GP87MP72E
type: proposal
title: "Requirements gathered from the hosts"
aliases: ["Remote MCP for chat apps §1"]
source: "docs/proposal/remote-mcp.md#1-requirements-gathered-from-the-hosts"
---
# Requirements gathered from the hosts

- Transport: Streamable HTTP.
- Reachability: public HTTPS, because claude.ai connects from the vendor's
  cloud.
- Authorization: OAuth 2.1 with PKCE. ChatGPT requires S256.
- The server publishes protected resource metadata, identifies the issuer
  in responses, and issues tokens bound to its audience.
- Client registration needs both client ID metadata documents, which
  ChatGPT and Claude prefer, and dynamic client registration, which the
  Gemini app and Antigravity document.
- Tools: the read tools plus `brain_log_episode`, with `search` and `fetch`
  aliases for hosts that expect those names, and annotations on every tool.
- The Gemini app works only for personal accounts in the US, for users 18
  or older, with Keep Activity on. Write actions need confirmation there.
