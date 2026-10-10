# 08 · Agent integrations

Status: draft for review

## 1. Integration ladder

Every host gets the highest tier it supports. Lower tiers keep working
when higher ones are missing.

| Tier | Mechanism | What the agent gains |
|---|---|---|
| 0 · Files | The brain's own `AGENTS.md` ([02 §11](02-brain-format.md#11-agentsmd)) | Any file-reading agent opened in the brain folder can read and log episodes. |
| 1 · Skill | `skills/brain/SKILL.md` in the plugin | Knows when and how to use the brain, through the CLI or MCP. |
| 2 · MCP | `brain mcp --host <id>` (stdio) | Orient, search with guards, read, log, propose rules, consolidate. |
| 3 · Hooks | `brain hook <host> <event>` | Orientation injected at session start; optional capture at stop or compaction; optional recall per prompt. |
| 4 · Native memory | Host-specific memory APIs | Future work ([14 §4](14-roadmap-and-open-questions.md#4-future-work-after-v01)). |

v0.1 coverage:

| Host | Install | Skill | MCP | Hooks | Harvest |
|---|---|---|---|---|---|
| Claude Code | Plugin marketplace (this repo) or `brain connect claude-code` | yes | yes | session start, prompt (opt-in), stop, pre-compact, session end | yes |
| Codex CLI and Codex in the ChatGPT desktop app | Plugin marketplace or `brain connect codex` | yes | yes | same event names as Claude Code (desktop: manual installs only) | yes |
| Antigravity (desktop, IDE, CLI) | `agy plugin install <repo URL>`, global plugin folder, or `brain connect antigravity` | yes | yes | first model call (as session start), post-tool (taint), stop | yes |
| OpenClaw | `openclaw plugins install brain-wiki --marketplace <repo>` (bundle mode) | yes | yes | none in bundle mode (Claude-format hooks are not executed there); optional hook pack (§4.4) | after v0.1 |
| Cursor | Loads the repo's Agent Plugins bundle (`plugin.json` + `mcp.json`), or `brain connect cursor` | yes | yes | not in v0.1 (Cursor has its own hook events; planned) | after v0.1 |
| Other MCP clients | `brain connect generic --print` gives a config snippet | — | yes | — | — |

## 2. Host ids

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

## 3. The plugin bundle

The repository root is the plugin ([13 §1](13-engineering.md#1-repository-layout)).
One skill and one MCP server are described once per host format:

| File | Read by | Content |
|---|---|---|
| `plugin.json` | Codex / ChatGPT, OpenClaw (Agent Plugins format); Antigravity | `$schema` (Agent Plugins 1.0), `name: brain-wiki`, `version`, `description`, `license`, `repository`, and `extensions["com.openai"]` (display name, category, hooks path). Antigravity's published schema lists only `name` and `description`, but `agy plugin install` accepts the full Agent Plugins manifest (test T-1; runtime loading still to confirm). |
| `mcp.json` | Agent Plugins hosts | `$schema` (Agent Plugins MCP 1.0), server `brain-wiki`: `type: stdio`, `command: uvx`, `args: [--from, brain-wiki==<version>, brain, mcp, --host, auto]` |
| `.mcp.json` | Claude Code | Same server, `--host claude-code` |
| `mcp_config.json` | Antigravity | Same server, `--host antigravity` (no `type` field in this format) |
| `.claude-plugin/plugin.json`, `.claude-plugin/marketplace.json` | Claude Code; also read by the ChatGPT desktop app as a legacy-compatible marketplace and by OpenClaw `--marketplace` | Manifest; a marketplace with one entry whose source is the repository root |
| `hooks/hooks.json` | Claude Code, Codex (same schema) | Events → `uvx --from brain-wiki==<version> brain hook auto <event>` |
| `hooks.json` | Antigravity | Named hook `brain-wiki` with `PreInvocation`, `PostToolUse`, `Stop` → `brain hook antigravity <event>` |
| `rules/brain-wiki.md` | Antigravity | `trigger: model_decision` rule: a short description of when to consult the brain |
| `skills/brain/SKILL.md` | All plugin hosts | The skill (§3.1) |

**Why `uvx` in plugin files.** A plugin installed from a marketplace cannot
assume `brain` is on the user's `PATH`, and some formats have no
plugin-root variable for paths. `uvx --from brain-wiki==<version>` runs
the matching release with only `uv` installed, and uses its cache after the
first run. `brain connect` instead writes the absolute path of the
installed `brain`, which starts faster ([§8](#8-brain-connect)). The
version pin is written by `scripts/sync_versions.py`, so the plugin and the
package can never disagree.

### 3.1 The skill

`skills/brain/SKILL.md` follows the Agent Skills specification: `name:
brain` (matching its folder), a `description` under 1,024 characters that
front-loads the trigger ("Use the user's long-term memory (brain-wiki):
recall past decisions and preferences, record durable learnings…"), and a
body under 500 lines:

1. What the brain is and what not to do (never edit `topics/` directly;
   never add rules unless asked).
2. When to search (before answering about past work, preferences,
   decisions) and how to read guard warnings.
3. When and how to log an episode (durable facts, decisions with reasons,
   negative findings; not chatter), with an example.
4. How to propose a rule (only on explicit request, with the user's words).
5. How to consolidate when asked (the prepare → reason → apply loop, with
   the op rules from [05 §4.5](05-write-path-and-consolidation.md#45-instruction-contract)).
6. CLI equivalents, for hosts where MCP is unavailable.

## 4. Per-host notes

### 4.1 Claude Code

- Install from this repository as a marketplace, or with
  `brain connect claude-code`. The plugin contributes the skill, the MCP
  server, and hooks.
- MCP tool names appear as `mcp__plugin_brain-wiki_brain-wiki__brain_search`
  (well within limits). Tool descriptions and server instructions are
  truncated past 2,048 characters, so the important sentence comes first.
- Tool results are capped (25k tokens by default). Search and read stay
  well below; the consolidation packet sets
  `_meta["anthropic/maxResultSizeChars"]` and is budgeted at 15k tokens.
- `brain_propose_rule` carries `_meta["anthropic/requiresUserInteraction"]`
  so the user approves each call.
- Hooks: §5. Claude Code caps each `additionalContext` string at 10,000
  characters, so orientation for hooks is kept under 8,000. All `SessionEnd`
  hooks share a 1.5-second budget, so capture hooks run with `async: true`.
  The `Stop` payload includes `stop_hook_active` and
  `last_assistant_message`; its "block with reason" output is how prompted
  capture asks the agent to log an episode (§6.2).
- The headless preset uses `claude -p` with JSON output (§7).

### 4.2 Codex (CLI and ChatGPT desktop)

- Install by adding this repository as a marketplace, or with
  `brain connect codex`. Codex reads the portable `plugin.json` and
  `mcp.json`; `extensions["com.openai"]` supplies display metadata.
- Hooks use the same event schema as Claude Code, from `hooks/hooks.json`.
  In the ChatGPT desktop app they run only for manually installed plugins
  and must be trusted by the user; plugins with hooks are not eligible for
  the public plugin directory, which is acceptable for v0.1.
- Codex rewrites tool names to `[A-Za-z0-9_]`, so names are snake case
  already.
- `SessionEnd` hooks get 1 second by default (3 at most), so capture hooks
  run with `async: true`. Codex saves `additionalContext` above a
  configurable limit to disk and sends a preview, so orientation stays
  compact.
- Hook payloads carry `session_id` (`thr_…`) and a `transcript_path` to the
  session's rollout file.

### 4.3 Antigravity (desktop, IDE, CLI)

- Install with `agy plugin install https://github.com/<owner>/brain-wiki`
  (repository root only), by placing the plugin in
  `~/.gemini/config/plugins/brain-wiki/` (desktop and IDE), or with
  `brain connect antigravity`.
- There is no session-start event. The `PreInvocation` hook returns
  orientation as an ephemeral message only when `invocationNum == 0`, and
  returns `{}` on later calls.
- `PostToolUse` records taint for the conversation when an untrusted tool
  ran (§6.3). `Stop` performs capture (§6).
- The rule file (`trigger: model_decision`) adds a one-line pointer that the
  model sees with its description and loads on demand.
- MCP tools default to "Ask" permission; users can allow read tools with
  `mcp(brain-wiki/brain_search)` style rules. The user guide shows how.

### 4.4 OpenClaw

- Bundle mode: OpenClaw maps the plugin's skills and MCP servers. It
  detects but does not execute Claude-format `hooks/hooks.json`.
- Optional hook pack (`hooks/brain-wiki-capture/HOOK.md` plus a tiny
  `handler.js` that runs `brain hook openclaw <event>`) for
  `agent:bootstrap` (add the brain's orientation as a bootstrap file) and
  `session:compact:before` (capture). OpenClaw loads hook packs from Claude
  and Codex bundle formats; other hosts ignore the subdirectory.
- MCP tools are registered as `brain-wiki__brain_search` (server prefix and
  64-character cap respected).
- A native memory-provider plugin (taking OpenClaw's memory slot) is future
  work; it needs the OpenClaw SDK to build and test.

### 4.5 Cursor and generic MCP clients

- Cursor loads plugins that follow the Agent Plugins specification, so the
  repo's root `plugin.json`, `mcp.json`, and `skills/` work there. Cursor
  does not expand the standard's `${PLUGIN_ROOT}` variables (it has its own),
  which does not matter because brain-wiki's MCP entry uses none.
- Cursor's own hook events (`sessionStart`, `beforeSubmitPrompt`, `stop`,
  `preCompact`, `sessionEnd`) need a `.cursor-plugin/` manifest; they are
  planned after v0.1.
- `brain connect generic --print` prints a stdio server entry (`command`,
  `args`, `env`) to paste into any client's MCP configuration.

## 5. Hooks

One entry point: `brain hook <host|auto> <event>`, reading the host's JSON
payload on stdin and writing the host's expected JSON on stdout.

### 5.1 Normalized events

| Normalized | Claude Code | Codex | Antigravity | OpenClaw (hook pack) |
|---|---|---|---|---|
| `session_start` | `SessionStart` | `SessionStart` | `PreInvocation` with `invocationNum == 0` | `agent:bootstrap` |
| `prompt` (opt-in recall) | `UserPromptSubmit` | `UserPromptSubmit` | — (no prompt text exposed) | — |
| `tool_used` (taint) | `PostToolUse` | `PostToolUse` | `PostToolUse` | — |
| `stop` | `Stop` | `Stop` | `Stop` | — |
| `pre_compact` | `PreCompact` | `PreCompact` | — | `session:compact:before` |
| `session_end` | `SessionEnd` | `SessionEnd` | — | `command:reset` |

Event names for Codex are taken from its documentation's statement that
plugin hooks share Claude Code's event schema; confirmed by host fixtures
in M7.

### 5.2 Outputs

| Event | Claude Code / Codex | Antigravity |
|---|---|---|
| `session_start` | `{"hookSpecificOutput": {"hookEventName": "SessionStart", "additionalContext": "<orientation>"}}` | `{"injectSteps": [{"ephemeralMessage": "<orientation>"}]}` |
| `prompt` | `additionalContext` with up to 3 recalled notes and their guards (≤ 600 tokens), only above a score threshold | — |
| `tool_used` | nothing (records session taint in state) | `{}` |
| `stop` | prompted capture: `{"decision": "block", "reason": "<capture instruction>"}` at most once per session; otherwise nothing | `{"decision": "continue", "reason": "…"}` likewise |
| `pre_compact`, `session_end` | nothing; raw capture runs as an async hook so it never eats the host's short session-end budget | — |

Injected text is wrapped in markers
(`<brain-wiki-context>` … `</brain-wiki-context>`) so capture can strip it
([05 §3.3](05-write-path-and-consolidation.md#33-invariants)).

### 5.3 Rules for every hook

- **Never break the host.** Any internal error is logged to the state log
  and the hook exits 0 with an empty, valid output. A hook never blocks a
  tool call.
- **Fast.** Budgets in [13 §5](13-engineering.md#5-performance-budgets); no
  network; no model calls; heavy work (raw capture of a large transcript) is
  bounded by size and time and abandoned rather than delaying the host.
- **Quiet.** Only protocol JSON on stdout; diagnostics on stderr.
- **No shell interpolation.** Payload content never reaches a command line.
- **Self-exclusion.** If `BRAIN_WIKI_INTERNAL=1` is set (brain-wiki sets it
  for every subprocess it starts, such as headless consolidation), hooks
  exit immediately. This prevents a consolidation run from capturing
  itself.

## 6. Capture and harvest

Capture turns sessions into episodes as they happen, through hooks.
Harvest turns them into episodes afterwards, by reading the host's own
session store ([05 §2.2](05-write-path-and-consolidation.md#22-harvesting-sessions)).
Both are **off by default** and enabled per host, and both use the same
session readers (§6.4), skip rules, taint detection, and dedupe keys, so a
session is never captured twice.

```toml
# user config.toml
[capture]
enabled = true
hosts   = ["claude-code", "antigravity"]
mode    = "prompted"            # prompted | raw | both
min_turns = 5                   # prompted: only ask after this many turns
untrusted_tools = []            # extra tool-name patterns that taint a session
trusted_mcp_servers = ["brain-wiki"]

[recall]
on_prompt = false               # inject top matches on every prompt (costs tokens)

[harvest]
enabled = false
hosts   = ["claude-code", "codex", "antigravity"]
since   = "30d"                 # how far back the first run looks
min_idle_minutes = 60           # skip sessions still in progress
min_user_turns   = 3
distill = "claude-code"         # command-backend preset; "raw" for no model
[harvest.routes]                # optional: working-directory globs → brain
"~/work/**" = "work"
[harvest.paths]                 # optional: override where a host keeps sessions
# claude-code = "~/.claude/projects"
```

### 6.1 What gets skipped

- Sessions with `BRAIN_WIKI_INTERNAL=1` (brain-wiki's own runs). Harvest
  also skips sessions whose working directory is under brain-wiki's state
  directory, which is where headless consolidation runs.
- Subagent sessions, where the host distinguishes them.
- Non-interactive (headless) sessions, unless `capture_headless = true`.
- Sessions shorter than `min_turns` for prompted mode, or with fewer than
  `min_user_turns` user messages for harvest.
- For harvest: sessions still in progress, and sessions whose working
  directory routes to no brain.

### 6.2 Modes

| Mode | How | Quality | Cost |
|---|---|---|---|
| `prompted` (default where supported) | At the first `stop` after `min_turns`, the hook asks the agent once, via the host's "continue with reason" output, to call `brain_log_episode` with durable learnings, or to do nothing if there are none. | The agent's own distilled summary; provenance is set by the server. | One short extra turn per session. |
| `raw` | At `pre_compact` and `session_end` (and `stop` for hosts without those), the hook reads the transcript since the last capture point, keeps user and assistant text (no tool output bodies), strips injected markers, scrubs secrets, and writes one episode. | Verbose; consolidation does the distilling. | No model call. |

Capture points are tracked per session in `<state>/sessions/<host>/<id>.json`
(last captured transcript offset, whether prompted capture already ran,
taint), and episode `dedupe` keys make retries harmless. Transcript
readers are per host and defensive: an unreadable or unknown format yields
a `raw` episode with `taint: unknown`, or no episode, never an error.

### 6.3 Taint detection

A session is tainted from the first time an untrusted tool runs. Default
untrusted tools per host are web fetch and search tools, browser tools,
MCP tools from servers not in `trusted_mcp_servers`, and shell commands
that fetch from the network (`curl`, `wget`, URLs in arguments). The
`tool_used` hook records it immediately; raw capture also scans the
transcript. Episodes from tainted sessions get `taint: true`; sessions
whose tool use cannot be observed get `unknown`.

### 6.4 Session readers

One reader per host lists sessions and yields normalized turns
(`index`, `role`, `text`, `tool_name`, `tool_args_summary`, `timestamp`).
Raw capture, harvest, origin lookup, and taint detection all use it.

| Host | Where sessions live (defaults) | Notes |
|---|---|---|
| Claude Code | `~/.claude/projects/<working-dir slug>/<session-id>.jsonl` (moves with `CLAUDE_CONFIG_DIR`) | The format is documented as internal and changes between versions. Entries carry `cwd`, `gitBranch`, `sessionId`, and `isSidechain` (subagents). Transcripts are deleted after 30 days by default (`cleanupPeriodDays`), so harvest should run at least weekly or the user should raise that setting. |
| Codex | `$CODEX_HOME/sessions/` (default `~/.codex/sessions/`) and `archived_sessions/` | JSONL rollout files; the hook payload's `transcript_path` points at the same files. Schema to confirm (T-6). |
| Antigravity | `<app dir>/brain/<conversation-id>/.system_generated/logs/transcript.jsonl`, where the app dir is the desktop, IDE, or CLI data folder under `~/.gemini/` | Path documented with the hook payload; line schema undocumented (T-3). CLI conversations are scoped to their working directory. |
| OpenClaw | The agent's session transcripts | After v0.1; location to confirm. |
| Cursor | Its own local state | After v0.1. |

Readers are versioned and tested against recorded fixtures from several
host versions. A line they cannot parse is skipped and counted; a session
with too many unparseable lines is reported as unreadable rather than
half-read. Readers never write to a host's files.

## 7. Headless presets for the command backend

The command backend ([05 §4.4](05-write-path-and-consolidation.md#44-backends))
runs a host CLI once per packet, prompt on stdin, in an empty temporary
directory, with `BRAIN_WIKI_INTERNAL=1`.

| Preset | Command (sketch) | Final text | Isolation |
|---|---|---|---|
| `claude-code` | `claude --bare -p --output-format json --json-schema <ops schema> [--model M]` | `structured_output` (schema-constrained), else `result` | `--bare` skips hooks, plugins, MCP servers, auto memory, and instruction files; no tools are pre-approved; empty working directory |
| `codex` | `codex exec - --json --ephemeral --skip-git-repo-check --sandbox read-only -o <file> [-m M]` | The final message written by `-o` (also the last `agent_message` event) | Read-only sandbox; nothing persisted; empty directory (not a git repo, hence the flag) |
| `antigravity` | `agy -p --output-format json --json-schema <ops schema> [--model M] [--agent brain-consolidator]` | `structured_output`, else `response` | A custom agent with no tools if test T-5 confirms that works; otherwise headless soft-denies tools needing approval, and the empty directory leaves nothing to read |
| `cursor` | `agent -p --output-format json [--model M]` (never `--force`) | final result | Without `--force`, file changes are only proposed, never applied |
| `ollama` | `ollama run <model>` | stdout | No tools by construction |
| custom | any argv | stdout, then the first JSON object with `ops` | User's responsibility |

Where a CLI can constrain output to a JSON Schema, the preset passes the
ops schema ([05 §5](05-write-path-and-consolidation.md#5-operations)), which
removes most invalid responses before validation even runs.

Exact flags live in code (`brainwiki.hosts.<host>.headless`) with tests
against recorded outputs, because CLIs change faster than this document.

## 8. `brain connect`

`brain connect <host>` wires a host to the locally installed brain-wiki.

1. Materialize a host-specific copy of the plugin under
   `<data dir>/brain-wiki/plugin/<host>/`, with MCP and hook commands set to
   the absolute path of the installed `brain`, `--host <id>`, and (if given)
   `--brain <name>`.
2. Register it the way the host expects, preferring the host's own CLI when
   it is installed:

| Host | Registration |
|---|---|
| Claude Code | Add the materialized directory as a local marketplace and install the plugin from it |
| Codex | Add it as a local marketplace (`codex plugin marketplace add <dir>`) |
| Antigravity | Link or copy into `~/.gemini/config/plugins/brain-wiki/` |
| OpenClaw | `openclaw plugins install --link <dir>` |
| Cursor | Add the server to Cursor's MCP config file |
| generic | Print the snippet only |

3. Options: `--scope user|project`, `--brain`, `--capture` (adds stop,
   pre-compact, and session-end hooks), `--dry-run` (print every file
   change as a diff), `--uninstall`.
4. Every change is recorded in `<state>/connect/<host>.json` with backups of
   modified files, so `--uninstall` restores exactly what was there.
5. After registering, run the host's own listing command (where one
   exists) and report whether the plugin and server are visible.

## 9. Future: remote MCP for chat apps

ChatGPT (web and mobile), claude.ai, and the Gemini app connect only to
remote MCP servers over HTTPS. Not in v0.1; this is the design to build
toward.

**Requirements gathered from the hosts:**

| Need | Detail |
|---|---|
| Transport | Streamable HTTP |
| Reachability | Public HTTPS (claude.ai connects from the vendor's cloud) |
| Authorization | OAuth 2.1 with PKCE (S256 required by ChatGPT); protected resource metadata; issuer identification in responses; client registration through **both** client ID metadata documents (preferred by ChatGPT and Claude) and dynamic client registration (what the Gemini app and Antigravity document); audience-bound tokens |
| Tool shape | Read tools plus `brain_log_episode`; `search` and `fetch` aliases for hosts that expect those names; annotations everywhere |
| Gemini app limits | Personal accounts only, US, 18+, Keep Activity on; write actions require confirmation |

**Deployment options:**

| Option | How | Trade-off |
|---|---|---|
| A · Local server behind a tunnel | `brain mcp --http` on the user's machine, exposed through a tunnel service; auth delegated to an external identity provider | Brain stays local; machine must be on; tunnel and IdP setup |
| B · Server mode on a container platform | Stateless server reading the brain from object storage ([03 §6.7](03-config-and-storage.md#67-future-server-mode-reading-object-storage)), behind an identity provider | Always available; the brain is replicated to the cloud |
| C · Embedded authorization server | brain-wiki implements OAuth itself | Largest security surface; avoided |

Per-client tokens map to agent profiles (`chatgpt-web`, `claude-web`,
`gemini-app`), read-only and `default` privacy by default.

## 10. Test matrix

| Check | Claude Code | Codex | Antigravity | OpenClaw |
|---|---|---|---|---|
| Plugin validates and loads | `claude plugin validate`, install | marketplace add, install | `agy plugin install ./` | `plugins install --link`, `inspect` |
| MCP tools listed and callable | ✓ | ✓ | ✓ | ✓ |
| Orientation injected at start | ✓ | ✓ | ✓ (first call only) | hook pack |
| Prompted capture asks once | ✓ | ✓ | ✓ | — |
| Raw capture produces one episode per compaction | ✓ | ✓ | stop only | hook pack |
| Self-exclusion during headless consolidation | ✓ | ✓ | ✓ | — |
| Session reader parses recorded fixtures; harvest dry run lists, routes, and skips correctly | ✓ | ✓ | ✓ | — |
| Origin lookup returns the right window, and `not_available` when deleted | ✓ | ✓ | ✓ | — |
| `brain connect` and `--uninstall` round trip | ✓ | ✓ | ✓ | ✓ |

Recorded hook payloads for each host and event are kept as test fixtures,
so the adapters are tested on every change even where the host is not
installed.
