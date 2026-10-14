---
id: 01M3250V00SCFH3RQ683YCXQV9
type: hub
title: "Roadmap and open questions"
source: "docs/design/14-roadmap-and-open-questions.md"
---
# Roadmap and open questions

Implementation milestones and status, decisions needed, verification items

Generated from `docs/design/14-roadmap-and-open-questions.md`.

## Notes
- [[14-1-implementation-milestones-stage-2]]: Implementation milestones (stage 2)
  - [[m0]]: M0: Skeleton
  - [[m1]]: M1: Format
  - [[m2]]: M2: Index and retrieval
  - [[m3]]: M3: Lint and reports
  - [[m4]]: M4: Write path and runs
  - [[m5]]: M5: Consolidation
  - [[m6]]: M6: MCP server
  - [[m7]]: M7: Agent integrations and skills
  - [[m8]]: M8: Import and harvest
  - [[m9]]: M9: Bench
  - [[m10]]: M10: Visualizer
  - [[m11]]: M11: Release readiness
  - [[m12]]: M12: Agent context and discovery (D25–D28)
  - [[14-11-status-2026-10-11]]: Status (2026-10-11)
- [[14-2-decisions-needed-from-the-maintainer]]: Decisions needed from the maintainer
  - [[q1]]: Q1: How should session capture work when enabled?
  - [[q2]]: Q2: Should sources with external inputs route consolidation runs to review…
  - [[q3]]: Q3: Privacy inside a brain
  - [[q4]]: Q4: Hidden guard counts reveal that a restricted superseding or conflicting…
  - [[q5]]: Q5: Windows support level for v0.1
  - [[q6]]: Q6: npm launcher (npx brain-wiki)
  - [[q7]]: Q7: Publishing identity
  - [[q8]]: Q8: Harvest default
  - [[q9]]: Q9: Where does agent-learned knowledge live? (see 01 §2.1)
  - [[q10]]: Q10: Should retrieval weigh who said it?
  - [[q11]]: Q11: How do world facts stay current? Agent knowledge about the outside…
  - [[q12]]: Q12: What may agents learn without the user? Rules always need the user's…
- [[14-3-verification-items]]: Verification items
  - [[t-1]]: T-1: Does Antigravity accept a root plugin.json that carries Agent Plugins…
  - [[t-2]]: T-2: Does Antigravity expand a plugin-root variable in plugin…
  - [[t-3]]: T-3: Antigravity transcript JSONL line schema
  - [[t-4]]: T-4: Does any host load a plugin-root AGENTS.md (or GEMINI.md) into user…
  - [[t-5]]: T-5: Can an Antigravity headless run be restricted to no tools (custom agent…
  - [[t-6]]: T-6: Codex rollout files
  - [[t-7]]: T-7: Which marketplace file does codex plugin marketplace add read from a…
  - [[t-8]]: T-8: Which hosts support elicitation (either form) for brain_propose_rule…
  - [[t-9]]: T-9: Hook timeouts and output size limits per host in practice
  - [[t-10]]: T-10: Does uvx --from brain-wiki==<version> brain hook … (used by marketplace…
  - [[t-11]]: T-11: How much does the Claude Code transcript format vary across recent…
  - [[t-14]]: T-14: Does Obsidian treat links in list properties (bw-depends_on
  - [[t-15]]: T-15: Does Codex put the MCP server's instructions into the model's context,…
- [[14-4-future-work]]: Future work
- [[14-prior-art]]: Prior art
