from __future__ import annotations

import io
import json
import re
import sys
from pathlib import Path

import pytest
from tests.conftest import write

from brainwiki.cli._main import main
from brainwiki.config._resolve import open_brain
from brainwiki.config._user import load_user_config
from brainwiki.engine import Engine
from brainwiki.hosts import _connect as cn
from brainwiki.hosts._instructions import Access, server_instructions
from brainwiki.importer import _overlay as overlay
from brainwiki.importer._episodes import _split_document, memory_files
from brainwiki.importer._survey import survey
from brainwiki.lint import lint
from brainwiki.runs._undo import undo
from brainwiki.setup_wizard import run_wizard


def test_connect_materializes_with_installed_brain(brain_dir: Path):
    files = cn._materialize("claude-code", brain_name="test")
    server = json.loads(files[".mcp.json"])["mcpServers"]["brain-wiki"]
    assert Path(server["command"]).name == "brain" and server["args"] == [
        "mcp",
        "--host",
        "claude-code",
        "--brain",
        "test",
    ]
    assert json.loads(files[".claude-plugin/marketplace.json"])["name"] == cn._MARKETPLACE
    assert "skills/brain/SKILL.md" in files
    for host in cn.HOSTS:
        copy = cn._materialize(host, brain_name=None)
        assert "hooks/hooks.json" not in copy and "hooks.json" not in copy, host
        assert "hooks" not in json.loads(copy["plugin.json"])["extensions"]["com.openai"], host


@pytest.fixture
def no_host_clis(monkeypatch: pytest.MonkeyPatch) -> None:
    """Never run a real host CLI (claude, codex, openclaw) from a test."""
    import shutil

    real = shutil.which
    monkeypatch.setattr(
        cn.shutil,
        "which",
        lambda name: None if name in ("claude", "codex", "openclaw") else real(name),
    )


def test_connect_writes_the_instruction_block_and_uninstall_removes_it(
    brain_dir: Path, no_host_clis: None
):
    from brainwiki.errors import Conflict
    from brainwiki.hosts._instructions import _BEGIN

    rules = Path.home() / ".claude" / "rules" / "brain-wiki.md"
    assert main(["connect", "claude-code"]) == 0
    text = rules.read_text()
    assert (
        text.startswith(_BEGIN) and "brain_list" in text and "brain_check" in text
    )  # default: edit
    assert main(["connect", "claude-code"]) == 0  # unchanged block: rewritten quietly
    rules.write_text(text.replace("once per session", "twice per session"))
    with pytest.raises(Conflict):
        cn.plan("claude-code")
    assert main(["connect", "claude-code"]) == 4
    assert main(["connect", "claude-code", "--force"]) == 0
    assert "once per session" in rules.read_text()
    main(["connect", "claude-code", "--uninstall"])
    assert not rules.exists()


def test_codex_gets_server_instructions_and_no_file(
    brain_dir: Path, no_host_clis: None, monkeypatch: pytest.MonkeyPatch, tmp_path: Path
):
    home = tmp_path / "codex-home"
    home.mkdir()
    monkeypatch.setenv("CODEX_HOME", str(home))
    real = tmp_path / "dotfiles" / "AGENTS.md"
    real.parent.mkdir()
    real.write_text("# My rules\n\nUse tabs.\n")
    (home / "AGENTS.md").symlink_to(real)
    assert main(["connect", "codex"]) == 0
    assert real.read_text() == "# My rules\n\nUse tabs.\n"
    assert cn._load_record("codex")["instructions"] == []
    main(["connect", "codex", "--uninstall"])
    assert real.read_text() == "# My rules\n\nUse tabs.\n"
    for access in (Access(edit=True), Access(edit=False)):
        text = server_instructions(access)
        assert text.index("compacted.") < 512 and "`brain_orient`" in text[:512]


