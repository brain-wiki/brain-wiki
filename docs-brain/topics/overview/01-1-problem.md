---
id: 01M3250V00P804YZSF56DMS68G
type: design
title: "Problem"
aliases: ["01 §1"]
tags: [overview]
source: "docs/design/01-overview.md#1-problem"
---
# Problem

People now work with several AI agents at once: a coding agent in the
terminal, another in the editor, a chat app on the phone, an autonomous
assistant on a home machine. Each one keeps its own memory, if it keeps any:

| Problem | What goes wrong |
|---|---|
| **Silos** | Every host has its own memory store (instruction files, auto-memory folders, proprietary knowledge bases). What one agent learns, the others never see. Switching agents means starting over. |
| **Opaque stores** | Memory layers built on vector databases or hosted services are hard to read, edit, diff, or move. Users cannot see or correct what their agents "know". |
| **Unsafe writes** | Agents write to memory while reading untrusted text (web pages, issues, email). An instruction planted in that text can end up in long-term memory and steer every later session. |
| **Stale retrieval** | Similarity search returns the best-matching note, not the current one. A decision that was later reversed, or a rule with an exception, is retrieved without its correction. |
| **Silent decay** | When an LLM rewrites a memory file to "clean it up", details disappear a little at a time. Nobody notices until a fact is gone. |

## Relations
- part_of [[overview]]
