"""`brain commit` against real temporary git repos; `brain schedule` through fake runners."""

from __future__ import annotations

import json
import os
import plistlib
import subprocess
import time
from pathlib import Path

import pytest
from tests.conftest import write

from brainwiki.cli import main
from brainwiki.config import open_brain, state_dir
from brainwiki.lifecycle import init_git
from brainwiki.schedule import _jobs
from brainwiki.schedule._durations import EVERY_VALUES, cron_schedule

NOTE = "---\ntitle: {title}\n---\n\n# {title}\n\nA fact about Lumen.\n"


@pytest.fixture
def git_env(monkeypatch: pytest.MonkeyPatch, tmp_path: Path) -> None:
    empty = tmp_path / "gitconfig"
    empty.write_text("[init]\n\tdefaultBranch = main\n")
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


@pytest.fixture
def repo(brain_dir: Path, git_env: None) -> Path:
    assert init_git(brain_dir, "test") is None
    git(brain_dir, "add", "-A")
    if git(brain_dir, "status", "--porcelain"):
        git(brain_dir, "commit", "-q", "-m", "scaffold")
    return brain_dir


def _age(path: Path, seconds: float) -> None:
    then = time.time() - seconds
    os.utime(path, (then, then))


def _note(root: Path, rel: str, title: str = "Lumen", age: float = 600) -> Path:
    path = write(root, rel, NOTE.format(title=title))
    _age(path, age)
    return path


def _message(root: Path) -> str:
    return git(root, "log", "-1", "--format=%B")


def _state(root: Path) -> dict:
    return json.loads(
        (state_dir() / "schedule" / f"{open_brain(root).id}.json").read_text(encoding="utf-8")
    )


@pytest.fixture
def origin(repo: Path, tmp_path: Path) -> Path:
    """A bare origin the brain tracks, and the brain pushed to it."""
    bare = tmp_path / "origin.git"
    git(tmp_path, "init", "-q", "--bare", str(bare))
    git(repo, "remote", "add", "origin", str(bare))
    git(repo, "push", "-q", "-u", "origin", "main")
    return bare


def _other_clone(origin: Path, tmp_path: Path) -> Path:
    other = tmp_path / "other"
    git(tmp_path, "clone", "-q", str(origin), str(other))
    return other


# -- brain commit: snapshot -------------------------------------------------------------------


def test_settle_leaves_out_files_changed_just_now(repo: Path):
    _note(repo, "topics/lumen/old.md", age=600)
    _note(repo, "topics/lumen/fresh.md", age=5)
    assert main(["commit", "--no-fetch"]) == 0
    assert git(repo, "show", "--name-only", "--format=", "HEAD").split() == ["topics/lumen/old.md"]
    assert "?? topics/lumen/fresh.md" in git(repo, "status", "--porcelain")
    assert main(["commit", "--no-fetch", "--settle", "1s"]) == 0
    assert git(repo, "status", "--porcelain") == ""


def test_the_brains_lint_hook_never_blocks_a_snapshot(repo: Path):
    assert main(["lint", "--install-hook"]) == 0
    broken = write(repo, "topics/lumen/broken.md", "# No id yet\n")  # BW103, a lint error
    _age(broken, 600)
    git(repo, "add", "topics/lumen/broken.md")
    by_hand = subprocess.run(
        ["git", "-C", str(repo), "commit", "-q", "-m", "by hand"], capture_output=True, text=True
    )
    assert by_hand.returncode != 0 and "BW103" in by_hand.stdout + by_hand.stderr
    assert main(["commit", "--no-fetch"]) == 0
    assert "A topics/lumen/broken.md" in _message(repo)


