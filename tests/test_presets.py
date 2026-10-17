from __future__ import annotations

import json
import sys
from pathlib import Path

import pytest
from tests.conftest import capture

# A stand-in for `claude -p`: records how it was started, then does what the agent would,
# through brain-wiki's own CLI acting as claude-code, and prints Claude Code's JSON result.
FAKE_CLAUDE = """#!{python}
import json, os, subprocess, sys
prompt = sys.stdin.read()
open({log!r}, "w").write(json.dumps({{"argv": sys.argv[1:], "stdin": prompt, "cwd": os.getcwd()}}))
if os.environ.get("FAKE_CLAUDE_FAIL"):
    print(json.dumps({{"type": "result", "subtype": "error_max_turns", "is_error": True,
                       "result": "ran out of turns"}}))
    sys.exit(1)
brain = [sys.executable, "-m", "brainwiki", "--as", "claude-code"]
packet = json.loads(subprocess.run(brain + ["consolidate", "--prepare", "--json"],
                                   capture_output=True, text=True, check=True).stdout)
for episode in packet.get("episodes", []):
    subprocess.run(brain + ["consolidate", "--done", episode["path"] + ":skip:nothing durable"],
                   check=True, capture_output=True)
print(json.dumps({{"type": "result", "subtype": "success", "is_error": False,
                   "result": "Skipped every episode."}}))
"""


@pytest.fixture
def fake_claude(tmp_path: Path, monkeypatch: pytest.MonkeyPatch) -> Path:
    log = tmp_path / "claude.json"
    claude = tmp_path / "bin" / "claude"
    claude.parent.mkdir()
    claude.write_text(FAKE_CLAUDE.format(python=sys.executable, log=str(log)))
    claude.chmod(0o755)
    monkeypatch.setenv("PATH", str(claude.parent), prepend=":")
    return log


def test_claude_runs_unattended_with_file_tools_and_brain_wiki_only(
    brain_dir: Path, fake_claude: Path
):
    from brainwiki.config import state_dir
    from brainwiki.presets import run_unattended

    entry = {"type": "stdio", "command": "/opt/bin/brain", "args": ["mcp", "--host", "claude-code"]}
    reply = run_unattended(
        "claude-code", "PRIVATE PROMPT", brain_root=brain_dir, mcp_entry=entry, timeout=60
    )
    assert reply == "Skipped every episode."
    seen = json.loads(fake_claude.read_text())
    argv = seen["argv"]
    assert argv[:4] == ["-p", "--output-format", "json", "--no-session-persistence"]
    assert "PRIVATE PROMPT" not in " ".join(argv) and seen["stdin"] == "PRIVATE PROMPT"
    assert json.loads(argv[argv.index("--mcp-config") + 1]) == {"mcpServers": {"brain-wiki": entry}}
    assert "--strict-mcp-config" in argv
    assert argv[argv.index("--tools") + 1] == "Read,Edit,Write,Glob,Grep"  # no shell, no web
    assert argv[argv.index("--permission-mode") + 1] == "dontAsk"
    assert argv[argv.index("--add-dir") + 1] == str(brain_dir)
    # harvest skips sessions under the state dir, so it never reads its own runs back
    assert seen["cwd"].startswith(str(state_dir().resolve()) + "/")


def test_unattended_mode_refuses_what_it_cannot_start(
    brain_dir: Path, fake_claude: Path, monkeypatch: pytest.MonkeyPatch
):
    from brainwiki.errors import NotAvailable, UsageError
    from brainwiki.presets import check_unattended, run_unattended

    with pytest.raises(UsageError, match="no unattended mode"):
        check_unattended("codex")
    monkeypatch.setenv("FAKE_CLAUDE_FAIL", "1")
    with pytest.raises(NotAvailable, match="exited with 1: ran out of turns"):
        run_unattended("claude-code", "x", brain_root=brain_dir, mcp_entry={}, timeout=60)
    monkeypatch.setenv("PATH", "/nonexistent")
    with pytest.raises(NotAvailable, match="needs `claude` on PATH"):
        check_unattended("claude-code")


def test_a_scheduled_run_consolidates_validates_and_records(brain_dir: Path, fake_claude: Path):
    from brainwiki.config import open_brain
    from brainwiki.consolidate import run_scheduled
    from brainwiki.engine import Engine
    from brainwiki.index import orient, scheduled_runs

    brain = open_brain(brain_dir, "test")
    nothing = run_scheduled(brain, "claude-code")
    assert nothing.status == "nothing" and not fake_claude.exists()
    capture(brain_dir, "Lumen sync retries every 30 s.")
    capture(brain_dir, "Cursor saw it.", agent="cursor")
    planned = run_scheduled(brain, "claude-code", dry_run=True)
    assert (planned.status, planned.episodes) == ("planned", 1) and not fake_claude.exists()
    done = run_scheduled(brain, "claude-code")
    assert done.status == "ok", done.error
    assert done.summary == "archived 1 episode: 1 skip"
    prompt = json.loads(fake_claude.read_text())["stdin"]
    assert "brain_consolidate_prepare" in prompt and "brain_harvest_prepare" not in prompt
    with Engine(brain, host="claude-code") as engine:
        assert scheduled_runs(engine)["claude-code"]["status"] == "ok"
        assert "cursor 1" in orient(engine)["text"]  # another agent's episode is left alone


def test_a_failed_run_shows_in_orientation_doctor_and_the_report(
    brain_dir: Path, fake_claude: Path, monkeypatch: pytest.MonkeyPatch
):
    from brainwiki.config import open_brain
    from brainwiki.consolidate import run_scheduled
    from brainwiki.doctor import run_doctor
    from brainwiki.engine import Engine
    from brainwiki.index import orient
    from brainwiki.lint import generate

    capture(brain_dir, "Lumen sync retries every 30 s.")
    monkeypatch.setenv("FAKE_CLAUDE_FAIL", "1")
    brain = open_brain(brain_dir, "test")
    failed = run_scheduled(brain, "claude-code")
    assert failed.status == "failed" and "ran out of turns" in (failed.error or "")
    with Engine(brain, host="claude-code") as engine:
        assert "Scheduled consolidation by claude-code failed" in orient(engine)["text"]
        generate(engine)
    assert "**claude-code**" in (brain_dir / "reports/consolidation.md").read_text()
    (problem,) = [
        p for p in run_doctor()["problems"] if p["code"] == "scheduled_consolidation_failed"
    ]
    assert "ran out of turns" in problem["message"]
    toml = brain_dir / "brain.toml"
    toml.write_text(toml.read_text() + '\n[agents.claude-code]\nwrite = ["harvest"]\n')
    refused = run_scheduled(open_brain(brain_dir, "test"), "claude-code")
    assert refused.status == "failed" and "agents grant claude-code edit" in (refused.error or "")
