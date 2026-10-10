"""Engine: one brain, its store, its index, and the caller's profile."""

from __future__ import annotations

import sqlite3
from pathlib import Path

from brainwiki.config.manifest import Profile
from brainwiki.config.resolve import Brain, resolve_brain
from brainwiki.config.user import UserConfig, load_user_config
from brainwiki.store import LocalStore


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
            from brainwiki.index.db import open_index

            self._db = open_index(self.brain.key, self.brain.root, self.manifest)
        return self._db

    def scan(self, *, force: bool = False, paths: list[str] | None = None):
        from brainwiki.index.scanner import scan

        return scan(self, force=force, paths=paths)

    def rebuild(self):
        from brainwiki.index.db import open_index

        if self._db is not None:
            self._db.close()
        self._db = open_index(self.brain.key, self.brain.root, self.manifest, rebuild=True)
        self.last_scan_ns = 0
        return self.scan(force=True)

    def fresh(self) -> Engine:
        self.scan()
        return self

    def close(self) -> None:
        if self._db is not None:
            self._db.close()
            self._db = None

    # profile helpers ---------------------------------------------------
    @property
    def max_rank(self) -> int:
        return self.manifest.privacy_rank(self.profile.max_privacy)

    def visible(self, privacy_rank: int, topic: str | None) -> bool:
        return privacy_rank <= self.max_rank and self.profile.topic_allowed(topic)

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
