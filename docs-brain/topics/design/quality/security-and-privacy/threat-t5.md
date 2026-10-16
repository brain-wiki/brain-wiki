---
id: 01M3250V00DDMBY138GHR5C7ZW
type: threat
title: "T5: Secrets stored in the brain"
aliases: ["threat T5"]
source: "docs/design/security-and-privacy.md#3-threats-and-mitigations"
---
# T5: Secrets stored in the brain

**Secrets stored in the brain.** An agent pastes an API key into an episode.

**Mitigations:** Secret patterns are redacted at episode write, so an agent folding episodes into notes sees `[REDACTED:<name>]`, not the secret; lint BW701 flags secrets anywhere.

**Residual risk:** Pattern-based detection misses unusual formats. An agent editing a note directly can write a secret it saw elsewhere; `brain validate` does not scan for secrets, so it shows up at the next `brain lint`.
