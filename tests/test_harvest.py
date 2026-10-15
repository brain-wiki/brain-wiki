from __future__ import annotations

import json
import os
import time
from pathlib import Path

import pytest
from mcp import Client

from brainwiki import harvest as hv
from brainwiki.cli._main import main
from brainwiki.config._resolve import open_brain
from brainwiki.config._user import load_user_config, set_value
from brainwiki.engine import Engine
from brainwiki.errors import Forbidden
from brainwiki.format._frontmatter import split
from brainwiki.mcp._server import build_server
from brainwiki.origin import origin_window

OLD = time.time() - 3 * 3600


def session(root: Path, sid: str, cwd: str, *, sidechain: bool = False, mtime: float = OLD) -> Path:
    base = {"sessionId": sid, "cwd": cwd, "isSidechain": sidechain}
    lines = []
    texts = [
        ("user", "Search is slow on 10k notes; what should we use?"),
        ("assistant", "FTS5: it indexes notes; ripgrep rescans every file."),
        ("user", "Do it and measure."),
        ("assistant", "Switched to FTS5; p95 is 4 ms on 10k notes."),
        ("user", "Did BM25 in pure Python work?"),
        ("assistant", "No, it was too slow above 2k notes."),
    ]
    for role, text in texts:
        content = text if role == "user" else [{"type": "text", "text": text}]
        lines.append({**base, "type": role, "message": {"role": role, "content": content}})
    path = root / "projects" / "-x" / f"{sid}.jsonl"
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text("\n".join(json.dumps(x) for x in lines) + "\n")
    os.utime(path, (mtime, mtime))
    return path


@pytest.fixture
def setup(brain_dir: Path, tmp_path: Path, monkeypatch: pytest.MonkeyPatch) -> Path:
    claude = tmp_path / "claude"
    monkeypatch.setenv("CLAUDE_CONFIG_DIR", str(claude))
    set_value("harvest.enabled", True)
    set_value("harvest.hosts", ["claude-code"])
    toml = brain_dir / "brain.toml"
    toml.write_text(
        toml.read_text()
        + '\n[agents.claude-code]\nwrite = ["episodes", "harvest"]\nread_origin = true\n'
    )
    project = tmp_path / "code" / "lumen"
    project.mkdir(parents=True)
    (project / ".brain-wiki.toml").write_text('brain = "test"\n')
    session(claude, "s-good", str(project))
    session(claude, "s-sub", str(project), sidechain=True)
    session(claude, "s-live", str(project), mtime=time.time())
    session(claude, "s-nowhere", str(tmp_path / "elsewhere"))
    return claude


@pytest.fixture
def anyio_backend() -> str:
    return "asyncio"


def test_discover_filters_and_routes(setup: Path, brain_dir: Path):
    found = {c.info.id: c for c in hv.discover(load_user_config(), ["claude-code"])}
    assert found["s-good"].skip is None and found["s-good"].brain.root == brain_dir.resolve()
    assert found["s-live"].skip == "still in progress"
    assert found["s-nowhere"].skip == "routes to no brain"
    assert found["s-sub"].skip == "subagent session"


def test_cli_raw_harvest_writes_once(setup: Path, brain_dir: Path, capsys):
    assert main(["harvest", "--from", "claude-code"]) == 0
    assert "1 sessions to harvest" in capsys.readouterr().out
    assert main(["harvest", "--from", "claude-code", "--raw", "--apply"]) == 0
    episodes = list((brain_dir / "inbox" / "episodes").rglob("*.md"))
    assert len(episodes) == 1
    fm = split(episodes[0].read_text()).data
    assert (fm["captured"], fm["session"], fm["origin_turns"], fm["inputs"]) == (
        "harvest",
        "s-good",
        "1-6",
        "local",
    )
    assert main(["harvest", "--from", "claude-code", "--raw", "--apply"]) == 0
    assert len(list((brain_dir / "inbox" / "episodes").rglob("*.md"))) == 1


def test_distilled_harvest_and_validation(
    setup: Path, brain_dir: Path, monkeypatch: pytest.MonkeyPatch
):
    from brainwiki.cli import _cmd_harvest as cmd_harvest

    reply = {
        "summary": "Search moved to FTS5.",
        "claims": [{"text": "FTS5 p95 is 4 ms on 10k notes.", "turns": "3-4"}],
        "negative_findings": ["Pure-Python BM25 was too slow above 2k notes."],
    }
    monkeypatch.setattr("brainwiki.consolidate.run_command", lambda *a, **k: json.dumps(reply))
    (candidate,) = [c for c in hv.discover(load_user_config(), ["claude-code"]) if not c.skip]
    out = cmd_harvest._harvest_one(hv, candidate, "claude-code", dry_run=False)
    text = (brain_dir / out["episodes"][0]).read_text()
    assert "FTS5 p95 is 4 ms on 10k notes. (turns 3-4)" in text and "## Negative findings" in text
    bad, errors = hv.parse_distilled(
        {"summary": "x", "claims": [{"text": "y", "turns": "9-99"}]}, 1, 6
    )
    assert bad is None and "within 1-6" in errors[0]


