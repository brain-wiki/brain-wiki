from __future__ import annotations

import shutil
from pathlib import Path

import pytest
from mcp import Client
from mcp_types import ElicitResult, Implementation

from brainwiki.config._user import register_brain
from brainwiki.mcp._server import _INSTRUCTIONS, build_server

FIXTURE = Path(__file__).parent / "fixtures" / "example-brain"
TOOLS = [
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
]


@pytest.fixture
def anyio_backend() -> str:
    return "asyncio"


@pytest.fixture
def example(tmp_path: Path) -> Path:
    root = tmp_path / "example"
    shutil.copytree(FIXTURE, root)
    toml = root / "brain.toml"
    toml.write_text(
        toml.read_text()
        + '\n[agents.claude-code]\nwrite = ["episodes", "propose_rules", "consolidate"]\n'
    )
    register_brain("ex", root, make_default=True)
    return root


async def accept(context, params):
    return ElicitResult(action="accept", content={"confirm": True})


async def decline(context, params):
    return ElicitResult(action="decline")


@pytest.mark.anyio
async def test_tool_list_contract(example: Path):
    assert len(_INSTRUCTIONS) < 2000
    async with Client(build_server("claude-code")) as client:
        tools = (await client.list_tools()).tools
        assert [t.name for t in tools] == TOOLS
        for tool in tools:
            assert len(tool.name) <= 26 and len(tool.description or "") < 1000
        by_name = {t.name: t for t in tools}
        assert by_name["brain_search"].annotations.read_only_hint is True
        assert by_name["brain_propose_rule"].annotations.destructive_hint is True
        assert by_name["brain_propose_rule"].meta["anthropic/requiresUserInteraction"] is True
        assert "confirmation" not in by_name["brain_propose_rule"].input_schema["properties"]
        assert by_name["brain_consolidate_prepare"].meta["anthropic/maxResultSizeChars"] > 0
        prompts = [p.name for p in (await client.list_prompts()).prompts]
        assert prompts == ["consolidate", "capture", "harvest"]


@pytest.mark.anyio
async def test_read_tools_and_errors(example: Path):
    async with Client(build_server("claude-code")) as client:
        orient = await client.call_tool("brain_orient", {})
        assert not orient.is_error and orient.content[0].text.startswith("# Brain: ex")
        assert orient.structured_content["brain"] == "ex"
        found = await client.call_tool("brain_search", {"query": "ripgrep shell out"})
        assert "supersed" in found.content[0].text.lower()
        missing = await client.call_tool("brain_read", {"target": "no such note"})
        assert missing.is_error and "not_found:" in missing.content[0].text
        listed = await client.call_tool("brain_list", {})
    [entry] = listed.structured_content["brains"]
    assert entry["name"] == "ex" and entry["default_here"] and entry["notes"] > 0
    assert entry["path"] == str(example.resolve())
    assert listed.content[0].text.startswith("* ex")


@pytest.mark.anyio
async def test_check_needs_the_edit_capability(example: Path):
    async with Client(build_server("claude-code")) as client:
        pending = await client.call_tool("brain_check", {})
        refused = await client.call_tool("brain_check", {"paths": ["topics/search/fts5.md"]})
    assert not pending.is_error and pending.structured_content["status"] == "pending"
    assert refused.is_error and "forbidden:" in refused.content[0].text


@pytest.mark.anyio
async def test_log_episode_provenance_and_dedupe(example: Path):
    async with Client(build_server("claude-code")) as client:
        args = {
            "summary": "Learned that FTS5 is fast.",
            "dedupe_key": "k1",
            "session": "s1",
            "origin_turns": "1-4",
        }
        first = await client.call_tool("brain_log_episode", args)
        again = await client.call_tool("brain_log_episode", args)
    assert again.structured_content["path"] == first.structured_content["path"]
    text = (example / first.structured_content["path"]).read_text()
    for line in (
        "origin: agent",
        "inputs: unknown",
        "captured: mcp",
        "agent: claude-code",
        "session: s1",
    ):
        assert line in text


