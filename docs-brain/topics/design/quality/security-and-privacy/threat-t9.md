---
id: 01M3250V00XJNGHRQNJ82XY04R
type: threat
title: "T9: brain viz reachable from the network"
aliases: ["threat T9"]
source: "docs/design/security-and-privacy.md#3-threats-and-mitigations"
---
# T9: brain viz reachable from the network

`brain viz` reachable from the network.

**Mitigations:** Binds to 127.0.0.1 unless `--host` names another address, on a free port unless `--port` is given. Every request needs a random token, given in the URL once and then kept in a cookie. The server is read-only, stops after 30 minutes idle, and prints a warning when it listens beyond loopback.

**Residual risk:** Other local users cannot guess the token. With `--host`, traffic is plain HTTP, so anyone on the network path can read the token and then the brain ([[visualizer-8-safety|visualizer §8]]).
