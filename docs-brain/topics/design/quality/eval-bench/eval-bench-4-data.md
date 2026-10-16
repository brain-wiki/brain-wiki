---
id: 01M3250V00ZG08AZGC7RFCZMVV
type: design
title: "Data (Eval bench)"
aliases: ["Eval bench §4"]
source: "docs/design/eval-bench.md#4-data"
---
# Data (Eval bench)

- **Generator** (`brainwiki/bench/_generate.py`): seeded; notes about invented
  software projects, in common English words plus generated pseudo-words
  drawn with a Zipf distribution so FTS ranks them like real prose. It
  writes format-3 notes (a summary, a `## Facts` list, a `## Related` list
  of prose links, mostly within the note's topic), hubs, supersession chains
  as `bw-superseded_by` on the older notes (about 3% of links), and pending
  episodes, and records the ground truth. The same seed writes
  byte-identical files.
- **Queries** come from the generated notes: a planted token (`exact`), a
  title (`title`), and a token shared by a small group with graded
  relevance (`group`).
- **Base brain:** a small hand-written format-3 brain about a fictional
  software project, the starting point for the lint cases.
