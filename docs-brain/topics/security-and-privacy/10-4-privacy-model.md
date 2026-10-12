---
id: 01M3250V00F1ZC3JE3FGGV6Y1Z
type: design
title: "Privacy model"
aliases: ["10 §4"]
tags: [security-and-privacy]
source: "docs/design/10-security-and-privacy.md#4-privacy-model"
---
# Privacy model

| Mechanism | Scope | Enforced by |
|---|---|---|
| Separate brains | Unrelated spheres (employer vs personal) | Directory boundary; user config host limits |
| Privacy levels (ordered) | Sensitivity within one brain | Engine, before ranking; packets; reads |
| Topic allowlists | Narrow a host to some topics | Engine |
| Host brain limits | Which brains a host may select | Config resolution |

Defaults: one level (`default`) is used for everything until the user
declares more. `brain init` explains levels in the generated `brain.toml`
comments, and `brain search --as <host>` shows what a host would see.

## Relations
- part_of [[security-and-privacy]]
