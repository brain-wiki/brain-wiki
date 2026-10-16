---
id: 01M3250V009KXDWVH7SWTWJ6FP
type: threat
title: "T14: Supply chain"
aliases: ["threat T14"]
source: "docs/design/security-and-privacy.md#3-threats-and-mitigations"
---
# T14: Supply chain

Supply chain. A compromised dependency, including one bundled into the visualizer.

**Mitigations:** Few runtime dependencies, with version bounds. The visualizer is built from a lockfile that resolves only from the public npm registry, and CI rebuilds the committed bundle and fails on any difference. Releases are built in CI and published with PyPI trusted publishing ([[engineering-9-release|engineering §9]]).

**Residual risk:** Standard open-source supply-chain risk.
