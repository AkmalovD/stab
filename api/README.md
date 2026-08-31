# @stab/api

STAB backend — NestJS 12 + Prisma 7 + Postgres (Docker).

## Running it

```bash
npm run db:up -w @stab/api          # start Postgres in Docker
npm run prisma:migrate -w @stab/api # apply migrations
npm run dev -w @stab/api            # start the API in watch mode
```

Health check: <http://localhost:4000/api/health>

| Script | What it does |
| --- | --- |
| `dev` | `nest start --watch` |
| `build` | `nest build` → `dist/` |
| `start` | run the built `dist/main.js` |
| `db:up` / `db:down` | start / stop the Postgres container |
| `prisma:migrate` | create + apply a migration, regenerate the client |
| `prisma:generate` | regenerate the client only |
| `prisma:studio` | browse the database in a GUI |

## Things that will bite you

- **This package is ESM** (`"type": "module"`). Nest 12 ships ESM-only, so
  relative imports need the `.js` extension: `import { X } from './x.js'`.
- **TypeScript is pinned to 6.x.** Nest 12 requires `>=6`; TS 7 ships only the
  `tsc` binary without the programmatic compiler API the Nest CLI needs.
- **Postgres is on port 5434**, not 5432 — another project already occupies
  5432/5433 on this machine.
- **Prisma 7 moved the connection URL out of `schema.prisma`** into
  `prisma.config.ts`, and no longer auto-loads `.env` (hence `dotenv` there).
  At runtime the client connects through the `@prisma/adapter-pg` driver adapter.
- `src/generated/` is the generated Prisma client. It is gitignored — run
  `prisma:generate` after cloning.

## Structure

```
api/
├── docker-compose.yml     # Postgres
├── prisma.config.ts       # Prisma CLI config (schema path, migrate URL)
├── prisma/
│   ├── schema.prisma      # models
│   └── migrations/        # generated SQL, committed
└── src/
    ├── main.ts            # bootstrap: global prefix, ValidationPipe, CORS
    ├── app.module.ts      # root module
    ├── app.controller.ts  # GET /api/health
    ├── generated/         # Prisma client (gitignored)
    └── prisma/            # PrismaService + global PrismaModule
```

## Still mocked in the frontend

| Frontend mock | Needs |
| --- | --- |
| `web/src/auth/*` | Auth: register, login, password reset, session |
| `web/src/services/profileApi.ts` | Journey profile CRUD (currently `localStorage`) |
| `web/src/data/*`, `web/src/utils/*Data.ts` | Cities, destinations, scholarships, community content |
| `web/src/utils/calculations.ts` | Live FX rates (currently hardcoded) |
