<!-- brain-wiki:begin (generated; edit outside these markers) -->
# This folder is a brain-wiki brain: brain-wiki-docs

- Read `rules.md` first: standing directives from the user.
- Knowledge lives in `topics/<topic>/`; each topic has a hub (`index.md`).
- To record something, add a new file under `inbox/episodes/YYYY/MM/<ULID>.md`
  (or call the brain-wiki MCP tool `brain_log_episode`). Never edit `topics/` or `rules.md`
  directly; consolidation folds episodes into notes.
- A note's relations are its `bw-<verb>` frontmatter fields: part_of, has_part,
  depends_on, enables, conflicts_with, supersedes, superseded_by, related_to. If a
  note is superseded or conflicts with another, read both before acting.

| Topic | Hub | About |
|---|---|---|
| agent-integrations | topics/agent-integrations/agent-integrations.md | Plugin bundle, per-host details, hooks, brain connect, capture, future remote MCP |
| brain-format | topics/brain-format/brain-format.md | The on-disk contract: layout, manifest, notes, claims, relations, episodes, rules (normative) |
| config-and-storage | topics/config-and-storage/config-and-storage.md | User config, multiple brains, brain selection, machine state, git, sync, future backends |
| decisions | topics/decisions/decisions.md | How the design documents fit together, and the decision log with what each decision rejected and where it is argued |
| engineering | topics/engineering/engineering.md | Repo layout, dependencies, packaging, testing, performance budgets, release |
| eval-bench | topics/eval-bench/eval-bench.md | Retrieval, lint, consolidation, and performance suites |
| import | topics/import/import.md | Adopting existing Markdown folders and Obsidian vaults |
| index-and-retrieval | topics/index-and-retrieval/index-and-retrieval.md | SQLite schema, freshness, search ranking, guard co-retrieval, read, orientation |
| interfaces | topics/interfaces/interfaces.md | CLI commands, MCP tools and schemas, agent profiles, error model |
| lint-and-reports | topics/lint-and-reports/lint-and-reports.md | Rules, profiles, fixes, generated reports, pre-commit use |
| overview | topics/overview/overview.md | Problem, goals, non-goals, principles, scenarios, glossary |
| roadmap-and-open-questions | topics/roadmap-and-open-questions/roadmap-and-open-questions.md | Implementation milestones, future work, decisions needed |
| security-and-privacy | topics/security-and-privacy/security-and-privacy.md | Threat model and mitigations |
| skills-onboarding-and-routines | topics/skills-onboarding-and-routines/skills-onboarding-and-routines.md | The three skills, the guided setup flow, brain doctor --json, and routine templates for hosts' schedulers |
| user-guide | topics/user-guide/user-guide.md | How to install, connect, use, and maintain brain-wiki |
| visualizer | topics/visualizer/visualizer.md | 3D brain map |
| write-path-and-consolidation | topics/write-path-and-consolidation/write-path-and-consolidation.md | Episodes, provenance and taint, ops, consolidation backends, validation, review, undo |
<!-- brain-wiki:end -->

# brain-wiki docs

This brain is generated from `docs/` by `scripts/build_docs_brain.py`. Edit the docs and
rerun the script; edits made here are overwritten.

