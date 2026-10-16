---
id: 01M3250V00A6WZKBRKAHJD8C7K
type: design
title: "Choosing a brain"
aliases: ["Config and storage §3"]
source: "docs/design/config-and-storage.md#3-choosing-a-brain"
---
# Choosing a brain

Every CLI command and MCP call resolves exactly one brain. The first source
that names a brain wins:

| # | Source | Example |
|---|---|---|
| 1 | Explicit argument | `brain search --brain work …`, MCP tool argument `brain: "work"` |
| 2 | Environment variable | `BRAIN_WIKI_BRAIN=work` (a name or a path) |
| 3 | Project file, in the working directory or nearest ancestor | `.brain-wiki.toml` containing `brain = "work"` |
| 4 | Host default | `[hosts.claude-code] brain = "work"` (the MCP server knows its host id) |
| 5 | User default | `default = "personal"` |
| 6 | The working directory is inside a brain | Walking up finds `brain.toml` |

- Each source may give a registered name or a path to a brain folder.
- An argument or environment variable that names nothing is an error
  (`not_found`). A project file, host default, or user default that names
  nothing is skipped.
- When nothing matches, the command fails with `not_configured`. With
  brains registered, the message suggests `brain brains default NAME` or
  `--brain NAME`. With none, it suggests `brain setup`.

When `[hosts.<id>] brains` is set, a brain outside that list is refused for
that host (`forbidden`), whichever source chose it. This keeps a work brain
away from a personal assistant. `brain brains limit HOST BRAIN...` sets the
list and `unlimit HOST` clears it. A host default outside the new list
moves to its first brain, since it would only be refused.

A project file should name a brain rather than a path, so a repository can
carry one without exposing anyone's directory layout. If the named brain is
not registered for this user, resolution moves on to the next source.

A brain is the unit of separation. Unrelated spheres (an employer's
knowledge and a personal life) differ in who owns them, where they may be
stored, and which models may process them. Separate brains make that
boundary a directory boundary and keep links from crossing it. Every host
that may use a brain reads all of it
([[d10-no-access-control-in-a-brain|D10]]; finer control is a
[[proposal-privacy|proposal]]).
