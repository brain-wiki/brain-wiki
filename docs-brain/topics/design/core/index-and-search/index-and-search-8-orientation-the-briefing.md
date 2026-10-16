---
id: 01M3250V009MEJ5H66CZWTCRA7
type: design
title: "Orientation (the briefing)"
aliases: ["Index and search §8"]
source: "docs/design/index-and-search.md#8-orientation-the-briefing"
---
# Orientation (the briefing)

`orient()` returns one brain's briefing. Agents fetch it with
`brain_orient` when a task may depend on the user's knowledge (the static
instruction block tells them to, [[agent-integrations-32-the-static-instruction-block|agent integrations §3.2]]).
It is cut to `budgets.orient_max_tokens` (default 1,500, estimated as
characters / 4, so about 6,000 characters). Sections, in output order:

1. Header: brain name, date, note count, the span of `updated` dates, and
   pending episodes.
2. `rules.md`, all of it (budgeted separately, so it always fits).
3. **What's in this brain:** note counts by type (largest first), the
   largest topics, and the topics that hold people or meetings when notes
   of those types exist.
4. Topic table: the top-level topics, each with slug, title, one-line
   description, note count (sub-topics included; a hub is the topic's index
   and is not counted, here or in any other note count), last update, and
   its sub-topics (count, and the most recently active few by slug). Most
   recently active first; truncated with a pointer to browsing
   (`brain_search("", topic=["<slug>"])`).
5. Recent changes: the last 5 `log.md` entries, one line each, and the number
   of notes updated in the last 7 days.
6. Inbox status: pending episode count, oldest pending age, rule proposals
   awaiting `brain rules accept`, and a hint to consolidate
   (`brain_consolidate_prepare`) when 20 or more episodes are pending or the
   oldest is more than 7 days old.
7. How to query: three example calls built from this brain's own topics and
   types (a keyword search, a typed "latest" lookup, and `brain_neighbors`
   on a hub).
8. **Writing notes**, only when the calling profile has `edit`: where files
   go (`topics/<topic>/<slug>.md`, with the existing top-level topics), the
   frontmatter fields and `status` values (brain format §6.1), the body conventions
   (brain format §6.2), and "run `brain_validate` on the files you changed".

Every section except the topic table and recent changes is always
included. Recent changes are dropped first when the budget is tight, the
topic table takes the room that is left, and the text as a whole is cut at
the budget.

The managed block of `AGENTS.md` is built from the same topic rows
(brain format §11).
