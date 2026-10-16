---
id: 01M3250V009KXDWVH7SWTWJ6FP
type: threat
title: "T14: Supply chain"
aliases: ["threat T14"]
source: "docs/design/security-and-privacy.md#3-threats-and-mitigations"
---
# T14: Supply chain

**Supply chain.** A compromised dependency, including one bundled into the visualizer.

**Mitigations:** Few runtime dependencies, with version bounds; the visualizer's JavaScript built from a lockfile that resolves from the public npm registry only, with CI rebuilding the committed bundle and failing on any difference; releases built in CI with provenance.

**Residual risk:** Standard open-source supply-chain risk.
