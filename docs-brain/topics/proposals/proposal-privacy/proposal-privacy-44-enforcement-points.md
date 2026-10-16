---
id: 01M3250V003M9G5J26178E5XVC
type: proposal
title: "Enforcement points"
aliases: ["Privacy §4.4"]
source: "docs/proposal/privacy.md#44-enforcement-points"
---
# Enforcement points

| Point | Mechanism | Strength |
|---|---|---|
| Tool reads (search, read, orient, neighbors, list) | Filter by the reader's trust before ranking; a hidden note reads as missing | Hard, for MCP and CLI |
| Direct file reads | `brain_list` gives the path only to readers trusted at every level in the brain | Soft |
| Automatic injection, if hooks return | Only `open` content | Hard |
| Consolidation and harvest | Packets hold only what the reader may see | Hard |
| Direct edits | `brain validate` and lint report a changed `bw-privacy` and a new link to a more private note | Soft |
| Tool calls after a private read | Mark the session exposed; ask before external tools run | Medium, host-dependent |
| Outputs | Read results label `private` content as not for posting | Soft |
| Exports | `brain viz --export` leaves out non-`open` notes unless `--include private` | Hard |

- Any program can read files, so `brain_list` can only point readers that
  are not trusted to the tools.
- Direct edits are plain file writes. Validation reports a violation after
  the fact, and git or the owner reverts it. P4 also needs a lint rule for a
  note that cites a source more private than itself.
- The exposure mark guards against giving private content to an untrusted
  third party. It targets text in a web page or issue that steers an agent
  which has just read private notes into sending them somewhere. A pre-tool
  hook asks the user before external tools run, where the host has one
  (Claude Code's `PreToolUse` can ask or deny). Elsewhere, the read result
  says to keep the content local.
