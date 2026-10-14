---
id: 01M3250V00QNFFF4KJ3CC1DAV2
type: design
title: "Orientation (the briefing)"
aliases: ["04 §8"]
tags: [index-and-retrieval]
source: "docs/design/04-index-and-retrieval.md#8-orientation-the-briefing"
bw-part_of:
  - "[[index-and-retrieval]]"
---
# Orientation (the briefing)

`orient()` returns one brain's briefing. Agents fetch it with
`brain_orient` when a task may depend on the user's knowledge (the static
instruction block tells them to, [[08-32-the-static-instruction-block|08 §3.2]]).
It is assembled in
priority order and cut to `budgets.orient_max_tokens` (default 1,500,
estimated as characters / 4, so about 6,000 characters), with rules always
included in full:

1. Header: brain name, date, note count, the span of `updated` dates, and
   pending episodes.
2. `rules.md`, all of it (budgeted separately, so it always fits).
3. **What's in this brain:** note counts by type (largest first), the
   largest topics, the topics that hold people or meetings when notes of
   those types exist, and open issues (active conflicts, unverified claims).
4. Topic table: the top-level topics, each with slug, title, one-line
   description, note count (sub-topics included; a hub is the topic's index
   and is not counted, here or in any other note count), last update, number of
   active conflicts, and its sub-topics (count, and the most recently active
   few by slug). Most recently active first; truncated with a pointer to
   browsing (`brain_search("", topic=[…], facets=true)`, whose topic facet
   lists the sub-topics).
5. Recent changes: the last 5 `log.md` entries, one line each, and the number
   of notes updated in the last 7 days.
6. Inbox status: pending episode count, oldest pending age, rule proposals
   awaiting `brain rule accept`, and a hint to consolidate when 20 or more
   episodes are pending or the oldest is more than 7 days old.
7. How to query: three example calls built from this brain's own topics and
   types (a keyword search, a typed "latest" lookup, and a `why` search).

The same function generates the managed block of `AGENTS.md`.
