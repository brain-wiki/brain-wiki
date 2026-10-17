---
id: 01M3250V00S99ZX6HWMBD0NBS9
type: proposal
title: "CUJs"
aliases: ["Episodes: quick capture, per-agent consolidation §8"]
source: "docs/proposal/episode-lifecycle.md#8-cujs"
---
# CUJs

| # | Journey | Steps | Done when |
|---|---|---|---|
| E1 | An agent captures mid-task | While fixing a build, the agent learns the tests need the emulator. It calls `brain_log_episode(summary=…, pattern="playbook", topics=["lumen"])` and keeps working | One call; the episode has `bw-agent`, session, and turns |
| E2 | The user asks to remember something | "Remember that Maya now leads sync." The agent logs it with the user's words | The episode cites the session; nothing else happens until consolidation |
| E3 | Nightly consolidation for one host | At 21:30 the job selects claude-code's 9 episodes, reopens two conversations for context, writes 2 records, updates the release howto, files 4 facts, skips 2, validates, and commits | Every episode has an outcome; the commit shows the changes |
| E4 | Morning review | The user starts a session. Orientation shows last night's summary. They open `reports/consolidation.md` and the commit diff, and undo one record | The summary matches the run; undo returns that episode to the inbox |
| E5 | Importing documents | The user tells claude-code "bring in my meeting notes from ~/meetings". It reads them, records each meeting as a dated note, files two decisions into the Lumen project notes citing those records, validates, and commits | No episodes; every changed note cites a record or URL in `bw-sources`; asked again, it changes nothing |
| E6 | A host that never consolidates | Cursor captured 12 episodes and has no unattended mode. Orientation shows "cursor 12 (oldest 9 days)". The user tells claude-code to take them; it prepares with `agents=["cursor"]` | The episodes are handled only after the user asked |
| E7 | A preference emerges | Across four episodes the user corrects test style the same way. The consolidator writes `preferences/testing.md` citing all four. In the next session the agent offers to make it a rule | A note, not a rule; the rule waits for the user |
| E8 | A scheduled run fails | The host CLI was updated and its flags changed. The job records the failure; orientation and `brain doctor` show it the next morning | The user learns of it within one session |
| E9 | The user clears the inbox in one go | "Consolidate everything." The agent prepares with `all=true` | Every pending episode is handled |
| E10 | Backfilling a new brain | The user tells claude-code "harvest my last 30 days". It calls `brain_harvest_prepare(since="30d")`, files six sessions, skips four, calls `brain_harvest_done`, and repeats while `remaining` is above zero | No episodes; every changed note cites a session URL; a second harvest finds nothing new |
