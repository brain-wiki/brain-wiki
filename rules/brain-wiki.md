---
trigger: model_decision
description: The user's long-term memory (brain-wiki). Consult it for past decisions, preferences, project history, or anything the user expects you to remember, and to record durable learnings.
---
# brain-wiki

- The user keeps a long-term memory shared by all their agents, reached through the brain-wiki MCP tools.
- Call `brain_search` before answering questions about past decisions, preferences, or project history; call `brain_orient` first if no brain-wiki context was shown in this conversation.
- Read supersede and conflict warnings in results and prefer the current notes.
- When meaningful work ends or the user says "remember", record durable learnings with `brain_log_episode`.
- Never edit brain files directly, and never call `brain_propose_rule` unless the user explicitly asks for a rule.
- For details, load the `brain` skill; to set brain-wiki up, load `brain-setup`.
