---
id: 01M3250V0078EB8Q8XVEAPA6N8
type: design
title: "`brain connect`"
aliases: ["Agent integrations §8"]
source: "docs/design/agent-integrations.md#8-brain-connect"
---
# `brain connect`

`brain connect <host>` wires a host to the locally installed brain-wiki.

1. Write a host-specific copy of the plugin to `<data dir>/plugin/<host>/`.
   Its MCP entries run the absolute path of the installed `brain` with
   `--host <id>`, and `--brain <name>` when the global `--brain` is given.
   Its Antigravity rule matches the host's profile, and its marketplace is
   named `brain-wiki-local`.
2. Register the copy the way the host expects, with the host's own CLI
   when it is on `PATH`:

   | Host | Registration |
   |---|---|
   | Claude Code | `claude plugin marketplace add <dir>`, then `claude plugin install brain-wiki@brain-wiki-local --scope <scope>` |
   | Codex | `codex plugin marketplace add <dir>`; the user then enables brain-wiki in Codex's plugin browser |
   | Antigravity | A symlink `~/.gemini/config/plugins/brain-wiki` to the copy |
   | OpenClaw | `openclaw plugins install --link <dir>` |
   | Cursor | The server added to `~/.cursor/mcp.json` (`.cursor/mcp.json` with `--scope project`) |
   | generic | Nothing; the entry and the block are printed |

   Without the host's CLI, `connect` prints the steps to do by hand. It
   refuses to replace an Antigravity plugin folder that is not its own
   link.
3. Write the instruction block (§3.2) where the host reads it, if it has
   such a file (§4).
4. Options:
   - `--scope user|project`. Codex, Antigravity, and OpenClaw have no
     project scope, so `--scope project` with them is a usage error.
   - `--brain` must name a registered brain or a brain folder (written as
     an absolute path). Anything else is `not_found`.
   - `--print` prints the MCP entry and the block instead of writing.
     `--print` with `--uninstall` is a usage error.
   - `--force` replaces an edited block.
   - `--dry-run` prints every file change as a diff and every command.
   - `--uninstall` undoes the scope's changes.
5. Every change is recorded with backups of modified files: user scope in
   `<state>/connect/<host>.json`, project scope in
   `<state>/connect/projects/<hash of the project folder>/<host>.json`.
   - Each scope is connected and uninstalled on its own. What the scopes
     share (the plugin copy, Claude Code's marketplace) is removed only with
     the last one.
   - On `--uninstall`, a config file still exactly as `connect` wrote it
     gets its original bytes back from the backup, or is deleted if
     `connect` created it. A file the user changed since keeps those
     changes and loses only brain-wiki's entry, and the step says so.
   - A reconnect over its own unchanged write keeps the first backup.
   - A config that is not plain JSON (comments, trailing commas) is
     refused with a `format` error naming the file. `--print` gives the
     entry to add by hand.
6. After registering, run the host's listing command where one exists
   (`claude plugin list`, `codex plugin marketplace list`) and report
   whether brain-wiki is listed. `connect` exits 1 if a host command
   failed.
