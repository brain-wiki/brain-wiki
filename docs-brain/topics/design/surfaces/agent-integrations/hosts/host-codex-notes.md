---
id: 01M3250V00647XFD842RRN35W9
type: design
title: "Notes (Codex (CLI and ChatGPT desktop))"
source: "docs/design/hosts/codex.md#notes"
---
# Notes (Codex (CLI and ChatGPT desktop))

- `brain connect codex` runs `codex plugin marketplace add <dir>` on its
  plugin copy, and the user then enables brain-wiki in Codex's plugin
  browser. Without `codex` on `PATH`, it prints the folder to add. The copy
  runs the installed `brain` with `--host codex`.
- A marketplace install runs `--host auto`. The server recognizes Codex by
  its client name, or by `PLUGIN_ROOT` and `CLAUDE_PLUGIN_ROOT` both being
  set.
- `extensions["com.openai"]` in `plugin.json` supplies the display name,
  descriptions, category, default prompts, and `brain-setup` as the
  onboarding skill.
- Codex rewrites tool names to `[A-Za-z0-9_]`. brain-wiki's are snake case
  already.
- Codex reports web search as a hosted tool. The reader treats a rollout's
  `web_search_call` items as untrusted, like web fetches.
- The reader treats a session with a parent thread, or a subagent source,
  as a subagent, and a session whose source is `exec` as headless.
