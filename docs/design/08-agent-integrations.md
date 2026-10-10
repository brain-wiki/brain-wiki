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

| Host | Install | Skill | MCP | Hooks |
|---|---|---|---|---|
| Claude Code | Plugin marketplace (this repo) or `brain connect claude-code` | yes | yes | session start, prompt (opt-in), stop, pre-compact, session end |
| Codex CLI and Codex in the ChatGPT desktop app | Plugin marketplace or `brain connect codex` | yes | yes | same event names as Claude Code (desktop: manual installs only) |
| Antigravity (desktop, IDE, CLI) | `agy plugin install <repo URL>`, global plugin folder, or `brain connect antigravity` | yes | yes | first model call (as session start), post-tool (taint), stop |
| Gemini CLI | `gemini extensions install <repo URL>` or `brain connect gemini-cli` | yes | yes | session start, before agent (opt-in recall), after agent, pre-compress, session end |
| OpenClaw | `openclaw plugins install brain-wiki --marketplace <repo>` (bundle mode) | yes | yes | none in bundle mode (Claude-format hooks are not executed there); optional hook pack (§4.5) |
| Cursor and other MCP clients | `brain connect generic --print` gives a config snippet | — | yes | — |

## 2. Host ids

Stable identifiers used in agent profiles, user config, episode
provenance, and `--host` flags:

`claude-code`, `codex`, `antigravity`, `gemini-cli`, `openclaw`, `cursor`,
`generic`.

When a hook or server is started without an explicit host (a shared hooks
file read by two hosts), the host is detected in this order: the
`BRAIN_WIKI_HOST` environment variable; host-specific environment variables
set for hook commands (Gemini CLI sets `GEMINI_SESSION_ID`; Agent Plugins
hosts set `PLUGIN_ROOT`; Claude Code sets `CLAUDE_PLUGIN_ROOT` and
`CLAUDE_PROJECT_DIR`, which some other hosts also set for compatibility,
so they are checked last); then the shape of the hook payload. An
undetectable host is `generic`.

## 3. The plugin bundle

