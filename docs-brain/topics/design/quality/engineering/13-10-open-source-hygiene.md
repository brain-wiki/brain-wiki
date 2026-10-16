---
id: 01M3250V002C4Z1KYPATZF2E5N
type: design
title: "Open-source hygiene"
aliases: ["13 §10"]
source: "docs/design/13-engineering.md#10-open-source-hygiene"
---
# Open-source hygiene

- No real personal data anywhere: examples use a fictional project and
  generic domains; docs never reference private systems.
- Maintainers may keep a local, untracked denylist of private strings
  (names, hosts, paths) checked by a local pre-commit hook, so private
  context cannot slip into commits. The denylist itself never enters the
  repository.
- `SECURITY.md` explains how to report vulnerabilities privately.
