---
id: 01M3250V001WJVG4NQR5SMTCS1
type: guide
title: "Commands"
tags: [user-guide]
source: "docs/user/reference.md#commands"
bw-part_of:
  - "[[user-reference]]"
---
# Commands

Global options: `--brain NAME|PATH`, `--as HOST` (act with that host's
profile), `--json`, `--version`. `brain <command> --help`
lists each command's options.

| Command | Does |
|---|---|
| `brain version` | Print the version |
| `brain init [PATH] [--name N] [--git] [--no-register]` | Create a brain and register it |
| `brain brains [list \| add NAME PATH \| remove NAME [--purge-state] \| rename OLD NEW \| default NAME]` | Manage registered brains |
| `brain doctor` | Check configuration, brains, SQLite, and agents |
| `brain setup [--guide]` | Set up step by step in the terminal; `--guide` prints the steps for an AI agent to walk you through |
| `brain list` | Brains you (or `--as HOST`) may use, with what each holds |
| `brain orient` | The briefing, as agents see it |
| `brain topics [SLUG]` | The topic tree with note counts |
| `brain search [QUERY] [--topic T] [--type T] [--tag T] [--where K=V] [--since D] [--until D] [--sort relevance\|recent\|title] [--intent …] [--count] [--facets] [--paths] [--limit N] [--cursor C] [--no-episodes \| --include archived_episodes]` | Search, or browse with an empty query |
| `brain read TARGET [--mode outline\|full\|section\|raw] [--section H]` | Read a note, hub, or episode |
| `brain neighbors TARGET [--rel R] [--direction out\|in\|both] [--depth N] [--limit N] [--paths]` | Follow a note's relations |
| `brain notes`, `outline`, `links`, `backlinks`, `tags`, `types`, `recent`, `orphans`, `unresolved` | Quick browsing; listings take `--count`, `--paths`, `--limit`, `--cursor`; `tags` and `types` take `--counts`; `notes` filters like `search` (`--topic`, `--type`, `--tag`, `--sort`, `--facets`) |
| `brain check [PATH…] [--adopt] [--allow-shrink]` | Validate and record direct edits; with no paths, list edits not yet recorded |
| `brain restore PATH` | Put a note back to its last recorded version |
| `brain index [--rebuild \| --status]` | Inspect or rebuild the index |
| `brain log [TEXT \| -] [--topic T] [--claim C] [--agent HOST] [--inputs …]` | Write an episode |
| `brain rule add TEXT [--quote Q] [--replaces ID] \| list \| accept ID \| reject ID` | Rules |
| `brain consolidate --prepare [--topic T] [--max-episodes N] [--out FILE]`, `--apply OPS.json --run RUN [--dry-run]` | Drive consolidation yourself (agents use `brain_consolidate_*`) |
| `brain review list \| show RUN \| accept RUN \| reject RUN` | Proposals waiting for review |
| `brain runs [list \| show RUN]`, `brain undo [RUN] [--force]` | Run history and undo |
| `brain lint [PATH…] [--fix [--dry-run]] [--profile strict\|migrate] [--select C] [--ignore C] [--staged] [--changed] [--install-hook]` | Check the format |
| `brain report` | Regenerate `reports/` |
| `brain mv SRC DST [--dry-run]` | Move a note, or a topic folder with its notes, and rewrite links |
| `brain harvest [--from HOST] [--since 30d] [--project P] [--raw \| --distill PRESET] [--apply [--dry-run]] [--status]` | Harvest sessions; without `--apply`, list them |
| `brain origin EPISODE [--turns A-B]` | Show an episode's original conversation |
| `brain connect HOST [--scope user\|project] [--print] [--force] [--dry-run] [--uninstall]` | Connect an agent |
| `brain import PATH (--overlay [--phase N] \| --into BRAIN \| --to-episodes [--agent HOST] [--untrusted]) [--topic T] [--apply]`, `brain import --from HOST [PATH] [--topic T] [--apply]` | Import; without `--apply`, a dry run |
| `brain viz [--topic T] [--port P] [--no-open] [--export FILE.html\|.json\|.graphml]` | The brain map |
| `brain bench [SUITE…] [--sizes 1k,10k] [--backends …] [--out DIR] [--compare A B] [-q]` | Evaluation bench |
| `brain mcp [--host HOST]` | The MCP server, started by agent hosts |
