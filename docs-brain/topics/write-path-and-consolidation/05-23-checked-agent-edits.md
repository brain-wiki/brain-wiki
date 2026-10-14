---
id: 01M3250V00K7KF4CRQFD519SZE
type: design
title: "Checked agent edits"
aliases: ["05 §2.3"]
tags: [write-path-and-consolidation]
source: "docs/design/05-write-path-and-consolidation.md#23-checked-agent-edits"
bw-part_of:
  - "[[05-2-the-write-paths]]"
---
# Checked agent edits

Some updates are not new knowledge but corrections to a note: a person's new
role, a line added to a meeting note, a wrong fact fixed. Consolidation ops
cannot express prose or property changes, and routing them through episodes
is slow and lossy. Agents whose profile has `edit` may edit notes directly
and then run `brain check` (MCP `brain_check`) on what they changed.

**Who may edit what:**

| Control | Default |
|---|---|
| Profile capability `edit` ([[07-1-agent-profiles\|07 §1]]) | On for the owner profile; off unless listed in `write` for other profiles |
| Topic policy `[topics.<slug>] agent_edits = "allow" \| "review" \| "deny"` ([[02-3-braintoml\|02 §3]]) | `allow`. `review` turns a checked edit into a proposal for the user (§7.2) and restores the file; `deny` refuses it |
| Protected files | Never editable this way: `rules.md` (§6), inbox and archived episodes, `log.md`, `reports/`, `AGENTS.md`, `brain.toml` |

**What `brain check` validates,** for each changed note against its last
recorded version:

| Check | Fails when |
|---|---|
| Schema | Frontmatter is not valid YAML, a required key is missing, `status` has an unknown value, or an `id` was changed or duplicated (lint BW1xx) |
| Links and relations | A relation does not parse or names an unknown `bw-` field (error), or a new link does not resolve (warning) |
| Claims | Claim metadata is broken, or a claim was deleted or reworded in place. Claims change only by superseding (move the old claim to `bw-claims-superseded`, add the new one), so a fact's history is never lost |
| Loss guard | Much of a note's text disappeared in one edit: a warning above 10%, an error above 50% unless `--allow-shrink` |
| Protected files | Any of the files above changed |
| Sync debris | Merge-conflict markers or sync-conflict copies |

**Recording.** A clean check records the change as a run of kind `edit`
(§7.3): the last recorded version is the pre-image, so `brain undo` restores
it; `log.md` gains a line; the brain's git repo, if any, gets a commit;
author `agent:<host>`. Claims the edit added get `origin: agent` and
`taint: unknown` (hosts without hooks cannot report taint), so they show as
unverified until consolidation or the user confirms them. A failed check
records nothing and returns every problem with its line; the agent fixes
the file and checks again, or `brain restore <path>` puts back the last
recorded version.

**The last recorded version.** The index keeps, for each note, the content
it had when a run last wrote it, when `brain check` last recorded it, or
when the index was first built. A note created outside brain-wiki after
that is recorded as absent, so it shows as a pending creation. A note whose
file differs from its recorded version has a *pending edit*. `brain check`
with no paths lists pending edits with their diffs; `brain check --adopt
PATH` records a pending edit as the user's (author `owner`) even when checks
report problems, which is how hand edits made outside brain-wiki can be
given an undo point. Pending edits are not lint errors: humans edit their
notes freely, and nothing nags them. A rename by hand carries the recorded
version to the new path. The recorded versions survive index rebuilds,
since they are the only record of unchecked edits; only a lost index starts
over from the files as they are.

**Review.** An edit to a topic with `agent_edits = "review"` becomes a
proposal in `inbox/proposals/` holding the diff and the new content, and the
file is put back. `brain review accept RUN` applies it as an `edit` run if
the note has not changed since; `brain review reject RUN` drops it.

**Recovery.** The run records each edited file's on-disk version as well as
its pre-image. A crash or failed write rolls back only what the run itself
wrote (the claim stamps), never the agent's edit; `brain undo` restores the
pre-image.

Agents without file tools can still update notes through episodes and
consolidation; a combined edit-and-check tool is future work.
