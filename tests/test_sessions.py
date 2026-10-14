from __future__ import annotations

import json
import sqlite3
from pathlib import Path

from brainwiki.hosts.antigravity import AntigravityReader
from brainwiki.hosts.claude_code import ClaudeCodeReader
from brainwiki.hosts.codex import CodexReader
from brainwiki.hosts.detect import detect_host
from brainwiki.hosts.sessions import is_untrusted, normalize_call, summarize_args


def jsonl(path: Path, entries: list[dict]) -> Path:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text("\n".join(json.dumps(e) for e in entries) + "\n{not json\n", encoding="utf-8")
    return path


def claude_session(root: Path, session: str = "s-1", cwd: str = "/tmp/lumen") -> Path:
    base = {"sessionId": session, "cwd": cwd, "isSidechain": False}
    entries = [
        {
            **base,
            "type": "user",
            "timestamp": "2026-10-09T10:00:00Z",
            "message": {"role": "user", "content": "Why is search slow on 10k notes?"},
        },
        {
            **base,
            "type": "assistant",
            "message": {
                "role": "assistant",
                "content": [
                    {"type": "text", "text": "Let me check the docs."},
                    {
                        "type": "tool_use",
                        "name": "WebFetch",
                        "input": {"url": "https://example.com/fts5"},
                    },
                ],
            },
        },
        {
            **base,
            "type": "user",
            "message": {
                "role": "user",
                "content": [{"type": "tool_result", "content": "page text"}],
            },
        },
        {
            **base,
            "type": "assistant",
            "message": {
                "role": "assistant",
                "content": [
                    {"type": "text", "text": "ripgrep scans every file; FTS5 would index them."}
                ],
            },
        },
        {
            **base,
            "type": "user",
            "message": {
                "role": "user",
                "content": "<brain-wiki-context>\norientation\n</brain-wiki-context>\nOK, switch to FTS5.",
            },
        },
        {
            **base,
            "type": "assistant",
            "isSidechain": True,
            "message": {
                "role": "assistant",
                "content": [{"type": "text", "text": "subagent chatter"}],
            },
        },
        {
            **base,
            "type": "assistant",
            "message": {
                "role": "assistant",
                "content": [{"type": "text", "text": "Done: p95 is now 4 ms."}],
            },
        },
        {
            **base,
            "type": "user",
            "message": {"role": "user", "content": "Great, and keep CJK in mind."},
        },
        {
            **base,
            "type": "assistant",
            "message": {
                "role": "assistant",
                "content": [{"type": "text", "text": "Noted: trigram for CJK."}],
            },
        },
    ]
    return jsonl(root / "-tmp-lumen" / f"{session}.jsonl", entries)


def test_claude_reader(tmp_path: Path):
    path = claude_session(tmp_path)
    reader = ClaudeCodeReader(tmp_path)
    (info,) = reader.list_sessions()
    assert info.id == "s-1" and info.cwd == "/tmp/lumen"
    read = reader.read(info)
    roles = [t.role for t in read.turns]
    assert roles == ["user", "assistant", "user", "assistant", "user", "assistant"]
    assert read.turns[1].tools == ["WebFetch: https://example.com/fts5"]
    assert "ripgrep scans" in read.turns[1].text  # merged across the tool result
    assert read.turns[2].text == "OK, switch to FTS5."  # injected context stripped
    assert all("subagent" not in t.text for t in read.turns)
    assert read.taint == "true" and read.unparsed == 1
    assert path.exists()


