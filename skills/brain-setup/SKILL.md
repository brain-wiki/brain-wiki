---
name: brain-setup
description: Set up, connect, or reconfigure brain-wiki. Install the CLI, create a brain or adopt an existing Obsidian or Markdown vault, connect other agents (Claude Code, Codex, Antigravity, OpenClaw, Cursor), choose which agents see which brain and what each may do, turn on harvest, and schedule commits for a git brain. Use when the user asks to install, set up, onboard, connect, or import brain-wiki, or when brain-wiki says it is not configured.
---
# Set up brain-wiki

Guide the user to a working brain connected to their agents, in one
conversation. Setup can be re-run at any time: it reads the
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
- **Change settings with `brain` commands** (`brain init`, `brain schedule`,
  `brain connect`, `brain brains`, `brain agents`, `brain harvest`), not by editing
  `brain.toml` or the user config, so every change can be shown first and
  undone.

## Steps

```
1 Check ─► 2 Install ─► 3 Brain (+ commit job) ─► 4 Connect ─► 5 Permissions ─► 6 Harvest ─► 7 Verify ─► 8 Summary
```

### 1. Check

Run `brain doctor --json`. If the command is not found, go to step 2.

Read from the result:

- `brains`: existing brains, which is the default, pending episodes,
  `git`, and `format` (below 3: notes from brain-wiki 0.1; offer
  `brain lint --fix --dry-run`, and convert with `brain lint --fix` after a
  yes);
- `hosts`: agent apps found on this machine, which are `connected`, and
  whether `harvest` is on;
- `problems` and `next_steps`: what is missing, with the fixing command.

If everything is set up, show a short summary and offer only the
`next_steps`.

### 2. Install

Ask: "Install the brain-wiki command?" Then run `uv tool install brain-wiki`
(or `pipx install brain-wiki` if the user prefers pipx). Check with
`brain --version`.

If the user does not want to install it, every command also runs as
`uvx --from brain-wiki brain …`, which is how the plugin's own MCP server
runs.

### 3. Brain

**No brain yet.** Explain the choices in a few lines, suggest defaults, and
let the user decide:

- **Where it lives.** A brain is an ordinary folder of Markdown the user
  owns. Suggest `~/brains/personal`. Keep it outside code repositories, so
  project history and team members never see it.
- **Name.** Short, used to pick the brain: `personal`.
- **Git.** Recommend it strongly: agents edit notes directly, and git is
  the only way to see or revert those edits. To use the brain on another
  machine, push it to a private remote. Do not put a git brain in a folder a
  sync tool (iCloud, Dropbox, Syncthing) copies between machines: two
  machines committing into one `.git` can corrupt it. Without git,
  `brain undo` reverses only brain-wiki's own changes.
- **Template.** A template starts the brain with topic folders, each with a
  `_Rules.md` saying how to fill it, so agents file knowledge in the same
  places from the first session. Run `brain templates` and describe each in
  a line; suggest the one that fits what the user told you about their work
  (`personal` or `engineering`), or none for an empty brain.

Then run `brain init PATH --name NAME`, adding `--template NAME` and
`--git` if they chose them. With git it makes a first commit, so a clone is
a working brain. With a template, tell the user the `_Rules.md` files are
theirs to edit: they are how agents learn the structure the user wants.

**The user already has a vault** (Obsidian or a folder of Markdown):

1. Run `brain import PATH --overlay --dry-run`.
2. Summarize the report: how many notes, what brain-wiki would add (ids,
   a `brain.toml`, an inbox), and anything it could not read.
3. After a yes, run `brain import PATH --overlay --apply`. This adds files
   and never moves, renames, or deletes the user's notes.
4. Mention that later import steps (ids and status, topic pages) exist and
   can be done later; do not apply them now.

**Commit job** (only when the brain uses git). Explain: agents' direct
edits reach git history through `brain commit`, and a job can run it every
15 minutes (a crontab entry on Linux, a LaunchAgent on macOS).

1. Ask whether to schedule it, and whether the job should also push to the
   brain's remote (default no: pushing publishes the brain).
2. Run `brain schedule add commit --dry-run` (with `--push` if they chose
   it), show the job, and after a yes run it without `--dry-run`.

If they decline (or on Windows), mention running `brain commit` by hand.

