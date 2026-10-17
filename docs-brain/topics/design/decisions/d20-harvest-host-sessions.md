---
id: 01M3250V002HWRYPP0C52NRJ6Q
type: decision
title: "D20: Harvest from the hosts' session stores"
aliases: ["D20"]
source: "docs/decision/d20-harvest-host-sessions.md"
---
# D20: Harvest from the hosts' session stores

Status: accepted.
Argued in: [[write-path-22-harvesting-sessions|write path §2.2, §4.6]], [[agent-integrations-6-harvest|agent integrations §6]].

Hosts keep their own session transcripts, and harvest reads finished sessions from them. It catches what agents did not log, and with `since` it backfills sessions from before brain-wiki was set up. Harvest reads the hosts the user turned it on for (`brain harvest enable`). It routes each session to a brain by its project folder and remembers, per session, which turns it has already harvested.

brain-wiki reads, filters, routes, and scrubs the sessions and sets provenance. The host agent turns them into notes through `brain_harvest_prepare`, `brain_harvest_done`, and the `harvest` prompt ([[d36-harvest-into-notes|D36]]; harvest wrote episodes before that).

Session readers exist for Claude Code, Codex, and Antigravity. On other hosts the agent reads its own session and files it, citing a session URL brain-wiki cannot check.

During consolidation, a profile with `read_origin` can open the conversation an episode or session URL came from (`brain origin`, `brain_read_origin`). An episode must make sense without it.

### Alternatives considered

- Hooks as the only capture path. Several hosts have no such hooks.
- Agents reading raw transcripts themselves on every host. Provenance would then come from the model.
- Copying transcripts into the brain.

## Related
- [[d36-harvest-into-notes]]: D36: Harvest and import file into notes, not episodes
