---
id: 01M3250V00TW9J1MGH3AH4NAQ9
type: design
title: "Agent profiles (CLI and MCP)"
aliases: ["CLI and MCP §1"]
source: "docs/design/cli-and-mcp.md#1-agent-profiles"
---
# Agent profiles (CLI and MCP)

A profile decides what one host may do in one brain. Every host that may
use a brain reads all of it; privacy inside a brain is being redesigned
([[proposal-privacy|proposal]]). Profiles live in `brain.toml` because they travel
with the brain ([[brain-format-3-braintoml|brain format §3]]).

```toml
[agents.default]                 # any host without its own table
write       = ["episodes", "edit"]

[agents.claude-code]
write       = ["episodes", "edit", "propose_rules", "harvest"]
```

| Field | Meaning | Built-in default |
|---|---|---|
| `write` | Subset of `episodes` (log episodes), `edit` (edit notes directly, [[write-path-23-direct-edits\|write path §2.3]], and run brain-wiki's writers that change notes: `mv`, `lint --fix`, `consolidate --done`, `commit --as`), `propose_rules`, `harvest` (the in-agent harvest recipe). | `["episodes", "edit"]`; the owner profile has everything |
| `read_origin` | May read the original agent conversations behind episodes ([[write-path-46-origin-context\|write path §4.6]]). Transcripts hold much more than the episodes kept, so this is off by default. | `false` |

`brain agents grant|revoke HOST CAPABILITY…` edits these tables as one undoable
`config` run (comments kept; a new table starts from what the host may already
do). `read_origin` is granted and revoked the same way, as a flag. Granting
an unknown capability is a usage error. The 0.1 capabilities `consolidate`
and `review` no longer exist: a `brain.toml` that still lists them loads, and
they are ignored. A host id that is not a known host (`claude-code`,
`codex`, `antigravity`, `openclaw`, `cursor`, `generic`, `default`) and has
no table yet gets a warning, since it is most likely a typo, but the change
is made. The command also refreshes the `AGENTS.md` block when the default
profile's `edit` changes, since that block tells file-reading agents whether
they may edit.
A refusal names the command that allows the action for that host alone, e.g.
`brain agents grant claude-code edit`.

Resolution: `--host <id>` → `[agents.<id>]` → `[agents.default]` →
built-in default. The CLI acts as `owner` (everything allowed) because the
person at the terminal owns the brain; `--as <host>` acts with a host's
profile, which is how users check what it may do. Under `--as`, every CLI
write does what that host could do through MCP, or is refused:

| Command | Under `--as <host>` |
|---|---|
| `log` | Needs `episodes`; recorded as `origin: agent`, `inputs: unknown` (or `external`), with the host as agent, like `brain_log_episode` |
| `rules add` | Needs `propose_rules`; saved as a proposal for `brain rules accept` (or `brain review accept`), like `brain_propose_rule` without a way to ask |
| `mv`, `lint --fix`, `consolidate --done` | Need `edit`: they change notes or the inbox (`--dry-run` previews need nothing) |
| `commit` | Needs `edit`; the trailer names the host; `--push` is refused, since pushing publishes the brain |
| `validate`, `consolidate --prepare`, reads | Need nothing |
| `rules accept`/`reject`, `review accept`/`reject`, `agents grant`/`revoke`, `schedule`, `undo` | Refused: these are the user's decisions. An agent undoing runs could undo the user's own work, so no capability allows it |

Enforcement points, all in the engine so every interface gets them:

- Writes: tools absent from `write` are refused with `forbidden`. Write
  functions check the profile themselves (`move_note`, `lint.fix`,
  `consolidate.done`, `accept_rule`, `reject_rule`, `profile_run`), so a new
  interface inherits the checks.
- Profiles are read from `brain.toml` on every MCP call (§3.7), so a grant
  or revoke applies to the agent's next tool call.
- Host brain limits from the user config ([[config-and-storage-3-choosing-a-brain|config and storage §3]]).

Profiles are not authentication. A local stdio server trusts the `--host`
argument its host gave it, because the user configured that host. Profiles
prevent accidents and limit what a confused or manipulated agent can
change; they do not stop a malicious program running as the user, which
could read and write the files anyway ([[security-and-privacy|security]]).
