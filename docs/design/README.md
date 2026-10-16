# Design

These documents describe how brain-wiki works today. The code follows them:
change a document in the same change as the behavior it describes.
[Milestones](../roadmap/milestones.md) records what is built,
[decisions](../decision/README.md) records why, and
[proposals](../proposal/README.md) holds designs not built yet.

| Document | What it covers |
|---|---|
| [Overview](overview.md) | The problem, goals, non-goals, principles, and scenarios |
| [Glossary](glossary.md) | The terms the other documents use |
| [Brain format](brain-format.md) | What a brain looks like on disk: layout, `brain.toml`, notes, links, supersession, episodes, rules |
| [Config and storage](config-and-storage.md) | The user config, several brains, choosing a brain, machine state, git, sync tools |
| [Index and search](index-and-search.md) | The SQLite index, freshness, search ranking, the supersession guard, read, neighbors, orientation |
| [Write path](write-path.md) | Direct edits and `brain validate`, episodes, consolidation, `brain commit` and `brain schedule`, runs and undo, rules |
| [Lint and reports](lint-and-reports.md) | Lint rules, profiles, fixes, reports, the pre-commit hook |
| [CLI and MCP](cli-and-mcp.md) | Commands, MCP tools and their schemas, agent profiles, errors |
| [Agent integrations](agent-integrations.md) | The plugin, the instruction block, `brain connect`, harvest; one page per host in `hosts/` |
| [Import](import.md) | Adopting Markdown folders and Obsidian vaults |
| [Security and privacy](security-and-privacy.md) | Threats and how they are handled |
| [Eval bench](eval-bench.md) | Retrieval, lint, and performance suites |
| [Visualizer](visualizer.md) | The 3D brain map |
| [Skills and onboarding](skills-and-onboarding.md) | The three skills, guided setup, and `brain doctor --json` |
| [Engineering](engineering.md) | Repository layout, dependencies, packaging, testing, performance budgets, releases |
| [Prior art](prior-art.md) | What brain-wiki takes from other projects, and the sources consulted |

Brain format and the tool schemas in CLI and MCP use MUST, SHOULD, and MAY
as in RFC 2119.

The same documents, as a brain-wiki brain, are in `docs-brain/`, generated
by `scripts/build_docs_brain.py`.
