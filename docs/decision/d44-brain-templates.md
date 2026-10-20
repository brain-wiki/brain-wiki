# D44: A new brain can start from a template

Status: accepted.
Argued in: [config and storage §5.1](../design/config-and-storage.md#51-templates), [skills and onboarding §2](../design/skills-and-onboarding.md#2-guided-setup).

`brain init --template NAME` starts a brain with a topic tree: folders, each with its topic page (`_Index.md`) and topic rules (`_Rules.md`), and no notes. The first agent session can file knowledge where the template says it belongs, instead of inventing a structure. brain-wiki ships a few templates. `--template PATH` takes a folder shaped like a brain, or an existing brain, so a user can start a second brain shaped like the first, or share their structure.

Only topic pages and topic rules are copied, never notes, so no knowledge comes along. Pages get new ids, and their `## Notes` lists are emptied. Pages are renamed to the new brain's `_Index.md`, so a template made from a brain that uses another page name works too.

## Alternatives considered

- No templates; `brain init` makes an empty brain. Agents then create topics one by one with no plan, and the user reorganizes later.
- Templates from git repositories (cookiecutter style). A network fetch and a dependency for a few small files, and a path to a local clone already works.
- Templates with sample notes. Sample notes in a real brain read as facts to agents, and the user has to find and delete them.
- Templates that also set `rules.md`. Rules carry the user's own words as their source, which a template does not have. A template's conventions are topic rules instead.
