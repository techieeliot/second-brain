# Second Brain

## Installation

Clone the repository and install dependencies:

\`\`\`bash
uv sync
\`\`\`

## Usage

Run via the CLI entrypoint:

\`\`\`bash
uv run second_brain
uv run --env-file .env second_brain
\`\`\`

Or run it as a Python module:

\`\`\`bash
uv run python -m second_brain
\`\`\`

## Environment Variables

\`.env.example\` is the environment template. Copy it to \`.env\` for development.

- \`LOG_LEVEL\`: Console log level, defaulting to \`INFO\`. Set it to \`DEBUG\` in \`.env\` for verbose output.
- \`LOG_FILE\`: Log file path, defaulting to \`app.log\`.

Use \`uv run --env-file .env\` to load the development environment explicitly; environment files are not auto-loaded.

Console and file logs use the compact format \`YYYY-MM-DD HH:mm:ss | LVL | module:function:line | message\`.
Timestamps omit milliseconds. Standard Loguru levels use three-letter labels
(such as \`INF\` and \`WRN\`), while custom levels retain their full names.

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

This project follows the LLM Wiki pattern for accumulating workshop knowledge:

- \`raw/\` stores immutable source material.
- \`wiki/\` stores synthesized, interlinked Markdown pages.
- \`AGENTS.md\` defines the ingest, query, and lint workflow for maintaining the wiki.

Start with [\`wiki/index.md\`](wiki/index.md), and read [\`AGENTS.md\`](AGENTS.md) before adding or processing sources.
