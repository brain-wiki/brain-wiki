---
id: 01M3250V00MPPFMT8ME589H2ZD
type: design
title: "Future: remote MCP for chat apps"
aliases: ["08 §9"]
tags: [agent-integrations]
source: "docs/design/08-agent-integrations.md#9-future-remote-mcp-for-chat-apps"
bw-part_of:
  - "[[agent-integrations]]"
---
# Future: remote MCP for chat apps

ChatGPT (web and mobile), claude.ai, and the Gemini app connect only to
remote MCP servers over HTTPS. Not in v0.1; this is the design to build
toward.

**Requirements gathered from the hosts:**

| Need | Detail |
|---|---|
| Transport | Streamable HTTP |
| Reachability | Public HTTPS (claude.ai connects from the vendor's cloud) |
| Authorization | OAuth 2.1 with PKCE (S256 required by ChatGPT); protected resource metadata; issuer identification in responses; client registration through **both** client ID metadata documents (preferred by ChatGPT and Claude) and dynamic client registration (what the Gemini app and Antigravity document); audience-bound tokens |
| Tool shape | Read tools plus `brain_log_episode`; `search` and `fetch` aliases for hosts that expect those names; annotations everywhere |
| Gemini app limits | Personal accounts only, US, 18+, Keep Activity on; write actions require confirmation |

**Deployment options:**

| Option | How | Trade-off |
|---|---|---|
| A · Local server behind a tunnel | `brain mcp --http` on the user's machine, exposed through a tunnel service; auth delegated to an external identity provider | Brain stays local; machine must be on; tunnel and IdP setup |
| B · Server mode on a container platform | Stateless server reading the brain from object storage ([[03-67-future-server-mode-reading-object-storage\|03 §6.7]]), behind an identity provider | Always available; the brain is replicated to the cloud |
| C · Embedded authorization server | brain-wiki implements OAuth itself | Largest security surface; avoided |

Per-client tokens map to agent profiles (`chatgpt-web`, `claude-web`,
`gemini-app`), read-only by default. A remote client reads the whole brain
it is given, so this waits on the privacy redesign ([[privacy|16]]).
