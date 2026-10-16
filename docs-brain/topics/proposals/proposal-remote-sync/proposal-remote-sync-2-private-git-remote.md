---
id: 01M3250V00YS2RPZ1J5TTVSPWP
type: proposal
title: "Private git remote"
aliases: ["Remote sync and object storage §2"]
source: "docs/proposal/remote-sync.md#2-private-git-remote"
---
# Private git remote

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
