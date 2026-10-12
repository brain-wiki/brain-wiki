---
id: 01M3250V001WGS0MFEJRMZKJAZ
type: threat
title: "T5: Secrets stored in the brain"
aliases: ["threat T5"]
tags: [security-and-privacy]
source: "docs/design/10-security-and-privacy.md#3-threats-and-mitigations"
---
# T5: Secrets stored in the brain

**Secrets stored in the brain.** An agent pastes an API key into an episode.

**Mitigations:** Secret patterns are redacted at episode write; lint BW701 flags secrets anywhere; consolidation never copies redacted spans back.

**Residual risk:** Pattern-based detection misses unusual formats.

## Relations
- part_of [[10-3-threats-and-mitigations]]
