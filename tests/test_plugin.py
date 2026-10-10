from __future__ import annotations

import json
import re
import subprocess
import sys
from pathlib import Path

import pytest
import yaml

ROOT = Path(__file__).resolve().parent.parent
ROUTINES = ROOT / "src/brainwiki/assets/routines"
SKILLS = ROOT / "skills"

JSON_FILES = [
    "plugin.json",
    "mcp.json",
    ".mcp.json",
    "mcp_config.json",
    "server.json",
    "hooks.json",
    "hooks/hooks.json",
    ".claude-plugin/plugin.json",
    ".claude-plugin/marketplace.json",
]
TOOLS = {
    "brain_orient",
    "brain_search",
    "brain_read",
    "brain_log_episode",
    "brain_propose_rule",
    "brain_consolidate_prepare",
    "brain_consolidate_apply",
    "brain_read_origin",
    "brain_harvest_prepare",
    "brain_harvest_apply",
}
PLACEHOLDERS = {"brain", "brain_path", "host"}


def load(name: str):
    return json.loads((ROOT / name).read_text(encoding="utf-8"))


def frontmatter(path: Path) -> tuple[dict, str]:
    text = path.read_text(encoding="utf-8")
    match = re.match(r"---\n(.*?)\n---\n(.*)", text, re.DOTALL)
    assert match, f"{path} has no frontmatter"
    return yaml.safe_load(match.group(1)), match.group(2)


@pytest.mark.parametrize("name", JSON_FILES)
def test_json_files_parse_with_canonical_formatting(name):
    text = (ROOT / name).read_text(encoding="utf-8")
    assert text == json.dumps(json.loads(text), indent=2, ensure_ascii=False) + "\n"


def test_manifests_name_the_plugin():
    assert load("plugin.json")["name"] == "brain-wiki"
    assert load(".claude-plugin/plugin.json")["name"] == "brain-wiki"
    market = load(".claude-plugin/marketplace.json")
    assert [(p["name"], p["source"]) for p in market["plugins"]] == [("brain-wiki", "./")]
    assert load("server.json")["packages"][0]["identifier"] == "brain-wiki"


def test_mcp_server_entries_per_host():
    def server(name):
        return load(name)["mcpServers"]["brain-wiki"]

    expected = {"mcp.json": "auto", ".mcp.json": "auto", "mcp_config.json": "antigravity"}
    for name, host in expected.items():
        entry = server(name)
        assert entry["command"] == "uvx"
        assert entry["args"][2:] == ["brain", "mcp", "--host", host]
    assert server("mcp.json")["type"] == "stdio"
    assert "type" not in server("mcp_config.json")


def test_default_hooks_install_orientation_only():
    claude = load("hooks/hooks.json")["hooks"]
    assert list(claude) == ["SessionStart"]
    assert claude["SessionStart"][0]["hooks"][0]["command"].endswith("brain hook auto SessionStart")
    antigravity = load("hooks.json")["brain-wiki"]
    assert list(antigravity) == ["PreInvocation"]
    assert antigravity["PreInvocation"][0]["command"].endswith(
        "brain hook antigravity PreInvocation"
    )


def test_versions_and_pins_match_pyproject():
    result = subprocess.run(
        [sys.executable, str(ROOT / "scripts/sync_versions.py"), "--check"],
        capture_output=True,
        text=True,
    )
    assert result.returncode == 0, result.stdout + result.stderr


def test_sync_check_reports_drift(tmp_path):
    for rel in [
        "pyproject.toml",
        *JSON_FILES,
        "src/brainwiki/assets/prompts/consolidate.md",
        "src/brainwiki/assets/prompts/harvest.md",
    ]:
        (tmp_path / rel).parent.mkdir(parents=True, exist_ok=True)
        (tmp_path / rel).write_bytes((ROOT / rel).read_bytes())
    (tmp_path / "src/brainwiki/assets/routines").mkdir()
    pin = (tmp_path / "hooks.json").read_text(encoding="utf-8")
    (tmp_path / "hooks.json").write_text(
        re.sub(r"brain-wiki==\S+?(?= )", "brain-wiki==9.9.9", pin), encoding="utf-8"
    )
    script = [sys.executable, str(ROOT / "scripts/sync_versions.py"), "--root", str(tmp_path)]

    drift = subprocess.run([*script, "--check"], capture_output=True, text=True)
    assert drift.returncode == 1
    assert "out of sync: hooks.json" in drift.stdout
    assert "9.9.9" in (tmp_path / "hooks.json").read_text(encoding="utf-8")

    assert subprocess.run(script, capture_output=True).returncode == 0
    assert subprocess.run([*script, "--check"], capture_output=True).returncode == 0


@pytest.mark.parametrize("skill", sorted(p.name for p in SKILLS.iterdir() if p.is_dir()))
def test_skill_conforms_to_agent_skills_spec(skill):
    path = SKILLS / skill / "SKILL.md"
    meta, body = frontmatter(path)
    assert set(meta) == {"name", "description"}
    assert meta["name"] == skill
    assert re.fullmatch(r"[a-z0-9]+(-[a-z0-9]+)*", skill)
    assert 0 < len(meta["description"]) < 1024
    assert len(body.splitlines()) < 500
    for target in re.findall(r"\]\(([^)#\s]+)\)", body):
        if "://" not in target:
            assert (path.parent / target).exists(), f"{skill}: missing {target}"


def test_skills_shipped():
    assert {p.name for p in SKILLS.iterdir() if p.is_dir()} == {
        "brain",
        "brain-setup",
        "brain-maintain",
    }


@pytest.mark.parametrize("routine", sorted(ROUTINES.glob("*.md")), ids=lambda p: p.stem)
def test_routine_template(routine):
    meta, body = frontmatter(routine)
    assert set(meta) == {"name", "title", "cron", "hosts", "needs", "allow_tools", "working_dir"}
    assert meta["name"] == routine.stem
    assert len(meta["cron"].split()) == 5
    assert set(meta["allow_tools"]) <= TOOLS
    assert "brain_propose_rule" not in meta["allow_tools"]
    assert set(meta["needs"]) <= {"episodes", "consolidate", "harvest", "review"}
    assert meta["working_dir"] == "{brain_path}"
    assert set(re.findall(r"\{([^{}]*)\}", body)) <= PLACEHOLDERS
    assert "{" not in re.sub(r"\{(brain|brain_path|host)\}", "", body)


def test_health_routine_reads_only():
    meta, _ = frontmatter(ROUTINES / "brain-health.md")
    assert set(meta["allow_tools"]) == {"brain_orient", "brain_search", "brain_read"}
    assert meta["needs"] == []


@pytest.mark.parametrize(
    ("name", "trailer"), [("harvest.md", "## Packet"), ("distill.md", "## Session")]
)
def test_prompts_end_with_payload_heading(name, trailer):
    text = (ROOT / "src/brainwiki/assets/prompts" / name).read_text(encoding="utf-8")
    assert text.rstrip().splitlines()[-1] == trailer
