# Second Brain Studio

The Sanity Studio is the content-management app for the Second Brain
workspace. It models notes for future web and CLI integrations while keeping
the frontend and studio deployable independently.

The root contains Sanity configuration and CLI files. Custom Studio code is
organized under `src/`, with schemas in `src/schemaTypes/` and deployable
static assets in `static/`.

## Development

From this directory:

```sh
yarn dev       # Start the Vite-powered Studio at http://localhost:3333
yarn build     # Create a production Studio build in dist/
yarn start     # Preview the production build
yarn lint      # Check Studio source files
```

Set `SANITY_STUDIO_PROJECT_ID` and `SANITY_STUDIO_DATASET` in `.env.local`
before starting the Studio. From the repository root, use `yarn studio:dev`
or `yarn studio:build`.

The repository-level `.mcp.json` also registers Sanity's remote MCP server at
`https://mcp.sanity.io`. A compatible coding agent will prompt for OAuth on
first use. This project does not include Motley Fool VPN or authentication
credentials; use a Sanity account and project that you control.

For a new Sanity project, the equivalent CLI setup is `npx sanity@latest init`.
This checked-in Studio has already been initialized; it only needs a
user-owned project ID and dataset to connect to Content Lake. Local Studio
development still uses the hosted dataset, not local content storage.

Keep Studio-specific schema and configuration here. Shared product context
belongs in the repository documentation rather than being duplicated in this
README.
