<!-- brain-wiki:begin (generated; edit outside these markers) -->
# This folder is a brain-wiki brain: brain-wiki-docs

- Read `rules.md` first: standing directives from the user.
- Knowledge lives in `topics/<topic>/`; each topic has a hub (`index.md`).
- To record something, add a new file under `inbox/episodes/YYYY/MM/<ULID>.md`
  (or call the brain-wiki MCP tool `brain_log_episode`). Never edit `topics/` or
  `rules.md` directly.
- A note's frontmatter is metadata; its facts and `[[links]]` are in the body. A note
  with `status: superseded` names its replacement in `bw-superseded_by`: read that one.

| Topic | Hub | About |
|---|---|---|
| agent-integrations | topics/agent-integrations/agent-integrations.md | Plugin bundle, instruction block, brain connect, harvest; one page per host in agents/ |
| agents | topics/agents/agents.md | How brain-wiki integrates with each agent host: install, instructions, harvest, verification |
| brain-format | topics/brain-format/brain-format.md | The on-disk contract: layout, manifest, notes, links, supersession, episodes, rules (normative) |
| config-and-storage | topics/config-and-storage/config-and-storage.md | User config, multiple brains, brain selection, machine state, git, desktop sync tools |
| decisions | topics/decisions/decisions.md | How the design documents fit together, and the decision log with what each decision rejected and where it is argued |
| engineering | topics/engineering/engineering.md | Repo layout, dependencies, packaging, testing, performance budgets, release |
| eval-bench | topics/eval-bench/eval-bench.md | Retrieval, lint, and performance suites |
| import | topics/import/import.md | Adopting existing Markdown folders and Obsidian vaults |
| index-and-retrieval | topics/index-and-retrieval/index-and-retrieval.md | SQLite schema, freshness, search ranking, the supersession guard, read, neighbors, orientation |
| interfaces | topics/interfaces/interfaces.md | CLI commands, MCP tools and schemas, agent profiles, error model |
| lint-and-reports | topics/lint-and-reports/lint-and-reports.md | Rules, profiles, fixes, generated reports, pre-commit use |
| overview | topics/overview/overview.md | Problem, goals, non-goals, principles, scenarios, glossary |
| proposals | topics/proposals/proposals.md | Designs not implemented yet, and the backlog of ideas without a design |
| roadmap-and-open-questions | topics/roadmap-and-open-questions/roadmap-and-open-questions.md | Implementation milestones and status, decisions needed, verification items |
| security-and-privacy | topics/security-and-privacy/security-and-privacy.md | Threat model and mitigations |
| skills-and-onboarding | topics/skills-and-onboarding/skills-and-onboarding.md | The three skills, the guided setup flow, and brain doctor --json |
| user-guide | topics/user-guide/user-guide.md | How to install, connect, use, and maintain brain-wiki |
| visualizer | topics/visualizer/visualizer.md | 3D brain map |
| write-path-and-consolidation | topics/write-path-and-consolidation/write-path-and-consolidation.md | Direct edits and brain validate, episodes and provenance, the consolidation helper, brain commit and brain schedule, runs and undo, rules |
<!-- brain-wiki:end -->

# brain-wiki docs

This brain is generated from `docs/` by `scripts/build_docs_brain.py`. Edit the docs and
rerun the script; edits made here are overwritten.

