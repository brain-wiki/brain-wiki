"""harvest, origin."""

from __future__ import annotations

import json
from importlib import resources
from typing import Any

from brainwiki.cli.output import emit, warn
from brainwiki.errors import UsageError


def harvest(args: Any) -> int:
    from brainwiki import harvest as hv
    from brainwiki.config.user import load_user_config

    user = load_user_config()
    hosts = args.hosts or list(user.harvest.get("hosts") or ["claude-code", "codex", "antigravity"])
    candidates = hv.discover(user, hosts, since=args.since, project=args.project)
    eligible = [c for c in candidates if not c.skip]
    if args.status:
        rows = []
        for host in hosts:
            mine = [c for c in candidates if c.info.host == host]
            rows.append(
                {
                    "host": host,
                    "enabled": user.harvest_enabled(host),
                    "sessions": len(mine),
                    "unharvested": sum(1 for c in mine if not c.skip),
                }
            )
        text = "\n".join(
            f"{r['host']}: {'on' if r['enabled'] else 'off'}, {r['unharvested']} of {r['sessions']} sessions to harvest"
            for r in rows
        )
        emit(args, rows, text)
        return 0
    if not args.apply:
        data = [c.to_json() for c in candidates]
        lines = [
            f"{c.info.host} {c.info.id[:12]}  → {c.brain.display_name if c.brain else '-'}  "
            + (
                f"skip: {c.skip}"
                if c.skip
                else f"turns {c.to_json()['turns']}, ~{c.to_json()['estimated_tokens']} tokens"
            )
            for c in candidates
        ]
        total = sum(c.to_json()["estimated_tokens"] for c in eligible)
        lines.append(
            f"{len(eligible)} sessions to harvest, ~{total} tokens to distill. Run with --apply."
        )
        emit(args, data, "\n".join(lines))
        return 0
    preset = None if args.raw else (args.distill or user.harvest.get("distill") or "claude-code")
    if preset == "raw":
        preset = None
    results = [_harvest_one(hv, c, preset, dry_run=args.dry_run) for c in eligible]
    written = [p for r in results for p in r["episodes"]]
    emit(args, results, f"Wrote {len(written)} episodes from {len(eligible)} sessions.")
    return 0 if all(not r.get("error") for r in results) else 1


def _harvest_one(hv: Any, candidate: Any, preset: str | None, *, dry_run: bool) -> dict[str, Any]:
    from brainwiki.consolidate.presets import run_command

    out: dict[str, Any] = {
        "session": candidate.info.id,
        "host": candidate.info.host,
        "episodes": [],
    }
    prompt_head = (resources.files("brainwiki") / "assets" / "prompts" / "distill.md").read_text(
        encoding="utf-8"
    )
    for group in hv.chunks(candidate.new_turns):
        first, last = group[0].index, group[-1].index
        if dry_run:
            out["episodes"].append(f"(dry run) turns {first}-{last}")
            continue
        if preset is None:
            out["episodes"].append(
                hv.write_episode_for(candidate, first, last, None, raw_turns=group)
            )
            hv.advance(candidate.info.host, candidate.info.id, last)
            continue
        turns, truncated = hv.condense(group, hv.CHUNK_CHARS)
        payload = json.dumps(hv.session_payload(candidate, turns, truncated), ensure_ascii=False)
        try:
            reply = run_command(preset, prompt_head + "\n" + payload + "\n")
        except Exception as exc:  # noqa: BLE001 - report per session and continue
            out["error"] = str(exc)
            warn(f"{candidate.info.id}: {exc}")
            return out
        data = _first_json(reply)
        distilled, problems = hv.parse_distilled(data, first, last)
        if problems:
            out["error"] = "; ".join(problems)
            return out
        if distilled is not None and not distilled.skip:
            out["episodes"].append(hv.write_episode_for(candidate, first, last, distilled))
        hv.advance(candidate.info.host, candidate.info.id, last)
    return out


def _first_json(text: str) -> Any:
    decoder = json.JSONDecoder()
    for start in [i for i, ch in enumerate(text) if ch == "{"]:
        try:
            value, _ = decoder.raw_decode(text[start:])
        except ValueError:
            continue
        if isinstance(value, dict):
            return value
    raise UsageError("the distill reply contained no JSON object")


def origin(args: Any) -> int:
    from brainwiki.engine import open_engine
    from brainwiki.origin import format_origin, origin_window

    with open_engine(args.brain, host=getattr(args, "as_host", None)) as engine:
        result = origin_window(engine, args.episode, turns=args.turns)
    emit(args, result, format_origin(result))
    return 0
