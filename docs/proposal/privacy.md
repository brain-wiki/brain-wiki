# Privacy

Status: draft · Open questions in §6 · Replaces the privacy levels removed in
D10 ([design README](../decision/README.md))

Today every host that may use a brain reads all of it. This proposal drafts
what replaces the removed privacy levels.

## 1. Why the old model was removed

The old model put an ordered level on topics and notes
(`default` < `sensitive` < `secret`) and gave each host a maximum level it
could read through brain-wiki's tools, plus a topic allowlist.

| Problem | Effect |
|---|---|
| A level named no threat. | Nobody could say what `sensitive` protected against that `default` did not, or from whom. |
| It controlled reading through the tools, not what happens after. | Once a host reads a note, the note goes to its model provider, into its transcript store, into tool calls, and into what it writes. The level governed none of that. |
| Agents could set it. | Checked edits could raise a note's level and consolidation stamped levels on new notes, although only the owner knows what is sensitive. |
| File access bypassed it. | `brain_list` withheld the folder path from restricted hosts, which made those hosts worse at ordinary work. |
| It cost structure. | Public stand-in notes so open notes could link to private people, hidden-guard counts, and a lint rule (BW312) that warned about links the owner wrote on purpose. |

## 2. Where content goes

```
                               ┌──────────────► S1 model provider (host's, or local)
  brain ──► brain-wiki tools ──┤
    │       (search, read,     ├──────────────► S2 tools the agent calls
    │        orient, hooks)    │                (local: grep, tests; external: web, MCP
    │                          │                 servers, issue trackers, chat, email)
    └─► files (direct reads) ──┤
                               ├──────────────► S3 outputs others see
    host agent ◄───────────────┘                (commits, PRs, docs, messages)
        │
        ├─────────────────────────────────────► S4 host transcript store (later harvest)
        └─ automatic injection (session start,
           per-prompt recall) ────────────────► S5 context the agent never asked for

  consolidation / harvest backend ────────────► S1 model provider
  viz export, git remote, cloud sync ─────────► S6 copies outside the machine
```

Reading is one step. A privacy setting is only useful if it says which of
these sinks content may reach.

## 3. Requirements

| # | Requirement | Why |
|---|---|---|
| P1 | Only the owner sets or changes privacy. Agents never do, in either direction. | Agents cannot know what the owner considers sensitive, and a manipulated agent should not be able to hide or expose a topic. |
| P2 | A level is defined by the sinks it allows (§2), not by an abstract degree of sensitivity. | So every level answers "may a model read this, may it go to a tool, may it end up in an output". |
| P3 | brain-wiki enforces a level where it controls the flow, and tells the host where it does not. | It controls its tools, hooks, packets, writes, and exports; it does not control the host's model or tool calls. |
| P4 | Nothing an agent writes moves content to a less private place. | Consolidation, harvest, and checked edits would otherwise launder private facts into open notes. |
| P5 | The level is visible where the owner reads: in the topic's `index.md` frontmatter. | One place to look, shown in Obsidian, carried along when the folder moves. |
| P6 | With no settings, a brain behaves as it does today. | Privacy is opt-in; most brains never need it. |
| P7 | An unknown host or backend gets only open content. | Trust is granted, never assumed. |

## 4. Draft model

### 4.1 Levels as allowed sinks

| Sink | `open` (default) | `private` | `secret` |
|---|---|---|---|
| S1 Model reads it | any model | models the owner trusts (§4.3) | local models only |
| S2 Passed to tools | any tool | local tools; external tools need the user's confirmation | none |
| S3 Written into outputs | yes | only when the user asks | never |
| S4 Host transcripts and harvest | yes | yes; harvested episodes inherit `private` | the agent never reads it, so nothing reaches a transcript |
| S5 Injected automatically | yes | no; only on an explicit read | no |
| S6 Exports and sync | yes | excluded unless requested | never |
| Consolidated by | any backend | trusted backends, into `private` topics only | local backend only |

Three levels keep the common case simple: most people need only `open` and
`private`. `secret` is for notes no cloud model should see (finances,
health), which the owner reads in an editor.

### 4.2 Declaring

- A topic declares its level in its hub's frontmatter: `bw-privacy: private`
  in `index.md`. It covers the folder, its plain subfolders, and its
  sub-topics; the strictest level along the tree wins.