def test_message_names_the_topic_files_and_agent(repo: Path):
    _note(repo, "topics/lumen/sync/crdt.md")
    _note(repo, "topics/lumen/sync/offline.md")
    git(repo, "add", "-A")
    git(repo, "commit", "-q", "-m", "two notes")
    write(repo, "topics/lumen/sync/crdt.md", NOTE.format(title="CRDT merge v2"))
    write(repo, "topics/lumen/sync/offline.md", NOTE.format(title="Offline edits v2"))
    write(repo, "topics/lumen/sync/conflicts.md", NOTE.format(title="Conflict copies"))
    assert main(["commit", "--no-fetch", "--settle", "0"]) == 0
    subject, blank, *rest = _message(repo).rstrip("\n").split("\n")
    assert subject == "brain: snapshot 3 notes in lumen/sync"
    assert blank == ""
    assert sorted(rest[:3]) == [
        "A topics/lumen/sync/conflicts.md",
        "M topics/lumen/sync/crdt.md",
        "M topics/lumen/sync/offline.md",
    ]
    assert rest[3:] == ["", "Brain-Agent: schedule"]
    assert _state(repo)["outcome"] == "committed"


@pytest.mark.parametrize(
    ("files", "subject"),
    [
        (["topics/lumen/a.md"], "brain: snapshot 1 note in lumen"),
        (["topics/lumen/a.md", "topics/sync/b.md"], "brain: snapshot 2 notes in 2 topics"),
        (
            ["topics/lumen/a.md", "topics/lumen/b.md", "notes.txt"],
            "brain: snapshot 2 notes in lumen and 1 file",
        ),
        (["a.txt", "b.txt"], "brain: snapshot 2 files"),
    ],
)
def test_subject_counts_notes_topics_and_files(repo: Path, files: list[str], subject: str):
    for rel in files:
        _note(repo, rel)
    assert main(["commit", "--no-fetch"]) == 0
    assert _message(repo).splitlines()[0] == subject


def test_deletions_and_renames_get_their_own_lines(repo: Path):
    _note(repo, "topics/lumen/gone.md", title="Gone")
    _note(repo, "topics/lumen/before.md", title="Moved")
    git(repo, "add", "-A")
    git(repo, "commit", "-q", "-m", "notes")
    (repo / "topics/lumen/gone.md").unlink()
    (repo / "topics/lumen/before.md").rename(repo / "topics/lumen/after.md")
    _age(repo / "topics/lumen/after.md", 600)
    assert main(["commit", "--no-fetch"]) == 0
    lines = _message(repo).splitlines()
    assert "D topics/lumen/gone.md" in lines
    assert "R topics/lumen/before.md -> topics/lumen/after.md" in lines
    assert git(repo, "status", "--porcelain") == ""


def test_a_deletion_counts_even_inside_the_settle_window(repo: Path):
    _note(repo, "topics/lumen/gone.md")
    git(repo, "add", "-A")
    git(repo, "commit", "-q", "-m", "note")
    (repo / "topics/lumen/gone.md").unlink()
    assert main(["commit", "--no-fetch", "--settle", "1h"]) == 0
    assert "D topics/lumen/gone.md" in _message(repo).splitlines()


def test_nothing_to_commit(repo: Path, capsys: pytest.CaptureFixture[str]):
    head = git(repo, "rev-parse", "HEAD")
    assert main(["commit", "--no-fetch"]) == 0
    assert "Nothing was committed" in capsys.readouterr().out
    assert git(repo, "rev-parse", "HEAD") == head
    assert _state(repo)["outcome"] == "nothing"


def test_dry_run_changes_nothing(repo: Path, capsys: pytest.CaptureFixture[str]):
    _note(repo, "topics/lumen/a.md")
    head = git(repo, "rev-parse", "HEAD")
    assert main(["commit", "--dry-run", "--json"]) == 0
    data = json.loads(capsys.readouterr().out)
    assert data["changes"] == ["A topics/lumen/a.md"]
    assert data["message"].startswith("brain: snapshot 1 note in lumen")
    assert data["fetch"] is False
    assert git(repo, "rev-parse", "HEAD") == head
    assert git(repo, "status", "--porcelain", "-uall") == "?? topics/lumen/a.md\n"
    assert not (state_dir() / "schedule").exists()


