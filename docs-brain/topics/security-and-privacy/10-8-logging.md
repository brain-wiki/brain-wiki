---
id: 01M3250V00FMFDXC2QG3NGVZD4
type: design
title: "Logging"
aliases: ["10 §8"]
tags: [security-and-privacy]
source: "docs/design/10-security-and-privacy.md#8-logging"
bw-part_of:
  - "[[security-and-privacy]]"
---
# Logging

- Logs go to `<state>/logs/brain-wiki.log`, rotated, local only.
- Default level records operations and errors without note content.
  `-v` adds content snippets for debugging; the log file says so at the top
  of each verbose session.
