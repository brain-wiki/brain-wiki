from __future__ import annotations

import re
import subprocess
from pathlib import Path

import pytest
from tests.conftest import write

from brainwiki.cli._main import main
from brainwiki.importer._episodes import _split_document


@pytest.fixture
def git_env(monkeypatch: pytest.MonkeyPatch, tmp_path: Path) -> None:
    empty = tmp_path / "gitconfig"
    empty.write_text("")
    for var, value in {
        "GIT_CONFIG_GLOBAL": str(empty),
        "GIT_CONFIG_NOSYSTEM": "1",
        "GIT_AUTHOR_NAME": "Test",
        "GIT_AUTHOR_EMAIL": "test@example.com",
        "GIT_COMMITTER_NAME": "Test",
        "GIT_COMMITTER_EMAIL": "test@example.com",
    }.items():
        monkeypatch.setenv(var, value)


def git(root: Path, *args: str) -> str:
    return subprocess.run(
        ["git", "-C", str(root), *args], capture_output=True, text=True, check=True
    ).stdout


def notes(tmp_path: Path) -> Path:
    root = tmp_path / "lumen"
    write(root, "Projects/Search.md", "---\nrelated: ['[[Sync]]']\n---\n# Search\n\nFTS5.\n")
    write(root, "Projects/Sync.md", "---\nrelated: ['[[Search]]']\n---\n# Sync\n\nCRDTs.\n")
    write(root, "Areas/Design.md", "# Design\n\nCalm colors.\n")
    return root


def snapshot(root: Path) -> dict[str, str]:
    return {p.relative_to(root).as_posix(): p.read_text() for p in root.rglob("*") if p.is_file()}


def test_dry_run_wins_over_apply(brain_dir: Path, tmp_path: Path):
    source = notes(tmp_path)
    before = snapshot(brain_dir)
    assert main(["import", str(source), "--into", "test", "--apply", "--dry-run"]) == 0
    assert main(["import", str(source), "--to-episodes", "--apply", "--dry-run"]) == 0
    assert snapshot(brain_dir) == before
    assert main(["import", str(source), "--overlay", "--apply", "--dry-run"]) == 0
    assert not (source / "brain.toml").exists()


def test_overlay_phases_run_after_adopt_in_git(git_env: None, tmp_path: Path):
    root = notes(tmp_path)
    git(root, "init", "-q")
    git(root, "add", "-A")
    git(root, "commit", "-qm", "notes")
    assert main(["import", str(root), "--overlay", "--apply"]) == 0
    assert git(root, "status", "--porcelain") == ""
    assert "reports/import-plan.md" in git(root, "ls-files")
    assert main(["import", str(root), "--overlay", "--phase", "1", "--apply"]) == 0
    text = (root / "Projects/Search.md").read_text()
    assert re.search(r"^id: \S+$", text, re.M) and "related: ['[[Sync]]']" in text  # theirs


def test_to_episodes_skips_frontmatter(brain_dir: Path, tmp_path: Path):
    text = "---\ntags: [lumen]\ntitle: Sync\n---\n# Sync\n\nCRDTs merge offline edits.\n"
    assert _split_document(text) == [("Sync", "# Sync\n\nCRDTs merge offline edits.")]
    doc = write(tmp_path, "sync.md", text)
    assert main(["import", str(doc), "--to-episodes", "--apply"]) == 0
    episodes = [p.read_text() for p in (brain_dir / "inbox/episodes").rglob("*.md")]
    assert len(episodes) == 1 and "tags: [lumen]" not in episodes[0]


def test_from_unknown_host_is_usage_error(brain_dir: Path, capsys: pytest.CaptureFixture[str]):
    assert main(["import", "--from", "nosuch"]) == 2
    err = capsys.readouterr().err
    assert "--path" not in err and "as PATH" in err and "claude-code" in err