def test_refuses_a_brain_without_git(brain_dir: Path, capsys: pytest.CaptureFixture[str]):
    assert main(["commit"]) == 2
    assert "git init" in capsys.readouterr().err


def test_busy_lock_skips_the_round(repo: Path, capsys: pytest.CaptureFixture[str]):
    from filelock import FileLock

    _note(repo, "topics/lumen/a.md")
    head = git(repo, "rev-parse", "HEAD")
    held = FileLock(str(state_dir() / "locks" / f"{open_brain(repo).key}.lock"))
    held.acquire()
    try:
        assert main(["commit", "--no-fetch"]) == 0
    finally:
        held.release()
    assert "Skipped test" in capsys.readouterr().out
    assert git(repo, "rev-parse", "HEAD") == head
    assert _state(repo)["outcome"] == "busy"


def test_as_host_needs_edit_and_may_not_push(repo: Path, capsys: pytest.CaptureFixture[str]):
    with (repo / "brain.toml").open("a", encoding="utf-8") as f:
        f.write('\n[agents.reader]\nwrite = ["episodes"]\n')
    _note(repo, "topics/lumen/a.md")
    assert main(["commit", "--no-fetch", "--as", "reader"]) == 5
    assert "edit" in capsys.readouterr().err
    assert main(["commit", "--push", "--as", "trusted"]) == 5
    assert "publishes" in capsys.readouterr().err
    assert main(["commit", "--no-fetch", "--as", "trusted"]) == 0
    assert _message(repo).rstrip().endswith("Brain-Agent: trusted")


# -- brain commit: sync with origin -----------------------------------------------------------


def test_no_upstream_skips_sync_with_a_note(repo: Path, capsys: pytest.CaptureFixture[str]):
    _note(repo, "topics/lumen/a.md")
    assert main(["commit"]) == 0
    assert "does not track a branch on origin" in capsys.readouterr().out
    assert _state(repo)["outcome"] == "committed"


def test_rebases_onto_new_upstream_commits_and_pushes(repo: Path, origin: Path, tmp_path: Path):
    other = _other_clone(origin, tmp_path)
    write(other, "topics/lumen/remote.md", NOTE.format(title="Remote"))
    git(other, "add", "-A")
    git(other, "commit", "-q", "-m", "remote note")
    git(other, "push", "-q")
    _note(repo, "topics/lumen/local.md")
    _note(repo, "topics/lumen/fresh.md", age=1)  # stashed by --autostash and put back
    assert main(["commit", "--push"]) == 0
    log = git(origin, "log", "--format=%s", "main").splitlines()
    assert log[:2] == ["brain: snapshot 1 note in lumen", "remote note"]
    assert (repo / "topics/lumen/remote.md").exists()
    assert "?? topics/lumen/fresh.md" in git(repo, "status", "--porcelain")
    assert _state(repo)["outcome"] == "pushed"


def test_nothing_to_commit_still_fetches(repo: Path, origin: Path, tmp_path: Path):
    other = _other_clone(origin, tmp_path)
    write(other, "topics/lumen/remote.md", NOTE.format(title="Remote"))
    git(other, "add", "-A")
    git(other, "commit", "-q", "-m", "remote note")
    git(other, "push", "-q")
    assert main(["commit"]) == 0
    assert (repo / "topics/lumen/remote.md").exists()
    assert _state(repo)["outcome"] == "fetched"


