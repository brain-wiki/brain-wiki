---
id: 01M3250V00P0NKWV1SSCNXPHFG
type: design
title: "The flow"
aliases: ["Skills and onboarding §3.2"]
source: "docs/design/skills-and-onboarding.md#32-the-flow"
---
# The flow

```
check ─► install ─► brain ─► connect ─► permissions ─► harvest ─► verify ─► summary
```

The steps of the `brain-setup` skill:

1. **Check.** Run `brain doctor --json` (§3.4). If the command is missing,
   go to install. If everything is set up, show a short summary and offer
   only the `next_steps`.
2. **Install.** Ask, then run `uv tool install brain-wiki` (or
   `pipx install brain-wiki`). Without installing, every command also runs
   as `uvx --from brain-wiki brain …`, which is how the plugin's own MCP
   server runs.
3. **Brain.**
   - With no brain: suggest a folder outside any code repository
     (`~/brains/personal`), a name, and git. Recommend git strongly: agents
     edit notes directly, and git is the only way to see or revert those
     edits. Warn against a git brain inside a folder a sync tool copies
     between machines. Offer a template
     ([[config-and-storage-5-brain-lifecycle|config and storage §5.1]]): run
     `brain templates`, describe each in a line, and recommend the one
     that fits how the user described their work, or none for an empty
     brain. Then run `brain init PATH --name NAME [--template NAME] [--git]`,
     and point the user at the `_Rules.md` files they can edit to make the
     structure theirs.
   - With an existing vault: run `brain import PATH --overlay --dry-run`,
     summarize the report, and after a yes apply phase 0. Mention phases 1
     and 2 without applying them.
   - A brain below format 3 gets `brain lint --fix --dry-run`, then the
     conversion after a yes.
   - For a git brain: explain that `brain commit` records agents' direct
     edits, and offer a job that runs it every 15 minutes
     (`brain schedule add commit --dry-run` first). Ask whether the job
     should also push (default no). On Windows, or if the user declines,
     mention running `brain commit` by hand.
4. **Connect.** List the agent apps `doctor` found installed and not
   connected. Skip the app the agent runs in if brain-wiki's tools already
   work there. For each app the user picks, run
   `brain connect HOST --dry-run`, show the change, and connect after a
   yes. Report where the instructions went and tell the user to start a new
   session in that app.
5. **Permissions.** Explain that every connected agent can read all of a
   brain, and that separate parts of life (work and personal) belong in
   separate brains, limited with `brain brains limit APP BRAIN...`.
   Editing is on by default, and every app may log episodes; offer `propose_rules` per app
   with `brain agents grant APP propose_rules --dry-run` first.
6. **Harvest.** Explain what is read and which model may see it. Run
   `brain harvest --from HOST --since 30d` (writes nothing) and show the
   sessions found and the estimated tokens. Explain routing, and with one
   brain offer `brain harvest route "~/**" NAME`. Then ask per app: harvest
   on or off (`brain harvest enable APP`, plus
   `brain agents grant APP harvest`), and backfill now, later, or never.
7. **Verify.** Log a test episode with `brain_log_episode`, search for
   it, and show the orientation. Without the MCP tools yet (a new
   install), check with `brain search` and `brain orient`, and log the test
   episode in the next session. The test episode stays in the inbox, and
   consolidation skips it as holding nothing durable.
8. **Summary.** List what was set up, where it lives, and how to undo
   each part.

| Part | Undo |
|---|---|
| Brain created | `brain brains remove NAME` (the files stay) |
| Vault adopted | `brain brains remove NAME` and delete the added files, or revert its commit; phases 1 and 2 with `brain undo RUN` |
| Agent permissions | `brain undo RUN`, or `brain agents revoke APP CAPABILITY` |
| Agent app connected | `brain connect HOST --uninstall` |
| Harvest | `brain harvest disable APP` |
| Commit job | `brain schedule remove commit` |
