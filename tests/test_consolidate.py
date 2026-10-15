from __future__ import annotations

import hashlib
import json
import shutil
import subprocess
import sys
from pathlib import Path

import pytest
from tests.conftest import write

from brainwiki.cli._main import main
from brainwiki.config._resolve import open_brain
from brainwiki.consolidate import _pipeline as pipeline
from brainwiki.engine import Engine
from brainwiki.errors import Forbidden
from brainwiki.format._document import parse_document
from brainwiki.format._episode import EpisodeContent
from brainwiki.lint import lint
from brainwiki.runs._undo import undo
from brainwiki.write._episode import write_episode

FIXTURE = Path(__file__).parent / "fixtures" / "example-brain"
PROFILES = """
[agents.custom]
write = ["episodes", "consolidate"]
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


def handle_for(packet, path: str) -> str:
    return next(h for h, ep in packet.episodes.items() if ep.path == path)


def note_handle(packet, path: str) -> str:
    return next(h for h, n in packet.notes.items() if n.path == path)


def claim_handle(packet, text_start: str) -> str:
    return next(h for h, c in packet.claims.items() if c.text.startswith(text_start))


def test_packet_lines_and_candidates(example: Path):
    with eng(example) as e:
        path = log(e, "FTS5 search p95 is now 3 ms on 10k notes.", topics=["search"])
        packet = pipeline.prepare(e, e.profile)
        h = handle_for(packet, path)
        entry = next(ep for ep in packet.data["episodes"] if ep["handle"] == h)
        text = (example / path).read_text().splitlines()
        number, _, content = entry["lines"][0].partition("| ")
        assert text[int(number) - 1] == content
        assert note_handle(packet, "topics/search/fts5.md") in entry["candidates"]
        with pytest.raises(Forbidden):
            pipeline.prepare(e, e.manifest.profile("default"))


def test_validation_errors(example: Path):
    with eng(example) as e:
        public = log(e, "Search uses FTS5.")
        packet = pipeline.prepare(e, e.profile)
        p = handle_for(packet, public)
        fts5 = note_handle(packet, "topics/search/fts5.md")
        bad = {
            "ops": [
                {"op": "add_claim", "note": "N99", "text": "x", "sources": [f"{p}#L1"]},
                {"op": "add_relation", "from": fts5, "verb": "frobs", "to": fts5},
                {"op": "create_note", "ref": "new:nope/x", "title": "X", "claims": []},
            ]
        }
        result = pipeline.apply(e, packet, bad, e.profile)
        assert result.status == "invalid"
        joined = "\n".join(result.errors)
        assert "N99" in joined and "lines must be within" in joined
        assert "unknown relation verb" in joined and "unknown topic 'nope'" in joined
        shape = pipeline.apply(e, packet, {"ops": [{"op": "add_claim", "note": fts5}]}, e.profile)
        assert any("'text' is a required property" in err for err in shape.errors)


def test_apply_writes_archives_logs_and_undoes(example: Path):
    with eng(example) as e:
        first = log(
            e,
            "FTS5 p95 is 3 ms at 10k notes.\nThe edges index made orientation fast.",
            inputs="unknown",
        )
        second = log(e, "Chatted about lunch.")
        third = log(e, "Unrelated thought nobody cites.")
        packet = pipeline.prepare(e, e.profile)
        a, b = handle_for(packet, first), handle_for(packet, second)
        start = packet.episodes[a].first_line
        fts5 = note_handle(packet, "topics/search/fts5.md")
        c1 = claim_handle(packet, "SQLite FTS5 is the default")
        ops = {
            "ops": [
                {
                    "op": "supersede_claim",
                    "claim": c1,
                    "text": "SQLite FTS5 is the default backend; p95 is 3 ms at 10k notes.",
                    "sources": [f"{a}#L{start}"],
                    "reason": "measured",
                },
                {
                    "op": "create_note",
                    "ref": "new:search/edges-index",
                    "title": "Edge indexes",
                    "claims": [
                        {
                            "text": "The edges index made orientation fast.",
                            "sources": [f"{a}#L{start + 1}"],
                        }
                    ],
                },
                {
                    "op": "add_relation",
                    "from": "new:search/edges-index",
                    "verb": "supports",
                    "to": fts5,
                },
                {"op": "skip_episode", "episode": b, "reason": "no durable information"},
            ]
        }
        before = {
            p: (example / p).read_text()
            for p in ("topics/search/fts5.md", "topics/search/index.md")
        }
        result = pipeline.apply(e, packet, ops, e.profile, agent="claude-code")
        assert result.status == "applied", result.errors
        assert third in result.pending and first not in result.pending
        doc = parse_document("x", (example / "topics/search/fts5.md").read_text())
        new = next(c for c in doc.claims if c.text.startswith("SQLite FTS5 is the default backend"))
        assert new.meta["inputs"] == "unknown" and new.meta["src"].startswith(first)
        old = next(
            c
            for c in doc.claims
            if c.status == "superseded" and c.text.startswith("SQLite FTS5 is the default search")
        )
        assert old.key == "bw-claims-superseded" and old.meta["by"] == new.id
        assert "- [[edges-index]]" in (example / "topics/search/index.md").read_text()
        created = (example / "topics/search/edges-index.md").read_text()
        assert (
            'bw-enables:\n  - "[[fts5]] (supports)"' in created
            and 'bw-part_of: "[[topics/search/index|Search]]"' in created
        )
        assert (
            not (example / first).exists()
            and not (example / second).exists()
            and (example / third).exists()
        )
        assert "· consolidate ·" in (example / "log.md").read_text()
        assert not [p for p in lint(e).problems if p.severity == "error"]
        undo(e, packet.run)
        assert {p: (example / p).read_text() for p in before} == before
        assert (example / first).exists() and not (
            example / "topics/search/edges-index.md"
        ).exists()


def test_stale_note_rejects_run(example: Path):
    with eng(example) as e:
        path = log(e, "Something about search.")
        packet = pipeline.prepare(e, e.profile)
        note = example / "topics/search/fts5.md"
        note.write_text(note.read_text() + "\nEdited by hand.\n")
        ops = {
            "ops": [
                {
                    "op": "add_claim",
                    "note": note_handle(packet, "topics/search/fts5.md"),
                    "text": "x y z",
                    "sources": [
                        f"{handle_for(packet, path)}#L{packet.episodes[handle_for(packet, path)].first_line}"
                    ],
                }
            ]
        }
        assert pipeline.apply(e, packet, ops, e.profile).status == "stale"


def test_review_flow(example: Path):
    toml = example / "brain.toml"
    toml.write_text(
        toml.read_text().replace("[topics.search]\n", '[topics.search]\nreview = "always"\n')
    )
    with eng(example) as e:
        path = log(e, "FTS5 handles prefix queries.")
        packet = pipeline.prepare(e, e.profile)
        h = handle_for(packet, path)
        ops = {
            "ops": [
                {
                    "op": "add_claim",
                    "note": note_handle(packet, "topics/search/fts5.md"),
                    "text": "FTS5 handles prefix queries.",
                    "sources": [f"{h}#L{packet.episodes[h].first_line}"],
                }
            ]
        }
        result = pipeline.apply(e, packet, ops, e.profile, agent="codex")
        assert result.status == "review" and result.proposal
        assert (example / path).exists()
        assert pipeline.prepare(e, e.profile) is None or path not in {
            ep.path for ep in pipeline.prepare(e, e.profile).episodes.values()
        }
        accepted = pipeline.accept_review(e, packet.run, e.profile)
        assert accepted.status == "applied", accepted.errors
        assert not (example / result.proposal).exists() and not (example / path).exists()
        assert "FTS5 handles prefix queries." in (example / "topics/search/fts5.md").read_text()


def review_always(example: Path) -> None:
    toml = example / "brain.toml"
    toml.write_text(
        toml.read_text().replace("[topics.search]\n", '[topics.search]\nreview = "always"\n')
    )


def propose(e: Engine, text: str = "FTS5 handles prefix queries.", **kw):
    """A run routed to review (the search topic must review always): (packet, episode, result)."""
    path = log(e, text, **kw)
    packet = pipeline.prepare(e, e.profile)
    h = handle_for(packet, path)
    ops = {
        "ops": [
            {
                "op": "add_claim",
                "note": note_handle(packet, "topics/search/fts5.md"),
                "text": text,
                "sources": [f"{h}#L{packet.episodes[h].first_line}"],
            }
        ]
    }
    result = pipeline.apply(e, packet, ops, e.profile, agent="codex")
    assert result.status == "review", result.errors
    return packet, path, result


def tamper(example: Path, proposal: str, change) -> None:
    """Rewrite the packet embedded in a proposal file, as anyone with file access could."""
    file = example / proposal
    text = file.read_text()
    start = text.rindex("```json\n") + len("```json\n")
    end = text.index("\n```", start)
    payload = json.loads(text[start:end])
    change(payload["packet"])
    file.write_text(text[:start] + json.dumps(payload) + text[end:])


def git_init(example: Path, monkeypatch: pytest.MonkeyPatch, tmp_path: Path) -> None:
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


def head(example: Path) -> str:
    return subprocess.run(
        ["git", "-C", str(example), "rev-parse", "HEAD"], capture_output=True, text=True
    ).stdout


@pytest.mark.parametrize("forgery", ["protected_note", "archive_target", "note_path_escape"])
def test_forged_proposal_is_refused(
    example: Path, tmp_path: Path, monkeypatch: pytest.MonkeyPatch, capsys, forgery: str
):
    from brainwiki.config._user import register_brain
    from brainwiki.consolidate._packet import drop_packet

    review_always(example)
    git_init(example, monkeypatch, tmp_path)
    register_brain("ex", example, make_default=True)
    with eng(example) as e:
        packet, path, result = propose(e)
        drop_packet(e, packet.run)  # as on another device, or a run that was never prepared
    rules = (example / "rules.md").read_bytes()
    fts5 = note_handle(packet, "topics/search/fts5.md")
    evil = "topics/search/evil.md"

    def change(raw):
        if forgery == "protected_note":
            raw["notes"][fts5]["path"] = "rules.md"
            raw["notes"][fts5]["hash"] = "sha256:" + hashlib.sha256(rules).hexdigest()
        elif forgery == "note_path_escape":
            raw["notes"][fts5]["path"] = "topics/search/../../rules.md"
        for ep in raw["episodes"].values():
            ep["archive_to"] = evil

    tamper(example, result.proposal, change)
    before = head(example)
    capsys.readouterr()
    code = main(["review", "accept", packet.run])
    err = capsys.readouterr().err
    assert code != 0 and "refusing the proposal" in err
    assert (example / "rules.md").read_bytes() == rules
    assert (example / path).exists() and not (example / evil).exists()
    assert not (example / "archive" / path.split("/", 1)[1]).exists()
    assert head(example) == before


def test_accept_rebuilds_provenance_from_the_episode(example: Path):
    from brainwiki.consolidate._packet import drop_packet

    review_always(example)
    with eng(example) as e:
        packet, path, result = propose(e, inputs="unknown")
        drop_packet(e, packet.run)

        def change(raw):
            for ep in raw["episodes"].values():
                ep["inputs"], ep["origin"] = "local", "owner"

        tamper(example, result.proposal, change)
        accepted = pipeline.accept_review(e, packet.run, e.profile)
        assert accepted.status == "applied", accepted.errors
    doc = parse_document("x", (example / "topics/search/fts5.md").read_text())
    claim = next(c for c in doc.claims if c.text == "FTS5 handles prefix queries.")
    assert claim.meta["inputs"] == "unknown" and claim.meta["origin"] == "agent"
    assert not (example / path).exists()


def test_create_note_in_review_topic_routes_to_review(example: Path):
    review_always(example)
    with eng(example) as e:
        path = log(e, "Lumen ranks title matches first.")
        packet = pipeline.prepare(e, e.profile)
        h = handle_for(packet, path)
        claim = {
            "text": "Lumen ranks title matches first.",
            "sources": [f"{h}#L{packet.episodes[h].first_line}"],
        }
        ops = {
            "ops": [
                {
                    "op": "create_note",
                    "ref": "new:search/ranking",
                    "title": "Ranking",
                    "claims": [claim],
                }
            ]
        }
        result = pipeline.apply(e, packet, ops, e.profile)
        assert result.status == "review" and "topic search requires review" in result.review
        assert not (example / "topics/search/ranking.md").exists()
        sub = {"op": "create_topic", "slug": "cjk", "title": "CJK", "parent": "search"}
        note = {"op": "create_note", "ref": "new:cjk/x", "title": "X", "claims": [claim]}
        validation = pipeline.validate(e, packet, {"ops": [sub, note]})
        assert validation.ok and "topic search requires review" in validation.review


def test_cli_exit_codes_and_messages(example: Path, tmp_path: Path, capsys):
    from brainwiki.config._user import register_brain

    register_brain("ex", example, make_default=True)
    review_always(example)
    with eng(example) as e:
        path = log(e, "FTS5 handles prefix queries.")
    assert main(["consolidate", "--prepare", "--apply", "x.json"]) == 2
    assert main(["consolidate", "--prepare", "--max-episodes", "0"]) == 2
    capsys.readouterr()
    assert main(["consolidate", "--prepare", "--topic", "nosuch"]) == 3
    assert "unknown topic 'nosuch'" in capsys.readouterr().err
    out = tmp_path / "packet.json"
    assert main(["consolidate", "--prepare", "--out", str(out)]) == 0
    prepared = json.loads(out.read_text())
    assert prepared["instructions"] and prepared["packet"]["episodes"]
    run = prepared["run"]
    h = next(ep["handle"] for ep in prepared["packet"]["episodes"])
    fts5 = next(n["handle"] for n in prepared["packet"]["notes"] if n["path"].endswith("fts5.md"))
    first = int(prepared["packet"]["episodes"][0]["lines"][0].split("|")[0])
    ops = tmp_path / "ops.json"
    ops.write_text("not json")
    capsys.readouterr()
    assert main(["consolidate", "--apply", str(ops), "--run", run]) == 1
    assert "invalid_ops" in capsys.readouterr().err
    add = {
        "op": "add_claim",
        "note": fts5,
        "text": "FTS5 handles prefix queries.",
        "sources": [f"{h}#L{first}"],
    }
    ops.write_text(json.dumps({"ops": [add]}))
    assert main(["consolidate", "--apply", str(ops), "--run", run]) == 1
    text = capsys.readouterr().out
    assert (
        "Routed to review" in text and "Nothing is written until the proposal is accepted" in text
    )
    assert "Archived" not in text and (example / path).exists()

    # review show: the proposed changes, never the packet's paths and hashes
    assert main(["review", "show", run]) == 0
    shown = capsys.readouterr().out
    assert 'add claim to topics/search/fts5.md: "FTS5 handles prefix queries."' in shown
    assert "+  - " in shown and "sha256:" not in shown and "archive_to" not in shown
    assert main(["review", "show", run, "--json"]) == 0
    data = json.loads(capsys.readouterr().out)
    assert "packet" not in data and "sha256:" not in json.dumps(data)

    # a stale packet is a conflict (4) and says to prepare again
    with eng(example) as e:
        log(e, "Another fact about search.")
    assert main(["consolidate", "--prepare", "--json"]) == 0
    second = json.loads(capsys.readouterr().out)
    note = example / "topics/search/fts5.md"
    note.write_text(note.read_text() + "\nEdited by hand.\n")
    h2 = second["packet"]["episodes"][0]["handle"]
    n2 = next(n["handle"] for n in second["packet"]["notes"] if n["path"].endswith("fts5.md"))
    l2 = int(second["packet"]["episodes"][0]["lines"][0].split("|")[0])
    ops.write_text(json.dumps({"ops": [{**add, "note": n2, "sources": [f"{h2}#L{l2}"]}]}))
    assert main(["consolidate", "--apply", str(ops), "--run", second["run"]]) == 4
    stale = capsys.readouterr().out
    assert "Prepare a new run" in stale and "fix the ops" not in stale


FAKE_AGY = """#!{python}
import json, os, sys
open({log!r}, "w").write(
    json.dumps({{"argv": sys.argv[1:], "stdin": sys.stdin.read(), "cwd": os.getcwd()}})
)
print(json.dumps({{"event": "init", "init": {{"tools": []}}}}))
print(json.dumps({{"event": "result", "result": {{"status": "SUCCESS",
    "response": json.dumps({{"ops": []}}), "structured_output": {{"ops": [{{"op": "x"}}]}}}}}}))
