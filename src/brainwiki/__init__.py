"""brain-wiki: a local-first second brain for AI agents, kept as plain Markdown."""

from importlib.metadata import PackageNotFoundError, version

try:
    __version__ = version("brain-wiki")
except PackageNotFoundError:  # running from a source tree without installation
    __version__ = "0.0.0"

FORMAT_VERSION = 1
