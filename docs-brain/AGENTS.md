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
| design | topics/design/design.md | How brain-wiki works and why: the design documents and the decisions (18 sub-topics) |
| experience | topics/experience/experience.md | What using brain-wiki is like: the journeys it serves, and the user guide (2 sub-topics) |
| overview | topics/overview/overview.md | What brain-wiki is and why: the problem, principles, goals, concepts, and prior art (3 sub-topics) |
| proposals | topics/proposals/proposals.md | Designs not built yet, one topic each (6 sub-topics) |
| roadmap | topics/roadmap/roadmap.md | What is built, what comes next, and what is still open (4 sub-topics) |
<!-- brain-wiki:end -->

# brain-wiki docs

This brain is generated from `docs/` by `scripts/build_docs_brain.py`. Edit the docs and
rerun the script; edits made here are overwritten.