### 4. Connect

1. From `doctor`, list the agent apps that are installed and not connected.
   If brain-wiki's tools already work in the app you are running in, skip
   it; connecting it again would add a second copy. If they do not (you
   started from `brain setup`), include it, and tell the user its tools and
   skills load in a new session.
2. Ask which ones to connect.
3. For each: run `brain connect HOST --dry-run`, show the change, and after
   a yes run `brain connect HOST`.
4. Report what `connect` found when it checked the agent app, and where the
   instructions went (Codex reads them from brain-wiki's server, so no file
   changes; for Cursor, show the block to paste into Settings → Rules). Tell
   the user to start a new session in that app to pick it up.

Per-app notes (permissions, what to expect): [references/hosts.md](references/hosts.md).

### 5. Permissions

Two settings decide what each agent app can reach and change. Explain them
briefly, then ask.

**Which brains.**

> One brain is fine to start with. Every agent you connect can read all of
> it. For separate parts of life, like work and personal, use separate
> brains, and choose which agents may use each.

To limit an app: `brain brains limit APP BRAIN...` (`brain brains --as APP`
shows the result).

**What each agent may do.** By default every agent may log what it learns
and edit notes directly (in a git brain, every edit lands in history). One
more ability is off until the user turns it on, per agent app:

| Ability | What it allows |
|---|---|
| `propose_rules` | Suggest a standing rule when the user asks for one; the user confirms every rule |

Ask which apps should have it. For each yes, run
`brain agents grant APP propose_rules --dry-run`, show the diff, and after a
yes run it again without `--dry-run`. To keep an app from editing notes,
`brain agents revoke APP edit`. `brain agents` shows what each app may do.

Details and the exact settings: [references/privacy.md](references/privacy.md).
Show every config change as a diff before writing it.

### 6. Harvest

Explain it before asking anything: brain-wiki reads the agent app's saved
session history on this machine and removes tool output and secrets, and
that agent files what each session holds into notes, citing the session.
The condensed text goes to that agent's model provider. Harvest works for
Claude Code, Codex, and Antigravity.

For harvest, first run `brain harvest --from HOST --since 30d` (it writes
nothing) and show how many past sessions it found and the estimated tokens.

Each session goes to the brain of the folder it ran in: a project with a
`.brain-wiki.toml` (`brain = "NAME"`), or a folder pattern routed with
`brain harvest route PATTERN BRAIN`. Sessions that match neither are skipped,
never sent to a default brain. Routes are a fallback: a project's own file
still wins. With a single brain, offer a route that sends every session under
the home folder to it:
`brain harvest route "~/**" personal`.

Then ask, per agent app: harvest on or off, and backfill past sessions now,
later, or never.

- Harvest on: `brain harvest enable APP`, and so the app can harvest its
  own sessions in a conversation, `brain agents grant APP harvest`
  (`--dry-run` first).
- Backfill now: if this session is that app, run the harvest recipe in the
  `brain-maintain` skill; otherwise tell the user to ask that app to
  "harvest my sessions". A large backfill takes several rounds.

### 7. Verify

1. Log a test episode with `brain_log_episode`: summary
   "Setup check: brain-wiki works from HOST."
2. Search for "setup check" with `brain_search` and confirm it comes back.
3. Show the orientation (`brain_orient`).
4. Leave the test episode in the inbox; consolidation skips it as holding
   nothing durable.

If the MCP tools are not available yet (new install), check with
`brain search` and `brain orient`, and log the test episode in the next
session, once the tools load.

### 8. Summary

List what was set up, where it lives, and how to undo each part:

| Part | Undo |
|---|---|
| Brain created | `brain brains remove NAME` (keeps the files) |
| Vault adopted (overlay import) | `brain brains remove NAME`, then delete the files it added (`brain.toml`, `AGENTS.md`, `rules.md`, `log.md`, `inbox/`, `archive/`, `reports/`); with git, revert its commit. Later phases are runs: `brain undo RUN` |
| Agent permissions | `brain undo RUN`, or `brain agents revoke APP CAPABILITY` |
| Agent app connected | `brain connect HOST --uninstall` (restores the previous config) |
| Harvest | `brain harvest disable APP` |
| Commit job | `brain schedule remove commit` |
