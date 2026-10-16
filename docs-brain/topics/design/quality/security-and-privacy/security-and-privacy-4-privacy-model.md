---
id: 01M3250V005CHX4WZFR9M48E2D
type: design
title: "Privacy model"
aliases: ["Security and privacy §4"]
source: "docs/design/security-and-privacy.md#4-privacy-model"
---
# Privacy model

| Mechanism | Scope | Enforced by |
|---|---|---|
| Separate brains | Unrelated spheres (employer and personal) | Directory boundary |
| Host brain limits | Which brains a host may select | Brain resolution |

Inside one brain there is no access control. Every host that may use it
reads every note ([[d10-no-access-control-in-a-brain|D10]]).
A [[proposal-privacy|proposal]] drafts finer control.
