---
id: 01M3250V00003Q3MY7K50JPX0D
type: design
title: "Problem"
aliases: ["Overview §1"]
source: "docs/design/overview.md#1-problem"
---
# Problem

People now work with several AI agents at once: a coding agent in the terminal, another in the editor, a chat app on the phone, an assistant running on a home machine. Each keeps its own memory, if it keeps any, and that causes five problems:

| Problem | What goes wrong |
|---|---|
| Silos | Every host has its own memory store. What one agent learns, the others never see, and switching agents means starting over. |
| Opaque stores | Memory built on vector databases or hosted services is hard to read, edit, diff, or move. Users cannot see or correct what their agents know. |
| Unsafe writes | Agents write memory while reading untrusted text such as web pages, issues, and email. An instruction planted in that text can reach long-term memory and steer every later session. |
| Stale retrieval | Similarity search returns the best-matching note, not the current one. A reversed decision comes back without its correction. |
| Silent decay | When an LLM rewrites a memory file to clean it up, details disappear a little at a time, and nobody notices until a fact is gone. |
