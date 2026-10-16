from __future__ import annotations

import json
import sys
from pathlib import Path

import pytest

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
    from brainwiki.presets import run_command

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
