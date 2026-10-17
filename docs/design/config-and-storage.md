# Config and storage

This document covers the per-user config file, how a command picks a brain,
the machine state brain-wiki keeps outside brains, and how brains are
stored, committed, and synced.

## 1. Requirements

| # | Requirement | Why |
|---|---|---|
| C1 | Source code and brains are separate. Installing, upgrading, or deleting brain-wiki never touches a brain. | [D2](../decision/d02-code-and-brains-apart.md); users keep data where they choose. |
| C2 | A user can have several named brains and pick one per call, per project, or per host. | Work and personal knowledge should not mix, and some agents should see only one. |
| C3 | Moving a brain folder, or opening it on another device, needs at most one command. | Brains outlive machines. |
| C4 | Nothing that sync tools or git would corrupt lives in the brain. | SQLite and lock files break under file sync (§6.3). |
| C5 | A local folder is all a brain needs. Git is used when present. | G6, [D11](../decision/d11-local-storage.md). |
| C6 | Remote storage can be added later without changing the format or the engine's read path. | Private git remotes, GCS, and S3 are expected ([proposal](../proposal/remote-sync.md)). |

## 2. User config

One TOML file per user holds where brains live and per-user choices.

| Platform | Path |
|---|---|
| Linux, macOS | `$XDG_CONFIG_HOME/brain-wiki/config.toml`, default `~/.config/brain-wiki/config.toml` |
| Windows | `%APPDATA%\brain-wiki\config.toml` |

macOS uses the XDG layout, like git and uv, because the file is meant to be
found and edited by hand. `BRAIN_WIKI_CONFIG` overrides the path.

```toml
default = "personal"                 # brain used when nothing else selects one
device  = "laptop"                   # name for this machine (default: hostname)

[brains.personal]
path = "~/brains/personal"

[brains.work]
path = "~/work/brain"

[hosts.claude-code]                  # optional per-host settings
brain  = "work"                      # default brain for this host
brains = ["work", "personal"]        # brains this host may select (default: all)

[hosts.openclaw]
brains = ["personal"]

[harvest]                            # reading host session stores (write path §2.2)
enabled = true
hosts   = ["claude-code"]

[harvest.routes]                     # session folder pattern -> brain, longest first
"~/work/**" = "work"
"~/**"      = "personal"
```

