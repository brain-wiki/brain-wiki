---
id: 01M3250V005GYGTACKBN43ZW5A
type: proposal
title: "Decisions"
tags: [proposals]
source: "docs/proposals/notes-as-content.md#2-decisions"
---
# Decisions

| # | Decision | Replaces |
|---|---|---|
| N1 | Frontmatter holds metadata only. | D3: claims and relations as frontmatter lists |
| N2 | Facts and connections are content: Markdown in the body, notes connected by wikilinks. brain-wiki does not extract meaning from content (no claims, no relation types); it indexes content only as Markdown: words for search, headings, and where links point. | Claims (02 §6.3), relations (02 §6.4), guard co-retrieval for `conflicts_with` (02 §7) |
| N3 | Agents edit notes directly. Consolidation is an optional helper, not the way knowledge enters a brain. | Ops as the curated write path (05 §2, §5, §7); checked edits (05 §2.3) |
| N4 | `brain validate [PATH…]` checks frontmatter, and orientation carries the schema an agent needs to write a valid note. | `brain check` |
| N5 | The inbox is optional capture for things the user has not organized yet; `brain consolidate` helps an agent fold it into notes. | Inbox as the mandatory first step |
| N6 | Note lifecycle is metadata: `status` plus an optional `bw-superseded_by`. | `bw-supersedes` / `bw-superseded_by` relations |
| N7 | Provenance is an optional note-level `bw-sources` list. | Claim `src`, `origin`, `inputs`, `[unverified]` |
| N8 | Git is the history for direct edits: `brain commit` snapshots them, and `brain schedule` runs it from crontab or a LaunchAgent. `brain undo` covers brain-wiki's own runs. | Run records for checked edits, `brain restore` |
| N9 | Ships as 0.2.0 with the pending 0.1.x fixes folded in. | — |
