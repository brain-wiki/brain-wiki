---
id: 01M3250V00KZC7GS7J1EX1AVPJ
type: design
title: "To episodes, and from agents"
aliases: ["Import §6"]
source: "docs/design/import.md#6-to-episodes-and-from-agents"
---
# To episodes, and from agents

`--to-episodes` turns documents into raw input for consolidation instead
of curated notes. It suits note dumps, exported chats, meeting
transcripts, and clippings. A folder imports every `.md` file under it.

- Frontmatter is metadata, not content. It is dropped, and only the body
  is split.
- Documents are split on headings into chunks of at most 8 KiB. Each chunk
  becomes one episode with `bw-captured: import`, `bw-origin: import`, and
  `bw-source` naming the file and heading.
- `bw-inputs` is `local` for the user's own files, or `external` with
  `--untrusted` (clippings, documents written by others).
- `--agent HOST` records the episodes as written by that host. `--topic`
  adds a topic hint.
- The original files are not modified or moved.
- Each chunk carries a dedupe key from its source and text, so a rerun
  skips what was already imported. The output counts episodes written and
  skipped, and names files it could not read; any unreadable file makes
  the exit code 1.

`--from <host>` imports the host's own memory files the same way, as
episodes attributed to the host (`bw-origin: agent`, `bw-inputs: unknown`):

| Host | Files (a `PATH` argument replaces them) |
|---|---|
| Claude Code | `projects/*/memory/*.md` and `CLAUDE.md` under `CLAUDE_CONFIG_DIR` (default `~/.claude`) |
| Codex | `memories/**/*.md` and `AGENTS.md` under `CODEX_HOME` (default `~/.codex`) |
| Antigravity | `~/.gemini/AGENTS.md`, `~/.gemini/GEMINI.md`, and `~/.gemini/config/rules/*.md` |
| OpenClaw | `MEMORY.md`, `USER.md`, and `memory/*.md` in `~/.openclaw/workspace/` |

`--from` brings in a host's memory files. A host's conversation history is
read by `brain harvest` instead
([[write-path-22-harvesting-sessions|write path §2.2]]), which is also
the way to backfill a new brain from past sessions.

The locations come from each host's documentation and change between host
versions, so they live in code (`importer/_episodes.py`). Instructions in
these files are natural candidates for rules, but only the user can add a
rule ([[write-path-6-rules|write path §6]]).
