---
id: 01M3250V000SKX8B25P7B7CDWN
type: design
title: "Checks"
aliases: ["05 §7.1"]
tags: [write-path-and-consolidation]
source: "docs/design/05-write-path-and-consolidation.md#71-checks"
bw-part_of:
  - "[[05-7-validation-and-apply]]"
---
# Checks

| # | Check | On failure |
|---|---|---|
| V1 | Response parses and matches the schema. | Invalid (retry/resubmit). |
| V2 | Every handle exists in the packet; every claim handle belongs to the stated note; `new:` refs are created in the same batch exactly once. | Invalid. |
| V3 | Every source span lies within its episode's lines; the episode is in the packet. | Invalid. |
| V4 | Claim text is one line, contains no `<!--` or `-->`, and is within length limits; titles and slugs are well formed. | Invalid. |
| V5 | Relation verbs are canonical or known aliases; no self-supersession; no supersession cycle; targets resolve. | Invalid. |
| V6 | Topics exist: a note is created in a topic of the packet or one created earlier in the batch, and a sub-topic's parent exists. | Invalid. |
| V7 | Completeness: episodes neither cited nor skipped. | Not an error: they stay pending and the run reports them. |
| V8 | **Supersession ratio**: for a note with ≥ 4 active claims, superseded + retracted in this run ÷ active before > `max_supersede_ratio`. | Run is routed to review. |
| V9 | **Specificity warning**: a superseding claim drops anchors (numbers, dates, versions, URLs, code spans, wikilinks) that appear in the old claim. | Warning in the run record and review file. Not blocking: changing a value is the point of superseding, and the old text is kept. |
| V10 | Any touched topic has `review = "always"`, or sources include `taint` ≠ `false` and `review_tainted = true` (default `false`). | Run is routed to review. |
| V11 | Lint (strict) on every touched file after the in-memory apply; errors already present before the run do not count. | Invalid; nothing is written. |

**Why not a content-loss threshold on whole files?** Because the writer
cannot delete text. Ops only append, strike through, or add metadata. The
remaining risk is erosion of the *active* view (too much superseded at once,
or replacements vaguer than what they replace), which V8 and V9 target.
