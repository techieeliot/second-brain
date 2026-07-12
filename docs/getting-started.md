# Getting Started

`second-brain` is a Python application and repository-backed knowledge system.
The project supports Python 3.13 and newer.

## Installation

Install the project and its dependencies with uv:

```bash
uv sync
```

## Running

Via the CLI entry point:

```bash
uv run second_brain
uv run --env-file .env second_brain
```

Or as a Python module:

```bash
uv run python -m second_brain
```

## Environment Variables

| Variable | Default | Description |
| --- | --- | --- |
| `LOG_LEVEL` | `INFO` | Console log level |
| `LOG_FILE` | `app.log` | Log file path |

Copy `.env.example` to `.env` for development defaults. Environment files are
loaded only when supplied with `--env-file`.

## Log Output

Console and file logs use this format:

```text
YYYY-MM-DD HH:mm:ss | LEVEL | module:function:line | message
```

For example:

```text
2026-07-11 14:32:08 | INFO | module:function:line | Hello from second_brain!
```

Timestamps omit milliseconds, and Loguru levels use their full names.

## Testing and Documentation

```bash
uv run pytest --cov
uv run ruff check .
uv run ruff format --check .
uv run mkdocs build --strict
```

Use `uv run python scripts/serve_docs.py` to serve the documentation locally.

## Project Wiki

- `raw/` stores immutable source material.
- `wiki/` stores synthesized, interlinked Markdown pages.
- `AGENTS.md` defines the ingest, query, and lint workflow.

Read `AGENTS.md` before adding or processing sources under `raw/`.
