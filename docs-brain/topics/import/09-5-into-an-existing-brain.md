---
id: 01M3250V00NYJQ56KMNDQ90CCF
type: design
title: "Into an existing brain"
aliases: ["09 §5"]
tags: [import]
source: "docs/design/09-import.md#5-into-an-existing-brain"
bw-part_of:
  - "[[import]]"
---
# Into an existing brain

1. Map the source's top-level folders (or the whole source, with
   `--topic <slug>`) to topics in the target brain.
2. Copy files to `topics/<slug>/…`, preserving relative structure.
3. Rewrite links between copied files and links to attachments; links to
   notes outside the source become unresolved and are reported.
4. Apply the same normalization phases to the copies (the source stays
   untouched), as one run.
