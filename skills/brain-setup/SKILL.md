---
name: brain-setup
description: Set up, connect, or reconfigure brain-wiki. Install the CLI, create a brain or adopt an existing Obsidian or Markdown vault, connect other agents (Claude Code, Codex, Antigravity, OpenClaw, Cursor), choose which agents see which brain, and turn on harvest. Use when the user asks to install, set up, onboard, connect, or import brain-wiki, or when brain-wiki says it is not configured.
---
# Set up brain-wiki

Guide the user from "plugin installed" to a working brain connected to their
agents, in one conversation. Setup can be re-run at any time: it reads the
current state and offers only what is missing.

## Rules

- **Ask a few questions per step, then act.** Never a wall of questions up
  front.
- **Dry run before any change outside the brain** (agent configs). Show
  the change, then apply it after a yes.
- **Nothing that reads past sessions or sends content to a model is turned
  on without an explicit yes**, and the explanation comes first.
- **Never move, rename, or delete the user's files.**
- **Plain language.** Say "agent app", "notes", "brain". Details
  live in the references; use them when the user asks.
- **Resumable.** If setup stopped halfway, start again from step 1; `doctor`
  shows what is already done.

## Steps

```
1 Check ─► 2 Install ─► 3 Brain ─► 4 Connect ─► 5 Privacy ─► 6 Harvest ─► 7 Verify ─► 8 Summary
```

### 1. Check

Run `brain doctor --json`. If the command is not found, go to step 2.

Read from the result:

- `brains`: existing brains, which is the default, pending episodes;
- `hosts`: agent apps found on this machine, which are `connected`, and
  whether `harvest` is on;
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
4. Report what `connect` found when it checked the agent app, and where it
   wrote the instruction block. Tell the user to start a new session in that
   app to pick it up.

Per-app notes (permissions, what to expect): [references/hosts.md](references/hosts.md).

### 5. Privacy

Explain in three sentences:

> One brain is fine to start with. Every agent you connect can read all of
> it. For separate parts of life, like work and personal, use separate
> brains, and choose which agents may use each.

Offer: keep the defaults (recommended for most people), set up a second
brain, or limit which brains an agent may use. Details and the exact settings:
[references/privacy.md](references/privacy.md). Show any config change as a
diff before writing it.

### 6. Harvest

Explain it before asking anything: brain-wiki reads the agent app's saved
session history on this machine, removes tool output and secrets, and has a
model summarize each session into an episode. The model is either the agent
you are talking to or one you configure for the command line, so the
condensed text goes to that model's provider. Harvest works for Claude
Code, Codex, and Antigravity.

For harvest, first run `brain harvest --from HOST --since 30d --dry-run`
and show how many past sessions it found and the estimated tokens.

Then ask, per agent app: harvest on or off, and backfill past sessions now,
later, or never.

- Harvest on: add the app under `[harvest] hosts` in the user config and
  `harvest` to that app's `write` list in `brain.toml` (diff first).
- Backfill now: run the harvest recipe in the `brain-maintain` skill in this
  session, or `brain harvest --from HOST --apply` for large backfills.

### 7. Verify

1. Log a test episode with `brain_log_episode`: summary
   "Setup check: brain-wiki works from HOST."
2. Search for "setup check" with `brain_search` and confirm it comes back.
3. Show the orientation (`brain_orient`).
4. Leave the test episode in the inbox: consolidation skips it, since it
   holds nothing durable.

If the MCP tools are not available yet (new install), use `brain log`,
`brain search`, and `brain orient` instead.

### 8. Summary

List what was set up, where it lives, and how to undo each part:

| Part | Undo |
|---|---|
| Brain created or imported | `brain brains remove NAME` (keeps the files); an import is undone with `brain undo RUN` |
| Agent app connected | `brain connect HOST --uninstall` (restores the previous config) |
| Harvest | remove the app from `[harvest] hosts` in the user config |
