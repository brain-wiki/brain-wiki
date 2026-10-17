---
id: 01M3250V00VMBC0DDYWRF94GRB
type: design
title: "Unattended agent mode"
aliases: ["Agent integrations §7"]
source: "docs/design/agent-integrations.md#7-unattended-agent-mode"
---
# Unattended agent mode

Scheduled consolidation ([[write-path-48-scheduled-consolidation|write path §4.8]])
starts a host's own CLI without a person: tools on, file access limited to
the brain, and brain-wiki's MCP server attached. `brainwiki/presets.py`
holds the exact flags, tested against a recording stand-in, because CLIs
change faster than this document.

| Host | Command (sketch) | Status |
|---|---|---|
| Claude Code | `claude -p --output-format json --no-session-persistence --mcp-config <brain-wiki entry> --strict-mcp-config --tools Read,Edit,Write,Glob,Grep --allowedTools Read,Edit,Write,Glob,Grep,mcp__brain-wiki --permission-mode dontAsk --add-dir <brain>` | Built; to verify against a real CLI before release (§9) |
| Codex | `codex exec` with `--sandbox workspace-write` | Not built: MCP servers in exec mode and approval-free runs to verify |
| Antigravity | `agy` headless | Not built: headless runs deny tools that need approval, and a denied call ends the turn (T-5) |
| Cursor | `cursor-agent -p` | Not built: availability and tool scoping to verify |
| OpenClaw | Gateway automations | Not built: whether automations can be created from outside |

How the Claude Code run is kept in bounds:

- The prompt goes on stdin. The final text is `result` of the JSON output;
  `is_error` or a non-zero exit fails the run.
- `--tools` leaves only the file tools, so there is no shell and no web
  fetch, and `--strict-mcp-config` loads only brain-wiki's server.
- `--permission-mode dontAsk` denies anything `--allowedTools` does not
  allow, instead of waiting for a person.
- The working directory is a fresh folder under brain-wiki's state
  directory, and `--add-dir` gives file access to the brain. Harvest skips
  sessions under the state directory, and `--no-session-persistence` keeps
  the run out of the host's session store, so harvest never reads a
  scheduled run back into the brain.
- A run times out after an hour.

A host without a verified mode consolidates in sessions only. If it never
does, its pending episodes show in orientation, and the user can ask
another agent to take them.

Harvest distilled sessions into episodes with headless presets that ran
these CLIs with tools off, until harvest began filing notes
([[d36-harvest-into-notes|D36]]). Those presets are removed.
