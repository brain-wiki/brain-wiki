# Privacy and safety

## Privacy levels

`brain.toml` declares levels from least to most restrictive:

```toml
[privacy]
levels  = ["default", "sensitive", "secret"]
default = "default"

[topics.health]
privacy = "sensitive"
```

A note's level is the higher of its topic's level and its own `bw-privacy:`
property (a note can raise its level, never lower it). Agents see only
notes up to their profile's `max_privacy`. When a hidden note supersedes or
contradicts a visible one, the agent is told that such a note exists, not
what it says.

## Agent profiles

```toml
[agents.default]          # any agent without its own profile
max_privacy = "default"
topics = ["*"]
write = ["episodes"]

[agents.claude-code]
max_privacy = "sensitive"
topics = ["*"]
write = ["episodes", "propose_rules", "consolidate", "harvest", "review"]
read_origin = false       # may it read the conversations episodes came from?
```

Consolidation backends use a profile too: episodes above a backend's level
stay in the inbox for a more trusted one, such as a local model.

## Several brains

Separate brains are the strongest boundary (work and personal, for
example). Limit which brains an agent may use in the user config:

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
