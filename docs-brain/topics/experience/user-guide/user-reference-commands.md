---
id: 01M3250V001WJVG4NQR5SMTCS1
type: guide
title: "Commands"
source: "docs/user/reference.md#commands"
---
# Commands

Every command takes the global options `--brain NAME|PATH`, `--as HOST` (act
with that agent app's profile), and `--json`, before or after the command
name. `brain --version` prints the version, and `brain --install-completion`
installs tab completion for your shell. `brain <command> --help` and
`brain <command> <subcommand> --help` list each command's options.

The commands, in the order `brain --help` lists them:

| Command | Does |
|---|---|
| `brain init [PATH] [--name N] [--git] [--no-register]` | Create a brain and register it |
| `brain brains [list \| add NAME PATH \| remove NAME [--purge-state] \| rename OLD NEW \| default NAME \| limit HOST BRAIN… \| unlimit HOST]` | List and manage registered brains |
| `brain agents [list \| grant HOST CAP… [--dry-run] \| revoke HOST CAP… [--dry-run]]` | Show or change what each agent app may do |
| `brain doctor` | Check configuration, brains, SQLite, agent apps, and commit jobs |
| `brain setup [--guide]` | Set up step by step |
| `brain orient` | Print the briefing agents get |
| `brain search [QUERY] [options]` | Search, or browse with an empty query |
| `brain read TARGET [--mode outline\|full\|section\|raw] [--section H]` | Read a note, hub, or episode |
| `brain neighbors TARGET [--direction out\|in\|both] [--depth N] [--limit N] [--paths]` | Follow a note's links and backlinks |
| `brain topics [TOPIC]` | The topic tree with note counts |
| `brain links TARGET` | What a note links to |
| `brain backlinks TARGET` | What links to a note |
| `brain tags [--counts]` | Tags in use |
| `brain types [--counts]` | Note types in use |
| `brain orphans` | Notes nothing links to |
| `brain unresolved` | Links that resolve to no note |
| `brain index [--rebuild \| --status]` | Show index counts, or rebuild it |
| `brain rules add TEXT [--quote Q] [--replaces ID] \| list \| accept ID \| reject ID` | Manage standing rules |
| `brain mv SRC DST [--dry-run]` | Move a note or topic folder, rewriting links |
| `brain validate [PATH…]` | Check the frontmatter of notes you created or edited |
| `brain consolidate --prepare [--topic T] [--max-episodes N] [--agent HOST] [--unowned] [--all] [--out FILE]`, `brain consolidate --done EPISODE[:PATTERN:NOTE]…` | Gather pending episodes, then archive the ones handled with what came of each |
| `brain review list \| show ID \| accept ID \| reject ID` | Agents' rule proposals waiting for you |
| `brain commit [--settle 2m] [--no-fetch] [--push] [--dry-run]` | Commit direct edits to git and sync with origin |
| `brain schedule [list] \| add commit [--every 15m] [--push] [--dry-run] \| remove commit [--dry-run]` | OS jobs that run `brain commit` |
| `brain runs [list \| show [RUN]]` | Run history on this device |
| `brain undo [RUN] [--force]` | Undo a run |
| `brain lint [PATH…] [options]` | Check the brain against the format |
| `brain report` | Regenerate `reports/` |
| `brain harvest [options]`, `brain harvest enable HOST… \| disable HOST… \| route PATTERN BRAIN` | Turn agent sessions into episodes |
| `brain origin EPISODE [--turns A-B]` | Show the conversation an episode came from |
| `brain connect HOST [--scope user\|project] [--print] [--force] [--dry-run] [--uninstall]` | Connect an agent app |
| `brain mcp [--host HOST]` | The stdio MCP server, started by agent apps |
| `brain import PATH --overlay [--phase 0\|1\|2]` or `brain import PATH --into BRAIN` | Adopt or copy existing Markdown |
| `brain viz [BRAIN] [--topic T] [--port P] [--host ADDRESS] [--no-open] [--export FILE]` | Open the 3D brain map |
| `brain obsidian [BRAIN]` | Open the brain's folder as a vault in Obsidian |
| `brain bench [SUITE…] [--sizes 1k,10k] [--backends …] [--out DIR] [--compare A B] [-q]` | Run the evaluation bench |

## Subsections
- [[user-reference-brains-and-agents]]: Brains and agents
- [[user-reference-search-and-read]]: Search and read
- [[user-reference-writing]]: Writing
- [[user-reference-commits-and-schedules]]: Commits and schedules
- [[user-reference-lint-runs-and-undo]]: Lint, runs, and undo
- [[user-reference-harvest-and-origin]]: Harvest and origin
- [[user-reference-connect-import-viz-and-bench]]: Connect, import, viz, and bench