@pytest.mark.anyio
async def test_mcp_harvest_recipe(setup: Path, brain_dir: Path):
    async with Client(build_server("claude-code")) as client:
        prepared = await client.call_tool("brain_harvest_prepare", {"since": "7d"})
        assert not prepared.is_error, prepared.content[0].text
        run = prepared.structured_content["run"]
        assert '"handle": "S1"' in prepared.content[0].text
        bad = await client.call_tool(
            "brain_harvest_apply",
            {
                "run": run,
                "sessions": [
                    {"session": "S1", "summary": "x", "claims": [{"text": "y", "turns": "1-99"}]}
                ],
            },
        )
        assert bad.is_error and "invalid_ops" in bad.content[0].text
        good = await client.call_tool(
            "brain_harvest_apply",
            {
                "run": run,
                "sessions": [
                    {
                        "session": "S1",
                        "summary": "Moved search to FTS5.",
                        "claims": [{"text": "FTS5 p95 is 4 ms.", "turns": "4-4"}],
                    }
                ],
            },
        )
    assert len(good.structured_content["written"]) == 1
    episode = brain_dir / good.structured_content["written"][0]["episode"]
    fm = split(episode.read_text()).data
    assert (fm["captured"], fm["agent"], fm["session"]) == ("harvest", "claude-code", "s-good")


def test_harvest_requires_opt_in(setup: Path):
    set_value("harvest.enabled", False)
    import anyio

    async def call() -> str:
        async with Client(build_server("claude-code")) as client:
            result = await client.call_tool("brain_harvest_prepare", {})
            return result.content[0].text

    assert "forbidden: harvest is off" in anyio.run(call)


def test_origin_window(setup: Path, brain_dir: Path):
    main(["harvest", "--from", "claude-code", "--raw", "--apply"])
    (episode,) = list((brain_dir / "inbox" / "episodes").rglob("*.md"))
    rel = episode.relative_to(brain_dir).as_posix()
    with Engine(open_brain(brain_dir), host="claude-code") as engine:
        result = origin_window(engine, rel, turns="3-4")
    assert [t["turn"] for t in result["window"]] == [3, 4]
    assert "p95 is 4 ms" in result["window"][1]["text"]
    with Engine(open_brain(brain_dir), host="codex") as engine, pytest.raises(Forbidden):
        origin_window(engine, rel)


def test_raw_dry_run_lists_chunks_and_writes_nothing(setup: Path, brain_dir: Path, capsys):
    args = ["harvest", "--from", "claude-code", "--raw", "--apply", "--dry-run"]
    assert main(args) == 0
    out = capsys.readouterr().out
    assert "claude-code s-good: would write turns 1-6" in out
    assert "nothing was written" in out and "Wrote" not in out
    assert not list((brain_dir / "inbox" / "episodes").rglob("*.md"))


def test_harvest_refuses_hosts_it_cannot_read_and_points_to_commands(
    setup: Path, tmp_path: Path, capsys
):
    assert main(["harvest", "--from", "nosuch"]) == 2
    assert capsys.readouterr().err.startswith("usage: unknown host nosuch")
    assert main(["harvest", "--from", "cursor"]) == 2
    assert "harvest cannot read cursor sessions yet" in capsys.readouterr().err
    assert main(["harvest", "--status", "--from", "claude-code", "--from", "codex"]) == 0
    assert "brain harvest enable codex" in capsys.readouterr().out
    assert main(["harvest", "disable", "codex"]) == 0
    assert "already off for codex" in capsys.readouterr().out
    assert main(["harvest", "--from", "claude-code"]) == 0
    listing = capsys.readouterr().out  # the whole session id, and the folder it ran in
    assert f"claude-code s-good  {tmp_path / 'code' / 'lumen'}  → test  turns 1-6" in listing


def test_origin_validates_turns_and_takes_absolute_paths(setup: Path, brain_dir: Path):
    from brainwiki.errors import UsageError

    main(["harvest", "--from", "claude-code", "--raw", "--apply"])
    (episode,) = list((brain_dir / "inbox" / "episodes").rglob("*.md"))
    with Engine(open_brain(brain_dir), host="claude-code") as engine:
        assert origin_window(engine, str(episode))["turns"] == "1-6"  # not past the last turn
        assert [t["turn"] for t in origin_window(engine, str(episode), turns="2-3")["window"]] == [
            2,
            3,
        ]
        for bad in ("4-2", "9-12", "0-3", "5-7"):
            with pytest.raises(UsageError):
                origin_window(engine, str(episode), turns=bad)


def test_harvest_is_configured_with_commands(brain_dir: Path):
    from brainwiki.config._user import load_user_config

    assert main(["harvest", "enable", "claude-code", "codex"]) == 0
    assert main(["harvest", "enable", "cursor"]) == 2  # no session reader yet
    assert main(["harvest", "disable", "codex"]) == 0
    user = load_user_config()
    assert user.harvest_enabled("claude-code") and not user.harvest_enabled("codex")
    assert main(["harvest", "route", "~/**", "test"]) == 0
    assert main(["harvest", "route", "~/work/**", "test"]) == 0
    assert main(["harvest", "route", "~/x/**", "missing"]) == 3
    # The first matching route wins, so the more specific pattern is kept first.
    assert list(load_user_config().harvest["routes"]) == ["~/work/**", "~/**"]
    assert main(["harvest", "disable", "claude-code"]) == 0
    assert not load_user_config().harvest["enabled"]


def test_a_project_file_wins_over_a_catch_all_route(brain_dir: Path, tmp_path: Path):
    from brainwiki.config import route_brain
    from brainwiki.config._user import add_harvest_route, load_user_config, register_brain
    from brainwiki.lifecycle import init_brain

    register_brain("work", init_brain(tmp_path / "brains" / "work", "work"))
    project = tmp_path / "code" / "lumen"
    project.mkdir(parents=True)
    (project / ".brain-wiki.toml").write_text('brain = "work"\n')
    add_harvest_route(f"{tmp_path}/**", "test")
    user = load_user_config()
    brain = route_brain(str(project), "claude-code", user)
    assert brain is not None and brain.name == "work"
    fallback = route_brain(str(tmp_path / "elsewhere"), "claude-code", user)
    assert fallback is not None and fallback.name == "test"
