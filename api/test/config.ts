const base =
  process.env.DATABASE_URL ?? 'postgresql://stab:stab@localhost:5434/stab?schema=public';

export const ADMIN_DATABASE_URL = base;
export const TEST_DB_NAME = 'stab_test';
export const TEST_DATABASE_URL = base.replace(/\/stab(\?|$)/, `/${TEST_DB_NAME}$1`);
export const TEST_PORT = Number(process.env.TEST_PORT ?? 4101);
export const TEST_BASE_URL = `http://localhost:${TEST_PORT}/api`;

if (TEST_DATABASE_URL === ADMIN_DATABASE_URL) {
  throw new Error(
    `Refusing to run e2e tests: could not derive a separate test database from DATABASE_URL (${base})`
  );
}
