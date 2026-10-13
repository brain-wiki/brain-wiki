---
id: 01M3250V009PTNE46MYTSB9XZE
type: design
title: "What brain-wiki is"
aliases: ["01 §2"]
tags: [overview]
source: "docs/design/01-overview.md#2-what-brain-wiki-is"
bw-part_of:
  - "[[overview]]"
---
# What brain-wiki is

brain-wiki is a local-first memory layer that any agent can read from and
write to, stored as plain Markdown in a folder the user owns.

```
            ┌────────────────────── agent hosts ───────────────────────┐
            │ Claude Code    Codex    Antigravity    OpenClaw    Cursor │
            │      any MCP client          a human in Obsidian / vim    │
            └───────┬──────────────┬──────────────────┬────────────────┘
       plugin + hooks│        MCP (stdio)│        plain files│
            ┌───────▼──────────────▼──────────────────▼────────────────┐
            │                  brain-wiki engine (Python)              │
            │  config · parse · index · search · lint · consolidate    │
            └───────┬──────────────────────────────────┬───────────────┘
                    │ read/write Markdown              │ derived cache
            ┌───────▼───────────────────┐   ┌──────────▼──────────────┐
            │ brain directory (owned by │   │ SQLite index + run log  │
            │ the user, anywhere on disk│   │ in the user cache/state │
            │ optionally a git repo)    │   │ directories (rebuildable)│
            └───────────────────────────┘   └─────────────────────────┘
```

A **brain** is a directory of Markdown files with a small manifest. It holds:

- **Topic notes**: curated, self-contained pages grouped into topics, each
  topic with a short hub page.
- **Typed relations** between notes, written as a bullet list at the bottom
  of each note.
- **An inbox of episodes**: raw, append-only observations written by agents
  (or the user) during work.
- **Rules**: a short list of standing directives from the user.

## Subsections
- [[01-21-two-uses]]: Two uses
