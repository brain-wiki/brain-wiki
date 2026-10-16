---
id: 01M3250V00MYWGX369ZED4P3PY
type: design
title: "Skill bodies (outlines)"
aliases: ["15 §4"]
tags: [skills-and-onboarding]
source: "docs/design/15-skills-and-onboarding.md#4-skill-bodies-outlines"
---
# Skill bodies (outlines)

**`brain`**

1. What the brain is (shared memory, plain files) and the rules: never add
   rules unless the user explicitly asks; edit notes only when the profile
   allows it, with `brain_validate` afterwards; never edit rules, episodes,
   `log.md`, `AGENTS.md`, `brain.toml`, or `reports/`.
2. Start with `brain_list`, then `brain_orient` for the brain that fits.
3. Explore step by step: search or browse (an empty query with filters),
   read the outline, follow links with `brain_neighbors`, or read files
   directly when `brain_list` gives a path. A query recipe table maps
   questions to calls (why → search for the decision, then read it; latest
   X → `type` and `sort: recent`; what changed → `since`; who → the people
   topic; what links to X → `brain_neighbors` with `direction: in`; exact
   strings across many notes → grep). How to read results: supersession
   warnings come first; prefer the current note.
4. Writing knowledge: prefer editing an existing note; otherwise create
   `topics/<topic>/<slug>.md`. Frontmatter holds metadata only (the fields
   orientation lists); the body is a one-paragraph summary, one specific fact
   per bullet, and wikilinks inside sentences. Cite sources in `bw-sources`.
   To replace a note, set `status: superseded` and `bw-superseded_by` on the
   old one. Then `brain_validate` and fix what it reports.
5. Logging an episode, for knowledge that has no place yet: what makes a
   good episode (decisions with reasons, facts, negative findings, open
   questions; not chatter), with one example.
6. Proposing a rule: only on an explicit request, with the user's exact
   words; expect a confirmation prompt.
7. If brain-wiki says it is not configured: hand over to `brain-setup`,
   which also offers `brain connect` to add the static instruction block
   ([[08-32-the-static-instruction-block|08 §3.2]]).

**`brain-maintain`**

1. Harvest: the recipe ([[05-22-harvesting-sessions|05 §2.2]]),
   and the self-read fallback for hosts without a session reader.
2. Consolidate: `brain_consolidate_prepare` (episodes with candidate
   notes), edit notes following its guidance, `brain_validate`, then
   `brain_consolidate_done` for the episodes folded in or skipped; when to
   consult an origin.
3. Review rule proposals with the user: show, accept, or reject.
4. Health: `brain lint` and `brain report`, what each report means, which
   fixes are safe; `brain lint --fix --dry-run` before converting format 1
   or 2 notes.
5. Commit: `brain commit` after a batch of edits in a git brain, and
   `brain schedule add | list | remove commit` for the job.
6. Undo: find the run, explain what it will restore, undo on confirmation.
   Direct edits are not runs; they are reverted through git.