- Notes carry no level of their own. One private note in an open topic moves
  into a private sub-topic (a folder with an `index.md`, which may hold just
  that note).
- Episodes get a level from code: the strictest of their hinted topics and of
  what the session read (§4.4). An episode is never less private than its
  inputs.
- `brain.toml` keeps no per-topic level. It names which model providers the
  owner trusts for `private` (§4.3).

### 4.3 Which readers are trusted

The level says which sinks are allowed; each reader is then checked against
it. A host's model provider is known from the host (Claude Code, Codex,
Antigravity) or declared for command presets and OpenClaw.

```toml
[privacy]
trusted_providers = ["anthropic"]   # may read `private`; local models always may
```

| Reader | `open` | `private` | `secret` |
|---|---|---|---|
| Host on a trusted provider | yes | yes | no |
| Host on another provider, or unknown | yes | no | no |
| Local model (host or backend) | yes | yes | yes |
| The owner (CLI, editor, viz) | yes | yes | yes |

### 4.4 Enforcement points

| Point | Mechanism | Strength |
|---|---|---|
| Tool reads (search, read, orient, neighbors, list) | Filter by the reader's trust before ranking; a hidden note reads as missing. | Hard, for MCP and CLI |
| Direct file reads | `brain_list` gives the path only to readers trusted at every level present in the brain; others are told to use the tools. | Soft: any program can read files |
| Automatic injection | Session-start briefing and per-prompt recall include `open` content only. | Hard |
| Consolidation and harvest | Packets hold only what the backend may read; ops may not cite a source in a note less private than the source (P4). | Hard |
| Checked edits | `brain check` refuses a change to `bw-privacy`, and a new link from a note to a more private one. | Hard for recorded edits |
| Tool calls after a private read | A read of `private` content marks the session exposed. A pre-tool hook then asks the user before external tools run, where the host has one (Claude Code's `PreToolUse` can ask or deny); elsewhere, the read result says to keep the content local. | Medium, host-dependent |
| Outputs | Read results label `private` content: "keep in this conversation; do not post it". | Soft: depends on the agent |
| Exports | `brain viz --export` leaves out non-`open` notes unless `--include private`. | Hard |

The exposure mark (fourth row from the bottom) is the guardrail against
giving sensitive content to an untrusted third party: it targets the case
where injected text in a web page or issue steers an agent that has just
read private notes into sending them somewhere.

### 4.5 Links

- An `open` note may link to a `private` one; a reader without access sees
  the link text and gets `not_found` for the target. No stand-in notes.
- Agents may not add such a link (P4); the owner may.

## 5. Options

| Option | For | Against |
|---|---|---|
| **A · Levels as allowed sinks (this draft)** | Each level answers concrete questions; covers model, tools, outputs, injection, and exports; owner-only; visible in `index.md` | Most work; tool-call control depends on host hooks |
| B · Restore the old read levels | Already designed and tested | Same problems as §1 |
| C · Separate brains only (today) | Simplest; a directory boundary every tool understands | No links across the boundary; two brains to keep up; no control over tools or outputs inside a brain |
| D · Labels and instructions only | Cheap; no filtering code | Relies entirely on agents obeying; no hard guarantee anywhere |

Recommendation: A, built in two steps. Step 1: levels, declaration,
reader trust, read filtering, injection, packets, and P4. Step 2: the
exposure mark with pre-tool hooks, output labels, and export filtering.

## 6. Open questions

| # | Question | Options |
|---|---|---|
| PQ1 | How many levels? | `open`/`private`; `open`/`private`/`secret` (draft) |
| PQ2 | Where does provider trust live? | `brain.toml` (travels with the brain, draft); user config (per machine) |
| PQ3 | After a private read, what happens before an external tool runs? | Ask the user (draft); block; label only |
| PQ4 | May the owner mark a single note private? | No: use a private sub-topic (draft); owner-only `bw-privacy` on a note |
| PQ5 | May a cloud backend consolidate `private` episodes if its provider is trusted? | Yes (draft); local backends only |
| PQ6 | Does the owner's own CLI get the exposure mark? | No (draft); yes, for agents running the CLI through a shell |
