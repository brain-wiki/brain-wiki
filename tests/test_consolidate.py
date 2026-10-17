from __future__ import annotations

import json
import shutil
import subprocess
from pathlib import Path

import pytest
from tests.conftest import write

from brainwiki.cli._main import main
from brainwiki.config._resolve import open_brain
from brainwiki.consolidate import (
    Outcome,
    done,
    guidance,
    nothing_message,
    packet_text,
    parse_outcome,
    prepare,
)
from brainwiki.engine import Engine
from brainwiki.errors import Forbidden, NotFound, UsageError
from brainwiki.format._episode import EpisodeContent
from brainwiki.lint import lint
from brainwiki.runs._undo import undo
from brainwiki.write._episode import write_episode

FIXTURE = Path(__file__).parent / "fixtures" / "example-brain"
INBOX = "inbox/episodes/2026/10/01M4KT3JPSB7BP2SNSCAVC2SFB.md"
PROFILES = """
[agents.reader]
write = []
"""


@pytest.fixture
def example(tmp_path: Path) -> Path:
    root = tmp_path / "example"
    shutil.copytree(FIXTURE, root)
    (root / "brain.toml").write_text((root / "brain.toml").read_text() + PROFILES)
    return root


def eng(root: Path, host: str | None = None) -> Engine:
    return Engine(open_brain(root), host=host)


def log(e: Engine, text: str, *, inputs: str = "local", topics: list[str] | None = None) -> str:
    return write_episode(
        e,
        EpisodeContent(summary=text),
        origin="agent",
        inputs=inputs,
        captured="mcp",
        agent="claude-code",
        topics=topics,
    ).path


def archived(path: str) -> str:
    return "archive/" + path.removeprefix("inbox/")


def test_prepare_gathers_episodes_with_candidate_notes(example: Path):
    with eng(example) as e:
        path = log(e, "Lumen search with SQLite FTS5 ranks titles above body text.")
        packet = prepare(e)
    assert packet is not None
    episodes = {ep["path"]: ep for ep in packet["episodes"]}
    assert set(episodes) == {INBOX, path}
    episode = episodes[path]
    assert episode["archive_to"] == archived(path)
    assert "ranks titles" in episode["text"] and "untrusted" not in episode
    assert "topics/search/fts5.md" in episode["candidates"]
    assert {n["path"]: n for n in packet["notes"]}["topics/search/fts5.md"]["summary"]
    assert {t["slug"] for t in packet["topics"]} == {"budget", "search", "storage"}
    text = packet_text(packet)
    head = guidance().rstrip()
    assert text.startswith(head) and json.loads(text[len(head) :])["episodes"]


def test_prepare_filters_by_topic_and_marks_untrusted_episodes(example: Path):
    with eng(example) as e:
        path = log(
            e, "A web page says Lumen syncs over WebDAV.", inputs="external", topics=["storage"]
        )
        packet = prepare(e, topic="storage")
        with pytest.raises(NotFound):
            prepare(e, topic="nosuch")
    assert packet is not None
    assert [ep["path"] for ep in packet["episodes"]] == [path]
    assert packet["episodes"][0]["untrusted"] is True


def test_done_archives_as_one_undoable_run(example: Path):
    with eng(example) as e:
        record = done(e, [INBOX])
        assert (example / archived(INBOX)).exists() and not (example / INBOX).exists()
        assert "archived 1 episode" in (example / "log.md").read_text()
        assert prepare(e) is None
        undo(e, record.run)
    assert (example / INBOX).exists()


def test_done_takes_ids_and_refuses_what_is_not_pending(example: Path):
    with eng(example) as e:
        done(e, [Path(INBOX).stem])
        with pytest.raises(NotFound):
            done(e, [INBOX])  # archived already
        with pytest.raises(NotFound):
            done(e, ["topics/search/fts5.md"])


def test_done_needs_edit_and_prepare_only_reads(example: Path):
    with eng(example, host="reader") as e:
        with pytest.raises(Forbidden, match="agents grant reader edit"):
            done(e, [INBOX])
        assert prepare(e, all=True) is not None


