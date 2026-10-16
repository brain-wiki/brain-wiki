---
id: 01M3250V001DV42P52DN75ZJRF
type: hub
title: "Write path and consolidation"
source: "docs/design/05-write-path-and-consolidation.md"
---
# Write path and consolidation

Direct edits and `brain validate`, episodes and provenance, the consolidation helper, `brain commit` and `brain schedule`, runs and undo, rules

Generated from `docs/design/05-write-path-and-consolidation.md`.

## Notes
- [[05-1-requirements]]: Requirements (Write path and consolidation)
- [[05-2-the-write-paths]]: The write paths
  - [[05-21-ways-an-episode-is-written]]: Ways an episode is written
  - [[05-22-harvesting-sessions]]: Harvesting sessions
  - [[05-23-direct-edits]]: Direct edits (Write path and consolidation)
- [[05-3-provenance-and-inputs]]: Provenance and inputs
  - [[05-31-fields]]: Fields
  - [[05-32-how-inputs-are-determined]]: How inputs are determined
  - [[05-33-invariants]]: Invariants
- [[05-4-consolidation]]: Consolidation
  - [[05-41-flow]]: Flow
  - [[05-42-triggers]]: Triggers
  - [[05-43-selecting-and-packaging-work]]: Selecting and packaging work
  - [[05-44-archiving-handled-episodes]]: Archiving handled episodes
  - [[05-45-guidance]]: Guidance
  - [[05-46-origin-context]]: Origin context
- [[05-5-committing-direct-edits]]: Committing direct edits
  - [[05-51-brain-commit]]: `brain commit`
  - [[05-52-brain-schedule]]: `brain schedule`
- [[05-6-rules]]: Rules (Write path and consolidation)
- [[05-7-runs]]: Runs
  - [[05-71-what-is-a-run]]: What is a run
  - [[05-72-lint-gate]]: Lint gate
  - [[05-73-apply]]: Apply
- [[05-8-undo]]: Undo (Write path and consolidation)
- [[05-9-concurrency-and-multiple-devices]]: Concurrency and multiple devices
- [[05-10-failure-modes]]: Failure modes (Write path and consolidation)
- [[05-11-alternatives-considered]]: Alternatives considered (Write path and consolidation)
