---
id: 01M3250V00Q9JWVJFD9YBT5S8X
type: threat
title: "T7: Hostile files attack the tools"
aliases: ["threat T7"]
source: "docs/design/security-and-privacy.md#3-threats-and-mitigations"
---
# T7: Hostile files attack the tools

Hostile files attack the tools: YAML bombs, huge files, pathological regexes, invalid UTF-8.

**Mitigations:** YAML is parsed with the safe loader, and frontmatter over 64 KiB is refused. Files over 2 MiB are indexed by path only. Parsers are line-oriented with linear-time regexes, and FTS queries are built from quoted tokens. Parse failures degrade to plain text.