"""


def test_antigravity_preset_sends_prompt_on_stdin(tmp_path: Path, monkeypatch: pytest.MonkeyPatch):
    from brainwiki.config import state_dir
    from brainwiki.consolidate._presets import run_command

    log = tmp_path / "agy.json"
    agy = tmp_path / "bin" / "agy"
    agy.parent.mkdir()
    agy.write_text(FAKE_AGY.format(python=sys.executable, log=str(log)))
    agy.chmod(0o755)
    monkeypatch.setenv("PATH", str(agy.parent), prepend=":")
    reply = run_command("antigravity", "PRIVATE PACKET", schema={"type": "object"})
    assert json.loads(reply) == {"ops": []}
    seen = json.loads(log.read_text())
    assert "-p" not in seen["argv"] and "PRIVATE PACKET" not in " ".join(seen["argv"])
    assert seen["argv"][:4] == ["--input-format", "stream-json", "--output-format", "stream-json"]
    assert "--json-schema" not in seen["argv"]  # agy strips undeclared op fields from it
    # harvest skips sessions whose cwd is under the state dir, so it never distills its own runs
    assert seen["cwd"].startswith(str(state_dir().resolve()) + "/")
    message = json.loads(seen["stdin"])
    assert message["event"] == "user"
    assert message["message"]["content"].endswith(
        "Do not call tools, load skills, or read files; reply directly.\n\nPRIVATE PACKET"
    )


def test_cli_prepare_and_apply(example: Path, tmp_path: Path, capsys):
    from brainwiki.config._user import register_brain

    register_brain("ex", example, make_default=True)
    with eng(example) as e:
        path = log(e, "CLI driven consolidation works.")
    assert main(["consolidate", "--prepare", "--json"]) == 0
    prepared = json.loads(capsys.readouterr().out)
    episodes = prepared["packet"]["episodes"]
    ops = {
        "ops": [
            {"op": "skip_episode", "episode": ep["handle"], "reason": "test"} for ep in episodes
        ]
    }
    ops_file = tmp_path / "ops.json"
    ops_file.write_text(json.dumps(ops))
    assert main(["consolidate", "--apply", str(ops_file), "--run", prepared["run"], "--json"]) == 0
    assert json.loads(capsys.readouterr().out)["status"] == "applied"
    assert not (example / path).exists()


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
        log(e, "Skip me.")
        packet = pipeline.prepare(e, e.profile)
        ops = {
            "ops": [{"op": "skip_episode", "episode": h, "reason": "t"} for h in packet.episodes]
        }
        result = pipeline.apply(e, packet, ops, e.profile, agent="claude-code")
    assert result.git_commit
    message = subprocess.run(
        ["git", "-C", str(example), "log", "-1", "--format=%B"], capture_output=True, text=True
    ).stdout
    assert message.startswith("brain: consolidate") and "Brain-Agent: claude-code" in message
    status = subprocess.run(
        ["git", "-C", str(example), "status", "--porcelain"], capture_output=True, text=True
    ).stdout
    assert "inbox/episodes" not in status


def test_agent_memory_files_are_consolidated_and_archived(example: Path):
    write(example, "inbox/agents/claude-code/memory.md", "The user prefers dark mode in Lumen.\n")
    with eng(example) as e:
        packet = pipeline.prepare(e, e.profile)
        h = handle_for(packet, "inbox/agents/claude-code/memory.md")
        assert packet.episodes[h].inputs == "unknown"
        ops = {
            "ops": [{"op": "skip_episode", "episode": x, "reason": "t"} for x in packet.episodes]
        }
        assert pipeline.apply(e, packet, ops, e.profile).status == "applied"
        assert (example / "archive/agents/claude-code/memory.md").exists()
        assert not [p for p in lint(e).problems if p.path.startswith("archive/agents/")]


def test_created_topic_keeps_agents_block_current(example: Path):
    with eng(example) as e:
        path = log(e, "Lumen exports notes to PDF through the print dialog.")
        packet = pipeline.prepare(e, e.profile)
        h = handle_for(packet, path)
        line = packet.episodes[h].first_line
        ops = {
            "ops": [
                {
                    "op": "create_topic",
                    "slug": "export",
                    "title": "Export",
                    "description": "How notes leave Lumen.",
                },
                {
                    "op": "create_note",
                    "ref": "new:export/pdf",
                    "title": "PDF export",
                    "claims": [
                        {
                            "text": "Lumen exports PDF through the print dialog.",
                            "sources": [f"{h}#L{line}"],
                        }
                    ],
                },
            ]
            + [
                {"op": "skip_episode", "episode": x, "reason": "t"}
                for x in packet.episodes
                if x != h
            ]
        }
        assert pipeline.apply(e, packet, ops, e.profile).status == "applied"
        assert (
            "| export | topics/export/index.md | How notes leave Lumen. |"
            in (example / "AGENTS.md").read_text()
        )
        assert not [p for p in lint(e).problems if p.code == "BW408"]


def test_create_topic_inside_a_parent_makes_a_sub_topic(example: Path):
    with eng(example) as e:
        path = log(e, "CJK queries of three characters use the trigram table.")
        packet = pipeline.prepare(e, e.profile)
        h = handle_for(packet, path)
        line = packet.episodes[h].first_line
        claim = {"text": "CJK queries use the trigram table.", "sources": [f"{h}#L{line}"]}
        ops = {
            "ops": [
                {"op": "create_topic", "slug": "cjk", "title": "CJK search", "parent": "search"},
                {
                    "op": "create_note",
                    "ref": "new:cjk/trigram",
                    "title": "Trigram",
                    "claims": [claim],
                },
            ]
            + [
                {"op": "skip_episode", "episode": x, "reason": "t"}
                for x in packet.episodes
                if x != h
            ]
        }
        assert pipeline.apply(e, packet, ops, e.profile).status == "applied", "applied"
        assert (example / "topics/search/cjk/index.md").exists()
        assert (example / "topics/search/cjk/trigram.md").exists()
        e.scan()
        assert e.topics.parent("cjk") == "search"
        bad = {"op": "create_topic", "slug": "x", "title": "X", "parent": "nowhere"}
        packet = pipeline.prepare(e, e.profile) or packet
        result = pipeline.apply(e, packet, {"ops": [bad]}, e.profile)
        assert result.status == "invalid" and any(
            "unknown parent topic" in m for m in result.errors
        )