- Everything that must travel with a brain (topics, agent profiles,
  budgets) is in that brain's `brain.toml`
  ([brain format §3](brain-format.md#3-braintoml)), not here.
- No credentials are stored here.
- `brain init` creates the file. `brain brains add`, `remove`, `rename`,
  `default`, `limit`, and `unlimit` edit it, and `brain harvest enable`,
  `disable`, and `route` edit `[harvest]`. These keep comments and
  formatting.
- Brain names are lowercase letters, digits, and hyphens. An edit that
  fails changes nothing.
- `brain brains remove NAME` drops every reference to the brain in the same
  write: `default`, a `[hosts.*] brain` that names it, its entry in each
  `[hosts.*] brains` list, and `[harvest.routes]` entries that route to it.
  A host list that becomes empty stays empty, so removing a brain never
  widens a host's access.
- No schedule settings live here. The OS scheduler holds the commit jobs
  ([write path §5.2](write-path.md#52-brain-schedule)).

Other `[harvest]` keys (`since`, `min_idle_minutes`, `min_user_turns`,
`include_headless`) are described in
[write path §2.2](write-path.md#22-harvesting-sessions).

## 3. Choosing a brain

Every CLI command and MCP call resolves exactly one brain. The first source
that names a brain wins:

| # | Source | Example |
|---|---|---|
| 1 | Explicit argument | `brain search --brain work …`, MCP tool argument `brain: "work"` |
| 2 | Environment variable | `BRAIN_WIKI_BRAIN=work` (a name or a path) |
| 3 | Project file, in the working directory or nearest ancestor | `.brain-wiki.toml` containing `brain = "work"` |
| 4 | Host default | `[hosts.claude-code] brain = "work"` (the MCP server knows its host id) |
| 5 | User default | `default = "personal"` |
| 6 | The working directory is inside a brain | Walking up finds `brain.toml` |

- Each source may give a registered name or a path to a brain folder.
- An argument or environment variable that names nothing is an error
  (`not_found`). A project file, host default, or user default that names
  nothing is skipped.
- When nothing matches, the command fails with `not_configured`. With
  brains registered, the message suggests `brain brains default NAME` or
  `--brain NAME`. With none, it suggests `brain setup`.

When `[hosts.<id>] brains` is set, a brain outside that list is refused for
that host (`forbidden`), whichever source chose it. This keeps a work brain
away from a personal assistant. `brain brains limit HOST BRAIN...` sets the
list and `unlimit HOST` clears it. A host default outside the new list
moves to its first brain, since it would only be refused.

A project file should name a brain rather than a path, so a repository can
carry one without exposing anyone's directory layout. If the named brain is
not registered for this user, resolution moves on to the next source.

A brain is the unit of separation. Unrelated spheres (an employer's
knowledge and a personal life) differ in who owns them, where they may be
stored, and which models may process them. Separate brains make that
boundary a directory boundary and keep links from crossing it. Every host
that may use a brain reads all of it
([D10](../decision/d10-no-access-control-in-a-brain.md); finer control is a
[proposal](../proposal/privacy.md)).

## 4. Machine state

brain-wiki keeps four directories outside brains:

| Kind | Linux and macOS default | Windows | Contents |
|---|---|---|---|
| config | `~/.config/brain-wiki/` | `%APPDATA%\brain-wiki\` | `config.toml` |
| state | `$XDG_STATE_HOME/brain-wiki/`, default `~/.local/state/brain-wiki/` | `%LOCALAPPDATA%\brain-wiki\state\` | listed below |
| cache | `$XDG_CACHE_HOME/brain-wiki/`, default `~/.cache/brain-wiki/` | `%LOCALAPPDATA%\brain-wiki\cache\` | `brains/<brain-key>/index.sqlite` |
| data | `$XDG_DATA_HOME/brain-wiki/`, default `~/.local/share/brain-wiki/` | `%LOCALAPPDATA%\brain-wiki\data\` | `plugin/<host>/`, the plugin copies `brain connect` registers |

`BRAIN_WIKI_CONFIG` (the file), `BRAIN_WIKI_STATE_DIR`,
`BRAIN_WIKI_CACHE_DIR`, and `BRAIN_WIKI_DATA_DIR` override them. Tests use
these.

The state directory holds:

| Path | What |
|---|---|
| `brains/<brain-key>/runs/` | Run records and pre-images, for undo ([write path §8](write-path.md#8-undo)) |
| `brains/<brain-key>/written/`, `dedupe/` | Episode markers ([write path §2.1](write-path.md#21-ways-an-episode-is-written)) |
| `brains/<brain-id>/root` | The folder that owns the brain's id on this device |
| `brains/<brain-key>/scheduled/<host>.json` | The last scheduled consolidation per host ([write path §4.8](write-path.md#48-scheduled-consolidation)) |
| `harvest/` | Harvest watermarks and in-agent harvest runs |
| `locks/<brain-key>.lock` | Per-brain write locks |
| `connect/` | `brain connect` records and backups |
| `runs/` | Working folders for scheduled consolidation runs, which harvest skips |
| `schedule/<brain-id>.json` | The last `brain commit` outcome per brain |
| `logs/` | `brain-wiki.log`, `schedule-<brain-id>.log` per commit job, and `consolidate-<brain-id>-<host>.log` per consolidate job |

What deleting each directory costs:

- config: brains must be registered again.
- state: undo history is lost. Harvest may re-read sessions, but dedupe
  keys prevent duplicate episodes. `brain connect --uninstall` can no
  longer restore what it replaced. `brain schedule list` and `brain doctor`
  show no last run until the next `brain commit`. Nothing in any brain is
  lost.
- cache: the index is rebuilt on next use.
- data: connected hosts lose brain-wiki until `brain connect` runs again.

State and cache are keyed by the brain's `id` from `brain.toml`, not by its
path, so moving a brain folder keeps its index and undo history. When a
second folder claims an id already owned by an existing folder (a copied
brain), the copy is keyed `<id>-<hash of path>`, so the two never share an
index or undo history
([index and search §2](index-and-search.md#2-location-and-lifecycle)).
Nothing reports the duplicate id. Commit jobs and their state files use the
plain id.

## 5. Brain lifecycle

| Action | Command |
|---|---|
| Create | `brain init [PATH] [--name NAME] [--git] [--no-register]` |
| Adopt an existing folder | `brain import <path> --overlay` ([import](import.md)) |
| Register on another device | `brain brains add NAME PATH` |
| Move | Move the folder, then `brain brains add NAME NEW_PATH` |
| Rename | `brain brains rename OLD NEW` |
| Forget | `brain brains remove NAME [--purge-state]` |
| Commit direct edits | `brain commit`, or a job from `brain schedule add commit` (§6.2) |
| Check | `brain doctor` |

- `brain init` creates the folder; `brain.toml` with a new id; `AGENTS.md`,
  `rules.md`, `log.md`, and `.gitattributes`; and the `topics/`, `inbox/`,
  `archive/`, and `reports/` folders. It registers the brain (refusing a
  name or folder already registered to another brain) and makes it the
  default if it is the first. With `--git`, it runs `git init` and commits
  the new files, so a clone is a working brain.
- `brain brains add` validates `brain.toml`. It is for a brain that arrived
  by git clone or file sync, or one that moved. A name may be re-pointed to
  a new folder only when its old folder is no longer a brain or holds the
  same brain. Otherwise the name is refused. The same id means index and
  history carry over.
- `brain brains rename` changes only the config. `brain.toml`'s `name` is
  cosmetic. It is refused when NEW is already registered. Otherwise the
  entry and every reference to OLD (`default`, `[hosts.*] brain` and
  `brains`, harvest routes) change in one write, and the brain's commit job
  (found by id) is rewritten to the new name.
- `brain brains remove` changes only the config: the entry and every
  reference to it (§2). It removes the brain's commit job. `--purge-state`
  also deletes the brain's index and run history on this device. brain-wiki
  never deletes a brain folder.
- `brain doctor` checks the config (including a missing default and
  entries that name unregistered brains), each brain (format, note and
  pending-episode counts, open proposals), SQLite FTS5 and trigram support,
  host wiring, and commit jobs
  ([write path §5.2](write-path.md#52-brain-schedule)). It rolls back runs a
  crash left half-applied and lists runs whose git commit failed.

## 6. Storage and sync

### 6.1 Model: a local working copy, always

Agents read brain files directly (instruction files, skills, editors,
Obsidian), and the index needs local files to stay fast. So every device
that uses a brain has a local working copy, a normal folder. That folder is
the only thing the engine reads and writes.

Today a brain moves between devices through git or the user's own sync
tool. Any remote brain-wiki adds will be a replica of that folder, kept
current by a sync component. The engine never reads a network filesystem on
the hot path. Git and object-storage replicas, and a server mode with no
local copy, are a [proposal](../proposal/remote-sync.md).

### 6.2 Local folder with optional git

When the brain is a git work tree and `[git] mode` in `brain.toml` is
`"auto"` (the default) or `"on"`, every brain-wiki run is committed as it
applies ([write path §7.3](write-path.md#73-apply)):

- exactly the files the run touched are staged, so the user's unrelated
  work in progress is never swept in;
- the message names the operation, with `Brain-Run:` and `Brain-Agent:`
  trailers;
- the user's own git identity and hooks are used;
- a run never pushes, pulls, or changes branches.

Direct edits by agents and people are not runs. `brain commit` snapshots
them, by hand or from an OS job that `brain schedule` installs, and is the
only command that talks to a remote. Episodes are not committed one at a
time; the next snapshot picks them up, as does the `consolidate --done` run
that archives them. See
[write path §5](write-path.md#5-committing-direct-edits) for the snapshot,
sync, conflict handling, and job details.

Git is driven through the `git` command line with porcelain output. The CLI
is the reference implementation, honors the user's hooks and credential
helpers, and keeps no long-running library state in the MCP server. Without
a `git` binary, no brain counts as a git work tree, so runs are not
committed and `brain commit` refuses.

`brain init` writes this `.gitattributes`:

```gitattributes
log.md merge=union
reports/** -diff
```

`log.md` is appended to from several devices, and a union merge avoids
conflicts. Reports are generated. Episodes need no merge rule, because each
is a new, uniquely named file. Notes keep git's normal three-way merge, and
lint catches leftover conflict markers (BW114).

Share a git brain through origin, not a sync tool. Two machines committing
into one `.git` folder that a sync tool copies between them can corrupt the
repository.

### 6.3 Coexisting with desktop sync tools

Users may keep a brain in Dropbox, iCloud Drive, OneDrive, Google Drive,
Syncthing, or Obsidian Sync. brain-wiki supports this by staying out of the
way:

| Risk | Mitigation |
|---|---|
| SQLite or lock files corrupted by sync | None live in the brain. Lint BW115 flags `*.sqlite`, `*.sqlite3`, `*.db`, `*-wal`, and `*-shm` files inside one. |
| Conflict copies | Lint BW112 (below). Never deleted automatically. |
| Online-only placeholders look like missing files | brain-wiki has no sync engine that could spread a deletion. A future sync component must treat a missing file in a cloud-drive folder as unknown, not deleted. |
| Temporary files from atomic writes | Named `.brain-tmp-…`. brain-wiki ignores dot files, as do most sync tools' defaults. |
| Two devices consolidating the same episodes | Possible across sync gaps ([write path §9](write-path.md#9-concurrency-and-multiple-devices)). |
| A synced `.git` folder while two machines commit | Not mitigated; the repository can be corrupted. Share git brains through origin (§6.2). |

BW112 matches names such as `(conflicted copy …)`, `.sync-conflict-…`,
`.conflict-<host>-<time>.md`, `.conflictN`, and `..path1`. It matches
`name (1).md` and `name 2.md` only when `name.md` also exists and differs.

### 6.4 File access

The engine reads and writes brain files only through `LocalStore`:

- paths are resolved, symlinks included, and must stay inside the brain
  root;
- writes are atomic (temporary file, `fsync`, rename);
- new files can be created with `O_EXCL`;
- a write can name the content hash it expects to replace, so a file
  changed since it was read is never overwritten.

Every run uses the expected-hash write.

## 7. Concurrency and locking summary

| Resource | Mechanism |
|---|---|
| Episode creation | A unique ULID file name; dedupe markers created with `O_EXCL`; no lock |
| brain-wiki's runs | Per-brain advisory file lock in the state directory (`filelock`), held while the run commits; waits up to 30 seconds |
| `brain commit` | The same lock, taken without waiting; a held lock skips the round |
| Direct edits by agents and people | No lock |
| Index writes | SQLite WAL, `BEGIN IMMEDIATE`, 5-second busy timeout |

Lock files never live inside the brain. Sync tools copy them as ordinary
files and do not carry the lock across machines.

## 8. Failure modes

| Failure | Behavior |
|---|---|
| Config file missing | Commands that need a brain say how to set one up (`brain setup`). |
| Registered path missing (unmounted drive, moved folder) | An error with the path. `brain doctor` reports it and suggests `brain brains add NAME NEW_PATH`. |
| `brain.toml` has a different id than before | No warning. Index and state are keyed by the new id, so the brain starts with a fresh index and no undo history. |
| `brain.toml` has a newer `format` | Refused with a message to upgrade brain-wiki ([brain format §13](brain-format.md#13-format-versioning)). |
| State directory lost | Undo history is gone; everything else works. |
| A run's git commit fails (hook, detached HEAD, merge in progress) | The run is applied. Its record keeps `git_commit: null` and the error, the CLI prints a warning, and `brain doctor` lists it. |
| `brain commit` hits a conflict, cannot reach origin, or the job names an unregistered brain | See [write path §5](write-path.md#5-committing-direct-edits). |

## 9. Alternatives considered

| Option | Why not |
|---|---|
| Brains inside the source repository | Mixes user data with code ([D2](../decision/d02-code-and-brains-apart.md)). |
| A single brain per user | Forces work and personal knowledge together. |
| Index and run state inside the brain (`.brain/`) | Sync tools corrupt SQLite, and device state conflicts across machines. |
| The engine reading object storage on every call | Hosts and editors need local files; every call gets slower; offline breaks. |
| Requiring git | Many users sync with cloud drives ([D11](../decision/d11-local-storage.md)). |
| A git library (GitPython, dulwich) instead of the CLI | GitPython is in maintenance mode and leaks resources in long-running processes, and dulwich lacks some porcelain. The CLI honors user hooks and credentials. dulwich remains an option where no git binary exists. |
