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

Choose which agents may use which brain in the user config
(`~/.config/brain-wiki/config.toml`):

```toml
[hosts.claude-code]
brain  = "work"                 # default brain for this agent
brains = ["work", "personal"]   # brains it may use (default: all)

[hosts.openclaw]
brains = ["personal"]           # never sees the work brain
```

A project can name its brain with a `.brain-wiki.toml` file containing
`brain = "work"`; it names a brain, not a path.

To keep notes from an agent, put them in a brain that agent may not use.

## 2. What each agent may do (profiles)

Profiles live in the brain's `brain.toml`, one table per agent app, plus a
`default` table for any app without its own:

```toml
[agents.default]
write       = ["episodes"]

[agents.claude-code]
write       = ["episodes", "propose_rules", "consolidate", "harvest", "review"]
read_origin = false
```

| Setting | Meaning | Default |
|---|---|---|
| `write` | What it may do: `episodes` (record), `propose_rules` (suggest rules, always confirmed by the user), `consolidate` (fold episodes into notes), `harvest` (summarize its own past sessions), `review` (handle proposals). | `["episodes"]` |
| `read_origin` | May reread the original conversation behind an episode. Conversations hold far more than the episode kept, so this is off unless needed. | `false` |

- Routines need matching `write` entries: `brain-maintenance` needs
  `harvest` and `consolidate`; `brain-harvest` needs `harvest`;
  `brain-health` needs nothing.

Profiles prevent accidents and limit what a confused or misled agent can
change. They are not a lock against other programs running as the user,
which can read and write the files anyway.

## What harvest sends

Harvest reads an agent app's saved sessions on this machine, drops tool
output, removes secrets, and sends the condensed text to a model for
summarizing: the agent you are talking to (its provider sees it) or the
command-line model configured for headless runs. `brain harvest --raw`
sends nothing and leaves summarizing to consolidation.
