"""`brain setup`: the onboarding flow as a terminal wizard (design doc 15 §3).

Same steps as the brain-setup skill: detect, brain, connect, harvest, verify, summary. Every write outside the brain is shown as a dry run first, and nothing that
reads sessions is turned on without an explicit yes.
"""

from __future__ import annotations

import sys
from collections.abc import Callable
from pathlib import Path
from typing import Any

_Ask = Callable[[str], str]


def _yes(ask: _Ask, question: str, default: bool = False) -> bool:
    hint = "[Y/n]" if default else "[y/N]"
    answer = ask(f"{question} {hint} ").strip().lower()
    return default if not answer else answer in ("y", "yes")


def run_wizard(args: Any, ask: _Ask = input, out: Callable[[str], None] = print) -> int:
    from brainwiki.config.user import load_user_config, register_brain, set_value
    from brainwiki.doctor import run_doctor
    from brainwiki.hosts import connect as cn
    from brainwiki.hosts.sessions import reader_for

    if ask is input and not sys.stdin.isatty():
        out(
            "brain setup is interactive. Run it in a terminal, or ask your agent to set up brain-wiki."
        )
        return 2
    report = run_doctor()
    out(f"brain-wiki {report['version']} on {report['device']}")
    summary: list[str] = []

    # Brain
    if not report["brains"]:
        out("\nNo brain yet. A brain is a folder of Markdown notes your agents share.")
        existing = ask(
            "Path to an existing Markdown or Obsidian folder to adopt (empty to create a new brain): "
        ).strip()
        if existing:
            from brainwiki.importer import overlay
            from brainwiki.importer.survey import survey

            found = survey(Path(existing))
            out(overlay.report(found, Path(existing).expanduser().resolve().name))
            if not _yes(ask, "Adopt this folder? No note is changed.", True):
                return 1
            result = overlay.adopt(Path(existing))
            summary.append(
                f"Adopted {result['root']} as brain {result['brain']!r} (undo: brain brains remove {result['brain']})"
            )
        else:
            from brainwiki.lifecycle import init_brain

            path = (
                ask("Where should the brain live? [~/brains/personal] ").strip()
                or "~/brains/personal"
            )
            name = ask("Name? [personal] ").strip() or "personal"
            root = init_brain(Path(path), name)
            register_brain(name, root)
            if _yes(ask, "Track it with git (recommended)?", True):
                import subprocess

                subprocess.run(["git", "init", "-q", str(root)], check=False)
            summary.append(f"Created brain {name!r} at {root}")
    else:
        default = next((b for b in report["brains"] if b.get("default")), report["brains"][0])
        out(f"Brain: {default['name']} at {default['path']}")

    # Connect
    for host in report["hosts"]:
        if not host.get("installed") or host.get("connected"):
            continue
        if not _yes(ask, f"Connect {host['id']}?"):
            continue
        plan = cn.plan(host["id"])
        out(plan.describe())
        if _yes(ask, "Apply these changes?", True):
            cn.apply(plan, brain_name=None, scope="user")
            summary.append(f"Connected {host['id']} (undo: brain connect {host['id']} --uninstall)")

    # Harvest
    connected = [
        h["id"] for h in run_doctor()["hosts"] if h.get("connected") and reader_for(h["id"])
    ]
    if connected:
        out(
            "\nHarvest reads past sessions from your agents' own history and turns them into "
            "episodes. It reads session content; distilling may send it to the model your agent "
            "already uses. It is off until you say yes."
        )
        harvest = [h for h in connected if _yes(ask, f"Turn on harvest for {h}?")]
        if harvest:
            set_value("harvest.enabled", True)
            set_value("harvest.hosts", harvest)
            summary.append(f"Harvest on for {', '.join(harvest)}")

    # Verify
    user = load_user_config()
    if user.brains:
        from brainwiki.engine import open_engine
        from brainwiki.format.episode import EpisodeContent
        from brainwiki.index.search import search
        from brainwiki.write.episode import write_episode

        with open_engine(None) as engine:
            episode = write_episode(
                engine,
                EpisodeContent(summary="brain-wiki setup check: zanzibar marmalade."),
                origin="system",
                inputs="local",
                captured="cli",
            )
            found = any(
                r["path"] == episode.path for r in search(engine, "zanzibar marmalade")["results"]
            )
            engine.store.delete(episode.path)
            engine.scan(paths=[episode.path])
        out(
            "Verify: search "
            + ("works." if found else "did not find the test episode; run `brain doctor`.")
        )
    out(
        "\nDone."
        + ("\n" + "\n".join(f"- {s}" for s in summary) if summary else " Nothing changed.")
    )
    return 0