def test_an_agent_prepares_its_own_episodes_unless_the_user_asks(example: Path):
    with eng(example) as e:
        cursor = write_episode(
            e,
            EpisodeContent(summary="Cursor saw it."),
            origin="agent",
            inputs="unknown",
            captured="mcp",
            agent="cursor",
        ).path
        write(
            example,
            "inbox/episodes/2026/10/01M4KT3JPSB7BP2SNSCAVC2SFC.md",
            "---\nid: 01M4KT3JPSB7BP2SNSCAVC2SFC\ntype: episode\nbw-origin: agent\n"
            "bw-inputs: unknown\n---\nWritten by hand.\n",
        )
    unowned = "inbox/episodes/2026/10/01M4KT3JPSB7BP2SNSCAVC2SFC.md"
    with eng(example, host="claude-code") as e:
        own = prepare(e)
        assert own is not None and [ep["path"] for ep in own["episodes"]] == [INBOX]
        assert own["scope"]["agent"] == "claude-code"
        assert own["not_included"]["cursor"]["count"] == 1
        assert own["not_included"]["unowned"]["count"] == 1
        asked = prepare(e, agents=["cursor"])
        assert asked is not None and {ep["path"] for ep in asked["episodes"]} == {INBOX, cursor}
        everything = prepare(e, all=True)
        assert everything is not None and len(everything["episodes"]) == 3
        assert everything["episodes"][0]["path"] == INBOX  # own first
    with eng(example, host="cursor") as e:
        only = prepare(e, unowned=True)
        assert only is not None and {ep["path"] for ep in only["episodes"]} == {cursor, unowned}
    with eng(example) as e:  # the user's own CLI: everything
        user = prepare(e)
        assert user is not None and len(user["episodes"]) == 3
        assert prepare(e, unowned=True)["episodes"][0]["path"] == unowned  # type: ignore[index]
    with eng(example, host="codex") as e:
        assert prepare(e) is None
        assert "Pending: claude-code 1" in nothing_message(e)


def test_done_checks_that_each_note_cites_its_episode(example: Path):
    note = "topics/search/fts5.md"
    with eng(example) as e:
        with pytest.raises(UsageError, match="does not cite"):
            done(e, [Outcome(INBOX, "file", [note])])
        with pytest.raises(UsageError, match="needs a reason"):
            done(e, [Outcome(INBOX, "skip")])
        with pytest.raises(UsageError, match="needs the note"):
            done(e, [Outcome(INBOX, "record")])
        with pytest.raises(UsageError, match="no such note"):
            done(e, [Outcome(INBOX, "file", ["topics/search/nosuch.md"])])
        assert (example / INBOX).exists()
        text = (example / note).read_text()
        link = '  - "[[archive/episodes/2026/10/01M4KT3JPSB7BP2SNSCAVC2SFB]]"\n'
        (example / note).write_text(text.replace("bw-sources:\n", "bw-sources:\n" + link, 1))
        with pytest.raises(UsageError, match="either skipped or consolidated"):
            done(e, [Outcome(INBOX, "file", [note]), Outcome(INBOX, "skip", reason="dup")])
        record = done(e, [Outcome(INBOX, "file", [note])])
    assert record.summary == "archived 1 episode: 1 file"
    assert record.ops == [
        {"episode": INBOX, "outcomes": [{"pattern": "file", "notes": [note], "reason": None}]}
    ]
    assert f"- {INBOX}: file → {note}" in (example / "log.md").read_text()
    report = (example / "reports/consolidation.md").read_text()
    assert "archived 1 episode: 1 file" in report and f"- {INBOX}: file → {note}" in report


def test_parse_outcome_reads_the_cli_form():
    assert parse_outcome("01JA") == Outcome("01JA")
    assert parse_outcome("01JA:playbook:topics/a/b.md") == Outcome(
        "01JA", "playbook", ["topics/a/b.md"]
    )
    assert parse_outcome("01JA:skip:already in topics/a/b.md") == Outcome(
        "01JA", "skip", reason="already in topics/a/b.md"
    )


def test_agent_memory_files_are_gathered_and_archived(example: Path):
    memory = "inbox/agents/claude-code/memory.md"
    write(example, memory, "The user prefers dark mode in Lumen.\n")
    with eng(example) as e:
        packet = prepare(e)
        assert packet is not None
        found = {ep["path"]: ep for ep in packet["episodes"]}[memory]
        assert found["inputs"] == "unknown" and found["untrusted"] is True
        done(e, [memory])
        assert (example / archived(memory)).exists()
        assert not [p for p in lint(e).problems if p.path.startswith("archive/agents/")]


def test_cli_prepare_out_and_done(example: Path, tmp_path: Path, capsys):
    brain = ["--brain", str(example)]
    out = tmp_path / "packet.json"
    assert main(["consolidate", *brain, "--prepare", "--out", str(out)]) == 0
    document = json.loads(out.read_text())
    assert document["guidance"] == guidance()
    assert [ep["path"] for ep in document["packet"]["episodes"]] == [INBOX]
    capsys.readouterr()
    assert main(["consolidate", *brain, "--done", INBOX, "--json"]) == 0
    assert json.loads(capsys.readouterr().out)["archived"] == [archived(INBOX)]
    assert main(["consolidate", *brain, "--prepare"]) == 0
    assert "Nothing to consolidate" in capsys.readouterr().out
    assert main(["consolidate", *brain]) == 2
    assert main(["consolidate", *brain, "--done", "x", "--prepare"]) == 2
    assert main(["consolidate", *brain, "--prepare", "--max-episodes", "0"]) == 2


