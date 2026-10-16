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
| A. Local server behind a tunnel | `brain mcp --http` on the user's machine, behind a tunnel service and an external identity provider | The brain stays local, but the machine must be on, and the tunnel and identity provider need setup |
| B. Server mode on a container platform | A stateless server reading the brain from object storage ([[proposal-remote-sync-4-server-mode-reading-object-storage\|remote sync §4]]), behind an identity provider | Always available, but the brain is copied to the cloud |
| C. Embedded authorization server | brain-wiki implements OAuth itself | The largest security surface; avoided |
