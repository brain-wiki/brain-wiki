---
id: 01M3250V00K4P5VSG6JWPRXGBZ
type: guide
title: "What is protected"
tags: [user-guide]
source: "docs/user/privacy.md#what-is-protected"
---
# What is protected

| Risk | Protection |
|---|---|
| A web page tells an agent to "remember" an instruction | Rules need your words and your confirmation; agents never edit `rules.md`; episodes from untrusted sources are marked and treated as data |
| An agent writes a false fact into a note | Partly. A note does not record where each fact came from, so a fact an agent wrote looks like one you wrote. You can trace it through `bw-sources` on the note, the git history of each edit (with a commit job), and the archived episodes it came from |
| A secret pasted into a session | Secret patterns are redacted before an episode is written; lint flags secrets anywhere in the brain |
| An agent loses detail by rewriting a note | In a git brain, `brain commit` keeps every version and git restores any of them; without git, nothing does. brain-wiki's own changes are runs that `brain undo` reverses |
| The visualizer reachable from the network | It listens on 127.0.0.1 unless you pass `--host`, needs a random token, and is read-only; with `--host`, the connection is not encrypted, so use it only on networks you trust |
