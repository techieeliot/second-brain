import re
import sys
from unittest.mock import Mock

from click.testing import CliRunner
from loguru import logger

from second_brain.app import configure_logging, main

COMPACT_LOG_PATTERN = re.compile(
    r"^(?P<timestamp>\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}) \| "
    r"(?P<level>\w+) \| (?P<source>[\w.]+:\w+:\d+) \| "
    r"(?P<message>.+)$"
)


def test_new_list_and_show_notes(tmp_path, monkeypatch):
    monkeypatch.setenv("SECOND_BRAIN_NOTES_DIR", str(tmp_path / "notes"))
    runner = CliRunner()

    created = runner.invoke(main, ["new", "My brilliant idea about caching"])
    assert created.exit_code == 0
    assert "Saved:" in created.output

    listed = runner.invoke(main, ["list"])
    assert listed.exit_code == 0
    assert str(tmp_path / "notes") in listed.output
    assert "1. " in listed.output
    assert "my-brilliant-idea-about-caching.md" in listed.output

    shown = runner.invoke(main, ["show", "1"])
    assert shown.exit_code == 0
    assert shown.output == "My brilliant idea about caching"


def test_show_rejects_missing_note(tmp_path, monkeypatch):
    monkeypatch.setenv("SECOND_BRAIN_NOTES_DIR", str(tmp_path / "notes"))
    result = CliRunner().invoke(main, ["show", "1"])

    assert result.exit_code != 0
    assert "No notes found" in result.output


def test_new_converts_literal_newlines_to_markdown_lines(tmp_path, monkeypatch):
    monkeypatch.setenv("SECOND_BRAIN_NOTES_DIR", str(tmp_path))

    result = CliRunner().invoke(main, ["new", r"# Workshop\n\n## Notes"])

    assert result.exit_code == 0
    note = next(tmp_path.glob("*.md"))
    assert note.read_text() == "# Workshop\n\n## Notes"


def test_new_preserves_real_newlines_and_other_backslashes(tmp_path, monkeypatch):
    monkeypatch.setenv("SECOND_BRAIN_NOTES_DIR", str(tmp_path))
    thought = "already\nmultiline \\t \\r " + "\\"

    result = CliRunner().invoke(main, ["new", thought])

    assert result.exit_code == 0
    note = next(tmp_path.glob("*.md"))
    assert note.read_text() == thought


def test_new_preserves_markdown_unicode_and_success_output(tmp_path, monkeypatch):
    monkeypatch.setenv("SECOND_BRAIN_NOTES_DIR", str(tmp_path))
    thought = r"# Café ✨\n\nKeep the Markdown"

    result = CliRunner().invoke(main, ["new", thought])

    assert result.exit_code == 0
    assert result.output.startswith("Saved: ")
    note = next(tmp_path.glob("*.md"))
    assert note.read_text(encoding="utf-8") == "# Café ✨\n\nKeep the Markdown"


def test_standard_levels_use_full_names(capfd, monkeypatch):
    monkeypatch.setenv("LOG_LEVEL", "TRACE")
    configure_logging()

    levels = ["TRACE", "DEBUG", "INFO", "SUCCESS", "WARNING", "ERROR", "CRITICAL"]
    for level in levels:
        message = f"message-{level.lower()}"
        logger.log(level, message)

    lines = capfd.readouterr().err.splitlines()
    assert len(lines) == len(levels)
    for line, level in zip(lines, levels, strict=True):
        match = COMPACT_LOG_PATTERN.fullmatch(line)
        assert match is not None
        assert match.group("level") == level
        assert match.group("source").startswith("tests.test_app:")
        assert match.group("message") == f"message-{level.lower()}"


def test_custom_level_keeps_full_name(capfd, monkeypatch):
    monkeypatch.setenv("LOG_LEVEL", "TRACE")
    try:
        logger.level("NOTICE")
    except ValueError:
        logger.level("NOTICE", no=35)
    configure_logging()

    logger.log("NOTICE", "custom-level")

    line = capfd.readouterr().err.strip()
    match = COMPACT_LOG_PATTERN.fullmatch(line)
    assert match is not None
    assert match.group("level") == "NOTICE"
    assert match.group("message") == "custom-level"


def test_console_and_file_use_compact_output(capfd, tmp_path, monkeypatch):
    log_file = tmp_path / "compact.log"
    monkeypatch.setenv("LOG_FILE", str(log_file))
    configure_logging()
    logger.info("compact-output")

    console_line = capfd.readouterr().err.strip()
    file_line = log_file.read_text().strip()
    for line in (console_line, file_line):
        match = COMPACT_LOG_PATTERN.fullmatch(line)
        assert match is not None
        assert match.group("level") == "INFO"
        assert match.group("source").startswith("tests.test_app:")
        assert match.group("message") == "compact-output"
        assert not re.search(r"\d{2}:\d{2}:\d{2}\.\d+", line)


def test_sink_configuration_is_preserved(monkeypatch):
    log_file = "/tmp/preserved.log"
    monkeypatch.setenv("LOG_LEVEL", "WARNING")
    monkeypatch.setenv("LOG_FILE", log_file)
    remove_sink = Mock()
    add_sink = Mock()
    monkeypatch.setattr("second_brain.app.logger.remove", remove_sink)
    monkeypatch.setattr("second_brain.app.logger.add", add_sink)

    configure_logging()

    remove_sink.assert_called_once_with()
    assert add_sink.call_count == 2
    console_call, file_call = add_sink.call_args_list
    assert console_call.args == (sys.stderr,)
    assert console_call.kwargs["level"] == "WARNING"
    assert file_call.args == (log_file,)
    assert file_call.kwargs["level"] == "DEBUG"
    assert file_call.kwargs["rotation"] == "50 KB"
    assert file_call.kwargs["retention"] == 1
    assert console_call.kwargs["format"] is file_call.kwargs["format"]
