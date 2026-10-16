---
id: 01M3250V00B1BYKEVNJA7Z41DG
type: design
title: "Hooks"
aliases: ["08 §5"]
source: "docs/design/08-agent-integrations.md#5-hooks"
---
# Hooks

None in v0.1. A session-start briefing, capture at stop and compaction,
input tracking from tool hooks, and per-prompt recall were built and removed before
release: the instruction block and `brain_orient` deliver the briefing, and
harvest recovers sessions afterwards
([[proposal-hooks|proposal]]).
