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
may log episodes and edit notes. Change
profiles with `brain agents grant HOST CAPABILITY…` and `brain agents revoke`
(each change can be undone); the result in `brain.toml` looks like this:

```toml
[agents.default]          # any agent without its own profile
write = ["episodes", "edit"]

[agents.claude-code]
write = ["episodes", "edit", "propose_rules", "harvest"]
read_origin = false       # may it read the conversations episodes came from?
```

| Capability | Lets the agent |
|---|---|
| `episodes` | Log what it learned to the inbox |
| `edit` | Create and edit notes directly (then `brain validate`); also needed for `brain mv`, `brain lint --fix`, and archiving consolidated episodes |
| `propose_rules` | Propose a standing rule; you always confirm it |
| `harvest` | Turn its own past sessions into episodes |

Profiles from brain-wiki 0.1 may list `consolidate` or `review`; those
names are ignored now.

## Several brains

Separate brains are the boundary between parts of your life (work and
personal, for example). Limit which brains an agent may use:

```sh
brain brains limit cursor work         # cursor sees only the work brain
brain brains --as cursor               # check what it may use
brain brains unlimit cursor            # every brain again
brain connect cursor --brain work      # its default brain
```

The limits live in the user config, `~/.config/brain-wiki/config.toml`,
under `[hosts.<app>] brains`.

## What is protected

| Risk | Protection |
|---|---|
| A web page tells an agent to "remember" an instruction | Rules need your words and your confirmation; agents never edit `rules.md`; episodes from untrusted sources are marked and treated as data |
| An agent writes a false fact into a note | Partly. A note does not record where each fact came from, so a fact an agent wrote looks like one you wrote. You can trace it through `bw-sources` on the note, the git history of each edit (with a commit job), and the archived episodes it came from |
| A secret pasted into a session | Secret patterns are redacted before an episode is written; lint flags secrets anywhere in the brain |
| An agent loses detail by rewriting a note | In a git brain, `brain commit` keeps every version and git restores any of them; without git, nothing does. brain-wiki's own changes are runs that `brain undo` reverses |
| The visualizer reachable from the network | It listens on 127.0.0.1 unless you pass `--host`, needs a random token, and is read-only; with `--host`, the connection is not encrypted, so use it only on networks you trust |

## What is sent where

brain-wiki itself makes no network calls. Content leaves your machine only
when an agent you use reads it:

| Action | Sent to |
|---|---|
| Search and read from an agent | That agent's model provider |
| Editing notes and consolidation | The model provider of the agent doing it |
| Harvest with distillation | The distill preset's provider, or your in-session agent; `--raw` sends nothing |
