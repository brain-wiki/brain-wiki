---
id: 01M3250V00TW9J1MGH3AH4NAQ9
type: design
title: "Agent profiles (CLI and MCP)"
aliases: ["CLI and MCP §1"]
source: "docs/design/cli-and-mcp.md#1-agent-profiles"
---
# Agent profiles (CLI and MCP)

A profile decides what one host may do in one brain. Profiles live in
`brain.toml`, so they travel with the brain
([[brain-format-3-braintoml|brain format §3]]). Every host that may use a
brain can read all of it. Privacy inside a brain is a
[[proposal-privacy|proposal]].

```toml
[agents.default]                 # any host without its own table
write = ["edit"]

[agents.claude-code]
write = ["edit", "propose_rules", "harvest"]
read_origin = true
```

| Field | Meaning | Default |
|---|---|---|
| `write` | The capabilities below | `["edit"]` |
| `read_origin` | May read the conversation behind an episode ([[write-path-46-origin-context\|write path §4.6]]) | `false` |

| Capability | Allows |
|---|---|
| `edit` | Editing notes directly ([[write-path-23-direct-edits\|write path §2.3]]), and the writers that change notes or the inbox: `mv`, `lint --fix`, `consolidate --done`, and `commit` under `--as` |
| `propose_rules` | Proposing rules for the user to confirm |
| `harvest` | The in-agent harvest (`brain_harvest_prepare`; `brain_harvest_done` also needs `edit`) |

Capturing an episode needs no capability: every connected host may log
one. An older `brain.toml` that lists `episodes` still loads, and the
entry is ignored.

Profiles are not a security boundary. An agent with file tools can edit
`brain.toml` itself; git history and lint are the backstop. Profiles say
what a host is expected to do, decide what orientation teaches it, and
limit brain-wiki's own commands.

`read_origin` is off by default because a transcript holds much more than
the episodes kept from it. The owner profile has every capability and
`read_origin`.

For host H, brain-wiki uses `[agents.H]` if it exists, else
`[agents.default]`, else the built-in default. The MCP server takes H from
`--host`; the CLI acts as the owner unless `--as H` is given. `--as` lets
the user check what a host may do.

`brain agents grant|revoke HOST CAPABILITY...` changes a profile as one
undoable `config` run that keeps the file's comments:

- `read_origin` is granted and revoked like a capability. An unknown
  capability is a usage error.
- A host without a table gets one that starts from what it may do now.
- An unknown host id with no table yet gets a typo warning, and the change
  is still made.
- A change to the default profile's `edit` also rewrites the brain's
  `AGENTS.md` block, which tells file-reading agents whether they may edit.
- The 0.1 capabilities `consolidate` and `review` still load and are
  ignored. The next grant or revoke for that host drops them.

A refusal names the command that allows the action for that host alone,
for example `brain agents grant claude-code edit`.

Under `--as HOST`, a CLI write does what the host could do through MCP, or
is refused:

| Command | Under `--as HOST` |
|---|---|
| `rules add` | Needs `propose_rules`. Saved as a proposal for `brain rules accept` (or `brain review accept`). |
| `mv`, `lint --fix`, `consolidate --done` | Need `edit`. Their `--dry-run` previews need nothing. |
| `commit` | Needs `edit`, also with `--dry-run`. The commit trailer names the host. `--push` is refused. |
| `origin` | Needs `read_origin`. |
| `validate`, `consolidate --prepare`, reads | Need nothing. |
| `rules accept`/`reject`, `review accept`/`reject`, `agents grant`/`revoke`, `schedule add`/`remove`, `consolidate --run`, `undo` | Refused. These are the user's decisions. |
| `import`, `harvest` | Not checked: they run with the owner's rights. `harvest` only lists sessions. |

No capability lets an agent undo runs, because it could undo the user's
own work.

The write functions `move_note`, the `lint` fixer, `consolidate.done`,
`accept_rule`, `reject_rule`, and `profile_run` check the profile
themselves, so a new interface inherits those checks. The other checks
live in the MCP tools and CLI handlers. Which brains a host may use is set
in the user config
([[config-and-storage-3-choosing-a-brain|config and storage §3]]).

Profiles are not authentication. A local stdio server trusts the `--host`
argument its host gave it, because the user configured that host. Profiles
prevent accidents and limit what a confused or manipulated agent can
change. They do not stop a malicious program running as the user, which
can read and write the files anyway
([[security-and-privacy|security]]).
