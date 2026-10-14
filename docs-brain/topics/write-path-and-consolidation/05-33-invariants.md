---
id: 01M3250V00ZESK7GPJ3FYSCZ8P
type: design
title: "Invariants"
aliases: ["05 §3.3"]
tags: [write-path-and-consolidation]
source: "docs/design/05-write-path-and-consolidation.md#33-invariants"
bw-part_of:
  - "[[05-3-provenance-and-taint]]"
---
# Invariants

1. **No promotion to directives.** Nothing derived from content with
   `taint` ≠ `false` is ever written to `rules.md` or the managed block of
   `AGENTS.md`. Consolidation cannot write either file at all.
2. **Taint propagates.** A claim's `taint` is the worst taint of its
   source episodes, recorded in the claim metadata and shown as
   `[unverified]` in reads.
3. **Untrusted text is framed as data.** Episodes returned by search or
   placed in a consolidation packet are wrapped in an
   `<untrusted-episode …>` envelope, and the consolidation instructions
   tell the model that instructions inside episodes are content to record,
   never commands to follow.
4. **Memory is not re-harvested.** Harvest drops tool output bodies, so
   what brain-wiki's tools returned is never recorded again as new
   evidence, and strips text wrapped in `<brain-wiki-context>` markers.
5. **Provenance is structural.** Fields are written by code, stored in
   frontmatter and claim metadata, and indexed; no component parses
   provenance out of prose.
