# Config and storage

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

[harvest]                            # opt-in reading of host session stores (08 §6)
enabled = false
hosts   = ["claude-code"]
```

- The config holds **locations and per-user choices only**. Everything that
  must travel with a brain (topics, agent profiles, budgets) is in
  that brain's `brain.toml` ([brain format §3](brain-format.md#3-braintoml)).
- No credentials are ever stored here. Proposed remote backends use the
  platform's own credential chains ([remote sync](../proposal/remote-sync.md)).
- The file is created by `brain init` and edited by `brain brains add |
  remove | rename | default | limit`, which preserve comments and formatting.
  `add` and `rename` take names of lowercase letters, digits, and hyphens.
  An edit that fails changes nothing.
- `brain brains remove NAME` drops every reference to the brain in the same
  write:
  - `default`, when it names the brain;
  - `[hosts.*] brain`, when a host default names it;
  - the brain's entry in each `[hosts.*] brains` limit. A limit list that
    becomes empty stays empty, so that host may use no brain; removing a
    brain never widens a host's access;
  - `[harvest.routes]` entries that route to it.
- No schedule settings live here. The OS scheduler holds the commit jobs
  (§6.2), so there is nothing in the config to drift from them.

## 3. Choosing a brain

Every CLI command and MCP call resolves exactly one brain. First
match wins:

| # | Source | Example |
|---|---|---|
| 1 | Explicit argument | `brain search --brain work …`, MCP tool argument `brain: "work"` |
| 2 | Environment variable | `BRAIN_WIKI_BRAIN=work` (a name or a path) |
| 3 | Project file, nearest ancestor of the working directory | `.brain-wiki.toml` containing `brain = "work"` |
| 4 | Host default | `[hosts.claude-code] brain = "work"` (the MCP server knows its host id) |
| 5 | User default | `default = "personal"` |
| 6 | Current directory is inside a brain | Walking up finds `brain.toml` |

If nothing matches, the command fails with a message that suggests
`brain init`.

**Host limits.** When `[hosts.<id>] brains` is set, a selection outside
that list is refused for that host, whichever source produced it. This is
how a user keeps, say, a work brain away from a personal assistant.
`brain brains limit HOST BRAIN...` sets the list and `unlimit HOST` clears
it; a host default outside the new list moves to its first brain, since it
would only be refused.

**Project files** name a brain, not a path, so a repository can carry one
without exposing anyone's directory layout. If the named brain does not
exist for this user, resolution silently continues with the next source.

**Why a brain is the unit of separation.** Unrelated spheres (an
employer's knowledge and a personal life) differ in who owns them, where
they may be stored, and which models may process them. Separate brains
make that boundary a directory boundary, which every tool understands,
and keep links from crossing it. Every host that may use a brain reads
all of it; finer-grained privacy inside a brain is being redesigned
([proposal](../proposal/privacy.md)).

## 4. Machine state

| Kind | Linux / macOS default | Windows | Contents | If deleted |
|---|---|---|---|---|
| config | `~/.config/brain-wiki/` | `%APPDATA%\brain-wiki\` | `config.toml` | Brains must be re-registered |
| state | `$XDG_STATE_HOME/brain-wiki/`, default `~/.local/state/brain-wiki/` | `%LOCALAPPDATA%\brain-wiki\state\` | run records and pre-images (undo), episode markers, harvest watermarks, locks, `brain connect` records and backups, headless preset runs, per-brain commit state (`schedule/<brain-id>.json`), the logs (`logs/brain-wiki.log`, and `logs/schedule-<brain-id>.log` per commit job) | Undo history is lost; harvest may re-read sessions (dedupe keys prevent duplicate episodes); `connect --uninstall` can no longer restore what it replaced; `brain schedule list` and `brain doctor` show no last run until the next `brain commit`; nothing in any brain is lost |
| cache | `$XDG_CACHE_HOME/brain-wiki/`, default `~/.cache/brain-wiki/` | `%LOCALAPPDATA%\brain-wiki\cache\` | `brains/<brain-id>/index.sqlite` | Rebuilt on next use |
| data | `$XDG_DATA_HOME/brain-wiki/`, default `~/.local/share/brain-wiki/` | `%LOCALAPPDATA%\brain-wiki\data\` | `plugin/<host>/`, the plugin copies `brain connect` registers | Connected hosts lose brain-wiki until `brain connect` runs again |

`BRAIN_WIKI_CONFIG` (the file), `BRAIN_WIKI_STATE_DIR`, `BRAIN_WIKI_CACHE_DIR`,
and `BRAIN_WIKI_DATA_DIR` override them (tests use these).

Everything is keyed by the brain's `id` from `brain.toml`, not by its
path, so moving a brain folder keeps its index and undo history. When two
folders claim the same id (a copied brain), the second one is keyed by
`<id>-<hash of path>`, so the copies never share an index or undo history
([index and search §2](index-and-search.md#2-location-and-lifecycle)). Nothing
reports the duplicate id.

## 5. Brain lifecycle

| Action | Command | What happens |
|---|---|---|
| Create | `brain init <path> [--name n]` | Creates the folder, `brain.toml` with a new id, `AGENTS.md`, `rules.md`, `log.md`, the inbox and topics folders; registers it in the config (refusing a name or folder already registered to another brain); makes it the default if it is the first. With `--git`, runs `git init` and commits the new files, so a clone is a working brain. |
| Adopt an existing folder | `brain import --overlay <path>` | See [import](import.md). Adds `brain.toml` and the generated files without moving anything. |
| Register on another device | `brain brains add <name> <path>` | For a brain that arrived by git clone or file sync. Validates `brain.toml`. |
| Move | move the folder, then `brain brains add <name> <new path>` | Same id, so index and history carry over. The name may be re-pointed because its old folder is no longer a brain (or holds the same brain); otherwise the name is refused. |
| Rename | `brain brains rename <old> <new>` | Config only; `brain.toml` `name` is cosmetic. Refused when `<new>` is already registered; otherwise the entry and every reference to `<old>` (`default`, `[hosts.*] brain` and `brains`, harvest routes) change in one write. The brain's commit job (found by id) is rewritten to the new name. |
| Forget | `brain brains remove <name>` | Config only: the entry and every reference to it (§2). The brain's commit job is removed. The folder, index, and state stay until `--purge-state` deletes the last two. The brain folder is never deleted by brain-wiki. |
| Commit direct edits | `brain commit`, or a job from `brain schedule add commit` | See §6.2. |
| Check | `brain doctor` | Config (including brains registered with no default), brain, index (note counts as in `brain brains`), SQLite features (trigram), git status, host wiring, pending crashed runs; commit jobs whose brain is no longer registered, brains that have not synced with origin for a day, and git brains with uncommitted changes older than a day and no commit job. |

## 6. Storage and sync

### 6.1 Model: a local working copy, always

Agents read brain files directly (instruction files, skills, editors,
Obsidian), and the index needs local files to stay fast. So every device
that uses a brain has a **local working copy**: a normal folder. That
folder is the only thing the engine reads and writes.

Remote storage is the user's own sync tool or git in v0.1. Any remote
brain-wiki adds will be a **replica** of that folder, kept in step by a
sync component; the engine never reads from a network filesystem on the hot
path. Git and object-storage replicas, and a server mode with no local
copy, are a [proposal](../proposal/remote-sync.md).

### 6.2 v0.1: local folder with optional git

**Git mode** (`[git] mode = "auto"` in `brain.toml`): when the brain is a
git work tree, every brain-wiki run (`consolidate --done`, rule accept or
change, `agents grant`, `lint --fix`, import apply, `mv`) is committed:

- exactly the files that operation touched are staged, so unrelated
  changes the user has in progress are never swept in;
- the message names the operation, with `Brain-Run:` and `Brain-Agent:`
  trailers ([write path §7](write-path.md#7-runs));
- the user's own git identity is used;
- a run never pushes, pulls, or changes branches.

**Direct edits** (agents and people editing notes with their own tools) are
not runs. `brain commit` snapshots them, by hand or from an OS job; it is the
only command that talks to a remote
([write path §5](write-path.md#5-committing-direct-edits)):

```
brain commit [--settle 2m] [--no-fetch] [--push] [--dry-run] [--json]
brain schedule add commit [--every 15m] [--push] [--dry-run]
brain schedule remove commit [--dry-run]
brain schedule list
```

1. Take the brain's write lock without waiting; if a run holds it, skip
   this round (`busy`).
2. Snapshot: stage the files `git status` reports as changed, new, or
   deleted, except those modified within `--settle` (default 2 minutes), so
   a half-finished multi-file edit waits for the next round. Commit them
   with the subject `brain: snapshot N notes in <topic>` (or `in N
   topics`), one body line per file with git's status letter, and the
   trailer `Brain-Agent: schedule` (or the host under `--as HOST`). Never
   amend.
3. Sync, when the branch tracks a branch on `origin` (`--no-fetch` skips
   it): fetch without prompting, rebase local commits onto the upstream
   with `--autostash`, and with `--push` push. A rebase conflict is aborted,
   leaving commits and files as before, and exits 1 naming the files; later
   rounds keep committing locally and report the conflict until the user
   runs `git pull --rebase` in the brain. A network or authentication
   failure keeps the local commit and exits 0 with a warning (`offline`).
4. Record the time and outcome under the brain's id in
   `<state>/schedule/<brain-id>.json` (§4).

- Validation is not a gate: history must hold broken states too, so they
  can be restored.
- A brain that is not a git work tree is refused with a note.
- `--as HOST` needs `edit`, and `--push` is refused under `--as`, since
  pushing publishes the brain.

`brain schedule` installs one job per brain, keyed by the brain's id, with
the platform's own scheduler:

| Platform | Job |
|---|---|
| Linux | A user crontab block between `# >>> brain-wiki commit <brain-id>` and `# <<< brain-wiki commit <brain-id>`; other crontab lines stay byte for byte |
| macOS | A LaunchAgent labeled `io.github.brain-wiki.commit.<brain-id>` in `~/Library/LaunchAgents/` |
| Windows | Not yet |

