import { spawn, spawnSync } from 'node:child_process';

import { TEST_BASE_URL, TEST_DATABASE_URL, TEST_PORT } from './config.js';

const SPEC_FILES = [
  'test/auth.e2e.ts',
  'test/profile.e2e.ts',
  'test/journey.e2e.ts',
  'test/content.e2e.ts',
];

async function waitForHealth(url: string, attempts = 40): Promise<void> {
  for (let i = 0; i < attempts; i += 1) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        return;
      }
    } catch {
      // server not ready yet
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error(`Server did not become healthy at ${url}`);
}

const server = spawn('node', ['dist/main.js'], {
  env: { ...process.env, DATABASE_URL: TEST_DATABASE_URL, PORT: String(TEST_PORT) },
  stdio: ['ignore', 'ignore', 'inherit'],
});

let exitCode = 1;
try {
  await waitForHealth(`${TEST_BASE_URL}/health`);

  const result = spawnSync(
    'node',
    ['--import', 'tsx', '--test', '--test-concurrency=1', ...SPEC_FILES],
    { stdio: 'inherit', env: { ...process.env } }
  );

  exitCode = result.status ?? 1;
} finally {
  server.kill('SIGTERM');
}

process.exit(exitCode);
