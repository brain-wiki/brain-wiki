# Privacy and safety

## What agents can read

Every agent that may use a brain reads all of it: every topic and note.
Privacy levels inside a brain are being redesigned and are not available
yet. Until then, keep separate parts of your life in separate brains, and
limit which brains each agent may use (below).

Those limits apply to brain-wiki's own tools. An agent that can read files
on your machine can still open a brain's Markdown directly, so notes an agent
must never see belong outside its reach, not only outside its brain list.

## Agent profiles

A profile says what an agent may change. Agents without their own profile
may log episodes and correct notes they check with `brain check`:

```toml
[agents.default]          # any agent without its own profile
write = ["episodes", "edit"]

[agents.claude-code]
write = ["episodes", "edit", "propose_rules", "consolidate", "harvest", "review"]
read_origin = false       # may it read the conversations episodes came from?
```

| Capability | Lets the agent |
|---|---|
| `episodes` | Log what it learned to the inbox |
| `edit` | Correct notes directly, then record the change with `brain check` |
| `propose_rules` | Propose a standing rule; you always confirm it |
| `consolidate` | Fold inbox episodes into notes |
| `harvest` | Turn its own past sessions into episodes |
| `review` | Accept or reject runs that wait for review |

## Several brains

Separate brains are the boundary between parts of your life (work and
personal, for example). Limit which brains an agent may use in the user
config:

```toml
# ~/.config/brain-wiki/config.toml
[hosts.cursor]
brain = "work"
brains = ["work"]
```

## What is protected

| Risk | Protection |
|---|---|
| A web page tells an agent to "remember" an instruction | Rules need your words and your confirmation; consolidation cannot write rules; text from untrusted sources is marked and treated as data |
| A secret pasted into a session | Secret patterns are redacted before an episode is written; lint flags secrets anywhere in the brain |
| A model loses detail by rewriting notes | Models only propose small operations; nothing is deleted; every run can be undone |
| The visualizer reachable from the network | It listens on 127.0.0.1 only, with a random token, read-only |

## What is sent where

brain-wiki itself makes no network calls. Content leaves your machine only
when an agent you use reads it:

| Action | Sent to |
|---|---|
| Search and read from an agent | That agent's model provider |
| Consolidation | The model provider of the agent that consolidates |
| Harvest with distillation | The distill preset's provider, or your in-session agent; `--raw` sends nothing |