def test_openclaw_cursor_project_and_print(
    brain_dir: Path,
    no_host_clis: None,
    monkeypatch: pytest.MonkeyPatch,
    tmp_path: Path,
    capsys: pytest.CaptureFixture[str],
):
    workspace = tmp_path / "claw"
    monkeypatch.setenv("OPENCLAW_WORKSPACE_DIR", str(workspace))
    assert main(["connect", "openclaw"]) == 0
    assert "brain-wiki:begin" in (workspace / "AGENTS.md").read_text()
    project = tmp_path / "proj"
    project.mkdir()
    monkeypatch.chdir(project)
    assert main(["connect", "cursor", "--scope", "project"]) == 0
    mdc = (project / ".cursor" / "rules" / "brain-wiki.mdc").read_text()
    assert "alwaysApply: true" in mdc and "brain_search" in mdc
    capsys.readouterr()
    assert main(["connect", "codex", "--print"]) == 0
    printed = capsys.readouterr().out
    assert '"mcpServers"' in printed and "## brain-wiki: the user's long-term memory" in printed


def test_doctor_reports_a_missing_instruction_block(brain_dir: Path, no_host_clis: None):
    from brainwiki.doctor import run_doctor

    assert main(["connect", "claude-code"]) == 0
    (Path.home() / ".claude" / "rules" / "brain-wiki.md").unlink()
    problems = [p["code"] for p in run_doctor()["problems"]]
    assert "instructions_missing" in problems


def test_connect_antigravity_and_cursor_with_uninstall(
    brain_dir: Path, monkeypatch: pytest.MonkeyPatch
):
    assert main(["connect", "antigravity", "--dry-run"]) == 0
    assert main(["connect", "antigravity"]) == 0
    link = Path.home() / ".gemini" / "config" / "plugins" / "brain-wiki"
    assert link.is_symlink() and (link / "plugin.json").is_file()
    rule = (link / "rules" / "brain-wiki.md").read_text()
    assert "trigger: always_on" in rule and "brain_check" in rule
    assert not (link / "hooks.json").exists()
    assert cn._load_record("antigravity")["links"] == [str(link)]
    cursor = Path.home() / ".cursor" / "mcp.json"
    cursor.parent.mkdir(parents=True)
    cursor.write_text(json.dumps({"mcpServers": {"other": {"command": "x"}}}))
    assert main(["connect", "cursor"]) == 0
    servers = json.loads(cursor.read_text())["mcpServers"]
    assert set(servers) == {"other", "brain-wiki"}
    main(["connect", "cursor", "--uninstall"])
    assert set(json.loads(cursor.read_text())["mcpServers"]) == {"other"}
    main(["connect", "antigravity", "--uninstall"])
    assert not link.exists() and cn._load_record("antigravity") is None


def vault(tmp_path: Path) -> Path:
    root = tmp_path / "vault"
    write(root, ".obsidian/app.json", json.dumps({"attachmentFolderPath": "Attachments"}))
    write(root, "Attachments/pic.md", "not a note")
    write(root, "Templates/daily.md", "{{date}}")
    write(root, "01 Projects/index.md", "# Projects\n\n## Notes\n- [[Lumen]]\n")
    write(
        root,
        "01 Projects/Lumen.md",
        "---\nstatus: wip\nup: '[[index]]'\ntags: lumen, notes\n---\n# Lumen\n\nA notes app. See [[Search]].\n",
    )
    write(root, "01 Projects/Search.md", "---\nstatus: deprecated\n---\n# Search\n\nOld design.\n")
    write(root, "Areas/Health.md", "# Health\n\nSleep more.\n")
    return root


def test_survey_reads_numbered_para_folders(tmp_path: Path):
    for rel in ("00 Inbox/idea.md", "90 Templates/meeting.md", "01 People/kai.md"):
        write(tmp_path / "vault", rel, "# x\n")
    found = survey(tmp_path / "vault")
    assert found.ignore == ["90 Templates"] and found.topics == {"people": "01 People"}


