---
id: 01M3250V004RN0TRM010FSWKQX
type: design
title: "Host ids"
aliases: ["08 §2"]
tags: [agent-integrations]
source: "docs/design/08-agent-integrations.md#2-host-ids"
bw-part_of:
  - "[[agent-integrations]]"
---
# Host ids

Stable identifiers used in agent profiles, user config, episode
provenance, and `--host` flags:

`claude-code`, `codex`, `antigravity`, `openclaw`, `cursor`, `generic`.

When a hook or server is started without an explicit host (a shared hooks
file read by two hosts), the host is detected in this order:

1. the `BRAIN_WIKI_HOST` environment variable;
2. the payload's `transcript_path`: under `.claude/` is Claude Code, under
   `.codex/` is Codex (Codex session ids also start with `thr_`);
3. `PLUGIN_ROOT` without `.claude/` paths suggests an Agent Plugins host;
   `CLAUDE_PLUGIN_ROOT` alone suggests Claude Code. Codex sets both
   variables for compatibility, which is why the payload check comes first.

An undetectable host is `generic`.
