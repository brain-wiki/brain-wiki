---
id: 01M3250V00ZG08AZGC7RFCZMVV
type: design
title: "Data (Eval bench)"
aliases: ["Eval bench §4"]
source: "docs/design/eval-bench.md#4-data"
---
# Data (Eval bench)

- The generator (`brainwiki/bench/_generate.py`) is seeded, and the same seed writes byte-identical files. Notes are about invented software projects, in common English words plus generated pseudo-words drawn with a Zipf distribution, so FTS ranks them like real prose.
- Each note has a summary, a `## Facts` list, and a `## Related` list of prose links. Body links mostly stay inside the note's own topic, and every topic has a hub.
- Supersession chains of two to four notes make up about 3% of links, written as `bw-superseded_by` on the older notes.
- Pending episodes, one per 50 notes and at least 5, record `inputs` as `local` or `unknown`.
- The generator records the ground truth, including the chains and the queries. Queries come in three families: a token planted in one note (`exact`), a note's title (`title`), and a token planted three, two, and one times in three notes, for graded relevance (`group`).
- The `lint` suite starts from a separate hand-written format-3 brain about a fictional project.
