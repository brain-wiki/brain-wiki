# Privacy and safety

## What agents can read

Every agent that may use a brain reads all of it: every topic and note.
Privacy levels inside a brain are being redesigned and are not available
yet. Until then, keep notes away from an agent by putting them in a brain
that agent may not use.

## Agent profiles

A profile says what an agent may change:

```toml
[agents.default]          # any agent without its own profile
write = ["episodes"]

[agents.claude-code]
write = ["episodes", "propose_rules", "consolidate", "harvest", "review"]
read_origin = false       # may it read the conversations episodes came from?
```

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
| Consolidation | The model of the backend you chose |
| Harvest with distillation | The distill preset's provider, or your in-session agent; `--raw` sends nothing |
