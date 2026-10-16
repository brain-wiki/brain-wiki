# D20: Harvest from the hosts' session stores

Status: accepted.
Argued in: [write path §2.2, §4.6](../design/write-path.md#22-harvesting-sessions), [agent integrations §6](../design/agent-integrations.md#6-harvest).

Hosts keep their own session transcripts, and harvest turns finished sessions into episodes. It catches what agents did not log, and with `--since` it backfills sessions from before brain-wiki was set up. Harvest reads the hosts the user turned it on for (`brain harvest enable`) or names with `--from`. It routes each session to a brain by its project folder and remembers, per session, which turns it has already harvested.

brain-wiki reads, filters, routes, and scrubs the sessions and sets provenance. Summarizing them takes a model, which runs in one of three ways:

- In the host agent, through `brain_harvest_prepare`, `brain_harvest_apply`, and the `harvest` prompt.
- From the CLI, `brain harvest --apply` with a headless preset (`--distill`, default `claude-code`).
- Without a model, `brain harvest --apply --raw` writes the turns as they are.

Session readers exist for Claude Code, Codex, and Antigravity. On other hosts the agent reads its own session and logs episodes with `brain_log_episode`, which records `inputs: unknown`.

During consolidation, a profile with `read_origin` can open the conversation an episode came from (`brain origin`, `brain_read_origin`). An episode must make sense without it.

## Alternatives considered

- Hooks as the only capture path. Several hosts have no such hooks.
- Agents reading raw transcripts themselves on every host. Provenance would then come from the model.
- Copying transcripts into the brain.
