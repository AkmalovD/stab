# STAB — Monorepo

Study abroad planner. npm workspaces monorepo.

```
stab/
├── package.json        # workspace root (no app code)
├── package-lock.json   # single lockfile for all workspaces
├── .prettierrc         # shared formatting
├── .gitignore          # shared, applies recursively
├── web/                # @stab/web  — Next.js 16 frontend (existing app)
└── api/                # @stab/api  — backend (to be built)
```

## Setup

```bash
npm install          # installs every workspace from the repo root
```

## Common commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the web frontend |
| `npm run dev:web` | Same, explicit |
| `npm run dev:api` | Start the api (once it has a `dev` script) |
| `npm run build` | Build every workspace that defines `build` |
| `npm run lint` | Lint every workspace that defines `lint` |
| `npm run format` | Prettier across the whole repo |

Target a single workspace directly with `-w`:

```bash
npm run build -w @stab/web
npm install express -w @stab/api
```

## Workspaces

- **[web/](web/)** — `@stab/web`. Next.js app router, Tailwind, TypeScript. Currently runs entirely on mock data (see [web/README.md](web/README.md)).
- **[api/](api/)** — `@stab/api`. Placeholder; backend code goes in `api/src/`.