def test_conflict_aborts_the_rebase_and_exits_1(
    repo: Path, origin: Path, tmp_path: Path, capsys: pytest.CaptureFixture[str]
):
    _note(repo, "topics/lumen/shared.md", title="Shared")
    _note(repo, "topics/lumen/draft.md", title="Draft")
    git(repo, "add", "-A")
    git(repo, "commit", "-q", "-m", "shared")
    git(repo, "push", "-q")
    other = _other_clone(origin, tmp_path)
    write(other, "topics/lumen/shared.md", NOTE.format(title="Theirs"))
    git(other, "commit", "-q", "-am", "theirs")
    git(other, "push", "-q")
    _note(repo, "topics/lumen/shared.md", title="Ours")
    write(repo, "topics/lumen/draft.md", NOTE.format(title="Draft in progress"))  # held by settle
    assert main(["commit"]) == 1
    out = capsys.readouterr().out
    assert "topics/lumen/shared.md" in out
    head = git(repo, "rev-parse", "HEAD")
    assert git(repo, "log", "-1", "--format=%s") == "brain: snapshot 1 note in lumen\n"
    assert not (repo / ".git" / "rebase-merge").exists()
    assert not (repo / ".git" / "rebase-apply").exists()
    assert "Ours" in (repo / "topics/lumen/shared.md").read_text(encoding="utf-8")
    assert "Draft in progress" in (repo / "topics/lumen/draft.md").read_text(encoding="utf-8")
    assert git(repo, "status", "--porcelain") == " M topics/lumen/draft.md\n"
    assert git(repo, "stash", "list") == ""
    assert _state(repo)["outcome"] == "conflict"
    assert _state(repo)["conflicts"] == ["topics/lumen/shared.md"]
    assert git(repo, "rev-parse", "HEAD") == head


def test_unreachable_origin_keeps_the_commit_offline(
    repo: Path, origin: Path, tmp_path: Path, capsys: pytest.CaptureFixture[str]
):
    git(repo, "remote", "set-url", "origin", str(tmp_path / "missing.git"))
    _note(repo, "topics/lumen/a.md")
    assert main(["commit", "--push"]) == 0
    assert "warning: could not fetch origin" in capsys.readouterr().err
    assert git(repo, "log", "-1", "--format=%s").startswith("brain: snapshot")
    state = _state(repo)
    assert state["outcome"] == "offline"
    assert state["commit"] == git(repo, "rev-parse", "HEAD").strip()


def test_no_fetch_skips_origin(repo: Path, origin: Path, tmp_path: Path):
    other = _other_clone(origin, tmp_path)
    write(other, "topics/lumen/remote.md", NOTE.format(title="Remote"))
    git(other, "add", "-A")
    git(other, "commit", "-q", "-m", "remote")
    git(other, "push", "-q")
    assert main(["commit", "--no-fetch"]) == 0
    assert not (repo / "topics/lumen/remote.md").exists()


# -- schedule: durations ----------------------------------------------------------------------


@pytest.mark.parametrize(
    ("every", "cron", "seconds"),
    [
        ("5m", "*/5 * * * *", 300),
        ("15m", "*/15 * * * *", 900),
        ("30m", "*/30 * * * *", 1800),
        ("1h", "0 */1 * * *", 3600),
        ("2h", "0 */2 * * *", 7200),
        ("12h", "0 */12 * * *", 43200),
        ("24h", "0 0 * * *", 86400),
    ],
)
def test_every_maps_to_cron_and_launchd(every: str, cron: str, seconds: int):
    from brainwiki.schedule import parse_every

    assert cron_schedule(every) == cron
    assert parse_every(every) == (every, seconds)


def test_every_allows_only_divisors_of_an_hour_or_a_day():
    from brainwiki.errors import UsageError
    from brainwiki.schedule import parse_every

    assert len(EVERY_VALUES) == 13
    for bad in ("7m", "45m", "5h", "90s", "2d", "0m", "60m", "fast"):
        with pytest.raises(UsageError, match="5m, 10m, 15m"):
            parse_every(bad)


def test_settle_accepts_seconds_minutes_hours():
    from brainwiki.errors import UsageError
    from brainwiki.schedule import parse_duration

    assert [parse_duration(t, "--settle") for t in ("30s", "2m", "1h", "0")] == [30, 120, 3600, 0]
    with pytest.raises(UsageError):
        parse_duration("soon", "--settle")


