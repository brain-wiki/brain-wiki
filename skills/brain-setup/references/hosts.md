# Agent apps: connecting, permissions, and schedulers

`brain connect HOST` writes a copy of the plugin for that app, pointing at
the installed `brain` command, and registers it the way the app expects.
Always run it with `--dry-run` first. Every change is recorded with backups,
so `brain connect HOST --uninstall` restores what was there.

Options: `--brain NAME` (pin this app to one brain), `--scope user|project`,
`--capture` (also save sessions at their end).

Host ids: `claude-code`, `codex`, `antigravity`, `openclaw`, `cursor`,
`generic`.

| App | Tools | Start-of-session context | Capture | Harvest | Local scheduler |
|---|---|---|---|---|---|
| Claude Code | yes | yes | yes | yes | desktop app |
| Codex / ChatGPT desktop | yes | yes | yes | yes | desktop app |
| Antigravity | yes | yes | yes | yes | `/schedule` |
| OpenClaw | yes | optional add-on | not yet | not yet | automations |
| Cursor | yes | not yet | not yet | not yet | none (cloud only) |
| Other MCP apps | yes | no | no | no | none |

## Claude Code

- **Connect:** install from the brain-wiki plugin marketplace, or
  `brain connect claude-code`, which adds a local marketplace and installs
  the plugin from it.
- **Check:** in a new session, `/mcp` lists the `brain-wiki` server.
- **Permissions:** plugin tools are named
  `mcp__plugin_brain-wiki_brain-wiki__<tool>`. To stop prompts for the read
  tools, add `mcp__plugin_brain-wiki_brain-wiki__brain_search` (and
  `…__brain_read`, `…__brain_orient`) to `permissions.allow` in the user's
  settings, or choose "always allow" when asked. `brain_propose_rule` always
  asks the user; that is intended.
- **Session history:** Claude Code deletes transcripts after 30 days by
  default, so harvest at least weekly.
- **Scheduler:** local scheduled tasks in the desktop app (they run while
  the app is open and the computer is awake, with one catch-up run after
  sleep). If you run inside the desktop app and can create scheduled tasks,
  create it from `brain schedule show ROUTINE --for claude-code`. Otherwise
  give the user the four fields from that output to enter under
  Routines → New routine → Local: name, schedule, instructions, and folder
  (the brain folder). The command line's `/loop` only lasts for one session;
  do not use it for routines.

## Codex (CLI and ChatGPT desktop)

- **Connect:** add the brain-wiki repository as a plugin marketplace and
  install the plugin, or `brain connect codex`, which runs
  `codex plugin marketplace add` on the local copy.
- **Start-of-session context:** plugin hooks run only after the user reviews
  and trusts them (in `/hooks`). In the desktop app, hooks run only for
  manually installed plugins.
- **Permissions:** approval per tool is set in `~/.codex/config.toml` under
  `[plugins."brain-wiki".mcp_servers.brain-wiki.tools.<tool>]` with
  `approval_mode = "approve"`. Offer this for the read tools only.
- **Scheduler:** desktop app scheduled tasks on a local project (they run
  while the app is open). Ask the app to create a scheduled task from
  `brain schedule show ROUTINE --for codex` with the brain folder as the
  project, or give the user the printed steps.

## Antigravity (desktop, IDE, CLI)

- **Connect:** `agy plugin install <brain-wiki repository URL>`, or
  `brain connect antigravity`, which links the plugin into
  `~/.gemini/config/plugins/brain-wiki/`.
- **Start-of-session context:** added on the first model call of each
  conversation.
- **Permissions:** MCP tools ask by default. Allow the read tools with
  rules such as `mcp(brain-wiki/brain_search)`, `mcp(brain-wiki/brain_read)`,
  and `mcp(brain-wiki/brain_orient)` under `permissions.allow` in the
  settings file (CLI: `~/.gemini/antigravity-cli/settings.json`).
- **Scheduler:** `/schedule "<cron>" <prompt>` in the desktop app and CLI.
  `brain schedule show ROUTINE --for antigravity` prints the exact line to
  run or paste.

## OpenClaw

- **Connect:** `openclaw plugins install brain-wiki --marketplace <repository>`,
  or `brain connect openclaw`, which runs `openclaw plugins install --link`
  on the local copy. Skills and tools work; capture and harvest are not
  available yet.
- **Scheduler:** gateway automations.
  `brain schedule install ROUTINE --for openclaw` shows the
  `openclaw automations create …` command and runs it after a yes;
  `brain schedule remove ROUTINE` deletes it.

## Cursor

- **Connect:** Cursor loads the brain-wiki plugin bundle, or
  `brain connect cursor` adds the server to Cursor's MCP config.
- **Scheduler:** Cursor automations run in the cloud and cannot reach a
  local brain, so routines are not supported. Use the OS scheduler instead.

## Other MCP apps

`brain connect generic --print` prints a server entry (`command`, `args`,
`env`) to paste into the app's MCP settings.

## OS schedulers (no agent needed)

`brain schedule install ROUTINE --via cron|launchd|systemd --dry-run`, then
`--apply`. The entry runs harvest and consolidation from the command line
with the model configured for headless use. `brain schedule list` shows
everything brain-wiki created; `brain schedule remove ROUTINE` removes it.

## Routine rules

- A routine pre-approves only the brain-wiki tools listed in its
  `allow_tools`. Ask the user to run it once and always allow those.
- Routines never propose rules; that always needs the user.
- Only one device consolidates a brain (`[consolidate] device` in
  `brain.toml`); maintenance runs elsewhere stop by themselves.
- A routine can only do what the app's profile already allows: its `needs`
  must appear in that app's `write` list ([privacy.md](privacy.md)).
