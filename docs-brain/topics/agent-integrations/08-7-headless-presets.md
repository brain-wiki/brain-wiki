---
id: 01M3250V00TST9FSK6KS8ER0KA
type: design
title: "Headless presets"
aliases: ["08 §7"]
tags: [agent-integrations]
source: "docs/design/08-agent-integrations.md#7-headless-presets"
bw-part_of:
  - "[[agent-integrations]]"
---
# Headless presets

Headless harvest (`brain harvest --apply`, [[05-22-harvesting-sessions|05 §2.2]])
and the bench's model runs ([[eval-bench|11]]) run a host CLI once per packet, prompt on stdin, in an empty temporary
directory.

| Preset | Command (sketch) | Final text | Isolation |
|---|---|---|---|
| `claude-code` | `claude --bare -p --output-format json --json-schema <ops schema> [--model M]` | `structured_output` (schema-constrained), else `result` | `--bare` skips hooks, plugins, MCP servers, auto memory, and instruction files; no tools are pre-approved; empty working directory |
| `codex` | `codex exec - --json --ephemeral --skip-git-repo-check --sandbox read-only -o <file> [-m M]` | The final message written by `-o` (also the last `agent_message` event) | Read-only sandbox; nothing persisted; empty directory (not a git repo, hence the flag) |
| `antigravity` | `agy --input-format stream-json --output-format stream-json --effort medium [--model M]`, the prompt as one `user` message on stdin | `response` of the last `result` event | Headless soft-denies tools needing approval, and a denied call ends the turn with no output, so every preset prompt starts by saying not to use tools; custom agents cannot drop tools (T-5) |
| `cursor` | `agent -p --output-format json [--model M]` (never `--force`) | final result | Without `--force`, file changes are only proposed, never applied |
| `ollama` | `ollama run <model>` | stdout | No tools by construction |
| custom | any argv | stdout, then the first JSON object with `ops` | User's responsibility |

Where a CLI can constrain output to a JSON Schema, the preset passes the
ops schema ([[05-5-operations|05 §5]]), which
removes most invalid responses before validation even runs. Antigravity is
the exception: `agy --json-schema` drops every field the schema does not
declare (each op came back as only `{"op": …}`) and forces an extra turn,
so its preset relies on the prompt and the validator instead. Its default
(high) effort spent 48k thinking tokens and five minutes on a one-episode
packet; medium took 47 seconds and low 4, all with valid ops.

Exact flags live in code (`brainwiki.consolidate.presets`, shared by
consolidation and harvest distillation) with tests against recorded outputs,
because CLIs change faster than this document.
