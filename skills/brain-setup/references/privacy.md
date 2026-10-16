# Privacy: brains and what each agent may do

brain-wiki sends nothing anywhere by itself. Notes leave the machine only
when an agent reads them: search results go to that agent's model provider
as part of the conversation, like any file the agent opens.

Every agent that may use a brain reads all of it. Two settings keep things
apart: which brains an agent may use, and what it may write. Privacy levels
inside a brain are being redesigned and are not available yet.

## 1. Separate brains

Use separate brains for separate parts of life, such as work and personal.
Each brain is its own folder, and nothing links across them.

```bash
brain init ~/brains/work --name work --git
brain brains default personal
```

Choose which agents may use which brain:

```bash
brain brains limit openclaw personal     # openclaw never sees the work brain
brain brains --as openclaw               # what it may use now
brain brains unlimit openclaw            # every brain again
brain connect claude-code --brain work   # default brain for this agent
```

The limits are stored in the user config (`~/.config/brain-wiki/config.toml`)
as `[hosts.<app>] brains`.

A project can name its brain with a `.brain-wiki.toml` file containing
`brain = "work"`; it names a brain, not a path.

To keep notes from an agent, put them in a brain that agent may not use.

## 2. What each agent may do (profiles)

Profiles live in the brain's `brain.toml`, one table per agent app, plus a
`default` table for any app without its own. Change them with commands, which
show the diff with `--dry-run` and record each change as a run that
`brain undo` reverses:

```bash
brain agents                                        # what each app may do
brain agents grant claude-code propose_rules harvest
brain agents revoke claude-code propose_rules
```

The result in `brain.toml`:

```toml
[agents.default]
write       = ["episodes", "edit"]

[agents.claude-code]
write       = ["episodes", "edit", "propose_rules", "harvest"]
read_origin = false
```

| Setting | Meaning | Default |
|---|---|---|
| `write` | What it may do: `episodes` (record in the inbox), `edit` (create and edit notes directly, then `brain validate` them; also `brain mv`, `brain lint --fix`, and archiving consolidated episodes), `propose_rules` (suggest rules, always confirmed by the user), `harvest` (summarize its own past sessions). Older names (`consolidate`, `review`) are ignored. | `["episodes", "edit"]` |
| `read_origin` | May reread the original conversation behind an episode. Conversations hold far more than the episode kept, so this is off unless needed. | `false` |

Profiles prevent accidents and limit what a confused or misled agent can
change. They are not a lock: `edit` decides what orientation tells an agent,
and an agent with file access, or any program running as the user, can
still write the files. Git history (with a commit job) is how the user sees
and reverts what agents wrote.

## What harvest sends

Harvest reads an agent app's saved sessions on this machine, drops tool
output, removes secrets, and sends the condensed text to a model for
summarizing: the agent you are talking to (its provider sees it) or the
command-line model configured for headless runs. `brain harvest --raw`
sends nothing and leaves summarizing for when the inbox is consolidated.
