---
id: 01M3250V00PP4NGNRGK76H71D8
type: threat
title: "T7: Hostile files attack the tools"
aliases: ["threat T7"]
tags: [security-and-privacy]
source: "docs/design/10-security-and-privacy.md#3-threats-and-mitigations"
---
# T7: Hostile files attack the tools

**Hostile files attack the tools.** YAML bombs, huge files, pathological regexes, invalid UTF-8.

**Mitigations:** `yaml.safe_load` with size limits on frontmatter (64 KiB); file size cap for indexing (default 2 MiB, larger files indexed by name only); line-oriented parsers with linear-time regexes; FTS queries built from sanitized tokens. Parse failures degrade to plain text.

**Residual risk:** —

## Relations
- part_of [[10-3-threats-and-mitigations]]
