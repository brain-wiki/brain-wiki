from __future__ import annotations

import importlib.util
import json
import re
import subprocess
import sys
from pathlib import Path

import pytest
import yaml

ROOT = Path(__file__).resolve().parent.parent
SKILLS = ROOT / "skills"

_spec = importlib.util.spec_from_file_location("sync_versions", ROOT / "scripts/sync_versions.py")
assert _spec and _spec.loader
_sync_versions = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(_sync_versions)
plugin_version = _sync_versions.plugin_version

JSON_FILES = [
    "plugin.json",
    "mcp.json",
    ".mcp.json",
    "mcp_config.json",
    "server.json",
    ".claude-plugin/plugin.json",
    ".claude-plugin/marketplace.json",
]
TOOLS = {
    "brain_list",
    "brain_orient",
    "brain_search",
    "brain_read",
    "brain_neighbors",
    "brain_check",
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


def test_bundle_ships_no_hooks_and_an_always_on_rule():
    """Agents learn the brains from the instruction block and brain_list (08 §3); hooks are
    opt-in through `brain connect`, which writes them with the installed `brain`."""
    assert not (ROOT / "hooks.json").exists() and not (ROOT / "hooks").exists()
    assert "hooks" not in load("plugin.json")["extensions"]["com.openai"]
    meta, body = frontmatter(ROOT / "rules/brain-wiki.md")
    assert meta["trigger"] == "always_on"
    assert "brain_list" in body and "brain_neighbors" in body
    assert "brain_check" in body  # a marketplace install gets the default profile, which edits


def test_versions_and_pins_match_pyproject():
    result = subprocess.run(
        [sys.executable, str(ROOT / "scripts/sync_versions.py"), "--check"],
        capture_output=True,
        text=True,
    )
    assert result.returncode == 0, result.stdout + result.stderr


def test_plugin_files_point_at_the_last_release_while_main_is_a_dev_version(tmp_path):
    (tmp_path / "pyproject.toml").write_text(
        '[project]\nname = "brain-wiki"\nversion = "0.2.0.dev0"\n'
    )
    assert plugin_version(tmp_path) == "0.2.0.dev0"  # nothing released yet
    (tmp_path / "CHANGELOG.md").write_text(
        "# Changelog\n\n## 0.2.0 (unreleased)\n\n## 0.1.1 (2026-11-02)\n\n## 0.1.0 (2026-10-20)\n"
    )
    assert plugin_version(tmp_path) == "0.1.1"
    (tmp_path / "pyproject.toml").write_text('[project]\nname = "brain-wiki"\nversion = "0.2.0"\n')
    assert plugin_version(tmp_path) == "0.2.0"


def test_sync_check_reports_drift(tmp_path):
    for rel in [
        "pyproject.toml",
        *JSON_FILES,
        "src/brainwiki/assets/prompts/consolidate.md",
        "src/brainwiki/assets/prompts/harvest.md",
        "src/brainwiki/hosts/instructions.py",
        "rules/brain-wiki.md",
    ]:
        (tmp_path / rel).parent.mkdir(parents=True, exist_ok=True)
        (tmp_path / rel).write_bytes((ROOT / rel).read_bytes())
    pin = (tmp_path / "mcp.json").read_text(encoding="utf-8")
    (tmp_path / "mcp.json").write_text(
        re.sub(r"brain-wiki==[^\"]+", "brain-wiki==9.9.9", pin), encoding="utf-8"
    )
    script = [sys.executable, str(ROOT / "scripts/sync_versions.py"), "--root", str(tmp_path)]

    drift = subprocess.run([*script, "--check"], capture_output=True, text=True)
    assert drift.returncode == 1
    assert "out of sync: mcp.json" in drift.stdout
    assert "9.9.9" in (tmp_path / "mcp.json").read_text(encoding="utf-8")

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


@pytest.mark.parametrize(
    ("name", "trailer"), [("harvest.md", "## Packet"), ("distill.md", "## Session")]
)
def test_prompts_end_with_payload_heading(name, trailer):
    text = (ROOT / "src/brainwiki/assets/prompts" / name).read_text(encoding="utf-8")
    assert text.rstrip().splitlines()[-1] == trailer


def test_docs_brain_is_a_clean_brain(capsys):
    """docs-brain/ is generated from docs/ (scripts/build_docs_brain.py) and passes strict lint."""
    from brainwiki.cli.main import main

    assert main(["lint", "--brain", str(ROOT / "docs-brain")]) == 0
    assert "No problems" in capsys.readouterr().out