The repository root is the plugin ([13 §1](13-engineering.md#1-repository-layout)).
One skill and one MCP server are described once per host format:

| File | Read by | Content |
|---|---|---|
| `plugin.json` | Codex / ChatGPT, OpenClaw (Agent Plugins format); Antigravity | `$schema` (Agent Plugins 1.0), `name: brain-wiki`, `version`, `description`, `license`, `repository`, and `extensions["com.openai"]` (display name, category, hooks path). Antigravity's published schema lists only `name` and `description`; test T-1 decides whether the shared file works or root `plugin.json` must stay minimal. |
| `mcp.json` | Agent Plugins hosts | `$schema` (Agent Plugins MCP 1.0), server `brain-wiki`: `type: stdio`, `command: uvx`, `args: [--from, brain-wiki==<version>, brain, mcp, --host, auto]` |
| `.mcp.json` | Claude Code | Same server, `--host claude-code` |
| `mcp_config.json` | Antigravity | Same server, `--host antigravity` (no `type` field in this format) |
| `gemini-extension.json` | Gemini CLI | `name`, `version`, `description`, inline `mcpServers` (`--host gemini-cli`), `contextFileName: brain-wiki-context.md` |
| `.claude-plugin/plugin.json`, `.claude-plugin/marketplace.json` | Claude Code; also read by the ChatGPT desktop app as a legacy-compatible marketplace and by OpenClaw `--marketplace` | Manifest; a marketplace with one entry whose source is the repository root |
| `hooks/hooks.json` | Claude Code, Codex (same schema) | Events → `uvx --from brain-wiki==<version> brain hook auto <event>` |
| `hooks.json` | Antigravity | Named hook `brain-wiki` with `PreInvocation`, `PostToolUse`, `Stop` → `brain hook antigravity <event>` |
| `rules/brain-wiki.md` | Antigravity | `trigger: model_decision` rule: a short description of when to consult the brain |
| `brain-wiki-context.md` | Gemini CLI | Two paragraphs telling the model the brain exists and which tools to use |
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
- Hooks: §5. The stop hook's "block with reason" output is how prompted
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

### 4.4 Gemini CLI

- Install with `gemini extensions install <repo URL>` or
  `brain connect gemini-cli`. The manifest's `contextFileName` points at a
  user-facing file, because Gemini CLI loads `GEMINI.md` from an extension
  root as context (the repo has none).
- Hooks: an extension's hooks live in `hooks/hooks.json`, the same path as
  Claude Code's but with different event names and millisecond timeouts.
  The shared file uses Claude/Codex event names and no `timeout` fields
  (units differ). Whether Gemini CLI tolerates the unknown event names is
  test T-6; if not, `brain connect gemini-cli` writes Gemini-specific hooks
  into its settings instead.
- Server key `brain-wiki` (hyphen): Gemini CLI's policy parser splits on the
  first underscore.

### 4.5 OpenClaw

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

### 4.6 Cursor and generic MCP clients

`brain connect generic --print` prints a stdio server entry
(`command`, `args`, `env`) to paste into any client's MCP configuration,
and `brain connect cursor` writes Cursor's MCP config file. A Cursor plugin
bundle is future work.

## 5. Hooks

One entry point: `brain hook <host|auto> <event>`, reading the host's JSON
payload on stdin and writing the host's expected JSON on stdout.

### 5.1 Normalized events

| Normalized | Claude Code | Codex | Antigravity | Gemini CLI | OpenClaw (hook pack) |
|---|---|---|---|---|---|
| `session_start` | `SessionStart` | `SessionStart` | `PreInvocation` with `invocationNum == 0` | `SessionStart` | `agent:bootstrap` |
| `prompt` (opt-in recall) | `UserPromptSubmit` | `UserPromptSubmit` | — (no prompt text exposed) | `BeforeAgent` | — |
| `tool_used` (taint) | `PostToolUse` | `PostToolUse` | `PostToolUse` | `AfterTool` | — |
| `stop` | `Stop` | `Stop` | `Stop` | `AfterAgent` | — |
| `pre_compact` | `PreCompact` | `PreCompact` | — | `PreCompress` | `session:compact:before` |
| `session_end` | `SessionEnd` | `SessionEnd` | — | `SessionEnd` | `command:reset` |

Event names for Codex are taken from its documentation's statement that
plugin hooks share Claude Code's event schema; confirmed by host fixtures
in M7.

### 5.2 Outputs

| Event | Claude Code / Codex / Gemini CLI | Antigravity |
|---|---|---|
| `session_start` | `{"hookSpecificOutput": {"hookEventName": "SessionStart", "additionalContext": "<orientation>"}}` | `{"injectSteps": [{"ephemeralMessage": "<orientation>"}]}` |
| `prompt` | `additionalContext` with up to 3 recalled notes and their guards (≤ 600 tokens), only above a score threshold | — |
| `tool_used` | nothing (records session taint in state) | `{}` |
| `stop` | prompted capture: `{"decision": "block", "reason": "<capture instruction>"}` at most once per session; otherwise nothing | `{"decision": "continue", "reason": "…"}` likewise |
| `pre_compact`, `session_end` | nothing (raw capture happens as a side effect) | — |

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

## 6. Capture

Capture turns sessions into episodes automatically. It is **off by default**
and enabled per host:

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
```

### 6.1 What gets skipped

- Sessions with `BRAIN_WIKI_INTERNAL=1` (brain-wiki's own runs).
- Subagent sessions, where the host distinguishes them.
- Non-interactive (headless) sessions, unless `capture_headless = true`.
- Sessions shorter than `min_turns` for prompted mode.

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

## 7. Headless presets for the command backend

The command backend ([05 §4.4](05-write-path-and-consolidation.md#44-backends))
runs a host CLI once per packet, prompt on stdin, in an empty temporary
directory, with `BRAIN_WIKI_INTERNAL=1`.

| Preset | Command (sketch) | Final text | Tools |
|---|---|---|---|
| `claude-code` | `claude -p --output-format json [--model M]` | `result` field of the JSON | Disabled with the CLI's tool allow/deny flags; empty working directory |
| `codex` | `codex exec --json [-m M]` with a read-only sandbox | Final agent message event | Read-only sandbox, empty working directory |
| `antigravity` | `agy -p --output-format json [--model M] [--agent brain-consolidator]` | `response` field | A custom agent with no tools if test T-5 confirms that works; otherwise headless soft-denies tools needing approval, and the empty directory leaves nothing to read |
| `gemini-cli` | `gemini -p --output-format json [-m M]` | `response` field | Excluded tools via the run's settings |
| `ollama` | `ollama run <model>` | stdout | No tools by construction |
| custom | any argv | stdout, then the first JSON object with `ops` | User's responsibility |

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
| Gemini CLI | `gemini extensions link <dir>`; Gemini-specific hooks in settings if T-6 requires |
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

| Check | Claude Code | Codex | Antigravity | Gemini CLI | OpenClaw |
|---|---|---|---|---|---|
| Plugin validates and loads | `claude plugin validate`, install | marketplace add, install | `agy plugin install ./` | `gemini extensions link` | `plugins install --link`, `inspect` |
| MCP tools listed and callable | ✓ | ✓ | ✓ | ✓ | ✓ |
| Orientation injected at start | ✓ | ✓ | ✓ (first call only) | ✓ | hook pack |
| Prompted capture asks once | ✓ | ✓ | ✓ | ✓ | — |
| Raw capture produces one episode per compaction | ✓ | ✓ | stop only | ✓ | hook pack |
| Self-exclusion during headless consolidation | ✓ | ✓ | ✓ | ✓ | — |
| `brain connect` and `--uninstall` round trip | ✓ | ✓ | ✓ | ✓ | ✓ |

Recorded hook payloads for each host and event are kept as test fixtures,
so the adapters are tested on every change even where the host is not
installed.
