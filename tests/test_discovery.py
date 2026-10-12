"""Progressive discovery: brain list, search filters and browse, read handles, neighbors (04 §6-§9)."""

from __future__ import annotations

import shutil
from pathlib import Path

import pytest

from brainwiki.cli.main import main
from brainwiki.config.user import register_brain, set_value
from brainwiki.index.brains import format_brain_list, list_brains
from brainwiki.lifecycle import init_brain

FIXTURE = Path(__file__).parent / "fixtures" / "example-brain"


@pytest.fixture
def example(tmp_path: Path) -> Path:
    root = tmp_path / "example"
    shutil.copytree(FIXTURE, root)
    toml = root / "brain.toml"
    toml.write_text(
        toml.read_text().replace(
            'name = "example"', 'name = "example"\ndescription = "Lumen design notes"'
        )
        + '\n[agents.codex]\nmax_privacy = "secret"\n'
    )
    register_brain("ex", root, make_default=True)
    return root


def test_list_counts_follow_the_profile(example: Path, tmp_path: Path):
    owner = list_brains(None, cwd=tmp_path)["brains"][0]
    default = list_brains("some-host", cwd=tmp_path)["brains"][0]
    assert owner["description"] == "Lumen design notes" and owner["default_here"]
    assert owner["path"] == str(example.resolve()) and owner["default"] is True
    assert default["notes"] < owner["notes"]  # the sensitive budget topic is hidden
    assert default["topics"] == owner["topics"] - 1
    assert "path" not in default and "default" not in default
    assert list_brains("codex", cwd=tmp_path)["brains"][0]["path"]  # reads every level


def test_list_respects_host_limits_and_marks_default_here(example: Path, tmp_path: Path):
    work = init_brain(tmp_path / "brains" / "work", "work")
    register_brain("work", work)
    set_value("hosts.codex.brains", ["work"])
    assert [b["name"] for b in list_brains("codex", cwd=tmp_path)["brains"]] == ["work"]
    (tmp_path / "proj").mkdir()
    (tmp_path / "proj" / ".brain-wiki.toml").write_text('brain = "work"\n')
    rows = list_brains(None, cwd=tmp_path / "proj")["brains"]
    assert [(b["name"], b["default_here"]) for b in rows] == [("ex", False), ("work", True)]
    text = format_brain_list({"brains": rows}, owner=True)
    assert text.splitlines()[1].startswith("* work") and "(default here)" in text


def test_list_reports_a_missing_brain(example: Path, tmp_path: Path):
    register_brain("gone", tmp_path / "nowhere")
    rows = {b["name"]: b for b in list_brains(None, cwd=tmp_path)["brains"]}
    assert rows["gone"]["ok"] is False and rows["ex"]["ok"] is True
    assert "missing" in format_brain_list({"brains": list(rows.values())}, owner=True)


def test_cli_list_and_brains_list_agree(example: Path, capsys: pytest.CaptureFixture[str]):
    assert main(["list"]) == 0
    listed = capsys.readouterr().out
    assert main(["brains", "list"]) == 0
    assert capsys.readouterr().out == listed
    assert listed.startswith("* ex") and "Lumen design notes" in listed
