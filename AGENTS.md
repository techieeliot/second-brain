# Project Knowledge Workflow

This repository uses a three-layer knowledge system inspired by Karpathy's LLM
Wiki pattern:

- \`raw/\` contains curated source material. Treat these files as immutable.
- \`wiki/\` contains synthesized, interlinked Markdown pages maintained by the
  LLM.
- \`AGENTS.md\` is the schema for maintaining the wiki and is versioned with
  the project.

## Ingest

When a new source is added to \`raw/\`:

1. Read the source completely before editing the wiki.
2. Discuss the important claims, assumptions, and open questions with the
   user when the source is substantive.
3. Create or update the relevant wiki pages.
4. Add links from affected pages to related concepts and sources.
5. Update \`wiki/index.md\` with every new or changed page.
6. Append an entry to \`wiki/log.md\` describing the ingest.

Never rewrite or delete raw sources as part of ingest.

## Query

Read \`wiki/index.md\` first, then follow links to the relevant pages. Answer
with citations to wiki pages and raw sources where applicable. File durable
analyses, comparisons, and conclusions back into \`wiki/\` instead of leaving
them only in chat history.

## Lint

Periodically check the wiki for:

- Contradictory or stale claims
- Orphan pages and missing inbound links
- Concepts that need their own page
- Missing source citations
- Questions that require another source

Record completed health checks in \`wiki/log.md\`.

## Page Conventions

- Use Markdown files with descriptive, lowercase names joined by hyphens.
- Prefer one topic, entity, or source per page.
- Link related pages with relative Markdown links.
- Put source links near the claims they support.
- Use YAML frontmatter only when it adds useful metadata.
- Keep \`wiki/index.md\` content-oriented and \`wiki/log.md\` chronological.
- Start log entries with \`## [YYYY-MM-DD] <operation> | <subject>\`.
