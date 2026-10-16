---
id: 01M3250V00RC8RPBEDARS8A578
type: design
title: "Lifecycle"
aliases: ["07 §3.7"]
tags: [interfaces]
source: "docs/design/07-interfaces.md#37-lifecycle"
---
# Lifecycle

- One process per host connection (stdio). On start it resolves the brain
  for its host, opens the index, and runs a freshness scan. Each request
  scans again if more than a second has passed ([[04-4-freshness|04 §4]]).
- Brain selection can change per call (`brain` argument), within the
  host's limits; indexes are opened lazily and cached per brain.
- The server exits on stdin EOF, as the transport requires.
