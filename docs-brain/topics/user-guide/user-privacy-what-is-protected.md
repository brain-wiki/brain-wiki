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
| A web page tells an agent to "remember" an instruction | Rules need your words and your confirmation; consolidation cannot write rules; text from untrusted sources is marked and treated as data |
| A secret pasted into a session | Secret patterns are redacted before an episode is written; lint flags secrets anywhere in the brain |
| A model loses detail by rewriting notes | Models only propose small operations; nothing is deleted; every run can be undone |
| The visualizer reachable from the network | It listens on 127.0.0.1 unless you pass `--host`, needs a random token, and is read-only; with `--host`, the connection is not encrypted, so use it only on networks you trust |