def test_overlay_survey_adopt_and_phases(tmp_path: Path):
    root = vault(tmp_path)
    found = survey(root)
    assert found.obsidian and set(found.ignore) == {"Attachments", "Templates"}
    assert found.topics == {"projects": "01 Projects", "areas": "Areas"}
    assert found.statuses == {"wip": 1, "deprecated": 1} and found.relation_props == {"up": 1}
    before = {p: (root / p).read_text() for p in ("01 Projects/Lumen.md", "01 Projects/Search.md")}
    assert main(["import", str(root), "--overlay"]) == 0
    assert not (root / "brain.toml").exists()
    assert main(["import", str(root), "--overlay", "--apply"]) == 0
    assert (root / "brain.toml").exists() and "vault" in load_user_config().brains
    assert {p: (root / p).read_text() for p in before} == before  # phase 0 touches no note
    with Engine(open_brain(root)) as engine:
        engine.scan(force=True)
        topics = {
            r["topic"]
            for r in engine.db.execute(
                "SELECT DISTINCT topic FROM nodes WHERE kind IN ('note','hub')"
            )
        }
        assert topics == {"projects", "areas"}
        record, _ = overlay.apply_phase(engine, 1)
        lumen = (root / "01 Projects/Lumen.md").read_text()
        assert 'bw-part_of:\n  - "[[index]]"' in lumen and "up: '[[index]]'" in lumen
        overlay.apply_phase(engine, 2)
        lumen = (root / "01 Projects/Lumen.md").read_text()
        assert (
            "status: active" in lumen
            and "stage: wip" in lumen
            and "id: " in lumen
            and "tags: [lumen, notes]" in lumen
        )
        assert "status: superseded" in (root / "01 Projects/Search.md").read_text()
        overlay.apply_phase(engine, 3)
        assert (root / "Areas/index.md").exists()
        assert not [p for p in lint(engine).problems if p.severity == "error"]
        undo(engine)
        assert not (root / "Areas/index.md").exists()


def test_import_into_rewrites_path_links(brain_dir: Path, tmp_path: Path):
    source = tmp_path / "src"
    write(source, "Work/Plan.md", "# Plan\n\nSee [[Work/Notes]] and [notes](Notes.md).\n")
    write(source, "Work/Notes.md", "# Notes\n\nDetails.\n")
    assert main(["import", str(source), "--into", "test"]) == 0
    assert not (brain_dir / "topics/work").exists()
    assert main(["import", str(source), "--into", "test", "--apply"]) == 0
    plan = (brain_dir / "topics/work/Plan.md").read_text()
    assert "[[topics/work/Notes]]" in plan and "](Notes.md)" in plan and "id: " in plan
    with Engine(open_brain(brain_dir)) as engine:
        engine.scan(force=True)
        assert (
            engine.db.execute(
                "SELECT COUNT(*) FROM edges WHERE rel='links_to' AND other IS NULL"
            ).fetchone()[0]
            == 0
        )


def test_to_episodes_and_from_host(
    brain_dir: Path, tmp_path: Path, monkeypatch: pytest.MonkeyPatch
):
    doc = tmp_path / "meeting.md"
    doc.write_text("# Decisions\n\nUse FTS5.\n\n# Follow-ups\n\nMeasure CJK.\n")
    assert [h for h, _ in _split_document(doc.read_text())] == ["Decisions", "Follow-ups"]
    assert main(["import", str(doc), "--to-episodes", "--apply"]) == 0
    assert main(["import", str(doc), "--to-episodes", "--apply"]) == 0  # deduped on rerun
    episodes = list((brain_dir / "inbox/episodes").rglob("*.md"))
    assert len(episodes) == 2 and all("captured: import" in e.read_text() for e in episodes)
    claude = tmp_path / "claude"
    write(claude, "projects/-x/memory/prefs.md", "The user prefers tabs.\n")
    monkeypatch.setenv("CLAUDE_CONFIG_DIR", str(claude))
    assert memory_files("claude-code") == [claude / "projects/-x/memory/prefs.md"]
    assert main(["import", "--from", "claude-code", "--apply"]) == 0
    texts = [e.read_text() for e in (brain_dir / "inbox/episodes").rglob("*.md")]
    assert any("agent: claude-code" in t and "inputs: unknown" in t for t in texts)


