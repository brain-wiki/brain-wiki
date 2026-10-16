# Remote MCP for chat apps

Status: designed, not scheduled. Waits on the [privacy](privacy.md)
proposal. Extends [agent integrations](../design/agent-integrations.md) and
[CLI and MCP §3](../design/cli-and-mcp.md#3-mcp-server).

ChatGPT (web and mobile), claude.ai, and the Gemini app connect only to
remote MCP servers over HTTPS. brain-wiki serves MCP over stdio only
([D15](../decision/d15-remote-mcp-later.md)).

## 1. Requirements gathered from the hosts

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

## 2. Deployment options

| Option | How | Trade-off |
|---|---|---|
| A. Local server behind a tunnel | `brain mcp --http` on the user's machine, behind a tunnel service and an external identity provider | The brain stays local, but the machine must be on, and the tunnel and identity provider need setup |
| B. Server mode on a container platform | A stateless server reading the brain from object storage ([remote sync §4](remote-sync.md#4-server-mode-reading-object-storage)), behind an identity provider | Always available, but the brain is copied to the cloud |
| C. Embedded authorization server | brain-wiki implements OAuth itself | The largest security surface; avoided |

## 3. Profiles

Each client token maps to an agent profile (`chatgpt-web`, `claude-web`,
`gemini-app`), read-only by default. A remote client reads the whole brain
it is given, so this waits on the privacy redesign.
