---
id: 01M3250V000TJDADXXFAH5JRXS
type: threat
title: "T9: Local server exposure"
aliases: ["threat T9"]
tags: [security-and-privacy]
source: "docs/design/10-security-and-privacy.md#3-threats-and-mitigations"
---
# T9: Local server exposure

**Local server exposure.** `brain viz` reachable from the network.

**Mitigations:** Binds to 127.0.0.1 on a random port unless `--host` names another address; a random token in the URL is required on every request; read-only; binding beyond loopback prints a warning.

**Residual risk:** Other local users on a shared machine could guess nothing without the token. With `--host`, the traffic is plain HTTP: anyone on the network path can read the token and then the brain ([[12-8-safety|12 §8]]).
