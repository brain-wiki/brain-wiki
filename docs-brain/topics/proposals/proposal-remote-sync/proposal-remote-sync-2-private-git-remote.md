---
id: 01M3250V00YS2RPZ1J5TTVSPWP
type: proposal
title: "Private git remote"
aliases: ["Remote sync and object storage §2"]
source: "docs/proposal/remote-sync.md#2-private-git-remote"
---
# Private git remote

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
