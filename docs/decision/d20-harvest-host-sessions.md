# D20: Harvest from the hosts' session stores

Status: accepted.
Argued in: [write path §2.2, §4.6](../design/write-path.md#22-harvesting-sessions), [agent integrations §6](../design/agent-integrations.md#6-harvest).

Hosts keep their own session transcripts, and harvest reads finished sessions from them. It catches what agents did not log, and with `since` it backfills sessions from before brain-wiki was set up. Harvest reads the hosts the user turned it on for (`brain harvest enable`). It routes each session to a brain by its project folder and remembers, per session, which turns it has already harvested.

brain-wiki reads, filters, routes, and scrubs the sessions and sets provenance. The host agent turns them into notes through `brain_harvest_prepare`, `brain_harvest_done`, and the `harvest` prompt ([D36](d36-harvest-into-notes.md); harvest wrote episodes before that).

Session readers exist for Claude Code, Codex, and Antigravity. On other hosts the agent reads its own session and files it, citing a session URL brain-wiki cannot check.

During consolidation, a profile with `read_origin` can open the conversation an episode or session URL came from (`brain origin`, `brain_read_origin`). An episode must make sense without it.

## Alternatives considered

- Hooks as the only capture path. Several hosts have no such hooks.
- Agents reading raw transcripts themselves on every host. Provenance would then come from the model.
- Copying transcripts into the brain.
