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
    # No test reaches the real crontab or launchd: `brain schedule` and the brains rename and
    # remove hooks see a scheduler with no commands.
    import subprocess

    from brainwiki.schedule import _jobs

    monkeypatch.setattr(
        _jobs, "_runner", lambda argv, stdin=None: subprocess.CompletedProcess(argv, 127, "", "")
    )
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


def capture(root: Path, summary: str, agent: str = "claude-code", **fields: object) -> str:
    """Write an episode the way MCP `brain_log_episode` does; returns its path."""
    from brainwiki.config._resolve import open_brain
    from brainwiki.engine import Engine
    from brainwiki.format import EpisodeContent
    from brainwiki.write import write_episode

    with Engine(open_brain(root), host=agent) as engine:
        return write_episode(
            engine,
            EpisodeContent(summary=summary),
            origin="agent",
            inputs="unknown",
            captured="mcp",
            agent=agent,
            **fields,  # type: ignore[arg-type]
        ).path
