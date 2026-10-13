---
id: 01M3250V00EHDA28T6N6PYV53G
type: design
title: "Users and scenarios"
aliases: ["01 §6"]
tags: [overview]
source: "docs/design/01-overview.md#6-users-and-scenarios"
bw-part_of:
  - "[[overview]]"
---
# Users and scenarios

Primary user: an individual who works with two or more AI agents and wants
them to share durable, correct, inspectable memory: both the user's own
knowledge as context and what the agents learn on their own (§2.1).
Secondary: an Obsidian user who wants their existing vault to become
agent-readable without restructuring it.

| # | Scenario | Flow (details in) |
|---|---|---|
| S0 | **Onboarding.** The user installs the plugin and says "set up brain-wiki". | The setup skill walks through install, brain creation or vault import, connecting other agents, privacy, capture and harvest, and routines, with a dry run before every write. [[skills-onboarding-and-routines\|15]] |
| S1 | **Session start.** An agent starts in a project. | The static block `brain connect` wrote tells it to call `brain_list` and `brain_orient` when the task may depend on the user's knowledge; the briefing (what the brain holds, rules, topics, recent changes) fits a fixed budget. [[index-and-retrieval\|04]], [[08-32-the-static-instruction-block\|08 §3.2]] |
| S2 | **Recall during a task.** The agent asks about a past decision. | `search` returns the matching notes plus every note that supersedes or conflicts with them; the agent opens one with `read` and follows its relations with `neighbors`, or reads files directly when allowed. [[index-and-retrieval\|04]] |
| S2b | **An agent updates a note.** The user says "Maya moved to the platform team." | The agent edits the person's note and runs `brain check`, which validates and records the edit. [[05-23-checked-agent-edits\|05 §2.3]] |
| S3 | **Capture.** The agent learned something worth keeping. | It logs an episode (MCP or CLI), or the opt-in session-end hook writes one from the transcript. [[write-path-and-consolidation\|05]] |
| S3b | **Harvest and backfill.** Sessions happened without capture, or before brain-wiki existed. | `brain harvest` reads finished sessions from the hosts' own stores, routes each to a brain by project, and distills them into episodes, after a dry run. [[05-22-harvesting-sessions\|05 §2.2]] |
| S4 | **Consolidation.** Pending episodes are folded into topic notes. | Either the user asks their agent to consolidate (agent backend), or a scheduled job runs a headless agent CLI (command backend). [[write-path-and-consolidation\|05]] |
| S5 | **Human editing.** The user edits notes in Obsidian. | Edits are picked up by the next freshness check; lint reports problems. [[lint-and-reports\|06]] |
| S6 | **Bring an existing vault.** | `brain import --overlay` adopts a folder in place, with a dry-run report before any change. [[import\|09]] |
| S7 | **Work and personal.** | Two named brains; a project file or host setting picks the right one; agents can be limited to a subset. [[config-and-storage\|03]] |
| S8 | **A bad consolidation.** | `brain undo <run>` restores the prior state exactly. [[write-path-and-consolidation\|05]] |
| S9 | **Inspect the brain.** | `brain viz` opens a 3D map of topics, notes, and relations. [[visualizer\|12]] |
| S10 | **Compare models.** | `brain bench` runs the same consolidation scenarios through several headless CLIs and reports validity and agreement. [[eval-bench\|11]] |
| S11 | **An agent builds its own knowledge.** A long-running assistant learns how the user's tools, services, and projects behave. | It logs episodes as it works; a scheduled routine consolidates them unattended into agent-origin claims, marked unverified when web or tool output influenced them; later sessions on any host recall them with their sources. [[write-path-and-consolidation\|05]], [[skills-onboarding-and-routines\|15]] |
