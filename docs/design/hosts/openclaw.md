# OpenClaw

How brain-wiki works with OpenClaw in bundle mode. The mechanics shared by
all hosts are in [agent integrations](../agent-integrations.md).

| Part | OpenClaw |
|---|---|
| Install | `openclaw plugins install brain-wiki --marketplace <repository>`, or `brain connect openclaw` |
| MCP server | `.mcp.json`, read as a Claude-format bundle |
| Instructions | A managed block in the workspace `AGENTS.md` ([agent integrations §3.2](../agent-integrations.md#32-the-static-instruction-block)) |
| Skills | `brain`, `brain-setup`, `brain-maintain` from the bundle |
| Harvest | None: no session reader |
| Memory import | `~/.openclaw/workspace/MEMORY.md`, `USER.md`, and `memory/*.md` ([import §6](../import.md#6-to-episodes-and-from-agents)) |

## Notes

- `brain connect openclaw` runs `openclaw plugins install --link <dir>` on
  its plugin copy, whose `.mcp.json` runs the installed `brain` with
  `--host openclaw`. Without `openclaw` on `PATH`, it prints the folder to
  install. It has no project scope.
- A marketplace install runs `--host auto`. The server recognizes OpenClaw
  by the client name it reports, since its environment looks like Claude
  Code's.
- `connect` finds the workspace the way OpenClaw does:
  `OPENCLAW_WORKSPACE_DIR`, then `~/.openclaw-<profile>/workspace` for an
  `OPENCLAW_PROFILE` other than `default`, then `agents.defaults.workspace`
  in `openclaw.json` (read only when it is plain JSON), then
  `<state dir>/workspace`. The state directory is `OPENCLAW_STATE_DIR`, or
  `~/.openclaw`.
- OpenClaw injects at most 20,000 characters per bootstrap file.
  `brain connect` warns when the file passes 90% of that.
- `--uninstall` removes the block, and prints a reminder to remove the
  plugin in OpenClaw (`openclaw plugins` lists it).
- MCP tools are registered as `brain-wiki__brain_search`, within the
  64-character cap.
- The workspace `AGENTS.md` has the same weakness as Codex's single global
  file ([Codex](codex.md#1-instructions-come-from-the-mcp-server)).
  Whether OpenClaw passes MCP server instructions to the model is not
  verified, so the block stays until it is.
- A native memory-provider plugin, which would take OpenClaw's memory
  slot, needs the OpenClaw SDK to build and test
  ([ideas](../../roadmap/ideas.md)).

## Verification

| Item | Status |
|---|---|
| Bundle installs; MCP tools listed and callable | By hand before a release |
| MCP server instructions reach the model | Not tested |