# -- schedule: backends -----------------------------------------------------------------------


class FakeCron:
    """A runner that keeps a crontab in memory."""

    def __init__(self, text: str | None = None):
        self.text = text
        self.calls: list[list[str]] = []

    def __call__(self, argv: list[str], stdin: str | None = None):
        self.calls.append(argv)
        if argv == ["crontab", "-l"]:
            if self.text is None:
                return subprocess.CompletedProcess(argv, 1, "", "no crontab for tester\n")
            return subprocess.CompletedProcess(argv, 0, self.text, "")
        if argv == ["crontab", "-"]:
            self.text = stdin
            return subprocess.CompletedProcess(argv, 0, "", "")
        return subprocess.CompletedProcess(argv, 127, "", "")


class FakeLaunchctl:
    def __init__(self):
        self.calls: list[list[str]] = []

    def __call__(self, argv: list[str], stdin: str | None = None):
        self.calls.append(argv)
        return subprocess.CompletedProcess(argv, 0, "", "")


OTHER_LINES = "# my jobs\r\nMAILTO=me@example.com\n0 3 * * * /usr/bin/backup  --all\n\n"


def _job(name: str = "work", push: bool = False, every: str = "15m") -> _jobs.Job:
    return _jobs.Job("b-123", name, every, push, ["/opt/bin/brain"], {}, Path("/tmp/s.log"))


def test_crontab_add_replace_remove_keeps_other_lines(tmp_path: Path):
    fake = FakeCron(OTHER_LINES)
    cron = _jobs.scheduler(platform="linux", runner=fake)
    cron.install(_job(), dry_run=False)
    assert fake.text.startswith(OTHER_LINES)
    assert fake.text[len(OTHER_LINES) :] == (
        "# >>> brain-wiki commit b-123\n"
        "*/15 * * * * /opt/bin/brain commit --brain work >> /tmp/s.log 2>&1\n"
        "# <<< brain-wiki commit b-123\n"
    )
    fake.text += "@reboot /usr/bin/after\n"
    cron.install(_job(push=True, every="2h"), dry_run=False)
    assert fake.text.count("brain-wiki commit b-123") == 2
    assert "0 */2 * * * /opt/bin/brain commit --brain work --push >>" in fake.text
    assert fake.text.endswith("# <<< brain-wiki commit b-123\n@reboot /usr/bin/after\n")
    assert cron.remove("b-123", dry_run=False) is not None
    assert fake.text == OTHER_LINES + "@reboot /usr/bin/after\n"
    assert cron.remove("b-123", dry_run=False) is None


def test_crontab_without_a_crontab_yet_and_dry_run(tmp_path: Path):
    fake = FakeCron(None)
    cron = _jobs.scheduler(platform="linux", runner=fake)
    plan = cron.install(_job(), dry_run=True)
    assert "# >>> brain-wiki commit b-123" in plan.text
    assert fake.text is None
    cron.install(_job(), dry_run=False)
    assert fake.text.startswith("# >>> brain-wiki commit b-123\n")


def test_crontab_quotes_env_and_escapes_percent():
    fake = FakeCron("")
    cron = _jobs.scheduler(platform="linux", runner=fake)
    job = _jobs.Job(
        "b-1", "work", "15m", False, ["/opt/my tools/brain"], {"BRAIN_WIKI_CONFIG": "/c/50%.toml"}
    )
    cron.install(job, dry_run=False)
    assert "BRAIN_WIKI_CONFIG=/c/50\\%.toml '/opt/my tools/brain' commit" in fake.text
    (listed,) = cron.jobs()
    assert (listed.brain_id, listed.brain_name, listed.every, listed.push) == (
        "b-1",
        "work",
        "15m",
        False,
    )
    assert cron.rename("b-1", "personal")
    assert "BRAIN_WIKI_CONFIG=/c/50\\%.toml '/opt/my tools/brain' commit --brain personal" in (
        fake.text
    )


