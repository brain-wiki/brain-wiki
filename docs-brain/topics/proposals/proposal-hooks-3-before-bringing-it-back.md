---
id: 01M3250V00AQHQ8YMR7TCFGZMH
type: proposal
title: "Before bringing it back"
tags: [proposals]
source: "docs/proposals/hooks.md#3-before-bringing-it-back"
---
# Before bringing it back

1. Run each hook on the real host (Claude Code, Codex, Antigravity) and keep
   the recorded payloads as fixtures.
2. Decide how users trust hooks where the host requires it (Codex `/hooks`),
   and say so in `brain connect` output.
3. Fix input coverage: include shell tools in the matcher, or derive inputs
   from the transcript at write time, which also covers tools hooks cannot
   see.
4. OpenClaw hook pack (`HOOK.md` plus a small handler running
   `brain hook openclaw <event>`) and Cursor's own hook events
   (`sessionStart`, `stop`, `preCompact`, `sessionEnd`).
