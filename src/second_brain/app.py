import re
import sys
from datetime import datetime
from pathlib import Path

import click
from dotenv import load_dotenv
from loguru import logger


def _compact_log_format(record):
    """Return the compact format with the full Loguru level name."""
    return (
        "{time:YYYY-MM-DD HH:mm:ss} | {level} | "
        "{name}:{function}:{line} | {message}\n{exception}"
    )


def configure_logging():
    """Configure loguru for console and file logging.

    Removes the default handler and sets up:
    - stderr handler at LOG_LEVEL (default: INFO, configurable via env var)
    - File handler at DEBUG level writing to LOG_FILE (default: app.log)
    """
    import os

    log_level = os.environ.get("LOG_LEVEL", "INFO")
    log_file = os.environ.get("LOG_FILE", "app.log")
    logger.remove()
    logger.add(sys.stderr, level=log_level, format=_compact_log_format)
    logger.add(
        log_file,
        level="DEBUG",
        format=_compact_log_format,
        rotation="50 KB",
        retention=1,
    )


def _notes_directory():
    """Return the configured notes directory, expanded to an absolute path."""
    import os

    configured = os.environ.get("SECOND_BRAIN_NOTES_DIR", "~/second_brain")
    return Path(configured).expanduser().resolve()


def _note_files():
    """Return Markdown notes in the configured directory, sorted by filename."""
    directory = _notes_directory()
    return sorted(path for path in directory.glob("*.md") if path.is_file())


def _slugify(text):
    """Return a filesystem-friendly slug for a note filename."""
    slug = re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-")
    return slug or "note"


def _normalize_note_text(text):
    """Convert literal newline escapes while preserving other text."""
    return text.replace(r"\n", "\n")


def _write_note(directory, text):
    """Create a timestamped note without overwriting an existing file."""
    timestamp = datetime.now().strftime("%Y%m%d-%H%M%S-%f")
    suffix = 0
    while True:
        collision_suffix = "" if suffix == 0 else f"-{suffix}"
        path = directory / f"{timestamp}-{_slugify(text)}{collision_suffix}.md"
        try:
            with path.open("x", encoding="utf-8") as note:
                note.write(text)
        except FileExistsError:
            suffix += 1
            continue
        except OSError as error:
            raise click.ClickException(f"Could not write note: {error}") from error
        return path


@click.group()
def main():
    """Create and read plain Markdown notes."""
    load_dotenv()


@main.command()
@click.argument("thought")
def new(thought):
    """Save THOUGHT as a Markdown note."""
    directory = _notes_directory()
    try:
        directory.mkdir(parents=True, exist_ok=True)
    except OSError as error:
        raise click.ClickException(
            f"Could not prepare note directory {directory}: {error}"
        ) from error
    path = _write_note(directory, _normalize_note_text(thought))
    click.echo(f"Saved: {path}")


@main.command(name="list")
def list_notes():
    """List the configured notes directory and its Markdown notes."""
    directory = _notes_directory()
    click.echo(f"Notes: {directory}")
    for number, path in enumerate(_note_files(), start=1):
        click.echo(f"{number}. {path.name}")


@main.command()
@click.argument("number", type=click.IntRange(min=1))
def show(number):
    """Print note NUMBER from the list."""
    notes = _note_files()
    if not notes:
        raise click.ClickException(f"No notes found in {_notes_directory()}")
    if number > len(notes):
        raise click.ClickException(
            f"Note {number} does not exist; choose 1-{len(notes)}"
        )
    try:
        content = notes[number - 1].read_text(encoding="utf-8")
    except (OSError, UnicodeError) as error:
        raise click.ClickException(f"Could not read note: {error}") from error
    click.echo(content, nl=False)


if __name__ == "__main__":
    main()