@pytest.mark.anyio
async def test_propose_rule_paths(example: Path):
    async with Client(build_server("claude-code"), elicitation_callback=accept) as client:
        added = await client.call_tool(
            "brain_propose_rule", {"text": "Use tabs.", "user_quote": "always tabs"}
        )
    assert added.structured_content["status"] == "added"
    assert "via:mcp" in (example / "rules.md").read_text()
    async with Client(build_server("claude-code"), elicitation_callback=decline) as client:
        declined = await client.call_tool(
            "brain_propose_rule", {"text": "Use spaces.", "user_quote": "spaces"}
        )
    assert declined.structured_content["status"] == "declined"
    assert "Use spaces." not in (example / "rules.md").read_text()
    async with Client(build_server("claude-code")) as client:
        proposed = await client.call_tool(
            "brain_propose_rule", {"text": "Write tests.", "user_quote": "tests please"}
        )
    assert proposed.structured_content["status"] == "proposed"
    assert (example / proposed.structured_content["path"]).exists()
    antigravity = Implementation(name="antigravity-client", version="v1.0.0")
    async with Client(
        build_server("claude-code"), elicitation_callback=decline, client_info=antigravity
    ) as client:  # declares elicitation, then declines without showing the user anything
        fallback = await client.call_tool(
            "brain_propose_rule", {"text": "Use spaces.", "user_quote": "spaces"}
        )
    assert fallback.structured_content["status"] == "proposed"
    async with Client(build_server("codex"), elicitation_callback=accept) as client:
        forbidden = await client.call_tool("brain_propose_rule", {"text": "X.", "user_quote": "x"})
    assert forbidden.is_error and "forbidden:" in forbidden.content[0].text


@pytest.mark.anyio
async def test_consolidate_over_mcp(example: Path):
    async with Client(build_server("claude-code")) as client:
        prepared = await client.call_tool("brain_consolidate_prepare", {})
        run = prepared.structured_content["run"]
        bad = await client.call_tool(
            "brain_consolidate_apply",
            {"run": run, "ops": [{"op": "skip_episode", "episode": "E9"}]},
        )
        assert bad.is_error and "invalid_ops:" in bad.content[0].text
        ops = [
            {"op": "skip_episode", "episode": f"E{i + 1}", "reason": "test"}
            for i in range(prepared.structured_content["episodes"])
        ]
        good = await client.call_tool("brain_consolidate_apply", {"run": run, "ops": ops})
    assert not good.is_error and good.structured_content["status"] == "applied"


@pytest.mark.anyio
async def test_host_from_client_name_and_not_configured(
    example: Path, tmp_path: Path, monkeypatch: pytest.MonkeyPatch
):
    server = build_server("auto")
    async with Client(
        server, client_info=Implementation(name="claude-code", version="1")
    ) as client:
        await client.call_tool("brain_orient", {})
    assert server._brainwiki_state.host == "claude-code"
    monkeypatch.setenv("BRAIN_WIKI_CONFIG", str(tmp_path / "empty.toml"))
    monkeypatch.chdir(tmp_path)
    async with Client(build_server("claude-code")) as client:
        result = await client.call_tool("brain_orient", {})
    assert result.is_error and "brain-setup" in result.content[0].text


@pytest.mark.anyio
async def test_stdio_entry_point(example: Path):
    import os
    import sys

    from mcp import StdioServerParameters

    params = StdioServerParameters(
        command=sys.executable,
        args=["-m", "brainwiki", "mcp", "--host", "claude-code"],
        env={k: v for k, v in os.environ.items()},
    )
    async with Client(params) as client:
        names = [t.name for t in (await client.list_tools()).tools]
        result = await client.call_tool("brain_orient", {})
    assert names[0] == "brain_list" and not result.is_error
