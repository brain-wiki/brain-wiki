---
id: 01M3250V00ENPER35D6Q60JREE
type: threat
title: "T14: Supply chain"
aliases: ["threat T14"]
tags: [security-and-privacy]
source: "docs/design/10-security-and-privacy.md#3-threats-and-mitigations"
---
# T14: Supply chain

**Supply chain.** A compromised dependency, including one bundled into the visualizer.

**Mitigations:** Few runtime dependencies, pinned in the lockfile; the visualizer's JavaScript built from a lockfile that resolves from the public npm registry only, with CI rebuilding the committed bundle and failing on any difference; releases built in CI with provenance.

**Residual risk:** Standard open-source supply-chain risk.

## Relations
- part_of [[10-3-threats-and-mitigations]]
