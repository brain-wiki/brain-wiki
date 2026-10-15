<!-- mcp-name: io.github.brain-wiki/brain-wiki -->

<p align="center">
  <img src="https://raw.githubusercontent.com/brain-wiki/brain-wiki/main/.github/assets/logo.svg" alt="brain-wiki" width="96" height="96">
</p>

<h1 align="center">brain-wiki</h1>

<p align="center"><strong>One long-term memory for all your AI agents, kept as plain Markdown that you own.</strong></p>

<p align="center">
  <a href="https://github.com/brain-wiki/brain-wiki/actions/workflows/ci.yml"><img src="https://github.com/brain-wiki/brain-wiki/actions/workflows/ci.yml/badge.svg" alt="CI"></a>
  <a href="https://pypi.org/project/brain-wiki/"><img src="https://img.shields.io/pypi/v/brain-wiki" alt="PyPI"></a>
  <a href="https://pypi.org/project/brain-wiki/"><img src="https://img.shields.io/pypi/pyversions/brain-wiki" alt="Python"></a>
  <a href="https://github.com/brain-wiki/brain-wiki/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-Apache--2.0-blue" alt="License"></a>
</p>

Your agents (Claude Code, Codex, Antigravity, Cursor, OpenClaw, or any MCP
client) share one brain: a folder of Markdown notes they search before
answering and keep up to date as they work. It runs on your machine, needs no
server or API keys, and opens in Obsidian.

- **Plain files.** Read, edit, diff, and sync the brain like any folder, or adopt an Obsidian vault as it is.
- **Knows what changed.** Search returns a note together with the notes that replace or contradict it.
- **Safe to let agents write.** Changes are checked, logged, and undoable, and committed when the brain is a git repository.
- **No network calls.** Your own agent does the thinking; brain-wiki stores and checks.

## Quick start

Needs Python 3.11+ and [uv](https://docs.astral.sh/uv/).

**1. Install.**

```sh
uv tool install brain-wiki
```

**2. Set it up.**

- **Recommended:** paste this into your agent (Claude Code, Codex,
  Antigravity, Cursor, OpenClaw, ...):

  > Set up brain-wiki by running `brain setup --guide` and following it.

- **Or, in a terminal:** run `brain setup`, which asks the same questions
  step by step.

Either way, setup explains each choice (where the brain lives, which agents to
connect, what each may do) and shows every change before making it.

**3. Use it.**

> Remember that Lumen keeps attachments next to their notes.

> What did we decide about attachments?

> Consolidate my brain.

In a terminal, `brain viz` opens a local 3D map of your notes.

## How it works

```text
agents ──log──► inbox ──consolidate──► notes (topics/*.md) ◄── you, in Obsidian
  ▲                   (checked ops)            │
  └────────────── search · read ───────────────┘
```

Agents log what they learn to an inbox. When you ask, your agent folds the
inbox into topic notes through small operations that brain-wiki checks before
writing, and `brain undo` reverses any change.

## Status

Alpha: expect breaking changes before 1.0. Known limits:

- No access scopes inside a brain: every connected agent reads all of it. Keep work and personal notes in separate brains.
- Maintenance runs when you ask; there is no scheduler.
- Chat apps that need a remote MCP server (ChatGPT, claude.ai, the Gemini app) are not supported yet.

## Learn more

[Getting started](https://github.com/brain-wiki/brain-wiki/blob/main/docs/user/getting-started.md) ·
[Agents](https://github.com/brain-wiki/brain-wiki/blob/main/docs/user/agents.md) ·
[Maintenance](https://github.com/brain-wiki/brain-wiki/blob/main/docs/user/maintenance.md) ·
[Import a vault](https://github.com/brain-wiki/brain-wiki/blob/main/docs/user/import.md) ·
[Privacy](https://github.com/brain-wiki/brain-wiki/blob/main/docs/user/privacy.md) ·
[Reference](https://github.com/brain-wiki/brain-wiki/blob/main/docs/user/reference.md) ·
[Design](https://github.com/brain-wiki/brain-wiki/blob/main/docs/design/README.md) ·
[Changelog](https://github.com/brain-wiki/brain-wiki/blob/main/CHANGELOG.md)

[Contributing](https://github.com/brain-wiki/brain-wiki/blob/main/CONTRIBUTING.md) ·
[Security](https://github.com/brain-wiki/brain-wiki/blob/main/SECURITY.md) ·
[Apache 2.0](https://github.com/brain-wiki/brain-wiki/blob/main/LICENSE)
([visualizer notices](https://github.com/brain-wiki/brain-wiki/blob/main/src/brainwiki/viz/app/THIRD_PARTY_NOTICES.txt))
