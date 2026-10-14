"""Episodes this device wrote itself (design doc 05 §2.1).

A file under the inbox can claim any provenance in its frontmatter. `write_episode()` leaves a
marker per episode in the device's state directory, holding the episode's content hash; the
scanner trusts declared provenance only for an episode whose marker matches its content.
"""

from __future__ import annotations

from pathlib import Path

from brainwiki.config.dirs import brain_state_dir


def _marker(brain_key: str, episode_id: str) -> Path:
    return brain_state_dir(brain_key) / "written" / episode_id


def mark(brain_key: str, episode_id: str, sha256: str) -> None:
    path = _marker(brain_key, episode_id)
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(sha256, encoding="utf-8")


def is_marked(brain_key: str, episode_id: str, sha256: str) -> bool:
    try:
        return _marker(brain_key, episode_id).read_text(encoding="utf-8").strip() == sha256
    except OSError:
        return False
