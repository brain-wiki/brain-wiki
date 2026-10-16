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
| Separate brains | Unrelated spheres (employer vs personal) | Directory boundary |
| Host brain limits | Which brains a host may select | Config resolution |

Inside one brain there is no access control: every host that may use it
reads every note. Privacy levels and topic allowlists were removed because
a level did not say what it protects against or from whom; a
[[proposal-privacy|proposal]] drafts their replacement.
