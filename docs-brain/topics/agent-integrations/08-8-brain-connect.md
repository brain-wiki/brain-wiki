---
id: 01M3250V00MXGY8BDV97ADVRAR
type: design
title: "`brain connect`"
aliases: ["08 §8"]
tags: [agent-integrations]
source: "docs/design/08-agent-integrations.md#8-brain-connect"
bw-part_of:
  - "[[agent-integrations]]"
---
# `brain connect`

`brain connect <host>` wires a host to the locally installed brain-wiki.

1. Materialize a host-specific copy of the plugin under
   `<data dir>/brain-wiki/plugin/<host>/`, with MCP and hook commands set to
   the absolute path of the installed `brain`, `--host <id>`, and (if given)
   `--brain <name>`.
2. Register it the way the host expects, preferring the host's own CLI when
   it is installed:

| Host | Registration |
|---|---|
| Claude Code | Add the materialized directory as a local marketplace and install the plugin from it |
| Codex | Add it as a local marketplace (`codex plugin marketplace add <dir>`) |
| Antigravity | Link or copy into `~/.gemini/config/plugins/brain-wiki/` |
| OpenClaw | `openclaw plugins install --link <dir>` |
| Cursor | Add the server to Cursor's MCP config file |
| generic | Print the snippet only |

3. Write the static instruction block (§3.2) into the host's instruction
   file.
4. Options: `--scope user|project`, `--brain`, `--briefing-hook` (adds the
   session-start briefing hook where the host has one), `--capture` (adds
   stop, pre-compact, and session-end hooks), `--print` (print the block and
   MCP entry instead of writing), `--force` (replace an edited block),
   `--dry-run` (print every file change as a diff), `--uninstall`.
5. Every change is recorded in `<state>/connect/<host>.json` with backups of
   modified files, so `--uninstall` restores exactly what was there.
6. After registering, run the host's own listing command (where one
   exists) and report whether the plugin, server, and instruction block are
   visible.
