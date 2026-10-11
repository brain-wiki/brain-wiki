from __future__ import annotations

import json
import os
import stat
from pathlib import Path

import pytest
from tests.conftest import write

from brainwiki.cli.main import main
from brainwiki.config.resolve import open_brain
from brainwiki.config.user import load_user_config
from brainwiki.engine import Engine
from brainwiki.hosts import connect as cn
from brainwiki.hosts import schedule as sc
from brainwiki.importer import overlay
from brainwiki.importer.episodes import memory_files, split_document
from brainwiki.importer.survey import survey
from brainwiki.lint import lint
from brainwiki.runs.undo import undo
from brainwiki.setup_wizard import run_wizard


def test_connect_materializes_with_installed_brain(brain_dir: Path):
    files = cn.materialize("claude-code", capture=True, brain_name="test")
    server = json.loads(files[".mcp.json"])["mcpServers"]["brain-wiki"]
    assert Path(server["command"]).name == "brain" and server["args"] == [
        "mcp",
        "--host",
        "claude-code",
        "--brain",
        "test",
    ]
    hooks = json.loads(files["hooks/hooks.json"])["hooks"]
    assert set(hooks) == {"SessionStart", "PostToolUse", "Stop", "PreCompact", "SessionEnd"}
    assert hooks["SessionEnd"][0]["hooks"][0]["async"] is True
    assert (
        "uvx" not in files["hooks.json"]
        and "PostToolUse" in json.loads(files["hooks.json"])["brain-wiki"]
    )
    assert json.loads(files[".claude-plugin/marketplace.json"])["name"] == cn.MARKETPLACE
    assert "skills/brain/SKILL.md" in files
    plain = cn.materialize("codex", capture=False, brain_name=None)
    assert list(json.loads(plain["hooks/hooks.json"])["hooks"]) == ["SessionStart"]


def test_connect_antigravity_and_cursor_with_uninstall(
    brain_dir: Path, monkeypatch: pytest.MonkeyPatch
):
    assert main(["connect", "antigravity", "--dry-run"]) == 0
    assert main(["connect", "antigravity"]) == 0
    link = Path.home() / ".gemini" / "config" / "plugins" / "brain-wiki"
    assert link.is_symlink() and (link / "plugin.json").is_file()
    assert cn.load_record("antigravity")["links"] == [str(link)]
    cursor = Path.home() / ".cursor" / "mcp.json"
    cursor.parent.mkdir(parents=True)
    cursor.write_text(json.dumps({"mcpServers": {"other": {"command": "x"}}}))
    assert main(["connect", "cursor"]) == 0
    servers = json.loads(cursor.read_text())["mcpServers"]
    assert set(servers) == {"other", "brain-wiki"}
    main(["connect", "cursor", "--uninstall"])
    assert set(json.loads(cursor.read_text())["mcpServers"]) == {"other"}
    main(["connect", "antigravity", "--uninstall"])
    assert not link.exists() and cn.load_record("antigravity") is None


def test_schedule_show_for_each_host(brain_dir: Path):
    with Engine(open_brain(brain_dir)) as engine:
        claude = sc.show(engine, "brain-maintenance", "claude-code", at="06:30")
        assert claude["cron"] == "30 6 * * *" and "{brain}" not in claude["prompt"]
        assert str(brain_dir) in claude["prompt"] or "test" in claude["prompt"]
        assert claude["missing_capabilities"] == ["harvest", "consolidate"]
        agy = sc.show(engine, "brain-harvest", "antigravity")
        assert agy["steps"][0].startswith('Run in Antigravity: /schedule "')
        assert any("ends when that session exits" in step for step in agy["steps"])
        claw = sc.show(engine, "brain-maintenance", "openclaw")
        assert "openclaw automations create" in claw["steps"][0]
        with pytest.raises(Exception, match="cloud"):
            sc.show(engine, "brain-maintenance", "cursor")
        assert sc.on_calendar("0 9 * * 1") == "Mon *-*-* 09:00:00"


def fake_crontab(tmp_path: Path, monkeypatch: pytest.MonkeyPatch) -> Path:
    store = tmp_path / "crontab.txt"
    bin_dir = tmp_path / "bin"
    bin_dir.mkdir()
    script = bin_dir / "crontab"
    script.write_text(
        f'#!/bin/sh\nif [ "$1" = "-l" ]; then cat "{store}" 2>/dev/null; else cat > "{store}"; fi\n'
    )
    script.chmod(script.stat().st_mode | stat.S_IXUSR)
    monkeypatch.setenv("PATH", f"{bin_dir}{os.pathsep}{os.environ['PATH']}")
    return store


def test_schedule_install_cron_and_remove(
    brain_dir: Path, tmp_path: Path, monkeypatch: pytest.MonkeyPatch
):
    store = fake_crontab(tmp_path, monkeypatch)
    store.write_text("0 1 * * * echo keep-me\n")
    assert main(["schedule", "install", "brain-maintenance", "--via", "cron"]) == 0
    assert "keep-me" in store.read_text() and "brain-wiki" not in store.read_text()  # dry run
    assert main(["schedule", "install", "brain-maintenance", "--via", "cron", "--apply"]) == 0
    text = store.read_text()
    assert "keep-me" in text and "harvest --apply" in text and "--if-pending 5" in text
    assert [i["kind"] for i in sc.schedule_state()] == ["cron"]
    main(["schedule", "remove", "brain-maintenance"])
    assert "brain-wiki" not in store.read_text() and "keep-me" in store.read_text()


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
        assert "- part_of [[index]]" in lumen and "up: '[[index]]'" in lumen
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
    assert [h for h, _ in split_document(doc.read_text())] == ["Decisions", "Follow-ups"]
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
    assert any("agent: claude-code" in t and "taint: unknown" in t for t in texts)


def test_setup_wizard_creates_brain(tmp_path: Path):
    answers = iter(["", str(tmp_path / "brains" / "mine"), "mine", "n"])
    output: list[str] = []
    assert run_wizard(None, ask=lambda _: next(answers, "n"), out=output.append) == 0
    assert (tmp_path / "brains" / "mine" / "brain.toml").exists()
    assert "mine" in load_user_config().brains
    assert any("Verify: search works." in line for line in output)
    assert not list((tmp_path / "brains" / "mine" / "inbox" / "episodes").rglob("*.md"))
