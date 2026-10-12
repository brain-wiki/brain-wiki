---
id: 01M3250V005BW84YTRS7CTQQD2
type: design
title: "Skill bodies (outlines)"
aliases: ["15 §5"]
tags: [skills-onboarding-and-routines]
source: "docs/design/15-skills-onboarding-and-routines.md#5-skill-bodies-outlines"
---
# Skill bodies (outlines)

**`brain`**

1. What the brain is (shared memory, plain files) and the rules: never add
   rules unless the user explicitly asks; edit notes only with a `brain
   check` afterwards, and never rules, episodes, or `log.md`.
2. Start with `brain_list`, then `brain_orient` for the brain that fits.
3. Explore step by step: search or browse (an empty query with filters),
   read the outline, follow relations with `brain_neighbors`, or read files
   directly when `brain_list` gives a path. A query recipe table maps
   questions to calls (why → intent `why`; latest X → `type` and
   `sort: recent`; what changed → `since`; who → the people topic; what
   depends on X → `brain_neighbors`; exact strings across many notes →
   grep). How to read results: warnings for superseded or conflicting notes
   come first; prefer current notes; say so when relying on an unverified
   claim.
4. When to record and what makes a good episode (decisions with reasons,
   facts, negative findings, open questions; not chatter), with one example.
5. Editing a note directly: when it fits (a correction or update to an
   existing note, not new knowledge), supersede claims instead of deleting
   them, then `brain_check` and fix what it reports.
6. Proposing a rule: only on an explicit request, with the user's exact
   words; expect a confirmation prompt.
7. If brain-wiki says it is not configured: hand over to `brain-setup`,
   which also offers `brain connect` to add the static instruction block
   ([[08-32-the-static-instruction-block|08 §3.2]]).

**`brain-maintain`**

1. Harvest: the recipe ([[05-22-harvesting-sessions|05 §2.2]]),
   and the self-read fallback for hosts without a session reader.
2. Consolidate: prepare, reason with the instruction contract, apply;
   handling `invalid`, `stale`, and `review` results; when to consult an
   origin.
3. Review proposals with the user: show, accept, or reject.
4. Health: `brain lint`, `brain report`, what each report means, which fixes
   are safe.
5. Undo: find the run, explain what it will restore, undo on confirmation.

## Relations
- part_of [[skills-onboarding-and-routines]]
