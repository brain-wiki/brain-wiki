---
id: 01M3250V00TNF1BCYDNV4HKH7C
type: proposal
title: "Lint and reports (Notes as content (format 3))"
tags: [proposals]
source: "docs/proposals/notes-as-content.md#7-lint-and-reports"
bw-part_of:
  - "[[proposal-notes-as-content]]"
---
# Lint and reports (Notes as content (format 3))

- Kept: frontmatter schema (shared with `validate`), ids, broken and
  ambiguous links, link repair, orphans, conflict copies (BW112), secrets
  (BW701), size caps, the `AGENTS.md` block, hub entries.
- Removed: claim rules, relation rules, BW206 duplicate spans, unverified
  findings. Supersession cycles are checked on `bw-superseded_by`.
- New: conversion of format 1 and 2 notes (§12).
- Reports: keep `orphans`, `inbox`, `lint`; `stale` lists notes that link to
  superseded notes; `contradictions`, `unverified`, and `duplicates` go away.
