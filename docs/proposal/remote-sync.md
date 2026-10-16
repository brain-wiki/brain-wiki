# Remote sync and object storage

Status: designed, not scheduled. `brain commit` already syncs a git brain
with origin. Extends
[config and storage §6](../design/config-and-storage.md#6-storage-and-sync).

Today a brain is a local folder, optionally a git work tree
([config and storage §6.2](../design/config-and-storage.md#62-local-folder-with-optional-git)).
When the branch of a git brain tracks a branch on `origin`, `brain commit`
fetches, rebases, and with `--push` pushes
([write path §5](../design/write-path.md#5-committing-direct-edits)). A
private git remote already works as a replica.

This proposal adds the rest, built in this order:

1. `brain sync` and `brain remote`, to set up and inspect a git remote and
   to keep both versions when a rebase conflicts.
2. Object storage (GCS, S3).
3. A server mode that reads a brain from object storage, with no local copy.

The local working copy stays the only thing the engine reads and writes
([config and storage §6.1](../design/config-and-storage.md#61-model-a-local-working-copy-always)).
A sync component keeps each replica up to date.

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

- `brain sync [--dry-run]` and `brain sync status` drive it.
- Sync takes the brain's write lock, the same lock runs and `brain commit`
  take, so it never runs during a write.
- Remote correctness comes from per-object preconditions. An optional lease
  object on the remote can keep two devices from syncing at once.
- A missing local file inside a known cloud-drive folder counts as unknown,
  not deleted, because online-only placeholders look like missing files
  ([config and storage §6.3](../design/config-and-storage.md#63-coexisting-with-desktop-sync-tools)).

## 2. Private git remote

A private git remote is the simplest remote for most users, and the first
to build.

Today `brain commit` fetches, rebases with `--autostash`, and pushes with
`--push`. On a conflict it aborts the rebase, names the files, and exits 1,
and the user resolves it with `git pull --rebase`. `log.md` merges as a
union through `.gitattributes`, and episodes are new files, so neither
conflicts.

The proposal changes this:

- `brain remote` sets up and shows `origin` and the upstream branch, so the
  user does not need git commands.
- On a conflict in a note, sync keeps the remote version in place and
  writes the local version as a conflict copy,
  `<stem>.conflict-<device>-<UTC timestamp>.md`, with `conflict_of:`
  frontmatter. It commits both. Lint and `reports/` show the copy, and a
  person or an agent resolves it.
- Any git remote the user's credentials reach works: a private GitHub,
  GitLab, Codeberg, or Forgejo repository, or a bare repository over SSH.

Encryption at rest on the git host is out of scope. The documented options
are an encrypted disk on a self-hosted remote, or a git remote helper that
encrypts the whole repository (`git-remote-gcrypt`). Per-file filters
(`git-crypt`) leave file names visible and cannot revoke access, which users
should know before choosing them.

## 3. Object storage through fsspec (GCS, S3)

Object storage is for users who want a bucket instead of a git host, and
for a server deployment (§4). `fsspec` provides one API over `gcsfs` (GCS)
and `s3fs` (S3). The replicator uses it only for the remote side.

- Local writes keep using brain-wiki's atomic writer. fsspec's local
  transactions commit through the system temp folder and are not atomic
  across filesystems.
- The dependencies ship as an extra: `brain-wiki[sync]` (`fsspec`, `gcsfs`,
  `s3fs`, `google-cloud-storage`).

### 3.1 Sync algorithm

The sync is three-way and based on a manifest, modeled on rclone bisync.
`fsspec.generic.rsync` cannot be used for a brain: it is one-way, compares
sizes only, and has no conflict handling.

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

### 3.2 Content classes

- Episodes are uploaded create-only (GCS `ifGenerationMatch=0`, S3
  `If-None-Match: *`). A failed precondition means the episode is already
  there, so the upload is idempotent and never conflicts.
- Notes use optimistic concurrency on the object token, a three-way merge on
  conflict, and a conflict copy as a last resort.
- Deletes leave tombstones for 90 days, so a device that was offline cannot
  bring deleted files back. Bucket versioning or soft delete is recommended
  for recovery.

### 3.3 Gaps to close before building

- `gcsfs` supports create-only writes but not compare-and-swap on an
  existing object's generation. The GCS replicator needs the
  `google-cloud-storage` client (`if_generation_match`) for updates and
  conditional deletes.
- `s3fs` forwards extra arguments to `put_object`, so `IfMatch` should work,
  but this needs an end-to-end test. S3 conditional writes need SigV4 and a
  current botocore.
- `DirFileSystem` blocks `..` escapes only on local filesystems, so
  brain-wiki must validate remote paths itself.

### 3.4 Credentials and encryption

Credentials come from the platform chains (Google application default
credentials, AWS profiles and environment), selected by name in the user
config.

Optional end-to-end encryption would encrypt each object with `age` in the
replicator, keep plaintext hashes in the manifest, and leave the local copy
in plain text, because agents must read it. This client-side encryption is
the recommendation for a remote the user does not fully trust
([security §7](../design/security-and-privacy.md#7-encryption)).

## 4. Server mode reading object storage

A remote MCP server for chat apps ([remote MCP](remote-mcp.md)) could run
where there is no persistent disk, such as a container platform. Its brain
is a bucket prefix, so it has no local copy.

The engine reads and writes brain files through `LocalStore`
([config and storage §6.4](../design/config-and-storage.md#64-file-access)).
Server mode puts a narrow interface in front of it:

```python
class BrainStore(Protocol):
    def list(self) -> Iterator[FileStat]: ...            # path, size, mtime_ns or token
    def read(self, path: str) -> bytes: ...
    def write(self, path: str, data: bytes, *, expect: Token | None, create_only: bool) -> Token: ...
    def move(self, src: str, dst: str, *, expect: Token | None) -> None: ...
    def delete(self, path: str, *, expect: Token | None) -> None: ...
```

- An `FsspecStore` would map `expect` to generation or ETag preconditions.
  GCS and S3 are strongly consistent for read-after-write and listing, so no
  extra consistency handling is needed.
- The server's index would live on local temporary disk and be rebuilt at
  startup.
- `LocalStore.write_bytes` already takes an expected hash and refuses a
  file that changed, and runs use it when they apply
  ([write path §7.3](../design/write-path.md#73-apply)). The interface adds
  little.

## 5. What leaves the machine

`brain sync` sends file contents to the user's own remote, and nowhere else.
