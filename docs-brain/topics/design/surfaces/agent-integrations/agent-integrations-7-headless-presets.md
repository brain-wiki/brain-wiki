---
id: 01M3250V00B4DMAQHY107A77J0
type: design
title: "Headless presets"
aliases: ["Agent integrations §7"]
source: "docs/design/agent-integrations.md#7-headless-presets"
---
# Headless presets

Headless harvest (`brain harvest --apply`, [[write-path-22-harvesting-sessions|write path §2.2]])
runs a host CLI once per session chunk, prompt on stdin, in an empty temporary
directory under the state directory (`<state>/headless/run-*`). Harvest skips
any session whose working directory is under the state directory, so it never
distills its own runs, even when a host does not mark them headless. The
bench's `agent` suite, which would also use the presets, is not built
([[eval-bench-35-agent|eval bench §3.5]]).

| Preset | Command (sketch) | Final text | Isolation |
|---|---|---|---|
| `claude-code` | `claude --bare -p --output-format json [--json-schema S] [--model M]` | `structured_output` when a schema was passed, else `result` | `--bare` skips hooks, plugins, MCP servers, auto memory, and instruction files; no tools are pre-approved; empty working directory |
| `codex` | `codex exec - --json --ephemeral --skip-git-repo-check --sandbox read-only -o <file> [-m M]` | The final message written by `-o` (also the last `agent_message` event) | Read-only sandbox; nothing persisted; empty directory (not a git repo, hence the flag) |
| `antigravity` | `agy --input-format stream-json --output-format stream-json --effort medium [--model M]`, the prompt as one `user` message on stdin | `response` of the last `result` event | Headless soft-denies tools needing approval, and a denied call ends the turn with no output, so every preset prompt starts by saying not to use tools; custom agents cannot drop tools (T-5) |
| `cursor` | `agent -p --output-format json [--model M]` (never `--force`) | final result | Without `--force`, file changes are only proposed, never applied |
| `ollama` | `ollama run <model>` | stdout | No tools by construction |
| custom | any argv | stdout | User's responsibility |

Harvest takes the first JSON object in the final text as the distilled
episode and passes no output schema. Presets that can constrain output to a
JSON Schema accept one when a caller supplies it. Antigravity's never does:
`agy --json-schema` drops every field the schema does not declare and forces
an extra turn. Its default (high) effort spent 48k thinking tokens and five
minutes on a one-episode packet in 0.1; medium took 47 seconds and low 4.

Exact flags live in code (`brainwiki/presets.py`) with tests against
recorded outputs, because CLIs change faster than this document.
