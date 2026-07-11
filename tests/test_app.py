import re
import sys
from unittest.mock import Mock

from loguru import logger

from second_brain.app import configure_logging, main

COMPACT_LOG_PATTERN = re.compile(
    r"^(?P<timestamp>\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}) \| "
    r"(?P<level>\w+) \| (?P<source>[\w.]+:\w+:\d+) \| "
    r"(?P<message>.+)$"
)


def test_main_logs_greeting(capfd):
    main()
    captured = capfd.readouterr()
    assert "Hello from second_brain!" in captured.err


def test_standard_levels_use_compact_labels(capfd, monkeypatch):
    monkeypatch.setenv("LOG_LEVEL", "TRACE")
    configure_logging()

    levels_and_labels = [
        ("TRACE", "TRC"),
        ("DEBUG", "DBG"),
        ("INFO", "INF"),
        ("SUCCESS", "SUC"),
        ("WARNING", "WRN"),
        ("ERROR", "ERR"),
        ("CRITICAL", "CRT"),
    ]
    for level, _label in levels_and_labels:
        message = f"message-{level.lower()}"
        logger.log(level, message)

    lines = capfd.readouterr().err.splitlines()
    assert len(lines) == len(levels_and_labels)
    for line, (level, label) in zip(lines, levels_and_labels, strict=True):
        match = COMPACT_LOG_PATTERN.fullmatch(line)
        assert match is not None
        assert match.group("level") == label
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
        assert match.group("level") == "INF"
        assert match.group("source").startswith("tests.test_app:")
        assert match.group("message") == "compact-output"
        assert not re.search(r"\d{2}:\d{2}:\d{2}\.\d+", line)


def test_sink_configuration_is_preserved(monkeypatch):
    log_file = "/tmp/preserved.log"
    monkeypatch.setenv("LOG_LEVEL", "WARNING")
    monkeypatch.setenv("LOG_FILE", log_file)
    add_sink = Mock()
    monkeypatch.setattr("second_brain.app.logger.add", add_sink)

    configure_logging()

    assert add_sink.call_count == 2
    console_call, file_call = add_sink.call_args_list
    assert console_call.args == (sys.stderr,)
    assert console_call.kwargs["level"] == "WARNING"
    assert file_call.args == (log_file,)
    assert file_call.kwargs["level"] == "DEBUG"
    assert file_call.kwargs["rotation"] == "50 KB"
    assert file_call.kwargs["retention"] == 1
    assert console_call.kwargs["format"] is file_call.kwargs["format"]
