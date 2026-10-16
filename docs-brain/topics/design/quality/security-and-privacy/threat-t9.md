---
id: 01M3250V00XJNGHRQNJ82XY04R
type: threat
title: "T9: Local server exposure"
aliases: ["threat T9"]
source: "docs/design/security-and-privacy.md#3-threats-and-mitigations"
---
# T9: Local server exposure

**Local server exposure.** `brain viz` reachable from the network.

**Mitigations:** Binds to 127.0.0.1 on a random port unless `--host` names another address; a random token in the URL is required on every request; read-only; binding beyond loopback prints a warning.

**Residual risk:** Other local users on a shared machine could guess nothing without the token. With `--host`, the traffic is plain HTTP: anyone on the network path can read the token and then the brain ([[visualizer-8-safety|visualizer §8]]).
