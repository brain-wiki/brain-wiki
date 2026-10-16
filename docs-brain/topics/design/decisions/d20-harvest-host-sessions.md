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

Hosts keep their own session transcripts, and harvest turns finished sessions into episodes. It catches what agents did not log, and with `--since` it backfills sessions from before brain-wiki was set up. Harvest reads the hosts the user turned it on for (`brain harvest enable`) or names with `--from`. It routes each session to a brain by its project folder and remembers, per session, which turns it has already harvested.

brain-wiki reads, filters, routes, and scrubs the sessions and sets provenance. Summarizing them takes a model, which runs in one of three ways:

- In the host agent, through `brain_harvest_prepare`, `brain_harvest_apply`, and the `harvest` prompt.
- From the CLI, `brain harvest --apply` with a headless preset (`--distill`, default `claude-code`).
- Without a model, `brain harvest --apply --raw` writes the turns as they are.

Session readers exist for Claude Code, Codex, and Antigravity. On other hosts the agent reads its own session and logs episodes with `brain_log_episode`, which records `inputs: unknown`.

During consolidation, a profile with `read_origin` can open the conversation an episode came from (`brain origin`, `brain_read_origin`). An episode must make sense without it.

### Alternatives considered

- Hooks as the only capture path. Several hosts have no such hooks.
- Agents reading raw transcripts themselves on every host. Provenance would then come from the model.
- Copying transcripts into the brain.