- **The OS scheduler is the source of truth.** No schedule settings live in
  brain-wiki's config. `brain schedule list` (or bare `brain schedule`)
  reads the crontab blocks or LaunchAgents and shows, per job, the brain
  (resolved by id), its interval, whether it pushes, and its last run.
- Each job runs `brain commit --brain <name>` on its own interval and logs
  to `<state>/logs/schedule-<brain-id>.log`, so a slow or failing brain
  never blocks another.
- `--every` takes 5m, 10m, 15m, 20m, 30m, or 1h, 2h, 3h, 4h, 6h, 8h, 12h,
  24h, values cron and launchd express alike. Adding again replaces the
  brain's job; `--push` is chosen per job and off by default.
- The job calls `brain` by the absolute path resolved at install time, and
  carries the `BRAIN_WIKI_*` overrides set then, because cron and launchd
  start with a minimal environment.
- `brain brains rename` rewrites the job and `brain brains remove` deletes
  it (§5). A moved folder breaks the registration, not the job: re-pointing
  the registration fixes both.
- Scheduling is the user's decision: `brain schedule` is refused under
  `--as HOST`.
- `--dry-run` prints the crontab block or plist and the commands it would
  run; where no backend works (no `crontab`), it prints what to add by hand.

Episodes written by agents are not committed one at a time by the writer
(that would be a commit per capture). The next `brain commit` snapshot
picks them up, as does the `consolidate --done` run that archives them.

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

