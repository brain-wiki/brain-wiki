---
id: 01M3250V00ZMWM4AG8VT6KQZ04
type: proposal
title: "Importing is agent work"
aliases: ["Episodes: quick capture, per-agent consolidation §2.1"]
source: "docs/proposal/episode-lifecycle.md#21-importing-is-agent-work"
---
# Importing is agent work

Documents and an agent's memory files go straight into notes, without
becoming episodes first. `brain import --to-episodes` and
`brain import --from HOST` are removed.

- The user asks an agent: "bring in my meeting notes from ~/meetings",
  "import your memory files". The agent reads the files, searches the
  brain, and applies the patterns of §4 directly: it records a meeting,
  files a decision, updates a howto.
- Each note it creates or changes cites its source in `bw-sources`: the
  document's URL when it has one, or the record note the agent made from
  a local file. Local file paths are not written into notes, because a
  brain moves between machines.
- An agent's memory files are its own earlier notes. It files their
  content like an episode it captured; there is nothing outside the brain
  to cite.
- Text the user did not write (clippings, other people's documents) can
  be recorded or filed with its source, but cannot become a statement
  about the user (Distill, §4). The user says what the files are when
  asking, which replaces `--untrusted`.
- A second import finds the notes already there, because the agent
  searches before it writes. The chunk dedupe keys go away.
- Each host's design doc keeps its memory-file locations, as guidance for
  the agent.
- Cost grows with the volume of text, since an agent reads all of it.
  Copying a folder of notes as they are stays `brain import --into`, and
  adopting a vault stays `brain import --overlay`; both are deterministic
  and need no agent.
