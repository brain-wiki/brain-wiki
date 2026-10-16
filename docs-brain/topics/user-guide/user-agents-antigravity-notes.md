---
id: 01M3250V00R3BJJ1KYN4K62HQ5
type: guide
title: "Antigravity notes"
tags: [user-guide]
source: "docs/user/agents.md#antigravity-notes"
---
# Antigravity notes

- To skip the approval prompt for read tools, add them to
  `permissions.allow` in `~/.gemini/antigravity-cli/settings.json`:
  `"mcp(brain-wiki_brain-wiki/brain_search)"`,
  `"mcp(brain-wiki_brain-wiki/brain_read)"`,
  `"mcp(brain-wiki_brain-wiki/brain_orient)"`.
- Antigravity cannot show brain-wiki's confirmation form, so a rule an
  agent proposes waits for you: `brain review list`, then
  `brain review accept <id>`.