**Share through origin, not a sync tool.** With a commit job that pushes on
each machine, every machine fetches, rebases, and pushes, so origin is how a
git brain moves between machines. Two machines committing into one `.git`
folder that a sync tool copies between them can corrupt the repository.

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
| Two devices consolidating the same episodes | Possible across sync gaps; see [write path §9](write-path.md#9-concurrency-and-multiple-devices). |
| A git brain whose `.git` folder the sync tool copies while two machines commit | Not mitigated: the repository can be corrupted. Share git brains through origin (§6.2). |

### 6.4 File access

The engine reads and writes brain files only through `LocalStore`: paths are
resolved and checked to stay inside the brain root, writes are atomic
(temporary file, `fsync`, rename), new files are created with `O_EXCL`, and
a write can name the content hash it expects to replace, so a file changed
since it was read is never overwritten. Every run uses this, so a run never
overwrites a file someone edited after the run read it.

## 7. Concurrency and locking summary

| Resource | Mechanism |
|---|---|
| Episode creation | `O_EXCL` create of a unique name; no lock |
| brain-wiki's runs (`consolidate --done`, fix, rule, review accept, grant, mv, import) | Per-brain advisory file lock in the state dir (`filelock`), held only while the run commits |
| `brain commit` | The same lock, taken without waiting; a held lock skips the round |
| Direct edits by agents and people | No lock: files are the user's |
| Index writes | SQLite WAL, `BEGIN IMMEDIATE`, busy timeout |

Lock files never live inside the brain: sync tools replicate them as
ordinary files and do not carry the lock across machines.

## 8. Failure modes

| Failure | Behavior |
|---|---|
| Config file missing | Commands that need a brain explain how to create or register one. |
| Registered path does not exist (unmounted drive, moved folder) | Clear error with the path; `brain brains add` re-points it. |
| Path exists but `brain.toml` has a different id than before | No warning; index and state are keyed by the new id, so the brain starts with a fresh index and no undo history. |
| `brain.toml` has a newer `format` | Refused with a message to upgrade brain-wiki ([brain format §13](brain-format.md#13-format-versioning)). |
| State directory lost | Undo history gone; everything else works. |
| Git commit fails (hook rejects, detached HEAD, merge in progress) | The write itself already succeeded; the run is recorded with `git_commit: null` and the error; `brain doctor` lists uncommitted runs. |
| `brain commit` hits a rebase conflict, or a push is rejected twice | Exit 1 naming the files; the rebase is aborted, so commits and files are as before. Later rounds commit locally and report it until the user resolves it. |
| `brain commit` cannot reach origin (offline, credentials) | The local commit stays; outcome `offline`, exit 0 with a warning; `brain doctor` reports a brain that has not synced for a day. |
| A commit job names a brain that is no longer registered | The job's `brain commit` fails; `brain doctor` reports the job and how to remove it. |

## 9. Alternatives considered

| Option | Why not |
|---|---|
| Brains inside the source repo | Mixes user data with code; impossible to open-source cleanly. |
| A single brain per user | Forces work and personal knowledge together, or one tool install per sphere. |
| Index and run state inside the brain (`.brain/`) | Sync tools corrupt SQLite; device-specific state conflicts across machines. |
| The engine reading object storage directly on every call | Hosts and editors need local files; latency on every call; offline breaks. |
| Requiring git | Many users sync with cloud drives; git stays optional. |
| A git library (GitPython, dulwich) instead of the CLI | GitPython is in maintenance mode and leaks resources in long-running processes; dulwich lacks some porcelain; the CLI honors user hooks and credentials. dulwich remains an option where no git binary exists. |
