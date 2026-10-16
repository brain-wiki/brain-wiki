---
id: 01M3250V00A3NVM59PVS32Q2A9
type: design
title: "Verification (Antigravity (desktop, IDE, CLI))"
source: "docs/design/hosts/antigravity.md#verification"
---
# Verification (Antigravity (desktop, IDE, CLI))

| Item | Status |
|---|---|
| Full `plugin.json` accepted; skills, MCP tools, and rules load (T-1) | Verified |
| Plugin-root variables and plugin command environment (T-2) | Verified: none set |
| Transcript line schema (T-3) | Verified for structure |
| `always_on` rule reaches the model; plugin `AGENTS.md` does not (T-4) | Verified |
| Headless runs restricted to no tools (T-5) | Not possible; prompt preamble instead |
| Elicitation (T-8) | Declared, then declined without showing the user |
