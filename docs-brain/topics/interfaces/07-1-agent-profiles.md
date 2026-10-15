---
id: 01M3250V0056E3H73CG3BS2TFQ
type: design
title: "Agent profiles (Interfaces: CLI, MCP, agent profiles)"
aliases: ["07 §1"]
tags: [interfaces]
source: "docs/design/07-interfaces.md#1-agent-profiles"
bw-part_of:
  - "[[interfaces]]"
---
# Agent profiles (Interfaces: CLI, MCP, agent profiles)

A profile decides what one host may do in one brain. Every host that may
use a brain reads all of it; privacy inside a brain is being redesigned
([[proposal-privacy|proposal]]). Profiles live in `brain.toml` because they travel
with the brain ([[02-3-braintoml|02 §3]]).

```toml
[agents.default]                 # any host without its own table
write       = ["episodes", "edit"]

[agents.claude-code]
write       = ["episodes", "propose_rules", "consolidate"]
```

| Field | Meaning | Built-in default |
|---|---|---|
| `write` | Subset of `episodes`, `edit`, `propose_rules`, `consolidate`, `harvest`, `review`. `edit` allows checked direct edits of notes ([[05-23-checked-agent-edits\|05 §2.3]]). | `["episodes", "edit"]`; the owner profile has everything |
| `read_origin` | May read the original agent conversations behind episodes ([[05-46-origin-context\|05 §4.6]]). Transcripts hold much more than the episodes kept, so this is off by default. | `false` |

`brain agents grant|revoke HOST CAPABILITY…` edits these tables as one undoable
`config` run (comments kept; a new table starts from what the host may already
do). `read_origin` is granted and revoked the same way, as a flag. A host id
that is not a known host (`claude-code`, `codex`, `antigravity`, `openclaw`,
`cursor`, `generic`, `default`) and has no table yet gets a warning, since it
is most likely a typo, but the change is made. The command also refreshes the `AGENTS.md` block when the default profile's `edit`
changes, since that block tells file-reading agents whether they may edit.
A refusal names the command that allows the action for that host alone, e.g.
`brain agents grant claude-code consolidate`.

Resolution: `--host <id>` → `[agents.<id>]` → `[agents.default]` →
built-in default. The CLI acts as `owner` (everything allowed) because the
person at the terminal owns the brain; `--as <host>` acts with a host's
profile, which is how users check what it may do. Under `--as`, every CLI
write does what that host could do through MCP, or is refused:

| Command | Under `--as <host>` |
|---|---|
| `log` | Needs `episodes`; recorded as `origin: agent`, `inputs: unknown` (or `external`), with the host as agent, like `brain_log_episode` |
| `rule add` | Needs `propose_rules`; saved as a proposal for `brain rule accept`, like `brain_propose_rule` without a way to ask |
| `check`, `mv`, `lint --fix` | Need `edit`: they change notes directly (`--dry-run` previews need nothing) |
| `rule accept`/`reject`, `agents grant`/`revoke`, `undo` | Refused: these are the user's decisions. An agent undoing runs could undo the user's own work, so no capability allows it |

Enforcement points, all in the engine so every interface gets them:

- Writes: tools absent from `write` are refused with `forbidden`. Write
  functions check the profile themselves (`move_note`, `lint.fix`,
  `accept_rule`, `reject_rule`, `profile_run`), so a new interface inherits
  the checks.
- Host brain limits from the user config ([[03-3-choosing-a-brain|03 §3]]).

Profiles are not authentication. A local stdio server trusts the `--host`
argument its host gave it, because the user configured that host. Profiles
prevent accidents and limit what a confused or manipulated agent can
change; they do not stop a malicious program running as the user, which
could read and write the files anyway ([[security-and-privacy|10]]).
