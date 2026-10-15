---
id: 01M3250V002R2BJG0QDZ167YSN
type: guide
title: "Set up from your agent (recommended)"
tags: [user-guide]
source: "docs/user/getting-started.md#set-up-from-your-agent-recommended"
bw-part_of:
  - "[[user-getting-started]]"
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
| Where the brain lives | An ordinary folder of Markdown you own, such as `~/brains/personal`. Keep it outside code repositories; a synced folder works. Or adopt an existing Obsidian vault in place ([[user-import\|Import]]). |
| Git | Recommended. Every change becomes a commit you can see and revert, and you can push the brain to a private remote to use it on another machine. Without git, `brain undo` still works on this machine. |
| Other agents | Which agent apps on this machine to connect ([[user-agents\|Agents]]). |
| What agents may do | Log what they learn and correct notes: on by default. Consolidate the inbox and propose rules: off until you turn them on for an app. |
| Harvest | Whether to turn past sessions into episodes, and which brain each project's sessions go to. |
