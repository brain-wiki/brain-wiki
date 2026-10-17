---
id: 01M3250V002NJ2V3Z977FWHA1S
type: guide
title: "Import"
source: "docs/user/import.md"
---
# Import

`brain import` has two modes. Choose one per command:

| Mode | Does |
|---|---|
| `--overlay` | Adopt a folder as a brain in place |
| `--into BRAIN` | Copy notes into an existing brain |

- Every mode is a dry run until you add `--apply`. `--dry-run` wins over
  `--apply`.
- A flag the mode does not use is an error, not ignored. For example,
  `--phase` needs `--overlay`.
- Documents and your agents' memory files are imported by an agent, not
  by a command. See [[user-import|Documents and memory files]].


## Adopt an Obsidian vault or Markdown folder

```sh
brain import ~/notes --overlay                 # report: topics, topic pages, counts, what would change
brain import ~/notes --overlay --apply         # phase 0: adopt in place
```

Phase 0 adds `brain.toml`, an `AGENTS.md` block, `rules.md`, `log.md`, and
the `inbox/`, `archive/`, and `reports/` folders. It moves and changes no
note.

- Top-level folders become topics. Template and attachment folders are
  ignored.
- Lint starts in the lenient `migrate` profile.
- The brain is registered under the folder's name and is searchable right
  away.
- In a git repository, phase 0 commits everything it added, including the
  plan in `reports/import-plan.md`.
- Running phase 0 again on an adopted folder says it is already a brain.

Later phases are optional. Each one is a separate undoable run:

| Phase | Changes |
|---|---|
| `--phase 1` | Notes without an `id` get one; non-standard `status` values (`draft`, `done`) move to `bw-stage` |
| `--phase 2` | Topics without a topic page get one; notes missing from their page are listed in it |

```sh
brain import ~/notes --overlay --phase 1            # see the diff
brain import ~/notes --overlay --phase 1 --apply
```

- The ids a phase 1 dry run shows are the ids the apply writes.
- A moved `status` value becomes `status: active` plus `bw-stage`.
- Properties such as `up:` or `related:` are yours and stay as they are.
- If the folder is a git repository with uncommitted changes, apply stops,
  so the import diff stays clean.


## Copy notes into an existing brain

```sh
brain import ~/old-notes --into personal --apply
brain import ~/old-notes --into personal --topic archive --apply
```

- Top-level folders become topics, or everything goes into `--topic`.
- Notes get ids, `status` values are mapped as in phase 1, and path links
  are rewritten.
- New topics get topic pages, and the `AGENTS.md` topic table is refreshed, in
  separate runs. Undo all of them to revert.
- The source folder is left untouched.


## Documents and memory files

Ask an agent that can edit notes:

- "Bring in my meeting notes from ~/meetings."
- "Import your memory files into my brain."

The agent reads the files, searches the brain, and files each piece where
it belongs: a meeting becomes a dated record, a decision goes into the
project's notes, a procedure becomes a howto. Every note it changes cites
its source in `bw-sources`. Review the result with `git diff`, and undo
with git.

- Say what the files are. Text you did not write, such as clippings or
  other people's documents, is filed with its source but never becomes a
  statement about you.
- Asking again changes nothing already filed: the agent searches first.
- A large folder costs agent time in proportion to its size. To copy notes
  as they are, use `--into` instead.

Where the apps keep their memory files:

| App | Files |
|---|---|
| `claude-code` | `~/.claude/projects/*/memory/*.md` and `~/.claude/CLAUDE.md` |
| `codex` | `~/.codex/memories/` and `~/.codex/AGENTS.md` |
| `antigravity` | `~/.gemini/AGENTS.md`, `~/.gemini/GEMINI.md`, and `~/.gemini/config/rules/` |
| `openclaw` | `MEMORY.md`, `USER.md`, and `memory/` in `~/.openclaw/workspace/` |

`CLAUDE_CONFIG_DIR` and `CODEX_HOME` move the Claude Code and Codex
folders. Conversation history is harvested instead. See
[[user-agents|Agents]].
