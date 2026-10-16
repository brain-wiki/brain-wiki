---
id: 01M3250V0099BKX9DEBK5B320P
type: design
title: "Open-source hygiene"
aliases: ["Engineering §10"]
source: "docs/design/engineering.md#10-open-source-hygiene"
---
# Open-source hygiene

- No real personal data anywhere. Examples use a fictional project and
  generic domains, and docs never reference private systems.
- Maintainers may keep a local, untracked denylist of private strings
  (names, hosts, paths) checked by a local pre-commit hook, so private
  context cannot slip into commits. The denylist never enters the
  repository.
- `SECURITY.md` explains how to report vulnerabilities privately.
