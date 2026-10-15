"""Runs routed to review become proposal files in the brain (design doc 05 §7.2)."""

from __future__ import annotations

import json
import re
from dataclasses import dataclass
from typing import TYPE_CHECKING, Any

from brainwiki.consolidate._packet import Packet
from brainwiki.consolidate._validate import Validation
from brainwiki.errors import FormatError, NotFound
from brainwiki.format import format_value, now_iso, split
from brainwiki.ids import is_prefixed

if TYPE_CHECKING:
    from brainwiki.consolidate._apply import Staged
    from brainwiki.engine import Engine

_OPS_BLOCK = re.compile(r"```json\n(?P<body>.*?)\n```", re.S)


def proposal_path(engine: Engine, run: str) -> str:
    return f"{engine.manifest.layout.proposals_dir}/{run}.md"


def write_proposal(
    engine: Engine,
    packet: Packet,
    ops: list[dict[str, Any]],
    validation: Validation,
    staged: Staged,
    agent: str | None,
) -> str:
    rel = proposal_path(engine, packet.run)
    episodes = [
        packet.episodes[h].path
        for h in sorted(validation.cited | validation.skipped, key=lambda h: int(h[1:]))
    ]
    head = {
        "type": "consolidation-proposal",
        "run": packet.run,
        "agent": agent,
        "created": now_iso(),
    }
    mapping = packet.to_json()
    mapping.pop("data", None)
    lines = ["---", *[f"{k}: {format_value(v)}" for k, v in head.items() if v], "---"]
    lines += [f"# Consolidation proposal {packet.run}", "", "Review needed because:", ""]
    lines += [f"- {reason}" for reason in validation.review]
    if validation.warnings:
        lines += ["", "Warnings:", "", *[f"- {w}" for w in validation.warnings]]
    lines += [
        "",
        f"Accept: `brain review accept {packet.run}` · Reject: `brain review reject {packet.run}`",
        "",
    ]
    lines += ["## Changes", "", *staged.log_lines(len(validation.pending)), ""]
    lines += ["## Episodes", "", *[f"- {p}" for p in episodes], ""]
    lines += ["## Diff", "", "```diff", staged.run.diff().rstrip("\n"), "```", ""]
    lines += [
        "## Ops",
        "",
        "```json",
        json.dumps({"packet": mapping, "ops": ops}, ensure_ascii=False),
        "```",
        "",
    ]
    engine.store.write_text(rel, "\n".join(lines))
    return rel


def list_proposals(engine: Engine) -> list[dict[str, Any]]:
    directory = engine.store.abspath(engine.manifest.layout.proposals_dir)
    out = []
    for path in sorted(directory.glob("run-*.md")) if directory.is_dir() else []:
        fm = split(path.read_text(encoding="utf-8"))
        out.append(
            {
                "run": path.stem,
                "agent": fm.data.get("agent"),
                "created": fm.data.get("created"),
                "path": engine.store.rel(path),
            }
        )
    return out


@dataclass
class Proposal:
    """A proposal file as written. `claimed` is untrusted: rebuild it before use (05 §7.2)."""

    run: str
    path: str
    claimed: Packet
    ops: list[dict[str, Any]]
    agent: str | None


def load_proposal(engine: Engine, run: str) -> Proposal:
    if not is_prefixed(run, "run-"):
        raise NotFound(f"{run!r} is not a run id")
    rel = proposal_path(engine, run)
    if not engine.store.exists(rel):
        raise NotFound(f"no proposal for {run}")
    text = engine.store.read_text(rel)
    blocks = list(_OPS_BLOCK.finditer(text))
    if not blocks:
        raise FormatError(f"{rel} has no ops block")
    try:
        payload = json.loads(blocks[-1].group("body"))
        claimed = Packet.from_json({**payload["packet"], "data": {}})
        ops = payload["ops"]
        if claimed.run != run or not isinstance(ops, list):
            raise ValueError("the run id or the ops list does not match")
    except (ValueError, KeyError, TypeError, AttributeError) as exc:
        raise FormatError(f"{rel}: the ops block is not valid ({exc}); nothing applied") from exc
    agent = split(text).data.get("agent")
    return Proposal(run, rel, claimed, ops, str(agent) if agent else None)


def describe_ops(packet: Packet, ops: list[dict[str, Any]]) -> list[str]:
    """One line per op, with handles resolved to paths, for people reviewing a proposal."""

    def note(ref: str) -> str:
        return packet.notes[ref].path if ref in packet.notes else ref

    def claim(handle: str) -> str:
        ref = packet.claims.get(handle)
        return f'"{ref.text}" in {note(ref.note)}' if ref else handle

    def episode(handle: str) -> str:
        ref = packet.episodes.get(handle)
        return ref.path if ref else handle

    def cites(srcs: list[str]) -> str:
        return ", ".join(episode(s.partition("#")[0]) + "#" + s.partition("#")[2] for s in srcs)

    lines = []
    for op in ops:
        kind = op.get("op")
        if kind == "add_claim":
            line = f'add claim to {note(op["note"])}: "{op["text"]}" ({cites(op["sources"])})'
        elif kind == "merge_claim":
            line = f"add sources to {claim(op['claim'])} ({cites(op['sources'])})"
        elif kind == "supersede_claim":
            line = f'supersede {claim(op["claim"])} with "{op["text"]}" ({op["reason"]})'
        elif kind == "retract_claim":
            line = f"retract {claim(op['claim'])} ({op['reason']})"
        elif kind == "add_relation":
            line = f"relate {note(op['from'])} {op['verb']} {note(op['to'])}"
        elif kind == "create_note":
            line = f'create note {op["ref"][4:]}: "{op["title"]}" with {len(op["claims"])} claims'
        elif kind == "create_topic":
            line = f'create topic {op["slug"]}: "{op["title"]}"'
        elif kind == "skip_episode":
            line = f"skip {episode(op['episode'])} ({op['reason']})"
        else:
            line = json.dumps(op, ensure_ascii=False)
        lines.append(f"- {line}")
    return lines
