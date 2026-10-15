---
id: 01M3250V00AH795MMV4A3ZPR1A
type: design
title: "Choosing a brain"
aliases: ["03 §3"]
tags: [config-and-storage]
source: "docs/design/03-config-and-storage.md#3-choosing-a-brain"
bw-part_of:
  - "[[config-and-storage]]"
---
# Choosing a brain

Every CLI command and MCP call resolves exactly one brain. First
match wins:

| # | Source | Example |
|---|---|---|
| 1 | Explicit argument | `brain search --brain work …`, MCP tool argument `brain: "work"` |
| 2 | Environment variable | `BRAIN_WIKI_BRAIN=work` (a name or a path) |
| 3 | Project file, nearest ancestor of the working directory | `.brain-wiki.toml` containing `brain = "work"` |
| 4 | Host default | `[hosts.claude-code] brain = "work"` (the MCP server knows its host id) |
| 5 | User default | `default = "personal"` |
| 6 | Current directory is inside a brain | Walking up finds `brain.toml` |

If nothing matches, the command fails with a message that suggests
`brain init`.

**Host limits.** When `[hosts.<id>] brains` is set, a selection outside
that list is refused for that host, whichever source produced it. This is
how a user keeps, say, a work brain away from a personal assistant.
`brain brains limit HOST BRAIN...` sets the list and `unlimit HOST` clears
it; a host default outside the new list moves to its first brain, since it
would only be refused.

**Project files** name a brain, not a path, so a repository can carry one
without exposing anyone's directory layout. If the named brain does not
exist for this user, resolution silently continues with the next source.

**Why a brain is the unit of separation.** Unrelated spheres (an
employer's knowledge and a personal life) differ in who owns them, where
they may be stored, and which models may process them. Separate brains
make that boundary a directory boundary, which every tool understands,
and keep relations from crossing it. Every host that may use a brain reads
all of it; finer-grained privacy inside a brain is being redesigned
([[proposal-privacy|proposal]]).
