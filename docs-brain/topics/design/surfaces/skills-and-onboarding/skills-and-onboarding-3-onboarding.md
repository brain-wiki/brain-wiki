---
id: 01M3250V00EYYZ1QZHQ4RYPC8A
type: design
title: "Onboarding"
aliases: ["Skills and onboarding §3"]
source: "docs/design/skills-and-onboarding.md#3-onboarding"
---
# Onboarding

### 3.1 Entry points

Every way into setup leads to the same flow:

| Entry | What happens |
|---|---|
| Plugin installed, no brain yet | MCP tools fail with `not_configured`, and `brain_list` shows no brains; both say to use the `brain-setup` skill or `brain setup --guide` |
| The user asks the agent | `brain-setup` triggers |
| An agent with no plugin, or only the MCP server | The agent runs `brain setup --guide` (or `uvx --from brain-wiki brain setup --guide`) and follows it |
| A terminal, no agent | `brain setup` runs the flow as a wizard (§3.5) |
| Setup again later | Setup reads the current state and offers only what is missing |

`brain setup --guide` prints the `brain-setup` skill, without its
frontmatter and with reference links made absolute, under a short header.
The header tells the agent to walk the user through the steps and to use
the `brain` command until brain-wiki's tools load, which happens in a new
session after step 4 connects the agent's own app.


### 3.2 The flow

```
check ─► install ─► brain ─► connect ─► permissions ─► harvest ─► verify ─► summary
```

The steps of the `brain-setup` skill:

1. **Check.** Run `brain doctor --json` (§3.4). If the command is missing,
   go to install. If everything is set up, show a short summary and offer
   only the `next_steps`.
2. **Install.** Ask, then run `uv tool install brain-wiki` (or
   `pipx install brain-wiki`). Without installing, every command also runs
   as `uvx --from brain-wiki brain …`, which is how the plugin's own MCP
   server runs.
3. **Brain.**
   - With no brain: suggest a folder outside any code repository
     (`~/brains/personal`), a name, and git. Recommend git strongly: agents
     edit notes directly, and git is the only way to see or revert those
     edits. Warn against a git brain inside a folder a sync tool copies
     between machines. Then run `brain init PATH --name NAME [--git]`.
   - With an existing vault: run `brain import PATH --overlay --dry-run`,
     summarize the report, and after a yes apply phase 0. Mention phases 1
     and 2 without applying them.
   - A brain below format 3 gets `brain lint --fix --dry-run`, then the
     conversion after a yes.
   - For a git brain: explain that `brain commit` records agents' direct
     edits, and offer a job that runs it every 15 minutes
     (`brain schedule add commit --dry-run` first). Ask whether the job
     should also push (default no). On Windows, or if the user declines,
     mention running `brain commit` by hand.
4. **Connect.** List the agent apps `doctor` found installed and not
   connected. Skip the app the agent runs in if brain-wiki's tools already
   work there. For each app the user picks, run
   `brain connect HOST --dry-run`, show the change, and connect after a
   yes. Report where the instructions went and tell the user to start a new
   session in that app.
5. **Permissions.** Explain that every connected agent can read all of a
   brain, and that separate parts of life (work and personal) belong in
   separate brains, limited with `brain brains limit APP BRAIN...`.
   Editing is on by default, and every app may log episodes; offer `propose_rules` per app
   with `brain agents grant APP propose_rules --dry-run` first.
6. **Harvest.** Explain what is read and which model may see it. Run
   `brain harvest --from HOST --since 30d` (writes nothing) and show the
   sessions found and the estimated tokens. Explain routing, and with one
   brain offer `brain harvest route "~/**" NAME`. Then ask per app: harvest
   on or off (`brain harvest enable APP`, plus
   `brain agents grant APP harvest`), and backfill now, later, or never.
7. **Verify.** Log a test episode with `brain_log_episode`, search for
   it, and show the orientation. Without the MCP tools yet (a new
   install), check with `brain search` and `brain orient`, and log the test
   episode in the next session. The test episode stays in the inbox, and
   consolidation skips it as holding nothing durable.
8. **Summary.** List what was set up, where it lives, and how to undo
   each part.

| Part | Undo |
|---|---|
| Brain created | `brain brains remove NAME` (the files stay) |
| Vault adopted | `brain brains remove NAME` and delete the added files, or revert its commit; phases 1 and 2 with `brain undo RUN` |
| Agent permissions | `brain undo RUN`, or `brain agents revoke APP CAPABILITY` |
| Agent app connected | `brain connect HOST --uninstall` |
| Harvest | `brain harvest disable APP` |
| Commit job | `brain schedule remove commit` |


### 3.3 Rules for the setup skill

- Every change is a `brain` subcommand: `init`, `import --overlay`,
  `schedule add commit`, `connect`, `brains limit`, `agents grant`,
  `harvest enable|route`. The skill changes settings only through them,
  never by editing `brain.toml` or the user config, so every change can be
  shown first and undone.
