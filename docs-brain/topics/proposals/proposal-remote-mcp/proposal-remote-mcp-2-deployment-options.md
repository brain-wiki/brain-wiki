---
id: 01M3250V00JDHBWTANTHC0NKS6
type: proposal
title: "Deployment options"
aliases: ["Remote MCP for chat apps §2"]
source: "docs/proposal/remote-mcp.md#2-deployment-options"
---
# Deployment options

| Option | How | Trade-off |
|---|---|---|
| A · Local server behind a tunnel | `brain mcp --http` on the user's machine, exposed through a tunnel service; auth delegated to an external identity provider | Brain stays local; machine must be on; tunnel and IdP setup |
| B · Server mode on a container platform | Stateless server reading the brain from object storage ([[proposal-remote-sync-4-server-mode-reading-object-storage\|remote sync §4]]), behind an identity provider | Always available; the brain is replicated to the cloud |
| C · Embedded authorization server | brain-wiki implements OAuth itself | Largest security surface; avoided |