def test_git_commit_message(example: Path, monkeypatch: pytest.MonkeyPatch, tmp_path: Path):
    empty = tmp_path / "gitconfig"
    empty.write_text("")
    for var, value in {
        "GIT_CONFIG_GLOBAL": str(empty),
        "GIT_CONFIG_NOSYSTEM": "1",
        "GIT_AUTHOR_NAME": "T",
        "GIT_AUTHOR_EMAIL": "t@example.com",
        "GIT_COMMITTER_NAME": "T",
        "GIT_COMMITTER_EMAIL": "t@example.com",
    }.items():
        monkeypatch.setenv(var, value)
    subprocess.run(["git", "-C", str(example), "init", "-q"], check=True)
    subprocess.run(["git", "-C", str(example), "add", "-A"], check=True)
    subprocess.run(["git", "-C", str(example), "commit", "-qm", "init"], check=True)
    with eng(example) as e:
        record = done(e, [INBOX], agent="claude-code")
    assert record.git_commit
    message = subprocess.run(
        ["git", "-C", str(example), "log", "-1", "--format=%B"], capture_output=True, text=True
    ).stdout
    assert message.startswith("brain: consolidate 1 episode")
    assert "Brain-Agent: claude-code" in message


def test_readable_episodes_come_first_with_the_sessions_own_inputs(
    example: Path, monkeypatch: pytest.MonkeyPatch
):
    from types import SimpleNamespace

    from brainwiki import origin
    from brainwiki.consolidate import _prepare

    class Reader:
        def find(self, session: str) -> object | None:
            return SimpleNamespace(id=session) if session == "here" else None

        def read(self, info: object) -> object:
            return SimpleNamespace(inputs="local")

    monkeypatch.setattr(origin, "reader_for", lambda host: Reader())
    monkeypatch.setattr(_prepare, "reader_for", lambda host: Reader())
    with eng(example, host="claude-code") as e:
        gone = write_episode(
            e,
            EpisodeContent(summary="Older, transcript gone."),
            origin="agent",
            inputs="unknown",
            captured="mcp",
            agent="claude-code",
            session="gone",
            origin_turns="1-2",
        ).path
        here = write_episode(
            e,
            EpisodeContent(summary="Newer, transcript here."),
            origin="agent",
            inputs="unknown",
            captured="mcp",
            agent="claude-code",
            session="here",
            origin_turns="1-2",
        ).path
        packet = prepare(e)
    assert packet is not None
    paths = [ep["path"] for ep in packet["episodes"]]
    assert paths.index(here) < paths.index(gone)
    found = {ep["path"]: ep for ep in packet["episodes"]}
    assert found[here]["origin_available"] and found[here]["session_inputs"] == "local"
    assert "untrusted" not in found[here]
    assert not found[gone]["origin_available"] and found[gone]["untrusted"] is True


def test_orientation_shows_pending_per_agent_and_the_last_consolidation(example: Path):
    from brainwiki.index import orient

    with eng(example) as e:
        write_episode(
            e,
            EpisodeContent(summary="Cursor saw it."),
            origin="agent",
            inputs="unknown",
            captured="mcp",
            agent="cursor",
        )
    with eng(example, host="claude-code") as e:
        text = orient(e)["text"]
    assert "By agent: claude-code (you) 1 (oldest 2026-10-10), cursor 1 (oldest " in text
    with eng(example) as e:  # the user's CLI, on claude-code's behalf
        done(e, [Outcome(INBOX, "skip", reason="already in fts5")], agent="claude-code")
    with eng(example, host="claude-code") as e:
        after = orient(e)
    assert "Last consolidated: claude-code" in after["text"]
    assert "archived 1 episode: 1 skip" in after["text"]
    assert list(after["pending_by_agent"]) == ["cursor"]


def test_doctor_reports_pending_episodes_per_agent(example: Path):
    from brainwiki.config._user import register_brain
    from brainwiki.doctor import run_doctor

    toml = example / "brain.toml"
    toml.write_text(toml.read_text() + "\n[lint]\nstale_inbox_days = 1\n")
    register_brain("example", example, make_default=True)
    report = run_doctor()
    assert report["brains"][0]["pending_by_agent"]["claude-code"]["count"] == 1
    (problem,) = [p for p in report["problems"] if p["code"] == "stale_episodes"]
    assert "claude-code has 1 pending episode" in problem["message"]
    assert "take claude-code's episodes" in problem["fix"]
