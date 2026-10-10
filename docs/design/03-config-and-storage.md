# 03 · Config and storage

Status: draft for review

## 1. Requirements

| # | Requirement | Why |
|---|---|---|
| C1 | Source code and brains are separate. Installing, upgrading, or deleting brain-wiki never touches a brain. | D2; open-source hygiene; users keep data where they choose. |
| C2 | A user can have several named brains and pick one per call, per project, or per host. | Work and personal knowledge should not mix; some agents should see only one. |
| C3 | Moving a brain folder, or opening it on another device, needs at most one command. | Brains are long-lived; machines are not. |
| C4 | Nothing that sync tools or git would corrupt lives in the brain. | SQLite and lock files break under file sync (§6.3). |
| C5 | v0.1 needs nothing but a local folder. Git is used when present. | G6. |
| C6 | Remote storage can be added later without changing the format or the engine's read path. | Private git remotes, GCS, and S3 are expected next. |

## 2. User config

One TOML file per user:

| Platform | Path |
|---|---|
| Linux, macOS | `$XDG_CONFIG_HOME/brain-wiki/config.toml`, default `~/.config/brain-wiki/config.toml` |
| Windows | `%APPDATA%\brain-wiki\config.toml` |

macOS uses the XDG layout like other developer CLIs (git, uv), because the
file is meant to be found and edited by hand. `BRAIN_WIKI_CONFIG` overrides
the path.

```toml
default = "personal"                 # brain used when nothing else selects one
device  = "laptop"                   # optional name for this machine (default: hostname)

[brains.personal]
path = "~/brains/personal"

[brains.work]
path = "~/work/brain"

[hosts.claude-code]                  # optional per-host settings
brain  = "work"                      # default brain for this host
brains = ["work", "personal"]        # brains this host may select (default: all)

[hosts.openclaw]
brains = ["personal"]

[capture]                            # opt-in session capture (08 §6)
enabled = false
hosts   = ["claude-code"]

[harvest]                            # opt-in reading of host session stores (08 §6)
enabled = false
```

- The config holds **locations and per-user choices only**. Everything that
  must travel with a brain (privacy levels, agent profiles, budgets) is in
  that brain's `brain.toml` ([02 §3](02-brain-format.md#3-braintoml)).
- No credentials are ever stored here. Future remote backends use the
  platform's own credential chains (§6.6).
- The file is created by `brain init` and edited by `brain brains add |
  remove | default`, which preserve comments and formatting.

## 3. Choosing a brain

Every CLI command, MCP call, and hook resolves exactly one brain. First
match wins:

| # | Source | Example |
|---|---|---|
| 1 | Explicit argument | `brain search --brain work …`, MCP tool argument `brain: "work"` |
| 2 | Environment variable | `BRAIN_WIKI_BRAIN=work` (a name or a path) |
| 3 | Project file, nearest ancestor of the working directory | `.brain-wiki.toml` containing `brain = "work"` |
| 4 | Host default | `[hosts.claude-code] brain = "work"` (MCP server and hooks know their host id) |
| 5 | User default | `default = "personal"` |
| 6 | Current directory is inside a brain | Walking up finds `brain.toml` |

If nothing matches, the command fails with a message that suggests
`brain init`.

**Host limits.** When `[hosts.<id>] brains` is set, a selection outside
that list is refused for that host, whichever source produced it. This is
how a user keeps, say, a work brain away from a personal assistant.

**Project files** name a brain, not a path, so a repository can carry one
without exposing anyone's directory layout. If the named brain does not
exist for this user, resolution continues with the next source and logs a
notice.

