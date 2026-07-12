# Second Brain

## Installation

Clone the repository and install dependencies:

\`\`\`bash
uv sync
\`\`\`

## Running

Via the CLI entrypoint:

\`\`\`bash
uv run second_brain                          # production defaults
uv run --env-file .env second_brain          # dev settings
uv run second_brain new "My brilliant idea about caching"
uv run second_brain list
uv run second_brain show 1
\`\`\`

Or run it as a Python module:

\`\`\`bash
uv run python -m second_brain
\`\`\`

## Environment Variables

| Variable | Default | Description |
| --- | --- | --- |
| \`LOG_LEVEL\` | \`INFO\` | Console log level |
| \`LOG_FILE\` | \`app.log\` | Log file path |
| \`SECOND_BRAIN_NOTES_DIR\` | \`~/second_brain\` | Markdown note storage |

Copy \`.env.example\` to \`.env\` for development defaults, then run with
\`uv run --env-file .env\`. Environment files are not loaded automatically.

Notes are saved as plain Markdown files. `list` prints the full storage path
and numbered filenames; `show NUMBER` prints the selected note.

Console and file logs use the compact format
\`YYYY-MM-DD HH:mm:ss | LEVEL | module:function:line | message\`.
Timestamps omit milliseconds. Loguru levels use their full names, such as
\`INFO\` and \`WARNING\`, including custom levels.

For example:

\`\`\`text
2026-07-11 14:32:08 | INFO | module:function:line | Hello from second_brain!
\`\`\`

## Testing

\`\`\`bash
uv run pytest
uv run pytest --cov
\`\`\`

## Documentation

\`\`\`bash
uv run python scripts/serve_docs.py
uv run mkdocs build
\`\`\`

## Project Wiki

- [Documentation home](docs/index.md)
- [Getting Started](docs/GUIDE-001-getting-started.md)
- [API reference](docs/REF-001-api-reference.md)
- [Documentation standards](docs/GUIDE-004-docs-standards.md)
- [AI prompting standards](docs/GUIDE-002-ai-prompting.md)
- [Code review standards](docs/GUIDE-003-code-review.md)
- [Expert panel](docs/SPEC-001-expert-panel.md)

This project follows the LLM Wiki pattern for accumulating workshop knowledge:

- \`raw/\` stores immutable source material.
- \`wiki/\` stores synthesized, interlinked Markdown pages.
- \`AGENTS.md\` defines the ingest, query, and lint workflow for maintaining
  the wiki.

Start with [\`wiki/index.md\`](wiki/index.md), and read
[\`AGENTS.md\`](AGENTS.md) before adding or processing sources.