def test_launchd_plist_and_launchctl_commands(tmp_path: Path):
    fake = FakeLaunchctl()
    agents = tmp_path / "LaunchAgents"
    backend = _jobs.scheduler(platform="darwin", runner=fake, agents_dir=agents, uid=501)
    job = _jobs.Job(
        "b-123", "work", "30m", True, ["/opt/bin/brain"], {"BRAIN_WIKI_STATE_DIR": "/s"}, None
    )
    backend.install(job, dry_run=False)
    path = agents / "io.github.brain-wiki.commit.b-123.plist"
    data = plistlib.loads(path.read_bytes())
    assert data == {
        "Label": "io.github.brain-wiki.commit.b-123",
        "ProgramArguments": ["/opt/bin/brain", "commit", "--brain", "work", "--push"],
        "StartInterval": 1800,
        "StandardOutPath": str(_jobs.log_path("b-123")),
        "StandardErrorPath": str(_jobs.log_path("b-123")),
        "EnvironmentVariables": {"BRAIN_WIKI_STATE_DIR": "/s"},
    }
    assert fake.calls == [["launchctl", "bootstrap", "gui/501", str(path)]]
    fake.calls.clear()
    backend.install(job, dry_run=False)
    assert fake.calls == [
        ["launchctl", "bootout", "gui/501/io.github.brain-wiki.commit.b-123"],
        ["launchctl", "bootstrap", "gui/501", str(path)],
    ]
    (listed,) = backend.jobs()
    assert (listed.brain_id, listed.brain_name, listed.every, listed.push) == (
        "b-123",
        "work",
        "30m",
        True,
    )
    assert backend.rename("b-123", "personal")
    assert plistlib.loads(path.read_bytes())["ProgramArguments"][3] == "personal"
    fake.calls.clear()
    assert backend.remove("b-123", dry_run=False) is not None
    assert fake.calls == [["launchctl", "bootout", "gui/501/io.github.brain-wiki.commit.b-123"]]
    assert not path.exists()
    assert backend.remove("b-123", dry_run=False) is None


def test_launchd_dry_run_writes_nothing(tmp_path: Path):
    fake = FakeLaunchctl()
    agents = tmp_path / "LaunchAgents"
    backend = _jobs.scheduler(platform="darwin", runner=fake, agents_dir=agents, uid=501)
    plan = backend.install(_job(), dry_run=True)
    assert "<key>StartInterval</key>" in plan.text
    assert plan.commands == [
        f"launchctl bootstrap gui/501 {agents / 'io.github.brain-wiki.commit.b-123.plist'}"
    ]
    assert fake.calls == [] and not agents.exists()


def test_windows_is_not_supported():
    from brainwiki.errors import UsageError

    with pytest.raises(UsageError, match="not supported"):
        _jobs.scheduler(platform="win32")


# -- schedule: CLI ----------------------------------------------------------------------------


@pytest.fixture
def cron(monkeypatch: pytest.MonkeyPatch) -> FakeCron:
    fake = FakeCron(OTHER_LINES)
    monkeypatch.setattr(_jobs, "_runner", fake)
    monkeypatch.setattr(_jobs, "_platform", lambda: "linux")
    return fake


