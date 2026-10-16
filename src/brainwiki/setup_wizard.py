"""`brain setup`, the onboarding flow as a terminal wizard, and `brain setup --guide`, the same
flow as instructions for an AI agent (docs/design/skills-and-onboarding.md §3).

The wizard runs the brain-setup skill's steps except install: detect, brain, connect,
permissions, harvest, verify, summary and next steps. Every write outside the brain is shown as a dry run first,
and nothing that reads sessions is turned on without an explicit yes.
"""

from __future__ import annotations

import re
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


_ABILITIES = (("propose_rules", "propose standing rules (you confirm each one)"),)


def _choose_adopt(ask: _Ask, out: Callable[[str], None]) -> bool:
    """Whether to adopt an existing folder of notes rather than create a new brain."""
    question = (
        "Create a new brain, or adopt a folder of notes you already have "
        "(such as an Obsidian vault)? (new/adopt) [new] "
    )
    for _ in range(3):
        answer = ask(question).strip().lower()
        if answer in ("", "n", "new"):
            return False
        if answer in ("a", "adopt"):
            return True
        out("Answer new or adopt.")
    return False


def _ask_name(ask: _Ask, out: Callable[[str], None], folder: Path) -> str:
    """The brain's short name, defaulting to its folder's name made into a valid id."""
    from brainwiki.config import SLUG_RE

    default = re.sub(r"[^a-z0-9]+", "-", folder.name.lower()).strip("-")[:64] or "personal"
    for _ in range(3):
        name = (
            ask(
                f"Short name for this brain, used to pick it (`brain --brain NAME`) [{default}] "
            ).strip()
            or default
        )
        if SLUG_RE.match(name):
            return name
        out("Use lowercase letters, digits, and hyphens.")
    return default


def _yes(ask: _Ask, question: str, default: bool = False) -> bool:
    hint = "[Y/n]" if default else "[y/N]"
    answer = ask(f"{question} {hint} ").strip().lower()
    return default if not answer else answer in ("y", "yes")


def run_wizard(args: Any, ask: _Ask = input, out: Callable[[str], None] = print) -> int:
    from brainwiki.config import (
        add_harvest_route,
        load_user_config,
        register_brain,
        set_harvest,
    )
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
        if _choose_adopt(ask, out):
            from brainwiki.importer import overlay, survey

            here = Path.cwd()
            shown = (
                f"~/{here.relative_to(Path.home())}"
                if here.is_relative_to(Path.home())
                else str(here)
            )
            existing = ask(f"Path to the folder to adopt [{shown}] ").strip()
            folder = Path(existing).expanduser().resolve() if existing else here
            name = _ask_name(ask, out, folder)
            out(overlay.report(survey(folder), name))
            if not _yes(ask, "Adopt this folder? No note is changed.", True):
                return 1
            result = overlay.adopt(folder, name=name)
            summary.append(
                f"Adopted {result['root']} as brain {result['brain']!r} (undo: brain brains remove {result['brain']})"
            )
            _offer_commit_job(result["brain"], Path(result["root"]), ask, out, summary)
        else:
            from brainwiki.lifecycle import init_brain, init_git

            path = (
                ask("Where should the brain live? [~/brains/personal] ").strip()
                or "~/brains/personal"
            )
            name = _ask_name(ask, out, Path(path).expanduser())
            root = init_brain(Path(path), name)
            register_brain(name, root)
            summary.append(f"Created brain {name!r} at {root}")
            if _yes(ask, "Track it with git (recommended)?", True):
                problem = init_git(root, name)
                summary.append(
                    f"git: {problem}" if problem else "git: initialized, with a first commit"
                )
                _offer_commit_job(name, root, ask, out, summary)
    else:
        default = next((b for b in report["brains"] if b.get("default")), report["brains"][0])
        out(f"Brain: {default['name']} at {default['path']}")
        if default.get("ok"):
            _offer_commit_job(default["name"], Path(default["path"]), ask, out, summary)

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

    hosts = [h["id"] for h in run_doctor()["hosts"] if h.get("connected")]

    # Permissions
    if hosts and load_user_config().brains:
        _permissions(hosts, ask, out, summary)

    # Harvest
    connected = [h for h in hosts if reader_for(h)]
    if connected:
        out(
            "\nHarvest reads past sessions from your agents' own history and turns them into "
            "episodes. It reads session content; distilling may send it to the model your agent "
            "already uses. It is off until you say yes."
        )
        harvest = [h for h in connected if _yes(ask, f"Turn on harvest for {h}?")]
        for host in harvest:
            set_harvest(host, True)
        if harvest:
            summary.append(
                f"Harvest on for {', '.join(harvest)} (undo: brain harvest disable {' '.join(harvest)})"
            )
            _apply_profile(
                {h: ["harvest"] for h in harvest},
                "so these apps can harvest in a session",
                ask,
                out,
                summary,
            )
            user = load_user_config()
            if len(user.brains) == 1 and not user.harvest.get("routes"):
                (only,) = user.brains
                out(
                    "Each session goes to the brain of the folder it ran in; sessions in no "
                    "brain's folder are skipped."
                )
                if _yes(ask, f"Harvest sessions from any folder under your home into {only!r}?"):
                    add_harvest_route("~/**", only)
                    summary.append(
                        f'Sessions under ~ go to {only!r} (brain harvest route "~/**" {only})'
                    )

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
    if user.brains:
        out("\nNext:\n" + "\n".join(f"- {s}" for s in _next_steps(hosts)))
    return 0


