---
name: brain-setup
description: Set up, connect, or reconfigure brain-wiki. Install the CLI, create a brain or adopt an existing Obsidian or Markdown vault, connect other agents (Claude Code, Codex, Antigravity, OpenClaw, Cursor), choose which agents see which brain, turn on session capture or harvest, and schedule routine maintenance in this agent's own scheduler. Use when the user asks to install, set up, onboard, connect, import, or schedule brain-wiki, or when brain-wiki says it is not configured.
---
# Set up brain-wiki

Guide the user from "plugin installed" to a working brain connected to their
agents, in one conversation. Setup can be re-run at any time: it reads the
current state and offers only what is missing.

## Rules

- **Ask a few questions per step, then act.** Never a wall of questions up
  front.
- **Dry run before any change outside the brain** (agent configs,
  schedulers, crontab). Show the change, then apply it after a yes.
- **Nothing that reads past sessions or sends content to a model is turned
  on without an explicit yes**, and the explanation comes first.
- **Never move, rename, or delete the user's files.**
- **Plain language.** Say "agent app", "notes", "sensitive notes". Details
  live in the references; use them when the user asks.
- **Resumable.** If setup stopped halfway, start again from step 1; `doctor`
  shows what is already done.

## Steps

```
1 Check ─► 2 Install ─► 3 Brain ─► 4 Connect ─► 5 Privacy ─► 6 Capture/harvest ─► 7 Routines ─► 8 Verify ─► 9 Summary
```

### 1. Check

Run `brain doctor --json`. If the command is not found, go to step 2.

Read from the result:

- `brains`: existing brains, which is the default, pending episodes;
- `hosts`: agent apps found on this machine, which are `connected`, and
  their `capture`, `harvest`, and `routines`;
- `problems` and `next_steps`: what is missing, with the fixing command.

If everything is set up, show a short summary and offer only the
`next_steps`.

### 2. Install

Ask: "Install the brain-wiki command?" Then run `uv tool install brain-wiki`
(or `pipx install brain-wiki` if the user prefers pipx). Check with
`brain version`.

If the user does not want to install it, every command also runs as
`uvx --from brain-wiki brain …`, which is how the plugin's own MCP server
runs.

### 3. Brain

**No brain yet.** Propose, in one question:

- location: `~/brains/personal`, outside any code repository;
- name: `personal`;
- git: yes (recommended; every change becomes a commit that can be reverted).

Then run `brain init ~/brains/personal --name personal --git`.

**The user already has a vault** (Obsidian or a folder of Markdown):

1. Run `brain import PATH --overlay --dry-run`.
2. Summarize the report: how many notes, what brain-wiki would add (ids,
   a `brain.toml`, an inbox), and anything it could not read.
3. After a yes, run `brain import PATH --overlay --apply`. This adds files
   and never moves, renames, or deletes the user's notes.
4. Mention that later import steps (typed relations, claims) exist and can
   be done later; do not apply them now.

### 4. Connect

1. From `doctor`, list the agent apps that are installed and not connected.
   Skip the agent you are running in if brain-wiki's tools already work
   here; connecting it again would add a second copy.
2. Ask which ones to connect.
3. For each: run `brain connect HOST --dry-run`, show the change, and after
   a yes run `brain connect HOST`.
4. Report what `connect` found when it checked the agent app. Tell the user
   to start a new session in that app to pick it up.

Per-app notes (permissions, what to expect): [references/hosts.md](references/hosts.md).

### 5. Privacy

Explain in three sentences:

> One brain is fine to start with. If some notes are more sensitive than
> others, brain-wiki can label them and keep them from agents you choose.
> For separate parts of life, like work and personal, use separate brains,
> and choose which agents may use each.

Offer: keep the defaults (recommended for most people), set up a second
brain, or limit an agent. Details and the exact settings:
[references/privacy.md](references/privacy.md). Show any config change as a
diff before writing it.

### 6. Capture and harvest

Explain both before asking anything:

- **Capture**: at the end of a session in a connected agent app, the agent
  is asked once to save what it learned. Nothing is read afterwards.
- **Harvest**: brain-wiki reads the agent app's saved session history on
  this machine, removes tool output and secrets, and has a model summarize
  each session into an episode. The model is either the agent you are
  talking to or one you configure for the command line, so the condensed
  text goes to that model's provider.

For harvest, first run `brain harvest --from HOST --since 30d --dry-run`
and show how many past sessions it found and the estimated tokens.

Then ask, per agent app: capture on or off; harvest on or off; for harvest,
backfill past sessions now, later, or never.

- Capture on: `brain connect HOST --capture --dry-run`, then without
  `--dry-run`.
- Harvest on: add the app under `[harvest] hosts` in the user config and
  `harvest` to that app's `write` list in `brain.toml` (diff first).
- Backfill now: run the harvest recipe in the `brain-maintain` skill in this
  session, or `brain harvest --from HOST --apply` for large backfills.

### 7. Routines

Recommend:

| Routine | Where | When |
|---|---|---|
| `brain-maintenance` | this agent app (the main one) | daily, 21:00 |
| `brain-harvest` | each other connected app with harvest on | daily, 20:30 |
| `brain-health` | this agent app | Mondays, 09:00 |

For each routine the user wants:

1. Run `brain schedule show ROUTINE --for HOST`. It prints the task:
   name, schedule, instructions, folder.
2. Create it in the app's own scheduler if you can; otherwise show the user
   the exact steps. Per-app steps: [references/hosts.md](references/hosts.md).
   Without an agent scheduler, use
   `brain schedule install ROUTINE --via cron --dry-run`, then `--apply`
   (also `launchd` or `systemd`).
3. Ask the user to run it once now and to always allow the brain-wiki
   tools it asks for, so later runs do not stop at a prompt.

The routine texts are in [references/routines/](references/routines/):
[brain-maintenance](references/routines/brain-maintenance.md),
[brain-harvest](references/routines/brain-harvest.md),
[brain-health](references/routines/brain-health.md).

### 8. Verify

1. Log a test episode with `brain_log_episode`: summary
   "Setup check: brain-wiki works from HOST."
2. Search for "setup check" with `brain_search` and confirm it comes back.
3. Show the orientation (`brain_orient`).
4. Remove the test episode: `brain runs list` to find its run, then
   `brain undo RUN`.

If the MCP tools are not available yet (new install), use `brain log`,
`brain search`, and `brain orient` instead.

### 9. Summary

List what was set up, where it lives, and how to undo each part:

| Part | Undo |
|---|---|
| Brain created or imported | `brain brains remove NAME` (keeps the files); an import is undone with `brain undo RUN` |
| Agent app connected | `brain connect HOST --uninstall` (restores the previous config) |
| Routine | `brain schedule remove ROUTINE`; for desktop apps, delete it in the app |
| Capture | run `brain connect HOST` again without `--capture` |
| Harvest | remove the app from `[harvest] hosts` in the user config |
