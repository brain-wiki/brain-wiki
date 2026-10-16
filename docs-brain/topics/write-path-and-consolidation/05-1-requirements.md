---
id: 01M3250V00KC38BAEW3T0W4T25
type: design
title: "Requirements (Write path and consolidation)"
aliases: ["05 §1"]
tags: [write-path-and-consolidation]
source: "docs/design/05-write-path-and-consolidation.md#1-requirements"
---
# Requirements (Write path and consolidation)

| # | Requirement | Why |
|---|---|---|
| W1 | Writing an episode must never block or fail an agent's work, and never conflict across agents or devices. | Agents log mid-task, several at once, on several devices. |
| W2 | A note is an ordinary Markdown file that agents and people edit directly; brain-wiki checks its frontmatter, never its meaning. | Facts live in the body ([[02-6-notes\|02 §6]]); a protocol for every edit was heavier than the common case needs. |
| W3 | Untrusted content can never become a standing directive without the user. | One poisoned web page must not steer every future session (G4). |
| W4 | Every change can be undone: git keeps direct edits, run records keep brain-wiki's own writes. | The history of a fact is part of the fact. |
| W5 | Every change brain-wiki itself makes is recorded: what it touched, before and after, and who asked. | Debugging, and undo that does not depend on git. |
| W6 | Any LLM the user already runs can do the writing, with no API keys. | D8; G6. |
