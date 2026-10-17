# Privacy

Status: draft, with open questions in §6. It would replace the privacy
levels removed by [D10](../decision/d10-no-access-control-in-a-brain.md).

Today every agent that may use a brain reads all of it. This proposal
drafts privacy levels that say where content may go, not only who may read
it.

## 1. Why the old model was removed

The old model put an ordered level on topics and notes (`default`, then
`sensitive`, then `secret`). Each host had a maximum level it could read
through brain-wiki's tools, plus a topic allowlist.

| Problem | Effect |
|---|---|
| A level named no threat | Nobody could say what `sensitive` protected against, or from whom |
| It controlled reading, not what happened next | A note a host read still went to its model, transcripts, tool calls, and outputs |
| Agents could set it | Agents raised levels and stamped them on new notes, though only the owner knows what is sensitive |
| File access bypassed it | Hiding the folder path from restricted hosts made them worse at ordinary work |
| It cost structure | Public stand-in notes, hidden-note counts, and a lint rule (BW312) against links the owner wrote on purpose |

## 2. Where content goes

```
                               ┌──────────────► S1 model provider (host's, or local)
  brain ──► brain-wiki tools ──┤
    │       (search, read,     ├──────────────► S2 tools the agent calls
    │        orient)           │                (local: grep, tests; external: web, MCP
    │                          │                 servers, issue trackers, chat, email)
    └─► files (direct reads) ──┤
                               ├──────────────► S3 outputs others see
    host agent ◄───────────────┘                (commits, PRs, docs, messages)
        │
        ├─────────────────────────────────────► S4 host transcript store (later harvest)
        └─ automatic injection (only if host
           hooks return) ─────────────────────► S5 context the agent never asked for

  consolidation / harvest by a model ─────────► S1 model provider
  viz export, git remote, cloud sync ─────────► S6 copies outside the machine
```

Reading is one step. A privacy setting is useful only if it says which of
these destinations content may reach. Automatic injection (S5) does not
exist today; it comes back only with [host hooks](hooks.md).

## 3. Requirements

| # | Requirement | Why |
|---|---|---|
| P1 | Only the owner sets or changes privacy. Agents never do, in either direction. | Agents cannot know what the owner finds sensitive, and a manipulated agent must not hide or expose a topic. |
| P2 | A level is defined by the destinations it allows (§2). | Every level then answers whether a model may read it, a tool may get it, or an output may contain it. |
| P3 | brain-wiki enforces a level where it controls the flow, and tells the agent where it does not. | It controls its tools, packets, runs, and exports, not the host's model or tool calls. |
| P4 | Nothing an agent writes moves content to a less private place. | Otherwise consolidation, harvest, and direct edits copy private facts into open notes. |
| P5 | The level is visible where the owner reads: in the topic's `index.md` frontmatter. | One place to look, shown in Obsidian, carried along when the folder moves. |
| P6 | With no settings, a brain behaves as it does today. | Most brains never need privacy levels. |
| P7 | An unknown host or backend gets only open content. | Trust is granted, never assumed. |

## 4. Draft model

### 4.1 Levels as allowed destinations

| Destination | `open` (default) | `private` | `secret` |
|---|---|---|---|
| S1: a model reads it | Any model | Models the owner trusts (§4.3) | Local models only |
| S2: passed to tools | Any tool | Local tools; external tools after the user confirms | None |
| S3: written into outputs | Yes | Only when the user asks | Never |
| S4: transcripts and harvest | Yes | Yes; harvested episodes become `private` | The agent never reads it |
| S5: injected automatically | Yes | No; only on an explicit read | No |
| S6: exports and sync | Yes | Left out unless requested | Never |
| Consolidated by | Any agent | Trusted agents, into `private` topics only | Local models only |

Most people need only `open` and `private`. `secret` is for notes no cloud
model should see, such as finances or health, which the owner reads in an
editor.

### 4.2 Declaring

- A topic declares its level in its topic page's frontmatter: `bw-privacy: private`
  in `index.md`. The level covers the folder, its plain subfolders, and its
  sub-topics. The strictest level along the tree wins.
