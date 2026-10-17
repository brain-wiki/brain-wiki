---
id: 01M3250V00JH3WD3KEAAQ51F43
type: design
title: "Requirements (Write path)"
aliases: ["Write path §1"]
source: "docs/design/write-path.md#1-requirements"
---
# Requirements (Write path)

| # | Requirement | Why |
|---|---|---|
| W1 | Writing an episode never blocks or fails an agent's work, and never conflicts across agents or devices. | Agents log mid-task, several at once, on several devices. |
| W2 | A note is an ordinary Markdown file that agents and people edit directly. brain-wiki checks its frontmatter, not its meaning. | Facts live in the body ([[brain-format-6-notes\|brain format §6]]). See [[d34-direct-edits\|D34]]. |
| W3 | Untrusted content never becomes a standing directive without the user. | One poisoned web page must not steer every later session (G4). |
| W4 | Every change can be undone. Git keeps direct edits, and run records keep brain-wiki's own writes. | The history of a fact is part of the fact. |
| W5 | Every change brain-wiki itself makes is recorded with what it touched, before and after, and who asked. | Debugging, and undo that does not depend on git. |
| W6 | Any LLM the user already runs can do the writing, with no API keys. | [[d08-no-model-calls\|D8]], G6. |
