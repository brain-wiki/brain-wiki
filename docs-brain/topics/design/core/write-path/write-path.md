---
id: 01M3250V0088Y1M641G16F4DB0
type: hub
title: "Write path"
source: "docs/design/write-path.md"
---
# Write path

Direct edits and `brain validate`, episodes, consolidation, `brain commit` and `brain schedule`, runs and undo, rules

This document covers every way content enters a brain: episodes, harvest,
direct edits, consolidation, commits, rules, and brain-wiki's own runs. The
protected-file list in §2.3 and the run record in §8 are normative.

Generated from `docs/design/write-path.md`.

## Notes
- [[write-path-1-requirements]]: Requirements (Write path)
  - [[w1]]: W1: Writing an episode never blocks or fails an agent's work, and never…
  - [[w2]]: W2: A note is an ordinary Markdown file that agents and people edit…
  - [[w3]]: W3: Untrusted content never becomes a standing directive without the user
  - [[w4]]: W4: Every change can be undone
  - [[w5]]: W5: Every change brain-wiki itself makes is recorded with what it touched,…
  - [[w6]]: W6: Any LLM the user already runs can do the writing, with no API keys
- [[write-path-2-the-write-paths]]: The write paths
  - [[write-path-21-ways-an-episode-is-written]]: Ways an episode is written
  - [[write-path-22-harvesting-sessions]]: Harvesting sessions
  - [[write-path-23-direct-edits]]: Direct edits (Write path)
- [[write-path-3-provenance-and-inputs]]: Provenance and inputs
  - [[write-path-31-fields]]: Fields
  - [[write-path-32-how-inputs-are-determined]]: How inputs are determined
  - [[write-path-33-invariants]]: Invariants
- [[write-path-4-consolidation]]: Consolidation
  - [[write-path-41-flow]]: Flow
  - [[write-path-42-triggers]]: Triggers
  - [[write-path-43-selecting-and-packaging-work]]: Selecting and packaging work
  - [[write-path-44-archiving-handled-episodes]]: Archiving handled episodes
  - [[write-path-45-guidance]]: Guidance
  - [[write-path-46-origin-context]]: Origin context
  - [[write-path-47-who-the-inbox-is-waiting-on]]: Who the inbox is waiting on
  - [[write-path-48-scheduled-consolidation]]: Scheduled consolidation
- [[write-path-5-committing-direct-edits]]: Committing direct edits
  - [[write-path-51-brain-commit]]: `brain commit`
  - [[write-path-52-brain-schedule]]: `brain schedule`
- [[write-path-6-rules]]: Rules (Write path)
- [[write-path-7-runs]]: Runs
  - [[write-path-71-what-is-a-run]]: What is a run
  - [[write-path-72-lint-gate]]: Lint gate
  - [[write-path-73-apply]]: Apply
- [[write-path-8-undo]]: Undo (Write path)
- [[write-path-9-concurrency-and-multiple-devices]]: Concurrency and multiple devices
- [[write-path-10-failure-modes]]: Failure modes (Write path)
- [[write-path-11-alternatives-considered]]: Alternatives considered (Write path)
