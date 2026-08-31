import 'dotenv/config';

import { defineConfig, env } from 'prisma/config';

// Prisma 7 reads CLI configuration from this file instead of the schema.
// It no longer auto-loads .env, hence the dotenv import above.
export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    url: env('DATABASE_URL'),
  },
});
