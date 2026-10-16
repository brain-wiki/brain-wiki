---
id: 01M3250V00DDMBY138GHR5C7ZW
type: threat
title: "T5: Secrets stored in the brain"
aliases: ["threat T5"]
source: "docs/design/security-and-privacy.md#3-threats-and-mitigations"
---
# T5: Secrets stored in the brain

Secrets stored in the brain. An agent pastes an API key into an episode.

**Mitigations:** Episodes are scrubbed before they are written, so an agent folding them into notes sees `[REDACTED:<kind>]`. Lint BW701 flags secrets in any file (§6).

**Residual risk:** Pattern matching misses unusual formats. An agent editing a note directly can write a secret it saw elsewhere. `brain validate` does not scan for secrets, so the next `brain lint` reports it.
