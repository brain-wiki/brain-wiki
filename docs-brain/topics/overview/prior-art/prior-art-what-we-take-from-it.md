---
id: 01M3250V00Z5ZCGZ88Z9QQNE68
type: design
title: "What we take from it"
source: "docs/design/prior-art.md#what-we-take-from-it"
---
# What we take from it

brain-wiki borrows ideas from earlier tools, never code, and is licensed Apache-2.0 (D19). The main ideas:

- Plain files and a hard size budget for context loaded into every session, from the memory files hosts keep for themselves.
- Notes as Markdown with wikilinks, indexed by a local database that can be rebuilt, from Markdown and SQLite knowledge tools.
- Raw sources compiled into curated pages that cite them, with health reports, from LLM-maintained wikis.
- Supersession instead of deletion, from hosted memory layers.

brain-wiki differs from all of them in the same few ways. One brain serves every host. Supersession is metadata with a retrieval rule, the supersession guard. Nothing needs a service or database to run. Agents edit notes directly, `brain validate` checks the edits, and git keeps their history.
