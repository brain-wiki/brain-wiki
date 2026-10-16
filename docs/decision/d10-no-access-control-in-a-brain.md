# D10: No access control inside a brain

Status: accepted.
Argued in: [config and storage](../design/config-and-storage.md), [security](../design/security-and-privacy.md), [privacy proposal](../proposal/privacy.md).

Every host that may use a brain reads all of it. The boundary is between brains: keep sensitive notes in a separate brain, and limit a host to some brains with `brain brains limit`. Profiles control only what a host may write. Privacy inside a brain is being redesigned around who receives the content.

## Alternatives considered

- Ordered privacy levels per note and topic, a maximum level per host, and topic allowlists. This shipped and was removed, because a level did not say what it protects against or from whom.
- Unordered label sets.
- Classifying notes with embeddings.
