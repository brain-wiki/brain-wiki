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

Install the plugin in your agent (the README lists the command for each),
then ask it:

> Set up brain-wiki.

The `brain-setup` skill installs the `brain` command if needed, then walks
you through the choices below, explaining each and showing every change
before it makes it. You can rerun it at any time; it offers only what is
missing.

| Choice | What to know |
|---|---|
| Where the brain lives | An ordinary folder of Markdown you own, such as `~/brains/personal`. Keep it outside code repositories; a synced folder works. Or adopt an existing Obsidian vault in place ([[user-import\|Import]]). |
| Git | Recommended. Every change becomes a commit you can see and revert, and you can push the brain to a private remote to use it on another machine. Without git, `brain undo` still works on this machine. |
| Other agents | Which agent apps on this machine to connect ([[user-agents\|Agents]]). |
| What agents may do | Log what they learn and correct notes: on by default. Consolidate the inbox and propose rules: off until you turn them on for an app. |
| Harvest | Whether to turn past sessions into episodes, and which brain each project's sessions go to. |
