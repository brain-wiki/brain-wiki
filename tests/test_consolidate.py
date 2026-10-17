from __future__ import annotations

import json
import shutil
import subprocess
from pathlib import Path

import pytest
from tests.conftest import write

from brainwiki.cli._main import main
from brainwiki.config._resolve import open_brain
from brainwiki.consolidate import done, guidance, packet_text, prepare
from brainwiki.engine import Engine
from brainwiki.errors import Forbidden, NotFound
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
        assert prepare(e) is not None


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
