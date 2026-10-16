---
id: 01M3250V00KS7QBYYC63VAWKBP
type: design
title: "Invariants"
aliases: ["Write path §3.3"]
source: "docs/design/write-path.md#33-invariants"
---
# Invariants

1. **No promotion to directives.** Nothing derived from content with
   `inputs` ≠ `local` is ever written to `rules.md` or the managed block of
   `AGENTS.md`. Consolidation never writes either file, and both are
   protected from direct edits (§2.3).
2. **Untrusted episodes stay marked.** An episode keeps its `inputs` for
   life. A consolidation packet marks every episode whose `inputs` is not
   `local` with `"untrusted": true`, and orientation asks agents to cite
   sources in `bw-sources`. Once text is in a note, it carries no trust
   flag ([[security-and-privacy|security]], T2).
3. **Untrusted text is framed as data.** Episodes returned by search or
   read are wrapped in an `<untrusted-episode …>` envelope, and the
   consolidation guidance tells the model that instructions inside episodes
   are content to record, never commands to follow.
4. **Memory is not re-harvested.** Harvest drops tool output bodies, so
   what brain-wiki's tools returned is never recorded again as new
   evidence.
5. **Provenance is structural.** Fields are written by code, stored in
   episode frontmatter, and indexed; no component parses provenance out of
   prose.