def test_setup_wizard_creates_brain(tmp_path: Path):
    answers = iter(["", str(tmp_path / "brains" / "mine"), "mine", "n"])
    output: list[str] = []
    assert run_wizard(None, ask=lambda _: next(answers, "n"), out=output.append) == 0
    assert (tmp_path / "brains" / "mine" / "brain.toml").exists()
    assert "mine" in load_user_config().brains
    assert any("Verify: search works." in line for line in output)
    assert not list((tmp_path / "brains" / "mine" / "inbox" / "episodes").rglob("*.md"))


def test_setup_guide_gives_an_agent_the_setup_skill(capsys):
    assert main(["setup", "--guide"]) == 0
    out = capsys.readouterr().out
    assert out.startswith("# brain-wiki setup guide for agents")
    assert "### 4. Connect" in out and "name: brain-setup" not in out
    links = re.findall(r"\]\((/[^)]+)\)", out)  # references, as paths an agent can open
    assert links and all(Path(link).is_file() for link in links)


def test_setup_without_a_terminal_points_an_agent_to_the_guide(
    monkeypatch: pytest.MonkeyPatch, capsys
):
    monkeypatch.setattr(sys, "stdin", io.StringIO())
    assert main(["setup"]) == 2
    assert "brain setup --guide" in capsys.readouterr().out


def test_setup_wizard_grants_permissions_and_harvest_through_the_shared_commands(
    brain_dir: Path, monkeypatch: pytest.MonkeyPatch
):
    import brainwiki.doctor

    host = {"id": "claude-code", "installed": True, "connected": True}
    monkeypatch.setattr(
        brainwiki.doctor,
        "run_doctor",
        lambda: {
            "version": "0",
            "device": "d",
            "brains": [{"name": "test", "path": str(brain_dir), "default": True}],
            "hosts": [host],
        },
    )
    # consolidate: yes; propose rules: no; apply: yes; harvest: yes; apply grant: yes; route: yes
    answers = iter(["y", "n", "", "y", "", "y"])
    output: list[str] = []
    assert run_wizard(None, ask=lambda _: next(answers, "n"), out=output.append) == 0
    user = load_user_config()
    assert user.harvest_enabled("claude-code")
    assert user.harvest["routes"] == {"~/**": "test"}
    profile = open_brain(brain_dir).manifest.profile("claude-code")
    assert profile.write == ["episodes", "edit", "consolidate", "harvest"]
    assert any('ask claude-code "Consolidate my brain."' in line for line in output)


def test_agents_grant_and_revoke_are_undoable_runs(brain_dir: Path, capsys):
    before = (brain_dir / "brain.toml").read_text()
    assert main(["agents", "grant", "claude-code", "consolidate", "--dry-run"]) == 0
    assert "+[agents.claude-code]" in capsys.readouterr().out
    assert (brain_dir / "brain.toml").read_text() == before
    assert main(["agents", "grant", "claude-code", "consolidate"]) == 0
    assert main(["agents", "revoke", "claude-code", "edit"]) == 0
    assert open_brain(brain_dir).manifest.profile("claude-code").write == [
        "episodes",
        "consolidate",
    ]
    assert open_brain(brain_dir).manifest.profile("codex").write == ["episodes", "edit"]
    assert main(["undo"]) == 0
    assert "edit" in open_brain(brain_dir).manifest.profile("claude-code").write
    assert main(["agents", "grant", "claude-code", "fly"]) == 2
    capsys.readouterr()
    assert main(["agents"]) == 0
    assert "claude-code" in capsys.readouterr().out


def test_revoking_edit_from_default_rewrites_the_agents_md_block(brain_dir: Path):
    assert "To correct a note" in (brain_dir / "AGENTS.md").read_text()
    assert main(["agents", "revoke", "default", "edit"]) == 0
    assert "To correct a note" not in (brain_dir / "AGENTS.md").read_text()
    assert main(["lint"]) == 0


