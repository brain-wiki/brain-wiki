<!-- brain-wiki:begin (generated; edit outside these markers) -->
# This folder is a brain-wiki brain: brain-wiki-docs

- Read `rules.md` first: standing directives from the user.
- Knowledge lives in `topics/<topic>/`; each topic has a page (`<folder>.md`).
- Do not change files here. To record something, call the brain-wiki MCP tool
  `brain_log_episode`.
- A note's frontmatter is metadata; its facts and `[[links]]` are in the body. Relation
  fields hold links: `bw-part_of`, `bw-depends_on`, `bw-conflicts_with` (read both). A note
  with `status: superseded` names its replacement in `bw-superseded_by`: read that one.

| Topic | Page | About |
|---|---|---|
| design | topics/design/design.md | How brain-wiki works and why: the design documents and the decisions (17 sub-topics) |
| experience | topics/experience/experience.md | What using brain-wiki is like: the journeys it serves, and the user guide (2 sub-topics) |
| overview | topics/overview/overview.md | What brain-wiki is and why: the problem, principles, goals, concepts, and prior art (2 sub-topics) |
| proposals | topics/proposals/proposals.md | Designs not built yet, one topic each |
| roadmap | topics/roadmap/roadmap.md | What is built, what comes next, and what is still open (4 sub-topics) |
<!-- brain-wiki:end -->

# brain-wiki docs

This brain is generated from `docs/` by `scripts/build_docs_brain.py`. Edit the docs and
rerun the script; edits made here are overwritten.

