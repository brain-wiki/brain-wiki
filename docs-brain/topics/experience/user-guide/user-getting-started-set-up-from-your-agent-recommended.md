---
id: 01M3250V002R2BJG0QDZ167YSN
type: guide
title: "Set up from your agent (recommended)"
source: "docs/user/getting-started.md#set-up-from-your-agent-recommended"
---
# Set up from your agent (recommended)

Install the command, then paste one sentence into your agent:

```sh
uv tool install brain-wiki     # or: pipx install brain-wiki
```

> Set up brain-wiki by running `brain setup --guide` and following it.

`brain setup --guide` prints setup steps for the agent. The agent walks you
through the choices below, explains each one, and shows every change before
it makes it. Connecting an agent app gives it brain-wiki's tools, plus its
skills where the app takes plugins. They load in a new session. See
[[user-agents|Agents]] for each app.

You can rerun setup at any time. It offers only what is missing. If the
plugin is already installed from your agent's marketplace, ask the agent:
*Set up brain-wiki.*

| Choice | What to know |
|---|---|
| Where the brain lives | Any folder you own, such as `~/brains/personal`, outside code repositories |
| Git | Strongly recommended |
| Commit job | With git: runs `brain commit` every 15 minutes |
| Other agents | Which agent apps on this machine to connect |
| What agents may do | Log and edit by default; rules and harvest when you allow them |
| Harvest | Whether your agents may file their past sessions into notes, and into which brain |

- You can also adopt an existing Obsidian vault in place. See
  [[user-import|Import]].
- Agents edit notes directly, and git is how you see and revert those edits.
  Without git, `brain undo` still reverses brain-wiki's own changes on this
  machine, but not direct edits.
- To use the brain on another machine, push it to a private git remote. Do
  not sync a git brain with a sync tool. See
  [[user-maintenance-share-a-brain-between-machines|Maintenance]].
- The commit job does not push unless you say so. Setup asks only when the
  brain has a git remote.