**Why a brain is the unit of separation.** Privacy levels ([02 §3](02-brain-format.md#3-braintoml))
handle sensitivity inside one body of knowledge. Unrelated spheres (an
employer's knowledge and a personal life) differ in who owns them, where
they may be stored, and which models may process them. Separate brains
make that boundary a directory boundary, which every tool understands,
and keep relations from crossing it.

## 4. Machine state

| Kind | Linux / macOS default | Windows | Contents | If deleted |
|---|---|---|---|---|
| config | `~/.config/brain-wiki/` | `%APPDATA%\brain-wiki\` | `config.toml` | Brains must be re-registered |
| state | `$XDG_STATE_HOME/brain-wiki/`, default `~/.local/state/brain-wiki/` | `%LOCALAPPDATA%\brain-wiki\state\` | run records and pre-images (undo), open consolidation packets, session capture and taint markers, harvest watermarks, locks, future sync manifests | Undo history is lost; harvest may re-read sessions (dedupe keys prevent duplicate episodes); nothing in any brain is lost |
| cache | `$XDG_CACHE_HOME/brain-wiki/`, default `~/.cache/brain-wiki/` | `%LOCALAPPDATA%\brain-wiki\cache\` | `brains/<brain-id>/index.sqlite` | Rebuilt on next use |

`BRAIN_WIKI_STATE_DIR` and `BRAIN_WIKI_CACHE_DIR` override them (tests use
these).

Everything is keyed by the brain's `id` from `brain.toml`, not by its
path, so moving a brain folder keeps its index and undo history. When two
folders claim the same id (a copied brain), the second one is keyed by
`<id>-<hash of path>` and lint reports BW105-style duplication at the
brain level ([04 §2](04-index-and-retrieval.md#2-location-and-lifecycle)).

## 5. Brain lifecycle

| Action | Command | What happens |
|---|---|---|
| Create | `brain init <path> [--name n]` | Creates the folder, `brain.toml` with a new id, `AGENTS.md`, `rules.md`, `log.md`, the inbox and topics folders; registers it in the config; makes it the default if it is the first. Offers `git init` (never runs it unasked). |
| Adopt an existing folder | `brain import --overlay <path>` | See [09](09-import.md). Adds `brain.toml` and the generated files without moving anything. |
| Register on another device | `brain brains add <name> <path>` | For a brain that arrived by git clone or file sync. Validates `brain.toml`. |
| Move | move the folder, then `brain brains add <name> <new path>` | Same id, so index and history carry over. |
| Rename | `brain brains rename <old> <new>` | Config only; `brain.toml` `name` is cosmetic. |
| Forget | `brain brains remove <name>` | Config only. The folder, index, and state stay until `--purge-state` deletes the last two. The brain folder is never deleted by brain-wiki. |
| Check | `brain doctor` | Config, brain, index, SQLite features (trigram), git status, host wiring, pending crashed runs. |

## 6. Storage and sync

### 6.1 Model: a local working copy, always

Agents read brain files directly (instruction files, skills, editors,
Obsidian), and the index needs local files to stay fast. So every device
that uses a brain has a **local working copy**: a normal folder. That
folder is the only thing the engine reads and writes.

Remote storage, when added, is a **replica** of that folder, kept in step
by a sync component. The engine never reads from a network filesystem on
the hot path.

```
   engine (index, search, consolidate) ──reads/writes──► local working copy
                                                             │
                                          ┌──────────────────┼──────────────────┐
                                          ▼                  ▼                  ▼
                                   v0.1: nothing,      future: git        future: object
                                   or the user's own   remote replicator  store replicator
                                   sync tool / git                        (fsspec: GCS, S3)
```

The exception is a future stateless server ([§6.7](#67-future-server-mode-reading-object-storage)),
which has no local copy by design.

### 6.2 v0.1: local folder with optional git

**Git mode** (`[git] mode = "auto"` in `brain.toml`): when the brain is a
git work tree, every brain-wiki write operation (consolidation run, review
accept, rule change, `lint --fix`, import apply, `mv`) is committed:

- exactly the files that operation touched are staged, so unrelated
  changes the user has in progress are never swept in;
- the message names the operation, with `Brain-Run:` and `Brain-Agent:`
  trailers ([05 §7.3](05-write-path-and-consolidation.md#73-apply));
- the user's own git identity is used;
- **brain-wiki never pushes, pulls, or changes branches in v0.1.** The user
  syncs when they choose.

Episodes written by agents are not committed one by one (that would be a
commit per capture). They are committed with the run that consolidates
them, or by the user.

Git is driven through the `git` command line (subprocess with porcelain
output). It is the reference implementation, honors the user's hooks and
credential helpers, and avoids long-running library state in the MCP
server. If no `git` binary is found, git mode is off and `brain doctor`
says so.

Suggested `.gitattributes`, written by `brain init` when the user opts
into git:

```gitattributes
log.md merge=union        # append-only from several devices; union avoids conflicts
reports/** -diff          # generated
```

Episodes need no special merge rule: each is a new, uniquely named file.
Curated notes keep git's normal three-way merge; leftover conflict markers
are caught by lint.

### 6.3 Coexisting with desktop sync tools

Many users will keep a brain in Dropbox, iCloud Drive, OneDrive, Google
Drive, Syncthing, or Obsidian Sync. brain-wiki supports this by staying out
of the way:

| Risk | Mitigation |
|---|---|
| SQLite or lock files corrupted by sync | None live in the brain (index in cache, locks in state). Lint flags `*.sqlite`, `*.db`, `*-wal`, `*-shm` found inside a brain. |
| Conflict copies (`… (conflicted copy …).md`, `.sync-conflict-…`, `name 2.md`, `name (1).md`, `-HOSTNAME.md`, `(Conflicted copy …)`) | Lint BW112 detects them with strict patterns, and with loose patterns only when the base file also exists and differs. Never auto-deleted. |
| Online-only placeholders look like missing files | v0.1 has no sync engine that could propagate a "delete". A future sync component must treat a missing local file as unknown, not deleted, inside known cloud-drive folders. |
| Temporary files from atomic writes | Prefix `.brain-tmp-`; dot files are ignored by brain-wiki and by most sync tools' default rules. |
| Two devices consolidating the same episodes | Possible across sync gaps; see [05 §9](05-write-path-and-consolidation.md#9-concurrency-and-multiple-devices). `[consolidate] device = "…"` restricts scheduled runs to one machine. |

### 6.4 Future: the replicator interface

Remote backends plug in behind one small interface, so the engine and the
format never change:

```python
class Replicator(Protocol):
    name: str                                # "git", "gcs", "s3", ...
    def status(self, brain: Brain) -> SyncStatus: ...      # ahead/behind/conflicts, no changes made
    def sync(self, brain: Brain, *, dry_run: bool) -> SyncReport: ...
```

```toml
# user config.toml (credentials are never stored here)
[brains.personal.remote]
type   = "git"                        # or "gcs", "s3"
url    = "git@example.com:me/brain.git"
# type = "gcs"; url = "gs://my-bucket/brains/personal"; project = "my-project"
# type = "s3";  url = "s3://my-bucket/brains/personal"; profile = "personal"
auto   = "after-write"                # off | after-write | interval
```

`brain sync [--dry-run]` and `brain sync status` drive it. Sync runs under
the brain's state-dir lock, never concurrently with an apply.

### 6.5 Future: private git remote

The simplest remote for most users and the first one to build.

- `sync` = `git pull --rebase` (or merge, configurable), then `git push`.
- Pull conflicts in curated notes: the rebase is aborted, the remote
  version is kept in place, and the local version is written as a conflict
  copy `<stem>.conflict-<device>-<UTC timestamp>.md` with `conflict_of:`
  frontmatter, then committed. Lint and `reports/` show it; a person or an
  agent resolves it. Episodes and `log.md` do not conflict (new files;
  union merge).
- Hosting: any git remote the user's credentials reach (a private GitHub,
  GitLab, Codeberg, or Forgejo repository; a bare repository over SSH).
- Encryption at rest on the host is out of scope; documented options are
  an encrypted disk on a self-hosted remote, or a git remote helper that
  encrypts the whole repository (`git-remote-gcrypt`). Per-file filters
  (`git-crypt`) leave file names visible and cannot revoke access, which
  users should know before choosing them.

### 6.6 Future: object storage through fsspec (GCS, S3)

For users who want a bucket instead of a git host (or a server deployment,
§6.7). `fsspec` provides one API over `gcsfs` (GCS) and `s3fs` (S3); the
replicator uses it **only for the remote side**. Local writes keep using
brain-wiki's atomic writer, because fsspec's local transactions commit
through the system temp directory and are not atomic across filesystems.

**Sync algorithm: three-way, manifest-based.** `fsspec.generic.rsync` is
one-way and compares sizes only, so it cannot be used for a brain.
Instead, modeled on rclone bisync:

```
state/sync/<brain-id>/<remote>.sqlite   manifest: path, base_sha256, base_size,
                                         local_mtime_ns, local_size,
                                         remote_token (GCS generation / S3 ETag),
                                         state (live | tombstone), deleted_at
state/sync/<brain-id>/base/<sha256>     content of each file at the last sync

sync:
  1 scan local (stat; hash only when stat changed)
  2 list remote once: find(detail=True) gives token + size per object
  3 per path, compare both sides with the base:
      changed locally only   → upload with precondition (token == base token; create-only if new)
      changed remotely only  → download, atomic local write
      changed on both        → identical? record. Else three-way merge with the base;
                               if hunks overlap, keep remote, write local as a conflict copy
      deleted on one side    → delete the other with a precondition; tombstone
      deleted vs changed     → the edit wins; log it
  4 precondition failed (412) → re-list that path and re-classify (bounded retries)
  5 abort before applying if deletes exceed max_delete (default 50%) or a side lists empty
  6 commit manifest rows only for transfers that succeeded
```

**Content classes.**

- Episodes: uploaded create-only (GCS `ifGenerationMatch=0`, S3
  `If-None-Match: *`). A precondition failure means "already there"; the
  upload is idempotent and can never conflict.
- Curated notes: optimistic concurrency on the object token, three-way
  merge on conflict, conflict copy as a last resort.
- Deletes: tombstones kept 90 days so a device that was offline cannot
  resurrect deleted files; bucket versioning or soft delete recommended
  for recovery.

**Known gaps to close before building it** (from the research):

- `gcsfs` exposes create-only writes but not compare-and-swap on an
  existing object's generation. The GCS replicator needs the
  `google-cloud-storage` client (`if_generation_match`) for updates and
  conditional deletes.
- `s3fs` forwards extra arguments to `put_object`, so `IfMatch` should
  work, but this must be verified end to end; S3 conditional writes
  require SigV4 and current botocore.
- `DirFileSystem` only blocks `..` escapes on local filesystems; remote
  paths must be validated by brain-wiki.

**Credentials** come from the platform chains (Google application default
credentials, AWS profiles and environment), selected by name in the user
config. Optional end-to-end encryption would encrypt each object with
`age` in the replicator, store plaintext hashes in the manifest, and leave
the local copy in plain text (agents must read it).

### 6.7 Future: server mode reading object storage

A remote MCP server for chat apps ([08 §9](08-agent-integrations.md#9-future-remote-mcp-for-chat-apps))
could run where there is no persistent disk (a container platform). Its
brain is a bucket prefix.

To keep that possible without complicating v0.1, the engine reads and
writes brain files through a narrow internal interface:

```python
class BrainStore(Protocol):
    def list(self) -> Iterator[FileStat]: ...            # path, size, mtime_ns or token
    def read(self, path: str) -> bytes: ...
    def write(self, path: str, data: bytes, *, expect: Token | None, create_only: bool) -> Token: ...
    def move(self, src: str, dst: str, *, expect: Token | None) -> None: ...
    def delete(self, path: str, *, expect: Token | None) -> None: ...
```

v0.1 ships only `LocalStore` (atomic writes, `O_EXCL` creates, hash
tokens). An `FsspecStore` would map `expect` to generation/ETag
preconditions; GCS and S3 are strongly consistent for read-after-write and
listing, so no extra consistency handling is needed. The index for a
server would live on local ephemeral disk and be rebuilt at startup.

Building every engine operation on `BrainStore`, including the "write only
if unchanged" checks consolidation already does
([05 §7.3](05-write-path-and-consolidation.md#73-apply)), costs little now
and is what keeps this future cheap.

## 7. Concurrency and locking summary

| Resource | Mechanism |
|---|---|
| Episode creation | `O_EXCL` create of a unique name; no lock |
| Curated writes (apply, fix, rule, review accept, mv) | Per-brain advisory file lock in the state dir (`filelock`), held only during apply |
| Index writes | SQLite WAL, `BEGIN IMMEDIATE`, busy timeout |
| Future sync | Same per-brain lock; remote correctness from per-object preconditions; an optional remote lease object for cross-device exclusion |

Lock files never live inside the brain: sync tools replicate them as
ordinary files and do not carry the lock across machines.

## 8. Failure modes

| Failure | Behavior |
|---|---|
| Config file missing | Commands that need a brain explain how to create or register one. |
| Registered path does not exist (unmounted drive, moved folder) | Clear error with the path; `brain brains add` re-points it. |
| Path exists but `brain.toml` has a different id than recorded | Warn: this may be a different brain; state is keyed by the new id. |
| `brain.toml` has a newer `format` | Read-only mode with a message to upgrade brain-wiki. |
| State directory lost | Undo history gone; everything else works. |
| Git commit fails (hook rejects, detached HEAD, merge in progress) | The write itself already succeeded; the run is recorded with `git_commit: null` and the error; `brain doctor` lists uncommitted runs. |

## 9. Alternatives considered

| Option | Why not |
|---|---|
| Brains inside the source repo | Mixes user data with code; impossible to open-source cleanly. |
| A single brain per user | Forces work and personal knowledge together, or one tool install per sphere. |
| Index and run state inside the brain (`.brain/`) | Sync tools corrupt SQLite; device-specific state conflicts across machines. |
| The engine reading object storage directly on every call | Hosts and editors need local files; latency on every hook; offline breaks. |
| `fsspec.generic.rsync` or a cache layer as the sync engine | One-way, size-only comparison, no conflict handling. |
| Requiring git | Many users sync with cloud drives; git stays optional. |
| A git library (GitPython, dulwich) instead of the CLI | GitPython is in maintenance mode and leaks resources in long-running processes; dulwich lacks some porcelain; the CLI honors user hooks and credentials. dulwich remains an option where no git binary exists. |
