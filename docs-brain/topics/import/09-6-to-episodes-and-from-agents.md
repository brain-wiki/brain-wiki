---
id: 01M3250V00E3B420A3RJW5YCSY
type: design
title: "To episodes, and from agents"
aliases: ["09 §6"]
tags: [import]
source: "docs/design/09-import.md#6-to-episodes-and-from-agents"
bw-part_of:
  - "[[import]]"
---
# To episodes, and from agents

`--to-episodes` turns documents into raw input for consolidation instead of
curated notes. It suits note dumps, exported chats, meeting transcripts, and
clippings.

- Documents are split on headings into chunks of at most 8 KiB; each chunk
  becomes one episode with `bw-captured: import`, `bw-origin: import`, and a
  `source:` property naming the original file and heading.
- `taint` is `false` for the user's own files, or `true` with `--untrusted`
  (clippings, documents written by others).
- The original files are not modified or moved.

`--from <host>` knows where hosts keep their own memory and imports those
files as episodes attributed to the host (`bw-origin: agent`, `bw-taint:
unknown`):

| Host | Files (defaults; overridable with `--path`) |
|---|---|
| Claude Code | Project memory directories under `~/.claude/projects/*/memory/` and user-level `CLAUDE.md` |
| Codex | `~/.codex/memories/` and `~/.codex/AGENTS.md` |
| Antigravity | `~/.gemini/AGENTS.md`, `~/.gemini/GEMINI.md`, and global rule files |
| OpenClaw | The agent workspace's `MEMORY.md`, `USER.md`, and `memory/*.md` |

`--from` brings in a host's *memory files*. A host's *conversation
history* is read by `brain harvest` instead
([[05-22-harvesting-sessions|05 §2.2]]),
which is also the way to backfill a new brain from past sessions.

Locations are taken from each host's documentation and will be verified by
the integration tests in [[agent-integrations|08]]; hosts change
them, so the table lives in code with per-host overrides. Directive-like
content from these files is a natural candidate for rules, but promotion
still requires the user ([[05-6-rules|05 §6]]).
