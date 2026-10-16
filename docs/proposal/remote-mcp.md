# Remote MCP for chat apps

Status: designed, not scheduled · Waits on [privacy](privacy.md) · Extends
[agent integrations](../design/agent-integrations.md) and [CLI and MCP §3](../design/cli-and-mcp.md#3-mcp-server)

ChatGPT (web and mobile), claude.ai, and the Gemini app connect only to
remote MCP servers over HTTPS. Today brain-wiki serves MCP over stdio only
(D15).

## 1. Requirements gathered from the hosts

| Need | Detail |
|---|---|
| Transport | Streamable HTTP |
| Reachability | Public HTTPS (claude.ai connects from the vendor's cloud) |
| Authorization | OAuth 2.1 with PKCE (S256 required by ChatGPT); protected resource metadata; issuer identification in responses; client registration through **both** client ID metadata documents (preferred by ChatGPT and Claude) and dynamic client registration (what the Gemini app and Antigravity document); audience-bound tokens |
| Tool shape | Read tools plus `brain_log_episode`; `search` and `fetch` aliases for hosts that expect those names; annotations everywhere |
| Gemini app limits | Personal accounts only, US, 18+, Keep Activity on; write actions require confirmation |

## 2. Deployment options

| Option | How | Trade-off |
|---|---|---|
| A · Local server behind a tunnel | `brain mcp --http` on the user's machine, exposed through a tunnel service; auth delegated to an external identity provider | Brain stays local; machine must be on; tunnel and IdP setup |
| B · Server mode on a container platform | Stateless server reading the brain from object storage ([remote sync §4](remote-sync.md#4-server-mode-reading-object-storage)), behind an identity provider | Always available; the brain is replicated to the cloud |
| C · Embedded authorization server | brain-wiki implements OAuth itself | Largest security surface; avoided |

## 3. Profiles

Per-client tokens map to agent profiles (`chatgpt-web`, `claude-web`,
`gemini-app`), read-only by default. A remote client reads the whole brain
it is given, so this waits on the privacy redesign.
