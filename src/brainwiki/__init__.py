"""brain-wiki: a local-first second brain for AI agents, kept as plain Markdown."""

from __future__ import annotations

FORMAT_VERSION = 1


def __getattr__(name: str) -> str:
    # Resolved lazily: importlib.metadata costs ~50 ms, too much for `brain hook` on every turn.
    if name == "__version__":
        from importlib.metadata import PackageNotFoundError, version

        try:
            return version("brain-wiki")
        except PackageNotFoundError:  # a source tree without installation
            return "0.0.0"
    raise AttributeError(name)
