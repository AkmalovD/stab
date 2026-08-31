# @stab/api

Backend API for STAB. Placeholder — no implementation yet.

Source belongs in `api/src/`. Add dependencies and scripts from the repo root:

```bash
npm install <pkg> -w @stab/api
npm run dev:api
```

## What the frontend will need

The web app currently fakes all of this locally. Replacing each mock with a real
endpoint is the integration checklist:

| Frontend mock | Needs |
| --- | --- |
| `web/src/auth/*` | Auth: register, login, password reset, session |
| `web/src/services/profileApi.ts` | Journey profile CRUD (currently `localStorage`) |
| `web/src/data/*`, `web/src/utils/*Data.ts` | Cities, destinations, scholarships, community content |
| `web/src/utils/calculations.ts` | Live FX rates (currently hardcoded) |
