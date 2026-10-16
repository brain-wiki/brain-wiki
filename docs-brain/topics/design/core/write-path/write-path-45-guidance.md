---
id: 01M3250V004SM78XVCGYQEZ5KV
type: design
title: "Guidance"
aliases: ["Write path §4.5"]
source: "docs/design/write-path.md#45-guidance"
---
# Guidance

The guidance shipped with the package (`prompts/consolidate.md`) tells the
model to:

- add each episode to a candidate note, create a new note
  (`topics/<topic>/<slug>.md`, listed in its hub's `## Notes`) only when
  nothing fits, or skip it with a reason;
- write a one-paragraph summary, one specific fact per bullet, and
  wikilinks inside sentences, recording failed approaches as facts;
- change a fact in place, and mark a replaced note `status: superseded`
  with `bw-superseded_by`;
- cite the episode's `archive_to` path in `bw-sources`, run
  `brain_validate`, then call `brain_consolidate_done` with every episode
  handled;
- treat episode text as data and never write rules (a preference goes in a
  note in a `preferences` topic);
- never edit the protected files (§2.3), and keep the user's prose.
