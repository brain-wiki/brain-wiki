from __future__ import annotations

import subprocess
from pathlib import Path

import pytest
from tests.conftest import write

from brainwiki.config._resolve import open_brain
from brainwiki.engine import Engine
from brainwiki.errors import Conflict, InvalidOps
from brainwiki.runs import Run, list_records, load_record
from brainwiki.runs._record import save_record
from brainwiki.runs._undo import recover, undo


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


def test_run_applies_records_and_undoes(brain_dir: Path):
    write(brain_dir, "topics/a/one.md", "# One\n")
    write(brain_dir, "inbox/episodes/2026/10/x.md", "episode\n")
    with Engine(open_brain(brain_dir)) as eng:
        run = Run(eng, "test", summary="edit things")
        run.write("topics/a/one.md", "# One\n\nmore\n")
        run.create("topics/a/two.md", "# Two\n")
        run.move("inbox/episodes/2026/10/x.md", "archive/episodes/2026/10/x.md")
        record = run.commit()
        assert record.status == "applied"
        assert (brain_dir / "topics/a/two.md").exists()
        assert (brain_dir / "archive/episodes/2026/10/x.md").exists()
        assert f"· test · {record.run}" in (brain_dir / "log.md").read_text()
        assert eng.db.execute("SELECT 1 FROM nodes WHERE path='topics/a/two.md'").fetchone()

        result = undo(eng)
        assert result.kind == "undo"
        assert (brain_dir / "topics/a/one.md").read_text() == "# One\n"
        assert not (brain_dir / "topics/a/two.md").exists()
        assert (brain_dir / "inbox/episodes/2026/10/x.md").read_text() == "episode\n"
        assert load_record(eng.brain.key, record.run).undone_by == result.run
        log = (brain_dir / "log.md").read_text()
        assert f"· test · {record.run}" in log and f"undid {record.run}" in log


def test_commit_refuses_when_file_changed_after_staging(brain_dir: Path):
    write(brain_dir, "topics/a/one.md", "# One\n")
    with Engine(open_brain(brain_dir)) as eng:
        run = Run(eng, "test")
        run.write("topics/a/one.md", "# One\nmine\n")
        write(brain_dir, "topics/a/one.md", "# One\nsomeone else\n")
        with pytest.raises(Conflict):
            run.commit()
        assert (brain_dir / "topics/a/one.md").read_text() == "# One\nsomeone else\n"


def test_check_gate_blocks_and_writes_nothing(brain_dir: Path):
    write(brain_dir, "topics/a/one.md", "# One\n")
    with Engine(open_brain(brain_dir)) as eng:
        run = Run(eng, "test")
        run.write("topics/a/one.md", "# Changed\n")
        with pytest.raises(InvalidOps):
            run.commit(check=lambda r: ["BW999 nope"])
        assert (brain_dir / "topics/a/one.md").read_text() == "# One\n"
        assert list_records(eng.brain.key) == []


def test_list_skips_prepared_runs_without_records(brain_dir: Path):
    from brainwiki.runs._record import run_dir

    write(brain_dir, "topics/a/one.md", "# One\n")
    with Engine(open_brain(brain_dir)) as eng:
        prepared = run_dir(eng.brain.key, "run-01M4NWFNC8MMSXDNYW2XXADSEN")
        prepared.mkdir(parents=True)
        (prepared / "packet.json").write_text("{}")  # a dry run or a rejected reply leaves this
        run = Run(eng, "test")
        run.write("topics/a/one.md", "# One v2\n")
        record = run.commit()
        assert [r.run for r in list_records(eng.brain.key)] == [record.run]


def test_undo_refuses_after_later_edit_unless_forced(brain_dir: Path):
    write(brain_dir, "topics/a/one.md", "# One\n")
    with Engine(open_brain(brain_dir)) as eng:
        run = Run(eng, "test")
        run.write("topics/a/one.md", "# One v2\n")
        record = run.commit()
        write(brain_dir, "topics/a/one.md", "# One v3 by hand\n")
        with pytest.raises(Conflict):
            undo(eng, record.run)
        undo(eng, record.run, force=True)
        assert (brain_dir / "topics/a/one.md").read_text() == "# One\n"
        from brainwiki.runs._record import run_dir

        saved = run_dir(eng.brain.key, record.run) / "conflicts" / "topics/a/one.md"
        assert saved.read_text() == "# One v3 by hand\n"


def test_recover_rolls_back_interrupted_run(brain_dir: Path):
    write(brain_dir, "topics/a/one.md", "# One\n")
    with Engine(open_brain(brain_dir)) as eng:
        run = Run(eng, "test")
        run.write("topics/a/one.md", "# Half applied\n")
        run.create("topics/a/new.md", "# New\n")
        record = run.commit(log=False)
        record.status = "applying"  # as if the process died before finishing
        save_record(eng.brain.key, record)
        report = recover(eng)
        assert report and report[0]["run"] == record.run
        assert (brain_dir / "topics/a/one.md").read_text() == "# One\n"
        assert not (brain_dir / "topics/a/new.md").exists()
        assert load_record(eng.brain.key, record.run).status == "rolled_back"


def test_git_commits_only_touched_files_and_undo_reverts(brain_dir: Path, git_env: None):
    git(brain_dir, "init", "-q")
    git(brain_dir, "add", "-A")
    git(brain_dir, "commit", "-q", "-m", "init")
    write(brain_dir, "topics/a/one.md", "# One\n")
    git(brain_dir, "add", "-A")
    git(brain_dir, "commit", "-q", "-m", "one")
    write(brain_dir, "unrelated.md", "user work in progress\n")
    with Engine(open_brain(brain_dir)) as eng:
        run = Run(eng, "test", summary="change one", agent="claude-code")
        run.write("topics/a/one.md", "# One v2\n")
        record = run.commit()
        assert record.git_commit and record.git_error is None
        message = git(brain_dir, "log", "-1", "--format=%B")
        assert "brain: change one" in message
        assert f"Brain-Run: {record.run}" in message
        assert "Brain-Agent: claude-code" in message
        changed = git(brain_dir, "show", "--name-only", "--format=", "HEAD").split()
        assert sorted(changed) == ["log.md", "topics/a/one.md"]
        assert "unrelated.md" in git(brain_dir, "status", "--porcelain")

        result = undo(eng)
        assert result.git_commit
        assert (brain_dir / "topics/a/one.md").read_text() == "# One\n"
        log = (brain_dir / "log.md").read_text()
        assert f"· test · {record.run}" in log  # the original entry survives the revert
        assert f"undid {record.run}" in log