- Notes carry no level of their own. One private note in an open topic moves
  into a private sub-topic: a folder with an `index.md`, which may hold just
  that note.
- Code gives each episode a level: the strictest of its topic hints and of
  what the session read (§4.4). An episode is never less private than its
  inputs.
- `brain.toml` keeps no per-topic level. It names the model providers the
  owner trusts for `private` (§4.3).

### 4.3 Which readers are trusted

The level says which destinations are allowed. Each reader is then checked
against it. A host's model provider is known from the host (Claude Code,
Codex, Antigravity), or declared for distill presets and OpenClaw.

```toml
[privacy]
trusted_providers = ["anthropic"]   # may read `private`; local models always may
```

| Reader | `open` | `private` | `secret` |
|---|---|---|---|
| Host on a trusted provider | Yes | Yes | No |
| Host on another or unknown provider | Yes | No | No |
| Local model | Yes | Yes | Yes |
| The owner (CLI, editor, viz) | Yes | Yes | Yes |

### 4.4 Enforcement points

| Point | Mechanism | Strength |
|---|---|---|
| Tool reads (search, read, orient, neighbors, list) | Filter by the reader's trust before ranking; a hidden note reads as missing | Hard, for MCP and CLI |
| Direct file reads | `brain_list` gives the path only to readers trusted at every level in the brain | Soft |
| Automatic injection, if hooks return | Only `open` content | Hard |
| Consolidation and harvest | Packets hold only what the reader may see | Hard |
| Direct edits | `brain validate` and lint report a changed `bw-privacy` and a new link to a more private note | Soft |
| Tool calls after a private read | Mark the session exposed; ask before external tools run | Medium, host-dependent |
| Outputs | Read results label `private` content as not for posting | Soft |
| Exports | `brain viz --export` leaves out non-`open` notes unless `--include private` | Hard |

- Any program can read files, so `brain_list` can only point readers that
  are not trusted to the tools.
- Direct edits are plain file writes. Validation reports a violation after
  the fact, and git or the owner reverts it. P4 also needs a lint rule for a
  note that cites a source more private than itself.
- The exposure mark guards against giving private content to an untrusted
  third party. It targets text in a web page or issue that steers an agent
  which has just read private notes into sending them somewhere. A pre-tool
  hook asks the user before external tools run, where the host has one
  (Claude Code's `PreToolUse` can ask or deny). Elsewhere, the read result
  says to keep the content local.

### 4.5 Links

- An `open` note may link to a `private` one. A reader without access sees
  the link text and gets `not_found` for the target. There are no stand-in
  notes.
- Agents may not add such a link (P4). The owner may.

## 5. Options

| Option | For | Against |
|---|---|---|
| A. Levels as allowed destinations (this draft) | Concrete questions per level; covers models, tools, outputs, and exports; owner-only; visible in `index.md` | Most work; tool-call control depends on host hooks |
| B. Restore the old read levels | Already designed and tested once | The problems in §1 |
| C. Separate brains only (today) | Simplest; a folder boundary every tool understands | No links across brains; two brains to keep up; no control inside a brain |
| D. Labels and instructions only | Cheap; no filtering code | Relies on agents obeying; no hard guarantee |

Recommendation: A, built in two steps.

1. Levels, declaration, reader trust, read filtering, packets, and P4.
2. The exposure mark with pre-tool hooks, output labels, and export
   filtering.

## 6. Open questions

| # | Question | Options |
|---|---|---|
| PQ1 | How many levels? | `open` and `private`; or `open`, `private`, and `secret` (draft) |
| PQ2 | Where does provider trust live? | `brain.toml`, which travels with the brain (draft); or the user config, per machine |
| PQ3 | After a private read, what happens before an external tool runs? | Ask the user (draft); block; label only |
| PQ4 | May the owner mark a single note private? | No, use a private sub-topic (draft); or an owner-only `bw-privacy` on a note |
| PQ5 | May an agent on a trusted cloud provider consolidate `private` episodes? | Yes (draft); or local models only |
| PQ6 | Does the owner's own CLI get the exposure mark? | No (draft); or yes, for agents running the CLI through a shell |
