---
id: 01M3250V00J0ZC4F0DRE3JQQSR
type: design
title: "Documents and memory files (Import)"
aliases: ["Import §6"]
source: "docs/design/import.md#6-documents-and-memory-files"
---
# Documents and memory files (Import)

Documents and an agent's memory files go straight into notes. No command
turns them into episodes; the user asks an agent instead: "bring in my
meeting notes from ~/meetings", "import your memory files". The agent
reads the files, searches the brain, and applies the consolidation
patterns ([[write-path-4-consolidation|write path §4]]) directly.

- Each note it creates or changes cites its source in `bw-sources`: the
  document's URL when it has one, or the record note the agent made from
  a local file. Local file paths are not written into notes, because a
  brain moves between machines.
- An agent's memory files are its own earlier notes. It files their
  content like an episode it captured.
- Text the user did not write (clippings, other people's documents) can be
  recorded or filed with its source, but never becomes a statement about
  the user or a rule. The user says what the files are when asking.
- A second import finds the notes already there, because the agent
  searches before it writes.
- Cost grows with the amount of text, since an agent reads all of it.
  Copying a folder of notes as they are is `--into`, and adopting a vault
  is `--overlay`; both are deterministic and need no agent.

Where hosts keep their memory files, as guidance for the agent (each
host's design doc lists its own):

| Host | Files |
|---|---|
| Claude Code | `projects/*/memory/*.md` and `CLAUDE.md` under `CLAUDE_CONFIG_DIR` (default `~/.claude`) |
| Codex | `memories/**/*.md` and `AGENTS.md` under `CODEX_HOME` (default `~/.codex`) |
| Antigravity | `~/.gemini/AGENTS.md`, `~/.gemini/GEMINI.md`, and `~/.gemini/config/rules/*.md` |
| OpenClaw | `MEMORY.md`, `USER.md`, and `memory/*.md` in `~/.openclaw/workspace/` |

Instructions in these files are natural candidates for rules, but only the
user can add a rule ([[write-path-6-rules|write path §6]]). A host's
conversation history is harvested instead
([[write-path-22-harvesting-sessions|write path §2.2]]).

Earlier versions had `brain import --to-episodes` and `brain import --from
HOST`, which split files into episodes for later consolidation. They were
removed because an agent doing the import can file each piece where it
belongs at once, and the episode step added a second pass without adding
provenance.
