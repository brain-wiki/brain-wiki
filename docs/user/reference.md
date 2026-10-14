# Reference

## Commands

Global options: `--brain NAME|PATH`, `--as HOST` (act with that host's
profile), `--json`, `--version`. `brain <command> --help`
lists each command's options.

| Command | Does |
|---|---|
| `brain version` | Print the version |
| `brain init [PATH] [--name N] [--git] [--no-register]` | Create a brain and register it |
| `brain brains [list \| add NAME PATH \| remove NAME [--purge-state] \| rename OLD NEW \| default NAME]` | Manage registered brains |
| `brain doctor` | Check configuration, brains, SQLite, and agents |
| `brain setup` | Interactive onboarding |
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

## MCP tools

What a connected agent can call. Write tools need the matching capability in
the agent's profile, and `brain_read_origin` needs `read_origin = true`
([privacy.md](privacy.md#agent-profiles)).

| Tool | Does | Needs |
|---|---|---|
| `brain_list` | The brains this agent may use, and what each holds | — |
| `brain_orient` | The briefing: rules, topics, recent changes, inbox | — |
| `brain_search` | Search, or browse with an empty query and filters | — |
| `brain_read` | Read a note, hub, or episode (outline, full, section, raw) | — |
| `brain_neighbors` | Follow a note's relations | — |
| `brain_check` | Validate and record notes the agent edited directly | `edit` |
| `brain_log_episode` | Record a learning in the inbox | `episodes` |
| `brain_propose_rule` | Propose a standing rule; you confirm it | `propose_rules` |
| `brain_consolidate_prepare`, `brain_consolidate_apply` | Fold inbox episodes into notes | `consolidate` |
| `brain_read_origin` | Read the conversation behind an episode | `read_origin = true` |
| `brain_harvest_prepare`, `brain_harvest_apply` | Turn this agent's past sessions into episodes | `harvest` |

Exit codes: 0 success; 1 problems found (lint errors, invalid ops) or a path
that cannot be read or written; 2 usage; 3 not found; 4 conflict (stale,
lock); 5 forbidden by a profile; 10 internal error.

## Files

| Where | What |
|---|---|
| `<brain>/brain.toml` | Settings that travel with the brain: topics, agent profiles, lint, consolidation, budgets |
| `~/.config/brain-wiki/config.toml` | Per machine: registered brains, default brain, per-host brain choice, harvest |
| `~/.local/state/brain-wiki/` | Run records and pre-images (undo), locks, markers for episodes brain-wiki wrote, session and harvest state, connect records, logs |
| `~/.cache/brain-wiki/` | The search index (rebuilt automatically when missing) |
| `~/.local/share/brain-wiki/plugin/<host>/` | Plugin copies written by `brain connect` |

On Windows these live under `%APPDATA%` and `%LOCALAPPDATA%`. Override any
of them with `BRAIN_WIKI_CONFIG`, `BRAIN_WIKI_STATE_DIR`,
`BRAIN_WIKI_CACHE_DIR`, and `BRAIN_WIKI_DATA_DIR`.

## Troubleshooting

| Symptom | Try |
|---|---|
| An agent says brain-wiki is not configured | `brain doctor`; then `brain init` or `brain brains add` |
| Search misses a note you just edited | Wait a second (freshness checks run at most once per second), or `brain index --rebuild` |
| A run was interrupted | `brain doctor` rolls it back |
| A git commit failed after a run | The files changed anyway; `brain doctor` lists the run; commit by hand |
