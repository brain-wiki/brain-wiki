---
id: 01M3250V00NNVZ6TVDRVSARXA5
type: design
title: "Consolidation"
aliases: ["Write path §4"]
source: "docs/design/write-path.md#4-consolidation"
---
# Consolidation

Consolidation is an optional helper for folding the inbox into notes. It
writes no notes itself. The agent edits them directly (§2.3), and the
helper gathers the work and archives what was handled.

Each agent consolidates its own episodes: the agent that captured an
episode can reopen the conversation it came from, through its host's
session reader on the machine where the session ran, and another agent
sees only the episode text. Partitioning the inbox by owner also keeps two
agents consolidating at the same time off each other's episodes without
locks.

## Subsections
- [[write-path-41-flow]]: Flow
- [[write-path-42-triggers]]: Triggers
- [[write-path-43-selecting-and-packaging-work]]: Selecting and packaging work
- [[write-path-44-archiving-handled-episodes]]: Archiving handled episodes
- [[write-path-45-guidance]]: Guidance
- [[write-path-46-origin-context]]: Origin context
- [[write-path-47-who-the-inbox-is-waiting-on]]: Who the inbox is waiting on
- [[write-path-48-scheduled-consolidation]]: Scheduled consolidation
