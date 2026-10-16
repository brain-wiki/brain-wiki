---
id: 01M3250V00N54DMXNEHE54W1BA
type: design
title: "Hooks"
aliases: ["Agent integrations §5"]
source: "docs/design/agent-integrations.md#5-hooks"
---
# Hooks

brain-wiki installs no host lifecycle hooks. A session-start briefing,
capture at stop and compaction, input tracking from tool hooks, and
per-prompt recall were built and removed before 0.1. The instruction block
and `brain_orient` deliver the briefing, and harvest recovers sessions
afterwards ([[d25-static-instructions|D25]],
[[proposal-hooks|proposal]]).