def test_schedule_add_list_remove(repo: Path, cron: FakeCron, capsys: pytest.CaptureFixture[str]):
    brain_id = open_brain(repo).id
    assert main(["schedule", "add", "commit", "--every", "30m", "--push"]) == 0
    assert f"# >>> brain-wiki commit {brain_id}\n" in cron.text
    line = cron.text.splitlines()[-2]
    assert line.startswith("*/30 * * * * BRAIN_WIKI_CONFIG=")
    assert " commit --brain test --push >> " in line
    assert line.endswith(f"schedule-{brain_id}.log 2>&1")
    assert (state_dir() / "logs").is_dir()
    capsys.readouterr()
    cron.text += "# >>> brain-wiki commit b-gone\n*/5 * * * * /x commit --brain old\n"
    cron.text += "# <<< brain-wiki commit b-gone\n"
    assert main(["commit", "--no-fetch"]) == 0
    capsys.readouterr()
    assert main(["schedule", "list", "--json"]) == 0
    jobs = {j["id"]: j for j in json.loads(capsys.readouterr().out)["jobs"]}
    assert jobs[brain_id]["brain"] == "test"
    assert (jobs[brain_id]["every"], jobs[brain_id]["push"]) == ("30m", True)
    assert jobs[brain_id]["outcome"] == "nothing"
    assert jobs["b-gone"]["brain"] is None
    assert main(["schedule"]) == 0
    assert "unregistered (b-gone): every 5m, does not push" in capsys.readouterr().out
    assert main(["schedule", "add", "commit"]) == 0  # replaces the job
    assert cron.text.count(f"brain-wiki commit {brain_id}") == 2
    assert "*/15 * * * *" in cron.text and "--push" not in cron.text
    assert main(["schedule", "remove", "commit", "--dry-run"]) == 0
    assert brain_id in cron.text
    assert main(["schedule", "remove", "commit"]) == 0
    assert brain_id not in cron.text
    assert cron.text.startswith(OTHER_LINES)


def test_schedule_add_dry_run_changes_nothing(
    repo: Path, cron: FakeCron, capsys: pytest.CaptureFixture[str]
):
    assert main(["schedule", "add", "commit", "--dry-run"]) == 0
    out = capsys.readouterr().out
    assert "# >>> brain-wiki commit" in out and "crontab -" in out
    assert cron.text == OTHER_LINES


def test_schedule_add_refusals(repo: Path, cron: FakeCron, tmp_path: Path):
    assert main(["schedule", "add", "commit", "--every", "7m"]) == 2
    assert main(["schedule", "add", "commit", "--as", "trusted"]) == 5
    assert main(["schedule", "remove", "commit", "--as", "trusted"]) == 5
    from brainwiki.lifecycle import init_brain

    loose = init_brain(tmp_path / "loose", "loose")
    assert main(["schedule", "add", "commit", "--brain", str(loose)]) == 2
    assert cron.text == OTHER_LINES


def test_schedule_without_crontab_prints_the_block(
    repo: Path, monkeypatch: pytest.MonkeyPatch, capsys: pytest.CaptureFixture[str]
):
    monkeypatch.setattr(_jobs, "_platform", lambda: "linux")  # conftest: no commands at all
    assert main(["schedule", "add", "commit"]) == 1
    out = capsys.readouterr().out
    assert "by hand" in out and "# >>> brain-wiki commit" in out


def test_brains_rename_and_remove_follow_the_job(
    repo: Path, cron: FakeCron, capsys: pytest.CaptureFixture[str]
):
    brain_id = open_brain(repo).id
    assert main(["schedule", "add", "commit"]) == 0
    assert main(["brains", "rename", "test", "lumen"]) == 0
    assert "commit job" in capsys.readouterr().out
    assert " commit --brain lumen >> " in cron.text
    assert cron.text.count(brain_id) == 3  # markers and the log file
    assert main(["brains", "remove", "lumen"]) == 0
    assert "removed its commit job" in capsys.readouterr().out
    assert cron.text == OTHER_LINES


def test_doctor_reports_jobs_and_old_edits(repo: Path, cron: FakeCron):
    from brainwiki.doctor import run_doctor

    cron.text += "# >>> brain-wiki commit b-gone\n*/5 * * * * /x commit --brain old\n"
    cron.text += "# <<< brain-wiki commit b-gone\n"
    _note(repo, "topics/lumen/old.md", age=3 * 86400)
    codes = {p["code"] for p in run_doctor()["problems"]}
    assert {"schedule_unregistered", "uncommitted_edits"} <= codes
    assert main(["schedule", "add", "commit"]) == 0
    codes = {p["code"] for p in run_doctor()["problems"]}
    assert "uncommitted_edits" not in codes
