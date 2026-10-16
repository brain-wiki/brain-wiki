---
id: 01M3250V00KS0QGYQGV6741538
type: decision
title: "D10: No access control inside a brain"
aliases: ["D10"]
source: "docs/decision/d10-no-access-control-in-a-brain.md"
---
# D10: No access control inside a brain

Status: accepted.
Argued in: [[config-and-storage|config and storage]], [[security-and-privacy|security]], [[proposal-privacy|privacy proposal]].

No access control inside a brain for now: every host that may use a brain reads all of it. Separate brains and host brain limits are the boundary; privacy inside a brain is being redesigned around who receives content.

### Alternatives considered

Ordered levels per note and topic with a maximum per profile, plus topic allowlists (shipped, then removed: a level did not say what it protects against or from whom); unordered label sets; embedding-based classification
