# OpenClaw

How brain-wiki integrates with OpenClaw in bundle mode. The cross-host
mechanics are in [08](../08-agent-integrations.md).

| Surface | How brain-wiki uses it |
|---|---|
| Install | `openclaw plugins install brain-wiki --marketplace <repository>` (bundle mode), or `brain connect openclaw` |
| `brain connect` | `openclaw plugins install --link <dir>` on the materialized copy; without `openclaw` on `PATH`, prints the folder to install |
| MCP server | OpenClaw reads the repository as a Claude-format bundle (`.mcp.json`, `--host auto`); the server recognizes OpenClaw by the client name it reports |
| Instructions | A managed block in the workspace `AGENTS.md` ([08 §3.2](../08-agent-integrations.md#32-the-static-instruction-block)) |
| Skills | `brain`, `brain-setup`, `brain-maintain` from the bundle |
| Harvest | Not yet: no session reader |

## Notes

- The workspace is resolved as OpenClaw does: `OPENCLAW_WORKSPACE_DIR`, then
  the `OPENCLAW_PROFILE` workspace, then `agents.defaults.workspace` in
  `openclaw.json`, then `<state dir>/workspace` (default
  `~/.openclaw/workspace`). OpenClaw injects at most 20,000 characters per
  bootstrap file; `brain connect` warns when the file nears that.
- MCP tools are registered as `brain-wiki__brain_search` (server prefix and
  64-character cap respected).
- The workspace `AGENTS.md` has the same weakness as Codex's single global
  file ([Codex](codex.md#1-instructions-come-from-the-mcp-server)). Whether
  OpenClaw passes MCP server instructions to the model is not verified, so
  the block stays until it is.
- A native memory-provider plugin (taking OpenClaw's memory slot) is future
  work; it needs the OpenClaw SDK to build and test.

## Verification

| Item | Status |
|---|---|
| Bundle installs; MCP tools listed and callable | By hand before a release |
| MCP server instructions reach the model | Not tested |
