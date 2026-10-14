"""`brain setup`, the onboarding flow as a terminal wizard, and `brain setup --guide`, the same
flow as instructions for an AI agent (design doc 15 §3).

The wizard runs the brain-setup skill's steps without install and permissions: detect, brain,
connect, harvest, verify, summary. Every write outside the brain is shown as a dry run first,
and nothing that reads sessions is turned on without an explicit yes.
"""

from __future__ import annotations

import sys
from collections.abc import Callable
from pathlib import Path
from typing import Any

_Ask = Callable[[str], str]

_GUIDE_HEADER = """\
# brain-wiki setup guide for agents

This is the output of `brain setup --guide`. If you are an AI agent, walk the user through the
steps below in this conversation. A person can run `brain setup` in a terminal instead, which
goes through the main steps interactively.

brain-wiki's tools (`brain_*`) may not be available to you yet. Until they are, use the `brain`
command for every step (`uvx --from brain-wiki brain ...` if it is not installed). Once step 4
connects the app you are running in, its tools and skills load in a new session.

---

"""


def setup_guide() -> str:
    """The brain-setup skill, for an agent that has no plugin and starts from `brain setup`."""
    from brainwiki.hosts import plugin_source

    skill = plugin_source() / "skills" / "brain-setup"
    text = (skill / "SKILL.md").read_text(encoding="utf-8")
    if text.startswith("---"):
        text = text.split("---", 2)[2].lstrip()
    text = text.replace("](references/", f"]({(skill / 'references').as_posix()}/")
    return _GUIDE_HEADER + text


def _yes(ask: _Ask, question: str, default: bool = False) -> bool:
    hint = "[Y/n]" if default else "[y/N]"
    answer = ask(f"{question} {hint} ").strip().lower()
    return default if not answer else answer in ("y", "yes")


def run_wizard(args: Any, ask: _Ask = input, out: Callable[[str], None] = print) -> int:
    from brainwiki.config import load_user_config, register_brain, set_value
    from brainwiki.doctor import run_doctor
    from brainwiki.hosts import connect as cn
    from brainwiki.hosts import reader_for

    if ask is input and not sys.stdin.isatty():
        out(
            "brain setup is an interactive wizard and needs a terminal. "
            "An AI agent should run `brain setup --guide` and walk the user through it."
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
            from brainwiki.importer import overlay, survey

            found = survey(Path(existing))
            out(overlay.report(found, Path(existing).expanduser().resolve().name))
            if not _yes(ask, "Adopt this folder? No note is changed.", True):
                return 1
            result = overlay.adopt(Path(existing))
            summary.append(
                f"Adopted {result['root']} as brain {result['brain']!r} (undo: brain brains remove {result['brain']})"
            )
        else:
            from brainwiki.lifecycle import init_brain, init_git

            path = (
                ask("Where should the brain live? [~/brains/personal] ").strip()
                or "~/brains/personal"
            )
            name = ask("Name? [personal] ").strip() or "personal"
            root = init_brain(Path(path), name)
            register_brain(name, root)
            summary.append(f"Created brain {name!r} at {root}")
            if _yes(ask, "Track it with git (recommended)?", True):
                problem = init_git(root, name)
                summary.append(
                    f"git: {problem}" if problem else "git: initialized, with a first commit"
                )
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
            user = load_user_config()
            if len(user.brains) == 1 and not user.harvest.get("routes"):
                (only,) = user.brains
                out(
                    "Each session goes to the brain of the folder it ran in; sessions in no "
                    "brain's folder are skipped."
                )
                if _yes(ask, f"Harvest sessions from any folder under your home into {only!r}?"):
                    set_value("harvest.routes", {"~/**": only})
                    summary.append(f"Sessions under ~ go to {only!r} ([harvest.routes])")

    # Verify
    user = load_user_config()
    if user.brains:
        from brainwiki.engine import open_engine
        from brainwiki.format import EpisodeContent
        from brainwiki.index import search
        from brainwiki.write import write_episode

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
