---
id: 01M3250V006DD6WKTQ327KMH7G
type: guide
title: "What is sent where"
source: "docs/user/privacy.md#what-is-sent-where"
---
# What is sent where

brain-wiki itself makes no network calls. Content leaves your machine only
when an agent you use reads it, or when you push a git brain to a remote:

| Action | Sent to |
|---|---|
| Search and read from an agent | That agent's model provider |
| Editing notes and consolidation | The model provider of the agent doing it |
| Harvest with distillation | The distill preset's provider, or your in-session agent |
| Harvest with `--raw` | Nothing |
| `brain commit --push` | Your git remote |
