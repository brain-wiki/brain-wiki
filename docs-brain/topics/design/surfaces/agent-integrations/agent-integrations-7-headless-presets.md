---
id: 01M3250V00B4DMAQHY107A77J0
type: design
title: "Headless presets"
aliases: ["Agent integrations §7"]
source: "docs/design/agent-integrations.md#7-headless-presets"
---
# Headless presets

Headless harvest (`brain harvest --apply`,
[[write-path-22-harvesting-sessions|write path §2.2]]) runs a host CLI
once per session chunk:

- The prompt goes on stdin and starts with a preamble saying the run is
  headless and must not call tools, load skills, or read files.
- The run happens in an empty temporary directory,
  `<state>/headless/run-*`. Harvest skips sessions under the state
  directory, so it never distills its own runs, even when a host does not
  mark them headless.
- A run times out after 600 seconds. A missing binary, a timeout, or a
  non-zero exit is `not_available`, and the message names the other
  presets and `--raw`.

The bench's `agent` suite would also use the presets, but it is not built
([[eval-bench-35-agent|eval bench §3.5]]).

| Preset | Command (sketch) | Final text |
|---|---|---|
| `claude-code` | `claude --bare -p --output-format json [--json-schema S] [--model M]` | `structured_output` when a schema was passed, else `result` |
| `codex` | `codex exec - --json --ephemeral --skip-git-repo-check --sandbox read-only -o <file> [-m M]` | The file `-o` writes, else the last `agent_message` event |
| `antigravity` | `agy --input-format stream-json --output-format stream-json --effort medium [--model M]` | `response` of the last `result` event |
| `cursor` | `agent -p --output-format json [--model M]` | `result` |
| `ollama` | `ollama run <model>` (default `llama3.1`) | stdout |
| custom | Any argv | stdout |

How each preset keeps the run isolated:

- `claude-code`: `--bare` skips hooks, plugins, MCP servers, auto memory,
  and instruction files, and no tools are pre-approved.
- `codex`: a read-only sandbox, nothing persisted, and a directory that is
  not a git repository (hence `--skip-git-repo-check`).
- `antigravity`: the prompt goes on stdin as one `user` message. Headless
  runs deny tools that need approval, a denied call ends the turn with no
  output, and custom agents cannot drop tools (T-5). The preamble is the
  only guard.
- `cursor`: never `--force`, so file changes are only proposed.
- `ollama`: no tools at all.
- custom: the user's responsibility.

Harvest takes the first JSON object in the final text as the distilled
episode and passes no output schema. Presets that can constrain output to a
JSON Schema accept one when a caller supplies it. The `antigravity` preset
never passes one: `agy --json-schema` drops every field the schema does not
declare and forces an extra turn. Its default (high) effort spent 48k
thinking tokens and five minutes on a one-episode packet in 0.1. Medium
took 47 seconds and low 4.

Exact flags live in `brainwiki/presets.py`, tested against recorded
outputs, because CLIs change faster than this document.
