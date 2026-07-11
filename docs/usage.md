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

## Log Output

Both console and file logs use the following compact format:

\`\`\`text
YYYY-MM-DD HH:mm:ss | LVL | module:function:line | message
\`\`\`

For example:

\`\`\`text
2026-07-11 14:32:08 | INF | second_brain.app:main:59 | Hello from second_brain!
\`\`\`

Timestamps do not include milliseconds. Standard Loguru levels use the labels
\`TRC\`, \`DBG\`, \`INF\`, \`SUC\`, \`WRN\`, \`ERR\`, and \`CRT\`; custom
levels retain their full names.