@pytest.mark.parametrize(
    ("extra", "message"),
    [
        (["--into", "test", "--agent", "codex"], "--agent works only with --to-episodes"),
        (["--overlay", "--untrusted"], "--untrusted works only with --to-episodes"),
        (["--into", "test", "--phase", "2"], "--phase works only with --overlay"),
        (["--into", "test", "--phase", "0"], "--phase works only with --overlay"),
        (["--overlay", "--into", "test"], "--overlay and --into cannot be combined"),
        (["--overlay", "--topic", "work"], "--topic does not work with --overlay"),
        (["--overlay", "--phase", "7"], "--phase must be"),
    ],
)
def test_ignored_flags_are_usage_errors(
    brain_dir: Path,
    tmp_path: Path,
    capsys: pytest.CaptureFixture[str],
    extra: list[str],
    message: str,
):
    source = notes(tmp_path)
    assert main(["import", str(source), *extra]) == 2
    assert message in capsys.readouterr().err
    assert main(["import", "--from", "codex", "--agent", "x"]) == 2


@pytest.mark.parametrize(
    "mode",
    [
        ["--overlay"],
        ["--overlay", "--apply"],
        ["--into", "test"],
        ["--to-episodes"],
        ["--from", "claude-code"],
    ],
)
def test_missing_source_is_not_found(
    brain_dir: Path, tmp_path: Path, capsys: pytest.CaptureFixture[str], mode: list[str]
):
    assert main(["import", str(tmp_path / "nosuch"), *mode]) == 3
    assert capsys.readouterr().err.startswith("not_found: ")


def test_readopting_names_the_registration(tmp_path: Path, capsys: pytest.CaptureFixture[str]):
    root = notes(tmp_path)
    assert main(["import", str(root), "--overlay", "--apply"]) == 0
    capsys.readouterr()
    for argv in (["--overlay", "--apply"], ["--overlay"]):
        assert main(["import", str(root), *argv]) == 4
        err = capsys.readouterr().err
        assert "already a brain, registered as 'lumen'" in err and "brains add" not in err


def test_from_host_apply_reports_written_and_skipped(
    brain_dir: Path,
    tmp_path: Path,
    monkeypatch: pytest.MonkeyPatch,
    capsys: pytest.CaptureFixture[str],
):
    claude = tmp_path / "claude"
    write(claude, "projects/-x/memory/prefs.md", "# Editor\n\nTabs.\n\n# Theme\n\nDark.\n")
    monkeypatch.setenv("CLAUDE_CONFIG_DIR", str(claude))
    assert main(["import", "--from", "claude-code"]) == 0
    assert "Would write 2 episodes" in capsys.readouterr().out
    assert main(["import", "--from", "claude-code", "--apply"]) == 0
    assert "Wrote 2 episodes from 1 files." in capsys.readouterr().out
    assert main(["import", "--from", "claude-code", "--apply"]) == 0
    assert "Wrote 0 episodes from 1 files; skipped 2 already imported." in capsys.readouterr().out


def test_overlay_phase1_dry_run_shows_the_applied_ids(
    tmp_path: Path, capsys: pytest.CaptureFixture[str]
):
    root = notes(tmp_path)
    assert main(["import", str(root), "--overlay", "--apply"]) == 0
    capsys.readouterr()
    assert main(["import", str(root), "--overlay", "--phase", "1"]) == 0
    planned = set(re.findall(r"^\+id: (\S+)$", capsys.readouterr().out, re.M))
    assert len(planned) == 3
    assert main(["import", str(root), "--overlay", "--phase", "1", "--apply"]) == 0
    applied = {
        m for p in root.rglob("*.md") for m in re.findall(r"^id: (\S+)$", p.read_text(), re.M)
    }
    assert planned <= applied


def test_overlay_plan_formats_counts(tmp_path: Path, capsys: pytest.CaptureFixture[str]):
    assert main(["import", str(notes(tmp_path)), "--overlay"]) == 0
    out = capsys.readouterr().out
    assert "- Notes: 3 (2 with frontmatter" in out and "{" not in out.split("##")[0]
