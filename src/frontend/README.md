# Second Brain Frontend

The frontend is the user-facing Next.js application in this Yarn workspace.
It uses the App Router, Tailwind CSS v4, shadcn/ui primitives, and Turbopack.

## Development

```sh
yarn dev       # Start Next.js with Turbopack at http://localhost:3000
yarn lint      # Run ESLint
yarn build     # Build for production
```

The application source lives under `src/app`. Shared primitives are in
`src/components/ui`, product compositions are in `src/components/registry`,
and registry metadata is in `src/registry`.

## Agent context

Next.js 16 exposes `/_next/mcp` while the development server is running.
The repository-level `.mcp.json` configures `next-devtools-mcp`, allowing a
compatible coding agent to inspect routes, configuration, and live build
errors. Restart the development server after changing MCP configuration.

Keep credentials and private environment values in `.env.local`; never commit
them.
