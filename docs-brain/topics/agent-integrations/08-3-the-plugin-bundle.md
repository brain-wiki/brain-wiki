---
id: 01M3250V00JF8ZQ7QM17Q7DFAS
type: design
title: "The plugin bundle"
aliases: ["08 §3"]
tags: [agent-integrations]
source: "docs/design/08-agent-integrations.md#3-the-plugin-bundle"
---
# The plugin bundle

The repository root is the plugin ([[13-1-repository-layout|13 §1]]).
One skill and one MCP server are described once per host format:

| File | Read by | Content |
|---|---|---|
| `plugin.json` | Codex / ChatGPT, OpenClaw (Agent Plugins format); Antigravity | `$schema` (Agent Plugins 1.0), `name: brain-wiki`, `version`, `description`, `license`, `repository`, and `extensions["com.openai"]` (display name, category, hooks path). Antigravity's published schema lists only `name` and `description`, but `agy` accepts the full Agent Plugins manifest and loads the plugin's skills, MCP server, rules, and hooks (T-1). |
| `mcp.json` | Agent Plugins hosts | `$schema` (Agent Plugins MCP 1.0), server `brain-wiki`: `type: stdio`, `command: uvx`, `args: [--from, brain-wiki==<version>, brain, mcp, --host, auto]` |
| `.mcp.json` | Claude Code; OpenClaw (which reads the repo as a Claude-format bundle) | Same server, `--host auto`; the server prefers the MCP client's self-reported name over environment guesses |
| `mcp_config.json` | Antigravity | Same server, `--host antigravity` (no `type` field in this format) |
| `.claude-plugin/plugin.json`, `.claude-plugin/marketplace.json` | Claude Code; also read by the ChatGPT desktop app as a legacy-compatible marketplace and by OpenClaw `--marketplace` | Manifest; a marketplace with one entry whose source is the repository root |
| `rules/brain-wiki.md` | Antigravity | `trigger: always_on` rule carrying the static instruction block (§3.2) |
| `skills/` (`brain`, `brain-setup`, `brain-maintain`) | All plugin hosts | The skills (§3.1) |

**No hooks by default.** Agents learn about the brains from the static
instruction block (§3.2) and the `brain_list` and `brain_orient` tools, which
work on every host, so the marketplace bundle ships no hooks. Hosts with a
session-start event can still inject the briefing: `brain connect <host>
--briefing-hook` adds `SessionStart` (Claude Code, Codex) or `PreInvocation`
(Antigravity) to the materialized copy. `brain connect <host> --capture` adds
`PostToolUse` (taint), `Stop` (prompted capture), and `PreCompact` /
`SessionEnd` (raw capture, async), using the absolute path of the installed
`brain`. For Codex that copy also points `extensions["com.openai"].hooks`
at its own hooks file, because that field replaces Codex's default hook
discovery.

**Why `uvx` in plugin files.** A plugin installed from a marketplace cannot
assume `brain` is on the user's `PATH`, and some formats have no
plugin-root variable for paths. `uvx --from brain-wiki==<version>` runs
the matching release with only `uv` installed. `brain connect` instead
writes the absolute path of the installed `brain`, which starts faster
([[08-8-brain-connect|§8]]). The version pin is written by
`scripts/sync_versions.py`, so the plugin and the package can never
disagree.

**Hooks come only from `brain connect`.** It writes them with the absolute
path of the installed `brain`, which answers in about 0.1 s. Marketplace
copies cannot do that, and online `uvx` re-resolves against the package
index on every call (23 seconds per call behind a slow package index, T-10),
which a hook that runs before every model call cannot afford; that is one
more reason the bundle ships none.

The MCP server, which starts once per session, keeps plain online `uvx`:
MCP configs take a command and arguments, and wrapping it in `sh -c` would
break the server on Windows (D23). Behind a slow index its start can take a minute or
more; `brain connect` avoids the wait.

## Subsections
- [[08-31-the-skills]]: The skills (Agent integrations)
- [[08-32-the-static-instruction-block]]: The static instruction block

## Relations
- part_of [[agent-integrations]]
