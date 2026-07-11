import os
import re

from loguru import logger

from second_brain.app import configure_logging, main


def test_main_logs_greeting(capfd):
    main()
    captured = capfd.readouterr()
    assert "Hello from second_brain!" in captured.err


def test_configure_logging_formats_console_and_file_logs(capfd, monkeypatch):
    monkeypatch.setenv("LOG_LEVEL", "DEBUG")
    configure_logging()

    messages = {
        "DEBUG": "debug message",
        "INFO": "info message",
        "WARNING": "warning message",
        "ERROR": "error message",
        "CRITICAL": "critical message",
    }
    for level, message in messages.items():
        logger.log(level, message)
    logger.complete()

    captured = capfd.readouterr()
    log_file = os.environ["LOG_FILE"]
    with open(log_file) as file:
        file_output = file.read()

    for level, message in messages.items():
        expected = rf"^\d{{4}}-\d{{2}}-\d{{2}} \d{{2}}:\d{{2}}:\d{{2}} \| {level} \| {re.escape(message)}$"
        assert re.search(expected, captured.err, re.MULTILINE)
        assert re.search(expected, file_output, re.MULTILINE)
