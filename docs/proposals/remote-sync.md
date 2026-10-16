# Remote sync and object storage

Status: designed, not scheduled; the git case is partly covered by `brain commit` · Extends [03 §6](../design/03-config-and-storage.md#6-storage-and-sync)

Today a brain is a local folder, optionally a git work tree
([03 §6.2](../design/03-config-and-storage.md#62-v01-local-folder-with-optional-git)).
For a git brain whose branch tracks a branch on `origin`, `brain commit`
fetches and rebases, and with `--push` pushes
([05 §5](../design/05-write-path-and-consolidation.md#5-committing-direct-edits)),
so a private git remote already works as a replica. This proposal adds the
rest, built in order: `brain sync` and `brain remote` for setting up and
inspecting a git remote, then object storage (GCS, S3), then a server mode
that reads a brain from object storage with no local copy.

The local working copy stays the only thing the engine reads and writes
([03 §6.1](../design/03-config-and-storage.md#61-model-a-local-working-copy-always));
a replica is kept in step by a sync component.

## 1. The replicator interface

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
the brain's state-dir lock, never concurrently with an apply; remote
correctness comes from per-object preconditions, with an optional remote
lease object for cross-device exclusion.

A sync component must treat a missing local file inside a known cloud-drive
folder as unknown, not deleted: online-only placeholders look like missing
files ([03 §6.3](../design/03-config-and-storage.md#63-coexisting-with-desktop-sync-tools)).

## 2. Private git remote

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

## 3. Object storage through fsspec (GCS, S3)

For users who want a bucket instead of a git host (or a server deployment,
§4). `fsspec` provides one API over `gcsfs` (GCS) and `s3fs` (S3); the
replicator uses it **only for the remote side**. Local writes keep using
brain-wiki's atomic writer, because fsspec's local transactions commit
through the system temp directory and are not atomic across filesystems.
The dependencies ship as an extra: `brain-wiki[sync]` (`fsspec`, `gcsfs`,
`s3fs`, `google-cloud-storage`).

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
the local copy in plain text (agents must read it). For a remote the user
does not fully trust, this client-side encryption is the recommendation
([10 §7](../design/10-security-and-privacy.md#7-encryption-documentation-not-code-in-v01)).

## 4. Server mode reading object storage

A remote MCP server for chat apps ([remote MCP](remote-mcp.md)) could run
where there is no persistent disk (a container platform). Its brain is a
bucket prefix, so it has no local copy by design.

The engine reads and writes brain files through `LocalStore`
([03 §6.4](../design/03-config-and-storage.md#64-file-access)). Server mode
puts a narrow interface in front of it:

```python
class BrainStore(Protocol):
    def list(self) -> Iterator[FileStat]: ...            # path, size, mtime_ns or token
    def read(self, path: str) -> bytes: ...
    def write(self, path: str, data: bytes, *, expect: Token | None, create_only: bool) -> Token: ...
    def move(self, src: str, dst: str, *, expect: Token | None) -> None: ...
    def delete(self, path: str, *, expect: Token | None) -> None: ...
```

An `FsspecStore` would map `expect` to generation/ETag preconditions; GCS
and S3 are strongly consistent for read-after-write and listing, so no
extra consistency handling is needed. The index for a server would live on
local ephemeral disk and be rebuilt at startup. `LocalStore` already takes
an expected hash on writes, which is the "write only if unchanged" check
consolidation relies on ([05 §7.3](../design/05-write-path-and-consolidation.md#73-apply)),
so the interface adds little.

## 5. What leaves the machine

| Operation | What is sent | To whom |
|---|---|---|
| `brain sync` | File contents | The user's own remote |

## 6. Alternatives considered

| Option | Why not |
|---|---|
| `fsspec.generic.rsync` or a cache layer as the sync engine | One-way, size-only comparison, no conflict handling. |
