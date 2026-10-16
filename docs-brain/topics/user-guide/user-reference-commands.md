---
id: 01M3250V001WJVG4NQR5SMTCS1
type: guide
title: "Commands"
tags: [user-guide]
source: "docs/user/reference.md#commands"
---
# Commands

Global options: `--brain NAME|PATH`, `--as HOST` (act with that host's
profile), and `--json`, before or after the command. `brain --version` prints
the version. `brain <command> --help` (and
`brain <command> <subcommand> --help`, e.g. `brain rules add --help`) lists
each command's options. `brain --install-completion` installs tab completion
for your shell.

| Command | Does |
|---|---|
| `brain init [PATH] [--name N] [--git] [--no-register]` | Create a brain and register it |
| `brain brains [list \| add NAME PATH \| remove NAME [--purge-state] \| rename OLD NEW \| default NAME \| limit HOST BRAIN… \| unlimit HOST]` | Bare `brain brains` lists the brains you (or `--as HOST`) may use, with what each holds. The rest manage registered brains, and which ones each agent app may use. Names use lowercase letters, digits, and hyphens; `rename` also renames the brain in the default, `[hosts.*]`, and harvest routes |
| `brain agents [list \| grant HOST CAP… [--dry-run] \| revoke HOST CAP… [--dry-run]]` | What each agent app may do in a brain, and changing it (undoable). CAP is a write capability or `read_origin`; an unknown host id gets a warning |
| `brain doctor` | Check configuration, brains, SQLite, and agents |
| `brain setup [--guide]` | Set up step by step in the terminal; `--guide` prints the steps for an AI agent to walk you through |
| `brain orient` | The briefing, as agents see it |
| `brain topics [SLUG]` | The topic tree with note counts |
| `brain search [QUERY] [--topic T] [--type T] [--tag T] [--where K=V] [--since D] [--until D] [--sort relevance\|recent\|title] [--intent …] [--count] [--facets] [--paths] [--limit N] [--cursor C] [--no-episodes \| --include archived,episodes,archived_episodes]` | Search, or browse with an empty query: `brain search "" --since 7d` lists recent notes, newest first. `--limit` is 1–50; `--where` matches any frontmatter key (a list matches any item); an unknown `--topic` is not found |
| `brain read TARGET [--mode outline\|full\|section\|raw] [--section H]` | Read a note, hub, or episode; `--mode outline` shows its headings and claims. `raw` prints the file byte for byte, without banners; `--section` alone implies `--mode section` |
| `brain neighbors TARGET [--rel R] [--direction out\|in\|both] [--depth N] [--limit N] [--paths]` | Follow a note's relations by their meaning (e.g. what depends on it), not by which file declares them (`--depth` 1–3, `--limit` 1–100) |
| `brain links`, `backlinks`, `tags`, `types`, `orphans`, `unresolved` | Quick listings: `links` is what a note links to as written in its file (body links and typed relations), `backlinks` what links to it from other files. They take `--count`, `--paths`, `--limit`, `--cursor`; `tags` and `types` take `--counts`, and their `--paths` prints one name per line |
| `brain check [PATH…] [--adopt] [--allow-shrink]` | Record notes you edited by hand: validates each one, then records it; refuses edits that add lint errors. With no paths, lists hand edits not yet recorded |
| `brain restore PATH` | Put a note back to its last recorded version |
| `brain index [--rebuild \| --status]` | Inspect or rebuild the index |
| `brain log [TEXT \| -] [--topic T] [--claim C] [--agent HOST] [--inputs …]` | Write an episode; warns when a `--topic` does not exist yet |
| `brain rules add TEXT [--quote Q] [--replaces ID] \| list \| accept ID \| reject ID` | Rules; with `--as HOST`, `add` saves a proposal |
| `brain consolidate --prepare [--topic T] [--max-episodes N] [--out FILE.json]`, `--apply OPS.json --run RUN [--dry-run]` | Drive consolidation yourself (agents use `brain_consolidate_*`) |
| `brain review list \| show ID \| accept ID \| reject ID` | Proposals waiting for you: consolidations and edits (`run-…`) and agents' rule proposals (`r-…`); `list` marks each one's kind |
| `brain runs [list \| show [RUN]]`, `brain undo [RUN] [--force]` | Run history and undo |
| `brain lint [PATH…] [--fix [--dry-run]] [--profile strict\|migrate] [--select C] [--ignore C] [--staged] [--changed] [--install-hook]` | Check the format; unknown codes are a usage error |
| `brain report` | Regenerate `reports/` |
| `brain mv SRC DST [--dry-run]` | Move a note, or a topic folder with its notes, and rewrite links and the topic's `brain.toml` entry |
| `brain harvest [--from HOST] [--since 30d] [--project P] [--raw \| --distill PRESET] [--apply [--dry-run]] [--status]` | Harvest sessions; without `--apply`, list them; with `--apply --dry-run`, list the turn ranges it would write |
| `brain harvest enable HOST… \| disable HOST… \| route PATTERN BRAIN` | Turn harvest on or off per app; send sessions from matching folders to a brain |
| `brain origin EPISODE [--turns A-B]` | Show an episode's original conversation; EPISODE is an id or a path (in the brain, or absolute); A-B must lie within the session |
| `brain connect HOST [--scope user\|project] [--print] [--force] [--dry-run] [--uninstall]` | Connect an agent; each scope is connected and uninstalled on its own |
| `brain import PATH (--overlay [--phase N] \| --into BRAIN \| --to-episodes [--agent HOST] [--untrusted]) [--topic T] [--apply]`, `brain import --from HOST [PATH] [--topic T] [--apply]` | Import; without `--apply`, a dry run |
| `brain viz [BRAIN] [--topic T] [--port P] [--host ADDRESS] [--no-open] [--export FILE.html\|.json\|.graphml]` | The brain map: of BRAIN, the only brain, or the one you pick; `--host 0.0.0.0` lets other machines open it |
| `brain obsidian [BRAIN]` | Open the brain's folder as a vault in Obsidian: BRAIN, the only brain, or the one you pick |
| `brain bench [SUITE…] [--sizes 1k,10k] [--backends …] [--out DIR] [--compare A B] [-q]` | Evaluation bench (default suites: retrieval, lint, perf); `-q` prints a summary, failures, and regressions only |
| `brain mcp [--host HOST]` | The MCP server, started by agent hosts |
