"""Open a brain's folder as a vault in Obsidian (design doc 12 §11).

A folder Obsidian already knows opens through an `obsidian://` link, which keeps the user's
last workspace. Obsidian offers no public way to add a new folder as a vault, so for an
unknown folder the Obsidian CLI (1.12+) runs `vault-open`, the internal call behind "Open
folder as vault"; if that fails or there is no CLI, the vault manager opens with the step to
take. Obsidian's vault list is read, never written.
"""

from __future__ import annotations

import json
import os
import shutil
import subprocess
import sys
from pathlib import Path
from urllib.parse import quote

from brainwiki.errors import NotAvailable


def _vault_lists() -> list[Path]:
    """Where Obsidian keeps its vault list, per platform and package format."""
    home = Path.home()
    if sys.platform == "darwin":
        return [home / "Library" / "Application Support" / "obsidian" / "obsidian.json"]
    if sys.platform == "win32":
        return [
            Path(os.environ.get("APPDATA", home / "AppData" / "Roaming"))
            / "obsidian"
            / "obsidian.json"
        ]
    config = Path(os.environ.get("XDG_CONFIG_HOME") or home / ".config")
    return [
        config / "obsidian" / "obsidian.json",
        home / ".var" / "app" / "md.obsidian.Obsidian" / "config" / "obsidian" / "obsidian.json",
        home / "snap" / "obsidian" / "current" / ".config" / "obsidian" / "obsidian.json",
    ]


def _vault_id(root: Path) -> str | None:
    """The id Obsidian gave the vault at `root`, or None when Obsidian does not know it."""
    target = root.resolve()
    for listing in _vault_lists():
        try:
            vaults = json.loads(listing.read_text(encoding="utf-8")).get("vaults") or {}
        except (OSError, ValueError, AttributeError):
            continue
        for vid, vault in vaults.items():
            path = vault.get("path") if isinstance(vault, dict) else None
            if path and Path(path).expanduser().resolve() == target:
                return str(vid)
    return None


def open_in_obsidian(root: Path) -> str:
    """Open the brain's folder as a vault in Obsidian; say what was done."""
    vid = _vault_id(root)
    if vid is None:
        return _add_vault(root)
    link = f"obsidian://open?vault={quote(vid)}"
    if _open_link(link):
        return f"Opened {root.name} in Obsidian."
    return f"Open this link to see it in Obsidian: {link}"


def _add_vault(root: Path) -> str:
    """Open a folder Obsidian does not know as a new vault, through the CLI's `eval` and the
    internal `vault-open` call ("Open folder as vault"); otherwise point the user there."""
    cli = shutil.which("obsidian")
    if cli:
        code = f"window.electron.ipcRenderer.sendSync('vault-open', {json.dumps(str(root))}, false)"
        done = subprocess.run(
            [cli, "eval", f"code={code}"], capture_output=True, text=True, check=False
        )
        if done.returncode == 0 and "error" not in (done.stdout + done.stderr).lower():
            return f"Opened {root} as a vault in Obsidian."
    step = f"choose Open folder as vault and pick {root}"
    if _open_link("obsidian://choose-vault"):
        return f"Obsidian's vault manager is open: {step}."
    if not cli:
        raise NotAvailable(f"Obsidian was not found; install it, then {step}")
    return f"In Obsidian, {step}."


def _open_link(link: str) -> bool:
    """Hand an obsidian:// link to the operating system; False when there is no way to."""
    if sys.platform == "win32":
        try:
            os.startfile(link)  # type: ignore[attr-defined]  # noqa: S606 - Windows; an obsidian:// link
        except OSError:
            return False
        return True
    opener = shutil.which("open" if sys.platform == "darwin" else "xdg-open")
    if opener is None:
        return False
    return subprocess.run([opener, link], capture_output=True, check=False).returncode == 0
