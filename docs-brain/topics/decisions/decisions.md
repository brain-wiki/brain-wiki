---
id: 01M3250V00M60JCXMCKT2164MR
type: hub
title: "Design overview and decisions"
source: "docs/design/README.md"
---
# Design overview and decisions

How the design documents fit together, and the decision log with what each decision rejected and where it is argued

Generated from `docs/design/README.md`.

## Notes
- [[design-reading-order]]: Reading order
- [[design-decision-log]]: Decision log
  - [[d1]]: D1: The brain directory is the only source of truth
  - [[d2]]: D2: The repo contains only source
  - [[d3]]: D3: Frontmatter is flat (scalars and lists of scalars)
  - [[d4]]: D4: Five relation families with eight canonical verbs
  - [[d5]]: D5: Guard co-retrieval
  - [[d6]]: D6: Three write paths: an append-only inbox open to any agent
  - [[d7]]: D7: The LLM only proposes JSON ops
  - [[d8]]: D8: Consolidation reaches an LLM through the host agent (MCP)
  - [[d9]]: D9: Provenance, including inputs, is set by the code path that writes,…
  - [[d10]]: D10: No access control inside a brain for now
  - [[d11]]: D11: v0.1 storage is a local directory with optional git integration
  - [[d12]]: D12: ULIDs identify brains, notes, episodes, claims, rules, and runs
  - [[d13]]: D13: Pending vs consolidated episodes is encoded by location (inbox/ vs…
  - [[d14]]: D14: The repo root is also the plugin root for every host
  - [[d15]]: D15: Remote MCP for chat apps is designed but not built in v0.1
  - [[d16]]: D16: Python ≥ 3.11, stdlib-first, few runtime dependencies
  - [[d17]]: D17: The visualizer is a WebGL galaxy with semantic zoom (galaxy →…
  - [[d18]]: D18: The bench uses synthetic, seeded data and deterministic graders
  - [[d19]]: D19: License
  - [[d20]]: D20: Hosts' own session stores are a second source of episodes (harvest,…
  - [[d21]]: D21: Gemini CLI is not a supported host
  - [[d22]]: D22: Three skills (use, setup, maintain) with a guided, resumable onboarding…
  - [[d23]]: D23: Plugin MCP entries stay a plain uvx command that works on every…
  - [[d24]]: D24: The project lives in the brain-wiki GitHub organization…
  - [[d25]]: D25: Agents learn about brains from static instructions that brain connect…
  - [[d26]]: D26: The tools follow progressive discovery (list, orient, search or browse,…
  - [[d27]]: D27: Agents may read a brain's files directly, at the folder path brain_list…
  - [[d28]]: D28: Agents may edit notes directly when their profile has edit and the…
  - [[d29]]: D29: brain-wiki's own frontmatter fields carry a bw- prefix
  - [[d30]]: D30: Topics form a tree
  - [[d31]]: D31: The CLI is built on Typer (help in plain text, rich never imported)
