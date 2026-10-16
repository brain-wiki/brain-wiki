---
id: 01M3250V009Y8JG2NZMZ7HF3SR
type: design
title: "What brain-wiki is"
aliases: ["Overview §2"]
source: "docs/design/overview.md#2-what-brain-wiki-is"
---
# What brain-wiki is

brain-wiki is a local-first memory that any agent can read and write. It is stored as plain Markdown in a folder the user owns.

```
            ┌────────────────────── agent hosts ───────────────────────┐
            │ Claude Code    Codex    Antigravity    OpenClaw    Cursor │
            │      any MCP client          a person in Obsidian or vim  │
            └───────┬──────────────┬──────────────────┬────────────────┘
               plugin│        MCP (stdio)│        plain files│
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

A brain is a directory of Markdown files with a small manifest, `brain.toml`. It holds:

- Topic notes. Each topic is a folder of Markdown pages with a short hub page. Frontmatter holds metadata, and facts and wikilinks to other notes are ordinary Markdown in the body.
- Supersession. A note that a newer note replaced says so in its metadata (`status: superseded`, `bw-superseded_by`), and retrieval always returns the newer note with it.
- An inbox of episodes. Episodes are raw observations that agents or the user write during work. They are only ever added, never edited.
- Rules. A short list of standing directives from the user.

## Subsections
- [[overview-21-two-uses]]: Two uses
