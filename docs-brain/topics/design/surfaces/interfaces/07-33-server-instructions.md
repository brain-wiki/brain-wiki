---
id: 01M3250V006BWFM0MSVDAGPVXN
type: design
title: "Server instructions"
aliases: ["07 §3.3"]
source: "docs/design/07-interfaces.md#33-server-instructions"
---
# Server instructions

Sent once per connection:

The static instruction block ([[08-32-the-static-instruction-block|08 §3.2]])
without its skill pointer, so clients without an instruction file follow
the same policy. Its file-access and edit sentences follow the host's
profile, as in the block. Codex gets the policy only this way, and weighs
the first 512 characters most, so the first bullet ends within them
([[agent-codex-1-instructions-come-from-the-mcp-server|Codex]]).
