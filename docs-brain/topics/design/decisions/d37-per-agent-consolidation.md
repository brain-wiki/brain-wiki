---
id: 01M3250V006YPJ2ZX6NBDBPXSJ
type: decision
title: "D37: Each agent consolidates its own episodes, in a session or on a schedule"
aliases: ["D37"]
source: "docs/decision/d37-per-agent-consolidation.md"
---
# D37: Each agent consolidates its own episodes, in a session or on a schedule

Status: accepted.
Argued in: [[write-path-4-consolidation|write path §4]], [[write-path-48-scheduled-consolidation|write path §4.8]], [[agent-integrations-7-unattended-agent-mode|agent integrations §7]].

Episodes have an owner, the `bw-agent` the file names, and an agent consolidates its own: it can reopen the conversation an episode came from, through its host's session reader on the machine where the session ran. It takes another agent's or the unowned episodes only when the user asks; the request is the consent. Each episode gets an outcome, one of five patterns (record, playbook, file, distill, skip), and `--done` refuses to archive an episode until every note named for it cites it in `bw-sources`.

Capture needs no capability, and capabilities in general are not a security boundary: an agent with file access can edit `brain.toml` itself, so git history and lint are the backstop.

Scheduled consolidation is an OS job per brain and host, like the commit job (D35). It starts the host's own CLI unattended with only file tools and brain-wiki's MCP server, validates, commits, and records the outcome, which orientation and `brain doctor` show. `brain schedule add consolidate` refuses unless a dry run passes. Only Claude Code has a verified unattended mode; other hosts consolidate in sessions.

### Alternatives considered

- A shared pool any agent consolidates, with episodes handed to another agent after a timeout. Another agent cannot read the origin conversation, and a timer moves work the user did not ask to move; orientation shows who is waiting instead.
- A confirmation step before an agent takes another agent's episodes. It cannot stop an agent that reads the files, and the user's request already is the consent.
- An `episodes` capability to make a host read-only. It cannot be enforced against an agent with file access, and `brain import` and `brain harvest` bypassed it.
- The scheduled maintenance removed before 0.1: routine templates for desktop schedulers, a headless backend that returned JSON operations, and a `[consolidate] device` name. It failed silently when a profile could not write, device names broke when machines were renamed or synced, and desktop schedulers could not be configured from outside. Scope by owner and "readable here" needs no device name, the OS scheduler needs no desktop app, and the dry-run check plus failure reporting replace silent failure.

## Related
- [[d35-git-history]]: D35: Git is the history of direct edits
