import 'dotenv/config';

import { execSync } from 'node:child_process';
import pg from 'pg';

import { ADMIN_DATABASE_URL, TEST_DATABASE_URL, TEST_DB_NAME } from './config.js';

const { Client } = pg;

async function ensureDatabase(): Promise<void> {
  const admin = new Client({ connectionString: ADMIN_DATABASE_URL });
  await admin.connect();
  const existing = await admin.query('SELECT 1 FROM pg_database WHERE datname = $1', [TEST_DB_NAME]);
  if (existing.rowCount === 0) {
    await admin.query(`CREATE DATABASE "${TEST_DB_NAME}"`);
    console.log(`Created database ${TEST_DB_NAME}`);
  } else {
    console.log(`Database ${TEST_DB_NAME} already exists`);
  }
  await admin.end();
}

async function main(): Promise<void> {
  await ensureDatabase();

  const env = { ...process.env, DATABASE_URL: TEST_DATABASE_URL };
  execSync('npx prisma migrate deploy', { stdio: 'inherit', env });
  execSync('npx prisma generate', { stdio: 'inherit', env });
  execSync('tsx prisma/seed.ts', { stdio: 'inherit', env });
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
