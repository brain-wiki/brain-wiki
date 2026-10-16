# D10: No access control inside a brain

Status: accepted.
Argued in: [config and storage](../design/config-and-storage.md), [security](../design/security-and-privacy.md), [privacy proposal](../proposal/privacy.md).

No access control inside a brain for now: every host that may use a brain reads all of it. Separate brains and host brain limits are the boundary; privacy inside a brain is being redesigned around who receives content.

## Alternatives considered

Ordered levels per note and topic with a maximum per profile, plus topic allowlists (shipped, then removed: a level did not say what it protects against or from whom); unordered label sets; embedding-based classification
