---
id: 01M3250V002R2BJG0QDZ167YSN
type: guide
title: "Set up from your agent (recommended)"
tags: [user-guide]
source: "docs/user/getting-started.md#set-up-from-your-agent-recommended"
---
# Set up from your agent (recommended)

Install the command, then paste one sentence into your agent:

```sh
uv tool install brain-wiki     # or: pipx install brain-wiki
```

> Set up brain-wiki by running `brain setup --guide` and following it.

`brain setup --guide` prints the setup steps for the agent, which walks you
through the choices below, explaining each and showing every change before
it makes it. Connecting your agent gives it brain-wiki's tools, and its
skills where the app takes plugins; they load in a new session (details per
app in [[user-agents|Agents]]). You can rerun setup at any time; it offers only
what is missing.

If the plugin is already installed from your agent's marketplace
([[user-agents|Agents]]), just ask: *Set up brain-wiki.*

| Choice | What to know |
|---|---|
| Where the brain lives | An ordinary folder of Markdown you own, such as `~/brains/personal`. Keep it outside code repositories. Or adopt an existing Obsidian vault in place ([[user-import\|Import]]). |
| Git | Strongly recommended. Agents edit notes directly, and git is how you see and revert those edits. To use the brain on another machine, push it to a private remote; do not sync a git brain with a sync tool ([[user-maintenance-share-a-brain-between-machines\|Maintenance]]). Without git, `brain undo` still reverses brain-wiki's own changes on this machine, but not direct edits. |
| Commit job | With git: a job that runs `brain commit` every 15 minutes, so agents' edits land in history; whether it also pushes (off by default). |
| Other agents | Which agent apps on this machine to connect ([[user-agents\|Agents]]). |
| What agents may do | Log what they learn and edit notes: on by default. Propose rules and harvest their own sessions: off until you turn them on for an app. |
| Harvest | Whether to turn past sessions into episodes, and which brain each project's sessions go to. |