def test_codex_reader(tmp_path: Path):
    entries = [
        {
            "timestamp": "t0",
            "type": "session_meta",
            "payload": {"id": "thr_abc", "cwd": "/tmp/lumen", "timestamp": "t0", "source": "cli"},
        },
        {
            "timestamp": "t1",
            "type": "response_item",
            "payload": {
                "type": "message",
                "role": "user",
                "content": [{"type": "input_text", "text": "Fetch the changelog."}],
            },
        },
        {
            "timestamp": "t2",
            "type": "response_item",
            "payload": {
                "type": "function_call",
                "name": "shell",
                "arguments": json.dumps({"command": ["curl", "https://example.com"]}),
            },
        },
        {
            "timestamp": "t3",
            "type": "response_item",
            "payload": {
                "type": "message",
                "role": "assistant",
                "content": [{"type": "output_text", "text": "Version 2 is out."}],
            },
        },
    ]
    jsonl(
        tmp_path / "sessions" / "2026" / "10" / "09" / "rollout-2026-10-09-thr_abc.jsonl", entries
    )
    reader = CodexReader([tmp_path / "sessions"])
    (info,) = reader.list_sessions()
    assert info.id == "thr_abc" and info.cwd == "/tmp/lumen"
    read = reader.read(info)
    assert [t.role for t in read.turns] == ["user", "assistant"]
    assert read.turns[1].tools == ["shell: curl https://example.com"]
    assert read.taint == "true"


def test_antigravity_reader(tmp_path: Path):
    app = tmp_path / "antigravity"
    steps = [
        {
            "step_index": 0,
            "source": "USER_EXPLICIT",
            "type": "USER_INPUT",
            "content": "Add a test for search.",
        },
        {
            "step_index": 1,
            "source": "MODEL",
            "type": "PLANNER_RESPONSE",
            "content": "Adding it.",
            "tool_calls": [{"name": "view_file", "args": {"path": "search.py"}}],
        },
        {"step_index": 2, "source": "MODEL", "type": "VIEW_FILE", "content": "file text"},
        {
            "step_index": 3,
            "source": "MODEL",
            "type": "PLANNER_RESPONSE",
            "content": "Test added.",
            "tool_calls": [
                {
                    "name": "call_mcp_tool",
                    "args": {
                        "ServerName": "brain-wiki_brain-wiki",
                        "ToolName": "brain_log_episode",
                        "Arguments": {"summary": "added a test"},
                    },
                }
            ],
        },
    ]
    logs = app / "brain" / "conv1" / ".system_generated" / "logs"
    jsonl(logs / "transcript_full.jsonl", steps)
    jsonl(logs / "transcript.jsonl", steps[:1])  # the short copy truncates long steps
    db = sqlite3.connect(app / "conversation_summaries.db")
    db.execute(
        "CREATE TABLE conversation_summaries (conversation_id text, workspace_uris text, parent_conversation_id text, source text)"
    )
    db.execute(
        "INSERT INTO conversation_summaries VALUES ('conv1', '[\"file:///tmp/lumen\"]', '', '')"
    )
    db.commit()
    db.close()
    reader = AntigravityReader([app])
    (info,) = reader.list_sessions()
    assert info.cwd == "/tmp/lumen" and info.path.name == "transcript_full.jsonl"
    read = reader.read(info)
    assert [t.role for t in read.turns] == ["user", "assistant"]
    assert read.turns[1].text == "Adding it.\nTest added." and read.taint == "false"
    assert read.turns[1].tools[1] == "mcp_brain-wiki_brain-wiki_brain_log_episode: summary=…"


def test_detect_host():
    assert detect_host("auto", env={"CLAUDE_PLUGIN_ROOT": "x"}) == "claude-code"
    assert detect_host("auto", env={"PLUGIN_ROOT": "x", "CLAUDE_PLUGIN_ROOT": "x"}) == "codex"
    assert detect_host("auto", env={"BRAIN_WIKI_HOST": "antigravity"}) == "antigravity"
    assert detect_host("codex", env={"BRAIN_WIKI_HOST": "antigravity"}) == "codex"
    assert detect_host("auto", env={}) == "generic"


def test_antigravity_tool_calls_taint():
    def untrusted(name: str, args: dict) -> bool:
        tool, normalized = normalize_call("antigravity", name, args)
        return is_untrusted("antigravity", tool, summarize_args(normalized))

    own = {"ServerName": "brain-wiki_brain-wiki", "ToolName": "brain_search", "Arguments": {}}
    assert not untrusted("call_mcp_tool", own)
    assert not untrusted("run_command", {"CommandLine": "ls -la"})
    assert untrusted("run_command", {"CommandLine": "curl https://example.com"})
    other = {"ServerName": "github", "ToolName": "get_issue", "Arguments": {}}
    assert untrusted("call_mcp_tool", other)
    assert untrusted("read_url_content", {"Url": "https://example.com"})
