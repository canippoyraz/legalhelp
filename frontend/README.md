# LegalHelp — Next.js App

The current version of LegalHelp: accounts, an AI legal guidance chat widget, and a test suite, built on top of the original agreement builder and dashboard. See the [repo root README](../README.md) for the full feature overview and how this relates to the static prototype.

## Setup

```bash
cp .env.local.example .env.local   # set ANTHROPIC_API_KEY and SESSION_SECRET
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` — start the dev server
- `npm run build` / `npm run start` — production build and serve
- `npm run lint` — ESLint
- `npm test` — run the Vitest suite once (`npm run test:watch` for watch mode, `npm run test:coverage` for coverage)

See [`TESTING.md`](./TESTING.md) for the manual test plan and [`AGENTS.md`](./AGENTS.md) / [`CLAUDE.md`](./CLAUDE.md) for project conventions.
