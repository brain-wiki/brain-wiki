# Privacy and safety

## What agents can read

Every agent that may use a brain reads all of it: every topic and every
note. brain-wiki has no privacy levels inside a brain. A redesign is
proposed but not built. Until then, keep separate parts of your life in
separate brains, and limit which brains each agent may use (see
[Several brains](#several-brains)).

Those limits apply to brain-wiki's own tools. An agent that can read files
on your machine can still open a brain's Markdown directly. Keep notes an
agent must never see outside its reach, not only outside its brain list.

## Agent profiles

A profile says what an agent may change. Every agent may log episodes to
the inbox. An agent without its own profile may also edit notes. Change profiles with
`brain agents grant HOST CAPABILITY…` and `brain agents revoke`. Each change
can be undone. The result in `brain.toml` looks like this:

```toml
[agents.default]          # any agent without its own profile
write = ["edit"]

[agents.claude-code]
write = ["edit", "propose_rules", "harvest"]
read_origin = false       # may it read the conversations episodes came from?
```

| Capability | Lets the agent |
|---|---|
| `edit` | Create and edit notes, move notes, run `brain lint --fix`, archive consolidated episodes, run `brain commit` |
| `propose_rules` | Propose a standing rule, which you always confirm |
| `harvest` | File its own past sessions into notes |

- `read_origin = true` lets the agent read the conversation an episode came
  from. Turn it on with `brain agents grant HOST read_origin`.
- Profiles tell a cooperating agent what to do; they are not a lock. An
  agent with file access could edit `brain.toml` itself, so git history is
  the backstop.
- Only you change profiles, schedule jobs, and push. An agent acting with
  `--as` is refused.
- Older profiles may list `consolidate`, `review`, or `episodes`. Those
  names are ignored now.

## Several brains

Separate brains are the boundary between parts of your life, such as work
and personal. Limit which brains an agent may use:

```sh
brain brains limit cursor work         # cursor sees only the work brain
brain brains --as cursor               # check what it may use
brain brains unlimit cursor            # every brain again
brain connect cursor --brain work      # the brain its MCP server starts with
```

The limits live in the user config, `~/.config/brain-wiki/config.toml`,
under `[hosts.<app>] brains`.

## What is protected

| Risk | Protection |
|---|---|
| A web page tells an agent to "remember" an instruction | Rules need your words and your confirmation |
| An agent writes a false fact into a note | Partial: sources and git history |
| A secret pasted into a session | Redaction in episodes, and lint |
| An agent loses detail by rewriting a note | git history |
| The visualizer reachable from the network | Local only by default, a random token, read-only |

- Agents never edit `rules.md`. Episodes from sources you marked untrusted
  are labeled and treated as data.
- A note does not record who wrote each fact, so a fact an agent wrote
  looks like one you wrote. You can trace it through `bw-sources` on the
  note, the archived episodes it came from, and the git history of each edit
  (with a commit job).
- Secret patterns are redacted before an episode is written. Lint flags
  text that matches a secret pattern anywhere in the brain (BW701).
- In a git brain, `brain commit` keeps every version and git restores any of
  them. Without git, nothing does. brain-wiki's own changes are runs that
  `brain undo` reverses.
- The visualizer listens on 127.0.0.1 unless you pass `--host`. With
  `--host`, the connection is not encrypted, so use it only on networks you
  trust.

## What is sent where

brain-wiki itself makes no network calls. Content leaves your machine only
when an agent you use reads it, or when you push a git brain to a remote:

| Action | Sent to |
|---|---|
| Search and read from an agent | That agent's model provider |
| Editing notes and consolidation | The model provider of the agent doing it |
| Harvest | The model provider of the agent doing it |
| `brain commit --push` | Your git remote |
