---
id: 01M3250V00MS60JTPDD562S8K6
type: design
title: "Repository layout"
aliases: ["13 §1"]
tags: [engineering]
source: "docs/design/13-engineering.md#1-repository-layout"
---
# Repository layout

The repository root is also the plugin root for every supported host (D14),
so some root names are reserved by hosts and must only hold plugin content.

```text
brain-wiki/
├── plugin.json                  plugin manifest: Agent Plugins format, also read by Antigravity
├── mcp.json                     MCP server for Agent Plugins hosts (Codex, ChatGPT desktop, OpenClaw)
├── .mcp.json                    MCP server for Claude Code
├── mcp_config.json              MCP server for Antigravity
├── server.json                  MCP Registry entry
├── .claude-plugin/
│   ├── plugin.json              Claude Code plugin manifest
│   └── marketplace.json         marketplace listing this repo as one plugin
├── .codex-plugin/plugin.json    OpenAI overlay (only if root plugin.json lacks extensions["com.openai"])
├── rules/brain-wiki.md          Antigravity rule (trigger: always_on), generated from the static instruction block
├── skills/                      brain, brain-setup, brain-maintain (shared by all hosts; see 15)
│
├── src/brainwiki/               the Python package (§2)
├── tests/                       unit, property, integration tests; synthetic fixtures
├── bench/                       bench scenario definitions (generated data is not committed)
├── docs/                        design/ (these documents) and user/ (user guide)
├── scripts/                     maintainer scripts (version sync, visualizer bundle check)
├── pyproject.toml, uv.lock
├── README.md, LICENSE, CONTRIBUTING.md, SECURITY.md, CHANGELOG.md
├── AGENTS.md                    guide for coding agents working on this repo (see note)
└── .pre-commit-hooks.yaml       exposes `brain lint` to the pre-commit framework
```

**Reserved root names** (interpreted by at least one host when the repo is
installed as a plugin): `plugin.json`, `mcp.json`, `.mcp.json`,
`mcp_config.json`, `settings.json`, `.lsp.json`, `skills/`, `agents/`,
`commands/`, `hooks/`, `rules/`, `output-styles/`, `sidecars/`,
`.claude-plugin/`, `.codex-plugin/`, `.cursor-plugin/`. Nothing else may
use these names.

**Developer instructions must not leak into users' sessions.** Whether any
host loads a plugin-root `AGENTS.md` (or `GEMINI.md`, which Antigravity
treats like `AGENTS.md` in workspaces) into a user's session is unverified.
The repo has no `GEMINI.md`, and its `AGENTS.md` is kept short and opens
with a line telling any agent that is not developing brain-wiki to ignore
it. Test item T-4 in [[14-3-verification-items|14]]
checks this.

## Relations
- part_of [[engineering]]