- Ask the few questions a step needs together, then act. Never ask a wall
  of questions up front.
- Show a dry run before any change outside the brain, such as an agent
  app's config.
- Turn on nothing that reads sessions or sends content to a model without
  an explicit yes, and explain it first.
- Never move, rename, or delete the user's files. Import is overlay only,
  and later phases are offered, not applied.
- If setup stopped halfway, start again from step 1. `doctor` shows what
  is already done.
- Use plain words ("agent app", "notes", "brain"). The references hold the
  details for users who ask.


### 3.4 `brain doctor --json`

`brain doctor --json` is what the setup skill reads. Its shape is stable
within a minor version.

```json
{
  "version": "0.2.0",
  "device": "laptop",
  "config": {"path": "/home/ada/.config/brain-wiki/config.toml", "exists": true},
  "cli": {"on_path": true, "path": "/home/ada/.local/bin/brain"},
  "brains": [
    {"name": "personal", "path": "/home/ada/brains/personal", "ok": true, "format": 3,
     "git": true, "id": "01J…", "pending_episodes": 7, "open_proposals": 1, "notes": 412,
     "recovered_runs": [], "uncommitted_runs": [], "default": true}
  ],
  "hosts": [
    {"id": "claude-code", "installed": true, "connected": true, "plugin": "0.2.0",
     "instructions": true, "harvest": true},
    {"id": "codex", "installed": true, "connected": false, "harvest": false}
  ],
  "sqlite": {"version": "3.53.4", "fts5": true, "trigram": true},
  "problems": [
    {"code": "host_not_connected", "severity": "info", "host": "codex",
     "message": "codex is installed but not connected.", "fix": "brain connect codex"}
  ],
  "next_steps": ["connect codex"]
}
```

- A brain that cannot be opened has `ok: false` and an `error` instead of
  the counts.
- `hosts` lists `claude-code`, `codex`, `antigravity`, `openclaw`, and
  `cursor`. A host counts as installed when its command (`claude`,
  `codex`, `agy`, `openclaw`, `cursor-agent` or `cursor`) is on `PATH` or
  its folder exists (`~/.claude`, `~/.codex`, `~/.gemini/antigravity` or
  `~/.gemini/antigravity-cli`, `~/.openclaw`, `~/.cursor`).
- `connected` means `brain connect` connected the host for the user
  scope. A project-scope connection, or a plugin installed from a
  marketplace, does not count.
- `plugin` is the brain-wiki version that connected the host.
  `instructions` is false when a file `connect` wrote no longer holds the
  block.
- `doctor` contacts no network. Its only write rolls back runs a crash
  left half-applied ([[write-path-10-failure-modes|write path §10]]).

Problems `doctor` reports:

| Code | Severity | When |
|---|---|---|
| `brain_unreadable` | error | A registered brain cannot be opened |
| `no_fts5` | error | Python's SQLite lacks FTS5, so search cannot work |
| `no_brain` | warning | No brain is registered |
| `no_default_brain` | warning | No default brain is set, or it is not registered |
| `stale_brain_reference` | warning | The user config names a brain that is not registered |
| `run_rolled_back` | warning | An interrupted run was rolled back |
| `instructions_missing` | warning | A connected host's instruction file lost the block |
| `schedule_unregistered` | warning | A commit job runs for a brain id that is no longer registered |
| `brain_not_synced` | warning | The last `brain commit` ended `offline`, `conflict`, or `rejected`, and the last successful sync is over a day old or never happened |
| `run_not_committed` | info | A run was applied but its git commit failed |
| `uncommitted_edits` | info | A git brain has files changed over a day ago and not committed, and no commit job |
| `host_not_connected` | info | A host is installed but not connected, and a brain exists |

Each problem has a `message`, and most have a `fix` command.


### 3.5 The terminal wizard

`brain setup` runs the same flow in a terminal, calling the same code as
the subcommands. Without a terminal it prints that an agent should run
`brain setup --guide`, and exits 2.

It differs from the skill:

- It skips install, the format conversion, host limits, the harvest dry
  run, and backfill.
- To create a brain it asks new or adopt, a folder, and a name. Adopting
  shows the overlay report and applies phase 0 after a yes. A new brain
  gets git after a yes (default yes).
- It offers the commit job for a git brain with none yet, every 15
  minutes, and asks about pushing only when the brain has an `origin`
  remote. It installs the job after the yes without showing it first.
  Without a scheduler, it prints the crontab line to add.
- It asks for each installed, unconnected host (default no), shows the
  `connect` plan, and applies it for the user scope after a yes.
- It offers `propose_rules` per connected host and shows the `brain.toml`
  diff before writing.
- It offers harvest for each connected host that has a session reader,
  grants `harvest` with a diff, and with one brain and no routes offers the
  `~/**` route.
- Its verify step writes a test episode, searches for it, and deletes it.
- It ends with the summary, each part with its undo command, and next
  steps.
