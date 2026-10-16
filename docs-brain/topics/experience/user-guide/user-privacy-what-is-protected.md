---
id: 01M3250V00K4P5VSG6JWPRXGBZ
type: guide
title: "What is protected"
source: "docs/user/privacy.md#what-is-protected"
---
# What is protected

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
