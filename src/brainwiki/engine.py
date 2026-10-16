"""Engine: one brain, its store, its index, and the caller's profile."""

from __future__ import annotations

import sqlite3
from pathlib import Path
from typing import TYPE_CHECKING

from brainwiki.config import Brain, Profile, UserConfig, load_user_config, resolve_brain
from brainwiki.store import LocalStore

if TYPE_CHECKING:
    from brainwiki.index import TopicTree


class Engine:
    def __init__(self, brain: Brain, host: str | None = None, user: UserConfig | None = None):
        self.brain = brain
        self.host = host
        self.manifest = brain.manifest
        self.store = LocalStore(brain.root)
        self.user = user or load_user_config()
        self.profile: Profile = self.manifest.profile(host)
        self._db: sqlite3.Connection | None = None
        self.last_scan_ns = 0

    @property
    def db(self) -> sqlite3.Connection:
        if self._db is None:
            from brainwiki.index import open_index

            self._db = open_index(self.brain.key, self.brain.root, self.manifest)
        return self._db

    def scan(
        self, *, force: bool = False, paths: list[str] | None = None, sanctioned: bool = False
    ):
        from brainwiki.index import scan

        return scan(self, force=force, paths=paths, sanctioned=sanctioned)

    def rebuild(self):
        from brainwiki.index import open_index

        if self._db is not None:
            self._db.close()
        self._db = open_index(self.brain.key, self.brain.root, self.manifest, rebuild=True)
        self.last_scan_ns = 0
        self._hub_files = None
        return self.scan(force=True)

    def reload(self, brain: Brain, user: UserConfig | None = None) -> None:
        """Pick up a changed `brain.toml` (and user config): the profile at once, the index when
        its layout or topics changed. Long-lived processes call this before each use."""
        if user is not None:
            self.user = user
        if brain.manifest == self.manifest:
            return
        reindex = (brain.manifest.layout, brain.manifest.topics) != (
            self.manifest.layout,
            self.manifest.topics,
        )
        self.brain, self.manifest = brain, brain.manifest
        self.profile = self.manifest.profile(self.host)
        if reindex:
            self.close()
            self.last_scan_ns = 0

    def fresh(self) -> Engine:
        self.scan()
        return self

    def close(self) -> None:
        if self._db is not None:
            self._db.close()
            self._db = None

    @property
    def topics(self) -> TopicTree:
        """The topic tree (02 §2)."""
        from brainwiki.index import topic_tree

        return topic_tree(self)

    def __enter__(self) -> Engine:
        return self

    def __exit__(self, *exc: object) -> None:
        self.close()


def open_engine(
    brain: str | None = None, *, host: str | None = None, cwd: Path | None = None
) -> Engine:
    user = load_user_config()
    resolved = resolve_brain(brain, host=host, cwd=cwd, user=user)
    return Engine(resolved, host=host, user=user)