def test_a_refusal_names_the_command_that_allows_it():
    from brainwiki.config import Profile

    text = Profile(name="default").refusal("claude-code", "consolidate", "consolidate")
    assert "brain agents grant claude-code consolidate" in text


def test_reconnecting_keeps_user_config_and_cleans_old_blocks(
    brain_dir: Path, no_host_clis: None, monkeypatch: pytest.MonkeyPatch, tmp_path: Path
):
    cursor = Path.home() / ".cursor" / "mcp.json"
    cursor.parent.mkdir(parents=True, exist_ok=True)
    cursor.write_text(json.dumps({"mcpServers": {"mine": {"command": "x"}}}))
    assert main(["connect", "cursor"]) == 0
    assert main(["connect", "cursor"]) == 0
    assert main(["connect", "cursor", "--uninstall"]) == 0
    assert json.loads(cursor.read_text()) == {"mcpServers": {"mine": {"command": "x"}}}

    home = tmp_path / "codex-home"
    home.mkdir()
    monkeypatch.setenv("CODEX_HOME", str(home))
    agents = home / "AGENTS.md"
    agents.write_text("# Mine\n\n<!-- brain-wiki:begin v1 -->\nold\n<!-- brain-wiki:end -->\n")
    record = cn._record_path("codex")
    record.parent.mkdir(parents=True, exist_ok=True)
    record.write_text(json.dumps({"instructions": [{"path": str(agents), "written": str(agents)}]}))
    assert main(["connect", "codex"]) == 0
    assert agents.read_text() == "# Mine\n"
    assert cn._load_record("codex")["instructions"] == []


def test_an_unexpected_error_is_logged_and_exits_10(
    monkeypatch: pytest.MonkeyPatch, capsys: pytest.CaptureFixture[str]
):
    import logging

    from brainwiki import logs
    from brainwiki.cli import _cmd_core

    def boom(args: object) -> int:
        raise RuntimeError("synthetic failure")

    monkeypatch.setattr(_cmd_core, "doctor", boom)
    monkeypatch.setattr(logs, "_configured", False)
    logger = logging.getLogger("brainwiki")
    handlers = list(logger.handlers)
    try:
        assert main(["doctor"]) == 10
    finally:
        for handler in logger.handlers[len(handlers) :]:
            handler.close()
            logger.removeHandler(handler)
    err = capsys.readouterr().err
    assert err == f"internal: unexpected error; details are in {logs.log_path()}\n"
    assert "RuntimeError: synthetic failure" in logs.log_path().read_text()


def test_a_name_clash_is_a_conflict_not_stale(brain_dir: Path, capsys: pytest.CaptureFixture[str]):
    from brainwiki.errors import Conflict, Stale
    from brainwiki.lifecycle import init_brain

    other = init_brain(brain_dir.parent / "other", "other")
    assert main(["brains", "add", "test", str(other)]) == 4
    assert capsys.readouterr().err.startswith("conflict: ")
    assert issubclass(Stale, Conflict) and (Stale.code, Stale.exit_code) == ("stale", 4)


def test_connect_cursor_refuses_a_config_that_is_not_plain_json(
    brain_dir: Path, capsys: pytest.CaptureFixture[str]
):
    cursor = Path.home() / ".cursor" / "mcp.json"
    cursor.parent.mkdir(parents=True)
    jsonc = '{\n  // my servers\n  "mcpServers": {},\n}\n'
    cursor.write_text(jsonc)
    assert main(["connect", "cursor"]) == 1
    err = capsys.readouterr().err
    assert err.startswith(f"format: {cursor} is not plain JSON") and "--print" in err
    cursor.write_text("{}")
    assert main(["connect", "cursor"]) == 0
    cursor.write_text(jsonc)
    assert main(["connect", "cursor", "--uninstall"]) == 1
    assert "remove the brain-wiki entry by hand" in capsys.readouterr().err
    assert cursor.read_text() == jsonc


