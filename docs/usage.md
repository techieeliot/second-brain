# Usage

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
\`\`\`

Or as a Python module:

\`\`\`bash
uv run python -m second_brain
\`\`\`

## Environment Variables

| Variable    | Default   | Description |
|-------------|-----------|-------------|
| \`LOG_LEVEL\` | \`INFO\`    | Console log level (DEBUG, INFO, ...) |
| \`LOG_FILE\`  | \`app.log\` | Path to the log file |

Copy \`.env.example\` to \`.env\` for development defaults, then run with \`uv run --env-file .env\`.

## Log Format

Both console and file logs use the following format:

\`\`\`text
YYYY-MM-DD HH:mm:ss | LEVEL | message
\`\`\`

Timestamps do not include milliseconds, and levels use their full names such
as \`DEBUG\`, \`INFO\`, \`WARNING\`, \`ERROR\`, and \`CRITICAL\`.
