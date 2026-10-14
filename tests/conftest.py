from __future__ import annotations

from pathlib import Path

import pytest


@pytest.fixture(autouse=True)
def isolated_env(tmp_path: Path, monkeypatch: pytest.MonkeyPatch) -> Path:
    """Point every brain-wiki directory at a temporary home so tests never touch the user's."""
    home = tmp_path / "home"
    home.mkdir()
    monkeypatch.setenv("HOME", str(home))
    monkeypatch.setenv("BRAIN_WIKI_CONFIG", str(home / ".config" / "brain-wiki" / "config.toml"))
    monkeypatch.setenv("BRAIN_WIKI_STATE_DIR", str(home / ".local" / "state" / "brain-wiki"))
    monkeypatch.setenv("BRAIN_WIKI_CACHE_DIR", str(home / ".cache" / "brain-wiki"))
    monkeypatch.setenv("BRAIN_WIKI_DATA_DIR", str(home / ".local" / "share" / "brain-wiki"))
    monkeypatch.delenv("BRAIN_WIKI_BRAIN", raising=False)
    monkeypatch.delenv("BRAIN_WIKI_HOST", raising=False)
    monkeypatch.delenv("BRAIN_WIKI_INTERNAL", raising=False)
    return home


@pytest.fixture
def brain_dir(tmp_path: Path) -> Path:
    from brainwiki.config._user import register_brain
    from brainwiki.lifecycle import init_brain

    root = init_brain(tmp_path / "brains" / "test", "test")
    register_brain("test", root, make_default=True)
    return root


def write(root: Path, rel: str, text: str) -> Path:
    path = root / rel
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(text, encoding="utf-8")
    return path