def _offer_commit_job(
    name: str, root: Path, ask: _Ask, out: Callable[[str], None], summary: list[str]
) -> None:
    """For a git brain with no commit job, offer one (`brain schedule add commit`, docs/design/write-path.md §5.2)."""
    from brainwiki.config import open_brain
    from brainwiki.errors import BrainError, UsageError
    from brainwiki.runs import is_work_tree, run_git
    from brainwiki.schedule import make_job, scheduler

    root = root.expanduser()
    if not is_work_tree(root):
        return
    try:
        backend = scheduler()
    except UsageError:  # no scheduler on this platform yet
        return
    brain_id = open_brain(root).id
    if any(job.brain_id == brain_id for job in backend.jobs()):
        return
    out(
        "\nAgents edit notes directly, and git keeps their history once `brain commit` records "
        "the edits. A scheduled job can run it for you."
    )
    if not _yes(ask, "Commit agents' edits every 15 minutes?", True):
        return
    remote = run_git(root, "remote", "get-url", "origin").returncode == 0
    push = remote and _yes(ask, "Also push each commit to the brain's git remote?")
    try:
        plan = backend.install(make_job(brain_id, name, "15m", push), dry_run=False)
    except BrainError as exc:  # the scheduler refused (launchctl failed): setup goes on
        out(
            f"Could not schedule it ({exc.message}); later: brain schedule add commit --brain {name}"
        )
        return
    if plan.manual:
        out(f"No scheduler here; add this to your crontab (`crontab -e`):\n{plan.text.rstrip()}")
        return
    summary.append(
        f"Commits {name!r} every 15 minutes{' and pushes' if push else ''} "
        f"(undo: brain schedule remove commit --brain {name})"
    )


def _permissions(
    hosts: list[str], ask: _Ask, out: Callable[[str], None], summary: list[str]
) -> None:
    """Offer the abilities that are off by default, per connected app (`brain agents grant`)."""
    from brainwiki.config import load_user_config, resolve_brain

    manifest = resolve_brain(None, user=load_user_config()).manifest
    missing = {h: [c for c, _ in _ABILITIES if not manifest.profile(h).can(c)] for h in hosts}
    if not any(missing.values()):
        return
    out(
        "\nEvery agent may log what it learns and edit notes directly. Proposing standing "
        "rules stays off until you turn it on for an app."
    )
    grants: dict[str, list[str]] = {}
    for host, caps in missing.items():
        chosen = [c for c, what in _ABILITIES if c in caps and _yes(ask, f"Let {host} {what}?")]
        if chosen:
            grants[host] = chosen
    if grants:
        _apply_profile(grants, "", ask, out, summary)


def _apply_profile(
    grants: dict[str, list[str]],
    why: str,
    ask: _Ask,
    out: Callable[[str], None],
    summary: list[str],
) -> None:
    """Show the brain.toml change `brain agents grant` would make, and make it after a yes."""
    from brainwiki.engine import open_engine
    from brainwiki.write import profile_run

    with open_engine(None) as engine:
        run = profile_run(engine, grants=grants)
        if not run.entries:
            return
        out(run.diff())
        question = f"Apply this change to {engine.brain.display_name}'s brain.toml{' ' + why if why else ''}?"
        if not _yes(ask, question, True):
            return
        record = run.commit(log_lines=[f"- grant {h}: {', '.join(c)}" for h, c in grants.items()])
    granted = "; ".join(f"{h}: {', '.join(c)}" for h, c in grants.items())
    summary.append(f"Granted {granted} (undo: brain undo {record.run})")


def _next_steps(hosts: list[str]) -> list[str]:
    from brainwiki.config import load_user_config, resolve_brain

    if not hosts:
        return [
            "Connect an agent app: `brain connect claude-code` (or codex, antigravity, openclaw, "
            "cursor), or ask any agent to run `brain setup --guide`.",
            'From this terminal: `brain log "…"`, `brain search …`, `brain viz`.',
        ]
    manifest = resolve_brain(None, user=load_user_config()).manifest
    editors = [h for h in hosts if manifest.profile(h).can("edit")]
    return [
        f'Start a new session in {", ".join(hosts)} and try "Remember that …" or '
        '"What did we decide about …?"',
        f'When the inbox fills up, ask {editors[0]} "Consolidate my brain."'
        if editors
        else "To fold the inbox into notes, let an app edit notes: run `brain setup` again.",
        'From this terminal: `brain log "…"`, `brain search …`, `brain viz`.',
    ]
