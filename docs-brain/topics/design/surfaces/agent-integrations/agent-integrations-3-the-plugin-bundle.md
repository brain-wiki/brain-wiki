---
id: 01M3250V00K16258CBJT9Q6G4T
type: design
title: "The plugin bundle"
aliases: ["Agent integrations §3"]
source: "docs/design/agent-integrations.md#3-the-plugin-bundle"
---
# The plugin bundle

The repository root is the plugin
([[d14-repo-is-plugin-root|D14]],
[[engineering-1-repository-layout|engineering §1]]). One set of skills
and one MCP server are described once per host format:

| File | Read by | Holds |
|---|---|---|
| `plugin.json` | Codex and ChatGPT, OpenClaw, Cursor, Antigravity | The Agent Plugins 1.0 manifest |
| `mcp.json` | Agent Plugins hosts | The server, `type: stdio`, `--host auto` |
| `.mcp.json` | Claude Code; OpenClaw (as a Claude-format bundle) | The server, `type: stdio`, `--host auto` |
| `mcp_config.json` | Antigravity | The server, `--host antigravity`, no `type` field |
| `.claude-plugin/plugin.json`, `.claude-plugin/marketplace.json` | Claude Code; ChatGPT desktop; OpenClaw `--marketplace` | Manifest, and a marketplace with one plugin at the repository root |
| `server.json` | The MCP Registry | The PyPI package `brain-wiki`, run with `uvx`, argument `mcp` |
| `rules/brain-wiki.md` | Antigravity | The instruction block (§3.2) as a `trigger: always_on` rule |
| `skills/` | All plugin hosts | The three skills (§3.1) |

- `plugin.json` holds `$schema`, `name: brain-wiki`, `version`,
  `description`, `author`, `repository`, `license`, `keywords`, and
  `extensions["com.openai"]`: the onboarding skill (`brain-setup`), display
  name and descriptions, category, and default prompts.
- Antigravity accepts the full manifest (T-1,
  [[host-antigravity-notes|Antigravity]]).
- Every plugin MCP entry runs `uvx --from brain-wiki==<version> brain mcp`.
  `scripts/sync_versions.py` writes the version pin and regenerates
  `rules/brain-wiki.md`, so the plugin and the package always agree.

The bundle has no hooks. Agents learn about their brains from the
instruction block and the `brain_list` and `brain_orient` tools, which work
on every host.

Plugin MCP entries use `uvx` because a plugin installed from a marketplace
cannot assume `brain` is on the user's `PATH`, and some formats have no
plugin-root variable for paths. `uvx` runs the matching release with only
`uv` installed. The entry stays a plain command and arguments, since
wrapping it in `sh -c` would break it on Windows
([[d23-plain-uvx-entry|D23]]). Online `uvx` checks the
package index on every start, which took 23 seconds behind a slow index
(T-10), so a marketplace server can take a minute or more to appear.
`brain connect` writes the absolute path of the installed `brain` instead
and avoids the wait (§8).

## Subsections
- [[agent-integrations-31-the-skills]]: The skills (Agent integrations)
- [[agent-integrations-32-the-static-instruction-block]]: The static instruction block