def test_cursor_user_and_project_scopes_are_kept_apart(
    brain_dir: Path, monkeypatch: pytest.MonkeyPatch, tmp_path: Path, capsys
):
    project = tmp_path / "proj"
    project.mkdir()
    monkeypatch.chdir(project)
    mdc = project / ".cursor" / "rules" / "brain-wiki.mdc"
    assert main(["connect", "cursor", "--scope", "project"]) == 0
    capsys.readouterr()
    assert main(["connect", "cursor", "--dry-run"]) == 0
    assert str(mdc) not in capsys.readouterr().out
    assert main(["connect", "cursor"]) == 0
    assert mdc.is_file() and cn._load_record("cursor", "project", project)
    capsys.readouterr()
    assert main(["connect", "cursor", "--uninstall"]) == 0
    assert "Keep" in capsys.readouterr().out
    assert mdc.is_file() and "brain-wiki" in (project / ".cursor" / "mcp.json").read_text()
    assert not (Path.home() / ".cursor" / "mcp.json").exists()
    assert main(["connect", "cursor", "--uninstall"]) == 0
    assert f"connected for project {project.resolve()}" in capsys.readouterr().out
    assert main(["connect", "cursor", "--scope", "project", "--uninstall"]) == 0
    assert not mdc.exists() and not (project / ".cursor" / "mcp.json").exists()
    assert not cn._host_records("cursor")


def test_uninstall_restores_the_config_byte_for_byte_unless_edited(brain_dir: Path, capsys):
    cursor = Path.home() / ".cursor" / "mcp.json"
    cursor.parent.mkdir(parents=True)
    original = b'{"mcpServers": {"mine": {"command": "x"}}}\r\n'
    cursor.write_bytes(original)
    assert main(["connect", "cursor"]) == 0
    assert main(["connect", "cursor"]) == 0  # the backup still holds the original
    assert main(["connect", "cursor", "--uninstall"]) == 0
    assert cursor.read_bytes() == original

    assert main(["connect", "cursor"]) == 0
    data = json.loads(cursor.read_text())
    data["mcpServers"]["added"] = {"command": "y"}
    cursor.write_text(json.dumps(data))
    capsys.readouterr()
    assert main(["connect", "cursor", "--uninstall"]) == 0
    assert "changed since connect" in capsys.readouterr().out
    assert set(json.loads(cursor.read_text())["mcpServers"]) == {"mine", "added"}


def test_connect_and_mcp_refuse_bad_arguments(brain_dir: Path, capsys: pytest.CaptureFixture[str]):
    assert main(["connect", "cursor", "--brain", "nosuch", "--print"]) == 3
    assert capsys.readouterr().err.startswith("not_found: no brain named 'nosuch'")
    assert main(["connect", "cursor", "--brain", "test", "--print"]) == 0
    assert main(["connect", "cursor", "--print", "--uninstall"]) == 2
    for host in ("codex", "antigravity", "openclaw"):
        assert main(["connect", host, "--scope", "project", "--dry-run"]) == 2
        assert "has no project scope" in capsys.readouterr().err
    assert main(["mcp", "--host", "No Such/Host"]) == 2
    assert "is not a host id" in capsys.readouterr().err


def test_brains_limit_sets_which_brains_an_app_may_use(brain_dir: Path, tmp_path: Path, capsys):
    from brainwiki.config._user import register_brain
    from brainwiki.lifecycle import init_brain

    register_brain("work", init_brain(tmp_path / "brains" / "work", "work"))
    assert main(["brains", "limit", "openclaw", "work"]) == 0
    capsys.readouterr()
    assert main(["brains", "--as", "openclaw", "--json"]) == 0
    assert [b["name"] for b in json.loads(capsys.readouterr().out)["brains"]] == ["work"]
    assert main(["brains", "limit", "openclaw", "nope"]) == 3
    assert main(["brains", "unlimit", "openclaw"]) == 0
    assert load_user_config().host("openclaw").brains is None
