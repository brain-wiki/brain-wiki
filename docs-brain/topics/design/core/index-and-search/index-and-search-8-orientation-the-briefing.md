---
id: 01M3250V009MEJ5H66CZWTCRA7
type: design
title: "Orientation (the briefing)"
aliases: ["Index and search §8"]
source: "docs/design/index-and-search.md#8-orientation-the-briefing"
---
# Orientation (the briefing)

`orient()` returns one brain's briefing. Agents fetch it with
`brain_orient` when a task may depend on the user's knowledge, as the
static instruction block tells them to
([[agent-integrations-32-the-static-instruction-block|agent integrations §3.2]]).
It is cut to `budgets.orient_max_tokens` (default 1,500), estimated as
characters divided by 4, so about 6,000 characters.

Sections, in output order:

1. Header: brain name, date, note count, the span of `updated` dates, and
   pending episodes.
2. Rules: the text of every rule in `rules.md`. Its own budget keeps it
   short enough to always fit.
3. What's in this brain: note counts by type (up to 8, largest first), the
   5 largest topics, and up to two topics that hold `person` or `meeting`
   notes when notes of those types exist.
4. Topics: the top-level topics, most recently active first. Each line
   gives the slug, title, description, note count including sub-topics,
   last update, and the number of sub-topics with the 4 most recently
   active. A pointer to `brain_search("", topic=["<slug>"])` replaces the
   topics that do not fit.
5. Recent changes: the last 5 `log.md` entries, newest first, and the
   number of notes updated in the last 7 days.
6. Inbox: pending episode count, the oldest pending age, rule proposals
   awaiting `brain rules accept`, and a hint to consolidate
   (`brain_consolidate_prepare`) when 20 or more episodes are pending or
   the oldest is more than 7 days old.
7. How to query: up to three example calls built from this brain's own
   topics and types (a keyword search, a typed "latest" lookup, and
   `brain_neighbors` on a hub).
8. Writing notes, only when the calling profile has `edit`: where files go
   (`topics/<topic>/<slug>.md`, with the existing top-level topics), the
   frontmatter fields and `status` values
   ([[brain-format-61-frontmatter|brain format §6.1]]), the body
   conventions ([[brain-format-62-body|brain format §6.2]]), and "run
   `brain_validate` on the files you changed".

Note counts never include hubs. A hub is the topic's index and only dates
the topic.

Every section except topics and recent changes is always included. When
the budget is tight, recent changes go first, the topic list takes the
room left, and the whole text is cut at the budget.

The structured result has `brain`, `text`, `rules`, `topics` (every topic
of the tree with its counts and parent), `contents`, `pending_episodes`,
`open_proposals`, and `notes`.

The managed block of `AGENTS.md` is built from the same topic rows
([[brain-format-11-agentsmd|brain format §11]]).
