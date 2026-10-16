"""The command line itself: parsing, help, exit codes, and what starting it imports
(cli-and-mcp.md §2).
"""

from __future__ import annotations

import json
import subprocess
import sys
from pathlib import Path

import pytest

from brainwiki import __version__
from brainwiki.cli._main import main

# What `brain --help` must not import: the expensive parts load only for the command that uses
# them, and Typer's rich help stays off (cli-and-mcp.md §2.4).
_HEAVY = ("brainwiki.engine", "mcp", "brainwiki.viz", "brainwiki.bench", "rich")


@pytest.mark.parametrize("argv", [["--help"], ["log", "--help"], ["rules", "add", "--help"]])
def test_help_does_not_import_the_engine(argv: list[str]):
    script = (
        "import contextlib, io, sys\n"
        "from brainwiki.cli import main\n"
        "with contextlib.redirect_stdout(io.StringIO()):\n"
        f"    code = main({argv!r})\n"
        f"heavy = {_HEAVY!r}\n"
        "print(code, sorted(m for m in sys.modules if m.split('.')[0] in heavy or "
        "any(m == h or m.startswith(h + '.') for h in heavy)))\n"
    )
    out = subprocess.run(
        [sys.executable, "-c", script], capture_output=True, text=True, check=True
    ).stdout
    assert out.strip() == "0 []"


def test_bare_brain_prints_help_and_exits_2(capsys: pytest.CaptureFixture[str]):
    assert main([]) == 2
    out = capsys.readouterr().out
    assert out.startswith("Usage: brain [OPTIONS] COMMAND") and "  search " in out
    for gone in ("version", "list", "notes", "recent", "outline"):
        assert f"\n  {gone} " not in out


def test_version_prints_only_the_version(capsys: pytest.CaptureFixture[str]):
    assert main(["--version"]) == 0
    assert capsys.readouterr().out.rstrip() == f"brain-wiki {__version__}"


@pytest.mark.parametrize(
    ("argv", "message"),
    [
        (["nosuch"], "No such command 'nosuch'"),
        (["version"], "No such command 'version'"),
        (["search", "--bogus"], "No such option: --bogus"),
        (["search", "--limit", "0"], "--limit"),
        (["read"], "Missing argument 'TARGET'"),
        (["harvest", "--apply", "enable", "codex"], "no listing flags"),
    ],
)
def test_usage_errors_exit_2(argv: list[str], message: str, capsys: pytest.CaptureFixture[str]):
    assert main(argv) == 2
    err = capsys.readouterr().err
    assert message in err


def test_usage_error_names_the_command(capsys: pytest.CaptureFixture[str]):
    assert main(["search", "--bogus"]) == 2
    first, second = capsys.readouterr().err.splitlines()[:2]
    assert first.startswith("usage: brain search [OPTIONS]")
    assert second.startswith("brain search: error: ")


def test_a_group_without_its_subcommand_is_a_usage_error(capsys: pytest.CaptureFixture[str]):
    assert main(["review"]) == 2
    assert "brain review: error: Missing command." in capsys.readouterr().err


def test_subcommands_have_their_own_help(capsys: pytest.CaptureFixture[str]):
    assert main(["rules", "add", "--help"]) == 0
    out = capsys.readouterr().out
    assert out.startswith("Usage: brain rules add [OPTIONS] {TEXT}") and "--replaces" in out


def test_global_options_go_before_or_after_the_command(
    brain_dir: Path, tmp_path: Path, capsys: pytest.CaptureFixture[str]
):
    from brainwiki.config._user import register_brain
    from brainwiki.lifecycle import init_brain

    for argv in (["--json", "brains"], ["brains", "--json"], ["brains", "list", "--json"]):
        assert main(argv) == 0, argv
        assert json.loads(capsys.readouterr().out)["brains"][0]["name"] == "test"
    register_brain("work", init_brain(tmp_path / "brains" / "work", "work"))
    assert main(["brains", "limit", "openclaw", "work"]) == 0
    capsys.readouterr()

    def names(*argv: str) -> list[str]:
        assert main([*argv, "--json"]) == 0
        return [b["name"] for b in json.loads(capsys.readouterr().out)["brains"]]

    assert names("--as", "codex", "brains", "--as", "openclaw") == ["work"]  # the nearer wins
    assert sorted(names("--as", "openclaw", "brains", "--as", "codex")) == ["test", "work"]


def test_not_found_exits_3(brain_dir: Path, capsys: pytest.CaptureFixture[str]):
    assert main(["read", "no-such-note"]) == 3
    assert capsys.readouterr().err.startswith("not_found: ")
